'use client'
import { useState, useRef, useReducer } from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg0:     '#0C0C0F',
  bg1:     '#111116',
  bg2:     '#18181F',
  bg3:     '#22222C',
  bg4:     '#2A2A36',
  border0: '#1E1E28',
  border1: '#2C2C3A',
  border2: '#3C3C4E',
  text0:   '#F0EFF4',
  text1:   '#B8B6C8',
  text2:   '#6E6C82',
  accent:  '#E03030',
  accentL: '#FF4444',
  purple:  '#7B68EE',
  purpleL: '#9B8DFF',
  purpleBg:'#1E1A2E',
  green:   '#34D399',
  greenBg: '#0D2318',
  amber:   '#F59E0B',
  amberBg: '#1E1500',
  red:     '#F87171',
  redBg:   '#1E0808',
  mono:    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  sans:    "'Inter', system-ui, -apple-system, sans-serif",
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GUIDELINES = `You are the UX content checker and generator for Autocar India. Enforce Version 2.0 guidelines strictly.

VOICE: Useful not warm · Specific not clever · Consistent not creative.

CASING: Nav = Title Case · H1/headings/CTAs/specs/errors = Sentence case · Card metadata labels = Title Case · Brand names = manufacturer's casing.

LENGTHS: Nav ≤2 words · H1 ≤10 words · Section heading ≤8 words · CTA ≤4 words (verb first) · Error = 1 sentence.

CTAs USE: View specs · Compare · Check on-road price · Read review · Calculate EMI · View gallery · Ask an expert
CTAs AVOID: Know more · Click here · Explore now · Get price · Read more

HEADINGS USE: Cars under ₹10 lakh · Top-rated SUVs this month
HEADINGS AVOID: Latest Articles · Trending Cars · Latest Blogs. No full stops. No clickbait.

PRICE: Always label ex-showroom/on-road · Lakh (capital) · En dash (–) not hyphen · Round to 1 decimal · Include city for on-road.
SPECS: Sentence case · Always include unit (mm, L, km/l, bhp, Nm) · Plain English.
ERRORS: What happened + exactly one next action · No ! · No blame · No filler apologies.
CONTENT TYPES: Road Test · Long-term Review · News · Feature · Video · Gallery · Advice
METADATA: Middle dot (·) separator · <24h relative · <30d days ago · >30d DD Mon YYYY
PUNCTUATION: No full stops on labels/CTAs/headings · No ! ever · En dash for ranges · Oxford comma
NUMBERS: ₹ + Lakh/Crore capitalised · km/l one decimal · kmph with space · bhp/Nm no space
WORD CHOICE: Cars not Vehicles · Bikes not Two-wheelers · On-road price · Ex-showroom · Variant · Fuel efficiency not Mileage
BENCHMARK: Also draw from CarDekho, Cars24, Autocar UK, Edmunds best practice within this voice.`

const MODES = [
  { id: 'check',    icon: '◎', label: 'Check',    full: 'Check copy',    desc: 'Paste your copy — get a verdict, violations, corrections, and better options.' },
  { id: 'generate', icon: '✦', label: 'Generate', full: 'Generate copy', desc: 'Describe the use case — get 3 on-brand options with a recommended pick.' },
  { id: 'scan',     icon: '⊙', label: 'Scan',     full: 'Scan a screen', desc: 'Upload a screenshot — identify all copy, flag violations, find gaps.' },
]

const CTA_SURFACES = ['Navigation label','Page H1','Section heading','CTA / Button','Spec label','Price display','Error or empty state','Card metadata','Tooltip','Filter or sort label']
const GEN_TYPES    = ['CTA / Button','Section heading','Page H1','Navigation label','Error message','Empty state','Loading state','Spec label','Card metadata string','Price display string','Tooltip','Filter label']

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface HistoryItem {
  id: string
  mode: 'check' | 'generate' | 'scan'
  summary: string
  input: string
  result: string
  ts: string
  versions: { text: string; ts: string }[]
  notes: { text: string; ts: string }[]
  imagePreview?: string
  status?: string
}

type HistoryAction =
  | { type: 'ADD';    item: HistoryItem }
  | { type: 'UPDATE'; item: HistoryItem }
  | { type: 'DELETE'; id: string }
  | { type: 'CLEAR' }

