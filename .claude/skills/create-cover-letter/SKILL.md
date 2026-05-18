---
name: create-cover-letter
description: Draft a tailored cover letter from a job description. Researches the company, department, and industry first, saves the sources, then writes the letter and generates a one-page PDF using the shared cover-letter config.
---

# create-cover-letter

Drafts a fresh cover letter for a specific application. Pairs Tanner's existing engineering story (AI-augmented workflow, concrete shipped products at Repify Ai and Resi, communication background from Fullstack Academy) with research-driven tailoring for the company and role. Saves the research sources alongside the letter so Tanner can review citations and learn more about the company later.

## Required input

The user MUST provide the full job description text. If they haven't, ASK before doing anything else:

> "Paste the full job description for me to work from."

Do not draft a cover letter from a URL alone, a job title alone, or vibes. The JD has the actual responsibilities, requirements, perks, tone, and language the cover letter needs to reflect. If the user has only a URL, fetch it first with WebFetch and confirm with them that the extracted text matches the role they're applying to before continuing.

## Step 1: extract from the JD

From the JD, identify and note (do not show this in chat unless the user asks; just use it internally):
- Company name (full + a short form)
- Role title
- Team / department / org (e.g., "Streaming & Media Engineering", "Platform Infra", "Core ML")
- Required stack and tools
- Bonus / nice-to-have skills
- Tone signals (formal vs. casual, mission language, perks emphasis)
- Salary range if listed
- Location

Derive a folder slug from the company name. Slug rules: lowercase, kebab-case, alphanumeric + hyphens only, short. Examples: `mlb`, `google-cloud`, `acme-corp`, `stripe`. If two slugs could fit (e.g. `google` vs `google-cloud`), ASK the user to confirm which one to use, especially if they might apply to multiple teams at the same parent company.

Confirm the slug to the user once before creating files: a single sentence like "I'll save this under `<slug>/`. Sound right?" so they can correct typos before content lands on disk.

## Step 2: research

Run research in parallel on the topics that exist for this application. Use WebSearch + WebFetch directly for focused lookups, or delegate to a `general-purpose` Agent for multi-source synthesis. 3 to 5 searches per topic is enough; do not go fishing for hours.

Topics:
- **Company** (always): mission, products, recent news (last ~6 months), engineering culture, public values, anything they brag about on their careers page or engineering blog.
- **Department / team** (if specific enough to research): what they own, public-facing initiatives, tech blog posts, conference talks, GitHub orgs they publish under.
- **Industry** (only if it adds context the cover letter should reflect): market position, recent shifts, why this kind of work matters now. Skip for industries the user is already inside (e.g. SaaS, AI tooling) unless the JD signals a specific niche.

Save findings as markdown to `resume-drafts/cover-letters/<slug>/sources/`:
- `sources/company.md` (always)
- `sources/department.md` (if applicable)
- `sources/industry.md` (if applicable)

Each file should follow this template:

```md
# <Topic> Research

## Summary
<2-4 paragraph synthesis of what was learned. Plain English. No bullet point dumps.>

## Hooks for the cover letter
- <specific hook 1, e.g. "lean on infra reliability angle since they just launched live event streaming">
- <specific hook 2>
- <specific hook 3>

## Citations
- [Page title](https://full-url) - one-line note on what's there
- [Page title](https://full-url) - one-line note on what's there
```

Citations are non-negotiable. The user wants to skim these later for citation and learning, so include every URL that contributed to the synthesis. If a piece of info was inferred from multiple sources, list all of them.

## Step 3: draft the cover letter

Path: `resume-drafts/cover-letters/<slug>/cover-letter.md`.

### Header (always identical)

```md
# Tanner Monaco
(303) 472-9342 &nbsp;|&nbsp; tannermonaco@gmail.com &nbsp;|&nbsp; Stillwater, OK<br>
[linkedin.com/in/tannerazm](https://www.linkedin.com/in/tannerazm/) &nbsp;|&nbsp; [github.com/tannerazm](https://github.com/tannerazm)

<today's date in "Month D, YYYY" format>

**<Team / Department>**
<Company Name>

Dear <Salutation, e.g. "MLB Streaming & Media Engineering Team" or "Stripe Hiring Team">,
```

Pull today's date from the system context (e.g., the `currentDate` field in CLAUDE.md context). Do not hardcode dates from prior runs.

### Body (5 to 6 paragraphs, ~500 to 550 words, must fit one Letter page)

