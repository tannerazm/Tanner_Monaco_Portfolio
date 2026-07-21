#!/usr/bin/env node
// Builds the resume PDF straight from the data the website renders.
//
// src/data/{resume,projects,contact}.ts
//        -> resume-drafts/resume.md (generated)
//        -> resume-drafts/resume.pdf
//        -> public/Tanner_Monaco_Resume.pdf
//
// The site data is TypeScript and projects.ts imports PNGs, so plain `import`
// from Node won't work. esbuild strips the types, resolves the `@/` alias, and
// stubs the image imports, giving us the plain data objects.

import { build } from "esbuild";
import { mdToPdf } from "md-to-pdf";
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import url from "node:url";
import { createRequire } from "node:module";
import { renderResumeMarkdown, selectProjects } from "./lib/render-resume-markdown.mjs";

const require = createRequire(import.meta.url);
const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const MARKDOWN_OUT = path.join(root, "resume-drafts", "resume.md");
const PDF_OUT = path.join(root, "resume-drafts", "resume.pdf");
const PUBLIC_OUT = path.join(root, "public", "Tanner_Monaco_Resume.pdf");
const CONFIG = path.join(root, "resume-drafts", "resume.config.cjs");

// Anything the data files import that isn't data. Resolves to an empty string
// so the import succeeds and the value is simply unused here.
const stubAssets = {
  name: "stub-assets",
  setup(pluginBuild) {
    pluginBuild.onResolve({ filter: /\.(png|jpe?g|gif|svg|webp|avif|css)$/ }, (args) => ({
      path: args.path,
      namespace: "stub-asset",
    }));
    pluginBuild.onLoad({ filter: /.*/, namespace: "stub-asset" }, () => ({
      contents: 'export default "";',
      loader: "js",
    }));
  },
};

// Mirrors the `@/*` -> `src/*` alias in tsconfig/vite. Imports are written
// without a file extension, so try the ones the project actually uses.
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

const resolveAlias = {
  name: "resolve-alias",
  setup(pluginBuild) {
    pluginBuild.onResolve({ filter: /^@\// }, (args) => {
      const base = path.join(root, "src", args.path.slice(2));
      for (const ext of EXTENSIONS) {
        const candidate = base + ext;
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          return { path: candidate };
        }
      }
      return { errors: [{ text: `cannot resolve "${args.path}" under src/` }] };
    });
  },
};

async function loadSiteData() {
  const result = await build({
    stdin: {
      contents: `
        import * as resume from "@/data/resume";
        import * as projects from "@/data/projects";
        import * as contact from "@/data/contact";
        export { resume, projects, contact };
      `,
      resolveDir: root,
      loader: "ts",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    target: "node18",
    plugins: [stubAssets, resolveAlias],
    logLevel: "warning",
  });

  const code = result.outputFiles[0].text;
  const dataUrl = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  return import(dataUrl);
}

// The house style bans em dashes and en dashes everywhere. The resume is
// generated from prose in three different files, so check the output rather
// than trusting every future edit to remember.
function assertNoLongDashes(markdown) {
  const offenders = markdown
    .split("\n")
    .map((line, i) => ({ line, number: i + 1 }))
    .filter(({ line }) => /[—–]/.test(line));

  if (offenders.length > 0) {
    const detail = offenders.map((o) => `  line ${o.number}: ${o.line.trim()}`).join("\n");
    throw new Error(
      `Em dash or en dash found in the generated resume. Fix the source text in src/data/.\n${detail}`,
    );
  }
}

// Re-renders the same markdown as HTML and measures how tall it actually is,
// so the build can say "2 lines to spare" or "3 lines over" instead of just
// "this is 2 pages". Fitting exactly is not good enough: Chrome spills to a
// second page at zero headroom, so treat anything under HEADROOM_FLOOR as a
// failure and leave room for the next edit.
const HEADROOM_FLOOR = 12;

async function measureOverflow(markdownPath, config) {
  const { default: puppeteer } = await import("puppeteer");
  const html = await mdToPdf({ path: markdownPath }, { ...config, as_html: true });

  // Letter, at the 96 CSS px per inch browsers print at.
  const inches = (value) => Number.parseFloat(value);
  const m = config.pdf_options.margin;
  const width = Math.round((8.5 - inches(m.left) - inches(m.right)) * 96);
  const height = Math.round((11 - inches(m.top) - inches(m.bottom)) * 96);

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.setContent(html.content, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    // Not scrollHeight: that is clamped to the viewport, so it can never
    // report that content is SHORTER than a page, only that it is longer.
    // The bottom edge of the last laid-out element is the real answer.
    const contentHeight = await page.evaluate(() => {
      const bottoms = [...document.body.children].map(
        (el) => el.getBoundingClientRect().bottom,
      );
      return bottoms.length === 0 ? 0 : Math.ceil(Math.max(...bottoms));
    });
    return { contentHeight, pageHeight: height };
  } finally {
    await browser.close();
  }
}

// Best effort. Chrome compresses its PDF object streams, so the regex misses
// on some builds; macOS Spotlight metadata is the fallback.
function pageCount(pdfPath, buffer) {
  const matches = buffer.toString("latin1").match(/\/Type\s*\/Page[^s]/g);
  if (matches) return matches.length;
  try {
    const out = execFileSync("mdls", ["-raw", "-name", "kMDItemNumberOfPages", pdfPath], {
      encoding: "utf8",
    });
    const parsed = Number.parseInt(out.trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const { resume, projects, contact } = await loadSiteData();

const markdown = renderResumeMarkdown({
  contact: contact.CONTACT,
  resume: {
    title: resume.RESUME_TITLE,
    summary: resume.RESUME_SUMMARY_PDF,
    skillGroups: resume.RESUME_SKILL_GROUPS,
    experience: resume.RESUME_EXPERIENCE,
    education: resume.RESUME_EDUCATION,
  },
  projects: selectProjects(projects.PROJECTS, resume.RESUME_PDF_PROJECT_SLUGS),
});

assertNoLongDashes(markdown);

fs.writeFileSync(MARKDOWN_OUT, markdown);
console.log(`generated: ${path.relative(root, MARKDOWN_OUT)}`);

const config = require(CONFIG);
const pdf = await mdToPdf({ path: MARKDOWN_OUT }, config);
if (!pdf || !pdf.content) {
  console.error("pdf generation failed");
  process.exit(1);
}

fs.writeFileSync(PDF_OUT, pdf.content);
fs.writeFileSync(PUBLIC_OUT, pdf.content);
console.log(`generated: ${path.relative(root, PDF_OUT)}`);
console.log(`generated: ${path.relative(root, PUBLIC_OUT)}`);

const pages = pageCount(PDF_OUT, pdf.content);
const { contentHeight, pageHeight } = await measureOverflow(MARKDOWN_OUT, config);
const headroom = pageHeight - contentHeight;
const LINE = 16; // roughly one body line at the current type size
const lines = (px) => `~${Math.abs(px / LINE).toFixed(1)} lines`;

if (pages !== null && pages !== 1) {
  console.error(`page count: ${pages}`);
}

if (headroom < HEADROOM_FLOOR) {
  console.error(
    headroom < 0
      ? `FAIL: resume runs ${-headroom}px (${lines(headroom)}) past one page.`
      : `FAIL: resume fits with only ${headroom}px to spare, too close to the edge.`,
  );
  console.error("Trim copy in src/data/ or tighten resume-drafts/resume.config.cjs.");
  process.exit(1);
}

console.log(`page count: 1, with ${headroom}px (${lines(headroom)}) to spare`);
