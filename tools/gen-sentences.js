// Generate sentences.js — example sentences for all CET vocabulary
// Produces window.__st = { "word": { s: "sentence", t: "translation" } }
var fs = require("fs");
var path = require("path");

// Load all word modules
var all = [];
function load(f) {
  try {
    var m = require(f);
    for (var i = 0; i < m.length; i++) all.push(m[i]);
  } catch (e) {}
}
load("./words-d");
load("./words-e");
load("./words-f");
load("./words-g");
load("./words-h");
load("./words-i");
load("./words-jk");
load("./words-l");
load("./words-m");
load("./words-n");
load("./words-op");
load("./words-qr");
load("./words-s");
load("./words-t");
load("./words-uv");
load("./words-wxyz");
load("./words-extra");
for (var ei = 2; ei <= 17; ei++) {
  try {
    load("./words-extra" + ei);
  } catch (e) {}
}

// Also load root-based words from data-*.js
try {
  var rootWords = [];
  // Read the data files to extract word entries
  var c1 = fs.readFileSync(path.join(__dirname, "../js/data-1.js"), "utf-8");
  var c2 = fs.readFileSync(path.join(__dirname, "../js/data-2.js"), "utf-8");
  var c3 = fs.readFileSync(path.join(__dirname, "../js/data-3.js"), "utf-8");
  var re = /word:\s*"([^"]+)",\s*meaning:\s*"([^"]+)",\s*level:\s*"([^"]+)"/g;
  var m;
  [c1, c2, c3].forEach(function (c) {
    while ((m = re.exec(c)) !== null) {
      all.push([m[1], m[2], m[3]]);
    }
  });
} catch (e) {}

console.log("Total words for sentence generation: " + all.length);

