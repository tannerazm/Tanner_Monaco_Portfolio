export interface ResumeExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface ResumeEducation {
  school: string;
  credential: string;
  detail?: string;
  date: string;
}

export interface ResumeSkillGroup {
  label: string;
  skills: string[];
}

export const RESUME_TITLE = "Full Stack Software Engineer";

export const RESUME_SUMMARY =
  "Full-stack engineer who cares more about how software feels to use than how cleverly it was built. I want the apps I ship to feel inspiring, not just functional, and my proudest work is always the feature a user noticed, used, and came back to. Underneath, my approach pairs strong engineering fundamentals and best practices with AI as a development partner, producing technically sound code and infrastructure at high velocity. Currently building AI-powered products at Repify Ai with that bar in mind. Outside of Repify Ai, I lead engineering on Admin App, a roster-aware social publishing tool for athletic departments built on a two-person team with Addison driving product and design.";

export interface ResumeAiSection {
  heading: string;
  body: string;
  applications: { label: string; description: string }[];
}

export const RESUME_AI_AUTOMATION: ResumeAiSection = {
  heading: "AI & Automation",
  body: "Scaling a company doesn't always mean hiring. It often means making the team you have move faster, more reliably, with fewer handoffs. I treat AI as a layer woven through the entire engineering org, not a side experiment. The result is shorter cycle times, lower review and triage overhead, and senior bandwidth freed for the work only humans should be doing.",
  applications: [
    {
      label: "CI/CD",
      description:
        "AI-driven pipeline checks and deployment automation that catch regressions and config drift before they reach review.",
    },
    {
      label: "Code generation",
      description:
        "AI-assisted development across React, Python/Django, and PHP/Laravel codebases. Used as a force multiplier on real production work, not toy demos.",
    },
    {
      label: "Code review",
      description:
        "AI-powered PR reviews that triage style, obvious bugs, and missed edge cases before a human reviewer burns cycles, so senior engineers focus on architecture and intent.",
    },
    {
      label: "Project management",
      description:
        "Automated Monday epic and ticket generation from specs, meeting notes, and customer threads. Turns conversation into actionable, well-scoped work.",
    },
    {
      label: "Agent integration",
      description:
        "Intelligent agents shipped as product features at Repify Ai to automate complex domain decisions inside the application itself.",
    },
  ],
};

// Recruiter JD-matcher: maps a canonical skill name to alternate spellings/abbreviations
// commonly seen in job descriptions, so the matcher catches "K8s" → "Kubernetes",
// "Postgres" → "PostgreSQL", etc. Intentionally conservative: only true aliases, not
// adjacent technologies (e.g. don't alias "Terraform" under IaC; that implies a
// claim we haven't made).
export const SKILL_ALIASES: Record<string, string[]> = {
  "React.js": ["React", "ReactJS"],
  "Next.js": ["NextJS", "Next"],
  TypeScript: ["TS"],
  JavaScript: ["JS"],
  Kubernetes: ["K8s"],
  PostgreSQL: ["Postgres"],
  Prisma: ["Prisma ORM"],
  MongoDB: ["Mongo"],
  "AWS (incl. Cognito)": ["AWS", "Amazon Web Services", "AWS Cognito", "Cognito"],
  "Infrastructure as Code (IaC)": ["IaC", "IAC", "Infrastructure-as-Code", "Infrastructure as Code"],
  Tailwind: ["Tailwind CSS", "TailwindCSS"],
  "Yardi/RentCafe": ["Yardi", "RentCafe", "Rent Cafe"],
  "Vue.js": ["Vue", "VueJS"],
  "Promise Handling": ["Promises", "async/await"],
  OAuth: ["OAuth2", "OAuth 2.0"],
  "Multi-tenant Architecture (RBAC)": [
    "RBAC",
    "Role-Based Access Control",
    "Multi-tenant",
    "Multi-tenancy",
  ],
  Anthropic: ["Claude", "Claude API"],
  OpenAI: ["GPT", "ChatGPT", "GPT-4", "OpenAI API"],
  Gemini: ["Google Gemini"],
};

