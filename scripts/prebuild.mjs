import { spawnSync } from "node:child_process";

// Netlify (and most CIs) don't ship Chrome, so md-to-pdf's puppeteer launch
// fails there. The resume PDF is committed at public/Tanner_Monaco_Resume.pdf,
// so on CI we keep that copy. Locally, regenerate so the published PDF stays
// in sync with resume-drafts/resume.md.
if (process.env.NETLIFY || process.env.CI) {
  console.log("[prebuild] CI detected, using committed public/Tanner_Monaco_Resume.pdf");
  process.exit(0);
}

const res = spawnSync("npm", ["run", "build:resume"], {
  stdio: "inherit",
  shell: true,
});
process.exit(res.status ?? 1);
