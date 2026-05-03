# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Tanner Monaco portfolio. The project already had `posthog-js` installed with a provider, pageview tracking, and environment variable scaffolding. This integration extended that foundation with meaningful action-level events across four files: the contact form, resume page, project detail page, and egg hunt provider. Error exception capture was added to the contact form's catch block. Environment variables (`VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`) were written to `.env`.

| Event | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submitted the contact form (main conversion). Includes `has_jd`, `has_company`, `has_phone`, `matched_skills_count`. | `src/pages/Contact.tsx` |
| `contact_form_error` | Contact form submission failed (EmailJS error). Includes `error_detail`, `error_status`, `has_jd`. | `src/pages/Contact.tsx` |
| `resume_jd_pasted` | Recruiter pasted a job description into the JD highlighter (fires once per paste session). | `src/pages/Resume.tsx` |
| `resume_jd_sent_to_contact` | Recruiter clicked "Send this to me", navigating to the contact form with the JD attached. Includes `matched_skills_count`, `gap_count`, `is_perfect_fit`, `jd_length`. | `src/pages/Resume.tsx` |
| `resume_pdf_downloaded` | User clicked the Download PDF button on the resume page. | `src/pages/Resume.tsx` |
| `project_live_link_clicked` | User clicked "View live" on a project detail page. Includes `project_name`, `project_slug`, `project_url`. | `src/pages/ProjectDetail.tsx` |
| `egg_found` | User found a hidden TM logo. Includes `egg_id`, `eggs_found`, `eggs_remaining`. | `src/components/EggHuntProvider.tsx` |
| `egg_hunt_completed` | User found all 6 hidden logos and completed the egg hunt. | `src/components/EggHuntProvider.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics](https://us.posthog.com/project/407275/dashboard/1537689)
- **Contact conversion funnel** (JD pasted → JD sent → form submitted): [Lf7pcqkF](https://us.posthog.com/project/407275/insights/Lf7pcqkF)
- **Contact form submissions over time** (submitted vs errors): [fZnIWAfq](https://us.posthog.com/project/407275/insights/fZnIWAfq)
- **Resume engagement** (PDF downloads + JD pastes): [FNvcV5fd](https://us.posthog.com/project/407275/insights/FNvcV5fd)
- **Project live link clicks by project**: [UIxNdtS9](https://us.posthog.com/project/407275/insights/UIxNdtS9)
- **Egg hunt completions** (eggs found vs hunt completed): [PNdB7p1C](https://us.posthog.com/project/407275/insights/PNdB7p1C)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
