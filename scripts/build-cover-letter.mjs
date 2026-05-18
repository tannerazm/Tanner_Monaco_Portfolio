#!/usr/bin/env node
import { mdToPdf } from "md-to-pdf";
import path from "node:path";
import fs from "node:fs";
import url from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const slug = process.argv[2];
if (!slug) {
  console.error("usage: npm run build:cover-letter -- <slug>");
  console.error("example: npm run build:cover-letter -- mlb");
  console.error("");
  console.error("expects resume-drafts/cover-letters/<slug>/cover-letter.md to exist.");
  process.exit(1);
}

const folder = path.join(root, "resume-drafts", "cover-letters", slug);
const source = path.join(folder, "cover-letter.md");
const configPath = path.join(root, "resume-drafts", "cover-letters", "cover-letter.config.cjs");
const dest = path.join(folder, `Tanner_Monaco_Cover_Letter_${slug}.pdf`);

if (!fs.existsSync(source)) {
  console.error(`source not found: ${path.relative(root, source)}`);
  console.error(`expected folder: resume-drafts/cover-letters/${slug}/`);
  process.exit(1);
}

if (!fs.existsSync(configPath)) {
  console.error(`config not found: ${path.relative(root, configPath)}`);
  process.exit(1);
}

const config = require(configPath);

const pdf = await mdToPdf({ path: source }, config);

if (!pdf || !pdf.content) {
  console.error("pdf generation failed");
  process.exit(1);
}

fs.writeFileSync(dest, pdf.content);
console.log(`generated: ${path.relative(root, dest)}`);
