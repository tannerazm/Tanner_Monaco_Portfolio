---
name: update-resume
description: Update Tanner's resume by editing the site data it is generated from, then regenerate the one-page PDF.
---

# update-resume

Updates the resume. The user invokes this for resume copy changes: "add a bullet about Stripe to Repify", "soften the summary", "put the portfolio site on there".

## How the resume system actually works

**Single source of truth: `src/data/`.** The same files the website renders are the files the PDF is built from. There is no separate resume document to keep in sync.

- `src/data/resume.ts` : summary, title, experience, skills, education
- `src/data/projects.ts` : the projects, including the resume-sized `resumeLine`
- `src/data/contact.ts` : name, phone, email, location, site, socials

Flow:

```
src/data/*.ts
  -> scripts/lib/render-resume-markdown.mjs   (pure: data -> markdown)
  -> resume-drafts/resume.md                  (GENERATED, never hand-edit)
  -> resume-drafts/resume.pdf                 (md-to-pdf + resume.config.cjs)
  -> public/Tanner_Monaco_Resume.pdf          (what the site serves)
```

Run it with `npm run build:resume`.

`resume-drafts/resume.md` is output, not input. It carries a "do not edit by hand" banner. Editing it does nothing: the next build overwrites it.

`package.json` has a `prebuild` hook, so `npm run build` regenerates the PDF. It is skipped on Netlify/CI (no Chrome there), so the committed `public/Tanner_Monaco_Resume.pdf` is what ships. Commit the regenerated PDF.

## Site says one thing, PDF says another

The website has room the one-page PDF does not. Three escape hatches exist so this never becomes two copies of the resume:

1. **Bullets** (`ResumeBullet` in `src/data/resume.ts`):
   - `"plain string"` : same text both places
   - `{ text, pdf: "tighter..." }` : long on the site, tight on the PDF
   - `{ text, pdf: null }` : on the site, off the PDF

   To merge two site bullets into one PDF bullet, put the merged wording in one bullet's `pdf` and set `pdf: null` on the other.

2. **Summary**: `RESUME_SUMMARY` (site) and `RESUME_SUMMARY_PDF` (resume). Same voice, same claims, roughly half the words. Change one, change the other.

3. **Skill groups**: `pdfLabel` merges several site groups onto one PDF line. "Web Development" and "Property Management Software" both carry `pdfLabel: "Tools & Domains"`.

Projects use `resumeLine` on the `Project` for a tight resume line; the build falls back to `tagline` if it is missing. `RESUME_PDF_PROJECT_SLUGS` in `src/data/resume.ts` picks which projects appear, and in what order.

## Hard conventions (do not violate)

- **NO em dashes or en dashes** anywhere. Use periods, commas, colons, parens, semicolons, or hyphens. The build fails on them, but do not rely on that; write it right the first time.
- **One page, with headroom.** The build measures the rendered height and FAILS if the resume runs over OR fits with under 12px to spare (Chrome spills to page 2 at zero headroom). It prints how many lines you are over. Trim copy in `src/data/` first; reach for `resume-drafts/resume.config.cjs` only after that.
- **Brand**: name displayed as `Tanner.Monaco` with red period (`#841617` / `--primary`). Don't change branding.
- **Contact info** lives only in `src/data/contact.ts`. Don't fabricate or change it without asking.
- **Skills and icons stay in sync.** Adding a skill to `RESUME_SKILL_GROUPS` means adding its icon to `STACK_LOGOS` in `src/pages/Home.tsx`, unless no good icon exists (see the exception list in the root `CLAUDE.md`). Removing a skill means removing its `SKILL_ALIASES` entry too.

## Steps to run every time

1. Edit the data in `src/data/`. Never `resume-drafts/resume.md`.
2. `npm run build:resume` : regenerates markdown and PDF, and fails loudly if it no longer fits.
3. `npm test` : pins what lands on the resume versus what stays on the site.
4. `npm run typecheck`.
5. Show the user `git diff` / `git status`, confirm the PDF regenerated and still fits, and give a one-line summary of what changed.
6. **STOP.** Do NOT commit or push automatically. The user reviews wording before it goes live.
7. On approval: `git add -A`, commit with a descriptive message, push. No Claude/AI attribution in the commit. Netlify auto-deploys; the live PDF updates in ~2 minutes.

## Common pitfalls

- **Editing `resume-drafts/resume.md`.** It is generated. Your edit will vanish on the next build. Edit `src/data/`.
- **Forgetting the PDF is committed.** CI cannot regenerate it (no Chrome). If you change resume data and do not commit the regenerated `public/Tanner_Monaco_Resume.pdf`, the live download stays stale.
- **Adding a long bullet and shipping a 2-page resume.** The build catches this now, but only if you actually run it.
- **Touching the site copy when the user only asked about the resume.** Because the two share a source, a wording change hits both by default. If the user wants it on the resume only, that is what the `pdf` override is for. If unsure, ASK.
- **Leaving a dangling `SKILL_ALIASES` entry** after removing a skill from `RESUME_SKILL_GROUPS`.

## File map quick reference

| Purpose | File |
|---|---|
| Resume data (source of truth) | `src/data/resume.ts` |
| Projects data | `src/data/projects.ts` |
| Contact info | `src/data/contact.ts` |
| Data to markdown (pure, tested) | `scripts/lib/render-resume-markdown.mjs` |
| Tests for the above | `scripts/lib/render-resume-markdown.test.mjs` |
| Build script | `scripts/build-resume.mjs` |
| Generated markdown | `resume-drafts/resume.md` |
| PDF styling config | `resume-drafts/resume.config.cjs` |
| Generated PDF (committed) | `public/Tanner_Monaco_Resume.pdf` |
| Portfolio resume page | `src/pages/Resume.tsx` |
| Portfolio home blurb | `src/pages/Home.tsx` |
