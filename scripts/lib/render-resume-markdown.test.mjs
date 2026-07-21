import { describe, expect, it } from "vitest";
import {
  linkLabel,
  mergeSkillGroups,
  pdfBullets,
  renderResumeMarkdown,
  selectProjects,
} from "./render-resume-markdown.mjs";

// Small stand-in data. These tests pin the CONTRACT (what ends up on the
// resume and what does not), never the real resume copy, so rewording the
// actual resume must never turn them red.
const contact = {
  name: "Ada Lovelace",
  phone: "(555) 010-0000",
  email: "ada@example.com",
  location: "Somewhere, OK",
  site: "example.com",
  siteUrl: "https://example.com",
  linkedin: "https://www.linkedin.com/in/ada/",
  github: "https://github.com/ada",
};

const resume = {
  title: "Full Stack Software Engineer",
  summary: "Short summary.",
  skillGroups: [
    { label: "Frontend", skills: ["React"] },
    { label: "Web Development", pdfLabel: "Tools", skills: ["Git"] },
    { label: "Property Management", pdfLabel: "Tools", skills: ["Yardi"] },
  ],
  experience: [
    {
      company: "Acme",
      title: "Engineer",
      location: "Remote",
      start: "01/2020",
      end: "Present",
      bullets: [
        "Same on both.",
        { text: "Long site wording.", pdf: "Tight PDF wording." },
        { text: "Site only.", pdf: null },
      ],
    },
  ],
  education: [
    { school: "A University", credential: "BBA", detail: "3.4 GPA", date: "05/2017" },
    { school: "A Bootcamp", credential: "Certificate", date: "08/2022" },
  ],
};

const projects = [
  {
    slug: "Kept",
    name: "Kept App",
    liveUrl: "https://kept.example.com",
    date: "Jan 2026 - Present",
    tagline: "Long site tagline.",
    resumeLine: "Tight resume line.",
  },
  {
    slug: "NoResumeLine",
    name: "Fallback App",
    liveUrl: "https://fallback.example.com/",
    date: "2024",
    tagline: "Tagline used as the fallback.",
  },
  { slug: "Skipped", name: "Skipped App", liveUrl: "https://x.example.com", date: "2020", tagline: "Not on the resume." },
];

const render = (overrides = {}) =>
  renderResumeMarkdown({ contact, resume, projects: [], ...overrides });

describe("pdfBullets", () => {
  it("keeps a plain string as-is", () => {
    expect(pdfBullets(["Same on both."])).toEqual(["Same on both."]);
  });

  it("prefers the pdf rewrite over the site text", () => {
    expect(pdfBullets([{ text: "Long.", pdf: "Tight." }])).toEqual(["Tight."]);
  });

  it("drops bullets marked pdf: null", () => {
    expect(pdfBullets([{ text: "Site only.", pdf: null }])).toEqual([]);
  });

  it("falls back to text when pdf is absent", () => {
    expect(pdfBullets([{ text: "Only text." }])).toEqual(["Only text."]);
  });
});

describe("mergeSkillGroups", () => {
  it("merges groups that share a pdfLabel, in first-seen order", () => {
    expect(mergeSkillGroups(resume.skillGroups)).toEqual([
      { label: "Frontend", skills: ["React"] },
      { label: "Tools", skills: ["Git", "Yardi"] },
    ]);
  });

  it("does not mutate the input groups", () => {
    const groups = [{ label: "A", pdfLabel: "M", skills: ["one"] }, { label: "B", pdfLabel: "M", skills: ["two"] }];
    mergeSkillGroups(groups);
    expect(groups[0].skills).toEqual(["one"]);
  });
});

describe("linkLabel", () => {
  it("strips protocol, www, and a trailing slash", () => {
    expect(linkLabel("https://www.linkedin.com/in/ada/")).toBe("linkedin.com/in/ada");
    expect(linkLabel("https://github.com/ada")).toBe("github.com/ada");
  });
});

describe("selectProjects", () => {
  it("returns the named projects in the order requested", () => {
    expect(selectProjects(projects, ["NoResumeLine", "Kept"]).map((p) => p.slug)).toEqual([
      "NoResumeLine",
      "Kept",
    ]);
  });

  it("throws on a slug that is not in PROJECTS, rather than silently skipping it", () => {
    expect(() => selectProjects(projects, ["Nope"])).toThrow(/Nope/);
  });
});

describe("renderResumeMarkdown", () => {
  it("puts the site-only bullet on neither the PDF nor anywhere else", () => {
    const md = render();
    expect(md).toContain("Tight PDF wording.");
    expect(md).toContain("Same on both.");
    expect(md).not.toContain("Long site wording.");
    expect(md).not.toContain("Site only.");
  });

  it("includes every contact detail", () => {
    const md = render();
    for (const value of [contact.name, contact.phone, contact.email, contact.location, contact.siteUrl, contact.linkedin, contact.github]) {
      expect(md).toContain(value);
    }
  });

  it("omits the Projects section entirely when no projects are selected", () => {
    expect(render()).not.toContain("## Projects");
  });

  it("renders only the selected projects, and prefers resumeLine over tagline", () => {
    const md = render({ projects: selectProjects(projects, ["Kept", "NoResumeLine"]) });
    expect(md).toContain("## Projects");
    expect(md).toContain("Kept App");
    expect(md).toContain("Tight resume line.");
    expect(md).not.toContain("Long site tagline.");
    expect(md).toContain("Tagline used as the fallback."); // no resumeLine, so fall back
    expect(md).not.toContain("Skipped App");
  });

  it("emits every section heading in resume order", () => {
    const md = render({ projects: selectProjects(projects, ["Kept"]) });
    const headings = md.match(/^## .+$/gm);
    expect(headings).toEqual([
      "## Summary",
      "## Technical Skills",
      "## Experience",
      "## Projects",
      "## Education",
    ]);
  });

  it("never emits an em dash or en dash", () => {
    const md = render({ projects: selectProjects(projects, ["Kept", "NoResumeLine"]) });
    expect(md).not.toMatch(/[—–]/);
  });

  it("marks itself generated so nobody hand-edits the markdown", () => {
    expect(render()).toContain("scripts/build-resume.mjs");
  });
});
