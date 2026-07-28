import AdminApp from "@/assets/projectpictures/Admin_App.png";
import Repify from "@/assets/projectpictures/Repify.png";
import GetGuten from "@/assets/projectpictures/GetGuten.png";
import Resi from "@/assets/projectpictures/Resi.png";
import TopSecretShirtsLA from "@/assets/projectpictures/TopSecretShirtsLA.jpg";
import FitnessTracker from "@/assets/projectpictures/FitnessTracker.png";
import StrangersThings from "@/assets/projectpictures/StrangersThings.png";
import UserHub from "@/assets/projectpictures/UserHub.png";
import TicTacToe from "@/assets/projectpictures/TicTacToe.png";
import Qwirty from "@/assets/projectpictures/Qwirty.jpg";

export interface Project {
  slug: string;
  name: string;
  image: string;
  liveUrl: string;
  date: string;
  stack: string[];
  tagline: string;
  description: string[];
  reference?: string;
  inDevelopment?: boolean;
  // One tight line for the Projects section of the one-page PDF. The site
  // tagline is written for a page with room to breathe and usually runs too
  // long for the resume. Only projects listed in RESUME_PDF_PROJECT_SLUGS
  // need this; the build falls back to `tagline` if it is missing.
  resumeLine?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "Team_App",
    name: "@Team App",
    image: AdminApp,
    liveUrl: "https://atteamapp.com",
    inDevelopment: true,
    date: "Apr 2026 - Present",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Claude API",
      "Tailwind CSS",
      "Docker",
    ],
    tagline:
      "AI-powered roster, scheduling, and social publishing for college athletic departments. Lead engineer on a two-person team, building on a current-generation Next.js and React stack.",
    resumeLine:
      "AI publishing and operations platform for college athletic departments. Lead engineer on a two-person team. Multi-tenant with four-tier permissions: rosters, scheduling with shift releases and pickups, QR equipment check-out, real-time chat, push notifications, and AI-drafted publishing to Facebook, Instagram, and X. Next.js 16, React 19, Prisma 7 on PostgreSQL, in-house auth (JWT, TOTP, passkeys), 100+ Jest tests.",
    description: [
      "@Team App is an AI publishing and operations platform for college athletic departments, built by a two-person team with me leading engineering. Departments shoot a mountain of game-day photo and video, and the post-game scramble to caption it all (the right player names, accessible alt text, on-brand voice, posted across every platform) burns hours every week. I built @Team App to automate that away: a four-step wizard where staff pick a roster, drop in the media, review AI-written copy, and publish everywhere at once. What used to eat hours becomes a draft the team just reviews and sends.",
      "The engine is AI, and I built the pipeline around it. I wired Anthropic's Claude in as a vision model that reads each photo, matches the athletes in frame against the team roster (jersey numbers, positions, social handles), and drafts accessible alt text plus captions tuned to each platform: tight for X, on-voice for Instagram, fuller for Facebook. I centralized the model behind a single constant so the whole app moves to the newest Claude in one line, and designed a graceful fallback so it keeps running when no AI key is present. Every caption names the actual player on the field, not a generic stand-in.",
      "I chose a current-generation stack deliberately: Next.js 16 and React 19 with TypeScript on the front, Prisma 7 on PostgreSQL through its engine-less driver adapter on the back, Tailwind 4 across the UI, S3-compatible object storage for media, and Docker for local infra. I built the auth in-house rather than leaning on a hosted identity provider: scrypt-hashed passwords, jose-signed JWT sessions, TOTP two-factor, and WebAuthn passkeys. Posts go out to Facebook Pages, Instagram Business, and X over OAuth through a prepare-then-commit pipeline I designed so a multi-platform post either lands everywhere or rolls back cleanly, with account tokens encrypted at rest using AES-256-GCM.",
      "The app is multi-tenant from the ground up: every organization gets its own rosters, social accounts, brand-voice settings, and a four-tier permission model (org owner, admin, staff, student) enforced everywhere. Beyond publishing, I built roster management, event scheduling with shift releases and pickups, an equipment check-out system with QR scanning, real-time team chat on a separate WebSocket service, and push notifications. I move this fast by pairing strong engineering fundamentals with AI as a development partner: it speeds the work, I make the architecture calls, and a Jest suite of well over a hundred tests pins the behavior so the velocity never costs correctness.",
    ],
  },
  {
    slug: "GetGuten",
    name: "GetGuten",
    image: GetGuten,
    liveUrl: "https://app.getguten.ai",
    date: "Feb 2026 - Present",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Claude API",
      "NextAuth",
      "AWS S3",
      "Docker",
    ],
    tagline:
      "Internal AI content tool at Repify Ai. End-to-end blog generation on mobile, with voice and tone baked in.",
    resumeLine:
      "Claude-powered editorial tool taking teams from idea to publish-ready draft, on brand voice. Shipped end-to-end on Next.js 16, React 19, Prisma, PostgreSQL, and AWS S3. Began as an internal Repify Ai tool and drew shareholder interest as a standalone product.",
    description: [
      "GetGuten started as an internal tool at Repify Ai, built to help our content team ship more tailored, on-brand blog posts faster. The app walks teams through the full editorial flow: idea generation, brand voice and tone capture, drafting, and final publish-ready output. Mobile-optimized so the work doesn't have to live on a desk.",
      "Shareholders saw the demo and asked to use it themselves. That kicked off the next chapter: an internal accelerator growing into a product, with real prospective users outside the company.",
      "Built on Next.js 16 + React 19 + TypeScript with Prisma and PostgreSQL on the back. Anthropic's Claude API powers the generation, NextAuth + passkeys handle auth, and content assets live in AWS S3. Containerized with Docker. I shipped this one end-to-end: inception, build, and deploy were all me.",
      "The product flow handles idea to final draft in one place. Voice and tone settings carry across drafts so the model picks up the org's specific writing style over time.",
    ],
  },
  {
    slug: "Repify_Ai",
    name: "Repify Ai",
    image: Repify,
    liveUrl: "https://app.repifyai.com",
    date: "Jul 2025 - Present",
    stack: [
      "Python",
      "Django",
      "MongoDB",
      "React",
      "Tailwind CSS",
      "Stripe",
      "Docker",
      "Kubernetes",
      "AWS",
      "IaC",
    ],
    tagline:
      "AI-powered compensation software for the beverage industry. Full-stack feature work plus the company's payments and infra foundations.",
    description: [
      "Repify Ai builds AI-powered compensation software for the beverage industry. I'm shipping across the full stack: React + Tailwind on the front, Python/Django + MongoDB on the back, deployed to AWS via infrastructure-as-code with Docker images orchestrated on Kubernetes.",
      "Designed and built the company's entire Stripe payments architecture from scratch (products, pricing, subscriptions, webhooks, customer lifecycle, and reconciliation). First payments infrastructure the startup ever had.",
      "Designed scalable APIs and backend logic with Django REST framework + MongoDB to support salary modeling, reporting, and workflow automation. Built modular, reusable React + Tailwind components optimized for performance and accessibility.",
      "Integrated intelligent agent frameworks into product features to automate complex domain decisions, and run an AI-augmented engineering workflow across CI/CD, code generation, automated PR reviews, and Monday epic/ticket generation.",
    ],
  },
  {
    slug: "Resi",
    name: "Resi",
    image: Resi,
    liveUrl: "https://app.getresi.com/login",
    date: "Mar 2023 - Jul 2025",
    stack: [
      "CraftCMS",
      "PHP",
      "MySQL",
      "AJAX",
      "Vue.js",
      "Twig",
      "Less",
      "BitBucket",
      "Agile",
    ],
    tagline:
      "Custom websites and apps for property management clients. Contract work, production codebase.",
    description: [
      "Resi is a marketing and web/app development firm building custom websites for property management and ownership clients.",
      "First production codebase I shipped to. Worked in CraftCMS with PHP, MySQL, AJAX, and Vue.js on the front end. Twig templates, Less for styling, Bitbucket for version control, agile sprint cadence.",
      "Real clients, real deadlines, real code review.",
    ],
  },
  {
    slug: "TSSLA",
    name: "Top Secret Shirts LA",
    image: TopSecretShirtsLA,
    liveUrl: "https://top-secret-shirts-la.herokuapp.com/",
    date: "Aug 2022",
    stack: ["HTML", "CSS", "JavaScript", "PostgreSQL", "Express", "React", "Node.js"],
    tagline:
      "Group e-commerce app. Capstone-style PERN-stack project, three engineers, three weeks.",
    description: [
      "Group project replicating the core functions of a real e-commerce site. Full PERN stack: front-end, back-end, auth, cart, checkout flow.",
      "Built over three weeks with a team of three. We split by specialty (front-end, API integration, back-end) and cross-pollinated when blockers came up.",
      "Hardest part: stitching the back-end into the front-end while reconciling three different code styles. The team-management lessons matched the technical ones: delegating, pushing each other, working through schedule and personality differences. Came out tighter than we went in.",
    ],
  },
  {
    slug: "Fitness_Tracker",
    name: "Fitness Tracker",
    image: FitnessTracker,
    liveUrl: "https://zesty-bavarois-cb650e.netlify.app",
    date: "Aug 2022",
    stack: ["HTML", "CSS", "JavaScript", "PostgreSQL", "Express", "React", "Node.js", "Photoshop"],
    tagline:
      "Penultimate bootcamp project. First time wiring our own back-end to a React front-end.",
    description: [
      "First project where we built our own back-end from scratch. Test-driven approach for the API; React + fetch for CRUD on the front-end.",
      "Split into two weeks: back-end, then front-end. Sink-or-swim. Forced fast learning on table design, joins, and migrations.",
      "Worked with a partner who handled CSS while I drove the rest. Looking back I'd delegate more PERN work earlier rather than back-loading her contribution.",
      "Result was a project I was genuinely proud of: clean look, smooth flow, and I now actually understand back-end architecture.",
    ],
  },
  {
    slug: "Strangers_Things",
    name: "Stranger's Things",
    image: StrangersThings,
    liveUrl: "https://graceful-bonbon-2cb8e1.netlify.app",
    date: "Jul 2022",
    stack: ["HTML", "CSS", "DOM", "JavaScript", "React", "API"],
    tagline:
      "A Craigslist clone with a goofy name. First open-ended build with no spec.",
    description: [
      "Craigslist-style marketplace: login/logout, post/edit/delete items, browse listings, message other users. No payment flow (same as Craigslist).",
      "First project given without a reference design or detailed instructions. 'Just build it.' That deep-end moment was a turning point. The first time I could build something on my own.",
      "After this one I caught myself saying 'I built that and it looks amazing' for the first time. Outside of the back-end, every line is mine.",
    ],
  },
  {
    slug: "User_Hub",
    name: "User Hub",
    image: UserHub,
    liveUrl: "https://golden-pastelito-de022f.netlify.app",
    date: "Jul 2022",
    stack: ["HTML", "CSS", "DOM", "JavaScript", "React", "API"],
    tagline:
      "First proper React SPA. Login persistence, todos, and posts via external API.",
    description: [
      "Single-page app with login/logout, todos, and posts pulled from a public API. First real dive into React + API integration.",
      "Hardest piece: persisting auth via localStorage. Combined with learning fetch and API patterns at the same time, it was a steep but exciting curve.",
      "This was the project where the development side really clicked. I started looking at apps and thinking about how I'd rebuild them.",
    ],
  },
  {
    slug: "Tic_Tac_Toe",
    name: "Tic Tac Toe",
    image: TicTacToe,
    liveUrl: "https://clinquant-syrniki-ceef20.netlify.app",
    date: "Jun 2022",
    stack: ["HTML", "CSS", "DOM", "JavaScript"],
    tagline:
      "Classic game, vanilla JS. Second project of the bootcamp.",
    description: [
      "Tic Tac Toe with HTML, CSS, vanilla JS, and DOM manipulation. No frameworks. No libraries.",
      "Hardest piece by far: making the computer play itself. Required actually thinking through state machines and win-condition logic with very little prior knowledge.",
      "Extras: score counter, working clear button, and some additional CSS polish.",
    ],
  },
  {
    slug: "Qwirty",
    name: "Qwirty",
    image: Qwirty,
    liveUrl: "https://ephemeral-sable-b7a5f5.netlify.app",
    date: "Jun 2022",
    stack: ["HTML", "CSS", "Chrome DevTools", "Media Queries"],
    tagline:
      "CSS-replication exercise. Match the reference, learn grid and responsive patterns.",
    description: [
      "Boilerplate-and-replicate. We were given a reference site and tasked with matching it as closely as possible using HTML and CSS.",
      "Pure layout practice: grid, flexbox, media queries, fluid type, and learning to read other people's CSS via Chrome DevTools.",
      "Loved this one because the goal was reproduction, not invention. Forced me to use every tool around me to get the pixels right.",
    ],
    reference: "https://serene-archimedes-8526f6.netlify.app/",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
