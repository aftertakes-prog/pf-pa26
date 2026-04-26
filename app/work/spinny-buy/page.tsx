import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Spinny Buy Homepage — Pooja Koundal',
  description: 'How a state-aware homepage reduced time-to-visit by 5.14% and improved funnel conversion at 2.5M MAU.',
}

export default function SpinnyBuyPage() {
  return (
    <>
      <Nav />
      <main className="cs-main">

        {/* Hero */}
        <section className="cs-hero">
          <Link href="/#work" className="cs-back">← Selected Work</Link>
          <p className="cs-kicker">UX Writing · Case Study</p>
          <h1 className="cs-hero__title">Spinny Buy Homepage</h1>
          <p className="cs-hero__thesis">
            The homepage doesn&apos;t just show information. It tells users who they are to the product. A returning buyer being greeted like a stranger isn&apos;t a UI gap — it&apos;s a trust problem. And trust problems are a copy problem.
          </p>
          <div className="cs-meta-strip">
            <span className="cs-meta-tag"><strong>Role</strong> UX Writer</span>
            <span className="cs-meta-tag"><strong>Team</strong> 1 PM · 3 Eng · 1 Designer</span>
            <span className="cs-meta-tag"><strong>Platform</strong> iOS · Android · PWA</span>
            <span className="cs-meta-tag"><strong>Timeline</strong> 4 Weeks · 2025</span>
          </div>
        </section>

        {/* Body */}
        <article className="cs-body">

          {/* 01 Problem */}
          <section className="cs-section">
            <span className="cs-label">01. Problem</span>
            <h2>The homepage was losing people it had already won</h2>
            <p>
              Spinny&apos;s homepage was built for discovery — browsing, filtering, comparing. It served new users well. But a large cohort of returning users had already committed. They&apos;d scheduled a test drive, made a booking, or were waiting on delivery. For them, the homepage showed nothing relevant.
            </p>

            <div className="csbuy-stat-row">
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">48h</div>
                <div className="csbuy-stat-d">Average gap between booking a test drive and the showroom visit — zero product support in between</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">Peak</div>
                <div className="csbuy-stat-d">Drop-offs concentrated in this exact window — a continuity gap, not a UI problem</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">2.5M</div>
                <div className="csbuy-stat-d">MAU — even small funnel improvements compound meaningfully at this scale</div>
              </div>
            </div>

            <p>Here&apos;s where the journey broke down. The void between booking and visit had no product presence at all.</p>

            <div className="csbuy-journey">
              <div className="csbuy-jstep">
                <div className="csbuy-jstep-stage">Stage 1</div>
                <div className="csbuy-jstep-title">Test drive booked</div>
                <div className="csbuy-jstep-sub">Intent at peak. Slot confirmed.</div>
              </div>
              <div className="csbuy-jstep csbuy-jstep--void">
                <div className="csbuy-void-badge">Drop-off peak</div>
                <div className="csbuy-jstep-title">Returns to app</div>
                <div className="csbuy-jstep-sub">Sees a stranger&apos;s homepage. No booking visible. No next step.</div>
              </div>
              <div className="csbuy-jstep">
                <div className="csbuy-jstep-stage">Stage 3</div>
                <div className="csbuy-jstep-title">Showroom visit</div>
                <div className="csbuy-jstep-sub">Arrives, inspects, moves toward booking.</div>
              </div>
              <div className="csbuy-jstep">
                <div className="csbuy-jstep-stage">Stage 4</div>
                <div className="csbuy-jstep-title">Booking &amp; delivery</div>
                <div className="csbuy-jstep-sub">Slot paid. Awaiting delivery.</div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 02 Direction */}
          <section className="cs-section">
            <span className="cs-label">02. Direction</span>
            <h2>A decision I made — and why</h2>
            <p>
              The design explored two options. When the team was leaning toward a banner strip (Option A), I pushed for the full state-aware mode. Not because it was more ambitious, but because the banner would have made the copy work too hard.
            </p>

            <div className="csbuy-option-split">
              <div className="csbuy-opt">
                <div className="csbuy-opt-tag">Option A</div>
                <div className="csbuy-opt-title">Inline banner</div>
                <div className="csbuy-opt-desc">A contextual strip above inventory. Lower disruption, but limited density. Copy can&apos;t shift the user&apos;s mental model from browsing to buying at this scale.</div>
                <div className="csbuy-opt-verdict csbuy-opt-verdict--bad">A banner users learn to ignore doesn&apos;t protect conversion. It just delays the drop.</div>
              </div>
              <div className="csbuy-opt csbuy-opt--chosen">
                <div className="csbuy-opt-tag">Option B — chosen</div>
                <div className="csbuy-opt-title">State-aware homepage</div>
                <div className="csbuy-opt-desc">The page reconfigures based on transaction stage. Gives copy room to reorient the user: you&apos;re not browsing anymore. Here&apos;s where you are and what comes next.</div>
                <div className="csbuy-opt-verdict csbuy-opt-verdict--good">The mode shift creates space for copy to do real work — one state, one action, one message.</div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 03 Copy decisions */}
          <section className="cs-section">
            <span className="cs-label">03. Copy decisions</span>
            <h2>What each state had to say</h2>
            <p>
              Every label needed to feel like progress, not a system status. These went through multiple rounds before they stopped sounding like something had gone wrong.
            </p>

            <div className="csbuy-states">
              <div className="csbuy-scard">
                <div className="csbuy-scard-head">
                  <span className="csbuy-scard-dot" style={{ background: '#2E7DD1' }} />
                  <span className="csbuy-scard-label" style={{ color: '#1A3A6B' }}>Upcoming</span>
                </div>
                <div className="csbuy-scard-body">
                  <div className="csbuy-scard-copy">&ldquo;Your test drive is confirmed. Arjun will meet you at the hub.&rdquo;</div>
                  <div className="csbuy-scard-note">Forward-looking. Names the person. Removes uncertainty.</div>
                </div>
              </div>
              <div className="csbuy-scard">
                <div className="csbuy-scard-head">
                  <span className="csbuy-scard-dot" style={{ background: '#D4850A' }} />
                  <span className="csbuy-scard-label" style={{ color: '#7A4A0A' }}>Pending</span>
                </div>
                <div className="csbuy-scard-body">
                  <div className="csbuy-scard-copy">&ldquo;We&apos;re getting things ready. Nothing you need to do right now.&rdquo;</div>
                  <div className="csbuy-scard-note">3 rewrites. The word &ldquo;pending&rdquo; kept reading like a failure state.</div>
                </div>
              </div>
              <div className="csbuy-scard">
                <div className="csbuy-scard-head">
                  <span className="csbuy-scard-dot" style={{ background: '#1D9E75' }} />
                  <span className="csbuy-scard-label" style={{ color: '#14593A' }}>Completed</span>
                </div>
                <div className="csbuy-scard-body">
                  <div className="csbuy-scard-copy">&ldquo;Test drive done. Ready to take the next step?&rdquo;</div>
                  <div className="csbuy-scard-note">Progress signal. Bridges the gap to the next action.</div>
                </div>
              </div>
              <div className="csbuy-scard">
                <div className="csbuy-scard-head">
                  <span className="csbuy-scard-dot" style={{ background: '#D94040' }} />
                  <span className="csbuy-scard-label" style={{ color: '#7A1F1E' }}>Cancelled</span>
                </div>
                <div className="csbuy-scard-body">
                  <div className="csbuy-scard-copy">&ldquo;Looks like this one didn&apos;t work out. Want to reschedule?&rdquo;</div>
                  <div className="csbuy-scard-note">No blame. Keeps the door open without being pushy.</div>
                </div>
              </div>
            </div>

            <p>
              The RM introduction needed the most care. First time a user sees the name and photo of their assigned relationship manager — what does that copy say? Too formal and it&apos;s a ticket number with a face. Too casual and it undersells the commitment they&apos;ve made.
            </p>

            <div className="csbuy-rm">
              <div className="csbuy-rm-av">AR</div>
              <div className="csbuy-rm-info">
                <div className="csbuy-rm-name">Arjun Rawat</div>
                <div className="csbuy-rm-line">Arjun will meet you at the hub on Thursday.</div>
              </div>
              <div className="csbuy-rm-tag">Relationship manager</div>
            </div>

            <p>
              Writing the &ldquo;one CTA per state&rdquo; rule into the content guidelines early — not just following it — gave the team a shared principle to pressure-test designs against. Stopped a lot of negotiation mid-sprint.
            </p>
          </section>

          <hr className="cs-rule" />

          {/* 04 Decisions & pushback */}
          <section className="cs-section">
            <span className="cs-label">04. Decisions &amp; pushback</span>
            <h2>Three moments that mattered</h2>

            <div className="csbuy-moments">
              <div className="csbuy-moment">
                <div className="csbuy-moment-num">
                  <div className="csbuy-m-circle" style={{ background: '#FDF3E0', color: '#7A4A0A' }}>T</div>
                </div>
                <div className="csbuy-moment-body">
                  <div className="csbuy-moment-kind">Tradeoff</div>
                  <p className="csbuy-moment-text"><strong>Engineering could surface 6 RM fields. I pushed to cut to 3.</strong> &ldquo;More info = more trust&rdquo; is intuitive but wrong at a high-anxiety moment. We tested both. The trimmed version won.</p>
                </div>
              </div>
              <div className="csbuy-moment">
                <div className="csbuy-moment-num">
                  <div className="csbuy-m-circle" style={{ background: '#E8F0FA', color: '#1A3A6B' }}>P</div>
                </div>
                <div className="csbuy-moment-body">
                  <div className="csbuy-moment-kind">Pushback</div>
                  <p className="csbuy-moment-text"><strong>I argued against the banner when the team had largely already decided on it.</strong> My argument: a banner&apos;s copy can&apos;t reorient someone who thinks they&apos;re still browsing. It just decorates the wrong experience.</p>
                </div>
              </div>
              <div className="csbuy-moment">
                <div className="csbuy-moment-num">
                  <div className="csbuy-m-circle" style={{ background: '#E6F5ED', color: '#14593A' }}>S</div>
                </div>
                <div className="csbuy-moment-body">
                  <div className="csbuy-moment-kind">Shift</div>
                  <p className="csbuy-moment-text"><strong>By the end of the sprint, the PM was asking &ldquo;what is this screen saying about where the user is?&rdquo;</strong> before &ldquo;what does this screen show?&rdquo; That question is now part of how the team reviews new designs.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 05 Outcome */}
          <section className="cs-section">
            <span className="cs-label">05. Outcome</span>
            <h2>What shipped and what moved</h2>
            <p>
              A/B validated at 2.5M MAU. All three downstream metrics moved together — the signal that this wasn&apos;t just surface engagement, but decision quality improving across the funnel.
            </p>

            <div className="cs-outcome-metrics">
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#1D9E75', width: '52%' }} />
                <div className="cs-omc-n" style={{ color: '#1D9E75' }}>−5.14%</div>
                <div className="cs-omc-l">Time-to-visit</div>
                <div className="cs-omc-s">Buyers moved from booking to showroom faster</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#1D9E75', width: '36%' }} />
                <div className="cs-omc-n" style={{ color: '#1D9E75' }}>+3.6%</div>
                <div className="cs-omc-l">User-to-visit</div>
                <div className="cs-omc-s">More bookings became actual showroom visits</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc-bar" style={{ background: '#1D9E75', width: '32%' }} />
                <div className="cs-omc-n" style={{ color: '#1D9E75' }}>+3.2%</div>
                <div className="cs-omc-l">User-to-delivery</div>
                <div className="cs-omc-s">Purchase completion improved further downstream</div>
              </div>
            </div>
            <div className="cs-verdict">
              <p className="cs-verdict__q">Transactional users don&apos;t need more features. They need the product to remember them. Copy that does that isn&apos;t filler — it&apos;s the product working.</p>
              <p className="cs-verdict__foot">Spinny · Buy Homepage · iOS · Android · PWA · 4 Weeks · 2025</p>
            </div>
          </section>

        </article>
      </main>
    </>
  )
}