1. **Opening hook** tied to the company / product / role specifically. Use a research finding here. That's what makes this tailored vs. generic. Reference something the reader will recognize from their own work, not boilerplate flattery.
2. **AI workflow + concrete builds**. Lead with a single sentence about pairing strong engineering fundamentals with AI as core infrastructure (not a side experiment). Then concrete proof: Repify Ai stack (Python/Django + MongoDB + React on Docker/K8s/AWS via IaC + Terraform), Stripe payments architecture from scratch, GetGuten end-to-end (Claude-powered AI content tool that became a standalone product candidate).
3. **AI workflow specifics + how they map to this role**. Cover Tanner's SDLC playbook: AI-driven CI/CD pipeline checks, AI-assisted code generation across stacks, AI-powered PR reviews, automated Monday epic and ticket generation from specs and meeting notes, intelligent agents shipped as actual product features. Then bridge to *this* company's domain using a research finding (e.g., "the same playbook maps onto X").
4. **Communication paragraph**. Fullstack Academy PERN bootcamp instructor, mentored students through capstones, ran mock technical interviews, daily Agile collaboration with design / product / engineering at Repify Ai. Tie this to specific responsibilities the JD names (design reviews, code reviews, mentoring, postmortems, etc.).
5. **Honest gap acknowledgment** (only if a real gap exists). Frame as a ramp story, not a disqualifier. Examples: language/framework mismatch, domain unfamiliarity, lower years of experience than asked. Skip this paragraph entirely if there's no real gap to address.
6. **Close** with a personal hook (passion for the domain, real fandom or interest if it exists, never invented) and a "would love to talk" line. Sign off:

   ```md
   Best,<br>
   Tanner Monaco
   ```

### Voice

Direct, builder-focused, confident without bragging. Match the tone of `src/data/resume.ts` `RESUME_SUMMARY` and `src/pages/Home.tsx` hero blurb. Read those before drafting if you need calibration.

## Step 4: generate the PDF

Run:

```
npm run build:cover-letter -- <slug>
```

This uses `resume-drafts/cover-letters/cover-letter.config.cjs` (shared config, lives at the cover-letters root). Output: `resume-drafts/cover-letters/<slug>/Tanner_Monaco_Cover_Letter_<slug>.pdf`.

If the build fails, check that `cover-letter.md` exists at `resume-drafts/cover-letters/<slug>/cover-letter.md` and that the config file is still at the expected path.

Open the PDF (`open <pdf path>`) so the user can visually verify it before reviewing.

## Step 5: show the user and stop

Show:
- The final folder tree (`ls -R resume-drafts/cover-letters/<slug>/`)
- A short summary of what came out of research (one or two sentences per topic, plus which hooks ended up in the cover letter)
- The cover letter draft inline in chat (full text, so the user can read without opening the file)
- Confirmation the PDF generated and is open in Preview
- A note that everything in `cover-letters/<slug>/` is gitignored and stays local

Then **STOP**. Do not commit or push automatically. Wait for the user to review the cover letter, the research notes, and the PDF.

The cover letter content (the slug folder) is gitignored. If only `cover-letters/<slug>/` content was created and no shared tooling changed, there is nothing to commit. Tell the user explicitly: "Nothing committable from this run, the cover letter and research stay local. The PDF for the application is at `<path>`."

## Hard conventions (do not violate)

- **NO em dashes (the U+2014 character) or en dashes (U+2013)** in markdown, scripts, or commit messages. Use periods, commas, colons, parens, semicolons, or hyphens depending on context. Run `grep -n '—\|–' resume-drafts/cover-letters/<slug>/cover-letter.md resume-drafts/cover-letters/<slug>/sources/*.md` before showing the user. If anything matches, fix and re-grep.
- **One page**. The PDF must fit on one Letter page. Trim if it spills (cut the gap paragraph first, then trim the AI workflow specifics, then tighten the opening).
- **No fabrication**. Don't claim experience the user doesn't have. Don't claim fandom or domain affinity if there's no signal. Acknowledge gaps honestly.
- **Match the user's voice**. If the draft sounds like generic recruiter prose, rewrite it.
- **Don't bury the AI workflow story**. It's the user's strongest differentiator and they want it featured in every cover letter.
- **Sources go in `sources/`, not the folder root**. Keep the slug folder root clean: just `cover-letter.md`, the generated PDF, and the `sources/` subfolder.
- **Cite every URL**. Do not paraphrase web content without listing the source.

## File map

| Purpose | Path |
|---|---|
| Per-application folder | `resume-drafts/cover-letters/<slug>/` |
| Cover letter source | `resume-drafts/cover-letters/<slug>/cover-letter.md` |
| Cover letter PDF | `resume-drafts/cover-letters/<slug>/Tanner_Monaco_Cover_Letter_<slug>.pdf` |
| Research notes | `resume-drafts/cover-letters/<slug>/sources/` |
| Shared PDF styling config | `resume-drafts/cover-letters/cover-letter.config.cjs` |
| Build script | `scripts/build-cover-letter.mjs` |
| npm command | `npm run build:cover-letter -- <slug>` |

## Reference: existing example

If `resume-drafts/cover-letters/mlb/` exists locally, that's an example of the expected output for a real application. Mirror its structure but rewrite the content for the new role using fresh research. Do not copy-paste prose from it; the cover letter should sound like it was written for the new company specifically.
