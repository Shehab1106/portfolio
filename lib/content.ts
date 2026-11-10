/* ============================================================
   Content model.
   Adding a project later = one entry here. No layout changes.
   ============================================================ */

export const profile = {
  name: "Shehab Sherif",
  role: "CTO at ClearSplit",
  lane: "Fintech & Payments Engineering",
  statement: "I build systems where money can't be wrong.",
  statementEmphasis: "can't be wrong",
  lede:
    "Payments, ledgers, and reconciliation: the parts of a product that have to be correct every single time. I turn ambiguous financial requirements into systems that reconcile to the cent, and I own them end to end, from the data model to the screen the operator actually uses.",
  metaDescription:
    "Shehab Sherif, fintech and payments engineer. Double-entry ledgers, payment orchestration, and reconciliation systems built to be correct every time.",
  links: {
    github: "https://github.com/Shehab1106",
    linkedin: "https://www.linkedin.com/in/shehab-elsedody/",
    email: "shehab.elsedody@gmail.com",
  },
}

export const about = {
  paragraphs: [
    "I'm a software engineer who works where accuracy is non-negotiable and the edge cases are the real work. As **CTO at ClearSplit**, I'm building a double-entry trust-accounting platform for short-term-rental property managers from the ground up: the ledger, multi-PMS reconciliation, tax and owner statements, and the security and multi-tenancy that fintech demands.",
    "Before that, at **SellAbroad**, I built core pieces of an event-driven commerce platform powering checkout and payments across 150+ countries, including a multi-provider payment orchestration engine and a fault-tolerant, queue-based processing system with retries, idempotency, and database-level locking.",
    "I care about systems I understand end to end over sheer volume. The two case studies here are the clearest window into how I think: not the happy path, but what keeps the numbers right when everything around them is changing.",
  ],
  stack: [
    { k: "Languages", v: "TypeScript, Java, Python" },
    { k: "Backend", v: "Node, NestJS, Postgres" },
    { k: "Frontend", v: "React, Next.js" },
    { k: "Infra", v: "AWS, Docker, Cloudflare" },
    { k: "Focus", v: "ledgers, payments, reconciliation" },
  ],
}

export type ProjectLink = { label: string; href: string; kind: "repo" | "live" | "case" }

export type Project = {
  slug: string
  name: string
  tagline: string
  status: string
  summary: string
  hardPart: string
  hardEmphasis?: string
  stack: string[]
  links: ProjectLink[]
  figure: "ledger-chain" | "cascade"
}

export const projects: Project[] = [
  {
    slug: "trust-ledger",
    name: "trust-ledger",
    tagline: "Trust-accounting ledger: architecture + reference implementation",
    status: "Open source",
    summary:
      "A double-entry trust ledger built in production for a property-management platform holding guest and owner funds. One write boundary, append-only journals enforced at the database layer, corrections by reversal, and statements pinned to the exact ledger state they read. A clean-room TypeScript reference implementation and a passing test suite ship alongside the write-up.",
    hardPart:
      "The ledger is permanent; everything around it is disposable. The sharpest consequence: no foreign keys on the journal lines, because a disposable table must never be able to delete or orphan a financial record. The journal line doesn't depend on the booking, it remembers it.",
    hardEmphasis: "no foreign keys on the journal lines",
    stack: ["TypeScript", "Postgres", "Double-entry", "Tested"],
    links: [
      { label: "Live demo", href: "https://trust-ledger-shehab14.vercel.app", kind: "live" },
      { label: "Code + write-up", href: "https://github.com/Shehab1106/trust-ledger", kind: "case" },
    ],
    figure: "ledger-chain",
  },
  {
    slug: "orchestrant",
    name: "orchestrant",
    tagline: "Payment orchestration engine",
    status: "Open source",
    summary:
      "Routes a card charge across multiple providers, cascades to a fallback when one soft-declines, handles 3-D Secure, and stops cleanly on a hard decline. The core engine is pure TypeScript with no framework or database dependency; delivery and storage plug in behind interfaces.",
    hardPart:
      "The interesting cases are all failure cases. Every outcome is an explicit status, and only savable ones cascade, so a retried request never double-charges and a 3-D Secure challenge never fires twice for one payment.",
    hardEmphasis: "all failure cases",
    stack: ["TypeScript", "Next.js", "Postgres", "Ports & adapters"],
    links: [
      { label: "Source on GitHub", href: "https://github.com/Shehab1106/orchestrant", kind: "repo" },
    ],
    figure: "cascade",
  },
]
