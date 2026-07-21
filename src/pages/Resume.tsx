import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import { motion } from "motion/react";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HiddenLogo } from "@/components/HiddenLogo";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/data/contact";
import {
  bulletText,
  RESUME_AI_AUTOMATION,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_SKILL_GROUPS,
  RESUME_SUMMARY,
  RESUME_TITLE,
  SKILL_ALIASES,
} from "@/data/resume";

const RESUME_DOC_URL =
  "https://docs.google.com/document/d/e/2PACX-1vRfdIHdAWejpgus26nIsJivmq89aSn-vc0AMtdpXXLi-pXlWftU8U5iIGllCAFjk-uCtEEjmRMibZNV/pub";

// Locally-built PDF served from public/. Source of truth is
// resume-drafts/resume.md; regenerate via `npm run build:resume`.
const RESUME_PDF_URL = "/Tanner_Monaco_Resume.pdf";

function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function skillMatchesJd(skill: string, jd: string) {
  const variants = [skill, ...(SKILL_ALIASES[skill] ?? [])];
  return variants.some((variant) =>
    new RegExp(`\\b${escapeRegex(variant)}\\b`, "i").test(jd),
  );
}

const TOTAL_SKILLS = RESUME_SKILL_GROUPS.reduce(
  (sum, group) => sum + group.skills.length,
  0,
);

// Tech terms commonly seen in JDs that are NOT in Tanner's stack. If the JD
// mentions any of these, we don't trigger the "Perfect Fit" celebration
// since there's a real gap to talk about.
const COMMON_GAPS = [
  "Go", "Golang", "Rust", "Java", "C++", "C#", "Ruby", "Scala", "Kotlin",
  "Swift", "Elixir", "Erlang", "Haskell", "Clojure",
  "Angular", "Svelte", "Solid", "Ember",
  "GraphQL", "gRPC",
  "Redis", "Cassandra", "DynamoDB", "Elasticsearch", "Neo4j",
  "Kafka", "RabbitMQ", "NATS",
  "Terraform", "Ansible", "Pulumi", "CloudFormation",
  "Spring", "Spring Boot", ".NET", "Rails", "FastAPI",
  "iOS", "Android", "React Native", "Flutter",
  "Salesforce", "SAP",
];

const PERFECT_FIT_MIN_MATCHES = 3;