// ─── HELPERS ──────────────────────────────────────────────────────────────────
let _id = 0
const uid = () => `r${++_id}_${Date.now()}`
const ts  = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload  = () => res((r.result as string).split(',')[1])
    r.onerror = rej
    r.readAsDataURL(file)
  })
}

async function callAPI(messages: object[], maxTokens = 1300): Promise<string> {
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, system: GUIDELINES, messages }),
  })
  const d = await r.json()
  return d.content?.[0]?.text ?? 'Error — please try again.'
}

function historyReducer(state: HistoryItem[], action: HistoryAction): HistoryItem[] {
  switch (action.type) {
    case 'ADD':    return [action.item, ...state]
    case 'UPDATE': return state.map(i => i.id === action.item.id ? action.item : i)
    case 'DELETE': return state.filter(i => i.id !== action.id)
    case 'CLEAR':  return []
    default:       return state
  }
}

// ─── MICRO COMPONENTS ─────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }}
      style={{ padding: '4px 10px', fontSize: 11, border: `1px solid ${T.border2}`, borderRadius: 5,
               background: 'none', cursor: 'pointer', color: ok ? T.green : T.text2, fontFamily: T.sans, transition: 'color 0.2s' }}>
      {ok ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function Tag({ children, color = 'purple' }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    purple: { bg: T.purpleBg, text: T.purpleL, border: '#3D2E6A' },
    green:  { bg: T.greenBg,  text: T.green,   border: '#1A4030' },
    amber:  { bg: T.amberBg,  text: T.amber,   border: '#3A2A00' },
    red:    { bg: T.redBg,    text: T.red,     border: '#3A1010' },
  }
  const c = map[color] ?? map.purple
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
                   background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                   letterSpacing: 0.4, fontFamily: T.sans }}>
      {children}
    </span>
  )
}

// ─── RESULT BLOCK ─────────────────────────────────────────────────────────────
function parseResult(text: string): { heading: string | null; lines: string[] }[] {
  const sections: { heading: string | null; lines: string[] }[] = []
  let cur: { heading: string | null; lines: string[] } | null = null
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const isHeader = /^[A-Z][A-Z\s()/\-0-9]+:/.test(line) && line.length < 80
    if (isHeader) { if (cur) sections.push(cur); cur = { heading: line.replace(/:$/, ''), lines: [] } }
    else if (cur) { cur.lines.push(line) }
    else { sections.push({ heading: null, lines: [line] }) }
  }
  if (cur) sections.push(cur)
  return sections
}

