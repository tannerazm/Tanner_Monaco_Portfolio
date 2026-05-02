export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// Compressed life journey. Only the inflection points.
export const TIMELINE: TimelineEvent[] = [
  {
    year: "1995",
    title: "Born in Buffalo, NY",
    description:
      "Started life in Orchard Park, New York. Moved to Texas at 18 months. First of many.",
  },
  {
    year: "2013",
    title: "Texas Tech → University of Oklahoma",
    description:
      "Started at Texas Tech, transferred to OU a year later. Switched majors to Entrepreneurship & Venture Management. Boomer Sooner.",
  },
  {
    year: "2017",
    title: "Graduated. Moved to Colorado",
    description:
      "Packed up with no job, no apartment, no friends in CO. Took the leap. Best decision I've made.",
  },
  {
    year: "2022",
    title: "Fullstack Academy",
    description:
      "Completed OU's coding bootcamp via Fullstack Academy. PERN stack: JavaScript, Node, Express, PostgreSQL, React. Returned as a part-time mentor.",
  },
  {
    year: "2023",
    title: "Resi: Contract Engineer",
    description:
      "Building custom property-management websites with CraftCMS, PHP, MySQL, Vue.js, Twig. First production codebase, real clients, real deadlines.",
  },
  {
    year: "Jun 2025",
    title: "Met Addison",
    description:
      "Sharper, sweeter, and quietly the most creative person I know. Every day since has been measurably better.",
  },
  {
    year: "Jul 2025",
    title: "Repify Ai: Full Stack Software Engineer",
    description:
      "Building AI-powered compensation software for the beverage industry with React, Django, and Python. Designing scalable APIs, modular UI, and intelligent agent integrations.",
  },
  {
    year: "Now",
    title: "Heads down at Repify Ai",
    description:
      "Currently happy and shipping. Not actively looking, but open to a conversation if you're hiring for a strong fit.",
  },
];
