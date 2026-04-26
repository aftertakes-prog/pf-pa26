'use client'
import { useState, useRef } from 'react'

// ── Constants ────────────────────────────────────────────────────────────────
const PODS = ['Buy','Sell','Exchange','Insurance','Loans','VAS','Garage','CX','Auctions','Super App','AI Assistant','Pro Service','Other']
const COPY_TYPES = ['CTA / Button','Error Message','Tooltip','Form Placeholder','Empty State','Loading State','Success State','Bottom Sheet','Notification','Banner','Helper Text','Headline','Carousel / Slider','Modal / Dialog','Tab Bar / Nav','Onboarding Screen','Other']
const FLOWS = ['Homepage','PLP','PDP','Test Drive','Checkout','Loan Flow','Insurance Flow','App Download','Car Comparison','Sell Flow','Exchange Flow','Auction','My Account','Other']
const USER_STATES = ['New / Guest','Engaged Buyer','Returning User','Logged In','Seller','Dealer / Partner']
const STATUSES = ['Draft','In Review','Approved','Live']
const STATUS_COLORS: Record<string, string> = { Draft:'#6b7280', 'In Review':'#b45309', Approved:'#2563eb', Live:'#15803d' }

const SYSTEM_PROMPT = `You are a senior UX writer at Spinny, India's leading full-stack used car platform. You know Spinny's brand voice deeply.

SPINNY VOICE RULES:
- Trust-first, transparent, human. Never preachy or salesy.
- Sentence case for all copy. CTAs in title case only if designer specifies.
- CTAs signal discovery not commitment: "Unlock my EMI" not "Apply Now".
- Headlines: max 6-8 words. CTAs: max 3-5 words. Helper text: max 2 lines.
- Empty/error states: empathetic, non-blaming, always offer a recovery path.
- Loading states: never silent — reassure, educate lightly, reduce anxiety.
- High-stakes moments (payment, loan, missed test drive): extra human and clear.
- Never use exclamation marks for errors or warnings.
- Avoid: jargon, passive voice, vague CTAs like "Click here" or "Submit".

POD CONTEXT:
- Buy: high-consideration, anxiety-driven. Reassurance + clarity at every step.
- Sell: price anchoring is real. Set expectations early, reassure post-inspection.
- Exchange: multi-step, high stakes. Inspection is the mandatory anchor.
- Insurance: mistrust-prone. Educate lightly, reassure constantly.
- Loans: creditworthiness anxiety. Never shame. Always offer recovery.
- Auctions: dealer/B2B audience. Efficiency + ROI language. Still human.
- CX: empathy-first, resolution-led.

IMPORTANT: Respond ONLY with valid raw JSON. No markdown, no backticks, no commentary outside JSON.`

// ── Types ────────────────────────────────────────────────────────────────────
interface Variant { label: string; copy: string; rationale: string }

interface CheckData {
  verdict: string
  scores: { clarity: number; brandVoice: number; grammar: number; conciseness: number }
  scoreNotes: { clarity: string; brandVoice: string; grammar: string; conciseness: string }
  issues: string[]
  alternatives: Variant[]
}

interface GenerateData { variants: Variant[]; tips: string[] }

interface CopyElement {
  element: string; currentCopy: string; verdict: string; issue?: string; improved?: string
}
interface ImageData {
  detectedPod: string; detectedFlow: string; detectedState: string
  copyElements: CopyElement[]; overallNotes?: string
}

interface AnalysisResult { mode: number; data: CheckData | GenerateData | ImageData }

interface LibraryItem {
  id: number; copy: string; label: string; pod: string
  copyType: string; flow: string; status: string; date: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getVerdictStyle(v: string) {
  if (v === 'Approved')       return { bg:'#f0fdf4', border:'#86efac', text:'#15803d' }
  if (v === 'Needs Revision') return { bg:'#fffbeb', border:'#fcd34d', text:'#b45309' }
  if (v === 'Rewrite')        return { bg:'#fef2f2', border:'#fca5a5', text:'#b91c1c' }
  return { bg:'#f9fafb', border:'#e5e7eb', text:'#374151' }
}

function getScoreColor(s: number) {
  if (s >= 4) return '#15803d'
  if (s >= 3) return '#b45309'
  return '#b91c1c'
}

function parseJSON(raw: string) {
  const cleaned = raw.replace(/```json|```/gi, '').trim()
  const start = cleaned.indexOf('{')
  const end   = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON object found in response')
  return JSON.parse(cleaned.slice(start, end + 1))
}

async function callClaude(messages: object[]) {
  const res = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages }),
  })
  if (!res.ok) { const t = await res.text(); throw new Error(`API ${res.status}: ${t}`) }
  const data = await res.json()
  const text = (data.content || []).filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('')
  return parseJSON(text)
}

