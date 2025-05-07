const fs = require("fs");
const path = require("path");

function deleteFilesByExtension(dir, extensions) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      deleteFilesByExtension(fullPath, extensions);
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  });
}

const targetExtensions = [".ts.map", ".d.ts"];
const rootDir = __dirname;

deleteFilesByExtension(rootDir, targetExtensions);
console.log("Cleanup complete!");
