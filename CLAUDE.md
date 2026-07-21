# Tanner Monaco Portfolio

React + Vite + TypeScript single-page portfolio. Tailwind v4, React Router, PostHog analytics, deployed on Netlify (auto-deploys the `main` branch).

## The resume PDF is generated from the site data

`npm run build:resume` reads `src/data/{resume,projects,contact}.ts` (the same data the site renders), writes `resume-drafts/resume.md`, and produces `resume-drafts/resume.pdf` plus `public/Tanner_Monaco_Resume.pdf`.

**`resume-drafts/resume.md` is output, not input.** Never hand-edit it; the next build overwrites it. Edit the data in `src/data/` instead.

Where the site and the one-page PDF need to differ, use the escape hatches rather than a second copy of the resume: per-bullet `pdf` overrides (`pdf: "shorter"` or `pdf: null` to omit), `RESUME_SUMMARY_PDF` alongside `RESUME_SUMMARY`, `pdfLabel` to merge skill groups onto one PDF line, and `resumeLine` on a project. `RESUME_PDF_PROJECT_SLUGS` picks which projects appear.

The build measures the rendered height and fails if the resume runs past one page or fits with under 12px of headroom, printing how many lines you are over. `npm test` covers the markdown rendering.

A `prebuild` hook regenerates the PDF on build but skips on Netlify/CI (no Chrome there), so the committed `public/Tanner_Monaco_Resume.pdf` is what ships. Commit it whenever resume data changes.

## Keep the stack icons and the skills list in sync

Skills live in two places on the site, and the two must always agree:

1. **Icons**: the "Stack / The tools." marquee on the home page. Source of truth: `STACK_LOGOS` in `src/pages/Home.tsx`.
2. **Skills section**: the categorized skill list on the resume. Source of truth: `RESUME_SKILL_GROUPS` in `src/data/resume.ts`, mirrored into the PDF source `resume-drafts/resume.md` (the "Technical Skills" block).

**Rule: whenever you add or remove a skill in one place, make the matching change in the other.** If you add a skill to `RESUME_SKILL_GROUPS`, add its icon to `STACK_LOGOS` (and vice versa). The two lists should never drift.

Exceptions: a handful of skills have no recognizable icon (for example Filament, CraftCMS, Eloquent, OAuth, Multi-tenant Architecture (RBAC), Infrastructure as Code, and the property-management systems Yardi, Entrata, RealPage, Fortress). Those stay in the skills list only. Skipping an icon is fine when no good icon exists; it is not fine to skip because you forgot.

### Icon sourcing and theming notes

- Colored brand icons come from devicon (`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/...`) or Simple Icons (`https://cdn.simpleicons.org/<slug>` with an optional `/<hex>`). Verify a new URL returns HTTP 200 before committing.
- The marquee defaults to the dark theme, where pure-black or near-black logos vanish into the background. For monochrome brand marks (Next.js, Prisma, OpenAI, Anthropic, Express, and similar), set `mono: true` on the `STACK_LOGOS` entry. Mono icons render through a CSS mask filled with the theme foreground color, so they stay legible in both light and dark mode. Use Simple Icons for mono entries (single-path glyphs mask cleanly); the hex in a mono URL is irrelevant because the mask only uses the shape's alpha.
- Colored, multi-tone logos (TypeScript, WordPress, Gemini, Python, React, etc.) render as plain `<img>` and should NOT use `mono`.

### Recruiter alias matching

When a new skill is commonly written under other names in job descriptions (for example "K8s" for Kubernetes, "TS" for TypeScript), add an entry to `SKILL_ALIASES` in `src/data/resume.ts` so the JD matcher catches the variants. Keep aliases conservative: only true synonyms, not adjacent technologies.

## House style

- No em dashes (`—`) anywhere: code, copy, comments, commit messages, PR text. Use periods, colons, commas, parentheses, semicolons, or hyphens for ranges.
- No user-facing dev-pipeline language (no "coming soon (phase 2)", "mocked", "TODO", "placeholder" in rendered strings). Engineering notes belong in code comments, not in the product UI.
- Do not add Claude / AI attribution to commits, PRs, or code.