// ── Shared UI components ─────────────────────────────────────────────────────
function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5, letterSpacing:'0.02em' }}>
      {children}
    </label>
  )
}

function SpSelect({ id, value, onChange, options, placeholder }: {
  id: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <select id={id} value={value} onChange={e => onChange(e.target.value)}
      style={{ width:'100%', padding:'9px 10px', border:`1.5px solid ${value ? '#7c3aed' : '#d1d5db'}`, borderRadius:8,
               fontSize:13, color: value ? '#111' : '#9ca3af', background:'#fff', fontFamily:'inherit',
               outline:'none', cursor:'pointer', boxSizing:'border-box' }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function SpTextarea({ id, value, onChange, placeholder, rows = 3 }: {
  id: string; value: string; onChange: (v: string) => void; placeholder: string; rows?: number
}) {
  return (
    <textarea id={id} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{ width:'100%', padding:'9px 10px', border:'1.5px solid #d1d5db', borderRadius:8, fontSize:13,
               fontFamily:'inherit', outline:'none', resize:'vertical', boxSizing:'border-box', lineHeight:1.5 }} />
  )
}

function ScoreBar({ label, score, note }: { label: string; score: number; note?: string }) {
  const color = getScoreColor(score)
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
        <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{label}</span>
        <span style={{ fontSize:12, fontWeight:700, color }}>{score}/5</span>
      </div>
      <div style={{ height:5, background:'#f3f4f6', borderRadius:99 }}>
        <div style={{ height:'100%', width:`${(score / 5) * 100}%`, background:color, borderRadius:99 }} />
      </div>
      {note && <p style={{ fontSize:11, color:'#6b7280', margin:'3px 0 0', lineHeight:1.4 }}>{note}</p>}
    </div>
  )
}

function CopyCard({ variant, onSave }: { variant: Variant; onSave: (copy: string, label: string) => void }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard?.writeText(variant.copy).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }
  return (
    <div style={{ border:'1.5px solid #e5e7eb', borderRadius:10, padding:14, marginBottom:10, background:'#fafafa' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:7 }}>
        <span style={{ fontSize:11, fontWeight:700, color:'#7c3aed', textTransform:'uppercase', letterSpacing:'0.05em' }}>{variant.label}</span>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={handleCopy} style={{ fontSize:11, color:'#6b7280', background:'#f3f4f6', border:'none', borderRadius:6, padding:'3px 9px', cursor:'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>
          <button onClick={() => onSave(variant.copy, variant.label)} style={{ fontSize:11, color:'#7c3aed', background:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:6, padding:'3px 9px', cursor:'pointer' }}>Save</button>
        </div>
      </div>
      <p style={{ fontSize:14, color:'#111', fontWeight:600, margin:'0 0 6px', lineHeight:1.5 }}>{variant.copy}</p>
      <p style={{ fontSize:12, color:'#6b7280', margin:0, lineHeight:1.4 }}>{variant.rationale}</p>
    </div>
  )
}

// ── Result panels ─────────────────────────────────────────────────────────────
function CheckResult({ data, onSave }: { data: CheckData; onSave: (copy: string, label: string) => void }) {
  const vs = getVerdictStyle(data.verdict)
  return (
    <div style={{ background:vs.bg, border:`1.5px solid ${vs.border}`, borderRadius:14, padding:20 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <span style={{ fontSize:16, fontWeight:700, color:'#111' }}>Copy Check</span>
        <span style={{ fontSize:13, fontWeight:700, color:vs.text, background:'#fff', border:`1.5px solid ${vs.border}`, borderRadius:20, padding:'4px 16px' }}>{data.verdict}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px', marginBottom:16 }}>
        <ScoreBar label="Clarity"     score={data.scores?.clarity    ?? 0} note={data.scoreNotes?.clarity} />
        <ScoreBar label="Brand Voice" score={data.scores?.brandVoice ?? 0} note={data.scoreNotes?.brandVoice} />
        <ScoreBar label="Grammar"     score={data.scores?.grammar    ?? 0} note={data.scoreNotes?.grammar} />
        <ScoreBar label="Conciseness" score={data.scores?.conciseness ?? 0} note={data.scoreNotes?.conciseness} />
      </div>
      {data.issues?.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:12, fontWeight:700, color:'#374151', margin:'0 0 7px' }}>Issues Flagged</p>
          {data.issues.map((iss, i) => (
            <p key={i} style={{ fontSize:13, color:'#374151', margin:'0 0 5px', paddingLeft:12, borderLeft:'2px solid #fca5a5', lineHeight:1.4 }}>⚠ {iss}</p>
          ))}
        </div>
      )}
      <p style={{ fontSize:12, fontWeight:700, color:'#374151', margin:'0 0 10px' }}>Better Alternatives</p>
      {(data.alternatives || []).map((v, i) => <CopyCard key={i} variant={v} onSave={onSave} />)}
    </div>
  )
}

function GenerateResult({ data, onSave }: { data: GenerateData; onSave: (copy: string, label: string) => void }) {
  return (
    <div style={{ background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:14, padding:20 }}>
      <p style={{ fontSize:16, fontWeight:700, color:'#111', margin:'0 0 14px' }}>Generated Variants</p>
      {(data.variants || []).map((v, i) => <CopyCard key={i} variant={v} onSave={onSave} />)}
      {data.tips?.length > 0 && (
        <div style={{ marginTop:14, background:'#f5f3ff', borderRadius:10, padding:14 }}>
          <p style={{ fontSize:12, fontWeight:700, color:'#7c3aed', margin:'0 0 7px' }}>UX Writing Tips</p>
          {data.tips.map((t, i) => <p key={i} style={{ fontSize:12, color:'#4b5563', margin:'0 0 4px', lineHeight:1.4 }}>• {t}</p>)}
        </div>
      )}
    </div>
  )
}

function ImageResult({ data, onSave }: { data: ImageData; onSave: (copy: string, label: string) => void }) {
  return (
    <div style={{ background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:14, padding:20 }}>
      <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
        {([['Pod', data.detectedPod], ['Flow', data.detectedFlow], ['State', data.detectedState]] as [string, string][])
          .filter(([, v]) => v)
          .map(([l, v]) => (
            <span key={l} style={{ fontSize:12, background:'#f5f3ff', color:'#7c3aed', border:'1px solid #ddd6fe', borderRadius:20, padding:'3px 12px', fontWeight:600 }}>{l}: {v}</span>
          ))}
      </div>
      <p style={{ fontSize:16, fontWeight:700, color:'#111', margin:'0 0 14px' }}>Copy Elements Detected</p>
      {(data.copyElements || []).map((el, i) => {
        const vs = getVerdictStyle(el.verdict)
        return (
          <div key={i} style={{ border:`1px solid ${vs.border}`, borderRadius:10, padding:12, marginBottom:10, background:vs.bg }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase' }}>{el.element}</span>
              <span style={{ fontSize:11, fontWeight:700, color:vs.text }}>{el.verdict}</span>
            </div>
            <p style={{ fontSize:13, color:'#374151', margin:'0 0 4px' }}><strong>Current:</strong> {el.currentCopy}</p>
            {el.issue    && <p style={{ fontSize:12, color:'#b45309', margin:'0 0 4px' }}>⚠ {el.issue}</p>}
            {el.improved && (
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                <p style={{ fontSize:13, color:'#15803d', margin:0 }}>✓ <strong>Improved:</strong> {el.improved}</p>
                <button onClick={() => onSave(el.improved!, el.element)} style={{ fontSize:11, color:'#7c3aed', background:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:6, padding:'3px 9px', cursor:'pointer', flexShrink:0 }}>Save</button>
              </div>
            )}
          </div>
        )
      })}
      {data.overallNotes && (
        <p style={{ fontSize:13, color:'#374151', background:'#f5f3ff', borderRadius:10, padding:14, margin:'4px 0 0', lineHeight:1.5 }}>{data.overallNotes}</p>
      )}
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function SpinnyDemo() {
  const [tab, setTab]                     = useState(0)
  const [pod, setPod]                     = useState('')
  const [copyType, setCopyType]           = useState('')
  const [copyTypeCustom, setCopyTypeCustom] = useState('')
  const [flow, setFlow]                   = useState('')
  const [userState, setUserState]         = useState('')
  const [existingCopy, setExistingCopy]   = useState('')
  const [brief, setBrief]                 = useState('')
  const [imgB64, setImgB64]               = useState<string | null>(null)
  const [imgPreview, setImgPreview]       = useState<string | null>(null)
  const [imgMime, setImgMime]             = useState('image/jpeg')
  const [loading, setLoading]             = useState(false)
  const [result, setResult]               = useState<AnalysisResult | null>(null)
  const [err, setErr]                     = useState('')
  const [library, setLibrary]             = useState<LibraryItem[]>([])
  const [showLib, setShowLib]             = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleTabChange(i: number) { setTab(i); setResult(null); setErr(''); setCopyTypeCustom('') }

  function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setImgMime(f.type || 'image/jpeg')
    const reader = new FileReader()
    reader.onload = ev => {
      const res = ev.target?.result as string
      setImgB64(res.split(',')[1])
      setImgPreview(res)
    }
    reader.readAsDataURL(f)
  }

  function removeImg() {
    setImgB64(null); setImgPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  function buildContext() {
    const resolvedCopyType = copyType === 'Other' && copyTypeCustom ? copyTypeCustom : copyType
    return [pod && `Pod: ${pod}`, resolvedCopyType && `Copy type: ${resolvedCopyType}`, flow && `Screen/Flow: ${flow}`, userState && `User state: ${userState}`].filter(Boolean).join(' | ')
  }

  function buildMessages() {
    const ctx = buildContext()
    if (tab === 0) {
      const prompt = `CHECK THIS COPY.

Copy to check: "${existingCopy}"
${ctx ? `Constraints: ${ctx}` : ''}
${brief ? `Extra context: ${brief}` : ''}

Return ONLY this JSON (no other text):
{
  "verdict": "Approved",
  "scores": { "clarity": 4, "brandVoice": 3, "grammar": 5, "conciseness": 4 },
  "scoreNotes": { "clarity": "one line", "brandVoice": "one line", "grammar": "one line", "conciseness": "one line" },
  "issues": ["issue 1"],
  "alternatives": [
    { "label": "Safe & Direct", "copy": "...", "rationale": "..." },
    { "label": "Warm & Human", "copy": "...", "rationale": "..." },
    { "label": "Bold & Clear", "copy": "...", "rationale": "..." }
  ]
}`
      return [{ role:'user', content: prompt }]
    }
    if (tab === 1) {
      const prompt = `GENERATE UX COPY.

${ctx ? `Constraints: ${ctx}` : ''}
Brief: ${brief || 'Generate appropriate copy for this context.'}

Return ONLY this JSON (no other text):
{
  "variants": [
    { "label": "Safe & Direct", "copy": "...", "rationale": "..." },
    { "label": "Warm & Human", "copy": "...", "rationale": "..." },
    { "label": "Minimal & Punchy", "copy": "...", "rationale": "..." },
    { "label": "Empathetic & Reassuring", "copy": "...", "rationale": "..." },
    { "label": "Informative & Clear", "copy": "...", "rationale": "..." }
  ],
  "tips": ["tip 1", "tip 2"]
}`
      return [{ role:'user', content: prompt }]
    }
    const prompt = `ANALYSE THIS DESIGN SCREEN.

${ctx ? `Context: ${ctx}` : ''}
${brief ? `Additional context: ${brief}` : ''}

Identify the pod, flow, all visible copy elements. Check each for quality against Spinny brand voice. Suggest improvements.

Return ONLY this JSON (no other text):
{
  "detectedPod": "Buy",
  "detectedFlow": "PDP",
  "detectedState": "loading",
  "copyElements": [
    { "element": "Headline", "currentCopy": "...", "verdict": "Needs Revision", "issue": "...", "improved": "..." }
  ],
  "overallNotes": "..."
}`
    return [{ role:'user', content: [
      { type:'image', source:{ type:'base64', media_type: imgMime, data: imgB64 } },
      { type:'text', text: prompt }
    ]}]
  }

  async function run() {
    setErr('')
    if (tab === 0 && !existingCopy.trim()) return setErr('Please paste the copy you want to check.')
    if (tab === 1 && !brief.trim() && !pod && !copyType) return setErr('Please add a brief or select at least a pod and copy type.')
    if (tab === 2 && !imgB64) return setErr('Please upload a design screen image.')
    setLoading(true); setResult(null)
    try {
      const parsed = await callClaude(buildMessages())
      setResult({ mode: tab, data: parsed })
    } catch (e) {
      setErr('Error: ' + (e as Error).message)
    }
    setLoading(false)
  }

  function saveToLibrary(copy: string, label: string) {
    const imgData = result?.data as ImageData | undefined
    setLibrary(prev => [{
      id: Date.now(), copy, label,
      pod: pod || imgData?.detectedPod || '—',
      copyType: copyType || '—',
      flow: flow || imgData?.detectedFlow || '—',
      status: 'Draft',
      date: new Date().toLocaleDateString('en-IN'),
    }, ...prev])
  }

  function updateStatus(id: number, status: string) {
    setLibrary(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const TABS = ['✓  Check Copy', '✦  Generate Copy', '⊞  Image Analysis']

  return (
    // position: relative so the absolute library panel is contained
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:'#f8f9fa', height:'100%', overflowY:'auto', position:'relative' }}>

      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, background:'linear-gradient(135deg,#7c3aed,#6d28d9)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'#fff', fontWeight:800, fontSize:16 }}>S</span>
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:'#111' }}>Spinny Copy Studio</div>
            <div style={{ fontSize:11, color:'#9ca3af' }}>Internal UX Copy Tool</div>
          </div>
        </div>
        <button onClick={() => setShowLib(v => !v)}
          style={{ fontSize:12, fontWeight:600, color:'#7c3aed', background:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:8, padding:'7px 14px', cursor:'pointer' }}>
          📚 Library {library.length > 0 && `(${library.length})`}
        </button>
      </div>

      {/* Main */}
      <div style={{ maxWidth:700, margin:'0 auto', padding:'20px 16px 60px' }}>

        {/* Tabs */}
        <div style={{ display:'flex', background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:5, marginBottom:20, gap:4 }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => handleTabChange(i)}
              style={{ flex:1, padding:'10px 12px', borderRadius:8, border:'none', fontSize:13, fontWeight: tab===i ? 700 : 500,
                       background: tab===i ? '#7c3aed' : 'transparent', color: tab===i ? '#fff' : '#6b7280', cursor:'pointer', transition:'all 0.15s' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Context fields */}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:18, marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#7c3aed', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>
            Context — Hard Constraints for the Model
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <div>
              <Label htmlFor="sp-pod">Pod / Team</Label>
              <SpSelect id="sp-pod" value={pod} onChange={setPod} options={PODS} placeholder="Select pod…" />
            </div>
            <div>
              <Label htmlFor="sp-ct">Copy Type</Label>
              <SpSelect id="sp-ct" value={copyType} onChange={setCopyType} options={COPY_TYPES} placeholder="Select type…" />
              {copyType === 'Other' && (
                <input value={copyTypeCustom} onChange={e => setCopyTypeCustom(e.target.value)}
                  placeholder="Describe the copy type…"
                  style={{ width:'100%', marginTop:6, padding:'8px 10px', border:'1.5px solid #7c3aed', borderRadius:8, fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }} />
              )}
            </div>
            <div>
              <Label htmlFor="sp-fl">Screen / Flow</Label>
              <SpSelect id="sp-fl" value={flow} onChange={setFlow} options={FLOWS} placeholder="Select screen…" />
            </div>
            <div>
              <Label htmlFor="sp-us">User State</Label>
              <SpSelect id="sp-us" value={userState} onChange={setUserState} options={USER_STATES} placeholder="Select user…" />
            </div>
          </div>
        </div>

        {/* Mode-specific input */}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:18, marginBottom:14 }}>
          {tab === 0 && (
            <div style={{ marginBottom:14 }}>
              <Label htmlFor="sp-copy">Copy to Check <span style={{ color:'#7c3aed' }}>*</span></Label>
              <SpTextarea id="sp-copy" value={existingCopy} onChange={setExistingCopy}
                placeholder="Paste the copy here — button label, error message, tooltip, headline, notification…" rows={3} />
            </div>
          )}
          {tab === 2 && (
            <div style={{ marginBottom:14 }}>
              <Label>Design Screen <span style={{ color:'#7c3aed' }}>*</span></Label>
              <div onClick={() => fileRef.current?.click()}
                style={{ border:'2px dashed #c4b5fd', borderRadius:10, padding: imgPreview ? 8 : 28, textAlign:'center', background:'#faf5ff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
                {imgPreview
                  ? <img src={imgPreview} alt="Uploaded screen" style={{ maxHeight:180, maxWidth:'100%', borderRadius:8, display:'block' }} />
                  : <>
                      <div style={{ fontSize:28, marginBottom:6 }}>⬆</div>
                      <div style={{ fontSize:13, color:'#7c3aed', fontWeight:600 }}>Upload Figma screenshot or design screen</div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginTop:4 }}>PNG, JPG, WebP</div>
                    </>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImg} style={{ display:'none' }} />
              {imgPreview && (
                <button onClick={removeImg} style={{ marginTop:6, fontSize:11, color:'#b91c1c', background:'none', border:'none', cursor:'pointer', padding:0 }}>✕ Remove image</button>
              )}
            </div>
          )}
          <div>
            <Label htmlFor="sp-brief">
              {tab === 1 ? <><span>Brief / Context</span> <span style={{ color:'#7c3aed' }}>*</span></> : 'Additional Context (optional)'}
            </Label>
            <SpTextarea id="sp-brief" value={brief} onChange={setBrief}
              placeholder={
                tab === 0 ? 'What just happened? What is the user trying to do? Any constraints?' :
                tab === 1 ? 'Describe the screen state, what the user just did, emotional context, character limits…' :
                'Which flow or feature does this screen belong to? Anything the model should know?'
              }
              rows={2} />
          </div>
        </div>

        {/* Error */}
        {err && (
          <div style={{ background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#b91c1c', marginBottom:14 }}>
            {err}
          </div>
        )}

        {/* CTA */}
        <button onClick={run} disabled={loading}
          style={{ width:'100%', padding:14, background: loading ? '#a78bfa' : '#7c3aed', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Analysing with Spinny voice…' : tab === 0 ? 'Check This Copy' : tab === 1 ? 'Generate Copy Variants' : 'Analyse Design Screen'}
        </button>

        {/* Results */}
        {result && (
          <div style={{ marginTop:20 }}>
            {result.mode === 0 && <CheckResult  data={result.data as CheckData}    onSave={saveToLibrary} />}
            {result.mode === 1 && <GenerateResult data={result.data as GenerateData} onSave={saveToLibrary} />}
            {result.mode === 2 && <ImageResult  data={result.data as ImageData}    onSave={saveToLibrary} />}
          </div>
        )}
      </div>

      {/* Library panel — absolute so it stays within the demo frame */}
      {showLib && (
        <div style={{ position:'absolute', top:0, right:0, width:360, height:'100%', background:'#fff', boxShadow:'-4px 0 30px rgba(0,0,0,0.12)', zIndex:50, overflowY:'auto', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#fff' }}>
            <div style={{ fontSize:15, fontWeight:700, color:'#111' }}>Copy Library</div>
            <button onClick={() => setShowLib(false)} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#9ca3af', lineHeight:1 }}>×</button>
          </div>
          <div style={{ padding:'14px 16px', flex:1 }}>
            {library.length === 0
              ? <div style={{ textAlign:'center', color:'#9ca3af', fontSize:13, marginTop:60, lineHeight:1.6 }}>No saved copies yet.<br />Generate or check copy and hit Save.</div>
              : library.map(c => (
                <div key={c.id} style={{ border:'1px solid #e5e7eb', borderRadius:10, padding:12, marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#7c3aed' }}>{c.pod} · {c.label}</span>
                    <span style={{ fontSize:10, color:'#9ca3af' }}>{c.date}</span>
                  </div>
                  <p style={{ fontSize:13, color:'#111', fontWeight:500, margin:'0 0 8px', lineHeight:1.5 }}>{c.copy}</p>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {STATUSES.map(s => {
                      const active = c.status === s
                      const col = STATUS_COLORS[s]
                      return (
                        <button key={s} onClick={() => updateStatus(c.id, s)}
                          style={{ fontSize:10, padding:'2px 9px', borderRadius:20, border:`1px solid ${active ? col : '#e5e7eb'}`,
                                   fontWeight: active ? 700 : 400, background: active ? '#fff' : 'transparent', color: active ? col : '#9ca3af', cursor:'pointer' }}>
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
