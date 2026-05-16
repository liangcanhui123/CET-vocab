// 合并所有词根数据
const wordRoots = [...wordRootsPart1, ...wordRootsPart2, ...wordRootsPart3];

// 处理通用词汇 (data-general-*.js) 推入 wordRoots
(function () {
  var gw = window.__gw;
  if (!gw || gw.length === 0) return;

  // Group words by first letter
  var groups = {};
  for (var i = 0; i < gw.length; i++) {
    var w = gw[i];
    var letter = w[0].charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    // Convert level format: "4"->"CET-4", "6"->"CET-6", "46"->"CET-4,CET-6"
    var level = w[2];
    var cetLevel =
      level === "4" ? "CET-4" : level === "6" ? "CET-6" : "CET-4,CET-6";
    groups[letter].push({ word: w[0], meaning: w[1], level: cetLevel });
  }

  // Sort letters alphabetically
  var letters = Object.keys(groups).sort();
  for (var j = 0; j < letters.length; j++) {
    var l = letters[j];
    wordRoots.push({
      root: l,
      meaning: l + "-开头词汇",
      category: "通用词汇",
      words: groups[l],
    });
  }
})();

// 统计 (支持 "CET-4,CET-6" 双级别)
function countByLevel(words, level) {
  return words.filter(function (w) {
    var levels = w.level.split(",");
    return levels.indexOf(level) !== -1;
  }).length;
}

function countAllWords(roots) {
  return roots.reduce(function (sum, r) {
    return sum + r.words.length;
  }, 0);
}

function countLevel(roots, level) {
  return roots.reduce(function (sum, r) {
    return sum + countByLevel(r.words, level);
  }, 0);
}

const rootStats = {
  totalRoots: wordRoots.length,
  totalWords: countAllWords(wordRoots),
  cet4Words: countLevel(wordRoots, "CET-4"),
  cet6Words: countLevel(wordRoots, "CET-6"),
};