function ResultDisplay({ text }: { text: string }) {
  const sections = parseResult(text)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {sections.map((sec, i) => {
        const body = sec.lines.join('\n').trim()
        if (!body && !sec.heading) return null
        const isVerdict = sec.heading?.startsWith('VERDICT')
        const pass = isVerdict && body.includes('PASS')
        const fail = isVerdict && body.includes('FAIL')
        return (
          <div key={i}>
            {sec.heading && (
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: T.text2, marginBottom: 6,
                            fontFamily: T.sans, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
                {sec.heading}
                {isVerdict && (pass ? <Tag color="green">PASS</Tag> : fail ? <Tag color="red">FAIL</Tag> : null)}
              </div>
            )}
            {body && (
              <pre style={{ margin: 0, fontFamily: T.mono, fontSize: 12, lineHeight: 1.9,
                            color: isVerdict ? (pass ? T.green : fail ? T.red : T.text0) : T.text0,
                            background: isVerdict ? (pass ? T.greenBg : fail ? T.redBg : T.bg3) : T.bg3,
                            padding: '10px 13px', borderRadius: 7, whiteSpace: 'pre-wrap',
                            border: `1px solid ${isVerdict ? (pass ? '#1E4030' : fail ? '#3A1010' : T.border1) : T.border1}`,
                            overflowWrap: 'break-word' }}>
                {body}
              </pre>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── HISTORY CARD ─────────────────────────────────────────────────────────────
function HistoryCard({ item, onUpdate, onDelete }: {
  item: HistoryItem
  onUpdate: (item: HistoryItem) => void
  onDelete: (id: string) => void
}) {
  const [open, setOpen]       = useState(true)
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(item.result)
  const [note, setNote]       = useState('')

  function saveEdit() {
    onUpdate({ ...item, result: editVal, versions: [...(item.versions || [{ text: item.result, ts: item.ts }]), { text: editVal, ts: ts() }] })
    setEditing(false)
  }

  const modeTag: Record<string, { label: string; color: string }> = {
    check: { label: 'Check', color: 'amber' }, generate: { label: 'Generate', color: 'purple' }, scan: { label: 'Scan', color: 'green' },
  }
  const mt = modeTag[item.mode] ?? modeTag.generate

  return (
    <article style={{ border: `1px solid ${T.border1}`, borderRadius: 10, background: T.bg2, overflow: 'hidden', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                    borderBottom: open ? `1px solid ${T.border0}` : 'none', background: T.bg2 }}>
        <Tag color={mt.color}>{mt.label}</Tag>
        <span style={{ fontSize: 12, color: T.text1, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: T.sans }}>{item.summary}</span>
        <span style={{ fontSize: 11, color: T.text2, fontFamily: T.sans, flexShrink: 0 }}>{item.ts}</span>
        {(item.versions?.length ?? 0) > 1 && (
          <span style={{ fontSize: 10, padding: '1px 5px', border: `1px solid ${T.border2}`, borderRadius: 3, color: T.text2, fontFamily: T.sans }}>v{item.versions.length}</span>
        )}
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label={open ? 'Collapse' : 'Expand'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text2, fontSize: 16, padding: '0 3px', lineHeight: 1 }}>{open ? '−' : '+'}</button>
        <button onClick={() => onDelete(item.id)} aria-label="Delete"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text2, fontSize: 13, padding: '0 3px', lineHeight: 1 }}>×</button>
      </div>

      {open && (
        <div style={{ padding: '14px 16px' }}>
          {item.input && (
            <div style={{ marginBottom: 12, padding: '8px 11px', background: T.bg3, borderRadius: 7, border: `1px solid ${T.border0}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: T.text2, marginBottom: 4, fontFamily: T.sans, textTransform: 'uppercase' }}>Input</div>
              <div style={{ fontSize: 12, color: T.text1, fontFamily: T.sans, lineHeight: 1.6 }}>{item.input}</div>
            </div>
          )}
          {item.imagePreview && (
            <img src={item.imagePreview} alt="Uploaded screen" style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 7, border: `1px solid ${T.border1}`, objectFit: 'cover', marginBottom: 12, display: 'block' }} />
          )}

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: T.text2, fontFamily: T.sans, textTransform: 'uppercase' }}>Result</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <CopyBtn text={item.result} />
                {!editing && (
                  <button onClick={() => { setEditing(true); setEditVal(item.result) }}
                    style={{ padding: '4px 10px', fontSize: 11, border: `1px solid ${T.border2}`, borderRadius: 5, background: 'none', cursor: 'pointer', color: T.text1, fontFamily: T.sans }}>Edit</button>
                )}
              </div>
            </div>
            {editing ? (
              <div>
                <textarea value={editVal} onChange={e => setEditVal(e.target.value)} aria-label="Edit result"
                  style={{ width: '100%', minHeight: 120, padding: '10px 12px', border: `1.5px solid ${T.purple}`, borderRadius: 7,
                           fontSize: 12, fontFamily: T.mono, color: T.text0, background: T.bg3, resize: 'vertical', outline: 'none',
                           boxSizing: 'border-box', lineHeight: 1.8 }} />
                <div style={{ display: 'flex', gap: 6, marginTop: 7 }}>
                  <button onClick={saveEdit} style={{ padding: '6px 14px', fontSize: 12, background: T.purple, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontFamily: T.sans }}>Save version</button>
                  <button onClick={() => setEditing(false)} style={{ padding: '6px 12px', fontSize: 12, border: `1px solid ${T.border2}`, borderRadius: 6, background: 'none', cursor: 'pointer', color: T.text1, fontFamily: T.sans }}>Cancel</button>
                </div>
              </div>
            ) : (
              <ResultDisplay text={item.result} />
            )}
          </div>

          {(item.versions?.length ?? 0) > 1 && (
            <details style={{ marginBottom: 10 }}>
              <summary style={{ fontSize: 11, color: T.text2, cursor: 'pointer', userSelect: 'none', fontFamily: T.sans }}>Version history ({item.versions.length})</summary>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid ${T.border2}` }}>
                {item.versions.map((v, i) => (
                  <div key={i} style={{ fontSize: 11, padding: '4px 0', borderBottom: `1px solid ${T.border0}`, color: T.text2, display: 'flex', gap: 8, fontFamily: T.sans }}>
                    <span style={{ color: T.purpleL, fontWeight: 600, minWidth: 24 }}>v{i + 1}</span>
                    <span>{v.ts}</span>
                    {i === item.versions.length - 1 && <span style={{ marginLeft: 'auto', color: T.green, fontWeight: 500 }}>current</span>}
                  </div>
                ))}
              </div>
            </details>
          )}

          {item.notes?.map((n, i) => (
            <div key={i} style={{ fontSize: 11, color: T.text2, marginBottom: 3, paddingLeft: 4, fontFamily: T.sans }}>· {n.text} <span style={{ opacity: 0.6 }}>{n.ts}</span></div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note…" aria-label="Add a note"
              onKeyDown={e => {
                if (e.key === 'Enter' && note.trim()) {
                  onUpdate({ ...item, notes: [...(item.notes || []), { text: note, ts: ts() }] })
                  setNote('')
                }
              }}
              style={{ flex: 1, padding: '7px 10px', border: `1px solid ${T.border2}`, borderRadius: 6, fontSize: 12, color: T.text0, background: T.bg3, outline: 'none', fontFamily: T.sans }} />
          </div>
        </div>
      )}
    </article>
  )
}

// ─── FORM PRIMITIVES ──────────────────────────────────────────────────────────
const Lbl = ({ id, children, hint }: { id: string; children: React.ReactNode; hint?: string }) => (
  <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 500, color: T.text1, marginBottom: 6, fontFamily: T.sans }}>
    {children}{hint && <span style={{ fontWeight: 400, color: T.text2, marginLeft: 6 }}>{hint}</span>}
  </label>
)

const inputBase: React.CSSProperties = { width: '100%', padding: '10px 12px', border: `1.5px solid ${T.border2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: T.text0, background: T.bg3, outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }
const taBase:    React.CSSProperties = { ...inputBase, resize: 'vertical' }
const selBase:   React.CSSProperties = { ...inputBase }

function RunBtn({ onClick, disabled, loading, label }: {
  onClick: () => void; disabled: boolean; loading: boolean; label: string
}) {
  return (
    <button onClick={onClick} disabled={disabled} aria-busy={loading}
      style={{ width: '100%', padding: '12px 0', background: disabled ? T.bg4 : T.purple, color: disabled ? T.text2 : '#fff',
               border: 'none', borderRadius: 9, fontWeight: 600, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
               fontFamily: T.sans, letterSpacing: 0.2, transition: 'background 0.15s' }}>
      {loading ? 'Working…' : label}
    </button>
  )
}

// ─── CHECK MODE ───────────────────────────────────────────────────────────────
function CheckMode({ onResult }: { onResult: (item: HistoryItem) => void }) {
  const [copy, setCopy]       = useState('')
  const [surface, setSurface] = useState('')
  const [loading, setLoading] = useState(false)

  async function run() {
    if (!copy.trim() || !surface) return
    setLoading(true)
    const prompt = `Check this Autocar India UI copy.

Surface: ${surface}
Copy: "${copy}"

Return in this exact format:

VERDICT:
PASS or FAIL

ISSUES FOUND:
[If FAIL: bullet each violation as "• [Rule] → what's wrong". If PASS: None.]

CORRECTED VERSION:
[Corrected copy, ready to use. If PASS, repeat original.]

OPTION A:
[Alternative that passes all rules]

OPTION B:
[Second alternative]

OPTION C — Benchmark-inspired:
[Draw from best practice on Autocar UK, CarDekho, Edmunds]

STRONGEST PICK:
Option [A/B/C] — [1-sentence reason]`
    const result = await callAPI([{ role: 'user', content: prompt }])
    onResult({ id: uid(), mode: 'check', summary: `"${copy.slice(0, 55)}"`, input: `${surface} · "${copy}"`, result, ts: ts(), versions: [{ text: result, ts: ts() }], notes: [] })
    setCopy(''); setSurface(''); setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Lbl id="cs-surf">Surface</Lbl>
        <select id="cs-surf" value={surface} onChange={e => setSurface(e.target.value)} style={selBase}>
          <option value="">Where does this copy appear?</option>
          {CTA_SURFACES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <Lbl id="cs-copy">Your copy</Lbl>
        <textarea id="cs-copy" value={copy} onChange={e => setCopy(e.target.value)} rows={4}
          placeholder={'Paste the exact string to check.\n\nExamples:\n• "Know more"\n• "₹12,50,000 - ₹16,50,000 Lakhs"\n• "Oops! No results found."\n• "Latest Cars"'}
          style={taBase} />
        <div style={{ fontSize: 11, color: T.text2, marginTop: 4, fontFamily: T.sans }}>{copy.length} chars</div>
      </div>
      <RunBtn onClick={run} disabled={!copy.trim() || !surface || loading} loading={loading} label="Check copy" />
    </div>
  )
}

// ─── GENERATE MODE ────────────────────────────────────────────────────────────
function GenerateMode({ onResult }: { onResult: (item: HistoryItem) => void }) {
  const [type, setType]               = useState('')
  const [context, setContext]         = useState('')
  const [constraints, setConstraints] = useState('')
  const [loading, setLoading]         = useState(false)

  async function run() {
    if (!type || !context.trim()) return
    setLoading(true)
    const prompt = `Generate Autocar India UX copy.

Element: ${type}
Context: ${context}
${constraints ? `Constraints: ${constraints}` : ''}

Return in this exact format:

OPTION 1 — Direct & specific:
[copy]
Rationale: [1 line]

OPTION 2 — User-need led:
[copy]
Rationale: [1 line]

OPTION 3 — Benchmark-inspired:
[copy — draw from Autocar UK, CarDekho, Edmunds best practice]
Rationale: [1 line]

RECOMMENDED:
Option [N] — [2 sentences on why it's the strongest for this surface and user context]

RULES APPLIED:
• [each guideline this output follows]`
    const result = await callAPI([{ role: 'user', content: prompt }])
    onResult({ id: uid(), mode: 'generate', summary: `${type}: ${context.slice(0, 45)}`, input: `${type} · ${context}`, result, ts: ts(), versions: [{ text: result, ts: ts() }], notes: [] })
    setType(''); setContext(''); setConstraints(''); setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Lbl id="gn-type">Element type</Lbl>
        <select id="gn-type" value={type} onChange={e => setType(e.target.value)} style={selBase}>
          <option value="">What do you need?</option>
          {GEN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <Lbl id="gn-ctx">Use case</Lbl>
        <textarea id="gn-ctx" value={context} onChange={e => setContext(e.target.value)} rows={5}
          placeholder={'Describe where this appears and what it does.\n\nExamples:\n• Primary CTA on a car listing card — leads to on-road price page\n• Section heading for SUVs under ₹15 lakh on the homepage\n• Error when search returns zero results for a specific car\n• Card metadata for a road test by Hormazd, published 3 days ago'}
          style={taBase} />
      </div>
      <div>
        <Lbl id="gn-con" hint="(optional)">Additional constraints</Lbl>
        <input id="gn-con" type="text" value={constraints} onChange={e => setConstraints(e.target.value)}
          placeholder="Character limit, words to avoid, car model names, etc."
          style={inputBase} />
      </div>
      <RunBtn onClick={run} disabled={!type || !context.trim() || loading} loading={loading} label="Generate options" />
    </div>
  )
}

// ─── SCAN MODE ────────────────────────────────────────────────────────────────
function ScanMode({ onResult }: { onResult: (item: HistoryItem) => void }) {
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgPrev, setImgPrev] = useState<string | null>(null)
  const [imgB64, setImgB64]   = useState<string | null>(null)
  const [imgType, setImgType] = useState('image/png')
  const [context, setContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File | null | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setImgFile(file); setImgType(file.type)
    setImgPrev(URL.createObjectURL(file))
    setImgB64(await toBase64(file))
  }

  async function run() {
    if (!imgB64) return
    setLoading(true)
    const prompt = `You are reviewing an Autocar India product UI screenshot.

${context ? `Screen context: ${context}` : ''}

1. LIST every visible copy element on screen
2. CHECK each against Autocar India v2.0 guidelines
3. FLAG each violation with exact correction
4. IDENTIFY missing copy or placeholder text

Return in this exact format:

COPY ELEMENTS FOUND:
[bullet list of every string you can see]

VIOLATIONS:
• [Element] — "[current]" → "[corrected]" — Rule: [which rule]
(Write "None" if all copy passes)

MISSING COPY:
• [UI element] → Suggested: "[copy]" — [why needed]
(Write "None" if no gaps)

QUICK WINS:
1. [highest impact fix]
2. [second most important]
3. [third most important]`

    const msgs = [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: imgType, data: imgB64 } }, { type: 'text', text: prompt }] }]
    const result = await callAPI(msgs, 1500)
    onResult({ id: uid(), mode: 'scan', summary: imgFile?.name || 'Uploaded screen', input: context || 'Screen scan', result, imagePreview: imgPrev ?? undefined, ts: ts(), versions: [{ text: result, ts: ts() }], notes: [] })
    setImgFile(null); setImgPrev(null); setImgB64(null); setContext(''); setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Lbl id="sc-img">Screen upload</Lbl>
        <div
          role="button" tabIndex={0} aria-label="Upload screenshot — click or drag and drop"
          onClick={() => fileRef.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
          style={{ border: `2px dashed ${dragging ? T.purple : T.border2}`, borderRadius: 10, padding: '20px 16px',
                   textAlign: 'center', cursor: 'pointer', background: dragging ? T.purpleBg : T.bg3,
                   transition: 'all 0.15s', minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {imgPrev ? (
            <div style={{ width: '100%' }}>
              <img src={imgPrev} alt="Uploaded screen preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 7, objectFit: 'contain' }} />
              <div style={{ fontSize: 11, color: T.text2, marginTop: 6, fontFamily: T.sans }}>{imgFile?.name} · click to replace</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 24, color: T.text2, marginBottom: 6, lineHeight: 1 }}>↑</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text1, fontFamily: T.sans }}>Upload a screen</div>
              <div style={{ fontSize: 12, color: T.text2, marginTop: 3, fontFamily: T.sans }}>Drag and drop or click · PNG, JPG, WebP</div>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files?.[0])} style={{ display: 'none' }} aria-label="File input" />
      </div>
      <div>
        <Lbl id="sc-ctx" hint="(optional)">Screen context</Lbl>
        <input id="sc-ctx" type="text" value={context} onChange={e => setContext(e.target.value)}
          placeholder="e.g. Car detail page · listing page · comparison tool"
          style={inputBase} />
      </div>
      <RunBtn onClick={run} disabled={!imgB64 || loading} loading={loading} label="Scan screen" />
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AutocarDemo() {
  const [mode, setMode]         = useState('check')
  const [history, dispatch]     = useReducer(historyReducer, [])
  const [histOpen, setHistOpen] = useState(false)

  function addResult(item: HistoryItem | null) { if (!item) return; dispatch({ type: 'ADD', item }); setHistOpen(true) }

  const activeMode = MODES.find(m => m.id === mode)!

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: T.sans, background: T.bg0, color: T.text0, overflow: 'hidden' }}>
      {/* ── HEADER ── */}
      <header style={{ background: T.bg1, borderBottom: `1px solid ${T.border1}`, padding: '0 20px', display: 'flex', alignItems: 'center', height: 52, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 28 }}>
          <div style={{ width: 30, height: 30, background: T.accent, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 14, flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: T.text0, lineHeight: 1.2, letterSpacing: 0.2 }}>Autocar India</div>
            <div style={{ fontSize: 10, color: T.text2, lineHeight: 1.2 }}>UX content platform</div>
          </div>
        </div>

        <nav aria-label="Tools" style={{ display: 'flex', gap: 2, flex: 1 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} role="tab" aria-selected={mode === m.id}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 16px', border: 'none', borderRadius: 7,
                       background: mode === m.id ? '#FFFFFF12' : 'none', color: mode === m.id ? T.text0 : T.text2,
                       cursor: 'pointer', fontSize: 13, fontWeight: mode === m.id ? 500 : 400, transition: 'all 0.15s', fontFamily: T.sans }}>
              <span style={{ fontSize: 12, opacity: mode === m.id ? 1 : 0.6 }}>{m.icon}</span>
              {m.label}
            </button>
          ))}
        </nav>

        <button onClick={() => setHistOpen(h => !h)} aria-expanded={histOpen} aria-label={`${histOpen ? 'Hide' : 'Show'} history`}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', border: `1px solid ${histOpen ? T.purple : T.border2}`, borderRadius: 7,
                   background: histOpen ? T.purpleBg : 'none', cursor: 'pointer', fontSize: 12, color: histOpen ? T.purpleL : T.text2, marginLeft: 8, fontFamily: T.sans, transition: 'all 0.15s' }}>
          ◷ History
          {history.length > 0 && <span style={{ background: T.purple, color: '#fff', borderRadius: 10, padding: '0 6px', fontSize: 10, fontWeight: 700 }}>{history.length}</span>}
        </button>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <main id="ac-main" tabIndex={-1} aria-label={activeMode.full}
          style={{ flex: histOpen ? '0 0 400px' : 1, minWidth: 300, overflowY: 'auto', padding: 24, background: T.bg0, borderRight: histOpen ? `1px solid ${T.border1}` : 'none' }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 5px', color: T.text0, letterSpacing: -0.2 }}>{activeMode.full}</h2>
              <p style={{ fontSize: 13, color: T.text2, margin: 0, lineHeight: 1.6 }}>{activeMode.desc}</p>
            </div>

            <div style={{ background: T.bg1, borderRadius: 12, border: `1px solid ${T.border1}`, padding: 22 }}>
              {mode === 'check'    && <CheckMode    onResult={addResult} />}
              {mode === 'generate' && <GenerateMode onResult={addResult} />}
              {mode === 'scan'     && <ScanMode     onResult={addResult} />}
            </div>

            <section aria-label="Quick reference" style={{ marginTop: 16, background: T.bg1, borderRadius: 10, border: `1px solid ${T.border1}`, padding: 16 }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, color: T.text2, letterSpacing: 0.8, margin: '0 0 12px', textTransform: 'uppercase' }}>Quick reference</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { l: 'CTAs',     t: 'Sentence case · verb first · ≤4 words · no !' },
                  { l: 'Headings', t: 'Sentence case · ≤8 words · no full stop' },
                  { l: 'Prices',   t: '₹12.5 Lakh · en dash – · always label type' },
                  { l: 'Errors',   t: 'What happened + 1 action · no blame · no !' },
                  { l: 'Specs',    t: 'Always include unit · mm, L, km/l, bhp, Nm' },
                  { l: 'Metadata', t: 'Middle dot · DD Mon YYYY · By First Last' },
                ].map(r => (
                  <div key={r.l} style={{ background: T.bg3, borderRadius: 7, padding: '9px 11px' }}>
                    <div style={{ fontWeight: 600, fontSize: 11, color: T.text1, marginBottom: 3, letterSpacing: 0.2 }}>{r.l}</div>
                    <div style={{ fontSize: 11, color: T.text2, lineHeight: 1.55 }}>{r.t}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {histOpen && (
          <aside aria-label="Session history" style={{ flex: 1, overflowY: 'auto', padding: 24, background: T.bg0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, margin: 0, color: T.text0 }}>Session history</h3>
              {history.length > 0 && (
                <button onClick={() => dispatch({ type: 'CLEAR' })} aria-label="Clear all history"
                  style={{ fontSize: 12, color: T.text2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.sans }}>Clear all</button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: T.text2 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>◷</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text1, marginBottom: 4 }}>No results yet</div>
                <div style={{ fontSize: 12 }}>Run a check, generate copy, or scan a screen.</div>
              </div>
            ) : (
              <div>
                {history.map(item => (
                  <HistoryCard key={item.id} item={item} onUpdate={u => dispatch({ type: 'UPDATE', item: u })} onDelete={id => dispatch({ type: 'DELETE', id })} />
                ))}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}