// 54 news-style sentence patterns — inspired by real journalism
// NO {word} as subject of action verbs — always in safe positions
// Chinese translations use {meaning} (replaced with Chinese definition)
var patterns = [
  // === Concrete, natural journalistic style ===
  {
    en: "In recent years, the question of how societies should respond to the challenges posed by {word} has prompted fierce debate among experts and policy-makers.",
    zh: "近年来，社会应如何应对{meaning}所带来的挑战，这一问题在专家和决策者中引发了激烈辩论。",
  },
  {
    en: "A growing body of research examining the impact of {word} on people's lives has produced findings that challenge many long-held assumptions.",
    zh: "越来越多考察{meaning}对人们生活影响的研究得出了挑战许多长期假设的结论。",
  },
  {
    en: "While some celebrate the benefits and opportunities that {word} can bring, others warn that the potential risks and unintended consequences cannot be ignored.",
    zh: "有人赞扬{meaning}能带来的好处和机遇，但也有人警告，其潜在风险和意外后果不容忽视。",
  },
  {
    en: "Experts remain deeply divided on the question of whether current approaches to {word} are adequate to meet the growing demands of the future.",
    zh: "关于当前应对{meaning}的方式是否足以满足未来日益增长的需求，专家们仍然存在深刻分歧。",
  },
  {
    en: "The rapid rise of {word} in recent decades has fundamentally altered the way whole industries operate and compete in an increasingly globalized market.",
    zh: "近几十年来{meaning}的迅速崛起，从根本上改变了各行业在日益全球化的市场中运营和竞争的方式。",
  },
  {
    en: "What ultimately sets the issue of {word} apart from other similar matters is its capacity to provoke such strong and deeply held opinions on all sides.",
    zh: "{Meaning}问题之所以区别于其他类似问题，在于它能够引发各方如此强烈而根深蒂固的观点。",
  },
  {
    en: "Governments around the world are grappling with the challenge of how best to regulate and manage the growing influence of {word} in public life.",
    zh: "世界各国政府正在努力应对如何最好地规范和引导{meaning}在公共生活中日益增长的影响力。",
  },
  {
    en: "A closer look at the evidence reveals that the way {word} is understood and applied in practice can make a significant difference to real-world outcomes.",
    zh: "仔细审视证据会发现，{meaning}在实践中被理解和应用的方式会对实际结果产生显著影响。",
  },
  {
    en: "The debate over {word} has intensified noticeably in recent months, with advocates and critics alike becoming increasingly vocal about their positions.",
    zh: "近几个月来，关于{meaning}的争论显著加剧，支持者和批评者都越来越直言不讳地表达自己的立场。",
  },
  {
    en: "Despite widespread recognition of the importance of {word} in modern life, the full potential of the concept has yet to be convincingly realized in practice.",
    zh: "尽管{meaning}在现代生活中的重要性已得到广泛认可，但其全部潜力尚未在实践中得到令人信服的发挥。",
  },
  {
    en: "The evolving story of {word} over the past decade is one of remarkable transformation, driven by both technological innovation and shifting social attitudes.",
    zh: "过去十年{meaning}不断演变的历史是一段非凡的变革历程，由技术创新和社会态度转变共同驱动。",
  },
  {
    en: "At the heart of the current controversy surrounding {word} lies a fundamental and often unspoken disagreement about values, priorities, and vision for the future.",
    zh: "当前围绕{meaning}的争议核心，在于关于价值观、优先事项和未来愿景的根本性且常常不言而喻的分歧。",
  },
  {
    en: "From classrooms and universities to corporate boardrooms and government offices, the influence of {word} can be felt across virtually every sector of society.",
    zh: "从课堂和大学到企业董事会和政府办公室，{meaning}的影响几乎渗透到社会的每一个领域。",
  },
  {
    en: "The real question is not whether {word} matters — almost everyone agrees that it does — but rather how best to harness its potential while minimizing the risks.",
    zh: "真正的问题不在于{meaning}是否重要——几乎所有人都认为它重要——而是在于如何最大限度地发挥其潜力同时将风险降至最低。",
  },
  {
    en: "In a world where change is the only constant, the ability to understand and adapt to rapid developments in the field of {word} has become an increasingly essential skill.",
    zh: "在一个唯一不变的就是变化的世界里，理解并适应{meaning}领域快速发展的能力已成为一项越来越重要的技能。",
  },
  {
    en: "What is particularly striking about recent developments in the field of {word} is the remarkable speed and scale at which they have unfolded.",
    zh: "近年来{meaning}领域的发展尤其引人注目的是它们展开的惊人速度和规模。",
  },
  {
    en: "Despite decades of sustained research and heated public discussion, the issue of {word} remains as deeply contested and controversial as it has ever been.",
    zh: "尽管进行了数十年的持续研究和激烈的公众讨论，{meaning}的问题仍然像以往一样充满争议。",
  },
  {
    en: "The complex relationship between {word} and other social, economic, and cultural forces is far too multifaceted to be adequately captured by any single theory or framework.",
    zh: "{Meaning}与其他社会、经济和文化力量之间的复杂关系过于多方面，无法被任何单一理论或框架充分概括。",
  },
  {
    en: "One of the most striking and frequently remarked features of the modern era is the extent to which the issue of {word} has become intertwined with everyday life.",
    zh: "现代最引人注目和常被提及的特征之一，是{meaning}问题与日常生活紧密交织的程度。",
  },
  {
    en: "While the benefits of {word} are widely and enthusiastically touted by its proponents, critics point to a growing body of evidence that raises serious and legitimate concerns.",
    zh: "尽管{meaning}的支持者广泛而热情地宣扬其好处，但批评者指出越来越多的证据引发了严重而合理的担忧。",
  },
  {
    en: "The public conversation surrounding {word} has shifted dramatically in recent years, reflecting broader and deeper changes in social attitudes and cultural priorities.",
    zh: "围绕{meaning}的公众对话近年来发生了巨大转变，反映了社会态度和文化优先事项更广泛而深刻的变化。",
  },
  {
    en: "Across different countries, regions, and cultural traditions, approaches to {word} vary widely, shaped by distinct historical experiences, values, and social norms.",
    zh: "不同国家和地区以及文化传统对{meaning}的处理方式差异很大，这是由各自独特的历史经验、价值观和社会规范塑造的。",
  },
  {
    en: "The emergence of {word} as a significant force in modern life has caught many observers by surprise, fundamentally challenging established ways of thinking and acting.",
    zh: "{Meaning}作为现代生活中一股重要力量的崛起让许多观察者感到意外，从根本上挑战了既有的思维和行动方式。",
  },
  {
    en: "From a strictly economic standpoint, the case for investing resources in the development of {word} has never been more compelling, with potential returns extending far beyond the purely financial.",
    zh: "从严格的经济角度来看，将资源投入到{meaning}发展中的理由从未像现在这样令人信服，其潜在回报远远超出纯财务层面。",
  },
  {
    en: "What the increasingly heated debate over {word} reveals, above all else, is a deep and widespread unease about the direction in which modern society is heading.",
    zh: "关于{meaning}的日益激烈的争论首先揭示的是人们对现代社会走向的深切而广泛的不安。",
  },
  {
    en: "For better or worse, the rise of {word} has become one of the defining features of contemporary life, profoundly shaping the way people work, communicate, and relate to one another.",
    zh: "无论好坏，{meaning}的兴起已成为当代生活的显著特征之一，深刻地塑造着人们工作、交流和相互联系的方式。",
  },
  {
    en: "There is a real sense in which the growing prominence of {word} reflects a broader shift in social values and priorities that has been underway for some time.",
    zh: "从某种意义上说，{meaning}日益突出的地位反映了已经持续一段时间的社会价值观和优先事项的更广泛转变。",
  },
  {
    en: "Those who have followed the long and complex trajectory of {word} over the years will not be particularly surprised by the latest developments in the field.",
    zh: "多年来一直关注{meaning}漫长而复杂发展轨迹的人不会对该领域的最新发展感到特别惊讶。",
  },
  {
    en: "The wide-ranging implications of {word} for the future are becoming increasingly apparent, touching on everything from education and healthcare to business and political governance.",
    zh: "{Meaning}对未来的广泛影响正变得越来越明显，涉及从教育和医疗到商业和政治治理等各个方面。",
  },
  {
    en: "Beneath the surface of the often heated public debate about {word} lies a more fundamental set of questions about human values, social priorities, and the kind of future people want to build.",
    zh: "关于{meaning}的往往激烈的公众辩论表面之下，隐藏着一系列关于人类价值观、社会优先事项以及人们想要建设什么样的未来的更根本问题。",
  },
  {
    en: "Few would seriously dispute the claim that {word} has transformed modern life in profound and lasting ways, bringing both undeniable benefits and significant challenges.",
    zh: "很少有人会认真质疑{meaning}以深刻而持久的方式改变了现代生活的说法——它既带来了不可否认的好处，也带来了重大挑战。",
  },
  {
    en: "What is rather less often discussed, however, is the more uncomfortable question of who stands to benefit most from the increasing prominence of {word} in society.",
    zh: "然而，较少被讨论的是谁最有可能从{meaning}在社会中日益突出的地位中受益这个更令人不安的问题。",
  },
  {
    en: "Far from being a narrow or niche concern that only affects a small number of people, the issue of {word} has moved to the center of public discourse, attracting attention from across the political and social spectrum.",
    zh: "远非只影响少数人的狭隘小众问题，{meaning}已进入公共讨论的中心，引起了政治和社会各界的关注。",
  },
  {
    en: "In the absence of clear, consistent guidelines and effective regulation, the development of {word} has largely proceeded in a manner that is uncoordinated, uneven, and potentially problematic.",
    zh: "在缺乏明确一致的指导方针和有效监管的情况下，{meaning}的发展在很大程度上是以不协调、不均衡且可能有问题的方式进行的。",
  },
  {
    en: "What makes the current moment particularly significant and worthy of attention is the convergence of multiple distinct trends that together are reshaping the entire landscape of {word}.",
    zh: "当前时刻之所以特别重要和值得关注，在于多种不同趋势的汇聚，它们共同正在重塑{meaning}的整个格局。",
  },
  {
    en: "For all the attention and discussion that {word} has received from the media, academics, and policy-makers, there remains a surprising degree of confusion and disagreement about what the concept actually means.",
    zh: "尽管{meaning}受到了媒体、学术界和决策者的广泛关注和讨论，但对其实际含义仍存在令人惊讶的混淆和分歧。",
  },
  {
    en: "Rather than viewing the increasing influence of {word} as an inevitable threat to established traditions and values, some thoughtful commentators argue that it can be harnessed to reinforce and renew them.",
    zh: "一些有思想的评论者认为，不应将{meaning}日益增长的影响力视为对既定传统和价值观的不可避免的威胁，而是可以利用它来加强和更新它们。",
  },
  {
    en: "The future direction of {word} will depend less on technological breakthroughs or theoretical innovations than on the practical political and social choices that societies collectively make in the coming years.",
    zh: "{Meaning}的未来方向将较少取决于技术突破或理论创新，而更多取决于社会在未来几年共同做出的实际政治和社会选择。",
  },
  {
    en: "One of the great ironies of the current situation is that those who stand to benefit the most from the progress of {word} are often precisely those who have the least access to it.",
    zh: "当前局面的一大讽刺之处在于，那些最有可能从{meaning}进步中受益的人，往往恰恰是最无法获得它的人。",
  },
  {
    en: "The persistent idea that {word} is a purely technical or specialized matter best left to experts and professionals has come under increasing and entirely justified scrutiny in recent years.",
    zh: "{Meaning}纯属技术或专业问题、最好留给专家处理的观点，近年来受到了日益增多且完全合理的质疑。",
  },
  {
    en: "As the debate continues to unfold and evolve, one thing has become increasingly and unmistakably clear: the era of {word} is not something that is coming in the distant future; it has already arrived.",
    zh: "随着辩论的继续展开和演变，有一点已经变得越来越明确无误：{meaning}的时代不是在遥远的未来才会到来的东西，它已经到来了。",
  },
  {
    en: "Far from settling the long-standing questions and controversies, the latest research and evidence on {word} have, if anything, only deepened the mystery surrounding the concept and its effects.",
    zh: "关于{meaning}的最新研究和证据非但没有解决长期存在的问题和争议，反而加深了围绕该概念及其影响的神秘性。",
  },
  {
    en: "In some unexpected and largely unforeseen ways, the global pandemic served as a powerful catalyst for significant changes in the way {word} is perceived, valued, and utilized in society.",
    zh: "疫情以一些始料未及的方式，成为{meaning}在社会中被感知、评价和利用方式发生重大变化的强大催化剂。",
  },
  {
    en: "Those critics who readily dismiss {word} as nothing more than a passing trend or temporary fashion fundamentally fail to recognize the deeper structural forces that are driving its sustained growth and widespread adoption.",
    zh: "那些轻易将{meaning}斥为不过是短暂潮流的批评者，从根本上没有认识到推动其持续增长和广泛普及的更深层次的结构性力量。",
  },
  {
    en: "A more careful and objective examination of the available evidence reveals a far more nuanced and complicated picture of {word} than the one typically presented in mainstream public discourse and media coverage.",
    zh: "对现有证据进行更仔细和客观的审视，会揭示出{meaning}比主流公共讨论和媒体报道中通常呈现的要细致和复杂得多的图景。",
  },
  {
    en: "Whether the growing influence of {word} ultimately proves to be a force for good or for ill will depend far less on the concept itself than on the concrete ways in which it is used, governed, and controlled.",
    zh: "{Meaning}日益增长的影响力最终是福是祸，将远不取决于概念本身，而更多地取决于它被使用、治理和控制的具体方式。",
  },
  {
    en: "The increasingly intense debate about {word} is, at bottom, a debate about nothing less than what kind of society people want to live in and what values they want to prioritize.",
    zh: "关于{meaning}的日益激烈的辩论，归根结底正是关于人们想生活在什么样的社会中以及他们想要优先考虑什么价值的辩论。",
  },
  {
    en: "For many ordinary people going about their daily lives, the often abstract and theoretical discussions about {word} that take place in academic and policy circles can seem rather remote and disconnected from their immediate concerns.",
    zh: "对许多过着日常生活的普通人来说，学术界和政策圈中关于{meaning}的往往抽象的理论讨论，似乎与他们切身关切有些遥远和脱节。",
  },
  {
    en: "What the long and complicated history of {word} ultimately teaches us is that meaningful progress rarely follows a straight or predictable line; instead, it is marked by periodic setbacks, unexpected detours, and occasional breakthroughs.",
    zh: "{Meaning}漫长而复杂的历史最终告诉我们，有意义的进步很少沿着一条直线或可预测的路线前进；相反，它充满了周期性的挫折、意想不到的迂回和偶尔的突破。",
  },
  {
    en: "The central and recurring challenge, as always with such matters, is to ensure that the benefits of {word} are distributed as widely and fairly as possible across society, rather than being concentrated in the hands of a privileged few.",
    zh: "与处理此类问题时一样，核心且反复出现的挑战在于确保{meaning}的好处尽可能广泛和公平地分配到全社会，而不是集中在少数特权者手中。",
  },
  {
    en: "It is all too easy to forget, especially amid the intense hype and heated controversy, that {word} is ultimately a means to a larger end, not an end in itself that should be pursued without question.",
    zh: "人们很容易忘记——尤其是在激烈的炒作和争议中——{meaning}最终是达到更大目的的手段，而不是应该不加质疑地追求的目的本身。",
  },
  {
    en: "The growing and increasingly visible divide between those who have ready access to {word} and those who do not has become a significant and troubling source of social tension and inequality.",
    zh: "能够轻易获得{meaning}的人与不能获得的人之间日益扩大和明显的鸿沟，已成为社会紧张和不平等的显著且令人不安的根源。",
  },
  {
    en: "For all its acknowledged flaws, limitations, and occasional misuses, the concept of {word} remains one of the most powerful and versatile tools that human beings have yet devised for understanding and addressing complex challenges.",
    zh: "尽管存在公认的缺陷、局限性和偶尔的误用，{meaning}的概念仍然是人类为理解和应对复杂挑战所设计的最强大、最多功能的工具之一。",
  },
];

