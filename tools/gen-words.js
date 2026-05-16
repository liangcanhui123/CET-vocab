// Generate data-general files from compact format
// Usage: node tools/gen-words.js
var fs = require("fs");
var path = require("path");
var WORDS = [];
var BATCH = 500;

// Each add() call packs 10 words as compact arrays
function add(a) {
  for (var i = 0; i < a.length; i++) WORDS.push(a[i]);
}

add([
  ["accustomed", "习惯的", "6"],
  ["acquaint", "使了解", "6"],
  ["adolescent", "青少年", "6"],
  ["advent", "到来", "6"],
  ["adverse", "不利的", "6"],
  ["aggravate", "加重", "6"],
  ["agitate", "煽动", "6"],
  ["alleviate", "减轻", "6"],
  ["ambiguous", "含糊的", "6"],
  ["ambitious", "有雄心的", "6"],
]);
add([
  ["analogy", "类比", "6"],
  ["angel", "天使", "6"],
  ["apparatus", "仪器", "6"],
  ["appetite", "食欲", "6"],
  ["appreciable", "可察觉的", "6"],
  ["apprehension", "忧虑", "6"],
  ["arbitrary", "任意的", "6"],
  ["archaeology", "考古学", "6"],
  ["aristocrat", "贵族", "6"],
  ["array", "排列", "6"],
]);
add([
  ["articulate", "善于表达的", "6"],
  ["ascend", "上升", "6"],
  ["ascertain", "查明", "6"],
  ["ascribe", "归因于", "6"],
  ["assassinate", "暗杀", "6"],
  ["assimilate", "吸收", "6"],
  ["astronomy", "天文学", "6"],
  ["attendance", "出席", "6"],
  ["auditorium", "礼堂", "6"],
  ["augment", "增强", "6"],
]);
add([
  ["aural", "听觉的", "6"],
  ["autobiography", "自传", "6"],
  ["automation", "自动化", "6"],
  ["avail", "有用", "6"],
  ["avert", "转移", "6"],
  ["aviation", "航空", "6"],
  ["axis", "轴", "6"],
  ["bachelor", "学士", "6"],
  ["badge", "徽章", "6"],
  ["baffle", "使困惑", "6"],
]);
add([
  ["bankruptcy", "破产", "6"],
  ["barn", "谷仓", "6"],
  ["barren", "贫瘠的", "6"],
  ["basement", "地下室", "6"],
  ["batch", "一批", "6"],
  ["bazaar", "集市", "6"],
  ["beard", "胡须", "4"],
  ["beckon", "招手", "6"],
  ["beetle", "甲虫", "6"],
  ["belly", "肚子", "6"],
]);
add([
  ["beverage", "饮料", "6"],
  ["bewilder", "使迷惑", "6"],
  ["bias", "偏见", "6"],
  ["bibliography", "书目", "6"],
  ["biography", "传记", "6"],
  ["bizarre", "奇异的", "6"],
  ["blackmail", "敲诈", "6"],
  ["blanket", "毯子", "4"],
  ["blaze", "火焰", "6"],
  ["bleak", "荒凉的", "6"],
]);
add([
  ["blossom", "花", "6"],
  ["blunder", "大错", "6"],
  ["blunt", "钝的", "6"],
  ["blur", "模糊", "6"],
  ["blush", "脸红", "6"],
  ["bonfire", "篝火", "6"],
  ["booklet", "小册子", "6"],
  ["booth", "亭", "6"],
  ["botany", "植物学", "6"],
  ["bough", "大树枝", "6"],
]);
add([
  ["boulevard", "林荫大道", "6"],
  ["bourgeois", "资产阶级的", "6"],
  ["boutique", "精品店", "6"],
  ["bowel", "肠", "6"],
  ["boycott", "抵制", "6"],
  ["brace", "支撑", "6"],
  ["bracelet", "手镯", "6"],
  ["bracket", "括号", "6"],
  ["brass", "黄铜", "6"],
  ["brawl", "争吵", "6"],
]);
add([
  ["breeze", "微风", "6"],
  ["bride", "新娘", "4"],
  ["bridegroom", "新郎", "6"],
  ["bridle", "缰绳", "6"],
  ["brighten", "使发亮", "6"],
  ["brink", "边缘", "6"],
  ["brisk", "轻快的", "6"],
  ["bristle", "鬃毛", "6"],
  ["brochure", "小册子", "6"],
  ["bronze", "青铜", "6"],
]);
add([
  ["brook", "小溪", "6"],
  ["bruise", "淤伤", "6"],
  ["brutal", "残忍的", "6"],
  ["buckle", "搭扣", "6"],
  ["buffalo", "水牛", "6"],
  ["buffer", "缓冲", "6"],
  ["buffet", "自助餐", "6"],
  ["bugle", "号角", "6"],
  ["bulb", "灯泡", "4"],
  ["bulge", "凸出", "6"],
]);
add([
  ["bull", "公牛", "6"],
  ["bully", "欺负", "6"],
  ["bump", "碰撞", "6"],
  ["bunch", "串", "4"],
  ["bundle", "捆", "6"],
  ["bungalow", "平房", "6"],
  ["buoy", "浮标", "6"],
  ["bureaucracy", "官僚", "6"],
  ["burglar", "窃贼", "6"],
  ["burial", "埋葬", "6"],
]);
add([
  ["bust", "半身像", "6"],
  ["bustle", "喧闹", "6"],
  ["buzz", "嗡嗡声", "6"],
  ["bypass", "绕过", "6"],
  ["cabbage", "卷心菜", "4"],
  ["cabin", "小屋", "4"],
  ["cafeteria", "自助餐厅", "4"],
  ["calcium", "钙", "6"],
  ["calendar", "日历", "4"],
  ["calorie", "卡路里", "6"],
]);
add([
  ["camel", "骆驼", "4"],
  ["camouflage", "伪装", "6"],
  ["candy", "糖果", "4"],
  ["cannon", "大炮", "6"],
  ["canoe", "独木舟", "6"],
  ["canteen", "食堂", "6"],
  ["canvas", "帆布", "6"],
  ["canyon", "峡谷", "6"],
  ["cape", "海角", "6"],
  ["capitalism", "资本主义", "6"],
]);
add([
  ["capsule", "胶囊", "6"],
  ["caption", "标题", "6"],
  ["captive", "俘虏", "6"],
  ["cardinal", "基本的", "6"],
  ["caress", "爱抚", "6"],
  ["carnival", "狂欢节", "6"],
  ["carpenter", "木匠", "6"],
  ["carpet", "地毯", "4"],
  ["carriage", "马车", "4"],
  ["carrot", "胡萝卜", "4"],
]);
add([
  ["cart", "手推车", "4"],
  ["cartoon", "动画片", "4"],
  ["cartridge", "墨盒", "6"],
  ["cascade", "瀑布", "6"],
  ["cassette", "磁带", "4"],
  ["castle", "城堡", "4"],
  ["casualty", "伤亡", "6"],
  ["catalyst", "催化剂", "6"],
  ["catastrophe", "灾难", "6"],
  ["cathedral", "大教堂", "6"],
]);
add([
  ["catholic", "天主教的", "6"],
  ["cauliflower", "菜花", "6"],
  ["cavity", "洞", "6"],
  ["ceiling", "天花板", "4"],
  ["celebrity", "名人", "6"],
  ["cellar", "地窖", "6"],
  ["cellular", "细胞的", "6"],
  ["cemetery", "墓地", "6"],
  ["censor", "审查员", "6"],
  ["cereal", "谷类", "4"],
]);
add([
  ["certainty", "确定", "6"],
  ["certify", "证明", "6"],
  ["chamber", "房间", "4"],
  ["champagne", "香槟", "6"],
  ["chancellor", "总理", "6"],
  ["chap", "家伙", "6"],
  ["chapel", "小教堂", "6"],
  ["characterize", "刻画", "6"],
  ["charcoal", "木炭", "6"],
  ["charter", "宪章", "6"],
]);
add([
  ["cheek", "面颊", "4"],
  ["cheerful", "快乐的", "4"],
  ["cheese", "奶酪", "4"],
  ["cherry", "樱桃", "4"],
  ["chess", "国际象棋", "4"],
  ["chest", "胸", "4"],
  ["chew", "咀嚼", "4"],
  ["chiefly", "主要地", "6"],
  ["childish", "幼稚的", "6"],
  ["chimney", "烟囱", "4"],
]);
add([
  ["chin", "下巴", "4"],
  ["china", "瓷器", "4"],
  ["chocolate", "巧克力", "4"],
  ["choir", "唱诗班", "6"],
  ["chord", "和弦", "6"],
  ["chorus", "合唱队", "6"],
  ["chronic", "慢性的", "6"],
  ["chuckle", "轻笑", "6"],
  ["chunk", "厚块", "6"],
]);

console.log("Total extra words:", WORDS.length);

var header =
  "window.__gw = window.__gw || [];\n(function () {\n  var d = window.__gw;\n  d.push(\n";
var footer = "  );\n})();\n";

var startFile = parseInt(process.argv[2] || "12");
var idx = startFile;
for (var i = 0; i < WORDS.length; i += BATCH) {
  var chunk = WORDS.slice(i, i + BATCH);
  var lines = [header];
  for (var j = 0; j < chunk.length; j++) {
    var comma = j < chunk.length - 1 ? "," : "";
    lines.push(
      '    ["' +
        chunk[j][0] +
        '", "' +
        chunk[j][1] +
        '", "' +
        chunk[j][2] +
        '"]' +
        comma,
    );
  }
  lines.push(footer);
  var content = lines.join("\n");
  var fname = "data-general-" + idx + ".js";
  fs.writeFileSync(path.join("E:/CET/js", fname), content, "utf-8");
  console.log(
    "Created " +
      fname +
      ": " +
      chunk.length +
      " words, " +
      content.split("\n").length +
      " lines",
  );
  idx++;
}
