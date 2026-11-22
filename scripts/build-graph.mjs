import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const KINDS = ['presupposes', 'refutes', 'synthesizes', 'influences'];
const DRAFT_DIR = 'data/relations.draft';

function loadSourceData() {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${read('data.zh.js')};this.P = P_ZH; this.ERAS = ERAS_ZH;`, sandbox);
  return { people: sandbox.P, eras: sandbox.ERAS };
}

/** Parse the Chinese date strings into a signed year and an approximation flag. */
export function parseYear(raw) {
  if (!raw || raw === '不详' || raw === '—') return { year: null, circa: false };
  const circa = raw.includes('约');
  const bc = raw.includes('公元前');
  const century = raw.match(/([0-9]+)(?:—([0-9]+))?世纪/);
  if (century) {
    const c = Number(century[1]);
    const year = Math.round((c - 0.5) * 100);
    return { year: bc ? -year : year, circa: true };
  }
  const match = raw.match(/([0-9]+)年/);
  if (!match) return { year: null, circa };
  const year = Number(match[1]);
  return { year: bc ? -year : year, circa };
}

function readRelations(dir) {
  if (!fs.existsSync(path.join(root, dir))) return [];
  return fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      const file = path.join(dir, f);
      let rows;
      try {
        rows = JSON.parse(read(file));
      } catch (error) {
        throw new Error(`${file} is not valid JSON: ${error.message}`);
      }
      if (!Array.isArray(rows)) throw new Error(`${file} must contain an array`);
      return rows.map((row) => ({ ...row, file }));
    });
}

function fail(message, details = []) {
  console.error(`\n✗ ${message}`);
  for (const detail of details.slice(0, 25)) console.error(`  ${detail}`);
  if (details.length > 25) console.error(`  … ${details.length - 25} more`);
  process.exit(1);
}

function main() {
  const { people, eras } = loadSourceData();
  const ids = new Set(people.map((p) => p.id));
  if (ids.size !== people.length) fail('duplicate thinker ids');

  const rawRelations = readRelations(DRAFT_DIR);
  const errors = [];
  const warnings = [];
  const seenPair = new Map();
  const relations = [];

  for (const relation of rawRelations) {
    const { source, target, kind, reason, file } = relation;
    const where = `${file}: ${source} → ${target}`;
    if (!ids.has(source)) errors.push(`${where}: unknown source`);
    if (!ids.has(target)) errors.push(`${where}: unknown target`);
    if (source === target) errors.push(`${where}: self edge`);
    if (!KINDS.includes(kind)) errors.push(`${where}: unknown kind ${kind}`);
    if (typeof reason !== 'string' || reason.trim().length < 12) errors.push(`${where}: reason too thin`);
    if (errors.length) continue;

    const pair = `${source}|${target}`;
    if (seenPair.has(pair)) {
      warnings.push(`${where}: duplicate pair, kept ${seenPair.get(pair)} (${kind} dropped)`);
      continue;
    }
    seenPair.set(pair, kind);
    relations.push({ source, target, kind, reason: reason.trim() });
  }

  if (errors.length) fail('relation validation failed', errors);

  const byId = new Map(people.map((p) => [p.id, p]));
  const eraIndex = new Map(eras.map((era, index) => [era, index]));
  for (const relation of relations) {
    const source = byId.get(relation.source);
    const target = byId.get(relation.target);
    const sourceDeath = parseYear(source.died).year;
    const targetBirth = parseYear(target.born).year;
    if (sourceDeath !== null && targetBirth !== null && sourceDeath < targetBirth - 10) {
      warnings.push(
        `${relation.source} (d. ${sourceDeath}) depends on ${relation.target} (b. ${targetBirth}) — check direction`,
      );
    }
  }

  const degree = new Map();
  for (const relation of relations) {
    degree.set(relation.source, (degree.get(relation.source) ?? 0) + 1);
    degree.set(relation.target, (degree.get(relation.target) ?? 0) + 1);
  }
  const isolated = people.filter((p) => !degree.has(p.id)).map((p) => `${p.id} ${p.name}`);
  if (isolated.length) warnings.push(`isolated thinkers (${isolated.length}): ${isolated.join(', ')}`);

  const thinkers = people
    .map((person) => {
      const born = parseYear(person.born);
      const died = parseYear(person.died);
      const books = (person.books ?? []).map(([title, year, note, titleEn]) => ({
        title,
        year,
        note,
        titleEn,
      }));
      return {
        ...person,
        eraIndex: eraIndex.get(person.era) ?? eras.length,
        birthYear: born.year,
        deathYear: died.year,
        dateApproximate: born.circa || died.circa,
        books,
      };
    })
    .sort((a, b) => a.eraIndex - b.eraIndex || (a.birthYear ?? 0) - (b.birthYear ?? 0));

  const kinds = Object.fromEntries(KINDS.map((kind) => [kind, 0]));
  for (const relation of relations) kinds[relation.kind] += 1;

  const graph = {
    version: 1,
    eras,
    kinds: KINDS,
    thinkers,
    relations,
    stats: {
      thinkers: thinkers.length,
      relations: relations.length,
      kinds,
    },
  };

  fs.writeFileSync(path.join(root, 'src/lib/data/graph.json'), `${JSON.stringify(graph)}\n`);

  console.log(`✓ ${thinkers.length} thinkers, ${relations.length} relations`);
  console.log(`  ${KINDS.map((kind) => `${kind} ${kinds[kind]}`).join(' · ')}`);
  const perEra = new Map();
  for (const person of thinkers) {
    perEra.set(person.era, (perEra.get(person.era) ?? 0) + 1);
  }
  console.log(`  ${[...perEra].map(([era, n]) => `${era} ${n}`).join(' · ')}`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warnings`);
    for (const warning of warnings.slice(0, 40)) console.log(`  ! ${warning}`);
    if (warnings.length > 40) console.log(`  … ${warnings.length - 40} more`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
