import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const templatePath = join(process.cwd(), "public", "sw.template.js");
const outputPath = join(process.cwd(), "public", "sw.js");

const template = readFileSync(templatePath, "utf-8");
const timestamp = String(Date.now());
const generated = template.replaceAll("__BUILD_TIMESTAMP__", timestamp);

writeFileSync(outputPath, generated, "utf-8");
console.log(`Generated sw.js with cache timestamp ${timestamp}`);
