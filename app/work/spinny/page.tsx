import Link from 'next/link'
import Nav from '@/components/Nav'
import BrandDemoFrame from '@/components/BrandDemoFrame'

export const metadata = {
  title: 'Spinny AI Copy Studio — Pooja Koundal',
  description: 'How a constraint-based AI writing system scaled UX copy across 9 product surfaces and two brand voices.',
}

export default function SpinnyPage() {
  return (
    <>
      <Nav />
      <main className="cs-main">

        {/* Hero */}
        <section className="cs-hero">
          <Link href="/#work" className="cs-back">← Selected Work</Link>
          <p className="cs-kicker">UX Writing · AI Tooling · Case Study</p>
          <h1 className="cs-hero__title">Building AI into the writing process</h1>
          <p className="cs-hero__thesis">
            AI tools don&apos;t make writers faster. Wrong ones just make wrong things faster. The question I kept asking was: what would a tool need to know to actually be useful here — and what would it take to build that?
          </p>
          <div className="cs-meta-strip">
            <span className="cs-meta-tag"><strong>Role</strong> UX Writer</span>
            <span className="cs-meta-tag"><strong>Scope</strong> Spinny · Autocar India</span>
            <span className="cs-meta-tag"><strong>What</strong> AI CMS · 2 brand skills · GPT → Claude migration</span>
            <span className="cs-meta-tag"><strong>Timeline</strong> Oct 2025 – Apr 2026</span>
          </div>
        </section>

        {/* Body */}
        <article className="cs-body">

          {/* 01. Problem */}
          <section className="cs-section">
            <span className="cs-label">01. Problem</span>
            <h2>Generic AI doesn&apos;t know what good copy sounds like here</h2>
            <p>
              By late 2025, the Spinny design team was shipping across 9+ surfaces simultaneously — buy, sell, loans, insurance, auctions, Autocar, internal tools, and more. A custom GPT existed but it wasn&apos;t scaling. Off-the-shelf AI was faster than nothing, but it didn&apos;t know Spinny&apos;s voice, Autocar&apos;s rules, or the emotional register of a user mid-loan application.
            </p>
            <p>
              The problem wasn&apos;t AI capability. It was context. The tools had no idea where they were.
            </p>
            <div className="csbuy-stat-row">
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">500+</div>
                <div className="csbuy-stat-d">Tickets across product, AI, brand, growth, and internal tools over the full tenure</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">9+</div>
                <div className="csbuy-stat-d">Distinct product surfaces — each with its own voice, user mindset, and content stakes</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">2</div>
                <div className="csbuy-stat-d">Brands with fundamentally different voices needing separate, enforced content guidelines</div>
              </div>
            </div>
            <p>The before state was this: any designer could paste a request into a generic AI tool and get output that looked like copy but failed on voice, failed on rules, and sometimes failed on basic things like case or character limits. Reviewing that output took as long as writing it.</p>
            <div className="cs-ba-split">
              <div className="cs-ba-col">
                <div className="cs-ba-head before">Before — generic AI</div>
                <div className="cs-ba-body">
                  <div className="cs-ba-row"><span className="cs-ba-dot dot-empty" />No brand voice. Outputs feel off.</div>
                  <div className="cs-ba-row"><span className="cs-ba-dot dot-empty" />Doesn&apos;t know pod context or user mindset</div>
                  <div className="cs-ba-row"><span className="cs-ba-dot dot-empty" />Violates Autocar casing and length rules</div>
                  <div className="cs-ba-row"><span className="cs-ba-dot dot-empty" />No copy library. Nothing is saved or reusable.</div>
                  <div className="cs-ba-row"><span className="cs-ba-dot dot-empty" />UX writer reviews everything from scratch</div>
                </div>
              </div>
              <div className="cs-ba-col">
                <div className="cs-ba-head after">After — branded skill + CMS</div>
                <div className="cs-ba-body">
                  <div className="cs-ba-row active"><span className="cs-ba-dot dot-full" />Voice rules enforced at generation time</div>
                  <div className="cs-ba-row active"><span className="cs-ba-dot dot-full" />Pod-aware: knows Loans ≠ Garage ≠ Auctions</div>
                  <div className="cs-ba-row active"><span className="cs-ba-dot dot-full" />Autocar guidelines baked in, not bolted on</div>
                  <div className="cs-ba-row active"><span className="cs-ba-dot dot-full" />Approved copy saved, searchable, status-tracked</div>
                  <div className="cs-ba-row active"><span className="cs-ba-dot dot-full" />Designers self-serve. UX writer reviews not rewrites.</div>
                </div>
              </div>
            </div>
            <div className="cs-screenshot">
              <div className="cs-screenshot__frame">
                <img src="/images/cs-spinny/01-overview.png" alt="Spinny Copy Studio — Check Copy tab, empty state" width={2560} height={1500} />
              </div>
              <div className="cs-screenshot-caption">Copy Studio · Check Copy tab · Default state</div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 02. Context */}
          <section className="cs-section">
            <span className="cs-label">02. Context</span>
            <h2>Two brands. Completely different voices. Same team.</h2>
            <p>
              Spinny and Autocar India are both Spinny Group products — but they need to sound nothing alike. Getting that wrong isn&apos;t a style issue. It&apos;s a trust issue. Autocar is 30+ years of automotive journalism. Spinny is a consumer brand navigating one of the highest-anxiety purchases in a person&apos;s life. The tool had to know the difference.
            </p>
            <div className="cs-brand-grid">
              <div className="cs-brand-card">
                <div className="cs-brand-head">
                  <span className="cs-brand-dot" style={{ background: '#E84040' }} />
                  <span className="cs-brand-name">/spinny-uxcopy</span>
                </div>
                <div className="cs-brand-body">
                  <div className="cs-voice-label">Core voice</div>
                  <div className="cs-brand-voice">&ldquo;Trust-first, transparent, human. Never preachy. Never salesy.&rdquo;</div>
                  <ul className="cs-brand-rules">
                    <li>CTAs signal discovery not commitment</li>
                    <li>High-stakes moments get extra human copy</li>
                    <li>Never shame the user — especially in Loans</li>
                    <li>12 pod contexts with distinct emotional realities</li>
                    <li>Copy library with Draft → Approved → Live tracking</li>
                  </ul>
                </div>
              </div>
              <div className="cs-brand-card">
                <div className="cs-brand-head">
                  <span className="cs-brand-dot" style={{ background: '#1A3A8F' }} />
                  <span className="cs-brand-name">/autocar-uxcopy</span>
                </div>
                <div className="cs-brand-body">
                  <div className="cs-voice-label">Core voice</div>
                  <div className="cs-brand-voice">&ldquo;Useful not warm · Specific not clever · Consistent not creative.&rdquo;</div>
                  <ul className="cs-brand-rules">
                    <li>Strict casing rules per element type</li>
                    <li>CTA vocabulary: approved and banned word lists</li>
                    <li>Price formatting: ₹12.5 Lakh, en dash, city required</li>
                    <li>3 modes: Check, Generate, and Scan a screen</li>
                    <li>Benchmark references: Autocar UK, Edmunds, CarDekho</li>
                  </ul>
                </div>
              </div>
            </div>
            <p>
              The skills aren&apos;t prompts. They&apos;re systems — with mode logic, scoring rubrics, component-specific rules, copy libraries, and explicit do/don&apos;t vocabularies. The difference matters: a prompt is a suggestion. A skill is a constraint.
            </p>
            <BrandDemoFrame />
          </section>

          <hr className="cs-rule" />

          {/* 03. What I built */}
          <section className="cs-section">
            <span className="cs-label">03. What I built</span>
            <h2>A CMS that the design team could actually use</h2>
            <p>
              The skills are the brain. The CMS is the interface — a structured layer built in Claude that lets the team pull copy, run checks, reference patterns, and save approved work without routing every request through the UX writer.
            </p>
            <p>
              I led the migration from the custom GPT, rebuilt the system prompt architecture for Claude, tested output quality against both brand guidelines, and built a content referencing system alongside it.
            </p>
            <div className="cs-cms-row">
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>1</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Brand layer</div>
                  <div className="cs-cms-title">Voice &amp; guidelines</div>
                  <div className="cs-cms-desc">Both brand voices, pod contexts, casing rules, vocabulary lists, and tone principles — encoded as constraints, not suggestions. The model can&apos;t drift off-voice because the guidelines are structural.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(139,92,246,0.12)', color: '#4C1D95' }}>2</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Generation layer</div>
                  <div className="cs-cms-title">Copy studio modes</div>
                  <div className="cs-cms-desc">Check, Generate, or (for Autocar) Scan a screen. Each mode asks the right questions first — pod, component type, user state, brief — before generating. Output always comes as 3 variants with rationale.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>3</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Reference layer</div>
                  <div className="cs-cms-title">Content benchmarking</div>
                  <div className="cs-cms-desc">A content referencing system — patterns, anti-patterns, and benchmark examples from Autocar UK, Edmunds, CRED, and competitors — available to pull at generation time. Not just what to write, but why it works.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(232,64,64,0.12)', color: '#7A1010' }}>4</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Library layer</div>
                  <div className="cs-cms-title">Copy save &amp; status tracking</div>
                  <div className="cs-cms-desc">Approved copy is saved by pod, component, and flow with a status (Draft → In Review → Approved → Live). The team has a searchable record of what&apos;s been signed off — reducing re-work and version drift.</div>
                </div>
              </div>
            </div>
            <div className="cs-screenshot-grid">
              <div className="cs-screenshot-cell">
                <div className="cs-screenshot-cell__frame">
                  <img src="/images/cs-spinny/01-overview.png" alt="Check Copy tab" width={2560} height={1500} />
                </div>
                <div className="cs-screenshot-caption">Check Copy</div>
              </div>
              <div className="cs-screenshot-cell">
                <div className="cs-screenshot-cell__frame">
                  <img src="/images/cs-spinny/04-generate-tab.png" alt="Generate Copy tab" width={2560} height={1220} />
                </div>
                <div className="cs-screenshot-caption">Generate Copy</div>
              </div>
              <div className="cs-screenshot-cell">
                <div className="cs-screenshot-cell__frame">
                  <img src="/images/cs-spinny/05-image-tab.png" alt="Image Analysis tab" width={2560} height={1580} />
                </div>
                <div className="cs-screenshot-caption">Image Analysis</div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 04. What each skill knows */}
          <section className="cs-section">
            <span className="cs-label">04. What each skill knows</span>
            <h2>Same engine. Different rules.</h2>
            <p>
              Both skills run on the same infrastructure but enforce completely different mental models. This was the hardest part to get right — the Autocar skill had to be strict and auditable, the Spinny skill had to be contextual and empathetic. They needed to behave like two different senior writers.
            </p>
            <div className="cs-skill-split">
              <div className="cs-skill-col">
                <div className="cs-skill-head">
                  <span className="cs-brand-dot" style={{ background: '#E84040' }} />
                  <span className="cs-skill-badge" style={{ background: 'rgba(232,64,64,0.1)', color: '#7A1010' }}>/spinny-uxcopy</span>
                </div>
                <div className="cs-skill-body">
                  <div className="cs-skill-row"><span className="cs-sk">Modes</span>Check · Generate</div>
                  <div className="cs-skill-row"><span className="cs-sk">Context</span>Pod + user state + screen + brief</div>
                  <div className="cs-skill-row"><span className="cs-sk">Scoring</span>Clarity · Brand Voice · Grammar · Conciseness</div>
                  <div className="cs-skill-row"><span className="cs-sk">Output</span>Safe &amp; Direct · Warm &amp; Human · Bold &amp; Clear</div>
                  <div className="cs-skill-row"><span className="cs-sk">Special</span>12-pod emotional context map</div>
                  <div className="cs-skill-row"><span className="cs-sk">Library</span>Draft → In Review → Approved → Live</div>
                </div>
              </div>
              <div className="cs-skill-col">
                <div className="cs-skill-head">
                  <span className="cs-brand-dot" style={{ background: '#1A3A8F' }} />
                  <span className="cs-skill-badge" style={{ background: 'rgba(26,58,143,0.1)', color: '#0F2260' }}>/autocar-uxcopy</span>
                </div>
                <div className="cs-skill-body">
                  <div className="cs-skill-row"><span className="cs-sk">Modes</span>Check · Generate · Scan a screen</div>
                  <div className="cs-skill-row"><span className="cs-sk">Context</span>Surface + element type + constraints</div>
                  <div className="cs-skill-row"><span className="cs-sk">Scoring</span>PASS / FAIL with rule-level violation flags</div>
                  <div className="cs-skill-row"><span className="cs-sk">Output</span>Direct · User-need led · Benchmark-inspired</div>
                  <div className="cs-skill-row"><span className="cs-sk">Special</span>Approved + banned CTA vocabulary list</div>
                  <div className="cs-skill-row"><span className="cs-sk">Library</span>Surface · Element · Flow · Status</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 05. Copy in action */}
          <section className="cs-section">
            <span className="cs-label">05. Copy in action</span>
            <h2>What the tool actually produces</h2>
            <p>
              The real test of a content tool isn&apos;t the spec. It&apos;s what comes out when a designer is three hours from a handoff and needs loading state copy for a soft credit check. Here&apos;s what that looks like.
            </p>

            <div className="cs-screenshot">
              <div className="cs-screenshot__frame">
                <img src="/images/cs-spinny/03-check-filled.png" alt="Check Copy — Loans pod, Error Message type, filled form" width={2560} height={1500} />
              </div>
              <div className="cs-screenshot-caption">Check Copy · Loans pod · Error Message · Input submitted</div>
            </div>

            <div className="cs-demo-card">
              <div className="cs-demo-head">
                /spinny-uxcopy — Generate mode
                <span className="cs-demo-tag" style={{ background: 'rgba(232,64,64,0.1)', color: '#7A1010' }}>Loans · Loading state</span>
              </div>
              <div className="cs-demo-body">
                <div className="cs-demo-prompt">
                  &ldquo;Loading state for soft profiling flow — checking loan eligibility without a hard credit inquiry. User is anxious about their credit score.&rdquo;
                </div>
                <div className="cs-demo-response-label">3 variants generated</div>
                <div className="cs-copy-variant">
                  <div className="cs-variant-label">Safe &amp; Direct</div>
                  <div className="cs-variant-copy">Checking your eligibility — this won&apos;t affect your credit score.</div>
                  <div className="cs-variant-reason">Clear reassurance on the exact fear. No jargon.</div>
                </div>
                <div className="cs-copy-variant">
                  <div className="cs-variant-label">Warm &amp; Human</div>
                  <div className="cs-variant-copy">Just a quick look — no mark on your credit score, we promise.</div>
                  <div className="cs-variant-reason">Conversational. Reduces clinical anxiety around financial checks.</div>
                </div>
                <div className="cs-copy-variant">
                  <div className="cs-variant-label">Bold &amp; Clear</div>
                  <div className="cs-variant-copy">Soft check only. Your credit score stays untouched.</div>
                  <div className="cs-variant-reason">Direct contrast with a hard inquiry. Confident, unambiguous.</div>
                </div>
              </div>
            </div>

            <div className="cs-demo-card">
              <div className="cs-demo-head">
                /autocar-uxcopy — Check mode
                <span className="cs-demo-tag" style={{ background: 'rgba(26,58,143,0.1)', color: '#0F2260' }}>CTA · Car listing card</span>
              </div>
              <div className="cs-demo-body">
                <div className="cs-demo-prompt">
                  Checking: &ldquo;Know more about this car →&rdquo;
                </div>
                <div className="cs-demo-response-label">Audit result</div>
                <div className="cs-copy-variant">
                  <div className="cs-variant-label" style={{ color: '#A32D2D' }}>Fail — 2 violations</div>
                  <div className="cs-variant-copy">&ldquo;Know more&rdquo; is on the banned CTA list. Arrow character is non-standard punctuation.</div>
                  <div className="cs-variant-reason">Rule: CTAs must use approved vocabulary only. Rule: No decorative punctuation.</div>
                </div>
                <div className="cs-copy-variant">
                  <div className="cs-variant-label" style={{ color: '#14593A' }}>Corrected</div>
                  <div className="cs-variant-copy">View specs</div>
                  <div className="cs-variant-reason">Approved vocabulary. Verb-first. Under 4 words. Specific action.</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 06. Decisions that mattered */}
          <section className="cs-section">
            <span className="cs-label">06. Decisions that mattered</span>
            <h2>Three moments from building this</h2>
            <div className="cs-moments">
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>T</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">Tradeoff</div>
                  <p className="cs-moment-text"><strong>I chose constraints over flexibility.</strong> An open-ended AI writing tool is more flexible but gives inconsistent output. I made the skills strict — specific modes, required inputs, enforced vocabularies. Some designers found this rigid at first. The tradeoff paid off: output quality became predictable enough that review time dropped significantly.</p>
                </div>
              </div>
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(26,58,143,0.12)', color: '#0F2260' }}>P</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">Pushback</div>
                  <p className="cs-moment-text"><strong>I pushed back on migrating the GPT without rebuilding the prompt logic.</strong> The ask was to port context across. My argument: the original GPT had accumulated workarounds and vague instructions that worked by luck. Migrating that would just move the problem. We rebuilt from the guidelines up instead. The Claude version is more reliable because the foundation is cleaner.</p>
                </div>
              </div>
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>S</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">Shift</div>
                  <p className="cs-moment-text"><strong>The team stopped treating UX writing as a review gate and started treating it as a reference.</strong> When designers can self-check against the skill, the conversation changes from &ldquo;is this right?&rdquo; to &ldquo;I checked and it passed — does this feel right to you?&rdquo; That&apos;s a better question. It means I&apos;m being used where I add most value — judgment, not correction.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 07. Outcome */}
          <section className="cs-section">
            <span className="cs-label">07. Outcome</span>
            <h2>What this changed</h2>
            <p>
              The CMS and skills are live and in use across the team. The more measurable outcomes are in the product — across 9+ surfaces, content quality became more consistent without requiring the UX writer to be in every loop.
            </p>
            <div className="cs-outcome-metrics">
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#E84040', width: '70%' }} />
                <div className="cs-omc-n" style={{ color: '#E84040' }}>12</div>
                <div className="cs-omc-l">Pod contexts encoded</div>
                <div className="cs-omc-s">Each with distinct emotional reality and copy rules</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#1A3A8F', width: '55%' }} />
                <div className="cs-omc-n" style={{ color: '#1A3A8F' }}>2</div>
                <div className="cs-omc-l">Brand skills deployed</div>
                <div className="cs-omc-s">Both live, both versioned, documented for team adoption</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#1D9E75', width: '45%' }} />
                <div className="cs-omc-n" style={{ color: '#1D9E75' }}>1</div>
                <div className="cs-omc-l">CMS built from scratch</div>
                <div className="cs-omc-s">Migrated from GPT, rebuilt for Claude, used independently by design team</div>
              </div>
            </div>
            <p>
              The loader copy system I built for the AI Assistant — replacing generic &ldquo;thinking…&rdquo; states with stage-specific micro-copy — was later cited as a reference when the Circuit AI team asked for the same treatment in their Instant Answers feature. A design pattern that came from content work, not design work.
            </p>
            <div className="cs-verdict">
              <p className="cs-verdict__q">Content tools only work if they know what they&apos;re talking about. Building the knowledge in is the work — the tool is just where it lives.</p>
              <p className="cs-verdict__foot">Spinny · AI Tooling &amp; Content Systems · Oct 2025 – Apr 2026</p>
            </div>
          </section>

        </article>
      </main>
    </>
  )
}
