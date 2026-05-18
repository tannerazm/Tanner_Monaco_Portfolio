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
}

export const PROJECTS: Project[] = [
  {
    slug: "Admin_App",
    name: "Admin App",
    image: AdminApp,
    liveUrl: "",
    inDevelopment: true,
    date: "Apr 2026 - Present",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Claude API",
      "AWS Cognito",
      "Tailwind CSS",
      "Docker",
    ],
    tagline:
      "Roster-aware social publishing for athletic departments. AI writes accessible alt text and on-brand captions; admins publish to every connected platform from one wizard.",
    description: [
      "Admin App is the product I'm building alongside Addison. She owns the domain, marketing, and legal side; I own the engineering. Athletic departments shoot a mountain of game-day photo and video, and the post-game scramble to caption everything (proper alt text, the right player names, on-brand voice, posted across every platform) is the pain point we're solving. The app turns that into a four-step wizard: pick a roster, drop media, review AI-generated copy, publish.",
      "Built on Next.js 16 + React 19 + TypeScript, with Prisma 7 and PostgreSQL on the back. Anthropic's Claude API generates the captions and alt text with full roster context wired in (jersey numbers, positions, handles), so the model writes about the actual athlete in frame. Auth runs through AWS Cognito with JOSE-signed session tokens. Tailwind v4 across the front end, Docker for local infra.",
      "Multi-tenant from the ground up: every team has its own roster, social accounts, brand voice settings, and user permission tiers (org owner, admin, staff, student). Coaches see only their teams; org owners reach everything. The wizard adapts to whichever permissions the signed-in user actually holds.",
      "This one is being shipped with Claude Code deeply in the loop. Every step gets verified, tested, and reviewed before it lands. Output has been production-grade, and the velocity is the highest I've ever worked at.",
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
