/* Figures that sit on the dark "record" panel. Colors are fixed to the
   panel (always dark in both themes), so they read consistently. */

const C = {
  text: "#e0e4f0",
  muted: "#99a1b8",
  rowFill: "rgba(255,255,255,0.03)",
  rowStroke: "rgba(255,255,255,0.09)",
  rail: "rgba(255,255,255,0.14)",
  accent: "#8f8cf8",
  accentText: "#c7c5fb",
  accentFill: "rgba(143,140,248,0.14)",
  accentStroke: "rgba(143,140,248,0.55)",
  ok: "#5cc08c",
  okText: "#8fd8b2",
  okFill: "rgba(92,192,140,0.14)",
  soft: "#dcab46",
  softText: "#e7c77a",
  softFill: "rgba(220,171,70,0.14)",
}

const FONT =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

export function LedgerChainFigure() {
  const rows = [
    { label: "PMS / manual facts", role: "raw inputs" },
    { label: "transactions + categories", role: "classify" },
    { label: "business model", role: "author terms" },
    { label: "dated split grid", role: "price, frozen" },
    { label: "trust + operating ledger", role: "record events", ledger: true },
    { label: "statements + payouts", role: "read the books" },
    { label: "bank reconciliation", role: "match cash" },
  ]
  const rowH = 30
  const gap = 6
  const top = 6
  const railX = 15
  const x = 34
  const w = 418
  const total = top + rows.length * (rowH + gap) - gap + 6

  return (
    <svg className="fig" viewBox={`0 0 466 ${total}`} fontFamily={FONT} role="img"
      aria-label="The accounting chain: seven layers, money moving one direction into a permanent trust and operating ledger.">
      <line x1={railX} y1={top + rowH / 2} x2={railX} y2={top + (rows.length - 1) * (rowH + gap) + rowH / 2} stroke={C.rail} strokeWidth="1.4" />
      {rows.map((r, i) => {
        const y = top + i * (rowH + gap)
        const cy = y + rowH / 2
        const led = r.ledger
        return (
          <g key={r.label}>
            {i < rows.length - 1 && (
              <path d={`M${railX - 3} ${cy + rowH / 2 - 2} l3 3 l3 -3`} fill="none" stroke={C.rail} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <circle cx={railX} cy={cy} r={led ? 3.6 : 2.8} fill={led ? C.accent : "rgba(255,255,255,0.3)"} />
            <rect x={x} y={y} width={w} height={rowH} rx="8"
              fill={led ? C.accentFill : C.rowFill}
              stroke={led ? C.accentStroke : C.rowStroke} strokeWidth={led ? 1.2 : 1} />
            <text x={x + 14} y={cy + 4} fontSize="12.5" fontWeight={led ? 600 : 500} fill={led ? "#f0effb" : C.text}>{r.label}</text>
            <text x={x + w - 14} y={cy + 3.5} fontSize="10.5" textAnchor="end" fill={led ? C.accentText : C.muted}>{r.role}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function CascadeFigure() {
  const rows = [
    { id: "mock_a", status: "soft_fail", kind: "soft" as const },
    { id: "mock_b", status: "success", kind: "ok" as const },
  ]
  return (
    <svg className="fig" viewBox="0 0 466 240" fontFamily={FONT} role="img"
      aria-label="A charge cascading from a soft-declining provider to an approving one, then an approved result.">
      <text x="16" y="26" fontSize="12" fill={C.muted}>POST /api/charge</text>
      <text x="450" y="26" fontSize="11" textAnchor="end" fill={C.muted}>idem: t1</text>
      <line x1="16" y1="40" x2="450" y2="40" stroke={C.rowStroke} />

      <line x1="27" y1="70" x2="27" y2="128" stroke={C.rail} strokeWidth="1.4" />
      {rows.map((r, i) => {
        const y = 56 + i * 58
        const cy = y + 20
        const col = r.kind === "ok" ? C.ok : C.soft
        const fill = r.kind === "ok" ? C.okFill : C.softFill
        const txt = r.kind === "ok" ? C.okText : C.softText
        return (
          <g key={r.id}>
            <circle cx="27" cy={cy} r="4" fill={col} />
            <rect x="46" y={y} width="404" height="40" rx="9" fill={C.rowFill} stroke={C.rowStroke} />
            <text x="62" y={cy + 4} fontSize="13" fill={C.text}>{r.id}</text>
            <rect x={450 - 118} y={cy - 11} width="104" height="22" rx="6" fill={fill} />
            <text x={450 - 66} y={cy + 4} fontSize="11.5" fontWeight="600" textAnchor="middle" fill={txt}>{r.status}</text>
          </g>
        )
      })}
      <path d="M24 118 l3 3 l3 -3" fill="none" stroke={C.rail} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="16" y="178" width="434" height="44" rx="11" fill={C.accentFill} stroke={C.accentStroke} strokeWidth="1.1" />
      <g transform="translate(34, 200)">
        <circle r="10" fill="none" stroke={C.ok} strokeWidth="1.6" />
        <path d="M-4.5 0 l3 3 l6 -6.5" fill="none" stroke={C.ok} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="56" y="204.5" fontSize="13" fill="#f0effb">Payment approved by <tspan fill={C.accentText} fontWeight="600">mock_b</tspan></text>
    </svg>
  )
}