export function Resume() {
  const posthog = usePostHog();
  const navigate = useNavigate();
  const [jdText, setJdText] = useState("");
  const trimmedJd = jdText.trim();
  const jdTrackedRef = useRef(false);

  const matchedSkills = useMemo(() => {
    const matched = new Set<string>();
    if (!trimmedJd) return matched;
    for (const group of RESUME_SKILL_GROUPS) {
      for (const skill of group.skills) {
        if (skillMatchesJd(skill, trimmedJd)) matched.add(skill);
      }
    }
    return matched;
  }, [trimmedJd]);

  // For each matched skill, find the exact term in the JD that triggered the
  // match (so we can show the recruiter what was found in their own words,
  // e.g. "K8s" instead of "Kubernetes").
  const matchedTerms = useMemo(() => {
    if (!trimmedJd) return [] as { skill: string; jdTerm: string }[];
    const result: { skill: string; jdTerm: string }[] = [];
    for (const group of RESUME_SKILL_GROUPS) {
      for (const skill of group.skills) {
        const variants = [skill, ...(SKILL_ALIASES[skill] ?? [])];
        for (const variant of variants) {
          const re = new RegExp(`\\b${escapeRegex(variant)}\\b`, "i");
          const m = trimmedJd.match(re);
          if (m) {
            result.push({ skill, jdTerm: m[0] });
            break;
          }
        }
      }
    }
    return result;
  }, [trimmedJd]);

  const gaps = useMemo(() => {
    if (!trimmedJd) return [] as string[];
    return COMMON_GAPS.filter((gap) =>
      new RegExp(`\\b${escapeRegex(gap)}\\b`, "i").test(trimmedJd),
    );
  }, [trimmedJd]);

  const isPerfectFit =
    trimmedJd.length > 0 &&
    matchedSkills.size >= PERFECT_FIT_MIN_MATCHES &&
    gaps.length === 0;

  const extras = TOTAL_SKILLS - matchedSkills.size;

  const handleJdChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setJdText(val);
      if (!jdTrackedRef.current && val.trim().length > 0) {
        jdTrackedRef.current = true;
        posthog?.capture("resume_jd_pasted", {
          jd_length: val.trim().length,
        });
      }
      if (val.trim().length === 0) {
        jdTrackedRef.current = false;
      }
    },
    [posthog],
  );

  function handleSendJd() {
    posthog?.capture("resume_jd_sent_to_contact", {
      matched_skills_count: matchedSkills.size,
      gap_count: gaps.length,
      is_perfect_fit: isPerfectFit,
      jd_length: trimmedJd.length,
    });
    navigate("/contact", {
      state: {
        jd: trimmedJd,
        matchedSkills: Array.from(matchedSkills),
        totalSkills: TOTAL_SKILLS,
      },
    });
  }

  return (
    <div className="container-page py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Resume
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Tanner Monaco</h1>
          <p className="mt-2 text-lg text-muted-foreground">{RESUME_TITLE}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <a href={RESUME_DOC_URL} target="_blank" rel="noopener noreferrer">
              Open in Google Docs <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild>
            <a
              href={RESUME_PDF_URL}
              download="Tanner_Monaco_Resume.pdf"
              onClick={() => posthog?.capture("resume_pdf_downloaded")}
            >
              <Download className="mr-1 h-4 w-4" /> Download PDF
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {CONTACT.location}
        </span>
        <a
          href={CONTACT.phoneHref}
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Phone className="h-4 w-4" />
          {CONTACT.phone}
        </a>
        <a
          href={CONTACT.emailHref}
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Mail className="h-4 w-4" />
          {CONTACT.email}
        </a>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-14 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        {RESUME_SUMMARY}
      </motion.p>

      <AnimatedSection>
        <section className="mb-14">
          <SectionHeading eyebrow="01" title="Experience" />
          <ol className="relative space-y-10 border-l border-border pl-8 md:pl-10">
            {RESUME_EXPERIENCE.map((role, i) => (
              <AnimatedSection
                key={`${role.company}-${role.start}`}
                delay={i * 0.05}
                direction="left"
              >
                <li className="relative">
                  <span className="absolute -left-[42px] flex h-4 w-4 items-center justify-center md:-left-[50px]">
                    <span className="absolute h-4 w-4 rounded-full bg-primary/20" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {role.start} - {role.end} · {role.location}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold">
                    {role.title}{" "}
                    <span className="text-muted-foreground">
                      · {role.company}
                    </span>
                  </h3>
                  <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed max-w-3xl">
                    {role.bullets.map(bulletText).map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-14">
          <SectionHeading
            eyebrow="02"
            title={RESUME_AI_AUTOMATION.heading}
          />
          <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
            {RESUME_AI_AUTOMATION.body}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {RESUME_AI_AUTOMATION.applications.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.05} direction="up">
                <div className="h-full rounded-lg border border-border bg-background p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-14">
          <SectionHeading eyebrow="03" title="Skills" />

          <div className="mb-6 rounded-lg border border-border bg-background p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="jd-input"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Recruiter? Paste your job description
                <HiddenLogo id="resume" size={11} />
              </label>
              {trimmedJd && (
                <button
                  type="button"
                  onClick={() => setJdText("")}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear job description"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Drop in the JD and I'll highlight the skills below where my
              expertise fits the role.
            </p>
            <textarea
              id="jd-input"
              value={jdText}
              onChange={handleJdChange}
              placeholder="Paste the job description here…"
              className={cn(
                "min-h-[120px] w-full resize-y rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2",
                isPerfectFit
                  ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-input focus:ring-ring",
              )}
            />
            {trimmedJd && (
              <div className="mt-4 space-y-3">
                <FitBar
                  matchedTerms={matchedTerms}
                  gapTerms={gaps}
                  isPerfectFit={isPerfectFit}
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {isPerfectFit ? (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        <span className="text-foreground">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            Perfect Fit.
                          </span>{" "}
                          I match all{" "}
                          <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                            {matchedSkills.size}
                          </span>{" "}
                          skills you've listed. You should{" "}
                          <em className="font-semibold text-emerald-600 dark:text-emerald-400">
                            definitely
                          </em>{" "}
                          send me this.
                        </span>
                      </motion.p>
                    ) : matchedSkills.size + gaps.length > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-mono font-semibold text-red-500">
                          {matchedSkills.size}
                        </span>{" "}
                        of {matchedSkills.size + gaps.length} skills in your
                        JD match my stack. I bring{" "}
                        <span className="font-mono font-semibold text-foreground">
                          {extras}
                        </span>{" "}
                        more on top.
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No tech terms detected in your JD yet.
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSendJd}
                    className={cn(
                      "flex-shrink-0",
                      isPerfectFit &&
                        "bg-emerald-500 text-white hover:bg-emerald-600",
                    )}
                  >
                    <Send className="mr-1 h-4 w-4" /> Send this to me
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {RESUME_SKILL_GROUPS.map((group) => (
              <div
                key={group.label}
                className="rounded-lg border border-border bg-background p-5"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const isMatched = matchedSkills.has(skill);
                    return (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={cn(
                          "transition-colors",
                          isMatched &&
                            !isPerfectFit &&
                            "border-red-500 bg-red-500 text-white hover:bg-red-600",
                          isMatched &&
                            isPerfectFit &&
                            "border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600",
                        )}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-4">
          <SectionHeading eyebrow="04" title="Education" />
          <div className="grid gap-4 md:grid-cols-2">
            {RESUME_EDUCATION.map((edu) => (
              <div
                key={`${edu.school}-${edu.date}`}
                className="rounded-lg border border-border bg-background p-5"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {edu.date}
                </p>
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                <p className="mt-1 text-muted-foreground">
                  {edu.credential}
                  {edu.detail ? ` · ${edu.detail}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

// Caution-tape stripe pattern in red — for sections of the bar where the JD
// asks for something Tanner doesn't have.
const STRIPE_STYLE: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, #ef4444 0 6px, #7f1d1d 6px 12px)",
};

function FitBar({
  matchedTerms,
  gapTerms,
  isPerfectFit,
}: {
  matchedTerms: { skill: string; jdTerm: string }[];
  gapTerms: string[];
  isPerfectFit: boolean;
}) {
  if (matchedTerms.length === 0 && gapTerms.length === 0) return null;

  const matchedColor = isPerfectFit ? "bg-emerald-500" : "bg-red-500";

  return (
    <div className="flex flex-wrap gap-[3px]">
      {matchedTerms.map((term, i) => (
        <div
          key={`m-${i}`}
          title={`Matches ${term.skill}`}
          className={cn(
            "flex h-7 min-w-[60px] flex-1 items-center justify-center rounded-sm px-2 transition-colors",
            matchedColor,
          )}
        >
          <span className="truncate font-mono text-xs font-medium text-white">
            {term.jdTerm}
          </span>
        </div>
      ))}
      {gapTerms.map((gap, i) => (
        <div
          key={`g-${i}`}
          title={gap}
          className="relative flex h-7 min-w-[60px] flex-1 items-center justify-center overflow-hidden rounded-sm"
          style={STRIPE_STYLE}
        >
          <div className="absolute inset-1 rounded-[2px] bg-background" />
          <span className="relative z-10 truncate px-2 font-mono text-xs font-medium text-foreground">
            {gap}
          </span>
        </div>
      ))}
    </div>
  );
}
