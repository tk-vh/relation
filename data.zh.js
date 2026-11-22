// 中文数据：由 data.js 翻译生成。
// 人物姓名与书名保留原文，同时在 nameEn 与 books[3] 中存有原著名称。
const ERA_MAP={"Presocratic":"前苏格拉底","Classical Greek":"古典希腊","Hellenistic & Roman":"希腊化与罗马","Eastern":"东方","Medieval":"中世纪","Renaissance & Early Modern":"文艺复兴与早期近代","Enlightenment":"启蒙运动","German Idealism":"德国唯心主义","19th Century":"19世纪","Phenomenology & Existentialism":"现象学与存在主义","Analytic":"分析哲学","Political & Conservative":"政治与保守主义","Critical Theory & Postwar":"批判理论与战后","Post-structuralism":"后结构主义"};
const ERAS_ZH=["前苏格拉底","古典希腊","希腊化与罗马","东方","中世纪","文艺复兴与早期近代","启蒙运动","德国唯心主义","19世纪","现象学与存在主义","分析哲学","政治与保守主义","批判理论与战后","后结构主义"];
const P_ZH=[
{
"id": "thales",
"name": "泰勒斯",
"nameEn": "Thales of Miletus",
"era": "前苏格拉底",
"born": "约公元前624年",
"birthplace": "伊奥尼亚的米利都",
"died": "约公元前546年",
"deathplace": "米利都",
"nationality": "希腊",
"schools": "米利都学派",
"wiki": "Thales of Miletus",
"bio": "泰勒斯通常被视为第一位希腊哲学家，也是“七贤”之一。他试图以自然而非神话解释世界，提出水是万物的本原。后世传统还把他与若干几何定理以及公元前585年的日食预言联系起来。他没有著作流传；我们主要通过亚里士多德及后来的记载了解他。",
"ideas": [
"水是本原（arche）",
"以自然解释取代神话",
"“万物都充满了神”"
],
"books": [],
"quote": "",
"start": "亚里士多德《形而上学》第一卷（Metaphysics, Book I，其中论述了早期思想家）"
},
{
"id": "anaximander",
"name": "阿那克西曼德",
"nameEn": "Anaximander",
"era": "前苏格拉底",
"born": "约公元前610年",
"birthplace": "米利都",
"died": "约公元前546年",
"deathplace": "米利都",
"nationality": "希腊",
"schools": "米利都学派",
"wiki": "Anaximander",
"bio": "阿那克西曼德是泰勒斯的弟子或同道，他提出万物的本原是“无定”（apeiron），即无限定者。他绘制了已知世界最早的地图之一，并提出地球悬浮于宇宙中心而不需支撑的模型。他留下的一句话是西方哲学现存最古老的残篇。",
"ideas": [
"以无定（阿派朗）为本原",
"对立面之间的宇宙正义",
"地球悬浮无依"
],
"books": [
["论自然（残篇）", -547, "希腊哲学现存最古老的残篇。", "On Nature (fragment)"]
],
"quote": "",
"start": "基尔克、拉文与斯科菲尔德《前苏格拉底哲学家》（Kirk, Raven & Schofield, The Presocratic Philosophers）"
},
{
"id": "anaximenes",
"name": "阿那克西美尼",
"nameEn": "Anaximenes",
"era": "前苏格拉底",
"born": "约公元前586年",
"birthplace": "米利都",
"died": "约公元前526年",
"deathplace": "米利都",
"nationality": "希腊",
"schools": "米利都学派",
"wiki": "Anaximenes of Miletus",
"bio": "阿那克西美尼是第三位米利都学派哲学家，他认为气是万物的基质。气稀薄时成为火，凝聚时依次成为风、云、水、土和石。这提供了一种变化的机制，而不只是某种原初质料。",
"ideas": [
"气为本原",
"稀薄与凝聚解释变化"
],
"books": [],
"quote": "",
"start": "基尔克、拉文与斯科菲尔德《前苏格拉底哲学家》（Kirk, Raven & Schofield, The Presocratic Philosophers）"
},
{
"id": "pythagoras",
"name": "毕达哥拉斯",
"nameEn": "Pythagoras",
"era": "前苏格拉底",
"born": "约公元前570年",
"birthplace": "萨摩斯",
"died": "约公元前495年",
"deathplace": "梅塔蓬图姆",
"nationality": "希腊",
"schools": "毕达哥拉斯学派",
"wiki": "Pythagoras",
"bio": "毕达哥拉斯在意大利南部的克罗顿创立了一个宗教与哲学团体。其追随者教导灵魂转世、严格的生活方式，以及数与和谐构成宇宙基础的思想。由于学派把一切发现都归于宗师，很难把他的观点与后世毕达哥拉斯派区分开来。",
"ideas": [
"数是万物的本原",
"灵魂转世",
"音乐和谐与宇宙秩序",
"哲学作为一种生活方式"
],
"books": [],
"quote": "",
"start": "查尔斯·卡恩《毕达哥拉斯与毕达哥拉斯学派》（Charles Kahn, Pythagoras and the Pythagoreans）"
},
{
"id": "xenophanes",
"name": "色诺芬尼",
"nameEn": "Xenophanes",
"era": "前苏格拉底",
"born": "约公元前570年",
"birthplace": "科洛封",
"died": "约公元前478年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "前苏格拉底",
"wiki": "Xenophanes",
"bio": "色诺芬尼是一位漫游的诗人与哲学家，抨击荷马和赫西俄德那种拟人化的神。他主张只有一个神，其身体和思想都不像凡人。他还较早地提出疑问：人能否获得确定的知识。",
"ideas": [
"批判拟人化的神",
"一个不像凡人的神",
"早期的认识论审慎"
],
"books": [
["残篇", -500, "讽刺性与神学性的诗作。", "Fragments"]
],
"quote": "",
"start": "基尔克、拉文与斯科菲尔德《前苏格拉底哲学家》（Kirk, Raven & Schofield, The Presocratic Philosophers）"
},
{
"id": "heraclitus",
"name": "赫拉克利特",
"nameEn": "Heraclitus",
"era": "前苏格拉底",
"born": "约公元前535年",
"birthplace": "以弗所",
"died": "约公元前475年",
"deathplace": "以弗所",
"nationality": "希腊",
"schools": "前苏格拉底",
"wiki": "Heraclitus",
"bio": "以弗所的赫拉克利特以刻意晦涩的格言写作，因而得名“晦涩者”。他教导世界是一团永恒的活火，永远变化，却受一种理性秩序即逻各斯支配。对立面在张力中结合，战争是万物之父。",
"ideas": [
"万物流变",
"逻各斯作为隐秘的秩序",
"对立面的统一",
"火作为基本元素"
],
"books": [
["残篇", -500, "关于流变、火与对立面统一的格言。", "Fragments"]
],
"quote": "人不能两次踏进同一条河流。",
"start": "查尔斯·卡恩《赫拉克利特的艺术与思想》（Charles Kahn, The Art and Thought of Heraclitus）"
},
{
"id": "parmenides",
"name": "巴门尼德",
"nameEn": "Parmenides",
"era": "前苏格拉底",
"born": "约公元前515年",
"birthplace": "埃利亚",
"died": "约公元前450年",
"deathplace": "埃利亚",
"nationality": "希腊",
"schools": "埃利亚学派",
"wiki": "Parmenides",
"bio": "埃利亚的巴门尼德写了一首哲学诗，诗中女神揭示了“真理之路”与“意见之路”。他论证：存在者不能不存在，因此生成、变化与众多性都是不可能的。他的论证为柏拉图、原子论者以及后世大量形而上学设定了议程。",
"ideas": [
"存在者存在",
"不存在者不存在",
"变化与众多性是幻象",
"理性高于感官"
],
"books": [
["论自然（诗）", -475, "真理之路与意见之路的对立。", "On Nature (poem)"]
],
"quote": "",
"start": "柏拉图《巴门尼德篇》（Parmenides），然后读诗作本身（Gallop 译本）"
},
{
"id": "zenoelea",
"name": "埃利亚的芝诺",
"nameEn": "Zeno of Elea",
"era": "前苏格拉底",
"born": "约公元前490年",
"birthplace": "埃利亚",
"died": "约公元前430年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "埃利亚学派",
"wiki": "Zeno of Elea",
"bio": "芝诺是巴门尼德的学生，用悖论为他辩护。他的论证如“阿基里斯与乌龟”和“飞矢”，意在表明运动与众多性会导致矛盾。亚里士多德称他为辩证法的发明者。",
"ideas": [
"运动悖论",
"归谬法",
"捍卫埃利亚学派的一元论"
],
"books": [],
"quote": "",
"start": "柏拉图《巴门尼德篇》（Parmenides，开场场景）"
},
{
"id": "empedocles",
"name": "恩培多克勒",
"nameEn": "Empedocles",
"era": "前苏格拉底",
"born": "约公元前494年",
"birthplace": "西西里的阿克拉加斯",
"died": "约公元前434年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "多元论",
"wiki": "Empedocles",
"bio": "恩培多克勒提出四根——土、水、气、火——由爱与争两种力量使之混合与分离。宇宙在完全的统一与完全的分离之间循环。他也是一位诗人、医生，并被认为具有神奇能力。",
"ideas": [
"四元素",
"爱与争作为宇宙力量",
"循环的宇宙"
],
"books": [
["论自然", -450, "论述四根的物理诗篇。", "On Nature"],
["净化", -450, "关于灵魂流放的宗教诗篇。", "Purifications"]
],
"quote": "",
"start": "基尔克、拉文与斯科菲尔德《前苏格拉底哲学家》（Kirk, Raven & Schofield, The Presocratic Philosophers）"
},
{
"id": "anaxagoras",
"name": "阿那克萨戈拉",
"nameEn": "Anaxagoras",
"era": "前苏格拉底",
"born": "约公元前500年",
"birthplace": "克拉佐美尼",
"died": "约公元前428年",
"deathplace": "兰普萨库斯",
"nationality": "希腊",
"schools": "多元论",
"wiki": "Anaxagoras",
"bio": "阿那克萨戈拉把哲学带到雅典，在那里与伯里克利交好。他认为万物都含有万物的部分，而努斯（心灵）使宇宙运动起来。他因称太阳是一块炽热的石头而被控不敬神，离开了雅典。",
"ideas": [
"努斯（心灵）作为宇宙原因",
"“万物之中有万物的一部分”",
"太阳是一块炽热的石头"
],
"books": [],
"quote": "",
"start": "柏拉图《斐多篇》97b–99d（Phaedo 97b–99d，苏格拉底论阿那克萨戈拉）"
},
{
"id": "democritus",
"name": "德谟克利特",
"nameEn": "Democritus",
"era": "前苏格拉底",
"born": "约公元前460年",
"birthplace": "阿布德拉",
"died": "约公元前370年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "原子论",
"wiki": "Democritus",
"bio": "德谟克利特与老师留基伯共同发展出这样的理论：实在由在虚空中运动的不可分原子构成。颜色、味道等性质出于约定，并不存在于原子之中。他被称为“笑的哲学家”，也写有伦理学著作，提倡欢愉。",
"ideas": [
"原子与虚空",
"第二性质出于约定",
"欢愉（euthymia）的伦理学"
],
"books": [
["残篇", -420, "原子论与伦理格言。", "Fragments"]
],
"quote": "",
"start": "基尔克、拉文与斯科菲尔德《前苏格拉底哲学家》（Kirk, Raven & Schofield, The Presocratic Philosophers）"
},
{
"id": "protagoras",
"name": "普罗泰戈拉",
"nameEn": "Protagoras",
"era": "古典希腊",
"born": "约公元前490年",
"birthplace": "阿布德拉",
"died": "约公元前420年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "智者派",
"wiki": "Protagoras",
"bio": "普罗泰戈拉是智者派中最著名的人物，智者以收费教授修辞与德性为业。他“人是万物的尺度”的主张成为相对主义的经典表述。柏拉图写有一篇以他命名的对话。",
"ideas": [
"人是万物的尺度",
"关于神的不可知论",
"收费教授德性"
],
"books": [],
"quote": "",
"start": "柏拉图《普罗泰戈拉篇》（Protagoras）"
},
{
"id": "socrates",
"name": "苏格拉底",
"nameEn": "Socrates",
"era": "古典希腊",
"born": "约公元前470年",
"birthplace": "雅典",
"died": "公元前399年",
"deathplace": "雅典",
"nationality": "希腊",
"schools": "苏格拉底学派",
"wiki": "Socrates",
"bio": "苏格拉底没有写下任何著作；我们通过柏拉图、色诺芬和阿里斯托芬了解他。他向雅典人追问德性，表明他们自以为拥有的知识并无根据，同时自称无知。他被控不敬神和败坏青年，被判处饮毒芹而死。",
"ideas": [
"苏格拉底方法（诘问法）",
"德性即知识",
"关心灵魂",
"对自身无知的自觉"
],
"books": [],
"quote": "对人而言，未经省察的人生不值得过。",
"start": "柏拉图《申辩篇》（Apology）"
},
{
"id": "diogenes",
"name": "锡诺普的第欧根尼",
"nameEn": "Diogenes of Sinope",
"era": "古典希腊",
"born": "约公元前412年",
"birthplace": "锡诺普",
"died": "公元前323年",
"deathplace": "科林斯",
"nationality": "希腊",
"schools": "犬儒主义",
"wiki": "Diogenes",
"bio": "第欧根尼在雅典住在一只大陶瓮里，蔑视习俗、财富与社会地位。他以挑衅性的示范教导：德性要求依自然而生活。他与亚历山大大帝的轶事流传甚广；他没有著作存世。",
"ideas": [
"依自然而生活",
"蔑视习俗",
"自足（autarkeia）",
"世界主义"
],
"books": [],
"quote": "",
"start": "第欧根尼·拉尔修《名哲言行录》第六卷（Diogenes Laertius, Lives of the Eminent Philosophers, Book VI）"
},
{
"id": "plato",
"name": "柏拉图",
"nameEn": "Plato",
"era": "古典希腊",
"born": "约公元前428年",
"birthplace": "雅典",
"died": "约公元前348年",
"deathplace": "雅典",
"nationality": "希腊",
"schools": "柏拉图主义",
"wiki": "Plato",
"bio": "柏拉图是苏格拉底的学生，在雅典创立了学园。他的对话录大多以苏格拉底为主角，涉及伦理、政治、知识、爱与灵魂。他主张可见世界模仿只能由理性把握的永恒之相。怀特海称欧洲哲学不过是对柏拉图的一系列注脚。",
"ideas": [
"相论",
"灵魂的不朽与回忆",
"哲学王",
"洞穴寓言"
],
"books": [
["申辩篇", -399, "苏格拉底在受审时的辩护。", "Apology"],
["会饮篇", -385, "关于爱逐级上升至美本身的诸篇讲辞。", "Symposium"],
["理想国", -375, "正义、理想城邦与洞穴。", "Republic"],
["斐多篇", -360, "灵魂不朽与苏格拉底之死。", "Phaedo"],
["法律篇", -348, "柏拉图最后也最长的著作，一部实用的政制。", "Laws"]
],
"quote": "",
"start": "《申辩篇》（Apology），然后读《理想国》（Republic）"
},
{
"id": "aristotle",
"name": "亚里士多德",
"nameEn": "Aristotle",
"era": "古典希腊",
"born": "公元前384年",
"birthplace": "斯塔基拉",
"died": "公元前322年",
"deathplace": "卡尔基斯",
"nationality": "希腊",
"schools": "逍遥学派",
"wiki": "Aristotle",
"bio": "亚里士多德在柏拉图的学园学习二十年，曾任亚历山大大帝的老师，并创立了吕克昂学园。他写作了逻辑学、物理学、生物学、伦理学、政治学、修辞学和诗学，其中若干领域由他奠基。他拒斥分离的相，把形式置于个别实体之中。",
"ideas": [
"三段论逻辑",
"实体、形式与质料",
"四因",
"德性作为中道，幸福作为兴盛",
"人是政治的动物"
],
"books": [
["尼各马可伦理学", -340, "德性、中道与幸福。", "Nicomachean Ethics"],
["政治学", -335, "城邦、公民身份与政体。", "Politics"],
["形而上学", -330, "作为存在的存在、实体、不动的推动者。", "Metaphysics"],
["诗学", -335, "悲剧、模仿与净化。", "Poetics"]
],
"quote": "",
"start": "《尼各马可伦理学》（Nicomachean Ethics）"
},
{
"id": "epicurus",
"name": "伊壁鸠鲁",
"nameEn": "Epicurus",
"era": "希腊化与罗马",
"born": "公元前341年",
"birthplace": "萨摩斯",
"died": "公元前270年",
"deathplace": "雅典",
"nationality": "希腊",
"schools": "伊壁鸠鲁主义",
"wiki": "Epicurus",
"bio": "伊壁鸠鲁在雅典创立了“花园”。他教导快乐——理解为身体无痛与心灵不受扰——是人生的目标。他借助德谟克利特的原子论，论证死亡与我们无关，神也不干预世界。",
"ideas": [
"快乐即无痛（ataraxia）",
"死亡与我们无关",
"带有偏斜的原子论",
"友谊的价值"
],
"books": [
["致美诺寇的信", -300, "伊壁鸠鲁伦理学的纲要。", "Letter to Menoeceus"]
],
"quote": "死亡与我们无关。",
"start": "《致美诺寇的信》（Letter to Menoeceus）"
},
{
"id": "pyrrho",
"name": "皮浪",
"nameEn": "Pyrrho",
"era": "希腊化与罗马",
"born": "约公元前360年",
"birthplace": "埃利斯",
"died": "约公元前270年",
"deathplace": "埃利斯",
"nationality": "希腊",
"schools": "皮浪主义",
"wiki": "Pyrrho",
"bio": "皮浪随亚历山大的军队到过印度，归来后教导事物不可判定。正确的回应是悬置判断，这会带来宁静。他没有写下著作，后来的皮浪主义以他的名字命名。",
"ideas": [
"悬置判断（epoché）",
"因不知而宁静"
],
"books": [],
"quote": "",
"start": "塞克斯都·恩披里柯《皮浪主义纲要》（Sextus Empiricus, Outlines of Pyrrhonism）"
},
{
"id": "zeno",
"name": "基提翁的芝诺",
"nameEn": "Zeno of Citium",
"era": "希腊化与罗马",
"born": "约公元前334年",
"birthplace": "塞浦路斯的基提翁",
"died": "约公元前262年",
"deathplace": "雅典",
"nationality": "希腊（塞浦路斯）",
"schools": "斯多亚主义",
"wiki": "Zeno of Citium",
"bio": "芝诺创立了斯多亚主义，在雅典的“彩绘柱廊”（Stoa Poikile）讲学。他教导德性是唯一的善，智者依自然与理性而生活。他的著作已佚失，但其体系由克雷安泰斯和克律西波斯发展。",
"ideas": [
"德性是唯一的善",
"依自然而生活",
"逻各斯贯穿宇宙"
],
"books": [],
"quote": "",
"start": "第欧根尼·拉尔修《名哲言行录》第七卷（Diogenes Laertius, Lives, Book VII）"
},
{
"id": "chrysippus",
"name": "克律西波斯",
"nameEn": "Chrysippus",
"era": "希腊化与罗马",
"born": "约公元前279年",
"birthplace": "奇里乞亚的索利",
"died": "约公元前206年",
"deathplace": "雅典",
"nationality": "希腊",
"schools": "斯多亚主义",
"wiki": "Chrysippus",
"bio": "克律西波斯是斯多亚学派的第三任领袖，也是其最伟大的体系化者。他发展了斯多亚的命题逻辑及其命运与因果理论。古代作家说，没有克律西波斯，就不会有斯多亚学派。",
"ideas": [
"命题逻辑",
"命运与相容论",
"斯多亚的情感理论"
],
"books": [],
"quote": "",
"start": "A. A. 朗与 D. N. 塞德利《希腊化哲学家》（A. A. Long & D. N. Sedley, The Hellenistic Philosophers）"
},
{
"id": "cicero",
"name": "西塞罗",
"nameEn": "Cicero",
"era": "希腊化与罗马",
"born": "公元前106年",
"birthplace": "阿尔皮努姆",
"died": "公元前43年",
"deathplace": "福尔米亚",
"nationality": "罗马",
"schools": "学园怀疑主义、折衷主义",
"wiki": "Cicero",
"bio": "西塞罗是罗马的政治家、演说家和律师，把希腊哲学引入拉丁语。他写作了关于国家、法律、义务、神与好生活的作品。他因反对马克·安东尼而遭其下令杀害。",
"ideas": [
"自然法",
"共和制的混合政体",
"义务（officia）",
"拉丁哲学词汇"
],
"books": [
["论共和国", -51, "最好的政制与“西庇阿之梦”。", "On the Republic"],
["论义务", -44, "写给儿子的义务伦理学。", "On Duties"],
["图斯库卢姆辩论集", -45, "死亡、痛苦与幸福。", "Tusculan Disputations"]
],
"quote": "",
"start": "《论义务》（On Duties）"
},
{
"id": "lucretius",
"name": "卢克莱修",
"nameEn": "Lucretius",
"era": "希腊化与罗马",
"born": "约公元前99年",
"birthplace": "不详",
"died": "约公元前55年",
"deathplace": "不详",
"nationality": "罗马",
"schools": "伊壁鸠鲁主义",
"wiki": "Lucretius",
"bio": "卢克莱修是罗马诗人，其生平几乎无从得知。他唯一的一部作品以拉丁韵文阐述伊壁鸠鲁的物理学与伦理学，意在使读者摆脱对神与死亡的恐惧。",
"ideas": [
"原子论",
"摆脱对死亡的恐惧",
"世界与社会的自然起源"
],
"books": [
["物性论", -55, "以六卷韵文阐述伊壁鸠鲁物理学。", "De Rerum Natura"]
],
"quote": "",
"start": "《物性论》（De Rerum Natura，Stallings 或 Smith 译本）"
},
{
"id": "seneca",
"name": "塞涅卡",
"nameEn": "Seneca",
"era": "希腊化与罗马",
"born": "约公元前4年",
"birthplace": "西班牙的科尔杜巴",
"died": "65年",
"deathplace": "罗马",
"nationality": "罗马",
"schools": "斯多亚主义",
"wiki": "Seneca the Younger",
"bio": "塞涅卡是斯多亚哲学家、剧作家，也是皇帝尼禄的顾问。他的书信与随笔把斯多亚主义应用于愤怒、悲伤、财富与死亡。他被控参与阴谋，奉尼禄之命自尽。",
"ideas": [
"实践的斯多亚伦理学",
"时间的利用",
"驾驭愤怒与悲伤"
],
"books": [
["致卢基里乌斯书信", 65, "124封实践性斯多亚劝诫书信。", "Letters to Lucilius"],
["论生命之短暂", 49, "若懂得利用，人生便足够长。", "On the Shortness of Life"]
],
"quote": "",
"start": "《论生命之短暂》（On the Shortness of Life）"
},
{
"id": "epictetus",
"name": "爱比克泰德",
"nameEn": "Epictetus",
"era": "希腊化与罗马",
"born": "约50年",
"birthplace": "弗里吉亚的希拉波利斯",
"died": "约135年",
"deathplace": "尼科波利斯",
"nationality": "希腊",
"schools": "斯多亚主义",
"wiki": "Epictetus",
"bio": "爱比克泰德生而为奴，后获自由；哲学家被逐出罗马后，他在尼科波利斯教授斯多亚主义。他没有写作，其教诲由学生阿里安记录。其核心是区分在我们能力之内与之外的事物。",
"ideas": [
"控制的二分",
"扰乱人的是判断而非事物",
"自由在内"
],
"books": [
["论说集", 108, "由阿里安记录的讲演。", "Discourses"],
["手册", 125, "由阿里安编纂的简明手册。", "Enchiridion"]
],
"quote": "扰乱人的不是事物，而是关于事物的意见。",
"start": "《手册》（Enchiridion）"
},
{
"id": "marcus",
"name": "马可·奥勒留",
"nameEn": "Marcus Aurelius",
"era": "希腊化与罗马",
"born": "121年",
"birthplace": "罗马",
"died": "180年",
"deathplace": "文多波纳或西尔米乌姆",
"nationality": "罗马",
"schools": "斯多亚主义",
"wiki": "Marcus Aurelius",
"bio": "马可·奥勒留于161年至180年在位为罗马皇帝。他的私人笔记部分写于军旅之中，记录了斯多亚式的自我劝勉。它们本不为发表而写，后来却成为读者最多的哲学著作之一。",
"ideas": [
"义务与接受",
"无常",
"理性存在者的共同善"
],
"books": [
["沉思录", 175, "私人的斯多亚笔记。", "Meditations"]
],
"quote": "",
"start": "《沉思录》（Meditations，Hays 译本）"
},
{
"id": "plotinus",
"name": "普罗提诺",
"nameEn": "Plotinus",
"era": "希腊化与罗马",
"born": "约204年",
"birthplace": "埃及的吕科波利斯",
"died": "270年",
"deathplace": "坎帕尼亚",
"nationality": "罗马（生于埃及，讲希腊语）",
"schools": "新柏拉图主义",
"wiki": "Plotinus",
"bio": "普罗提诺在罗马讲学，创立了新柏拉图主义。实在从“太一”经“理智”与“灵魂”流溢而出，灵魂可在沉思中回归太一。他的学生波菲利把他的论文编成《九章集》。",
"ideas": [
"太一、理智、灵魂",
"流溢",
"神秘的上升"
],
"books": [
["九章集", 270, "由波菲利编定的五十四篇论文。", "Enneads"]
],
"quote": "",
"start": "《九章集》I.6“论美”（Enneads I.6 \"On Beauty\"）"
},
{
"id": "sextus",
"name": "塞克斯都·恩披里柯",
"nameEn": "Sextus Empiricus",
"era": "希腊化与罗马",
"born": "约160年",
"birthplace": "不详",
"died": "约210年",
"deathplace": "不详",
"nationality": "希腊",
"schools": "皮浪主义",
"wiki": "Sextus Empiricus",
"bio": "塞克斯都是一位医生，其著作是古代皮浪主义怀疑论的主要史料。他提出种种论证模式，使人在任何问题上都悬置判断。他在16世纪被重新发现，影响了蒙田和早期近代哲学。",
"ideas": [
"怀疑论的诸模式",
"悬置判断",
"依现象而生活"
],
"books": [
["皮浪主义纲要", 200, "怀疑论手册。", "Outlines of Pyrrhonism"]
],
"quote": "",
"start": "《皮浪主义纲要》第一卷（Outlines of Pyrrhonism, Book I）"
},
{
"id": "hypatia",
"name": "希帕蒂娅",
"nameEn": "Hypatia",
"era": "希腊化与罗马",
"born": "约360年",
"birthplace": "亚历山大里亚",
"died": "415年",
"deathplace": "亚历山大里亚",
"nationality": "希腊（罗马治下的埃及）",
"schools": "新柏拉图主义",
"wiki": "Hypatia",
"bio": "希帕蒂娅是亚历山大里亚的数学家、天文学家和柏拉图主义教师。她以学识和政治影响力受人敬重。415年她被一群基督徒暴民杀害；没有作品确凿地传世。",
"ideas": [
"新柏拉图主义教学",
"数学注释"
],
"books": [],
"quote": "",
"start": "玛丽亚·杰尔泽尔斯卡《亚历山大里亚的希帕蒂娅》（Maria Dzielska, Hypatia of Alexandria）"
},
{
"id": "laozi",
"name": "老子",
"nameEn": "Laozi",
"era": "东方",
"born": "约公元前6世纪（传统说法）",
"birthplace": "楚国（传统说法）",
"died": "不详",
"deathplace": "不详",
"nationality": "中国",
"schools": "道家",
"wiki": "Laozi",
"bio": "老子是《道德经》的传统作者，道家的创始人。他是否真实存在尚不确定，该书可能经过了长时间的编纂。它教导通过无为、素朴与柔弱来与道和谐相处。",
"ideas": [
"道作为不可名的本源",
"无为（不勉强的行动）",
"柔弱胜刚强",
"素朴"
],
"books": [
["道德经", -400, "81章短文，论道及其德。", "Tao Te Ching"]
],
"quote": "道可道，非常道。",
"start": "《道德经》（Tao Te Ching，刘殿爵译本）"
},
{
"id": "confucius",
"name": "孔子",
"nameEn": "Confucius",
"era": "东方",
"born": "公元前551年",
"birthplace": "鲁国曲阜",
"died": "公元前479年",
"deathplace": "鲁国曲阜",
"nationality": "中国",
"schools": "儒家",
"wiki": "Confucius",
"bio": "孔子是鲁国的一位教师和小官吏。他教导社会和谐源于修养而成的道德品格、礼的合宜与正当的人伦关系。其言论由弟子辑成《论语》，两千年来一直是中国教育的核心。",
"ideas": [
"仁",
"礼",
"君子",
"正名",
"孝"
],
"books": [
["论语", -475, "由弟子辑录的言论与对话。", "Analects"]
],
"quote": "",
"start": "《论语》（Analects，Slingerland 译本）"
},
{
"id": "mozi",
"name": "墨子",
"nameEn": "Mozi",
"era": "东方",
"born": "约公元前470年",
"birthplace": "鲁国或宋国",
"died": "约公元前391年",
"deathplace": "不详",
"nationality": "中国",
"schools": "墨家",
"wiki": "Mozi",
"bio": "墨子创立了墨家，这是战国时期与儒家分庭抗礼的主要学派。他主张兼爱天下之人，反对儒家有差等的爱，并谴责侵略战争与浪费的礼制。墨家还发展了早期逻辑学与防御性军事工程学。",
"ideas": [
"兼爱（jian ai）",
"反对侵略战争",
"以功利为标准的后果主义",
"节用"
],
"books": [
["墨子", -400, "墨家学派的文集。", "Mozi"]
],
"quote": "",
"start": "墨子基本著作（Mozi: Basic Writings，Burton Watson）"
},
{
"id": "zhuangzi",
"name": "庄子",
"nameEn": "Zhuangzi",
"era": "东方",
"born": "约公元前369年",
"birthplace": "宋国蒙",
"died": "约公元前286年",
"deathplace": "不详",
"nationality": "中国",
"schools": "道家",
"wiki": "Zhuang Zhou",
"bio": "庄子是道家第二位大师，其思想见于以他命名的书。他以幽默与寓言质疑固定的视角、世俗的价值以及梦与醒的界限。他推崇自发的自由，主张接受包括死亡在内的一切变化。",
"ideas": [
"视角的相对性",
"自发与自由",
"蝴蝶梦",
"接受变化"
],
"books": [
["庄子", -300, "关于自由与转化的寓言。", "Zhuangzi"]
],
"quote": "",
"start": "庄子基本著作（Zhuangzi: Basic Writings，Burton Watson）"
},
{
"id": "mencius",
"name": "孟子",
"nameEn": "Mencius",
"era": "东方",
"born": "约公元前372年",
"birthplace": "邹",
"died": "约公元前289年",
"deathplace": "不详",
"nationality": "中国",
"schools": "儒家",
"wiki": "Mencius",
"bio": "孟子是孔子之后最重要的儒家。他主张人性本善，其中含有需要培养的德性萌芽。他认为压迫人民的统治者会失去天命。",
"ideas": [
"人性本善",
"四端",
"仁政",
"天命"
],
"books": [
["孟子", -300, "与君主及弟子的对话。", "Mencius"]
],
"quote": "",
"start": "《孟子》（Mencius，刘殿爵译）"
},
{
"id": "xunzi",
"name": "荀子",
"nameEn": "Xunzi",
"era": "东方",
"born": "约公元前310年",
"birthplace": "赵国",
"died": "约公元前235年",
"deathplace": "兰陵",
"nationality": "中国",
"schools": "儒家",
"wiki": "Xunzi (philosopher)",
"bio": "荀子是一位儒家，与孟子相反，他主张人性本恶，必须由礼义与学习来塑造。他认为天是自然的，而非道德的。他的学生包括韩非与李斯。",
"ideas": [
"人性本恶",
"礼与教育改造人",
"自然之天"
],
"books": [
["荀子", -250, "论礼、学习与天的文章。", "Xunzi"]
],
"quote": "",
"start": "荀子基本著作（Xunzi: Basic Writings，Burton Watson）"
},
{
"id": "hanfeizi",
"name": "韩非子",
"nameEn": "Han Feizi",
"era": "东方",
"born": "约公元前280年",
"birthplace": "韩国",
"died": "公元前233年",
"deathplace": "秦国",
"nationality": "中国",
"schools": "法家",
"wiki": "Han Fei",
"bio": "韩非子是韩国公子，也是法家的集大成者。他主张秩序来自明确的法律、赏罚以及君主控制臣下的术，而非德性。他的思想影响了秦统一中国。",
"ideas": [
"以法治国（法）",
"驭臣之术（术）",
"势",
"赏罚"
],
"books": [
["韩非子", -233, "论治国之术与法律的文章。", "Han Feizi"]
],
"quote": "",
"start": "韩非子基本著作（Han Feizi: Basic Writings，Burton Watson）"
},
{
"id": "buddha",
"name": "释迦牟尼",
"nameEn": "Siddhartha Gautama",
"era": "东方",
"born": "约公元前5世纪",
"birthplace": "蓝毗尼",
"died": "约公元前5世纪",
"deathplace": "拘尸那迦",
"nationality": "印度（释迦族）",
"schools": "佛教",
"wiki": "The Buddha",
"bio": "乔达摩·悉达多即佛陀，他舍弃王子生活并证得觉悟。他宣说四圣谛与八正道，作为灭除苦的方法。他的教法否定恒常之我，强调缘起；其教说在写成文字之前以口传方式流传。",
"ideas": [
"四圣谛",
"无我（anatta）",
"无常",
"缘起",
"中道"
],
"books": [
["法句经", -300, "佛陀教法的偈颂（后来编纂）。", "Dhammapada"]
],
"quote": "",
"start": "罗睺罗（Walpola Rahula）《佛陀的启示》（What the Buddha Taught）"
},
{
"id": "nagarjuna",
"name": "龙树",
"nameEn": "Nagarjuna",
"era": "东方",
"born": "约150年",
"birthplace": "南印度",
"died": "约250年",
"deathplace": "不详",
"nationality": "印度",
"schools": "中观佛教",
"wiki": "Nagarjuna",
"bio": "龙树创立了大乘佛教的中观学派。他主张一切事物因缘而生，故无自性，即是空。他的辩证法表明，任何执定的见解都会导致矛盾。",
"ideas": [
"空（sunyata）",
"二谛：世俗谛与胜义谛",
"缘起",
"对实体的批判"
],
"books": [
["中论", 200, "中道根本偈颂。", "Mulamadhyamakakarika"]
],
"quote": "",
"start": "杰伊·加菲尔德（Jay Garfield）《中观根本慧论》（The Fundamental Wisdom of the Middle Way）"
},
{
"id": "vasubandhu",
"name": "世亲",
"nameEn": "Vasubandhu",
"era": "东方",
"born": "约4世纪",
"birthplace": "布路沙布逻（白沙瓦）",
"died": "约4—5世纪",
"deathplace": "不详",
"nationality": "印度",
"schools": "唯识佛教",
"wiki": "Vasubandhu",
"bio": "世亲写了一部重要的阿毗达磨纲要，后来据传统记载在其异父兄无著的引导下转向大乘。他与无著共同创立了“唯识”的瑜伽行派。他的短篇偈颂论著在印度与东亚佛教中始终居于核心地位。",
"ideas": [
"唯识（vijnaptimatra）",
"阿赖耶识",
"三性"
],
"books": [
["阿毗达磨俱舍论", 380, "阿毗达磨的宝藏。", "Abhidharmakosha"],
["唯识二十论", 400, "论证唯识。", "Twenty Verses"]
],
"quote": "",
"start": "乔纳森·戈尔德（Jonathan Gold）《铺就大道》（Paving the Great Way）"
},
{
"id": "dharmakirti",
"name": "法称",
"nameEn": "Dharmakirti",
"era": "东方",
"born": "约7世纪",
"birthplace": "南印度",
"died": "不详",
"deathplace": "不详",
"nationality": "印度",
"schools": "佛教认识论",
"wiki": "Dharmakirti",
"bio": "法称是佛教最杰出的逻辑学家与认识论家。他在陈那的基础上，将现量与比量分析为唯一有效的知识手段。他的著作在此后数百年间主导了印度与西藏的论辩。",
"ideas": [
"两种有效认知手段",
"刹那灭",
"遮诠（apoha）的意义理论"
],
"books": [
["释量论", 650, "关于有效认知的论释。", "Pramanavarttika"]
],
"quote": "",
"start": "约翰·邓恩（John Dunne）《法称哲学的基础》（Foundations of Dharmakirti's Philosophy）"
},
{
"id": "shankara",
"name": "商羯罗",
"nameEn": "Adi Shankara",
"era": "东方",
"born": "约8世纪",
"birthplace": "喀拉拉邦的卡拉迪（传统说法）",
"died": "不详",
"deathplace": "不详",
"nationality": "印度",
"schools": "不二吠檀多",
"wiki": "Adi Shankara",
"bio": "商羯罗将不二论吠檀多系统化。他主张唯有梵是真实的，世界是显现，而自我与梵同一。他为《奥义书》、《薄伽梵歌》与《梵经》撰写了注释。",
"ideas": [
"我（阿特曼）与梵不二",
"摩耶（幻）",
"通过知识获得解脱"
],
"books": [
["梵经注", 800, "对《梵经》的注释。", "Brahma Sutra Bhashya"]
],
"quote": "",
"start": "艾略特·多伊奇（Eliot Deutsch）《不二吠檀多：一种哲学重建》（Advaita Vedanta: A Philosophical Reconstruction）"
},
{
"id": "ramanuja",
"name": "罗摩奴阇",
"nameEn": "Ramanuja",
"era": "东方",
"born": "约1017年",
"birthplace": "斯里佩鲁姆布杜尔",
"died": "约1137年",
"deathplace": "斯里兰甘",
"nationality": "印度",
"schools": "限定不二吠檀多",
"wiki": "Ramanuja",
"bio": "罗摩奴阇是限定不二论的主要神学家。他反对商羯罗，主张世界与灵魂都是真实的，并构成神的身体。他为对人格神的虔信（bhakti）提供了哲学基础。",
"ideas": [
"限定不二论",
"世界是神的身体",
"虔信（bhakti）"
],
"books": [
["吉祥疏", 1100, "对《梵经》的注释。", "Sri Bhashya"]
],
"quote": "",
"start": "约翰·卡曼（John Carman）《罗摩奴阇的神学》（The Theology of Ramanuja）"
},
{
"id": "zhuxi",
"name": "朱熹",
"nameEn": "Zhu Xi",
"era": "东方",
"born": "1130年",
"birthplace": "福建尤溪",
"died": "1200年",
"deathplace": "建阳",
"nationality": "中国",
"schools": "理学",
"wiki": "Zhu Xi",
"bio": "朱熹综合了理学，将理与气纳入同一形而上学体系。他选定“四书”作为儒家学问的核心。他的注释成为1313年至1905年间科举考试的依据。",
"ideas": [
"理与气",
"格物",
"四书"
],
"books": [
["近思录", 1175, "与吕祖谦合编的理学思想选辑。", "Reflections on Things at Hand"]
],
"quote": "",
"start": "丹尼尔·加德纳（Daniel Gardner）《学做圣贤》（Learning to Be a Sage）"
},
{
"id": "wang",
"name": "王阳明",
"nameEn": "Wang Yangming",
"era": "东方",
"born": "1472年",
"birthplace": "浙江余姚",
"died": "1529年",
"deathplace": "江西南安",
"nationality": "中国",
"schools": "理学（心学）",
"wiki": "Wang Yangming",
"bio": "王阳明是学者型官员与将领，创立了心学。他反对朱熹，主张理在心中而不在外部事物。他教导知行合一与良知。",
"ideas": [
"知行合一",
"良知",
"心即理"
],
"books": [
["传习录", 1518, "对话与书信。", "Instructions for Practical Living"]
],
"quote": "",
"start": "《传习录》（Instructions for Practical Living，陈荣捷译）"
},
{
"id": "dogen",
"name": "道元",
"nameEn": "Dogen",
"era": "东方",
"born": "1200年",
"birthplace": "京都",
"died": "1253年",
"deathplace": "京都",
"nationality": "日本",
"schools": "曹洞宗",
"wiki": "Dōgen",
"bio": "道元在中国学习禅法，并在日本创立曹洞宗。他主张坐禅本身就是觉悟，而非达到觉悟的手段。他的文章探讨时间、存在与佛性。",
"ideas": [
"只管打坐（shikantaza）",
"修证一如",
"有时（uji）"
],
"books": [
["正法眼藏", 1253, "真实法眼之宝藏。", "Shobogenzo"]
],
"quote": "",
"start": "棚桥一晃（Kazuaki Tanahashi）编《露珠中的月亮》（Moon in a Dewdrop）"
},
{
"id": "nishida",
"name": "西田几多郎",
"nameEn": "Kitaro Nishida",
"era": "东方",
"born": "1870年",
"birthplace": "石川县河北",
"died": "1945年",
"deathplace": "镰仓",
"nationality": "日本",
"schools": "京都学派",
"wiki": "Kitaro Nishida",
"bio": "西田创立了京都学派，促成禅与西方哲学的对话。他的第一部著作将实在奠基于先于主客的“纯粹经验”。他后来发展了场所（basho）逻辑与绝对无。",
"ideas": [
"纯粹经验",
"场所逻辑（basho）",
"绝对无"
],
"books": [
["善的研究", 1911, "以纯粹经验为实在。", "An Inquiry into the Good"]
],
"quote": "",
"start": "《善的研究》（An Inquiry into the Good）"
},
{
"id": "nishitani",
"name": "西谷启治",
"nameEn": "Keiji Nishitani",
"era": "东方",
"born": "1900年",
"birthplace": "石川",
"died": "1990年",
"deathplace": "京都",
"nationality": "日本",
"schools": "京都学派",
"wiki": "Keiji Nishitani",
"bio": "西谷曾随西田与海德格尔学习。他以佛教的空观面对欧洲的虚无主义。他主张虚无主义必须被穿越，而不能回避。",
"ideas": [
"通过空克服虚无主义",
"空之场"
],
"books": [
["宗教与无", 1961, "论虚无主义与空。", "Religion and Nothingness"]
],
"quote": "",
"start": "《宗教与无》（Religion and Nothingness）"
},
{
"id": "suzuki",
"name": "铃木大拙",
"nameEn": "D. T. Suzuki",
"era": "东方",
"born": "1870年",
"birthplace": "金泽",
"died": "1966年",
"deathplace": "东京",
"nationality": "日本",
"schools": "禅宗",
"wiki": "D. T. Suzuki",
"bio": "铃木大拙是向西方阐释禅宗最具影响力的人。他的英文著作影响了作家、艺术家与心理学家对佛教的接受。他曾在日本与美国的大学任教。",
"ideas": [
"悟（satori）",
"禅作为直接经验"
],
"books": [
["禅佛教入门", 1934, "面向西方读者的经典入门书。", "An Introduction to Zen Buddhism"]
],
"quote": "",
"start": "《禅佛教入门》（An Introduction to Zen Buddhism）"
},
{
"id": "alkindi",
"name": "金迪",
"nameEn": "Al-Kindi",
"era": "中世纪",
"born": "约801年",
"birthplace": "库法",
"died": "约873年",
"deathplace": "巴格达",
"nationality": "阿拉伯",
"schools": "法尔萨法",
"wiki": "Al-Kindi",
"bio": "金迪被称为“阿拉伯人的哲学家”，是在阿拉伯语中写作的第一位重要哲学家。他在巴格达与翻译家合作，将希腊哲学改造以适应伊斯兰的一神论。他主张哲学与启示相一致，并捍卫世界在时间中被创造。",
"ideas": [
"哲学与启示的和谐",
"时间中的创造",
"哲学是从任何来源获得的真理"
],
"books": [
["论第一哲学", 850, "形而上学与唯一的真者。", "On First Philosophy"]
],
"quote": "",
"start": "彼得·亚当森（Peter Adamson）《金迪》（Al-Kindi）"
},
{
"id": "alfarabi",
"name": "法拉比",
"nameEn": "Al-Farabi",
"era": "中世纪",
"born": "约872年",
"birthplace": "中亚的法拉布",
"died": "约950年",
"deathplace": "大马士革",
"nationality": "波斯人或突厥人",
"schools": "法尔萨法、新柏拉图主义",
"wiki": "Al-Farabi",
"bio": "法拉比被称为继亚里士多德之后的“第二导师”。他撰写了逻辑学注释，以及一部以柏拉图《理想国》为范本的政治哲学。他的著作影响了阿维森纳、迈蒙尼德，以及20世纪的列奥·施特劳斯。",
"ideas": [
"德性之城",
"哲学家—先知作为统治者",
"逻辑作为普遍语法"
],
"books": [
["德性之城", 942, "德性之城居民意见的原理。", "The Virtuous City"]
],
"quote": "",
"start": "穆赫辛·马赫迪（Muhsin Mahdi）《法拉比与伊斯兰政治哲学的基础》（Alfarabi and the Foundation of Islamic Political Philosophy）"
},
{
"id": "avicenna",
"name": "阿维森纳",
"nameEn": "Avicenna",
"era": "中世纪",
"born": "约980年",
"birthplace": "布哈拉附近的阿夫沙纳",
"died": "1037年",
"deathplace": "哈马丹",
"nationality": "波斯",
"schools": "法尔萨法、亚里士多德主义",
"wiki": "Avicenna",
"bio": "阿维森纳（伊本·西那）是医师兼哲学家，其《医典》在欧洲被使用数百年。他区分本质与存在，并论证必然存在者。他的“飞人”思想实验论证了不依赖身体自我意识。",
"ideas": [
"本质与存在",
"必然存在者",
"飞人",
"医学与哲学"
],
"books": [
["治疗之书", 1027, "逻辑学、物理学与形而上学的百科全书。", "The Book of Healing"],
["医典", 1025, "标准医学教科书。", "The Canon of Medicine"]
],
"quote": "",
"start": "彼得·亚当森（Peter Adamson）《伊斯兰世界中的哲学》（Philosophy in the Islamic World）"
},
{
"id": "alghazali",
"name": "安萨里",
"nameEn": "Al-Ghazali",
"era": "中世纪",
"born": "约1058年",
"birthplace": "波斯的图斯",
"died": "1111年",
"deathplace": "图斯",
"nationality": "波斯",
"schools": "艾什尔里神学、苏菲主义",
"wiki": "Al-Ghazali",
"bio": "安萨里是法学家与神学家，曾在巴格达的尼采米亚学院任教。经历一场精神危机后，他离开教职，多年修行苏菲。他就在世界的永恒性、神的知识与复活等问题抨击阿维森纳派哲学家，同时又采用他们的逻辑。",
"ideas": [
"对哲学家的批判",
"偶因论",
"苏菲体验",
"宗教科学的复兴"
],
"books": [
["哲学家的矛盾", 1095, "对阿维森纳派哲学的抨击。", "The Incoherence of the Philosophers"],
["摆脱迷误", 1108, "思想自传。", "Deliverance from Error"]
],
"quote": "",
"start": "《摆脱迷误》（Deliverance from Error）"
},
{
"id": "averroes",
"name": "阿威罗伊",
"nameEn": "Averroes",
"era": "中世纪",
"born": "1126年",
"birthplace": "科尔多瓦",
"died": "1198年",
"deathplace": "马拉喀什",
"nationality": "安达卢西亚阿拉伯人",
"schools": "亚里士多德主义",
"wiki": "Averroes",
"bio": "阿威罗伊（伊本·鲁世德）是法官兼医师，在拉丁欧洲以亚里士多德的“注释者”闻名。他针对安萨里为哲学辩护，主张伊斯兰教法要求有能力者从事哲学。拉丁阿威罗伊主义影响了中世纪巴黎的论争。",
"ideas": [
"忠于亚里士多德",
"哲学为启示所命令",
"理智的统一"
],
"books": [
["矛盾的矛盾", 1180, "对安萨里的回应。", "The Incoherence of the Incoherence"],
["决断论", 1179, "论教法与哲学的和谐。", "The Decisive Treatise"]
],
"quote": "",
"start": "《决断论》（The Decisive Treatise）"
},
{
"id": "ibnarabi",
"name": "伊本·阿拉比",
"nameEn": "Ibn Arabi",
"era": "中世纪",
"born": "1165年",
"birthplace": "穆尔西亚",
"died": "1240年",
"deathplace": "大马士革",
"nationality": "安达卢西亚阿拉伯人",
"schools": "苏菲主义",
"wiki": "Ibn Arabi",
"bio": "伊本·阿拉比是伊斯兰世界最具影响的神秘主义思想家，被称为“大长老”。他卷帙浩繁的著作发展了后来被称为“存在统一”的思想。他的影响从摩洛哥远及印度尼西亚。",
"ideas": [
"存在统一（wahdat al-wujud）",
"完人",
"想象作为认知方式"
],
"books": [
["智慧珍宝", 1229, "诸先知的智慧。", "The Bezels of Wisdom"],
["麦加启示录", 1238, "百科全书式的神秘主义著作。", "The Meccan Revelations"]
],
"quote": "",
"start": "威廉·奇蒂克（William Chittick）《伊本·阿拉比：先知的继承者》（Ibn Arabi: Heir to the Prophets）"
},
{
"id": "ibnkhaldun",
"name": "伊本·赫勒敦",
"nameEn": "Ibn Khaldun",
"era": "中世纪",
"born": "1332年",
"birthplace": "突尼斯",
"died": "1406年",
"deathplace": "开罗",
"nationality": "阿拉伯（北非）",
"schools": "历史学",
"wiki": "Ibn Khaldun",
"bio": "伊本·赫勒敦是北非与埃及的历史学家、法官与政治家。他世界史著作的导论分析了王朝如何凭借社会凝聚力而兴衰。他常被视为社会学与经济学的先驱。",
"ideas": [
"阿萨比亚（群体团结）",
"王朝循环",
"历史中的社会与经济原因"
],
"books": [
["历史绪论", 1377, "历史与社会的导论。", "Muqaddimah"]
],
"quote": "",
"start": "《历史绪论》（Muqaddimah，Rosenthal 译，Dawood 节编）"
},
{
"id": "mullasadra",
"name": "穆拉·萨德拉",
"nameEn": "Mulla Sadra",
"era": "中世纪",
"born": "约1571年",
"birthplace": "设拉子",
"died": "1640年",
"deathplace": "巴士拉",
"nationality": "波斯",
"schools": "超越智慧",
"wiki": "Mulla Sadra",
"bio": "穆拉·萨德拉创立了“超越哲学”，综合阿维森纳、苏赫拉瓦迪的照明主义、苏菲主义与神学。他主张存在先于本质。他认为实体本身处于不断运动之中。",
"ideas": [
"存在在先",
"存在的等级",
"实体运动"
],
"books": [
["四旅程", 1628, "其哲学的主要综合。", "The Four Journeys"]
],
"quote": "",
"start": "萨贾德·里兹维（Sajjad Rizvi）《穆拉·萨德拉与形而上学》（Mulla Sadra and Metaphysics）"
},
{
"id": "saadia",
"name": "萨阿迪亚·加昂",
"nameEn": "Saadia Gaon",
"era": "中世纪",
"born": "882年",
"birthplace": "埃及法尤姆",
"died": "942年",
"deathplace": "巴格达",
"nationality": "埃及犹太人",
"schools": "犹太凯拉姆",
"wiki": "Saadia Gaon",
"bio": "萨阿迪亚主持巴比伦苏拉学院的教务。他写了第一部系统的犹太哲学，主张理性与启示相一致。他还将《圣经》译成阿拉伯语。",
"ideas": [
"理性与启示一致",
"从无中创造"
],
"books": [
["信仰与意见之书", 933, "第一部系统的犹太哲学著作。", "Book of Beliefs and Opinions"]
],
"quote": "",
"start": "《信仰与意见之书》（Book of Beliefs and Opinions）"
},
{
"id": "maimonides",
"name": "迈蒙尼德",
"nameEn": "Maimonides",
"era": "中世纪",
"born": "1138年",
"birthplace": "科尔多瓦",
"died": "1204年",
"deathplace": "埃及的福斯塔特",
"nationality": "安达卢西亚犹太人",
"schools": "犹太亚里士多德主义",
"wiki": "Maimonides",
"bio": "迈蒙尼德是拉比、医师与哲学家，为躲避西班牙的迫害而定居埃及。他在《密释纳托拉》中编纂了犹太律法。在《迷途指津》中，他调和托拉与亚里士多德，并以隐微方式为困惑的少数人写作。",
"ideas": [
"否定神学",
"理性与启示",
"隐微写作",
"律法的编纂"
],
"books": [
["迷途指津", 1190, "哲学与对经文的解释。", "The Guide for the Perplexed"],
["密释纳托拉", 1180, "犹太律法法典。", "Mishneh Torah"]
],
"quote": "",
"start": "《迷途指津》导论（Guide for the Perplexed, introduction）"
},
{
"id": "halevi",
"name": "犹大·哈列维",
"nameEn": "Judah Halevi",
"era": "中世纪",
"born": "约1075年",
"birthplace": "图德拉或托莱多",
"died": "1141年",
"deathplace": "不详",
"nationality": "安达卢西亚犹太人",
"schools": "犹太哲学",
"wiki": "Judah Halevi",
"bio": "犹大·哈列维是伟大的希伯来诗人，也是哲学的批评者。在《库萨里》中，一位犹太智者使可萨国王相信历史与启示高于哲学理性。他在前往以色列地不久后去世。",
"ideas": [
"启示高于哲学",
"民族的历史经验"
],
"books": [
["库萨里", 1140, "为犹太教辩护的对话。", "The Kuzari"]
],
"quote": "",
"start": "《库萨里》（The Kuzari）"
},
{
"id": "augustine",
"name": "奥古斯丁",
"nameEn": "Augustine of Hippo",
"era": "中世纪",
"born": "354年",
"birthplace": "努米底亚的塔加斯特",
"died": "430年",
"deathplace": "希波",
"nationality": "罗马（北非）",
"schools": "基督教柏拉图主义、教父哲学",
"wiki": "Augustine of Hippo",
"bio": "奥古斯丁曾教授修辞学，386年皈依基督教，后成为希波主教。他将新柏拉图主义与基督教关于神、灵魂、恶与恩典的教义融合。他的《忏悔录》开创了向内探索的精神自传，《上帝之城》则回应了异教徒对罗马陷落的责难。",
"ideas": [
"恶是善的缺失",
"恩典与原罪",
"两座城：地上之城与天上之城",
"时间是心灵的延展"
],
"books": [
["忏悔录", 400, "面向神的精神自传。", "Confessions"],
["论三位一体", 417, "三位一体与心灵中神的形象。", "On the Trinity"],
["上帝之城", 426, "地上之城与上帝之城。", "The City of God"]
],
"quote": "你为自己造了我们，我们的心不安息于你，便不得安宁。",
"start": "《忏悔录》（Confessions，Chadwick 译）"
},
{
"id": "boethius",
"name": "波爱修斯",
"nameEn": "Boethius",
"era": "中世纪",
"born": "约477年",
"birthplace": "罗马",
"died": "约524年",
"deathplace": "帕维亚",
"nationality": "罗马",
"schools": "新柏拉图主义、基督教哲学",
"wiki": "Boethius",
"bio": "波爱修斯是罗马元老，曾效力于东哥特国王狄奥多里克。他计划将柏拉图和亚里士多德的全部著作译成拉丁文，其逻辑学译本塑造了中世纪的教育。他因叛国罪入狱，在处决前写下了《哲学的慰藉》。",
"ideas": [
"命运及其轮转",
"天意与自由意志",
"神的永恒作为无时间的现在"
],
"books": [
["哲学的慰藉", 524, "哲学女神论命运与天意。", "The Consolation of Philosophy"]
],
"quote": "",
"start": "《哲学的慰藉》（The Consolation of Philosophy）"
},
{
"id": "eriugena",
"name": "约翰·司各特·爱留根纳",
"nameEn": "John Scotus Eriugena",
"era": "中世纪",
"born": "约815年",
"birthplace": "爱尔兰",
"died": "约877年",
"deathplace": "不详",
"nationality": "爱尔兰",
"schools": "新柏拉图主义",
"wiki": "John Scottus Eriugena",
"bio": "爱留根纳是秃头查理宫廷中的爱尔兰学者。他将伪狄奥尼修斯从希腊文译成拉丁文。其《论自然的区分》提出一种新柏拉图主义的自然划分，认为万物皆出于上帝并复归于上帝。",
"ideas": [
"自然的区分",
"流溢与复归",
"否定神学"
],
"books": [
["论自然的区分", 867, "论自然的划分。", "Periphyseon"]
],
"quote": "",
"start": "德莫特·莫兰《约翰·司各特·爱留根纳的哲学》（The Philosophy of John Scottus Eriugena）"
},
{
"id": "anselm",
"name": "坎特伯雷的安瑟伦",
"nameEn": "Anselm of Canterbury",
"era": "中世纪",
"born": "1033年",
"birthplace": "奥斯塔",
"died": "1109年",
"deathplace": "坎特伯雷",
"nationality": "意大利（勃艮第的阿奥斯塔）",
"schools": "经院哲学",
"wiki": "Anselm of Canterbury",
"bio": "安瑟伦是本笃会修士，曾任坎特伯雷大主教。他的座右铭是“信仰寻求理解”。他提出了本体论论证：上帝是无可设想有比之更伟大者，因此上帝必在现实中存在。",
"ideas": [
"本体论论证",
"信仰寻求理解",
"赎罪的满足说"
],
"books": [
["宣讲", 1078, "本体论论证。", "Proslogion"],
["上帝何以成人", 1098, "赎罪理论。", "Why God Became Man"]
],
"quote": "",
"start": "《宣讲》（Proslogion）"
},
{
"id": "abelard",
"name": "彼得·阿伯拉尔",
"nameEn": "Peter Abelard",
"era": "中世纪",
"born": "1079年",
"birthplace": "布列塔尼的勒帕莱",
"died": "1142年",
"deathplace": "沙隆叙索恩",
"nationality": "法国",
"schools": "经院哲学、唯名论",
"wiki": "Peter Abelard",
"bio": "阿伯拉尔是12世纪最杰出的逻辑学家，也是巴黎著名的教师。他与爱洛依丝的爱情及其悲惨结局因两人的书信而广为流传。他认为共相是词语或概念，并在伦理学中强调意图。",
"ideas": [
"共相是概念（概念论）",
"意图伦理学",
"《是与否》的方法"
],
"books": [
["是与否", 1121, "把相互冲突的权威说法并列对照。", "Sic et Non"],
["伦理学（认识你自己）", 1138, "罪在于意图。", "Ethics (Know Yourself)"]
],
"quote": "",
"start": "《阿伯拉尔与爱洛依丝书信集》（The Letters of Abelard and Heloise）"
},
{
"id": "hildegard",
"name": "宾根的希尔德加德",
"nameEn": "Hildegard of Bingen",
"era": "中世纪",
"born": "1098年",
"birthplace": "贝默斯海姆",
"died": "1179年",
"deathplace": "鲁珀茨贝格",
"nationality": "德国",
"schools": "基督教神秘主义",
"wiki": "Hildegard of Bingen",
"bio": "希尔德加德是本笃会女修道院长、异象者、作曲家，并撰写医学与自然方面的著作。她的异象著作呈现了一种关于创造与救赎的宇宙神学。2012年她被宣布为教会圣师。",
"ideas": [
"异象神学",
"绿意力（viriditas）",
"宇宙与人互为镜像"
],
"books": [
["认识之道", 1151, "对异象的阐释。", "Scivias"]
],
"quote": "",
"start": "《认识之道》选段（Scivias）"
},
{
"id": "aquinas",
"name": "托马斯·阿奎那",
"nameEn": "Thomas Aquinas",
"era": "中世纪",
"born": "1225年",
"birthplace": "罗卡塞卡",
"died": "1274年",
"deathplace": "福萨诺瓦",
"nationality": "意大利",
"schools": "经院哲学、托马斯主义",
"wiki": "Thomas Aquinas",
"bio": "阿奎那是多明我会修士，曾在巴黎和那不勒斯任教。他将亚里士多德与基督教神学相结合，认为理性与信仰不可能冲突。他的《神学大全》成为天主教神学的标准，他于1323年被封圣。",
"ideas": [
"上帝存在的五路证明",
"受造物中的本质与存在",
"自然法",
"恩典成全自然"
],
"books": [
["驳异大全", 1264, "以理性为信仰辩护。", "Summa contra Gentiles"],
["神学大全", 1274, "系统神学：上帝、伦理、基督。", "Summa Theologiae"]
],
"quote": "",
"start": "《神学大全》选段（Summa Theologiae，Kreeft 编《缩编神学大全》）"
},
{
"id": "bonaventure",
"name": "波纳文图拉",
"nameEn": "Bonaventure",
"era": "中世纪",
"born": "1221年",
"birthplace": "巴尼奥雷焦",
"died": "1274年",
"deathplace": "里昂",
"nationality": "意大利",
"schools": "方济各会、奥古斯丁主义",
"wiki": "Bonaventure",
"bio": "波纳文图拉是方济各会总会长，与阿奎那同时在巴黎。他坚持更接近奥古斯丁的进路，并批评激进的亚里士多德主义。他的《心灵迈向上帝的旅程》描述了经由受造物上升至上帝的历程。",
"ideas": [
"光照",
"心灵的上升",
"反对世界永恒"
],
"books": [
["心灵迈向上帝的旅程", 1259, "六个阶段的神秘上升。", "The Journey of the Mind to God"]
],
"quote": "",
"start": "《心灵迈向上帝的旅程》（The Journey of the Mind to God）"
},
{
"id": "scotus",
"name": "约翰·邓斯·司各脱",
"nameEn": "John Duns Scotus",
"era": "中世纪",
"born": "约1266年",
"birthplace": "苏格兰的邓斯",
"died": "1308年",
"deathplace": "科隆",
"nationality": "苏格兰",
"schools": "经院哲学、司各脱主义",
"wiki": "Duns Scotus",
"bio": "邓斯·司各脱是方济各会神学家，被称为“精细博士”。他主张存在是单义的，即用于上帝与受造物时意义相同。他还提出“此性”（haecceity），即使个体成为其自身者。",
"ideas": [
"存在的单义性",
"此性",
"意志的优先性"
],
"books": [
["牛津评注", 1300, "对《箴言四书》的评注。", "Ordinatio"]
],
"quote": "",
"start": "理查德·克罗斯《邓斯·司各脱》（Duns Scotus）"
},
{
"id": "ockham",
"name": "奥卡姆的威廉",
"nameEn": "William of Ockham",
"era": "中世纪",
"born": "约1287年",
"birthplace": "萨里郡的奥卡姆",
"died": "1347年",
"deathplace": "慕尼黑",
"nationality": "英格兰",
"schools": "经院哲学、唯名论",
"wiki": "William of Ockham",
"bio": "奥卡姆是方济各会士，其唯名论主张只有个别事物存在，共相只是符号。他的简约原则后来被称为“奥卡姆剃刀”。他因使徒贫穷问题与教皇约翰二十二世冲突，投奔皇帝路易四世的庇护。",
"ideas": [
"唯名论",
"奥卡姆剃刀",
"上帝的绝对权能",
"对教皇权力的批判"
],
"books": [
["逻辑大全", 1323, "词项逻辑。", "Summa Logicae"]
],
"quote": "",
"start": "《哲学著作集》（Philosophical Writings，Boehner 编）"
},
{
"id": "eckhart",
"name": "埃克哈特大师",
"nameEn": "Meister Eckhart",
"era": "中世纪",
"born": "约1260年",
"birthplace": "坦巴赫（？）",
"died": "约1328年",
"deathplace": "阿维尼翁（？）",
"nationality": "德国",
"schools": "莱茵神秘主义",
"wiki": "Meister Eckhart",
"bio": "埃克哈特是多明我会神学家与布道者。他的德语布道谈论上帝在灵魂中的诞生以及“放下”（Gelassenheit）。他去世后，其部分命题于1329年遭到谴责。",
"ideas": [
"上帝在灵魂中的诞生",
"超脱与放下",
"超越上帝的神性"
],
"books": [
["德语布道集", 1320, "以德语宣讲超脱与合一。", "German Sermons"]
],
"quote": "",
"start": "《选集》（Selected Writings，企鹅版）"
},
{
"id": "cusanus",
"name": "库萨的尼古拉",
"nameEn": "Nicholas of Cusa",
"era": "文艺复兴与早期近代",
"born": "1401年",
"birthplace": "库斯",
"died": "1464年",
"deathplace": "托迪",
"nationality": "德国",
"schools": "基督教柏拉图主义",
"wiki": "Nicholas of Cusa",
"bio": "库萨的尼古拉是枢机主教、数学家和哲学家。他主张上帝超越人类理性，在上帝那里对立面相互吻合，而智慧即有学识的无知。他还提出宇宙没有固定的中心。",
"ideas": [
"有学识的无知",
"对立面的吻合",
"无界的宇宙"
],
"books": [
["论有学识的无知", 1440, "知识的界限与无限。", "On Learned Ignorance"]
],
"quote": "",
"start": "《论有学识的无知》（On Learned Ignorance）"
},
{
"id": "ficino",
"name": "马尔西利奥·费奇诺",
"nameEn": "Marsilio Ficino",
"era": "文艺复兴与早期近代",
"born": "1433年",
"birthplace": "瓦尔达尔诺的菲格利内",
"died": "1499年",
"deathplace": "卡雷吉",
"nationality": "意大利",
"schools": "文艺复兴柏拉图主义",
"wiki": "Marsilio Ficino",
"bio": "费奇诺在美第奇家族资助下领导了佛罗伦萨的柏拉图复兴。他将柏拉图与普罗提诺的全部著作译成拉丁文。他的《柏拉图神学》论证了灵魂的不朽。",
"ideas": [
"柏拉图式的爱",
"灵魂不朽",
"古代神学"
],
"books": [
["柏拉图神学", 1482, "论灵魂的不朽。", "Platonic Theology"]
],
"quote": "",
"start": "保罗·奥斯卡·克里斯泰勒《马尔西利奥·费奇诺的哲学》（The Philosophy of Marsilio Ficino）"
},
{
"id": "pico",
"name": "皮科·德拉·米兰多拉",
"nameEn": "Giovanni Pico della Mirandola",
"era": "文艺复兴与早期近代",
"born": "1463年",
"birthplace": "米兰多拉",
"died": "1494年",
"deathplace": "佛罗伦萨",
"nationality": "意大利",
"schools": "文艺复兴人文主义",
"wiki": "Giovanni Pico della Mirandola",
"bio": "皮科计划就取自多种传统的900条论题进行公开辩论，但被教皇叫停。他的《论人的尊严》提出人是自由的，可以塑造自身的本性。他31岁去世。",
"ideas": [
"人的自由与尊严",
"诸传统的调和"
],
"books": [
["论人的尊严", 1486, "人作为自我塑造的存在者。", "Oration on the Dignity of Man"]
],
"quote": "",
"start": "《论人的尊严》（Oration on the Dignity of Man）"
},
{
"id": "erasmus",
"name": "伊拉斯谟",
"nameEn": "Desiderius Erasmus",
"era": "文艺复兴与早期近代",
"born": "1466年",
"birthplace": "鹿特丹",
"died": "1536年",
"deathplace": "巴塞尔",
"nationality": "荷兰",
"schools": "基督教人文主义",
"wiki": "Erasmus",
"bio": "伊拉斯谟是北欧最杰出的人文主义学者。他出版了希腊文《新约》，并讽刺教会的腐败。他寻求教会改革，但因自由意志问题与路德决裂。",
"ideas": [
"基督教人文主义",
"回到源典",
"以自由意志反驳路德"
],
"books": [
["愚人颂", 1511, "对教会与社会的讽刺。", "In Praise of Folly"],
["论自由意志", 1524, "为自由意志辩护，反驳路德。", "On Free Will"]
],
"quote": "",
"start": "《愚人颂》（In Praise of Folly）"
},
{
"id": "luther",
"name": "马丁·路德",
"nameEn": "Martin Luther",
"era": "文艺复兴与早期近代",
"born": "1483年",
"birthplace": "艾斯莱本",
"died": "1546年",
"deathplace": "艾斯莱本",
"nationality": "德国",
"schools": "新教改革",
"wiki": "Martin Luther",
"bio": "路德是奥古斯丁会修士和神学教授，其《九十五条论纲》（1517）引发了宗教改革。他教导因信称义和唯独圣经的权威。他翻译的德语《圣经》塑造了德语语言。",
"ideas": [
"因信称义",
"唯独圣经",
"意志的捆绑",
"两个国度"
],
"books": [
["基督徒的自由", 1520, "基督教的自由与服务。", "The Freedom of a Christian"],
["论意志的捆绑", 1525, "对伊拉斯谟的答复。", "On the Bondage of the Will"]
],
"quote": "",
"start": "《基督徒的自由》（The Freedom of a Christian）"
},
{
"id": "machiavelli",
"name": "尼科洛·马基雅维利",
"nameEn": "Niccolò Machiavelli",
"era": "文艺复兴与早期近代",
"born": "1469年",
"birthplace": "佛罗伦萨",
"died": "1527年",
"deathplace": "佛罗伦萨",
"nationality": "意大利（佛罗伦萨）",
"schools": "政治现实主义、共和主义",
"wiki": "Niccolò Machiavelli",
"bio": "马基雅维利是佛罗伦萨的外交官，1512年美第奇家族复辟后被免职。他在流放中写下《君主论》和《论李维》。他将政治与传统道德分离，如实地分析权力。",
"ideas": [
"德能与命运（virtù 与 fortuna）",
"实际真相而非想象中的共和国",
"被人畏惧比被人爱更好",
"共和自由"
],
"books": [
["君主论", 1532, "君主国如何获取与保有。", "The Prince"],
["论李维", 1531, "共和国、自由与冲突。", "Discourses on Livy"]
],
"quote": "",
"start": "《君主论》（The Prince，曼斯菲尔德译本）"
},
{
"id": "more",
"name": "托马斯·莫尔",
"nameEn": "Thomas More",
"era": "文艺复兴与早期近代",
"born": "1478年",
"birthplace": "伦敦",
"died": "1535年",
"deathplace": "伦敦",
"nationality": "英格兰",
"schools": "基督教人文主义",
"wiki": "Thomas More",
"bio": "莫尔是人文主义者、律师，曾任亨利八世治下的大法官。他的《乌托邦》描绘了一座理想岛屿，以此批判欧洲社会。他因拒绝承认亨利为教会首脑而被处死。",
"ideas": [
"作为社会批判的乌托邦",
"共同财产",
"良知对抗权力"
],
"books": [
["乌托邦", 1516, "乌托邦岛的理想共同体。", "Utopia"]
],
"quote": "",
"start": "《乌托邦》（Utopia）"
},
{
"id": "montaigne",
"name": "米歇尔·德·蒙田",
"nameEn": "Michel de Montaigne",
"era": "文艺复兴与早期近代",
"born": "1533年",
"birthplace": "蒙田城堡",
"died": "1592年",
"deathplace": "蒙田城堡",
"nationality": "法国",
"schools": "怀疑主义、人文主义",
"wiki": "Michel de Montaigne",
"bio": "蒙田退隐公共生活，撰写《随笔集》，开创了随笔这一文体。他以自身为样本研究人的处境。他借助塞克斯都·恩披里柯，怀疑人的确定性，并嘲讽残酷与教条。",
"ideas": [
"随笔作为自我探索",
"怀疑主义（“我知道什么？”）",
"对残酷的批判",
"文化相对主义"
],
"books": [
["随笔集", 1580, "对万事万物的个人思考。", "Essays"]
],
"quote": "我知道什么？",
"start": "《随笔集》（Essays）中的“论食人族”“论经验”"
},
{
"id": "bruno",
"name": "乔尔丹诺·布鲁诺",
"nameEn": "Giordano Bruno",
"era": "文艺复兴与早期近代",
"born": "1548年",
"birthplace": "诺拉",
"died": "1600年",
"deathplace": "罗马",
"nationality": "意大利",
"schools": "赫尔墨斯主义、宇宙论",
"wiki": "Giordano Bruno",
"bio": "布鲁诺原是多明我会修士，后成为四处游历的哲学家。他主张宇宙无限、有无数世界，超越了哥白尼。1600年，罗马宗教裁判所以异端罪将他烧死。",
"ideas": [
"无限宇宙",
"多重世界",
"泛神论的统一"
],
"books": [
["论无限宇宙与诸世界", 1584, "无边界的宇宙。", "On the Infinite Universe and Worlds"]
],
"quote": "",
"start": "弗朗西斯·叶茨《乔尔丹诺·布鲁诺与赫尔墨斯传统》（Giordano Bruno and the Hermetic Tradition）"
},
{
"id": "suarez",
"name": "弗朗西斯科·苏亚雷斯",
"nameEn": "Francisco Suárez",
"era": "文艺复兴与早期近代",
"born": "1548年",
"birthplace": "格拉纳达",
"died": "1617年",
"deathplace": "里斯本",
"nationality": "西班牙",
"schools": "第二经院哲学",
"wiki": "Francisco Suárez",
"bio": "苏亚雷斯是耶稣会神学家，其《形而上学论辩》在天主教与新教大学中广为研读。他将经院形而上学系统化，而不依赖对亚里士多德的评注。他还论述法律、自然法与政治权力的起源。",
"ideas": [
"系统形而上学",
"自然法与万民法",
"政治权力源于人民"
],
"books": [
["形而上学论辩", 1597, "系统的经院形而上学。", "Metaphysical Disputations"]
],
"quote": "",
"start": "《形而上学论辩》选段（Metaphysical Disputations）"
},
{
"id": "bacon",
"name": "弗朗西斯·培根",
"nameEn": "Francis Bacon",
"era": "文艺复兴与早期近代",
"born": "1561年",
"birthplace": "伦敦",
"died": "1626年",
"deathplace": "海格特",
"nationality": "英格兰",
"schools": "经验主义",
"wiki": "Francis Bacon",
"bio": "培根是律师，曾任英格兰大法官。他呼吁建立一种基于实验与审慎归纳的新科学方法。他列举了扭曲人类理解的种种“假象”。",
"ideas": [
"归纳法",
"心灵的假象",
"知识就是力量"
],
"books": [
["学术的进展", 1605, "对知识的巡览。", "The Advancement of Learning"],
["新工具", 1620, "新方法；心灵的假象。", "Novum Organum"]
],
"quote": "",
"start": "《随笔集》（Essays）；然后是《新工具》（Novum Organum）第一卷"
},
{
"id": "hobbes",
"name": "托马斯·霍布斯",
"nameEn": "Thomas Hobbes",
"era": "文艺复兴与早期近代",
"born": "1588年",
"birthplace": "马姆斯伯里的韦斯特波特",
"died": "1679年",
"deathplace": "哈德威克庄园",
"nationality": "英格兰",
"schools": "社会契约论、唯物主义",
"wiki": "Thomas Hobbes",
"bio": "霍布斯在英国内战期间写作。他主张，若无政府，生活将是一切人反对一切人的战争。为摆脱这种状态，人们通过契约把权力交给一个绝对的主权者。他也是一位彻底的唯物主义者。",
"ideas": [
"自然状态即战争",
"社会契约与绝对主权",
"机械唯物主义"
],
"books": [
["利维坦", 1651, "由社会契约产生的主权权力。", "Leviathan"]
],
"quote": "人的生活孤独、贫困、卑污、残忍而短寿。",
"start": "《利维坦》（Leviathan）第一部分第13—15章"
},
{
"id": "grotius",
"name": "胡果·格劳秀斯",
"nameEn": "Hugo Grotius",
"era": "文艺复兴与早期近代",
"born": "1583年",
"birthplace": "代尔夫特",
"died": "1645年",
"deathplace": "罗斯托克",
"nationality": "荷兰",
"schools": "自然法",
"wiki": "Hugo Grotius",
"bio": "格劳秀斯是法学家，参与奠定了国际法。他主张即使上帝不存在，自然法依然有效。他曾藏身书箱越狱。",
"ideas": [
"自然法",
"万国法",
"海洋自由"
],
"books": [
["战争与和平法", 1625, "国际法的基础。", "On the Law of War and Peace"]
],
"quote": "",
"start": "《战争与和平法》（On the Law of War and Peace）导论"
},
{
"id": "descartes",
"name": "勒内·笛卡尔",
"nameEn": "René Descartes",
"era": "文艺复兴与早期近代",
"born": "1596年",
"birthplace": "图赖讷的拉海",
"died": "1650年",
"deathplace": "斯德哥尔摩",
"nationality": "法国",
"schools": "理性主义、笛卡尔主义",
"wiki": "René Descartes",
"bio": "笛卡尔被称为近代哲学之父。他通过怀疑一切可疑之物来为知识寻找确定的基础，并发现了思维着的自我。他主张心灵与身体是两种不同的实体，并参与创立了解析几何。",
"ideas": [
"方法论的怀疑",
"我思故我在",
"心身二元论",
"清楚分明的观念"
],
"books": [
["方法谈", 1637, "我思故我在。", "Discourse on the Method"],
["第一哲学沉思集", 1641, "从彻底怀疑到确定的基础。", "Meditations on First Philosophy"],
["哲学原理", 1644, "其哲学的系统表述。", "Principles of Philosophy"]
],
"quote": "我思故我在。",
"start": "《第一哲学沉思集》（Meditations on First Philosophy）"
},
{
"id": "pascal",
"name": "布莱兹·帕斯卡",
"nameEn": "Blaise Pascal",
"era": "文艺复兴与早期近代",
"born": "1623年",
"birthplace": "克莱蒙费朗",
"died": "1662年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "詹森主义",
"wiki": "Blaise Pascal",
"bio": "帕斯卡是数学家与物理学家，制造过计算器，并对概率论有所贡献。1654年的一次宗教体验之后，他投身于基督教护教学。他未完成的笔记后来以《思想录》出版。",
"ideas": [
"帕斯卡的赌注",
"心有它的理性",
"人的悲惨与伟大"
],
"books": [
["致外省人书", 1657, "对耶稣会决疑论的讽刺。", "Provincial Letters"],
["思想录", 1670, "为基督教辩护的片段。", "Pensées"]
],
"quote": "心有它的理性，理性对此一无所知。",
"start": "《思想录》（Pensées）"
},
{
"id": "spinoza",
"name": "巴鲁赫·斯宾诺莎",
"nameEn": "Baruch Spinoza",
"era": "文艺复兴与早期近代",
"born": "1632年",
"birthplace": "阿姆斯特丹",
"died": "1677年",
"deathplace": "海牙",
"nationality": "荷兰（葡萄牙犹太裔）",
"schools": "理性主义",
"wiki": "Baruch Spinoza",
"bio": "斯宾诺莎1656年被阿姆斯特丹的犹太社群逐出，以磨制镜片为生。他的《伦理学》以几何学形式写成，将上帝等同于自然，视为唯一的实体。他还捍卫思想自由，并以历史方法解读《圣经》。",
"ideas": [
"神即自然",
"唯一实体与无限属性",
"自由即理解必然性",
"努力（conatus）"
],
"books": [
["神学政治论", 1670, "思想自由与圣经批判。", "Theological-Political Treatise"],
["伦理学", 1677, "以几何学次序论述上帝、心灵与情感。", "Ethics"]
],
"quote": "",
"start": "《伦理学》（Ethics，柯利译本）第一、五部分"
},
{
"id": "locke",
"name": "约翰·洛克",
"nameEn": "John Locke",
"era": "文艺复兴与早期近代",
"born": "1632年",
"birthplace": "灵顿",
"died": "1704年",
"deathplace": "高莱弗",
"nationality": "英格兰",
"schools": "经验主义、自由主义",
"wiki": "John Locke",
"bio": "洛克是医生，也是沙夫茨伯里伯爵的顾问。他主张一切观念都来自经验。在政治上，他认为政府的存在是为了保护自然权利，并以同意为基础，因此反抗暴政是正当的。",
"ideas": [
"心灵如白板",
"第一性质与第二性质",
"生命、自由与财产的自然权利",
"宽容"
],
"books": [
["论宽容的一封信", 1689, "主张宗教宽容。", "A Letter Concerning Toleration"],
["人类理解论", 1689, "知识来自经验。", "An Essay Concerning Human Understanding"],
["政府论", 1689, "基于同意的政府。", "Two Treatises of Government"]
],
"quote": "",
"start": "《政府论》下篇（Second Treatise of Government）"
},
{
"id": "leibniz",
"name": "莱布尼茨",
"nameEn": "G. W. Leibniz",
"era": "文艺复兴与早期近代",
"born": "1646年",
"birthplace": "莱比锡",
"died": "1716年",
"deathplace": "汉诺威",
"nationality": "德国",
"schools": "理性主义",
"wiki": "Gottfried Wilhelm Leibniz",
"bio": "莱布尼茨是外交官、图书馆员和博学家，独立于牛顿发明了微积分。他认为实在由单子构成，即处于预定和谐之中的单纯的精神性实体。他主张这是所有可能世界中最好的世界。",
"ideas": [
"单子",
"预定和谐",
"充足理由律",
"所有可能世界中最好的世界"
],
"books": [
["形而上学论", 1686, "其体系的早期表述。", "Discourse on Metaphysics"],
["神正论", 1710, "上帝与恶的问题。", "Theodicy"],
["单子论", 1714, "实在即单纯实体。", "Monadology"]
],
"quote": "",
"start": "《单子论》（Monadology）"
},
{
"id": "malebranche",
"name": "尼古拉·马勒伯朗士",
"nameEn": "Nicolas Malebranche",
"era": "文艺复兴与早期近代",
"born": "1638年",
"birthplace": "巴黎",
"died": "1715年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "笛卡尔主义、偶因论",
"wiki": "Nicolas Malebranche",
"bio": "马勒伯朗士是奥拉托利会神父，将笛卡尔哲学朝神学方向发展。他主张上帝是唯一真正的因果作用者，我们是在上帝之中看见万物的。他的著作在欧洲各地被广泛阅读。",
"ideas": [
"偶因论",
"在上帝中看见万物"
],
"books": [
["真理的探求", 1674, "错误以及避免错误的方法。", "The Search after Truth"]
],
"quote": "",
"start": "《真理的探求》（The Search after Truth）第三卷"
},
{
"id": "vico",
"name": "詹巴蒂斯塔·维柯",
"nameEn": "Giambattista Vico",
"era": "启蒙运动",
"born": "1668年",
"birthplace": "那不勒斯",
"died": "1744年",
"deathplace": "那不勒斯",
"nationality": "意大利",
"schools": "历史哲学",
"wiki": "Giambattista Vico",
"bio": "维柯是那不勒斯的修辞学教授。与笛卡尔相反，他主张我们只能真正认识自己所创造的东西，因此历史比自然更可知。他追溯了神祇时代、英雄时代与凡人时代的循环。",
"ideas": [
"真理即创造（verum factum）",
"历史的循环",
"诗性智慧"
],
"books": [
["新科学", 1725, "诸民族共同本性的原理。", "The New Science"]
],
"quote": "",
"start": "《新科学》（The New Science，Bergin 与 Fisch 译本）"
},
{
"id": "berkeley",
"name": "乔治·贝克莱",
"nameEn": "George Berkeley",
"era": "启蒙运动",
"born": "1685年",
"birthplace": "基尔肯尼",
"died": "1753年",
"deathplace": "牛津",
"nationality": "爱尔兰",
"schools": "唯心主义、经验主义",
"wiki": "George Berkeley",
"bio": "贝克莱是圣公会主教。他主张物质不能脱离感知而存在；存在即被感知或被感知。上帝的感知使事物得以持续存在。",
"ideas": [
"非物质主义",
"存在即被感知（esse est percipi）",
"对抽象观念的批判"
],
"books": [
["人类知识原理", 1710, "反对物质。", "A Treatise Concerning the Principles of Human Knowledge"],
["海拉斯与斐洛诺斯的三篇对话", 1713, "以对话形式阐述非物质主义。", "Three Dialogues between Hylas and Philonous"]
],
"quote": "",
"start": "《海拉斯与斐洛诺斯的三篇对话》（Three Dialogues）"
},
{
"id": "montesquieu",
"name": "孟德斯鸠",
"nameEn": "Montesquieu",
"era": "启蒙运动",
"born": "1689年",
"birthplace": "拉布雷德",
"died": "1755年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "自由主义",
"wiki": "Montesquieu",
"bio": "孟德斯鸠曾任法官，也是文人。他在《论法的精神》中把法律与气候、风俗和政体类型联系起来。他的分权学说影响了美国宪法。",
"ideas": [
"三权分立",
"法律与具体环境相关",
"政体类型学"
],
"books": [
["波斯人信札", 1721, "借异乡人的眼光进行讽刺。", "Persian Letters"],
["论法的精神", 1748, "法律与气候和政体的关系。", "The Spirit of the Laws"]
],
"quote": "",
"start": "《论法的精神》（The Spirit of the Laws）第十一卷"
},
{
"id": "voltaire",
"name": "伏尔泰",
"nameEn": "Voltaire",
"era": "启蒙运动",
"born": "1694年",
"birthplace": "巴黎",
"died": "1778年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "启蒙运动",
"wiki": "Voltaire",
"bio": "伏尔泰是法国启蒙运动最著名的作家。他抨击宗教不宽容与不公，如卡拉斯案件。他的讽刺作品《老实人》嘲讽了莱布尼茨式的乐观主义。",
"ideas": [
"宗教宽容",
"对乐观主义的批判",
"自然神论",
"言论自由"
],
"books": [
["哲学通信", 1734, "赞扬英国的自由。", "Philosophical Letters"],
["老实人", 1759, "对乐观主义的讽刺。", "Candide"]
],
"quote": "",
"start": "《老实人》（Candide）"
},
{
"id": "hume",
"name": "休谟",
"nameEn": "David Hume",
"era": "启蒙运动",
"born": "1711年",
"birthplace": "爱丁堡",
"died": "1776年",
"deathplace": "爱丁堡",
"nationality": "苏格兰",
"schools": "经验主义、苏格兰启蒙运动",
"wiki": "David Hume",
"bio": "休谟是哲学家、历史学家和随笔作家。他认为因果性只是恒常结合加上习惯，从而提出了归纳问题。他主张理性是激情的奴隶，道德建立在情感之上。",
"ideas": [
"归纳问题",
"因果性作为习惯",
"自我的束理论",
"是与应当的鸿沟",
"理性服务于激情"
],
"books": [
["人性论", 1739, "关于人性的科学。", "A Treatise of Human Nature"],
["人类理解研究", 1748, "归纳问题。", "An Enquiry Concerning Human Understanding"],
["自然宗教对话录", 1779, "对设计论论证的批判。", "Dialogues Concerning Natural Religion"]
],
"quote": "理性只是、也应当只是激情的奴隶。",
"start": "《人类理解研究》（An Enquiry Concerning Human Understanding）"
},
{
"id": "rousseau",
"name": "卢梭",
"nameEn": "Jean-Jacques Rousseau",
"era": "启蒙运动",
"born": "1712年",
"birthplace": "日内瓦",
"died": "1778年",
"deathplace": "埃尔芒翁维尔",
"nationality": "日内瓦",
"schools": "社会契约论、浪漫主义",
"wiki": "Jean-Jacques Rousseau",
"bio": "卢梭认为文明腐蚀了人天然的善。在《社会契约论》中，他提出体现公民共同利益的主权者“公意”。他的小说和自传推动了浪漫主义的兴起。",
"ideas": [
"性善",
"公意",
"自尊心（amour-propre）",
"顺乎自然的教育"
],
"books": [
["论人类不平等的起源和基础", 1755, "不平等的起源。", "Discourse on Inequality"],
["社会契约论", 1762, "公意。", "The Social Contract"],
["爱弥儿", 1762, "自然教育。", "Emile"]
],
"quote": "人生而自由，却无往不在枷锁之中。",
"start": "《论人类不平等的起源和基础》（Discourse on Inequality）"
},
{
"id": "diderot",
"name": "狄德罗",
"nameEn": "Denis Diderot",
"era": "启蒙运动",
"born": "1713年",
"birthplace": "朗格勒",
"died": "1784年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "启蒙运动、唯物主义",
"wiki": "Denis Diderot",
"bio": "狄德罗参与主编《百科全书》，这是启蒙运动的一座丰碑。他由自然神论转向唯物主义。他的对话录和小说探讨道德与自然。",
"ideas": [
"百科全书式的知识",
"唯物主义",
"对权威的批判"
],
"books": [
["百科全书", 1751, "参与主编的知识总览。", "Encyclopédie"],
["拉摩的侄儿", 1762, "关于天才与道德的对话。", "Rameau's Nephew"]
],
"quote": "",
"start": "《拉摩的侄儿》（Rameau's Nephew）"
},
{
"id": "smith",
"name": "亚当·斯密",
"nameEn": "Adam Smith",
"era": "启蒙运动",
"born": "1723年",
"birthplace": "柯科迪",
"died": "1790年",
"deathplace": "爱丁堡",
"nationality": "苏格兰",
"schools": "苏格兰启蒙运动",
"wiki": "Adam Smith",
"bio": "斯密是格拉斯哥大学的道德哲学家。他的第一部书把道德建立在同情与公正旁观者之上。第二部书分析了分工、市场与自由贸易，奠定了现代经济学。",
"ideas": [
"同情与公正旁观者",
"分工",
"看不见的手",
"自由贸易"
],
"books": [
["道德情操论", 1759, "同情与道德判断。", "The Theory of Moral Sentiments"],
["国富论", 1776, "分工与市场。", "The Wealth of Nations"]
],
"quote": "",
"start": "《道德情操论》（The Theory of Moral Sentiments）第一卷"
},
{
"id": "kant",
"name": "康德",
"nameEn": "Immanuel Kant",
"era": "启蒙运动",
"born": "1724年",
"birthplace": "柯尼斯堡",
"died": "1804年",
"deathplace": "柯尼斯堡",
"nationality": "德国（普鲁士）",
"schools": "先验唯心主义",
"wiki": "Immanuel Kant",
"bio": "康德一生都在柯尼斯堡度过。受休谟启发，他从“独断论的迷梦”中醒来，主张空间、时间和范畴构成经验的形式，因此我们只认识现象，而非物自体。在伦理学上，他以绝对命令和自律为道德奠基。",
"ideas": [
"先验唯心主义",
"先天综合知识",
"绝对命令",
"自律",
"永久和平"
],
"books": [
["纯粹理性批判", 1781, "知识的条件与界限。", "Critique of Pure Reason"],
["道德形而上学奠基", 1785, "绝对命令。", "Groundwork of the Metaphysics of Morals"],
["实践理性批判", 1788, "自由与道德法则。", "Critique of Practical Reason"],
["判断力批判", 1790, "美、崇高与合目的性。", "Critique of Judgment"],
["永久和平论", 1795, "共和国与国联。", "Perpetual Peace"]
],
"quote": "有两样东西，愈是经常而持久地思考，就愈使心灵充满日新月异、有加无已的景仰和敬畏：我头上的星空和我心中的道德法则。",
"start": "《道德形而上学奠基》（Groundwork of the Metaphysics of Morals）"
},
{
"id": "burke",
"name": "柏克",
"nameEn": "Edmund Burke",
"era": "启蒙运动",
"born": "1729年",
"birthplace": "都柏林",
"died": "1797年",
"deathplace": "比肯斯菲尔德",
"nationality": "爱尔兰",
"schools": "保守主义",
"wiki": "Edmund Burke",
"bio": "柏克是英国议会中的辉格党政治家。他支持美洲殖民者，却谴责法国大革命。他捍卫传统、审慎与世袭制度，反对抽象权利。",
"ideas": [
"审慎与传统",
"社会是跨越世代的伙伴关系",
"崇高与美"
],
"books": [
["关于我们崇高与美观念之根源的哲学探讨", 1757, "崇高美学。", "A Philosophical Enquiry into the Sublime and Beautiful"],
["法国革命论", 1790, "反对抽象的革命。", "Reflections on the Revolution in France"]
],
"quote": "",
"start": "《法国革命论》（Reflections on the Revolution in France）"
},
{
"id": "bentham",
"name": "边沁",
"nameEn": "Jeremy Bentham",
"era": "启蒙运动",
"born": "1748年",
"birthplace": "伦敦",
"died": "1832年",
"deathplace": "伦敦",
"nationality": "英国",
"schools": "功利主义",
"wiki": "Jeremy Bentham",
"bio": "边沁创立了现代功利主义，也是法律与社会改革者。他认为正当行为能带来最大多数人的最大幸福。他设计了圆形监狱。",
"ideas": [
"最大幸福原则",
"幸福计算法",
"法律改革",
"圆形监狱"
],
"books": [
["道德与立法原理导论", 1789, "幸福计算法。", "An Introduction to the Principles of Morals and Legislation"]
],
"quote": "",
"start": "《道德与立法原理导论》（An Introduction to the Principles of Morals and Legislation）第1—4章"
},
{
"id": "wollstonecraft",
"name": "玛丽·沃斯通克拉夫特",
"nameEn": "Mary Wollstonecraft",
"era": "启蒙运动",
"born": "1759年",
"birthplace": "伦敦",
"died": "1797年",
"deathplace": "伦敦",
"nationality": "英国",
"schools": "自由主义、女性主义",
"wiki": "Mary Wollstonecraft",
"bio": "沃斯通克拉夫特是作家，也是早期女权倡导者。她论证女性显得低劣只是由于缺乏教育。她在生下玛丽·雪莱后去世。",
"ideas": [
"女性平等受教育",
"两性同具理性与德性",
"以权利对抗传统"
],
"books": [
["为男人的权利辩护", 1790, "回应柏克。", "A Vindication of the Rights of Men"],
["女权辩护", 1792, "女性的理性与教育。", "A Vindication of the Rights of Woman"]
],
"quote": "",
"start": "《女权辩护》（A Vindication of the Rights of Woman）"
},
{
"id": "herder",
"name": "赫尔德",
"nameEn": "Johann Gottfried Herder",
"era": "启蒙运动",
"born": "1744年",
"birthplace": "莫龙根",
"died": "1803年",
"deathplace": "魏玛",
"nationality": "德国",
"schools": "反启蒙、浪漫主义",
"wiki": "Johann Gottfried Herder",
"bio": "赫尔德曾师从康德，并影响了歌德。他强调语言和文化塑造思想，每个民族都有其自身的特性。他为历史主义与民俗研究奠定了基础。",
"ideas": [
"语言塑造思想",
"文化多元主义",
"历史主义"
],
"books": [
["论语言的起源", 1772, "语言属于人。", "Treatise on the Origin of Language"],
["人类历史哲学的观念", 1784, "诸文化的历史。", "Ideas for the Philosophy of History of Humanity"]
],
"quote": "",
"start": "赫尔德《哲学文集》（Philosophical Writings，福斯特编）"
},
{
"id": "hamann",
"name": "哈曼",
"nameEn": "Johann Georg Hamann",
"era": "启蒙运动",
"born": "1730年",
"birthplace": "柯尼斯堡",
"died": "1788年",
"deathplace": "明斯特",
"nationality": "德国",
"schools": "反启蒙",
"wiki": "Johann Georg Hamann",
"bio": "哈曼是康德的朋友兼批评者，被称为“北方博士”。他以信仰、语言和经验之名攻击启蒙理性。他影响了赫尔德、雅可比和克尔凯郭尔。",
"ideas": [
"对纯粹理性之纯粹性的批判",
"语言即理性",
"信仰"
],
"books": [
["苏格拉底回忆录", 1759, "信仰与苏格拉底式的无知。", "Socratic Memorabilia"]
],
"quote": "",
"start": "以赛亚·伯林《北方博士》（Isaiah Berlin, The Magus of the North）"
},
{
"id": "wolff",
"name": "克里斯蒂安·沃尔夫",
"nameEn": "Christian Wolff",
"era": "启蒙运动",
"born": "1679年",
"birthplace": "布雷斯劳",
"died": "1754年",
"deathplace": "哈勒",
"nationality": "德国",
"schools": "理性主义",
"wiki": "Christian Wolff (philosopher)",
"bio": "沃尔夫将莱布尼茨哲学系统化，在康德之前主宰德国大学。他用德语和拉丁语撰写涵盖全部哲学的教科书。康德受教于他的体系。",
"ideas": [
"系统理性主义",
"作为学科的本体论"
],
"books": [
["德国形而上学", 1720, "关于上帝、世界与灵魂的理性思考。", "German Metaphysics"]
],
"quote": "",
"start": "科里·迪克《康德与理性心理学》（Corey Dyck, Kant and Rational Psychology）"
},
{
"id": "fichte",
"name": "费希特",
"nameEn": "J. G. Fichte",
"era": "德国唯心主义",
"born": "1762年",
"birthplace": "拉门瑙",
"died": "1814年",
"deathplace": "柏林",
"nationality": "德国",
"schools": "德国唯心主义",
"wiki": "Johann Gottlieb Fichte",
"bio": "费希特把经验从“自我”自我设定的活动中推导出来，从而激进化了康德。他曾被指控无神论并失去耶拿的教职。在拿破仑占领期间，他在《对德意志民族的演讲》中呼吁国民教育。",
"ideas": [
"自我设定自身",
"知识学",
"承认与主体间性",
"国民教育"
],
"books": [
["全部知识学的基础", 1794, "知识学。", "Foundations of the Entire Science of Knowledge"],
["人的使命", 1800, "对其唯心主义的通俗表述。", "The Vocation of Man"],
["对德意志民族的演讲", 1808, "以教育实现民族复兴。", "Addresses to the German Nation"]
],
"quote": "",
"start": "《人的使命》（The Vocation of Man）"
},
{
"id": "schelling",
"name": "谢林",
"nameEn": "F. W. J. Schelling",
"era": "德国唯心主义",
"born": "1775年",
"birthplace": "莱昂贝格",
"died": "1854年",
"deathplace": "巴德拉加茨",
"nationality": "德国",
"schools": "德国唯心主义",
"wiki": "Friedrich Wilhelm Joseph Schelling",
"bio": "谢林是早慧之才，在图宾根与黑格尔、荷尔德林同住。他发展了自然哲学与同一哲学，以艺术为哲学的器官。他晚期关于自由与“实证哲学”的著作影响了克尔凯郭尔和存在主义。",
"ideas": [
"自然哲学",
"主体与客体的同一",
"自由与恶的根据",
"实证哲学"
],
"books": [
["先验唯心论体系", 1800, "艺术作为哲学的器官。", "System of Transcendental Idealism"],
["对人类自由本质的哲学探究", 1809, "自由与恶。", "Philosophical Investigations into the Essence of Human Freedom"]
],
"quote": "",
"start": "《对人类自由本质的哲学探究》（Philosophical Investigations into the Essence of Human Freedom）"
},
{
"id": "hegel",
"name": "黑格尔",
"nameEn": "G. W. F. Hegel",
"era": "德国唯心主义",
"born": "1770年",
"birthplace": "斯图加特",
"died": "1831年",
"deathplace": "柏林",
"nationality": "德国",
"schools": "德国唯心主义、绝对唯心主义",
"wiki": "Georg Wilhelm Friedrich Hegel",
"bio": "黑格尔是最有影响力的德国唯心主义者，曾任柏林大学哲学教席。他主张实在就是精神在历史中通过辩证过程认识自身。他的法哲学与历史哲学影响了马克思、存在主义及后来的许多思想。",
"ideas": [
"辩证法",
"绝对精神",
"主奴辩证法",
"在历史中实现的自由",
"理性的就是现实的"
],
"books": [
["精神现象学", 1807, "从意识到绝对知识。", "Phenomenology of Spirit"],
["逻辑学", 1812, "存在的辩证逻辑。", "Science of Logic"],
["法哲学原理", 1820, "伦理生活与国家中的自由。", "Elements of the Philosophy of Right"],
["历史哲学讲演录", 1837, "历史作为自由的进展。", "Lectures on the Philosophy of History"]
],
"quote": "密涅瓦的猫头鹰要等到黄昏才起飞。",
"start": "《历史哲学讲演录》（Lectures on the Philosophy of History）导论"
},
{
"id": "holderlin",
"name": "荷尔德林",
"nameEn": "Friedrich Hölderlin",
"era": "德国唯心主义",
"born": "1770年",
"birthplace": "内卡河畔劳芬",
"died": "1843年",
"deathplace": "图宾根",
"nationality": "德国",
"schools": "浪漫主义、德国唯心主义",
"wiki": "Friedrich Hölderlin",
"bio": "荷尔德林是诗人，也是黑格尔和谢林的朋友。他的残篇《判断与存在》影响了早期唯心主义。他的诗对海德格尔至为关键。",
"ideas": [
"先于判断的存在",
"诗与神性"
],
"books": [
["许佩里翁", 1797, "书信体小说。", "Hyperion"]
],
"quote": "",
"start": "《许佩里翁》（Hyperion）"
},
{
"id": "schleiermacher",
"name": "施莱尔马赫",
"nameEn": "Friedrich Schleiermacher",
"era": "德国唯心主义",
"born": "1768年",
"birthplace": "布雷斯劳",
"died": "1834年",
"deathplace": "柏林",
"nationality": "德国",
"schools": "浪漫主义、解释学",
"wiki": "Friedrich Schleiermacher",
"bio": "施莱尔马赫是神学家，也是柏拉图的译者。他把宗教定义为绝对依赖感。他创立了普遍解释学。",
"ideas": [
"宗教作为情感",
"解释学"
],
"books": [
["论宗教：对蔑视宗教的有教养者讲话", 1799, "宗教作为直观与情感。", "On Religion: Speeches to Its Cultured Despisers"]
],
"quote": "",
"start": "《论宗教》（On Religion）"
},
{
"id": "schopenhauer",
"name": "叔本华",
"nameEn": "Arthur Schopenhauer",
"era": "19世纪",
"born": "1788年",
"birthplace": "但泽",
"died": "1860年",
"deathplace": "法兰克福",
"nationality": "德国",
"schools": "悲观主义、后康德",
"wiki": "Arthur Schopenhauer",
"bio": "叔本华认为，表象背后的物自体是一种盲目的、不断挣扎的意志。因此人生是苦难，可借艺术、同情与禁欲地否定意志而得到缓解。他汲取印度思想，影响了尼采、瓦格纳和维特根斯坦。",
"ideas": [
"世界作为意志",
"悲观主义",
"审美观照",
"同情作为伦理学基础"
],
"books": [
["作为意志和表象的世界", 1818, "表象背后的意志。", "The World as Will and Representation"],
["附录与补遗", 1851, "随笔与箴言。", "Parerga and Paralipomena"]
],
"quote": "",
"start": "《随笔与箴言》（Essays and Aphorisms，企鹅版）"
},
{
"id": "feuerbach",
"name": "费尔巴哈",
"nameEn": "Ludwig Feuerbach",
"era": "19世纪",
"born": "1804年",
"birthplace": "兰茨胡特",
"died": "1872年",
"deathplace": "雷兴贝格（纽伦堡）",
"nationality": "德国",
"schools": "青年黑格尔派、唯物主义",
"wiki": "Ludwig Feuerbach",
"bio": "费尔巴哈曾随黑格尔学习，后成为青年黑格尔派的领袖。他主张上帝是理想化人性的投射。他的人本主义唯物主义影响了马克思和恩格斯。",
"ideas": [
"宗教作为投射",
"人本学唯物主义",
"类本质"
],
"books": [
["基督教的本质", 1841, "神学就是人本学。", "The Essence of Christianity"]
],
"quote": "",
"start": "《基督教的本质》（The Essence of Christianity）"
},
{
"id": "stirner",
"name": "施蒂纳",
"nameEn": "Max Stirner",
"era": "19世纪",
"born": "1806年",
"birthplace": "拜罗伊特",
"died": "1856年",
"deathplace": "柏林",
"nationality": "德国",
"schools": "青年黑格尔派、利己主义",
"wiki": "Max Stirner",
"bio": "马克斯·施蒂纳是约翰·卡斯帕·施密特的笔名，他是柏林青年黑格尔派圈中的一名教师。他唯一的重要著作把上帝、人类、国家和道德统统斥为凌驾于个体之上的“幽灵”。马克思和恩格斯在《德意志意识形态》中对他作了长篇批判。他死于贫困。",
"ideas": [
"利己主义与唯一者",
"观念作为幽灵",
"利己者联盟",
"自有而非自由"
],
"books": [
["唯一者及其所有物", 1844, "Der Einzige und sein Eigentum；反对一切固定观念。", "The Ego and Its Own"]
],
"quote": "我已把我的事业置于无之上。",
"start": "《唯一者及其所有物》（The Ego and Its Own，莱奥波德版）"
},
{
"id": "kierkegaard",
"name": "克尔凯郭尔",
"nameEn": "Søren Kierkegaard",
"era": "19世纪",
"born": "1813年",
"birthplace": "哥本哈根",
"died": "1855年",
"deathplace": "哥本哈根",
"nationality": "丹麦",
"schools": "存在主义、基督教哲学",
"wiki": "Søren Kierkegaard",
"bio": "克尔凯郭尔以众多笔名写作，展示对生活的不同立场。他攻击黑格尔的体系，也攻击丹麦安逸的基督教国教。他强调个体的激情选择与信仰的飞跃。",
"ideas": [
"审美、伦理与宗教三阶段",
"信仰的飞跃",
"焦虑与绝望",
"真理即主体性"
],
"books": [
["非此即彼", 1843, "审美生活与伦理生活。", "Either/Or"],
["恐惧与颤栗", 1843, "亚伯拉罕与信仰的飞跃。", "Fear and Trembling"],
["焦虑的概念", 1844, "焦虑与自由。", "The Concept of Anxiety"],
["致死的疾病", 1849, "绝望与自我。", "The Sickness Unto Death"]
],
"quote": "生活只能倒着被理解，却必须正着去经历。",
"start": "《恐惧与颤栗》（Fear and Trembling）"
},
{
"id": "comte",
"name": "孔德",
"nameEn": "Auguste Comte",
"era": "19世纪",
"born": "1798年",
"birthplace": "蒙彼利埃",
"died": "1857年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "实证主义",
"wiki": "Auguste Comte",
"bio": "孔德创立了实证主义，并创造了“社会学”一词。他认为思想历经神学、形而上学和实证三个阶段。晚年他创立了“人道教”。",
"ideas": [
"三阶段规律",
"实证主义",
"社会学"
],
"books": [
["实证哲学教程", 1830, "科学的等级序列。", "Course of Positive Philosophy"]
],
"quote": "",
"start": "《实证哲学导论》（Introduction to Positive Philosophy）"
},
{
"id": "mill",
"name": "密尔",
"nameEn": "John Stuart Mill",
"era": "19世纪",
"born": "1806年",
"birthplace": "伦敦",
"died": "1873年",
"deathplace": "阿维尼翁",
"nationality": "英国",
"schools": "功利主义、自由主义",
"wiki": "John Stuart Mill",
"bio": "密尔自幼受父亲詹姆斯·密尔和边沁的密集教育。他以高级快乐与低级快乐的区分改进了功利主义。他捍卫个人自由、代议制政府和女性平等。",
"ideas": [
"伤害原则",
"高级快乐与低级快乐",
"言论自由",
"女性平等"
],
"books": [
["逻辑学体系", 1843, "归纳逻辑与方法。", "A System of Logic"],
["论自由", 1859, "伤害原则。", "On Liberty"],
["功利主义", 1863, "最大幸福原则。", "Utilitarianism"],
["妇女的屈从地位", 1869, "主张两性的法律平等。", "The Subjection of Women"]
],
"quote": "",
"start": "《论自由》（On Liberty）"
},
{
"id": "marx",
"name": "马克思",
"nameEn": "Karl Marx",
"era": "19世纪",
"born": "1818年",
"birthplace": "特里尔",
"died": "1883年",
"deathplace": "伦敦",
"nationality": "德国",
"schools": "马克思主义、青年黑格尔派",
"wiki": "Karl Marx",
"bio": "马克思是哲学家、经济学家和革命者，大半生流亡伦敦。他与恩格斯共同创立了历史唯物主义：历史由围绕生产资料的阶级斗争推动。他的《资本论》分析了资本主义如何从劳动中榨取剩余价值。",
"ideas": [
"历史唯物主义",
"阶级斗争",
"异化",
"剩余价值",
"经济基础与上层建筑"
],
"books": [
["1844年经济学哲学手稿", 1844, "异化劳动。", "Economic and Philosophic Manuscripts"],
["德意志意识形态", 1846, "与恩格斯合著；包含对施蒂纳的批判。", "The German Ideology"],
["共产党宣言", 1848, "与恩格斯合著；阶级斗争。", "The Communist Manifesto"],
["资本论 第一卷", 1867, "商品与剩余价值。", "Capital, Vol. I"]
],
"quote": "哲学家们只是用不同的方式解释世界，而问题在于改变世界。",
"start": "《共产党宣言》（The Communist Manifesto），然后是《资本论》（Capital）第一卷"
},
{
"id": "engels",
"name": "恩格斯",
"nameEn": "Friedrich Engels",
"era": "19世纪",
"born": "1820年",
"birthplace": "巴门",
"died": "1895年",
"deathplace": "伦敦",
"nationality": "德国",
"schools": "马克思主义",
"wiki": "Friedrich Engels",
"bio": "恩格斯是工厂主的儿子，也是马克思终生的合作者与资助者。他描述了曼彻斯特的工人状况。他编辑了《资本论》后续各卷。",
"ideas": [
"辩证唯物主义",
"工人阶级的状况"
],
"books": [
["英国工人阶级状况", 1845, "工业贫困。", "The Condition of the Working Class in England"],
["社会主义从空想到科学的发展", 1880, "通俗化的马克思主义。", "Socialism: Utopian and Scientific"]
],
"quote": "",
"start": "《社会主义从空想到科学的发展》（Socialism: Utopian and Scientific）"
},
{
"id": "proudhon",
"name": "蒲鲁东",
"nameEn": "Pierre-Joseph Proudhon",
"era": "19世纪",
"born": "1809年",
"birthplace": "贝桑松",
"died": "1865年",
"deathplace": "帕西",
"nationality": "法国",
"schools": "无政府主义、互助主义",
"wiki": "Pierre-Joseph Proudhon",
"bio": "蒲鲁东是第一个自称无政府主义者的人。他认为以地租和利息形式存在的财产就是盗窃。他提出了互助主义与联邦主义。",
"ideas": [
"财产即盗窃",
"互助主义",
"联邦主义"
],
"books": [
["什么是所有权？", 1840, "对财产的批判。", "What Is Property?"]
],
"quote": "财产就是盗窃。",
"start": "《什么是所有权？》（What Is Property?）"
},
{
"id": "bakunin",
"name": "巴枯宁",
"nameEn": "Mikhail Bakunin",
"era": "19世纪",
"born": "1814年",
"birthplace": "普里亚穆希诺",
"died": "1876年",
"deathplace": "伯尔尼",
"nationality": "俄国",
"schools": "无政府主义",
"wiki": "Mikhail Bakunin",
"bio": "巴枯宁是革命的无政府主义者，在第一国际中与马克思发生冲突。他反对一切国家权力，包括工人国家。他曾遭监禁，后从西伯利亚逃出。",
"ideas": [
"反国家主义",
"集体主义无政府主义",
"对马克思国家观的批判"
],
"books": [
["国家主义与无政府主义", 1873, "反对国家。", "Statism and Anarchy"]
],
"quote": "",
"start": "《国家主义与无政府主义》（Statism and Anarchy）"
},
{
"id": "emerson",
"name": "爱默生",
"nameEn": "Ralph Waldo Emerson",
"era": "19世纪",
"born": "1803年",
"birthplace": "波士顿",
"died": "1882年",
"deathplace": "马萨诸塞州康科德",
"nationality": "美国",
"schools": "超验主义",
"wiki": "Ralph Waldo Emerson",
"bio": "爱默生离开牧师职位，成为讲演者和随笔作家。他领导美国超验主义，倡导自立与自然的神性。尼采钦佩他。",
"ideas": [
"自立",
"超灵",
"自然作为精神"
],
"books": [
["论自然", 1836, "超验主义的宣言。", "Nature"],
["随笔集 第一辑", 1841, "包括《自立》。", "Essays: First Series"]
],
"quote": "",
"start": "《自立》（Self-Reliance）"
},
{
"id": "thoreau",
"name": "梭罗",
"nameEn": "Henry David Thoreau",
"era": "19世纪",
"born": "1817年",
"birthplace": "马萨诸塞州康科德",
"died": "1862年",
"deathplace": "康科德",
"nationality": "美国",
"schools": "超验主义",
"wiki": "Henry David Thoreau",
"bio": "梭罗在瓦尔登湖畔的小屋中生活了两年。他拒绝缴纳支持奴隶制与战争的人头税。他关于公民不服从的文章影响了甘地和马丁·路德·金。",
"ideas": [
"简朴生活",
"公民不服从",
"自然"
],
"books": [
["论公民的不服从", 1849, "以良知对抗不义之法。", "Civil Disobedience"],
["瓦尔登湖", 1854, "瓦尔登湖畔的生活。", "Walden"]
],
"quote": "",
"start": "《瓦尔登湖》（Walden）"
},
{
"id": "dostoevsky",
"name": "陀思妥耶夫斯基",
"nameEn": "Fyodor Dostoevsky",
"era": "19世纪",
"born": "1821年",
"birthplace": "莫斯科",
"died": "1881年",
"deathplace": "圣彼得堡",
"nationality": "俄罗斯",
"schools": "俄罗斯东正教、存在主义先驱",
"wiki": "Fyodor Dostoevsky",
"bio": "陀思妥耶夫斯基是一位小说家，曾经历一场假处决，并在西伯利亚的劳役营中服刑。他的小说深入探讨自由、罪责、信仰与虚无主义。他是存在主义的重要先驱。",
"ideas": [
"自由与苦难",
"对理性利己主义的批判",
"宗教大法官"
],
"books": [
["地下室手记", 1864, "反对理性利己主义。", "Notes from Underground"],
["罪与罚", 1866, "谋杀与救赎。", "Crime and Punishment"],
["卡拉马佐夫兄弟", 1880, "信仰、怀疑与宗教大法官。", "The Brothers Karamazov"]
],
"quote": "",
"start": "陀思妥耶夫斯基《地下室手记》（Notes from Underground）"
},
{
"id": "tolstoy",
"name": "列夫·托尔斯泰",
"nameEn": "Leo Tolstoy",
"era": "19世纪",
"born": "1828年",
"birthplace": "亚斯纳亚·波利亚纳",
"died": "1910年",
"deathplace": "阿斯塔波沃",
"nationality": "俄罗斯",
"schools": "基督教无政府主义",
"wiki": "Leo Tolstoy",
"bio": "托尔斯泰是《战争与和平》与《安娜·卡列尼娜》的作者。经历精神危机后，他宣扬非暴力，以及一种去除教会教条的理性基督教。他影响了甘地。",
"ideas": [
"不以暴力抗恶",
"基督教无政府主义",
"生命的意义"
],
"books": [
["忏悔录", 1882, "精神危机。", "A Confession"],
["天国在你心中", 1894, "非暴力。", "The Kingdom of God Is Within You"]
],
"quote": "",
"start": "托尔斯泰《忏悔录》（A Confession）"
},
{
"id": "nietzsche",
"name": "弗里德里希·尼采",
"nameEn": "Friedrich Nietzsche",
"era": "19世纪",
"born": "1844年",
"birthplace": "勒肯",
"died": "1900年",
"deathplace": "魏玛",
"nationality": "德国",
"schools": "存在主义先驱、视角主义",
"wiki": "Friedrich Nietzsche",
"bio": "尼采24岁即成为巴塞尔大学古典语文学教授，1879年因健康不佳而辞职。他在格言体著作中诊断出“上帝之死”与虚无主义的危险，并呼吁重估一切价值。1889年他精神崩溃，生命的最后十年丧失工作能力。",
"ideas": [
"上帝之死",
"权力意志",
"永恒轮回",
"主人道德与奴隶道德",
"超人",
"视角主义"
],
"books": [
["悲剧的诞生", 1872, "日神与酒神。", "The Birth of Tragedy"],
["快乐的科学", 1882, "上帝死了。", "The Gay Science"],
["查拉图斯特拉如是说", 1883, "超人。", "Thus Spoke Zarathustra"],
["善恶的彼岸", 1886, "未来哲学的前奏。", "Beyond Good and Evil"],
["论道德的谱系", 1887, "奴隶道德与怨恨。", "On the Genealogy of Morals"],
["偶像的黄昏", 1888, "如何用锤子从事哲学。", "Twilight of the Idols"]
],
"quote": "上帝死了。",
"start": "尼采《论道德的谱系》（On the Genealogy of Morals）"
},
{
"id": "dilthey",
"name": "威廉·狄尔泰",
"nameEn": "Wilhelm Dilthey",
"era": "19世纪",
"born": "1833年",
"birthplace": "比布里希",
"died": "1911年",
"deathplace": "塞伊斯",
"nationality": "德国",
"schools": "解释学、历史主义",
"wiki": "Wilhelm Dilthey",
"bio": "狄尔泰区分了以理解为目标的精神科学与以说明为目标的自然科学。他发展了解释学以及关于生命体验的哲学。海德格尔与伽达默尔都继承了他的工作。",
"ideas": [
"理解与说明之别",
"生命体验",
"历史性"
],
"books": [
["精神科学导论", 1883, "精神科学的基础。", "Introduction to the Human Sciences"]
],
"quote": "",
"start": "狄尔泰《精神科学导论》（Introduction to the Human Sciences）"
},
{
"id": "brentano",
"name": "弗朗茨·布伦塔诺",
"nameEn": "Franz Brentano",
"era": "19世纪",
"born": "1838年",
"birthplace": "莱茵河畔马林贝格",
"died": "1917年",
"deathplace": "苏黎世",
"nationality": "德国",
"schools": "描述心理学",
"wiki": "Franz Brentano",
"bio": "布伦塔诺曾是一名神父，因教皇无误论而脱离教会。他复兴了意向性学说，即心灵指向对象的特性。他的学生包括胡塞尔，弗洛伊德也曾旁听他的课程。",
"ideas": [
"意向性",
"描述心理学"
],
"books": [
["从经验立场出发的心理学", 1874, "意向性是心理现象的标志。", "Psychology from an Empirical Standpoint"]
],
"quote": "",
"start": "布伦塔诺《从经验立场出发的心理学》（Psychology from an Empirical Standpoint）第二卷第一章"
},
{
"id": "peirce",
"name": "皮尔士",
"nameEn": "C. S. Peirce",
"era": "19世纪",
"born": "1839年",
"birthplace": "马萨诸塞州剑桥",
"died": "1914年",
"deathplace": "宾夕法尼亚州米尔福德",
"nationality": "美国",
"schools": "实用主义",
"wiki": "Charles Sanders Peirce",
"bio": "皮尔士是逻辑学家、科学家，也是实用主义的创始人。他发展了符号学与溯因推理。他从未获得固定的教职，去世时穷困。",
"ideas": [
"实用主义准则",
"符号学：图像、指示、象征",
"溯因",
"可错论"
],
"books": [
["信念的确定", 1877, "确定意见的方法。", "The Fixation of Belief"],
["如何使我们的观念清楚", 1878, "实用主义准则。", "How to Make Our Ideas Clear"]
],
"quote": "",
"start": "皮尔士《皮尔士文集》第一卷（The Essential Peirce, Vol. 1）"
},
{
"id": "james",
"name": "威廉·詹姆斯",
"nameEn": "William James",
"era": "19世纪",
"born": "1842年",
"birthplace": "纽约市",
"died": "1910年",
"deathplace": "新罕布什尔州乔科鲁阿",
"nationality": "美国",
"schools": "实用主义、彻底经验主义",
"wiki": "William James",
"bio": "詹姆斯原为医生，后成为哈佛的心理学与哲学教授。他推广了实用主义，并写下一部心理学的奠基之作。他为信仰的权利辩护，并研究宗教经验。",
"ideas": [
"意识流",
"真理的实用主义理论",
"信仰的意志",
"彻底经验主义"
],
"books": [
["心理学原理", 1890, "意识流。", "The Principles of Psychology"],
["信仰的意志", 1896, "证据不足时的信仰。", "The Will to Believe"],
["宗教经验之种种", 1902, "宗教心理学。", "The Varieties of Religious Experience"],
["实用主义", 1907, "真理即有用。", "Pragmatism"]
],
"quote": "",
"start": "詹姆斯《实用主义》（Pragmatism）"
},
{
"id": "sidgwick",
"name": "亨利·西季威克",
"nameEn": "Henry Sidgwick",
"era": "19世纪",
"born": "1838年",
"birthplace": "斯基普顿",
"died": "1900年",
"deathplace": "特林",
"nationality": "英国",
"schools": "功利主义",
"wiki": "Henry Sidgwick",
"bio": "西季威克是剑桥哲学家，其《伦理学方法》比较了利己主义、直觉主义与功利主义。帕菲特与辛格认为它是伦理学中最好的著作之一。他还推动了女子教育。",
"ideas": [
"伦理学方法",
"实践理性的二元论",
"宇宙的观点"
],
"books": [
["伦理学方法", 1874, "对伦理方法的系统比较。", "The Methods of Ethics"]
],
"quote": "",
"start": "西季威克《伦理学方法》（The Methods of Ethics）"
},
{
"id": "frege",
"name": "戈特洛布·弗雷格",
"nameEn": "Gottlob Frege",
"era": "分析哲学",
"born": "1848年",
"birthplace": "维斯马",
"died": "1925年",
"deathplace": "巴特克莱嫩",
"nationality": "德国",
"schools": "分析哲学、逻辑主义",
"wiki": "Gottlob Frege",
"bio": "弗雷格是耶拿大学的数学家，发明了现代谓词逻辑。他试图从逻辑推出算术，这一计划因罗素悖论而失败。他关于涵义与指称的区分奠定了语言哲学的基础。",
"ideas": [
"谓词逻辑与量词",
"逻辑主义",
"涵义与指称",
"语境原则"
],
"books": [
["概念文字", 1879, "谓词逻辑。", "Begriffsschrift"],
["算术基础", 1884, "从逻辑推出数。", "The Foundations of Arithmetic"],
["论涵义与指称", 1892, "涵义与指称（Sinn und Bedeutung）。", "On Sense and Reference"]
],
"quote": "",
"start": "弗雷格《算术基础》（The Foundations of Arithmetic）"
},
{
"id": "russell",
"name": "伯特兰·罗素",
"nameEn": "Bertrand Russell",
"era": "分析哲学",
"born": "1872年",
"birthplace": "威尔士特雷莱赫",
"died": "1970年",
"deathplace": "威尔士彭林代德赖斯",
"nationality": "英国",
"schools": "分析哲学、逻辑原子主义",
"wiki": "Bertrand Russell",
"bio": "罗素与怀特海合著《数学原理》，共同奠定了分析哲学。他的摹状词理论成为哲学分析的典范。一战期间他因和平主义立场入狱，1950年获诺贝尔文学奖，并长期投身反核武器运动。",
"ideas": [
"摹状词理论",
"罗素悖论",
"逻辑原子主义",
"亲知知识与描述知识"
],
"books": [
["论指称", 1905, "摹状词理论。", "On Denoting"],
["数学原理", 1910, "与怀特海合著；从逻辑推出数学。", "Principia Mathematica"],
["哲学问题", 1912, "通俗易懂的认识论。", "The Problems of Philosophy"],
["西方哲学史", 1945, "通俗哲学史。", "A History of Western Philosophy"]
],
"quote": "",
"start": "罗素《哲学问题》（The Problems of Philosophy）"
},
{
"id": "moore",
"name": "摩尔",
"nameEn": "G. E. Moore",
"era": "分析哲学",
"born": "1873年",
"birthplace": "伦敦",
"died": "1958年",
"deathplace": "剑桥",
"nationality": "英国",
"schools": "分析哲学、常识哲学",
"wiki": "G. E. Moore",
"bio": "摩尔与罗素一道在剑桥领导了对英国唯心主义的反叛。他捍卫常识信念，并主张“善”是简单而不可定义的属性。他的伦理学影响了布卢姆斯伯里团体。",
"ideas": [
"自然主义谬误",
"开放问题论证",
"为常识辩护",
"这是一只手"
],
"books": [
["伦理学原理", 1903, "善不可定义。", "Principia Ethica"],
["为常识辩护", 1925, "常识的确定性。", "A Defence of Common Sense"]
],
"quote": "",
"start": "摩尔《伦理学原理》（Principia Ethica）第一章"
},
{
"id": "whitehead",
"name": "阿尔弗雷德·诺斯·怀特海",
"nameEn": "Alfred North Whitehead",
"era": "分析哲学",
"born": "1861年",
"birthplace": "拉姆斯盖特",
"died": "1947年",
"deathplace": "马萨诸塞州剑桥",
"nationality": "英国",
"schools": "过程哲学",
"wiki": "Alfred North Whitehead",
"bio": "怀特海是数学家，与罗素合著《数学原理》。在哈佛，他发展了过程哲学，认为实在由生成的事件构成。他批判了“具体性误置的谬误”。",
"ideas": [
"过程优先于实体",
"现实实有",
"具体性误置的谬误"
],
"books": [
["科学与近代世界", 1925, "对科学唯物论的批判。", "Science and the Modern World"],
["过程与实在", 1929, "实在即生成。", "Process and Reality"]
],
"quote": "对欧洲哲学传统最稳妥的一般概括是：它由对柏拉图的一系列脚注构成。",
"start": "怀特海《科学与近代世界》（Science and the Modern World）"
},
{
"id": "wittgenstein",
"name": "路德维希·维特根斯坦",
"nameEn": "Ludwig Wittgenstein",
"era": "分析哲学",
"born": "1889年",
"birthplace": "维也纳",
"died": "1951年",
"deathplace": "剑桥",
"nationality": "奥地利裔英国人",
"schools": "分析哲学、日常语言哲学",
"wiki": "Ludwig Wittgenstein",
"bio": "维特根斯坦出身维也纳最富有的家族之一，在剑桥师从罗素。一战期间他作为士兵写下《逻辑哲学论》，随后多年放弃哲学。重返剑桥后，他否定自己的早期观点，主张意义在于语言游戏中的用法。",
"ideas": [
"意义的图像理论",
"不可言说者必须显示",
"意义即用法",
"语言游戏",
"私人语言论证",
"家族相似"
],
"books": [
["逻辑哲学论", 1921, "图像理论；语言的界限。", "Tractatus Logico-Philosophicus"],
["哲学研究", 1953, "语言游戏与私人语言。", "Philosophical Investigations"],
["论确实性", 1969, "枢纽命题。", "On Certainty"]
],
"quote": "凡是不可言说的，必须保持沉默。",
"start": "雷·蒙克《天才之为责任》（The Duty of Genius），然后是维特根斯坦《哲学研究》（Philosophical Investigations）"
},
{
"id": "ramsey",
"name": "弗兰克·拉姆齐",
"nameEn": "Frank Ramsey",
"era": "分析哲学",
"born": "1903年",
"birthplace": "剑桥",
"died": "1930年",
"deathplace": "伦敦",
"nationality": "英国",
"schools": "分析哲学、实用主义",
"wiki": "Frank P. Ramsey",
"bio": "拉姆齐在26岁去世前，对逻辑学、概率论、经济学与哲学都作出了持久贡献。他协助翻译《逻辑哲学论》，并说服维特根斯坦重返哲学。他的主观概率理论预示了决策论。",
"ideas": [
"主观概率",
"拉姆齐语句",
"真理的冗余理论"
],
"books": [
["真理与概率", 1926, "信念程度。", "Truth and Probability"]
],
"quote": "",
"start": "谢丽尔·米萨克《弗兰克·拉姆齐：力量的纯粹过剩》（Frank Ramsey: A Sheer Excess of Powers）"
},
{
"id": "carnap",
"name": "鲁道夫·卡尔纳普",
"nameEn": "Rudolf Carnap",
"era": "分析哲学",
"born": "1891年",
"birthplace": "龙斯多夫",
"died": "1970年",
"deathplace": "圣莫尼卡",
"nationality": "德裔美国人",
"schools": "逻辑实证主义、维也纳学派",
"wiki": "Rudolf Carnap",
"bio": "卡尔纳普是维也纳学派的核心成员。他试图从经验出发对知识作逻辑重构，并主张形而上学陈述无意义。移居美国后，他研究语义学与归纳逻辑。",
"ideas": [
"世界的逻辑构造",
"消除形而上学",
"语言框架"
],
"books": [
["世界的逻辑构造", 1928, "理性重构。", "The Logical Structure of the World"],
["语言的逻辑句法", 1934, "宽容原则。", "The Logical Syntax of Language"],
["经验主义、语义学与本体论", 1950, "内部问题与外部问题。", "Empiricism, Semantics, and Ontology"]
],
"quote": "",
"start": "卡尔纳普《经验主义、语义学与本体论》（Empiricism, Semantics, and Ontology）"
},
{
"id": "ayer",
"name": "艾耶尔",
"nameEn": "A. J. Ayer",
"era": "分析哲学",
"born": "1910年",
"birthplace": "伦敦",
"died": "1989年",
"deathplace": "伦敦",
"nationality": "英国",
"schools": "逻辑实证主义",
"wiki": "A. J. Ayer",
"bio": "艾耶尔26岁时把维也纳学派的思想引入英国。他认为，只有分析命题或可经验证实的陈述才有意义。在他看来，伦理陈述表达的是情感。",
"ideas": [
"证实原则",
"情感主义",
"消除形而上学"
],
"books": [
["语言、真理与逻辑", 1936, "证实原则。", "Language, Truth and Logic"]
],
"quote": "",
"start": "艾耶尔《语言、真理与逻辑》（Language, Truth and Logic）"
},
{
"id": "popper",
"name": "卡尔·波普尔",
"nameEn": "Karl Popper",
"era": "分析哲学",
"born": "1902年",
"birthplace": "维也纳",
"died": "1994年",
"deathplace": "伦敦",
"nationality": "奥地利裔英国人",
"schools": "批判理性主义",
"wiki": "Karl Popper",
"bio": "波普尔主张，科学通过大胆的猜想与尝试性的反驳而进步，而非通过归纳。一个理论只有可证伪才是科学的。他在新西兰流亡期间写成的《开放社会》抨击柏拉图、黑格尔与马克思是自由的敌人。",
"ideas": [
"可证伪性",
"批判理性主义",
"开放社会",
"宽容悖论"
],
"books": [
["科学发现的逻辑", 1934, "可证伪性。", "The Logic of Scientific Discovery"],
["开放社会及其敌人", 1945, "反对柏拉图、黑格尔与马克思。", "The Open Society and Its Enemies"],
["猜想与反驳", 1963, "关于科学的论文集。", "Conjectures and Refutations"]
],
"quote": "",
"start": "波普尔《猜想与反驳》（Conjectures and Refutations）第一章"
},
{
"id": "ryle",
"name": "吉尔伯特·赖尔",
"nameEn": "Gilbert Ryle",
"era": "分析哲学",
"born": "1900年",
"birthplace": "布赖顿",
"died": "1976年",
"deathplace": "惠特比",
"nationality": "英国",
"schools": "日常语言哲学",
"wiki": "Gilbert Ryle",
"bio": "赖尔是牛津哲学家，曾任《心灵》杂志主编。他抨击笛卡尔式二元论是“机器中的幽灵这一教条”。他区分了知道如何与知道如此。",
"ideas": [
"机器中的幽灵",
"范畴错误",
"知道如何与知道如此"
],
"books": [
["心的概念", 1949, "反对笛卡尔式二元论。", "The Concept of Mind"]
],
"quote": "",
"start": "赖尔《心的概念》（The Concept of Mind）第一章"
},
{
"id": "austin",
"name": "奥斯汀",
"nameEn": "J. L. Austin",
"era": "分析哲学",
"born": "1911年",
"birthplace": "兰开斯特",
"died": "1960年",
"deathplace": "牛津",
"nationality": "英国",
"schools": "日常语言哲学",
"wiki": "J. L. Austin",
"bio": "奥斯汀领导了牛津日常语言哲学。他指出，话语可以做事，例如许诺或结婚。他的言语行为理论由塞尔加以发展。",
"ideas": [
"言语行为",
"施事话语",
"以言表意、以言行事、以言取效"
],
"books": [
["感觉与可感物", 1962, "反对感觉材料。", "Sense and Sensibilia"],
["如何以言行事", 1962, "言语行为。", "How to Do Things with Words"]
],
"quote": "",
"start": "奥斯汀《如何以言行事》（How to Do Things with Words）"
},
{
"id": "anscombe",
"name": "安斯康姆",
"nameEn": "G. E. M. Anscombe",
"era": "分析哲学",
"born": "1919年",
"birthplace": "利默里克",
"died": "2001年",
"deathplace": "剑桥",
"nationality": "英国",
"schools": "分析哲学、托马斯主义",
"wiki": "G. E. M. Anscombe",
"bio": "安斯康姆是维特根斯坦的学生、文学遗嘱执行人与译者。她的《意向》奠定了现代行动理论。她的论文《现代道德哲学》推动了德性伦理学的复兴。",
"ideas": [
"描述下的意向行动",
"对道德“应当”的批判",
"德性伦理学的复兴"
],
"books": [
["意向", 1957, "描述下的行动。", "Intention"],
["现代道德哲学", 1958, "对道德“应当”的批判。", "Modern Moral Philosophy"]
],
"quote": "",
"start": "安斯康姆《现代道德哲学》（Modern Moral Philosophy）"
},
{
"id": "quine",
"name": "蒯因",
"nameEn": "W. V. O. Quine",
"era": "分析哲学",
"born": "1908年",
"birthplace": "俄亥俄州阿克伦",
"died": "2000年",
"deathplace": "波士顿",
"nationality": "美国",
"schools": "分析哲学、自然主义",
"wiki": "Willard Van Orman Quine",
"bio": "蒯因在哈佛任教数十年。他抨击分析—综合区分，主张信念作为整体之网面对经验。他认为认识论应当成为心理学的一部分。",
"ideas": [
"反对分析/综合区分",
"证实整体论",
"翻译的不确定性",
"本体论承诺"
],
"books": [
["论何物存在", 1948, "存在就是成为变项的值。", "On What There Is"],
["经验论的两个教条", 1951, "反对分析性。", "Two Dogmas of Empiricism"],
["语词与对象", 1960, "翻译的不确定性。", "Word and Object"]
],
"quote": "",
"start": "蒯因《从逻辑的观点看》（From a Logical Point of View）"
},
{
"id": "sellars",
"name": "威尔弗里德·塞拉斯",
"nameEn": "Wilfrid Sellars",
"era": "分析哲学",
"born": "1912年",
"birthplace": "安娜堡",
"died": "1989年",
"deathplace": "匹兹堡",
"nationality": "美国",
"schools": "分析哲学",
"wiki": "Wilfrid Sellars",
"bio": "塞拉斯在匹兹堡任教。他抨击“所与之神话”，即知识建立在自我辩护的经验之上。他对比了人的显见图像与科学图像。",
"ideas": [
"所与之神话",
"理由的空间",
"显见图像与科学图像"
],
"books": [
["经验主义与心灵哲学", 1956, "所与之神话。", "Empiricism and the Philosophy of Mind"],
["哲学与人的科学图像", 1962, "两种图像。", "Philosophy and the Scientific Image of Man"]
],
"quote": "",
"start": "塞拉斯《哲学与人的科学图像》（Philosophy and the Scientific Image of Man）"
},
{
"id": "davidson",
"name": "唐纳德·戴维森",
"nameEn": "Donald Davidson",
"era": "分析哲学",
"born": "1917年",
"birthplace": "马萨诸塞州斯普林菲尔德",
"died": "2003年",
"deathplace": "伯克利",
"nationality": "美国",
"schools": "分析哲学",
"wiki": "Donald Davidson",
"bio": "戴维森主张理由是行动的原因。他发展了真值条件意义理论与彻底解释。在心灵哲学上，他持异常一元论。",
"ideas": [
"理由即原因",
"彻底解释",
"异常一元论",
"宽容原则"
],
"books": [
["行动、理由与原因", 1963, "理由即原因。", "Actions, Reasons, and Causes"],
["真理与解释", 1984, "论文选集。", "Truth and Interpretation"]
],
"quote": "",
"start": "戴维森《行动与事件论文集》（Essays on Actions and Events）"
},
{
"id": "kuhn",
"name": "托马斯·库恩",
"nameEn": "Thomas Kuhn",
"era": "分析哲学",
"born": "1922年",
"birthplace": "辛辛那提",
"died": "1996年",
"deathplace": "马萨诸塞州剑桥",
"nationality": "美国",
"schools": "科学哲学",
"wiki": "Thomas Kuhn",
"bio": "库恩原受物理学训练，后转向科学史。他主张科学在范式之下的常规科学与革命之间交替。他的著作使“范式转换”一词广为流传。",
"ideas": [
"范式",
"常规科学与革命科学",
"不可通约性"
],
"books": [
["科学革命的结构", 1962, "常规科学与革命。", "The Structure of Scientific Revolutions"]
],
"quote": "",
"start": "库恩《科学革命的结构》（The Structure of Scientific Revolutions）"
},
{
"id": "feyerabend",
"name": "保罗·费耶阿本德",
"nameEn": "Paul Feyerabend",
"era": "分析哲学",
"born": "1924年",
"birthplace": "维也纳",
"died": "1994年",
"deathplace": "热诺利耶",
"nationality": "奥地利",
"schools": "科学哲学",
"wiki": "Paul Feyerabend",
"bio": "费耶阿本德是波普尔的学生，后来反对一切固定的科学方法。他主张科学史表明“怎么都行”。他捍卫多元论。",
"ideas": [
"认识论的无政府主义",
"“怎么都行”",
"多元论"
],
"books": [
["反对方法", 1975, "没有普遍方法。", "Against Method"]
],
"quote": "",
"start": "费耶阿本德《反对方法》（Against Method）"
},
{
"id": "rawls",
"name": "约翰·罗尔斯",
"nameEn": "John Rawls",
"era": "分析哲学",
"born": "1921年",
"birthplace": "巴尔的摩",
"died": "2002年",
"deathplace": "马萨诸塞州列克星敦",
"nationality": "美国",
"schools": "自由主义",
"wiki": "John Rawls",
"bio": "罗尔斯在哈佛任教，复兴了规范政治哲学。他追问人们在无知之幕背后会选择哪些原则。他得出的结论是平等的基本自由与差别原则。",
"ideas": [
"作为公平的正义",
"原初状态与无知之幕",
"差别原则",
"重叠共识"
],
"books": [
["正义论", 1971, "作为公平的正义。", "A Theory of Justice"],
["政治自由主义", 1993, "重叠共识。", "Political Liberalism"]
],
"quote": "",
"start": "罗尔斯《作为公平的正义：一个重述》（Justice as Fairness: A Restatement）"
},
{
"id": "nozick",
"name": "罗伯特·诺齐克",
"nameEn": "Robert Nozick",
"era": "分析哲学",
"born": "1938年",
"birthplace": "布鲁克林",
"died": "2002年",
"deathplace": "马萨诸塞州剑桥",
"nationality": "美国",
"schools": "自由至上主义",
"wiki": "Robert Nozick",
"bio": "诺齐克是罗尔斯在哈佛的同事。他的第一部著作捍卫仅限于保护权利的守夜人国家。该书提出了体验机与威尔特·张伯伦论证。",
"ideas": [
"资格理论",
"最低限度国家",
"体验机"
],
"books": [
["无政府、国家与乌托邦", 1974, "最低限度国家。", "Anarchy, State, and Utopia"],
["哲学解释", 1981, "知识、同一性与意义。", "Philosophical Explanations"]
],
"quote": "",
"start": "诺齐克《无政府、国家与乌托邦》（Anarchy, State, and Utopia）第二部分"
},
{
"id": "kripke",
"name": "索尔·克里普克",
"nameEn": "Saul Kripke",
"era": "分析哲学",
"born": "1940年",
"birthplace": "纽约州贝肖尔",
"died": "2022年",
"deathplace": "新泽西州普兰斯伯勒",
"nationality": "美国",
"schools": "分析哲学",
"wiki": "Saul Kripke",
"bio": "克里普克十几岁就为模态逻辑发展了可能世界语义学。他的讲座《命名与必然性》主张名称是严格指示词，并存在后天必然真理。他还对维特根斯坦的规则观提出了极具影响的解读。",
"ideas": [
"严格指示",
"后天必然",
"指称的因果理论"
],
"books": [
["命名与必然性", 1980, "严格指示词。", "Naming and Necessity"],
["维特根斯坦论规则与私人语言", 1982, "遵守规则的悖论。", "Wittgenstein on Rules and Private Language"]
],
"quote": "",
"start": "克里普克《命名与必然性》（Naming and Necessity）"
},
{
"id": "lewis",
"name": "大卫·刘易斯",
"nameEn": "David Lewis",
"era": "分析哲学",
"born": "1941年",
"birthplace": "俄亥俄州奥伯林",
"died": "2001年",
"deathplace": "普林斯顿",
"nationality": "美国",
"schools": "分析形而上学",
"wiki": "David Lewis (philosopher)",
"bio": "刘易斯在普林斯顿任教。他捍卫模态实在论，认为可能世界与我们所在的世界同样真实。他在反事实、约定与心灵方面写有影响深远的著作。",
"ideas": [
"模态实在论",
"反事实",
"休谟式随附"
],
"books": [
["约定", 1969, "对约定的博弈论解释。", "Convention"],
["论世界的多样性", 1986, "模态实在论。", "On the Plurality of Worlds"]
],
"quote": "",
"start": "刘易斯《反事实》（Counterfactuals）"
},
{
"id": "putnam",
"name": "希拉里·普特南",
"nameEn": "Hilary Putnam",
"era": "分析哲学",
"born": "1926年",
"birthplace": "芝加哥",
"died": "2016年",
"deathplace": "马萨诸塞州阿灵顿",
"nationality": "美国",
"schools": "分析哲学、实用主义",
"wiki": "Hilary Putnam",
"bio": "普特南在哈佛任教，并常常公开改变自己的观点。他以“孪生地球”论证“意义不在头脑中”。他提出功能主义，后来又加以批判。",
"ideas": [
"语义外在论",
"功能主义",
"缸中之脑",
"内部实在论"
],
"books": [
["“意义”的意义", 1975, "孪生地球。", "The Meaning of \"Meaning\""],
["理性、真理与历史", 1981, "缸中之脑。", "Reason, Truth and History"]
],
"quote": "",
"start": "普特南《理性、真理与历史》（Reason, Truth and History）"
},
{
"id": "rorty",
"name": "理查德·罗蒂",
"nameEn": "Richard Rorty",
"era": "分析哲学",
"born": "1931年",
"birthplace": "纽约市",
"died": "2007年",
"deathplace": "帕洛阿尔托",
"nationality": "美国",
"schools": "新实用主义",
"wiki": "Richard Rorty",
"bio": "罗蒂受的是分析哲学训练，但后来转而反对其基础主义抱负。他主张知识并非自然的镜子。他倡导实用主义、自由主义的反讽与对话。",
"ideas": [
"反对表象主义",
"新实用主义",
"自由主义反讽"
],
"books": [
["哲学与自然之镜", 1979, "反对作为基础的认识论。", "Philosophy and the Mirror of Nature"],
["偶然、反讽与团结", 1989, "自由主义的反讽者。", "Contingency, Irony, and Solidarity"]
],
"quote": "",
"start": "偶然、反讽与团结（Contingency, Irony, and Solidarity）"
},
{
"id": "macintyre",
"name": "阿拉斯代尔·麦金太尔",
"nameEn": "Alasdair MacIntyre",
"era": "分析哲学",
"born": "1929年",
"birthplace": "格拉斯哥",
"died": "2025年",
"deathplace": "印第安纳州南本德",
"nationality": "苏格兰裔美国人",
"schools": "德性伦理学、托马斯主义",
"wiki": "Alasdair MacIntyre",
"bio": "麦金太尔从马克思主义转向亚里士多德式的托马斯主义。他主张现代道德话语是一种失落传统的碎片。他呼吁德性共同体。",
"ideas": [
"德性传统",
"实践与叙事",
"对自由主义现代性的批判"
],
"books": [
["追寻美德", 1981, "恢复德性。", "After Virtue"],
["谁的正义？何种合理性？", 1988, "合理性的诸传统。", "Whose Justice? Which Rationality?"]
],
"quote": "",
"start": "追寻美德（After Virtue）"
},
{
"id": "williams",
"name": "伯纳德·威廉斯",
"nameEn": "Bernard Williams",
"era": "分析哲学",
"born": "1929年",
"birthplace": "西克利夫海滨",
"died": "2003年",
"deathplace": "罗马",
"nationality": "英国",
"schools": "分析伦理学",
"wiki": "Bernard Williams",
"bio": "威廉斯是功利主义与康德道德理论的批评者。他提出“道德运气”概念，强调人格完整与根本计划。他认为伦理学需要历史与希腊思想。",
"ideas": [
"道德运气",
"完整性",
"厚实的伦理概念"
],
"books": [
["伦理学与哲学的限度", 1985, "对道德理论的批判。", "Ethics and the Limits of Philosophy"],
["真理与真诚", 2002, "真诚性的谱系。", "Truth and Truthfulness"]
],
"quote": "",
"start": "伦理学与哲学的限度（Ethics and the Limits of Philosophy）"
},
{
"id": "parfit",
"name": "德里克·帕菲特",
"nameEn": "Derek Parfit",
"era": "分析哲学",
"born": "1942年",
"birthplace": "成都",
"died": "2017年",
"deathplace": "伦敦",
"nationality": "英国",
"schools": "分析伦理学",
"wiki": "Derek Parfit",
"bio": "帕菲特整个职业生涯都在牛津大学万灵学院度过。他主张人格同一性并非生存中要紧的东西。他还开创了人口伦理学。",
"ideas": [
"人格同一性并不重要",
"令人反感的结论",
"道德理论的趋同"
],
"books": [
["理由与人格", 1984, "同一性、合理性与未来世代。", "Reasons and Persons"],
["论重要之事", 2011, "伦理学中的趋同。", "On What Matters"]
],
"quote": "",
"start": "理由与人格（Reasons and Persons）第三部分"
},
{
"id": "singer",
"name": "彼得·辛格",
"nameEn": "Peter Singer",
"era": "分析哲学",
"born": "1946年",
"birthplace": "墨尔本",
"died": "—",
"deathplace": "—",
"nationality": "澳大利亚",
"schools": "功利主义",
"wiki": "Peter Singer",
"bio": "辛格是功利主义者，曾在普林斯顿大学任教。他的《动物解放》发起了现代动物权利运动。他主张富裕者对全球穷人有强有力的义务。",
"ideas": [
"物种歧视",
"有效利他主义",
"溺水儿童论证"
],
"books": [
["饥荒、富裕与道德", 1972, "对远方穷人的义务。", "Famine, Affluence, and Morality"],
["动物解放", 1975, "反对物种歧视。", "Animal Liberation"],
["实践伦理学", 1979, "应用伦理学。", "Practical Ethics"]
],
"quote": "",
"start": "饥荒、富裕与道德（Famine, Affluence, and Morality）"
},
{
"id": "nagel",
"name": "托马斯·内格尔",
"nameEn": "Thomas Nagel",
"era": "分析哲学",
"born": "1937年",
"birthplace": "贝尔格莱德",
"died": "—",
"deathplace": "—",
"nationality": "美国",
"schools": "分析哲学",
"wiki": "Thomas Nagel",
"bio": "内格尔曾在纽约大学任教。他主张意识具有物理学无法把握的主观特征。他还就客观性与道德运气写作。",
"ideas": [
"成为某物是什么样子",
"主观与客观",
"无处之见"
],
"books": [
["成为一只蝙蝠是什么样子？", 1974, "意识的主观性。", "What Is It Like to Be a Bat?"],
["无处之见", 1986, "客观性及其限度。", "The View from Nowhere"]
],
"quote": "",
"start": "这一切究竟意味着什么？（What Does It All Mean?）"
},
{
"id": "searle",
"name": "约翰·塞尔",
"nameEn": "John Searle",
"era": "分析哲学",
"born": "1932年",
"birthplace": "丹佛",
"died": "2025年",
"deathplace": "不详",
"nationality": "美国",
"schools": "分析哲学",
"wiki": "John Searle",
"bio": "塞尔在奥斯汀之后发展了言语行为理论。他的“中文屋”论证主张，运行程序并不产生理解。他还就社会实在写作。",
"ideas": [
"中文屋",
"言语行为",
"生物自然主义",
"社会本体论"
],
"books": [
["言语行为", 1969, "言语行为理论。", "Speech Acts"],
["心灵、大脑与程序", 1980, "中文屋。", "Minds, Brains, and Programs"],
["社会实在的建构", 1995, "制度性事实。", "The Construction of Social Reality"]
],
"quote": "",
"start": "心灵、大脑与程序（Minds, Brains, and Programs）"
},
{
"id": "dennett",
"name": "丹尼尔·丹尼特",
"nameEn": "Daniel Dennett",
"era": "分析哲学",
"born": "1942年",
"birthplace": "波士顿",
"died": "2024年",
"deathplace": "缅因州波特兰",
"nationality": "美国",
"schools": "心灵哲学、自然主义",
"wiki": "Daniel Dennett",
"bio": "丹尼特在牛津师从赖尔，后在塔夫茨大学任教。他为意识提供了一种自然主义的、削减式的说明。他是达尔文主义与无神论的著名倡导者。",
"ideas": [
"意向立场",
"多重草稿模型",
"相容论的自由意志"
],
"books": [
["意识的解释", 1991, "多重草稿模型。", "Consciousness Explained"],
["达尔文的危险观念", 1995, "作为算法的演化。", "Darwin's Dangerous Idea"]
],
"quote": "",
"start": "直觉泵与其他思维工具（Intuition Pumps and Other Tools for Thinking）"
},
{
"id": "chalmers",
"name": "大卫·查尔默斯",
"nameEn": "David Chalmers",
"era": "分析哲学",
"born": "1966年",
"birthplace": "悉尼",
"died": "—",
"deathplace": "—",
"nationality": "澳大利亚",
"schools": "心灵哲学",
"wiki": "David Chalmers",
"bio": "查尔默斯提出了意识的“难问题”。他主张意识无法还原为物理过程。他与安迪·克拉克共同提出延展心灵论题。",
"ideas": [
"难问题",
"哲学僵尸",
"延展心灵"
],
"books": [
["有意识的心灵", 1996, "难问题。", "The Conscious Mind"],
["现实+", 2022, "虚拟世界是真实的。", "Reality+"]
],
"quote": "",
"start": "有意识的心灵（The Conscious Mind）第一部分"
},
{
"id": "nussbaum",
"name": "玛莎·努斯鲍姆",
"nameEn": "Martha Nussbaum",
"era": "分析哲学",
"born": "1947年",
"birthplace": "纽约市",
"died": "—",
"deathplace": "—",
"nationality": "美国",
"schools": "可行能力进路、新亚里士多德主义",
"wiki": "Martha Nussbaum",
"bio": "努斯鲍姆研究古代哲学、伦理学、法律与情感。她与阿马蒂亚·森共同发展了可行能力进路。她在芝加哥大学任教。",
"ideas": [
"可行能力进路",
"善的脆弱性",
"情感作为判断"
],
"books": [
["善的脆弱性", 1986, "希腊伦理学中的运气。", "The Fragility of Goodness"],
["创造可行能力", 2011, "可行能力进路。", "Creating Capabilities"]
],
"quote": "",
"start": "创造可行能力（Creating Capabilities）"
},
{
"id": "taylor",
"name": "查尔斯·泰勒",
"nameEn": "Charles Taylor",
"era": "分析哲学",
"born": "1931年",
"birthplace": "蒙特利尔",
"died": "—",
"deathplace": "—",
"nationality": "加拿大",
"schools": "社群主义、解释学",
"wiki": "Charles Taylor (philosopher)",
"bio": "泰勒是加拿大哲学家，研究自我、政治与宗教。他批评原子式自由主义。他的《世俗时代》追溯了信仰如何变成一种可选之物。",
"ideas": [
"自我的诸源泉",
"承认的政治",
"世俗时代"
],
"books": [
["自我的诸源泉", 1989, "现代认同的形成。", "Sources of the Self"],
["世俗时代", 2007, "信仰作为一种选项。", "A Secular Age"]
],
"quote": "",
"start": "本真性的伦理（The Ethics of Authenticity）"
},
{
"id": "scruton",
"name": "罗杰·斯克鲁顿",
"nameEn": "Roger Scruton",
"era": "政治与保守主义",
"born": "1944年",
"birthplace": "布斯灵索普",
"died": "2020年",
"deathplace": "布林克沃思",
"nationality": "英国",
"schools": "保守主义、美学",
"wiki": "Roger Scruton",
"bio": "斯克鲁顿是美学家与重要的保守主义思想家。他写作关于美、音乐、建筑与家园。他支持铁幕后的异见知识分子。",
"ideas": [
"恋家情结（oikophilia）",
"美",
"保守主义传统"
],
"books": [
["保守主义的含义", 1980, "为保守主义辩护。", "The Meaning of Conservatism"],
["美", 2009, "简明导论。", "Beauty"]
],
"quote": "",
"start": "如何做一个保守主义者（How to Be a Conservative）"
},
{
"id": "fisher",
"name": "马克·费舍尔",
"nameEn": "Mark Fisher",
"era": "批判理论与战后",
"born": "1968年",
"birthplace": "莱斯特",
"died": "2017年",
"deathplace": "费利克斯托",
"nationality": "英国",
"schools": "文化理论",
"wiki": "Mark Fisher (theorist)",
"bio": "费舍尔是作家与教师，以 k-punk 为名写博客。他的《资本主义现实主义》主张，想象世界末日比想象资本主义终结更容易。他还写作音乐中的幽灵学。",
"ideas": [
"资本主义现实主义",
"幽灵学",
"心理健康政治"
],
"books": [
["资本主义现实主义", 2009, "别无替代方案可想。", "Capitalist Realism"],
["我生活的幽灵", 2014, "幽灵学。", "Ghosts of My Life"]
],
"quote": "",
"start": "资本主义现实主义（Capitalist Realism）"
},
{
"id": "dewey",
"name": "约翰·杜威",
"nameEn": "John Dewey",
"era": "分析哲学",
"born": "1859年",
"birthplace": "佛蒙特州伯灵顿",
"died": "1952年",
"deathplace": "纽约市",
"nationality": "美国",
"schools": "实用主义",
"wiki": "John Dewey",
"bio": "杜威是20世纪最重要的实用主义者，也是公共知识分子。他把思考视为在经验中解决问题的探究。他倡导进步教育与作为生活方式的民主。",
"ideas": [
"工具主义",
"在做中学",
"作为生活方式的民主",
"经验与自然"
],
"books": [
["民主与教育", 1916, "为民主而教育。", "Democracy and Education"],
["经验与自然", 1925, "实用主义形而上学。", "Experience and Nature"],
["艺术即经验", 1934, "经验的美学。", "Art as Experience"]
],
"quote": "",
"start": "经验与教育（Experience and Education）"
},
{
"id": "santayana",
"name": "乔治·桑塔亚那",
"nameEn": "George Santayana",
"era": "19世纪",
"born": "1863年",
"birthplace": "马德里",
"died": "1952年",
"deathplace": "罗马",
"nationality": "西班牙裔美国人",
"schools": "自然主义、批判实在论",
"wiki": "George Santayana",
"bio": "桑塔亚那在西班牙与波士顿长大，1912年前在哈佛任教。他把自然主义与对美和作为诗篇的宗教的热爱结合起来。晚年居于欧洲。",
"ideas": [
"自然主义",
"存在的诸领域",
"动物信仰"
],
"books": [
["理性的生活", 1905, "人类生活中的理性。", "The Life of Reason"],
["怀疑主义与动物信仰", 1923, "超越怀疑的信念。", "Scepticism and Animal Faith"]
],
"quote": "那些不能记住过去的人注定要重蹈覆辙。",
"start": "怀疑主义与动物信仰（Scepticism and Animal Faith）"
},
{
"id": "bergson",
"name": "亨利·柏格森",
"nameEn": "Henri Bergson",
"era": "现象学与存在主义",
"born": "1859年",
"birthplace": "巴黎",
"died": "1941年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "过程哲学、活力论",
"wiki": "Henri Bergson",
"bio": "柏格森是他那个时代最著名的法国哲学家，1927年获诺贝尔文学奖。他区分了亲历的绵延与空间化的钟表时间。他提出演化中的创造性生命冲力（élan vital）。",
"ideas": [
"绵延（durée）",
"直觉与理智",
"生命冲力",
"记忆"
],
"books": [
["时间与自由意志", 1889, "绵延与自由。", "Time and Free Will"],
["物质与记忆", 1896, "通过记忆理解心与身。", "Matter and Memory"],
["创造进化论", 1907, "生命冲力。", "Creative Evolution"]
],
"quote": "",
"start": "时间与自由意志（Time and Free Will）"
},
{
"id": "husserl",
"name": "埃德蒙德·胡塞尔",
"nameEn": "Edmund Husserl",
"era": "现象学与存在主义",
"born": "1859年",
"birthplace": "摩拉维亚的普罗斯尼茨",
"died": "1938年",
"deathplace": "弗莱堡",
"nationality": "德国（生于奥地利）",
"schools": "现象学",
"wiki": "Edmund Husserl",
"bio": "胡塞尔最初是数学家，后来成为现象学的创始人。他试图通过悬置关于世界的假定来描述意识的结构。他出身犹太家庭（后改宗路德派），在纳粹统治下被禁止进入大学。",
"ideas": [
"意向性",
"现象学还原（epoché）",
"生活世界",
"先验自我"
],
"books": [
["逻辑研究", 1900, "意向性；反对心理主义。", "Logical Investigations"],
["观念I", 1913, "现象学还原。", "Ideas I"],
["笛卡尔式的沉思", 1931, "先验自我。", "Cartesian Meditations"],
["欧洲科学的危机", 1936, "生活世界。", "The Crisis of European Sciences"]
],
"quote": "",
"start": "笛卡尔式的沉思（Cartesian Meditations）"
},
{
"id": "scheler",
"name": "马克斯·舍勒",
"nameEn": "Max Scheler",
"era": "现象学与存在主义",
"born": "1874年",
"birthplace": "慕尼黑",
"died": "1928年",
"deathplace": "法兰克福",
"nationality": "德国",
"schools": "现象学",
"wiki": "Max Scheler",
"bio": "舍勒把现象学应用于伦理学、价值与情感。他主张价值在感受中被给予，并有客观的等级秩序。他还创立了哲学人类学。",
"ideas": [
"质料价值伦理学",
"爱的秩序（ordo amoris）",
"哲学人类学"
],
"books": [
["伦理学中的形式主义与质料的价值伦理学", 1913, "反对康德式形式主义。", "Formalism in Ethics and Non-Formal Ethics of Values"]
],
"quote": "",
"start": "同情的本质（The Nature of Sympathy）"
},
{
"id": "heidegger",
"name": "马丁·海德格尔",
"nameEn": "Martin Heidegger",
"era": "现象学与存在主义",
"born": "1889年",
"birthplace": "梅斯基希",
"died": "1976年",
"deathplace": "弗莱堡",
"nationality": "德国",
"schools": "现象学、存在主义、解释学",
"wiki": "Martin Heidegger",
"bio": "海德格尔师从胡塞尔，并重新回到存在意义的问题。《存在与时间》把人的生存分析为此在：在世存在、操心与向死存在。他于1933年出任弗莱堡大学校长并加入纳粹党，此事至今备受争议。其后期思想转向语言、诗与技术。",
"ideas": [
"存在之问",
"此在与在世存在",
"本真性与向死存在",
"座架（Gestell）",
"存在的遗忘"
],
"books": [
["存在与时间", 1927, "此在、操心、向死存在。", "Being and Time"],
["形而上学是什么？", 1929, "无。", "What Is Metaphysics?"],
["形而上学导论", 1935, "为什么存在者存在而无反倒不存在？", "Introduction to Metaphysics"],
["技术的追问", 1954, "座架。", "The Question Concerning Technology"]
],
"quote": "",
"start": "基本著作选（Basic Writings，Krell 编），然后是《存在与时间》（Being and Time）"
},
{
"id": "jaspers",
"name": "卡尔·雅斯贝尔斯",
"nameEn": "Karl Jaspers",
"era": "现象学与存在主义",
"born": "1883年",
"birthplace": "奥尔登堡",
"died": "1969年",
"deathplace": "巴塞尔",
"nationality": "德裔瑞士人",
"schools": "存在主义",
"wiki": "Karl Jaspers",
"bio": "雅斯贝尔斯是由精神病学家转而成为哲学家的。他通过死亡、罪责与斗争等“临界境况”探讨生存。他指导过汉娜·阿伦特，并在战后写作德国罪责问题。",
"ideas": [
"临界境况",
"生存（Existenz）",
"轴心时代",
"德国罪责问题"
],
"books": [
["普通精神病理学", 1913, "精神病学的基础著作。", "General Psychopathology"],
["哲学", 1932, "论生存的三卷本。", "Philosophy"],
["历史的起源与目标", 1949, "轴心时代。", "The Origin and Goal of History"]
],
"quote": "",
"start": "智慧之路（Way to Wisdom）"
},
{
"id": "marcel",
"name": "加布里埃尔·马塞尔",
"nameEn": "Gabriel Marcel",
"era": "现象学与存在主义",
"born": "1889年",
"birthplace": "巴黎",
"died": "1973年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "基督教存在主义",
"wiki": "Gabriel Marcel",
"bio": "马塞尔是剧作家与天主教存在主义者。他区分了问题与奥秘。他强调希望、忠诚与在场。",
"ideas": [
"问题与奥秘",
"存在与占有",
"希望与忠诚"
],
"books": [
["存在与占有", 1935, "关于存在与占有的日记。", "Being and Having"]
],
"quote": "",
"start": "存在主义哲学（The Philosophy of Existentialism）"
},
{
"id": "berdyaev",
"name": "尼古拉·别尔嘉耶夫",
"nameEn": "Nikolai Berdyaev",
"era": "现象学与存在主义",
"born": "1874年",
"birthplace": "基辅",
"died": "1948年",
"deathplace": "克拉马尔",
"nationality": "俄国",
"schools": "基督教存在主义",
"wiki": "Nikolai Berdyaev",
"bio": "别尔嘉耶夫是俄国宗教哲学家，1922年被布尔什维克驱逐。在巴黎，他写作关于自由、创造与人格。他认为自由先于存在。",
"ideas": [
"自由的首要性",
"创造",
"人格主义"
],
"books": [
["创造行为的意义", 1916, "作为宗教的创造。", "The Meaning of the Creative Act"]
],
"quote": "",
"start": "奴役与自由（Slavery and Freedom）"
},
{
"id": "ortega",
"name": "何塞·奥尔特加·伊·加塞特",
"nameEn": "José Ortega y Gasset",
"era": "现象学与存在主义",
"born": "1883年",
"birthplace": "马德里",
"died": "1955年",
"deathplace": "马德里",
"nationality": "西班牙",
"schools": "生命理性主义",
"wiki": "José Ortega y Gasset",
"bio": "奥尔特加是西班牙最重要的哲学家，也是公共随笔作家。他主张“我是我自己与我的境况”。他的《大众的反叛》诊断了大众人的兴起。",
"ideas": [
"我是我自己与我的境况",
"生命理性",
"大众人"
],
"books": [
["对唐吉诃德的沉思", 1914, "我与我的境况。", "Meditations on Quixote"],
["大众的反叛", 1930, "大众社会。", "The Revolt of the Masses"]
],
"quote": "",
"start": "大众的反叛（The Revolt of the Masses）"
},
{
"id": "unamuno",
"name": "米格尔·德·乌纳穆诺",
"nameEn": "Miguel de Unamuno",
"era": "现象学与存在主义",
"born": "1864年",
"birthplace": "毕尔巴鄂",
"died": "1936年",
"deathplace": "萨拉曼卡",
"nationality": "西班牙",
"schools": "存在主义",
"wiki": "Miguel de Unamuno",
"bio": "乌纳穆诺是小说家、诗人，也是萨拉曼卡大学校长。他书写对不朽的渴望与理性的怀疑之间的冲突。1936年他公开对抗佛朗哥派军官。",
"ideas": [
"生命的悲剧意识",
"信仰与怀疑"
],
"books": [
["生命的悲剧意识", 1913, "理性与对不朽的渴望。", "The Tragic Sense of Life"]
],
"quote": "",
"start": "生命的悲剧意识（The Tragic Sense of Life）"
},
{
"id": "sartre",
"name": "让-保罗·萨特",
"nameEn": "Jean-Paul Sartre",
"era": "现象学与存在主义",
"born": "1905年",
"birthplace": "巴黎",
"died": "1980年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "存在主义、马克思主义",
"wiki": "Jean-Paul Sartre",
"bio": "萨特是法国存在主义的领袖人物，身兼小说家、剧作家与哲学家。他主张存在先于本质：人被判定为自由，并通过行动界定自身。他于1964年拒领诺贝尔文学奖，并转向马克思主义。",
"ideas": [
"存在先于本质",
"绝对自由",
"自欺",
"他者的注视"
],
"books": [
["恶心", 1938, "存在的偶然性。", "Nausea"],
["存在与虚无", 1943, "自欺与注视。", "Being and Nothingness"],
["存在主义是一种人道主义", 1946, "通俗演讲。", "Existentialism Is a Humanism"],
["辩证理性批判", 1960, "存在主义与马克思主义。", "Critique of Dialectical Reason"]
],
"quote": "他人即地狱。",
"start": "存在主义是一种人道主义（Existentialism Is a Humanism）"
},
{
"id": "beauvoir",
"name": "西蒙娜·德·波伏娃",
"nameEn": "Simone de Beauvoir",
"era": "现象学与存在主义",
"born": "1908年",
"birthplace": "巴黎",
"died": "1986年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "存在主义、女性主义",
"wiki": "Simone de Beauvoir",
"bio": "波伏娃是哲学家与小说家，也是萨特终身的伴侣。《第二性》主张女人是被造成他者的。它成为第二波女性主义的奠基文本。",
"ideas": [
"女人作为他者",
"女人不是天生的",
"模糊性的伦理"
],
"books": [
["模糊性的伦理", 1947, "存在主义伦理学。", "The Ethics of Ambiguity"],
["第二性", 1949, "女人作为他者。", "The Second Sex"]
],
"quote": "女人不是天生的，而是变成的。",
"start": "模糊性的伦理（The Ethics of Ambiguity）"
},
{
"id": "camus",
"name": "阿尔贝·加缪",
"nameEn": "Albert Camus",
"era": "现象学与存在主义",
"born": "1913年",
"birthplace": "阿尔及利亚的蒙多维",
"died": "1960年",
"deathplace": "维勒布勒万",
"nationality": "法国（生于阿尔及利亚）",
"schools": "荒诞主义",
"wiki": "Albert Camus",
"bio": "加缪是小说家、随笔作家与抵抗运动记者。他描述了荒诞：我们对意义的需求与沉默宇宙之间的冲突。他拒绝自杀与虚无主义，转而主张反抗，并于1957年获诺贝尔奖。",
"ideas": [
"荒诞",
"反抗",
"反对虚无主义与谋杀"
],
"books": [
["局外人", 1942, "关于漠然的小说。", "The Stranger"],
["西西弗神话", 1942, "荒诞。", "The Myth of Sisyphus"],
["鼠疫", 1947, "团结。", "The Plague"],
["反抗者", 1951, "反抗与革命之争。", "The Rebel"]
],
"quote": "必须想象西西弗是幸福的。",
"start": "西西弗神话（The Myth of Sisyphus）"
},
{
"id": "merleau",
"name": "莫里斯·梅洛-庞蒂",
"nameEn": "Maurice Merleau-Ponty",
"era": "现象学与存在主义",
"born": "1908年",
"birthplace": "罗什福尔",
"died": "1961年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "现象学",
"wiki": "Maurice Merleau-Ponty",
"bio": "梅洛-庞蒂曾任法兰西公学院教席。他把亲历的身体置于知觉的中心。他曾与萨特共同主编《现代》杂志，后与其决裂。",
"ideas": [
"具身知觉",
"身体主体",
"肉"
],
"books": [
["知觉现象学", 1945, "具身知觉。", "Phenomenology of Perception"],
["可见的与不可见的", 1964, "肉（遗著）。", "The Visible and the Invisible"]
],
"quote": "",
"start": "知觉的世界（The World of Perception）"
},
{
"id": "levinas",
"name": "伊曼纽尔·列维纳斯",
"nameEn": "Emmanuel Levinas",
"era": "现象学与存在主义",
"born": "1906年",
"birthplace": "考纳斯",
"died": "1995年",
"deathplace": "巴黎",
"nationality": "法国（生于立陶宛）",
"schools": "现象学、犹太哲学",
"wiki": "Emmanuel Levinas",
"bio": "列维纳斯曾师从胡塞尔与海德格尔。他的许多家人在大屠杀中遇难，他本人也曾是战俘。他主张伦理学——与他者的面对面——是第一哲学。",
"ideas": [
"伦理学作为第一哲学",
"他者的面容",
"无限责任"
],
"books": [
["总体与无限", 1961, "面对面。", "Totality and Infinity"],
["别于存在", 1974, "责任与替代。", "Otherwise than Being"]
],
"quote": "",
"start": "伦理与无限（Ethics and Infinity，访谈录）"
},
{
"id": "gadamer",
"name": "汉斯-格奥尔格·伽达默尔",
"nameEn": "Hans-Georg Gadamer",
"era": "现象学与存在主义",
"born": "1900年",
"birthplace": "马尔堡",
"died": "2002年",
"deathplace": "海德堡",
"nationality": "德国",
"schools": "解释学",
"wiki": "Hans-Georg Gadamer",
"bio": "伽达默尔师从海德格尔。他的《真理与方法》使解释学成为一般的理解哲学。他主张传统与成见使理解成为可能。",
"ideas": [
"视域融合",
"成见作为理解的条件",
"效果历史"
],
"books": [
["真理与方法", 1960, "哲学解释学。", "Truth and Method"]
],
"quote": "",
"start": "真理与方法（Truth and Method）第二部分"
},
{
"id": "ricoeur",
"name": "保罗·利科",
"nameEn": "Paul Ricœur",
"era": "现象学与存在主义",
"born": "1913年",
"birthplace": "瓦朗斯",
"died": "2005年",
"deathplace": "沙特奈马拉布里",
"nationality": "法国",
"schools": "解释学、现象学",
"wiki": "Paul Ricœur",
"bio": "利科融合了现象学与解释学。他写作论意志、象征、隐喻、叙事与记忆。他为马克思、尼采和弗洛伊德提出了“怀疑的解释学”。",
"ideas": [
"怀疑的解释学",
"叙事认同",
"隐喻"
],
"books": [
["弗洛伊德与哲学", 1965, "对欲望的解释。", "Freud and Philosophy"],
["时间与叙事", 1983, "叙事与时间。", "Time and Narrative"],
["作为他者的自身", 1990, "叙事认同。", "Oneself as Another"]
],
"quote": "",
"start": "《作为他者的自身》（Oneself as Another）"
},
{
"id": "weil",
"name": "西蒙娜·薇依",
"nameEn": "Simone Weil",
"era": "现象学与存在主义",
"born": "1909年",
"birthplace": "巴黎",
"died": "1943年",
"deathplace": "肯特郡阿什福德",
"nationality": "法国",
"schools": "基督教神秘主义",
"wiki": "Simone Weil",
"bio": "薇依是哲学家、劳工活动家和神秘主义者。她曾在工厂做工，并参加了西班牙内战。她随自由法国流亡英国时去世；其大部分著作在身后出版。",
"ideas": [
"注意",
"不幸",
"去创造（décreation）",
"根与义务"
],
"books": [
["重负与神恩", 1947, "笔记选编。", "Gravity and Grace"],
["根的需要", 1949, "义务与扎根。", "The Need for Roots"]
],
"quote": "",
"start": "《重负与神恩》（Gravity and Grace）"
},
{
"id": "bataille",
"name": "乔治·巴塔耶",
"nameEn": "Georges Bataille",
"era": "后结构主义",
"born": "1897年",
"birthplace": "比永",
"died": "1962年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "超现实主义（异见）",
"wiki": "Georges Bataille",
"bio": "巴塔耶是图书馆员和作家，写作论色情、献祭与过度。他认为社会形态取决于其如何耗费剩余能量。他影响了福柯、德里达和鲍德里亚。",
"ideas": [
"普遍经济与耗费",
"越界",
"主权"
],
"books": [
["内在经验", 1943, "没有上帝的神秘体验。", "Inner Experience"],
["被诅咒的部分", 1949, "普遍经济。", "The Accursed Share"],
["色情", 1957, "禁忌与越界。", "Erotism"]
],
"quote": "",
"start": "《被诅咒的部分》第一卷（The Accursed Share, Vol. 1）"
},
{
"id": "cioran",
"name": "埃米尔·齐奥朗",
"nameEn": "Emil Cioran",
"era": "现象学与存在主义",
"born": "1911年",
"birthplace": "勒希纳里",
"died": "1995年",
"deathplace": "巴黎",
"nationality": "罗马尼亚裔法国",
"schools": "悲观主义",
"wiki": "Emil Cioran",
"bio": "齐奥朗早年以罗马尼亚语写作，后定居巴黎，自1949年起用法语写作。他的格言表达悲观、失眠与清醒的绝望。他与青年时代的极右同情决裂。",
"ideas": [
"悲观主义",
"清醒",
"出生的麻烦"
],
"books": [
["解体简史", 1949, "第一部法语著作。", "A Short History of Decay"],
["出生的麻烦", 1973, "格言集。", "The Trouble with Being Born"]
],
"quote": "",
"start": "《出生的麻烦》（The Trouble with Being Born）"
},
{
"id": "girard",
"name": "勒内·吉拉尔",
"nameEn": "René Girard",
"era": "现象学与存在主义",
"born": "1923年",
"birthplace": "阿维尼翁",
"died": "2015年",
"deathplace": "斯坦福",
"nationality": "法国",
"schools": "模仿理论",
"wiki": "René Girard",
"bio": "吉拉尔曾在斯坦福和约翰霍普金斯任教。他认为欲望是模仿性的：我们欲求他人所欲求之物。竞争通过宗教与文化背后的替罪羊机制得以化解。",
"ideas": [
"模仿性欲望",
"替罪羊机制",
"受害者的启示"
],
"books": [
["谎言、欲望与小说", 1961, "模仿性欲望。", "Deceit, Desire, and the Novel"],
["暴力与神圣", 1972, "替罪羊机制。", "Violence and the Sacred"],
["世界创立以来所隐藏的事", 1978, "基督教与暴力。", "Things Hidden Since the Foundation of the World"]
],
"quote": "",
"start": "《我看见撒旦如闪电般坠落》（I See Satan Fall Like Lightning）"
},
{
"id": "schmitt",
"name": "卡尔·施米特",
"nameEn": "Carl Schmitt",
"era": "政治与保守主义",
"born": "1888年",
"birthplace": "普莱滕贝格",
"died": "1985年",
"deathplace": "普莱滕贝格",
"nationality": "德国",
"schools": "法学理论、政治神学",
"wiki": "Carl Schmitt",
"bio": "施米特是法学家和自由主义议会制的批评者。他把主权界定为对例外状态的决定，把政治界定为敌友区分。他于1933年加入纳粹党，这永久玷污了他的声誉。他的著作在左右两翼仍有影响。",
"ideas": [
"主权者决定例外状态",
"敌友区分",
"政治神学",
"诺莫斯"
],
"books": [
["政治神学", 1922, "主权与例外状态。", "Political Theology"],
["议会民主制的危机", 1923, "对自由主义议会制的批判。", "The Crisis of Parliamentary Democracy"],
["政治的概念", 1932, "朋友与敌人。", "The Concept of the Political"],
["大地的法", 1950, "国际法的空间秩序。", "The Nomos of the Earth"]
],
"quote": "主权者就是决定例外状态的人。",
"start": "《政治的概念》（The Concept of the Political）"
},
{
"id": "strauss",
"name": "列奥·施特劳斯",
"nameEn": "Leo Strauss",
"era": "政治与保守主义",
"born": "1899年",
"birthplace": "基希海因",
"died": "1973年",
"deathplace": "安纳波利斯",
"nationality": "德裔美国人",
"schools": "政治哲学",
"wiki": "Leo Strauss",
"bio": "施特劳斯1932年离开德国，在芝加哥大学任教数十年。他认为早期哲学家常以隐微方式写作以躲避迫害。他试图复兴古典政治哲学，以对抗现代历史主义与相对主义。",
"ideas": [
"隐微写作",
"古今之争",
"对历史主义的批判",
"雅典与耶路撒冷"
],
"books": [
["迫害与写作艺术", 1952, "字里行间的阅读。", "Persecution and the Art of Writing"],
["自然权利与历史", 1953, "反对历史主义。", "Natural Right and History"],
["关于马基雅维利的思考", 1958, "马基雅维利作为邪恶的教师。", "Thoughts on Machiavelli"],
["城邦与人", 1964, "亚里士多德、柏拉图、修昔底德。", "The City and Man"]
],
"quote": "",
"start": "《自然权利与历史》导论（Natural Right and History, Introduction）"
},
{
"id": "arendt",
"name": "汉娜·阿伦特",
"nameEn": "Hannah Arendt",
"era": "政治与保守主义",
"born": "1906年",
"birthplace": "汉诺威的林登",
"died": "1975年",
"deathplace": "纽约",
"nationality": "德裔美国人",
"schools": "政治理论",
"wiki": "Hannah Arendt",
"bio": "阿伦特曾师从海德格尔和雅斯贝尔斯，1933年逃离纳粹德国。她的《极权主义的起源》分析了纳粹主义与斯大林主义。在报道艾希曼审判时，她提出了“平庸之恶”。",
"ideas": [
"极权主义",
"劳动、工作与行动",
"诞生性",
"平庸之恶"
],
"books": [
["极权主义的起源", 1951, "反犹主义、帝国主义、极权主义。", "The Origins of Totalitarianism"],
["人的境况", 1958, "劳动、工作与行动。", "The Human Condition"],
["艾希曼在耶路撒冷", 1963, "平庸之恶。", "Eichmann in Jerusalem"],
["论革命", 1963, "美国革命与法国革命。", "On Revolution"]
],
"quote": "",
"start": "《人的境况》（The Human Condition）"
},
{
"id": "voegelin",
"name": "埃里克·沃格林",
"nameEn": "Eric Voegelin",
"era": "政治与保守主义",
"born": "1901年",
"birthplace": "科隆",
"died": "1985年",
"deathplace": "帕洛阿尔托",
"nationality": "德裔美国人",
"schools": "政治哲学",
"wiki": "Eric Voegelin",
"bio": "沃格林1938年逃离奥地利。他研究秩序的历史及其符号。他把现代群众运动描述为试图将末世内在化的灵知主义尝试。",
"ideas": [
"秩序与历史",
"现代灵知主义",
"末世的内在化"
],
"books": [
["政治的新科学", 1952, "现代性作为灵知主义。", "The New Science of Politics"],
["秩序与历史", 1956, "秩序的历史。", "Order and History"]
],
"quote": "",
"start": "《政治的新科学》（The New Science of Politics）"
},
{
"id": "kojeve",
"name": "亚历山大·科耶夫",
"nameEn": "Alexandre Kojève",
"era": "政治与保守主义",
"born": "1902年",
"birthplace": "莫斯科",
"died": "1968年",
"deathplace": "布鲁塞尔",
"nationality": "法国（生于俄国）",
"schools": "黑格尔主义",
"wiki": "Alexandre Kojève",
"bio": "科耶夫20世纪30年代在巴黎讲授黑格尔，听众包括拉康、巴塔耶、梅洛-庞蒂等人。他通过主奴辩证法及其终结来解读历史。战后他成为法国高级贸易官员。",
"ideas": [
"主奴辩证法",
"对承认的欲望",
"历史的终结"
],
"books": [
["黑格尔导读", 1947, "主奴辩证法与历史的终结。", "Introduction to the Reading of Hegel"]
],
"quote": "",
"start": "《黑格尔导读》（Introduction to the Reading of Hegel）"
},
{
"id": "junger",
"name": "恩斯特·容格尔",
"nameEn": "Ernst Jünger",
"era": "政治与保守主义",
"born": "1895年",
"birthplace": "海德堡",
"died": "1998年",
"deathplace": "里德林根",
"nationality": "德国",
"schools": "保守革命",
"wiki": "Ernst Jünger",
"bio": "容格尔是一战中获得勋章的军官，其战争回忆录使他成名。他描述了即将到来的总体动员与工人时代。他与纳粹保持距离，后来写作论内在自由。",
"ideas": [
"总体动员",
"工人",
"森林的逃遁者",
"无政府者"
],
"books": [
["钢铁风暴", 1920, "战争回忆录。", "Storm of Steel"],
["工人", 1932, "工人的类型。", "The Worker"],
["森林的通道", 1951, "内在抵抗。", "The Forest Passage"]
],
"quote": "",
"start": "《钢铁风暴》（Storm of Steel）"
},
{
"id": "guenon",
"name": "勒内·盖农",
"nameEn": "René Guénon",
"era": "政治与保守主义",
"born": "1886年",
"birthplace": "布卢瓦",
"died": "1951年",
"deathplace": "开罗",
"nationality": "法国（后入埃及籍）",
"schools": "传统主义",
"wiki": "René Guénon",
"bio": "盖农创立了传统主义学派。他认为一切宗教之下都有一个原初传统，而现代性意味着衰败。他皈依伊斯兰教并居于开罗。",
"ideas": [
"原初传统",
"现代性作为衰败",
"形而上学高于科学"
],
"books": [
["现代世界的危机", 1927, "现代性作为衰败。", "The Crisis of the Modern World"],
["数量至上与时代的征兆", 1945, "数量压倒质量。", "The Reign of Quantity and the Signs of the Times"]
],
"quote": "",
"start": "《现代世界的危机》（The Crisis of the Modern World）"
},
{
"id": "evola",
"name": "尤利乌斯·埃沃拉",
"nameEn": "Julius Evola",
"era": "政治与保守主义",
"born": "1898年",
"birthplace": "罗马",
"died": "1974年",
"deathplace": "罗马",
"nationality": "意大利",
"schools": "传统主义",
"wiki": "Julius Evola",
"bio": "埃沃拉是一位秘传主义者和传统主义作家。他对现代性的批判与种族和极右政治相关联。他在极右翼中仍有影响且备受争议。",
"ideas": [
"反抗现代性",
"传统等级制",
"秘传主义"
],
"books": [
["反抗现代世界", 1934, "传统与现代性。", "Revolt Against the Modern World"],
["骑虎", 1961, "在解体时代中生存。", "Ride the Tiger"]
],
"quote": "",
"start": "《反抗现代世界》（Revolt Against the Modern World，批判性地阅读）"
},
{
"id": "dugin",
"name": "亚历山大·杜金",
"nameEn": "Aleksandr Dugin",
"era": "政治与保守主义",
"born": "1962年",
"birthplace": "莫斯科",
"died": "—",
"deathplace": "—",
"nationality": "俄罗斯",
"schools": "新欧亚主义",
"wiki": "Aleksandr Dugin",
"bio": "杜金是一位有争议的俄罗斯欧亚主义理论家。他借助海德格尔、施米特和传统主义来反对自由主义。其政治影响力仍有争议。",
"ideas": [
"第四政治理论",
"欧亚主义",
"反自由主义"
],
"books": [
["第四政治理论", 2009, "超越自由主义、共产主义与法西斯主义。", "The Fourth Political Theory"]
],
"quote": "",
"start": "《第四政治理论》（The Fourth Political Theory，批判性地阅读）"
},
{
"id": "berlin",
"name": "以赛亚·伯林",
"nameEn": "Isaiah Berlin",
"era": "政治与保守主义",
"born": "1909年",
"birthplace": "里加",
"died": "1997年",
"deathplace": "牛津",
"nationality": "英国（生于拉脱维亚）",
"schools": "自由主义、观念史",
"wiki": "Isaiah Berlin",
"bio": "伯林是牛津的观念史家。他区分了消极自由与积极自由。他捍卫价值多元论。",
"ideas": [
"两种自由概念",
"价值多元论",
"反启蒙"
],
"books": [
["两种自由概念", 1958, "消极自由与积极自由。", "Two Concepts of Liberty"],
["刺猬与狐狸", 1953, "两种思想家。", "The Hedgehog and the Fox"]
],
"quote": "",
"start": "《两种自由概念》（Two Concepts of Liberty）"
},
{
"id": "hayek",
"name": "弗里德里希·哈耶克",
"nameEn": "Friedrich Hayek",
"era": "政治与保守主义",
"born": "1899年",
"birthplace": "维也纳",
"died": "1992年",
"deathplace": "弗赖堡",
"nationality": "奥地利裔英国",
"schools": "古典自由主义",
"wiki": "Friedrich Hayek",
"bio": "哈耶克是奥地利学派经济学家，1974年获诺贝尔奖。他认为中央计划无法利用分散的知识。他捍卫自发秩序与法治。",
"ideas": [
"知识问题",
"自发秩序",
"法治"
],
"books": [
["通往奴役之路", 1944, "计划导致暴政。", "The Road to Serfdom"],
["知识在社会中的运用", 1945, "价格作为信息。", "The Use of Knowledge in Society"],
["自由宪章", 1960, "自由与法律。", "The Constitution of Liberty"]
],
"quote": "",
"start": "《知识在社会中的运用》（The Use of Knowledge in Society）"
},
{
"id": "oakeshott",
"name": "迈克尔·奥克肖特",
"nameEn": "Michael Oakeshott",
"era": "政治与保守主义",
"born": "1901年",
"birthplace": "切尔姆斯菲尔德",
"died": "1990年",
"deathplace": "多塞特郡阿克顿",
"nationality": "英国",
"schools": "保守主义",
"wiki": "Michael Oakeshott",
"bio": "奥克肖特曾在伦敦政治经济学院任教。他批判政治中的理性主义，捍卫实践知识与公民联合。",
"ideas": [
"政治中的理性主义",
"保守气质",
"公民联合"
],
"books": [
["政治中的理性主义", 1962, "反对政治理性主义。", "Rationalism in Politics"],
["论人类行为", 1975, "公民联合。", "On Human Conduct"]
],
"quote": "",
"start": "《论保守》（On Being Conservative）"
},
{
"id": "benjamin",
"name": "瓦尔特·本雅明",
"nameEn": "Walter Benjamin",
"era": "批判理论与战后",
"born": "1892年",
"birthplace": "柏林",
"died": "1940年",
"deathplace": "波尔沃港",
"nationality": "德国",
"schools": "法兰克福学派（关联成员）",
"wiki": "Walter Benjamin",
"bio": "本雅明是与法兰克福学派有关联的批评家与随笔作家。他写作论艺术、历史、翻译和巴黎拱廊街。为逃避纳粹，他于1940年死于西班牙边境。",
"ideas": [
"灵晕",
"历史天使",
"机械复制"
],
"books": [
["译者的任务", 1923, "翻译与纯粹语言。", "The Task of the Translator"],
["机械复制时代的艺术作品", 1935, "灵晕的丧失。", "The Work of Art in the Age of Mechanical Reproduction"],
["历史哲学论纲", 1940, "历史天使。", "Theses on the Philosophy of History"]
],
"quote": "",
"start": "《启迪》（Illuminations，阿伦特编）"
},
{
"id": "horkheimer",
"name": "马克斯·霍克海默",
"nameEn": "Max Horkheimer",
"era": "批判理论与战后",
"born": "1895年",
"birthplace": "斯图加特",
"died": "1973年",
"deathplace": "纽伦堡",
"nationality": "德国",
"schools": "法兰克福学派",
"wiki": "Max Horkheimer",
"bio": "霍克海默主持社会研究所。他界定批判理论以区别于传统理论。他与阿多诺合写了《启蒙辩证法》。",
"ideas": [
"批判理论与传统理论",
"工具理性"
],
"books": [
["传统理论与批判理论", 1937, "批判理论的纲领。", "Traditional and Critical Theory"],
["理性的消蚀", 1947, "工具理性。", "Eclipse of Reason"]
],
"quote": "",
"start": "《传统理论与批判理论》（Traditional and Critical Theory）"
},
{
"id": "adorno",
"name": "特奥多尔·阿多诺",
"nameEn": "Theodor Adorno",
"era": "批判理论与战后",
"born": "1903年",
"birthplace": "法兰克福",
"died": "1969年",
"deathplace": "菲斯普",
"nationality": "德国",
"schools": "法兰克福学派",
"wiki": "Theodor W. Adorno",
"bio": "阿多诺是哲学家、社会学家和音乐学家。流亡期间，他与霍克海默论证启蒙理性转变为支配。他批判文化工业。",
"ideas": [
"文化工业",
"启蒙辩证法",
"否定的辩证法"
],
"books": [
["启蒙辩证法", 1944, "与霍克海默合著。", "Dialectic of Enlightenment"],
["最小限度的道德", 1951, "来自受损生活的反思。", "Minima Moralia"],
["否定的辩证法", 1966, "非同一性。", "Negative Dialectics"]
],
"quote": "",
"start": "《最小限度的道德》（Minima Moralia）"
},
{
"id": "marcuse",
"name": "赫伯特·马尔库塞",
"nameEn": "Herbert Marcuse",
"era": "批判理论与战后",
"born": "1898年",
"birthplace": "柏林",
"died": "1979年",
"deathplace": "施塔恩贝格",
"nationality": "德裔美国人",
"schools": "法兰克福学派",
"wiki": "Herbert Marcuse",
"bio": "马尔库塞在加入法兰克福学派之前曾师从海德格尔。在美国，他成为新左派的英雄。他认为发达资本主义产生单向度的思想。",
"ideas": [
"单向度社会",
"压抑性去升华",
"大拒绝"
],
"books": [
["爱欲与文明", 1955, "弗洛伊德与解放。", "Eros and Civilization"],
["单向度的人", 1964, "发达工业社会。", "One-Dimensional Man"]
],
"quote": "",
"start": "《单向度的人》（One-Dimensional Man）"
},
{
"id": "habermas",
"name": "尤尔根·哈贝马斯",
"nameEn": "Jürgen Habermas",
"era": "批判理论与战后",
"born": "1929年",
"birthplace": "杜塞尔多夫",
"died": "—",
"deathplace": "—",
"nationality": "德国",
"schools": "法兰克福学派",
"wiki": "Jürgen Habermas",
"bio": "哈贝马斯是法兰克福学派最主要的继承者。他把批判奠基于旨在相互理解的交往理性之上。他捍卫现代性与审议民主。",
"ideas": [
"交往行为",
"公共领域",
"话语伦理",
"生活世界与系统"
],
"books": [
["公共领域的结构转型", 1962, "公共领域的兴起。", "The Structural Transformation of the Public Sphere"],
["交往行为理论", 1981, "生活世界与系统。", "The Theory of Communicative Action"],
["现代性的哲学话语", 1985, "对后现代主义的批判。", "The Philosophical Discourse of Modernity"]
],
"quote": "",
"start": "《公共领域的结构转型》（The Structural Transformation of the Public Sphere）"
},
{
"id": "gramsci",
"name": "安东尼奥·葛兰西",
"nameEn": "Antonio Gramsci",
"era": "批判理论与战后",
"born": "1891年",
"birthplace": "撒丁岛阿莱斯",
"died": "1937年",
"deathplace": "罗马",
"nationality": "意大利",
"schools": "马克思主义",
"wiki": "Antonio Gramsci",
"bio": "葛兰西共同创立了意大利共产党，被墨索里尼监禁。在狱中笔记里，他发展了文化霸权概念。他在获释后不久去世。",
"ideas": [
"文化霸权",
"有机知识分子",
"阵地战"
],
"books": [
["狱中札记", 1935, "霸权与知识分子。", "Prison Notebooks"]
],
"quote": "",
"start": "《狱中札记选》（Selections from the Prison Notebooks）"
},
{
"id": "lukacs",
"name": "格奥尔格·卢卡奇",
"nameEn": "György Lukács",
"era": "批判理论与战后",
"born": "1885年",
"birthplace": "布达佩斯",
"died": "1971年",
"deathplace": "布达佩斯",
"nationality": "匈牙利",
"schools": "西方马克思主义",
"wiki": "György Lukács",
"bio": "卢卡奇以《历史与阶级意识》开创了西方马克思主义。他把物化发展为核心概念。他后来写作论文学中的现实主义。",
"ideas": [
"物化",
"阶级意识",
"总体性"
],
"books": [
["历史与阶级意识", 1923, "物化。", "History and Class Consciousness"]
],
"quote": "",
"start": "《历史与阶级意识》中的“物化”一文（History and Class Consciousness, \"Reification\" essay）"
},
{
"id": "freud",
"name": "西格蒙德·弗洛伊德",
"nameEn": "Sigmund Freud",
"era": "批判理论与战后",
"born": "1856年",
"birthplace": "摩拉维亚的弗赖贝格",
"died": "1939年",
"deathplace": "伦敦",
"nationality": "奥地利",
"schools": "精神分析",
"wiki": "Sigmund Freud",
"bio": "弗洛伊德在维也纳创立了精神分析。他认为无意识欲望塑造心灵与文化。他于1938年逃离纳粹，卒于伦敦。",
"ideas": [
"无意识",
"本我、自我、超我",
"驱力",
"文明与压抑"
],
"books": [
["梦的解析", 1899, "梦作为愿望的满足。", "The Interpretation of Dreams"],
["超越快乐原则", 1920, "死亡驱力。", "Beyond the Pleasure Principle"],
["文明及其不满", 1930, "文明与压抑。", "Civilization and Its Discontents"]
],
"quote": "",
"start": "《文明及其不满》（Civilization and Its Discontents）"
},
{
"id": "lacan",
"name": "雅克·拉康",
"nameEn": "Jacques Lacan",
"era": "后结构主义",
"born": "1901年",
"birthplace": "巴黎",
"died": "1981年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "精神分析、结构主义",
"wiki": "Jacques Lacan",
"bio": "拉康以结构语言学重读弗洛伊德。他认为无意识像语言一样被结构。他的研讨班影响了阿尔都塞、齐泽克和文学理论。",
"ideas": [
"镜像阶段",
"无意识像语言一样被结构",
"实在界、象征界、想象界"
],
"books": [
["文集", 1966, "论文汇编。", "Écrits"]
],
"quote": "",
"start": "布鲁斯·芬克《拉康精神分析临床导论》（Bruce Fink, A Clinical Introduction to Lacanian Psychoanalysis）"
},
{
"id": "levistrauss",
"name": "克洛德·列维-斯特劳斯",
"nameEn": "Claude Lévi-Strauss",
"era": "后结构主义",
"born": "1908年",
"birthplace": "布鲁塞尔",
"died": "2009年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "结构主义",
"wiki": "Claude Lévi-Strauss",
"bio": "列维-斯特劳斯创立了结构人类学。他把亲属关系与神话分析为二元对立的系统。他批评萨特的历史主义。",
"ideas": [
"结构人类学",
"二元对立",
"野性的思维"
],
"books": [
["忧郁的热带", 1955, "旅行回忆录。", "Tristes Tropiques"],
["野性的思维", 1962, "具体科学。", "The Savage Mind"]
],
"quote": "",
"start": "《忧郁的热带》（Tristes Tropiques）"
},
{
"id": "althusser",
"name": "路易·阿尔都塞",
"nameEn": "Louis Althusser",
"era": "后结构主义",
"born": "1918年",
"birthplace": "阿尔及利亚的比尔曼德赖斯",
"died": "1990年",
"deathplace": "拉韦里耶尔",
"nationality": "法国",
"schools": "结构马克思主义",
"wiki": "Louis Althusser",
"bio": "阿尔都塞在巴黎高等师范学院任教。他以结构方式反人道主义地解读马克思。1980年他杀死妻子，被判定不适合受审。",
"ideas": [
"意识形态国家机器",
"询唤",
"认识论断裂"
],
"books": [
["保卫马克思", 1965, "反人道主义的马克思。", "For Marx"],
["意识形态与意识形态国家机器", 1970, "询唤。", "Ideology and Ideological State Apparatuses"]
],
"quote": "",
"start": "《意识形态与意识形态国家机器》（Ideology and Ideological State Apparatuses）"
},
{
"id": "foucault",
"name": "米歇尔·福柯",
"nameEn": "Michel Foucault",
"era": "后结构主义",
"born": "1926年",
"birthplace": "普瓦捷",
"died": "1984年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "后结构主义",
"wiki": "Michel Foucault",
"bio": "福柯在法兰西学院拥有教席。他写作疯狂、医学、监狱与性的历史。他表明权力与知识如何生产主体。他死于艾滋病相关疾病。",
"ideas": [
"权力/知识",
"规训与全景敞视监狱",
"生命权力",
"谱系学"
],
"books": [
["疯狂与文明", 1961, "理性与非理性。", "Madness and Civilization"],
["词与物", 1966, "知识型。", "The Order of Things"],
["规训与惩罚", 1975, "全景敞视监狱。", "Discipline and Punish"],
["性史第一卷", 1976, "生命权力。", "The History of Sexuality, Vol. 1"]
],
"quote": "",
"start": "《规训与惩罚》（Discipline and Punish）"
},
{
"id": "deleuze",
"name": "吉尔·德勒兹",
"nameEn": "Gilles Deleuze",
"era": "后结构主义",
"born": "1925年",
"birthplace": "巴黎",
"died": "1995年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "后结构主义",
"wiki": "Gilles Deleuze",
"bio": "德勒兹写作了关于休谟、尼采、柏格森和斯宾诺莎的研究。他建立了差异与生成的哲学。他与费利克斯·瓜塔里合写了《反俄狄浦斯》和《千高原》。",
"ideas": [
"差异本身",
"根茎",
"欲望机器",
"生成",
"内在性平面"
],
"books": [
["尼采与哲学", 1962, "主动力与反动力。", "Nietzsche and Philosophy"],
["差异与重复", 1968, "差异本身。", "Difference and Repetition"],
["反俄狄浦斯", 1972, "与瓜塔里合著；欲望机器。", "Anti-Oedipus"],
["千高原", 1980, "与瓜塔里合著；根茎。", "A Thousand Plateaus"]
],
"quote": "",
"start": "《尼采与哲学》（Nietzsche and Philosophy）"
},
{
"id": "guattari",
"name": "费利克斯·加塔利",
"nameEn": "Félix Guattari",
"era": "后结构主义",
"born": "1930年",
"birthplace": "维勒讷沃-莱萨布隆",
"died": "1992年",
"deathplace": "库尔-舍韦尔尼",
"nationality": "法国",
"schools": "后结构主义",
"wiki": "Félix Guattari",
"bio": "加塔利是拉博德诊所的精神分析学家和政治活动家。他与德勒兹合著了《反俄狄浦斯》和《千高原》。他提出了分裂分析。",
"ideas": [
"分裂分析",
"生态哲学"
],
"books": [
["三重生态", 1989, "精神、社会与环境三重生态。", "The Three Ecologies"]
],
"quote": "",
"start": "《三重生态》（The Three Ecologies）"
},
{
"id": "derrida",
"name": "雅克·德里达",
"nameEn": "Jacques Derrida",
"era": "后结构主义",
"born": "1930年",
"birthplace": "阿尔及利亚的埃尔比亚尔",
"died": "2004年",
"deathplace": "巴黎",
"nationality": "法国（生于阿尔及利亚）",
"schools": "解构主义",
"wiki": "Jacques Derrida",
"bio": "德里达创立了解构。他表明文本依赖于自身无法固定的二元对立。他论述书写、正义、好客与马克思。",
"ideas": [
"解构",
"延异",
"对逻各斯中心主义的批判",
"幽灵学"
],
"books": [
["论文字学", 1967, "对逻各斯中心主义的批判。", "Of Grammatology"],
["书写与差异", 1967, "论文集。", "Writing and Difference"],
["马克思的幽灵", 1993, "幽灵学。", "Specters of Marx"]
],
"quote": "",
"start": "《立场》（Positions，访谈集）"
},
{
"id": "lyotard",
"name": "让-弗朗索瓦·利奥塔",
"nameEn": "Jean-François Lyotard",
"era": "后结构主义",
"born": "1924年",
"birthplace": "凡尔赛",
"died": "1998年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "后现代主义",
"wiki": "Jean-François Lyotard",
"bio": "利奥塔将后现代定义为对元叙事的怀疑。他还论述了崇高与歧异。",
"ideas": [
"对元叙事的怀疑",
"歧异"
],
"books": [
["后现代状况", 1979, "关于知识的报告。", "The Postmodern Condition"],
["歧异", 1983, "无法解决的争端。", "The Differend"]
],
"quote": "",
"start": "《后现代状况》（The Postmodern Condition）"
},
{
"id": "baudrillard",
"name": "让·鲍德里亚",
"nameEn": "Jean Baudrillard",
"era": "后结构主义",
"born": "1929年",
"birthplace": "兰斯",
"died": "2007年",
"deathplace": "巴黎",
"nationality": "法国",
"schools": "后现代主义",
"wiki": "Jean Baudrillard",
"bio": "鲍德里亚是研究消费社会的社会学家。他主张符号已以拟像取代了现实。他的惊人之论包括“海湾战争并未发生”。",
"ideas": [
"拟像",
"超真实",
"消费社会"
],
"books": [
["物体系", 1968, "消费物品。", "The System of Objects"],
["拟像与仿真", 1981, "超真实。", "Simulacra and Simulation"]
],
"quote": "",
"start": "《拟像与仿真》（Simulacra and Simulation）"
},
{
"id": "badiou",
"name": "阿兰·巴迪欧",
"nameEn": "Alain Badiou",
"era": "后结构主义",
"born": "1937年",
"birthplace": "拉巴特",
"died": "—",
"deathplace": "—",
"nationality": "法国",
"schools": "马克思主义、本体论",
"wiki": "Alain Badiou",
"bio": "巴迪欧将本体论等同于集合论。他把真理定义为对政治、科学、艺术与爱中事件的忠诚。他仍是一位受毛主义影响的坚定斗士。",
"ideas": [
"存在与事件",
"忠诚",
"数学作为本体论"
],
"books": [
["存在与事件", 1988, "集合论作为本体论。", "Being and Event"],
["伦理学", 1993, "真理的伦理学。", "Ethics"]
],
"quote": "",
"start": "《伦理学：论对恶的理解》（Ethics: An Essay on the Understanding of Evil）"
},
{
"id": "agamben",
"name": "吉奥乔·阿甘本",
"nameEn": "Giorgio Agamben",
"era": "后结构主义",
"born": "1942年",
"birthplace": "罗马",
"died": "—",
"deathplace": "—",
"nationality": "意大利",
"schools": "欧陆哲学",
"wiki": "Giorgio Agamben",
"bio": "阿甘本综合了海德格尔、本雅明、施米特和福柯。他研究主权与赤裸生命。他主张例外状态已成为常态。",
"ideas": [
"神圣人",
"赤裸生命",
"例外状态"
],
"books": [
["神圣人", 1995, "主权权力与赤裸生命。", "Homo Sacer"],
["例外状态", 2003, "例外成为常态。", "State of Exception"]
],
"quote": "",
"start": "《神圣人》（Homo Sacer）"
},
{
"id": "sloterdijk",
"name": "彼得·斯洛特戴克",
"nameEn": "Peter Sloterdijk",
"era": "后结构主义",
"born": "1947年",
"birthplace": "卡尔斯鲁厄",
"died": "—",
"deathplace": "—",
"nationality": "德国",
"schools": "欧陆哲学",
"wiki": "Peter Sloterdijk",
"bio": "斯洛特戴克是德国哲学家和文化理论家。他因《犬儒理性批判》而成名。他的“球体”三部曲研究人类的空间。",
"ideas": [
"犬儒理性",
"球体",
"人类技术学"
],
"books": [
["犬儒理性批判", 1983, "启蒙的虚假意识。", "Critique of Cynical Reason"],
["球体", 1998, "论空间的三部曲。", "Spheres"]
],
"quote": "",
"start": "《犬儒理性批判》（Critique of Cynical Reason）"
},
{
"id": "land",
"name": "尼克·兰德",
"nameEn": "Nick Land",
"era": "后结构主义",
"born": "1962年",
"birthplace": "巴斯",
"died": "—",
"deathplace": "—",
"nationality": "英国",
"schools": "加速主义",
"wiki": "Nick Land",
"bio": "兰德曾在华威大学任教，并参与创立 CCRU。他的写作将德勒兹、巴塔耶与网络文化融合为加速主义。他后来移居上海，并转向新反动右翼。",
"ideas": [
"加速主义",
"资本作为人工智能"
],
"books": [
["獠牙本体", 2011, "1987—2007年文集。", "Fanged Noumena"]
],
"quote": "",
"start": "《獠牙本体》（Fanged Noumena，批判性地阅读）"
},
{
"id": "zizek",
"name": "斯拉沃热·齐泽克",
"nameEn": "Slavoj Žižek",
"era": "后结构主义",
"born": "1949年",
"birthplace": "卢布尔雅那",
"died": "—",
"deathplace": "—",
"nationality": "斯洛文尼亚",
"schools": "拉康式马克思主义",
"wiki": "Slavoj Žižek",
"bio": "齐泽克将黑格尔、拉康与马克思结合起来批判意识形态。他就政治与流行文化大量写作。",
"ideas": [
"作为幻想的意识形态",
"通过拉康解读黑格尔"
],
"books": [
["意识形态的崇高客体", 1989, "意识形态与实在界。", "The Sublime Object of Ideology"],
["少于无", 2012, "黑格尔与辩证唯物主义。", "Less Than Nothing"]
],
"quote": "",
"start": "《意识形态的崇高客体》（The Sublime Object of Ideology）"
},
{
"id": "butler",
"name": "朱迪斯·巴特勒",
"nameEn": "Judith Butler",
"era": "后结构主义",
"born": "1956年",
"birthplace": "克利夫兰",
"died": "—",
"deathplace": "—",
"nationality": "美国",
"schools": "后结构主义、女性主义",
"wiki": "Judith Butler",
"bio": "巴特勒在伯克利任教。其《性别麻烦》主张性别是操演性的。其写作还涉及脆弱性与伦理。",
"ideas": [
"性别操演性",
"脆弱性"
],
"books": [
["性别麻烦", 1990, "性别作为操演。", "Gender Trouble"]
],
"quote": "",
"start": "《性别麻烦》（Gender Trouble）第一章"
},
{
"id": "fanon",
"name": "弗朗茨·法农",
"nameEn": "Frantz Fanon",
"era": "批判理论与战后",
"born": "1925年",
"birthplace": "马提尼克的法兰西堡",
"died": "1961年",
"deathplace": "马里兰州的贝塞斯达",
"nationality": "法国（马提尼克）",
"schools": "后殖民主义",
"wiki": "Frantz Fanon",
"bio": "法农是一名曾在阿尔及利亚工作的精神科医生，并加入了独立斗争。他分析了殖民主义与种族主义的心理。他36岁时死于白血病。",
"ideas": [
"殖民主义心理学",
"去殖民化",
"黑皮肤，白面具"
],
"books": [
["黑皮肤，白面具", 1952, "种族主义与身份。", "Black Skin, White Masks"],
["大地上的受苦者", 1961, "去殖民化。", "The Wretched of the Earth"]
],
"quote": "",
"start": "《黑皮肤，白面具》（Black Skin, White Masks）"
},
{
"id": "dubois",
"name": "杜波依斯",
"nameEn": "W. E. B. Du Bois",
"era": "19世纪",
"born": "1868年",
"birthplace": "马萨诸塞州的大巴灵顿",
"died": "1963年",
"deathplace": "阿克拉",
"nationality": "美国（后入加纳籍）",
"schools": "实用主义、泛非主义",
"wiki": "W. E. B. Du Bois",
"bio": "杜波依斯是第一位获得哈佛大学博士学位的非裔美国人。他参与创立了全国有色人种协进会。他描述了双重意识与肤色界线。",
"ideas": [
"双重意识",
"肤色界线",
"泛非主义"
],
"books": [
["黑人的灵魂", 1903, "双重意识。", "The Souls of Black Folk"],
["美国黑人重建", 1935, "重建时期的历史。", "Black Reconstruction in America"]
],
"quote": "20世纪的问题是肤色界线的问题。",
"start": "《黑人的灵魂》（The Souls of Black Folk）"
},
{
"id": "douglass",
"name": "弗雷德里克·道格拉斯",
"nameEn": "Frederick Douglass",
"era": "19世纪",
"born": "约1818年",
"birthplace": "马里兰州的塔尔博特县",
"died": "1895年",
"deathplace": "华盛顿特区",
"nationality": "美国",
"schools": "废奴主义",
"wiki": "Frederick Douglass",
"bio": "道格拉斯于1838年逃离奴隶制，成为杰出的废奴主义演说家。他的自传是美国文学的经典。他主张宪法可被解读为反奴隶制的。",
"ideas": [
"废奴主义",
"自我造就",
"自然权利"
],
"books": [
["弗雷德里克·道格拉斯生平叙事", 1845, "自传。", "Narrative of the Life of Frederick Douglass"]
],
"quote": "",
"start": "《弗雷德里克·道格拉斯生平叙事》（Narrative of the Life of Frederick Douglass）"
},
{
"id": "wiredu",
"name": "夸西·维雷杜",
"nameEn": "Kwasi Wiredu",
"era": "批判理论与战后",
"born": "1931年",
"birthplace": "库马西",
"died": "2022年",
"deathplace": "不详",
"nationality": "加纳",
"schools": "非洲哲学",
"wiki": "Kwasi Wiredu",
"bio": "维雷杜是在牛津师从赖尔的著名非洲哲学家。他呼吁“概念去殖民化”。他研究阿肯人的思想。",
"ideas": [
"概念去殖民化",
"共识民主"
],
"books": [
["哲学与一种非洲文化", 1980, "批判性地探讨非洲哲学。", "Philosophy and an African Culture"]
],
"quote": "",
"start": "《哲学与一种非洲文化》（Philosophy and an African Culture）"
},
{
"id": "senghor",
"name": "利奥波德·塞达尔·桑戈尔",
"nameEn": "Léopold Sédar Senghor",
"era": "批判理论与战后",
"born": "1906年",
"birthplace": "若阿勒",
"died": "2001年",
"deathplace": "韦尔松",
"nationality": "塞内加尔",
"schools": "黑人性",
"wiki": "Léopold Sédar Senghor",
"bio": "桑戈尔是一位诗人，也是塞内加尔首任总统。他与塞泽尔共同发展了黑人性。他当选为法兰西学术院院士。",
"ideas": [
"黑人性",
"非洲社会主义"
],
"books": [
["自由一", 1964, "论文集。", "Liberté I"]
],
"quote": "",
"start": "《自由一》（Liberté I）"
},
{
"id": "cesaire",
"name": "艾梅·塞泽尔",
"nameEn": "Aimé Césaire",
"era": "批判理论与战后",
"born": "1913年",
"birthplace": "马提尼克的巴斯潘特",
"died": "2008年",
"deathplace": "法兰西堡",
"nationality": "法国（马提尼克）",
"schools": "黑人性",
"wiki": "Aimé Césaire",
"bio": "塞泽尔是诗人和政治家。他共同创立了黑人性。他的《论殖民主义》谴责欧洲殖民主义。他曾教过法农。",
"ideas": [
"黑人性",
"对殖民主义的批判"
],
"books": [
["论殖民主义", 1950, "对殖民主义的控诉。", "Discourse on Colonialism"]
],
"quote": "",
"start": "《论殖民主义》（Discourse on Colonialism）"
},
{
"id": "dussel",
"name": "恩里克·杜塞尔",
"nameEn": "Enrique Dussel",
"era": "批判理论与战后",
"born": "1934年",
"birthplace": "门多萨",
"died": "2023年",
"deathplace": "墨西哥城",
"nationality": "阿根廷裔墨西哥人",
"schools": "解放哲学",
"wiki": "Enrique Dussel",
"bio": "杜塞尔是解放哲学的创始人之一。他借鉴了列维纳斯和马克思。他从被排斥者的立场写作。",
"ideas": [
"解放哲学",
"跨现代性"
],
"books": [
["解放哲学", 1977, "从边缘出发。", "Philosophy of Liberation"]
],
"quote": "",
"start": "《解放哲学》（Philosophy of Liberation）"
},
{
"id": "freire",
"name": "保罗·弗莱雷",
"nameEn": "Paulo Freire",
"era": "批判理论与战后",
"born": "1921年",
"birthplace": "累西腓",
"died": "1997年",
"deathplace": "圣保罗",
"nationality": "巴西",
"schools": "批判教育学",
"wiki": "Paulo Freire",
"bio": "弗莱雷是一位教育家，曾教巴西农民识字。他批判教育的“储蓄”模式。1964年政变后他遭到流放。",
"ideas": [
"批判教育学",
"意识化",
"反对储蓄式教育"
],
"books": [
["被压迫者教育学", 1968, "教育作为解放。", "Pedagogy of the Oppressed"]
],
"quote": "",
"start": "《被压迫者教育学》（Pedagogy of the Oppressed）"
},
{
"id": "vasconcelos",
"name": "何塞·巴斯孔塞洛斯",
"nameEn": "José Vasconcelos",
"era": "现象学与存在主义",
"born": "1882年",
"birthplace": "瓦哈卡",
"died": "1959年",
"deathplace": "墨西哥城",
"nationality": "墨西哥",
"schools": "拉丁美洲哲学",
"wiki": "José Vasconcelos",
"bio": "巴斯孔塞洛斯曾任墨西哥教育部长，也是一位哲学家。他推动公共教育与壁画运动。他提出了“宇宙种族”。",
"ideas": [
"宇宙种族",
"审美一元论"
],
"books": [
["宇宙种族", 1925, "混血。", "The Cosmic Race"]
],
"quote": "",
"start": "《宇宙种族》（The Cosmic Race，批判性地阅读）"
},
{
"id": "paz",
"name": "奥克塔维奥·帕斯",
"nameEn": "Octavio Paz",
"era": "现象学与存在主义",
"born": "1914年",
"birthplace": "墨西哥城",
"died": "1998年",
"deathplace": "墨西哥城",
"nationality": "墨西哥",
"schools": "随笔作家",
"wiki": "Octavio Paz",
"bio": "帕斯是诗人、随笔作家和外交官，获1990年诺贝尔文学奖。他的《孤独的迷宫》探究墨西哥人的身份。",
"ideas": [
"墨西哥身份",
"孤独"
],
"books": [
["孤独的迷宫", 1950, "墨西哥身份。", "The Labyrinth of Solitude"]
],
"quote": "",
"start": "《孤独的迷宫》（The Labyrinth of Solitude）"
},
{
"id": "gomezdavila",
"name": "尼古拉斯·戈麦斯·达维拉",
"nameEn": "Nicolás Gómez Dávila",
"era": "政治与保守主义",
"born": "1913年",
"birthplace": "波哥大",
"died": "1994年",
"deathplace": "波哥大",
"nationality": "哥伦比亚",
"schools": "传统主义保守主义",
"wiki": "Nicolás Gómez Dávila",
"bio": "戈麦斯·达维拉是一位深居简出的哥伦比亚格言作家。他是现代性的反动批评者。",
"ideas": [
"以格言批判现代性"
],
"books": [
["对一篇隐含文本的注解", 1977, "格言集。", "Escolios a un texto implícito"]
],
"quote": "",
"start": "《对一篇隐含文本的注解》（Scholia to an Implicit Text）"
},
{
"id": "gandhi",
"name": "甘地",
"nameEn": "Mahatma Gandhi",
"era": "东方",
"born": "1869年",
"birthplace": "波尔本德尔",
"died": "1948年",
"deathplace": "新德里",
"nationality": "印度",
"schools": "非暴力",
"wiki": "Mahatma Gandhi",
"bio": "甘地以非暴力抵抗领导了印度独立运动。他汲取印度教、耆那教和基督教的思想资源，以及托尔斯泰和梭罗的思想。他于1948年遇刺身亡。",
"ideas": [
"非暴力抵抗",
"不害",
"自治"
],
"books": [
["印度自治", 1909, "自治。", "Hind Swaraj"]
],
"quote": "",
"start": "《印度自治》（Hind Swaraj）"
},
{
"id": "aurobindo",
"name": "室利·阿罗频多",
"nameEn": "Sri Aurobindo",
"era": "东方",
"born": "1872年",
"birthplace": "加尔各答",
"died": "1950年",
"deathplace": "本地治里",
"nationality": "印度",
"schools": "整体瑜伽",
"wiki": "Sri Aurobindo",
"bio": "阿罗频多是由民族主义者转变为瑜伽士和哲学家的人物。他描述了一种意识的进化。他在本地治里创立了一座修院。",
"ideas": [
"整体瑜伽",
"意识的进化"
],
"books": [
["神圣人生论", 1940, "精神的进化。", "The Life Divine"]
],
"quote": "",
"start": "《神圣人生论》（The Life Divine，选读）"
},
{
"id": "iqbal",
"name": "穆罕默德·伊克巴尔",
"nameEn": "Muhammad Iqbal",
"era": "东方",
"born": "1877年",
"birthplace": "锡亚尔科特",
"died": "1938年",
"deathplace": "拉合尔",
"nationality": "印度（英属印度）",
"schools": "伊斯兰现代主义",
"wiki": "Muhammad Iqbal",
"bio": "伊克巴尔是诗人哲学家，曾在剑桥和慕尼黑求学。他主张对伊斯兰思想进行动态的重建。他是巴基斯坦的国民诗人。",
"ideas": [
"自我（khudi）",
"动态的伊斯兰"
],
"books": [
["伊斯兰宗教思想的重建", 1930, "讲演录。", "The Reconstruction of Religious Thought in Islam"]
],
"quote": "",
"start": "《伊斯兰宗教思想的重建》（The Reconstruction of Religious Thought in Islam）"
}
];
