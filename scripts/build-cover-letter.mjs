#!/usr/bin/env node
import { mdToPdf } from "md-to-pdf";
import path from "node:path";
import fs from "node:fs";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const name = process.argv[2];
if (!name) {
  console.error("usage: npm run build:cover-letter -- <name>");
  console.error("example: npm run build:cover-letter -- mlb");
  console.error("");
  console.error("expects resume-drafts/cover-letter-<name>.md to exist.");
  process.exit(1);
}

const source = path.join(root, "resume-drafts", `cover-letter-${name}.md`);
const config = path.join(root, "resume-drafts", "cover-letter.config.cjs");
const outDir = path.join(root, "resume-drafts", "cover-letters");
const dest = path.join(outDir, `Tanner_Monaco_Cover_Letter_${name}.pdf`);

if (!fs.existsSync(source)) {
  console.error(`source not found: ${path.relative(root, source)}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const pdf = await mdToPdf(
  { path: source },
  { config_file: config, dest },
);

if (!pdf) {
  console.error("pdf generation failed");
  process.exit(1);
}

console.log(`generated: ${path.relative(root, dest)}`);