export const RESUME_SKILL_GROUPS: ResumeSkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind",
      "Vue.js",
      "Filament",
      "WordPress",
      "Twig",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Python",
      "Django",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Laravel",
      "PHP",
      "JavaScript",
      "CraftCMS",
      "MySQL",
      "Eloquent",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    skills: [
      "AWS (incl. Cognito)",
      "Infrastructure as Code (IaC)",
      "Terraform",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    label: "AI",
    skills: ["Anthropic", "OpenAI", "Gemini"],
  },
  {
    label: "Web Development",
    skills: [
      "Git",
      "OAuth",
      "Multi-tenant Architecture (RBAC)",
      "Promise Handling",
      "GuzzleHttp",
      "AJAX",
      "JSON",
      "SaaS",
    ],
  },
  {
    label: "Property Management Software",
    skills: ["Yardi/RentCafe", "Entrata", "RealPage", "Fortress"],
  },
];

export const RESUME_EXPERIENCE: ResumeExperience[] = [
  {
    company: "Repify Ai",
    title: "Full Stack Software Engineer",
    location: "Remote",
    start: "07/2025",
    end: "Present",
    bullets: [
      "Build and ship AI-powered compensation software for the beverage industry on a Python, Django + MongoDB, and React stack (containerized with Docker, orchestrated on Kubernetes, and deployed to AWS via infrastructure-as-code), working across the full stack to deliver performant, user-centric features.",
      "Designed and built the company's entire Stripe payments architecture from scratch (products, pricing, subscriptions, webhooks, customer lifecycle, and reconciliation), establishing the billing foundation for an early-stage startup with no prior payments infrastructure.",
      "Design scalable APIs and backend logic using Django REST framework and MongoDB to support salary modeling, reporting, and workflow automation.",
      "Develop modular, reusable UI components with React.js and Tailwind CSS, optimizing performance, responsiveness, and accessibility.",
      "Integrate intelligent agent frameworks into product features to automate complex decision-making processes.",
      "Collaborate cross-functionally with design and product to iterate quickly in an Agile environment, contributing to both technical architecture and product UX.",
    ],
  },
  {
    company: "Resi",
    title: "Full Stack Software Engineer",
    location: "Remote",
    start: "03/2023",
    end: "07/2025",
    bullets: [
      "Developed and maintained scalable web applications, seamlessly integrating backend (PHP, Laravel, Eloquent) with frontend (Vue.js, Twig, Filament) to optimize performance and user experience.",
      "Architected and optimized database structures to improve query efficiency, maintainability, and data integrity, ensuring smooth application performance at scale.",
      "Built and managed robust API integrations with major Property Management Systems like Yardi, Entrata, RealPage, and Fortress, enabling automated data synchronization and enhanced functionality.",
      "Designed and implemented custom solutions in WordPress, Laravel, and CraftCMS, tailoring applications to meet unique business needs while improving maintainability and extensibility.",
    ],
  },
  {
    company: "Fullstack Academy",
    title: "Software Engineering Instructor",
    location: "Remote",
    start: "12/2022",
    end: "03/2023",
    bullets: [
      "Instructed and mentored students in a full-time PERN (PostgreSQL, Express.js, React, Node.js) stack program.",
      "Provided technical guidance on projects, debugging strategies, and best coding practices.",
      "Led students in building an e-commerce web application as a capstone project.",
      "Conducted mock technical interviews to prepare students for job placements.",
    ],
  },
];

export const RESUME_EDUCATION: ResumeEducation[] = [
  {
    school: "University of Oklahoma",
    credential: "Bachelor of Business Administration",
    detail: "3.4 GPA",
    date: "05/2017",
  },
  {
    school: "Fullstack Academy",
    credential: "Software Engineering Certificate",
    date: "08/2022",
  },
];
