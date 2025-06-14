const fs = require("fs");
const path = require("path");

function generateTree(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let tree = "";
  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const stats = fs.statSync(filePath);
    tree += `${prefix}${isLast ? "└──" : "├──"} ${file}\n`;
    if (stats.isDirectory()) {
      tree += generateTree(filePath, prefix + (isLast ? "    " : "│   "));
    }
  });
  return tree;
}

const output = generateTree(".");
fs.writeFileSync("project-structure.txt", output);
