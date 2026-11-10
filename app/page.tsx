import { Nav } from "@/components/Nav"
import { LedgerChainFigure, CascadeFigure } from "@/components/figures"
import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon, ExternalIcon } from "@/components/icons"
import { profile, about, projects, type Project } from "@/lib/content"

function splitEmphasis(text: string, phrase?: string) {
  if (!phrase || !text.includes(phrase)) return text
  const [a, b] = text.split(phrase)
  return (
    <>
      {a}
      <b>{phrase}</b>
      {b}
    </>
  )
}

const FIGURES: Record<Project["figure"], { cap: string; node: React.ReactNode }> = {
  "ledger-chain": { cap: "the accounting chain", node: <LedgerChainFigure /> },
  cascade: { cap: "charge cascade", node: <CascadeFigure /> },
}

function linkIcon(kind: Project["links"][number]["kind"]) {
  if (kind === "repo") return <GithubIcon />
  if (kind === "live") return <ExternalIcon />
  return <ArrowIcon />
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* HERO */}
        <header className="shell hero">
          <p className="idline reveal">
            <span>{profile.name}</span>
            <span className="sep">/</span>
            <span>{profile.role}</span>
            <span className="sep">/</span>
            <span>{profile.lane}</span>
          </p>
          <h1 className="reveal d1">
            {splitEmphasisHero(profile.statement, profile.statementEmphasis)}
          </h1>
          <p className="lede reveal d2">{profile.lede}</p>
          <div className="actions reveal d3">
            <a className="btn btn-primary" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> GitHub
            </a>
            <a className="btn btn-ghost" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.links.email}`}>
              <MailIcon /> Email
            </a>
          </div>
        </header>

        <div className="shell"><hr className="rule" /></div>

        {/* SELECTED WORK */}
        <section className="section shell" id="work">
          <p className="h-label">Selected work</p>
          {projects.map((p, i) => {
            const fig = FIGURES[p.figure]
            return (
              <article className={`work-entry${i % 2 === 1 ? " flip" : ""}`} key={p.slug}>
                <div className="w-text">
                  <div className="w-kicker">
                    <span className="w-name">{p.name}</span>
                    <span className="w-tag">{p.tagline}</span>
                    <span className="w-status">{p.status}</span>
                  </div>
                  <p className="w-summary">{p.summary}</p>
                  <p className="w-hard">{splitEmphasis(p.hardPart, p.hardEmphasis)}</p>
                  <div className="w-stack">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="w-links">
                    {p.links.map((l) => (
                      <a className="w-link" href={l.href} target="_blank" rel="noopener noreferrer" key={l.href}>
                        {l.label} {linkIcon(l.kind)}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="w-figure">
                  <div className="panel">
                    <div className="cap"><span className="lamp" /> {fig.cap}</div>
                    {fig.node}
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <div className="shell"><hr className="rule" /></div>

        {/* ABOUT */}
        <section className="section shell" id="about">
          <p className="h-label">About</p>
          <div className="about-grid">
            <div className="about-body">
              {about.paragraphs.map((para, i) => (
                <p key={i}>{renderBold(para)}</p>
              ))}
            </div>
            <aside className="stack-card">
              <h3>What I work with</h3>
              {about.stack.map((row) => (
                <div className="stack-row" key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="foot shell" id="contact">
          <hr className="rule" style={{ marginBottom: "clamp(32px,5vw,52px)" }} />
          <div className="foot-in">
            <div className="left">
              <span className="big">Let&apos;s talk.</span>
              <span className="sub">
                Worth a conversation? <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
              </span>
            </div>
            <div className="foot-links">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${profile.links.email}`}>Email</a>
            </div>
          </div>
          <p className="foot-meta">Built with Next.js · {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  )
}

function splitEmphasisHero(text: string, phrase?: string) {
  if (!phrase || !text.includes(phrase)) return text
  const [a, b] = text.split(phrase)
  return (
    <>
      {a}
      <span className="em">{phrase}</span>
      {b}
    </>
  )
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <b key={i}>{part.slice(2, -2)}</b>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}
