use std::collections::{BTreeMap, HashMap, HashSet, VecDeque};
use std::env;
use std::fs;

use serde::Deserialize;

/// 哲学节点：图中的一位思想家。
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Thinker {
    id: String,
    name: String,
    era: String,
    birth_year: Option<i32>,
    death_year: Option<i32>,
}

/// 依赖关系的精确分类。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Deserialize)]
#[serde(rename_all = "lowercase")]
enum RelationKind {
    Presupposes,
    Refutes,
    Synthesizes,
    Influences,
}

impl RelationKind {
    fn label(self) -> &'static str {
        match self {
            Self::Presupposes => "预设前提",
            Self::Refutes => "批判",
            Self::Synthesizes => "综合",
            Self::Influences => "受影响",
        }
    }
}

/// 有向边：source 依赖 target。
#[derive(Debug, Clone, Deserialize)]
struct Relation {
    source: String,
    target: String,
    kind: RelationKind,
    reason: String,
}

#[derive(Debug, Deserialize)]
struct Graph {
    thinkers: Vec<Thinker>,
    relations: Vec<Relation>,
}

fn main() {
    let path = env::args()
        .nth(1)
        .unwrap_or_else(|| "src/lib/data/graph.json".to_string());
    let raw = fs::read_to_string(&path).unwrap_or_else(|error| {
        eprintln!("无法读取 {path}: {error}");
        std::process::exit(1);
    });
    let graph: Graph = serde_json::from_str(&raw).unwrap_or_else(|error| {
        eprintln!("{path} 不是合法的图谱 JSON: {error}");
        std::process::exit(1);
    });

    let mut errors = Vec::new();
    let mut by_id: HashMap<&str, &Thinker> = HashMap::new();
    for thinker in &graph.thinkers {
        if by_id.insert(&thinker.id, thinker).is_some() {
            errors.push(format!("重复的思想家 id: {}", thinker.id));
        }
    }

    let mut pairs = HashSet::new();
    let mut kinds: BTreeMap<&str, usize> = BTreeMap::new();
    for relation in &graph.relations {
        let where_ = format!("{} → {}", relation.source, relation.target);
        let source = by_id.get(relation.source.as_str());
        let target = by_id.get(relation.target.as_str());
        if source.is_none() {
            errors.push(format!("{where_}: source 不存在"));
        }
        if target.is_none() {
            errors.push(format!("{where_}: target 不存在"));
        }
        if relation.source == relation.target {
            errors.push(format!("{where_}: 自环"));
        }
        if relation.reason.chars().count() < 12 {
            errors.push(format!("{where_}: 理由过短"));
        }
        if !pairs.insert((relation.source.as_str(), relation.target.as_str())) {
            errors.push(format!("{where_}: 重复的有向边"));
        }
        if let (Some(source), Some(target)) = (source, target) {
            if let (Some(death), Some(birth)) = (source.death_year, target.birth_year) {
                if death < birth - 10 {
                    eprintln!(
                        "警告: {} (卒 {death}) 依赖 {} (生 {birth})，时间方向可疑",
                        source.name, target.name
                    );
                }
            }
        }
        *kinds.entry(relation.kind.label()).or_default() += 1;
    }

    let mut adjacency: HashMap<&str, Vec<&str>> = HashMap::new();
    let mut descendants: BTreeMap<&str, usize> = BTreeMap::new();
    let mut ancestors: BTreeMap<&str, usize> = BTreeMap::new();
    for thinker in &graph.thinkers {
        adjacency.entry(&thinker.id).or_default();
    }
    for relation in &graph.relations {
        if by_id.contains_key(relation.source.as_str()) && by_id.contains_key(relation.target.as_str())
        {
            adjacency
                .entry(relation.source.as_str())
                .or_default()
                .push(relation.target.as_str());
            adjacency
                .entry(relation.target.as_str())
                .or_default()
                .push(relation.source.as_str());
            *ancestors.entry(relation.source.as_str()).or_default() += 1;
            *descendants.entry(relation.target.as_str()).or_default() += 1;
        }
    }

    let mut seen = HashSet::new();
    let mut components = 0usize;
    for thinker in &graph.thinkers {
        if seen.contains(thinker.id.as_str()) {
            continue;
        }
        components += 1;
        let mut queue = VecDeque::from([thinker.id.as_str()]);
        seen.insert(thinker.id.as_str());
        while let Some(current) = queue.pop_front() {
            for next in adjacency.get(current).into_iter().flatten() {
                if seen.insert(next) {
                    queue.push_back(next);
                }
            }
        }
    }

    let isolated: Vec<&str> = graph
        .thinkers
        .iter()
        .filter(|thinker| {
            ancestors.get(thinker.id.as_str()).copied().unwrap_or(0) == 0
                && descendants.get(thinker.id.as_str()).copied().unwrap_or(0) == 0
        })
        .map(|thinker| thinker.name.as_str())
        .collect();
    if !isolated.is_empty() {
        errors.push(format!("孤立节点: {}", isolated.join("、")));
    }

    if !errors.is_empty() {
        eprintln!("\n✗ 图谱校验失败");
        for error in &errors {
            eprintln!("  {error}");
        }
        std::process::exit(1);
    }

    let mut eras: BTreeMap<&str, usize> = BTreeMap::new();
    for thinker in &graph.thinkers {
        *eras.entry(thinker.era.as_str()).or_default() += 1;
    }
    let mut hubs: Vec<(&str, usize)> = descendants
        .iter()
        .map(|(id, count)| (by_id.get(id).map(|t| t.name.as_str()).unwrap_or(id), *count))
        .collect();
    hubs.sort_by(|a, b| b.1.cmp(&a.1));
    hubs.truncate(6);

    println!("✓ 图谱有效：{}", path);
    println!(
        "  {} 位思想家 · {} 条关系 · {} 个弱连通分量",
        graph.thinkers.len(),
        graph.relations.len(),
        components
    );
    println!(
        "  {}",
        kinds
            .iter()
            .map(|(kind, count)| format!("{kind} {count}"))
            .collect::<Vec<_>>()
            .join(" · ")
    );
    println!(
        "  被依赖最多：{}",
        hubs.iter()
            .map(|(name, count)| format!("{name} {count}"))
            .collect::<Vec<_>>()
            .join(" · ")
    );
    println!(
        "  时代：{}",
        eras.iter()
            .map(|(era, count)| format!("{era} {count}"))
            .collect::<Vec<_>>()
            .join(" · ")
    );
}
