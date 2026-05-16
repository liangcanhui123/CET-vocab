// Generate data-general files from word modules
var fs = require("fs");
var path = require("path");
var all = [],
  B = 500;

function load(f) {
  var m = require(f);
  for (var i = 0; i < m.length; i++) all.push(m[i]);
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
for (var ei = 2; ei <= 17; ei++) load("./words-extra" + ei);

console.log("Total words:", all.length);

var header =
  "window.__gw = window.__gw || [];\n(function () {\n  var d = window.__gw;\n  d.push(\n";
var footer = "  );\n})();\n";
var fileNum = 2;
for (var i = 0; i < all.length; i += B) {
  var chunk = all.slice(i, i + B);
  var lines = [header];
  for (var j = 0; j < chunk.length; j++) {
    lines.push(
      '    ["' +
        chunk[j][0] +
        '", "' +
        chunk[j][1] +
        '", "' +
        chunk[j][2] +
        '"]' +
        (j < chunk.length - 1 ? "," : ""),
    );
  }
  lines.push(footer);
  var content = lines.join("\n");
  var fname = "data-general-" + fileNum + ".js";
  fs.writeFileSync(path.join("E:/CET/js", fname), content, "utf-8");
  console.log(
    fname +
      ": " +
      chunk.length +
      " words, " +
      content.split("\n").length +
      " lines",
  );
  fileNum++;
}
