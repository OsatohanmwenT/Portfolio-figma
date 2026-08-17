export type CaseStudyFact = { label: string; value: string };

export type ProjectImage = { alt: string; caption?: string };

export type Project = {
  slug: string;
  index: number;
  name: string;
  category: string;
  year: string;
  /** One-line summary shown in the project index row. */
  summary: string;
  /** Title-page positioning statement for the case study. */
  tagline: string;
  role: string;
  challenge: string;
  approach: string;
  outcomeFacts: CaseStudyFact[];
  images: ProjectImage[];
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "devspace",
    index: 1,
    name: "Devspace",
    category: "AI · Platform",
    year: "2025",
    summary: "Career navigation matched by embeddings, not guesswork.",
    tagline: "A career-navigation platform that turns a resume into a roadmap.",
    role: "Founder & Lead Engineer",
    challenge:
      "Developers lack structured guidance for career navigation — advice is generic, and no one platform ties skills, roles, and learning paths together.",
    approach:
      "Built a matching engine on embeddings and pgvector, generating personalised learning roadmaps and pairing them with an agent-assisted workflow for ongoing guidance.",
    outcomeFacts: [
      { label: "Stack", value: "Next.js, FastAPI, PostgreSQL, pgvector, Redis" },
      { label: "Role", value: "Solo founder & engineer" },
      { label: "Match relevance", value: "91%" },
    ],
    images: [
      { alt: "Devspace roadmap view", caption: "Personalised roadmap generation" },
      { alt: "Devspace matching engine", caption: "Embedding-based role matching" },
    ],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "RAG"],
  },
  {
    slug: "adaptive-learning",
    index: 2,
    name: "Adaptive Learning",
    category: "EdTech · AI",
    year: "2025",
    summary: "Quizzes generated on the fly, paths that adapt to mastery.",
    tagline: "A learning platform that rewrites the course as the learner moves through it.",
    role: "Full-Stack Engineer",
    challenge:
      "Static courses treat every learner the same, so strong students stall and struggling students fall behind.",
    approach:
      "Generated quizzes dynamically from course content and adapted the learning path in real time based on demonstrated mastery.",
    outcomeFacts: [
      { label: "Stack", value: "Next.js, Node.js, PostgreSQL, Prisma, Redis" },
      { label: "Mastery accuracy", value: "94%" },
      { label: "Quiz latency", value: "1.2s" },
    ],
    images: [
      { alt: "Adaptive Learning quiz view", caption: "On-demand generated quiz" },
      { alt: "Adaptive Learning progress view", caption: "Mastery-adjusted path" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    slug: "laptop-discovery",
    index: 3,
    name: "Laptop Discovery",
    category: "Commerce · Search",
    year: "2024",
    summary: "Comparing specs across vendors, ranked and cached.",
    tagline: "A discovery engine that ranks laptops the way a knowledgeable friend would.",
    role: "Full-Stack Engineer",
    challenge:
      "Buyers compare specs across dozens of vendors by hand, with no single trustworthy ranking.",
    approach:
      "Aggregated and cached listings across vendors, then layered a recommendation engine to rank by real buying criteria.",
    outcomeFacts: [
      { label: "Stack", value: "Next.js, Node.js, PostgreSQL, Redis, BullMQ" },
      { label: "Vendors indexed", value: "40+" },
      { label: "Cache hit rate", value: "92%" },
    ],
    images: [
      { alt: "Laptop Discovery comparison view", caption: "Ranked comparison results" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "BullMQ"],
  },
  {
    slug: "expense-tracker",
    index: 4,
    name: "Expense Tracker",
    category: "Fintech",
    year: "2024",
    summary: "Raw transactions turned into a monthly financial narrative.",
    tagline: "An expense tracker that explains where the money went, not just where it is.",
    role: "Full-Stack Engineer",
    challenge:
      "People lose track of where money goes because most tools show numbers without a narrative.",
    approach:
      "Built rich analytics on top of transaction data, generating weekly and monthly reports that read like a summary, not a spreadsheet.",
    outcomeFacts: [
      { label: "Stack", value: "React, Recharts, Node.js, MongoDB, Redis" },
      { label: "Data points charted", value: "50k+" },
      { label: "Query time", value: "80ms" },
    ],
    images: [
      { alt: "Expense Tracker report view", caption: "Monthly spending narrative" },
    ],
    tech: ["React", "Recharts", "Node.js", "MongoDB", "Redis"],
  },
  {
    slug: "visitor-management",
    index: 5,
    name: "Visitor Management",
    category: "Enterprise",
    year: "2023",
    summary: "A secure, auditable visitor workflow with staged approvals.",
    tagline: "An enterprise visitor system built for auditability, not just check-in.",
    role: "Software Engineer",
    challenge:
      "Enterprises need a secure, auditable way to track visitors with multi-stage approval workflows and admin oversight.",
    approach:
      "Implemented a staged-approval workflow with role-based admin views, translating Figma designs into production-ready interfaces.",
    outcomeFacts: [
      { label: "Stack", value: "React, TypeScript, TailwindCSS, REST APIs, Node.js" },
      { label: "Approval stages", value: "4" },
      { label: "Uptime", value: "99.9%" },
    ],
    images: [
      { alt: "Visitor Management approval view", caption: "Multi-stage approval workflow" },
    ],
    tech: ["React", "TypeScript", "TailwindCSS", "REST APIs", "Node.js"],
  },
  {
    slug: "church-management",
    index: 6,
    name: "Church Management",
    category: "Enterprise",
    year: "2023",
    summary: "Members, attendance and finance in one trustworthy place.",
    tagline: "A management system for communities that need real accountability.",
    role: "Software Engineer",
    challenge:
      "Communities need to manage members, attendance, finance and roles in one place with granular permissions.",
    approach:
      "Built a modular system with role-based permissions covering membership, attendance, and financial records.",
    outcomeFacts: [
      { label: "Stack", value: "React, TypeScript, Node.js, PostgreSQL, Auth" },
      { label: "User roles", value: "8" },
      { label: "Records handled", value: "25k+" },
    ],
    images: [
      { alt: "Church Management dashboard view", caption: "Membership & attendance dashboard" },
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Auth"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const nextIndex = i === -1 ? 0 : (i + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
