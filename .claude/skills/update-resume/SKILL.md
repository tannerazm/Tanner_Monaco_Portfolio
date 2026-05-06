---
name: update-resume
description: Update Tanner's resume (markdown source + portfolio site copy) and regenerate the one-page PDF. Two modes, sync from portfolio or apply user instructions.
---

# update-resume

Updates the resume across all surfaces. The user invokes this when they want resume copy changes, either pulling fresh content out of the portfolio or applying a direct instruction (e.g. "add X to Repify Ai bullets", "soften the summary").

## How the resume system actually works

Single source of truth: `resume-drafts/resume.md`. Everything else flows from it.

- **PDF generation**: `npm run build:resume` runs `md-to-pdf` against `resume-drafts/resume.md` using `resume-drafts/resume.config.cjs` (margins/fonts tuned for one-page Letter), then copies output to `public/Tanner_Monaco_Resume.pdf`.
- **Auto-rebuild on deploy**: `package.json` has a `prebuild` script. `npm run build` automatically regenerates the PDF before Vite builds. Netlify deploys main branch, so every push refreshes the downloadable PDF.
- **Download link**: `src/pages/Resume.tsx` serves `/Tanner_Monaco_Resume.pdf` (self-hosted from `public/`, NOT a Google Docs export anymore).
- **Portfolio copy** lives in two places that must stay in sync with the markdown:
  - `src/data/resume.ts`: `RESUME_SUMMARY`, `RESUME_TITLE`, `RESUME_EXPERIENCE`, `RESUME_EDUCATION`, `RESUME_SKILL_GROUPS`, `RESUME_AI_AUTOMATION`
  - `src/pages/Home.tsx`: hero blurb (around line 136-143)

## Hard conventions (do not violate)

- **NO em dashes or en dashes** (the U+2014 and U+2013 characters) anywhere in markdown, TS, TSX, comments, or commit messages. Use periods, commas, colons, parens, semicolons, or hyphens depending on context. This applies to ALL files this skill touches.
- **One page**. The PDF must fit on one Letter page. If new content makes it spill, tighten margins in `resume-drafts/resume.config.cjs` or trim phrasing.
- **Brand**: name displayed as `Tanner.Monaco` with red period (`#841617` / `--primary`). Don't change branding.
- **Contact info**: phone (303) 472-9342, tannermonaco@gmail.com, Stillwater OK, linkedin.com/in/tannerazm, github.com/tannerazm. Don't fabricate or change these without asking.

## Modes

The user picks one. If unclear, ask which mode they want before doing anything.

### Mode A: sync from portfolio site

Trigger phrases: "sync from the site", "match the portfolio", "pull from the website", "make resume match home page".

What to do:
1. Read the canonical portfolio sources:
   - `src/data/resume.ts` (RESUME_SUMMARY, RESUME_EXPERIENCE bullets, education, skill groups)
   - `src/pages/Home.tsx` (hero blurb, "If you're hiring" section)
   - `src/data/projects.ts` if it exists (projects list, only relevant if user wants project highlights in resume)
2. Diff the portfolio content against `resume-drafts/resume.md`. Identify what's drifted.
3. Update `resume-drafts/resume.md` to match the portfolio. The portfolio is the source of truth in this mode.
4. Do NOT modify the portfolio TS/TSX files in this mode.

### Mode B: apply user instructions

Trigger phrases: a specific instruction like "add a bullet about Stripe to Repify", "tighten the summary", "remove the Fullstack Academy section", "change my title to X".

What to do:
1. Apply the user's instruction to `resume-drafts/resume.md`.
2. Decide if the change needs to mirror to the portfolio:
   - **Summary changes**: update `RESUME_SUMMARY` in `src/data/resume.ts` AND likely the hero blurb in `src/pages/Home.tsx` (Home blurb is a shorter/looser version of the summary, not a verbatim copy, use judgment).
   - **Experience bullet changes**: update matching bullets in `RESUME_EXPERIENCE` in `src/data/resume.ts`.
   - **Skill changes**: update `RESUME_SKILL_GROUPS` in `src/data/resume.ts`.
   - **Education / contact / title changes**: only the markdown unless the user explicitly says to update the portfolio.
3. If unsure whether to mirror, ASK before editing the portfolio files.

## Steps to run every time

After editing files (either mode):

1. **Regenerate PDF locally** to verify it still fits on one page and reads correctly:
   ```
   npm run build:resume
   ```
   If that fails, check that `md-to-pdf` is installed (it's in devDependencies) and that `resume-drafts/resume.config.cjs` is valid CommonJS. Don't fall back to npx without explaining why.

2. **If portfolio TS/TSX was edited**, run typecheck:
   ```
   npm run typecheck
   ```

3. **Show the user**:
   - The diff (`git diff` and `git status`)
   - Confirmation the PDF regenerated
   - A one-line summary of what changed

4. **STOP**. Do NOT commit or push automatically. Wait for the user to review and explicitly say "push", "commit", "ship it", etc. The user has told the skill they want to review wording before it goes live.

5. When they approve: stage everything (`git add -A`), commit with a descriptive message including the `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer, push to `main`. Netlify auto-deploys; the live site PDF and Download button update in ~2 minutes.

## Common pitfalls

- **Em dashes sneaking in**. The user has called this out repeatedly. Grep the diff for the U+2014 and U+2013 characters before showing it. If found, replace before reporting. A useful check: `grep -nE '[\xE2\x80\x93\xE2\x80\x94]' <files>` or simply `grep -n '—\|–' <files>`.
- **One-page overflow**. If `npm run build:resume` succeeds but content visually spills (you can't tell from CLI), warn the user and offer to tighten margins in `resume.config.cjs` or trim a bullet.
- **Mode B touching the portfolio without permission**. If the user says "update the resume to add X", that's only the markdown. Don't proactively edit `src/data/resume.ts` unless the change is summary-level (which clearly belongs on the home page too) or the user signaled portfolio sync.
- **Forgetting prebuild exists**. You don't need to do anything special to make Netlify rebuild the PDF, pushing the markdown change is enough. The `prebuild` hook in `package.json` handles regeneration on deploy. Local `npm run build:resume` is just for verification.
- **Google Docs URL drift**. The Download button no longer uses the Google Docs export endpoint. If you see `RESUME_PDF_URL` getting changed back to a `docs.google.com/document/d/.../export?format=pdf` URL, that's wrong; it should be `/Tanner_Monaco_Resume.pdf`.

## File map quick reference

| Purpose | File |
|---|---|
| Resume markdown source | `resume-drafts/resume.md` |
| PDF styling config | `resume-drafts/resume.config.cjs` |
| Generated PDF (committed) | `public/Tanner_Monaco_Resume.pdf` |
| PDF build script | `package.json` -> `build:resume` |
| Auto-rebuild hook | `package.json` -> `prebuild` |
| Portfolio resume page | `src/pages/Resume.tsx` |
| Portfolio resume data | `src/data/resume.ts` |
| Portfolio home blurb | `src/pages/Home.tsx` (lines ~136-143) |
| Contact info constants | `src/data/contact.ts` |