// Hash function for consistent pattern assignment per word
function hashWord(w) {
  var h = 0;
  for (var i = 0; i < w.length; i++) {
    h = (h << 5) - h + w.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Capitalize first letter
function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Build sentence data
var data = {};
for (var i = 0; i < all.length; i++) {
  var word = all[i][0].trim().toLowerCase();
  if (!word || data[word]) continue;

  // Extract clean Chinese meaning from the definition
  var raw = all[i][1] || "";
  var meaning = raw.split(/[,，、;；/]/)[0].trim();
  // Strip "使/让/令" prefix for verb-object definitions
  meaning = meaning.replace(/^[使让令]/, "").trim();
  // Strip trailing "的" so it works in "XX的YY" constructions without double-的
  meaning = meaning.replace(/的$/, "").trim();
  // If meaning is too long (phrase), try shorter version
  if (meaning.length > 10) {
    var parts = meaning.split(/[，,、]/);
    meaning = parts[0].trim();
  }
  // If meaning contains English letters, it's invalid — try other parts or use word itself
  if (/[a-zA-Z]/.test(meaning)) {
    var parts = raw.split(/[,，、;；/]/);
    for (var pi = 1; pi < parts.length && /[a-zA-Z]/.test(meaning); pi++) {
      meaning = parts[pi]
        .trim()
        .replace(/^[使让令]/, "")
        .replace(/的$/, "")
        .trim();
    }
  }
  // If still no valid Chinese, use a generic fallback for pure Chinese output
  if (!meaning || /[a-zA-Z]/.test(meaning)) meaning = "相关事物";

  var idx = hashWord(word) % patterns.length;
  var p = patterns[idx];
  data[word] = {
    s: p.en.replace(/\{Word\}/g, cap(word)).replace(/\{word\}/g, word),
    t: p.zh
      .replace(/\{Meaning\}/g, cap(meaning))
      .replace(/\{meaning\}/g, meaning)
      .replace(/\{Word\}/g, cap(word))
      .replace(/\{word\}/g, word),
  };
}

console.log(
  "Sentences generated for " + Object.keys(data).length + " unique words",
);

// Write output
var lines = [
  "window.__st = window.__st || {};",
  "(function () {",
  "  var d = window.__st;",
];
for (var word in data) {
  var s = data[word].s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  var t = data[word].t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  lines.push('  d["' + word + '"] = { s: "' + s + '", t: "' + t + '" };');
}
lines.push("})();\n");

var content = lines.join("\n");
var fp = path.join(__dirname, "../js/sentences.js");
fs.writeFileSync(fp, content, "utf-8");
console.log(
  "Written to js/sentences.js: " + content.split("\n").length + " lines",
);
