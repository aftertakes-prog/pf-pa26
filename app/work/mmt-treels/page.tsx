import Link from 'next/link'
import Nav from '@/components/Nav'
import PhoneFrame from '@/components/PhoneFrame'

export const metadata = {
  title: 'MMT Treels — Pooja Koundal',
  description: 'How a two-format video content system built for 250+ premium properties moved engagement 150% and contributed a 25% topline lift from premium stays.',
}

export default function MmtTreelsPage() {
  return (
    <>
      <Nav />
      <main className="cs-main">

        {/* ── Hero ── */}
        <section className="cs-hero">
          <Link href="/#work" className="cs-back">← Selected Work</Link>
          <p className="cs-kicker">Creative Direction · Content Systems · User Research · Case Study</p>
          <h1 className="cs-hero__title">Building a format for premium travel that could actually sell a ₹20,000 night</h1>
          <p className="cs-hero__thesis">
            Static images and star ratings don&apos;t communicate what it feels like to wake up in a room with a plunge pool overlooking a valley. For a buyer spending ₹20,000 a night, feeling is the product. Treels was built around that insight — a two-format video content system designed to close the gap between aspiration and transaction, natively inside the MMT app.
          </p>
          <div className="cs-meta-strip">
            <span className="cs-meta-tag"><strong>Role</strong> Creative Director · Content Lead · Scriptwriter</span>
            <span className="cs-meta-tag"><strong>Scope</strong> MakeMyTrip · Premium Hotels &amp; Homestays</span>
            <span className="cs-meta-tag"><strong>What</strong> 15s Treels + 60s walkthroughs · 250+ properties · 500+ videos</span>
            <span className="cs-meta-tag"><strong>Timeline</strong> Jul 2023 – Apr 2025</span>
          </div>
        </section>

        {/* ── Body ── */}
        <article className="cs-body">

          {/* 01. Problem */}
          <section className="cs-section">
            <span className="cs-label">01. Problem</span>
            <h2>India&apos;s premium travel had a discovery gap that no filter could fix</h2>
            <p>
              MMT listed tens of thousands of domestic properties, but the genuinely exceptional ones — the cliff-edge retreats in Coorg, the heritage havelis in Rajasthan, the private beach villas in Goa, the forest lodges in Uttarakhand — were getting lost in listing pages built for transaction, not seduction.
            </p>
            <div className="csbuy-stat-row">
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">₹20K</div>
                <div className="csbuy-stat-d">Average nightly rate for the premium stays Treels was built to surface — a price point where feeling is the product</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">250+</div>
                <div className="csbuy-stat-d">Handpicked premium hotels and homestays across every state and category in India</div>
              </div>
              <div className="csbuy-stat-cell">
                <div className="csbuy-stat-n">500+</div>
                <div className="csbuy-stat-d">Videos scripted, storyboarded, and directed across the full property inventory</div>
              </div>
            </div>
            <p>
              Travellers were finding their dream stays on Instagram Reels at midnight — saving them, sitting with them for days — and only then opening MMT to actually book. We had the inventory. We didn&apos;t have the format. Treels was built to close that loop, natively, inside the app, at the moment intent was highest.
            </p>
          </section>

          <hr className="cs-rule" />

          {/* 02. The Product */}
          <section className="cs-section">
            <span className="cs-label">02. The Product</span>
            <h2>Two formats, one content system</h2>
            <p>
              Treels wasn&apos;t a single video format. It was a content architecture built around two distinct moments in a traveller&apos;s journey.
            </p>
            <div className="cs-cms-row">
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>1</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Discovery format</div>
                  <div className="cs-cms-title">15-second Treel</div>
                  <div className="cs-cms-desc">Designed for the scroll. Hook-first, emotion-led, built to stop a thumb in under two seconds and make a user feel something about a property they weren&apos;t actively searching for. It lived in a dedicated discovery surface inside the MMT app — modelled on the visual language users already knew from social, but connected directly to the booking funnel.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>2</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Decision format</div>
                  <div className="cs-cms-title">60-second Walkthrough</div>
                  <div className="cs-cms-desc">Designed for the decision. Once a user landed on a property detail page, the walkthrough gave them an immersive, sequenced tour in a format no photograph could replicate. It answered the question static imagery never could: what does it actually feel like to be here?</div>
                </div>
              </div>
            </div>
            <p>
              Together, the two formats covered the full emotional arc — from discovery to conviction. Two formats, two jobs, one funnel that didn&apos;t exist in the MMT experience before.
            </p>
          </section>

          <hr className="cs-rule" />

          {/* 03. The Scale */}
          <section className="cs-section">
            <span className="cs-label">03. The Scale</span>
            <h2>250+ of India&apos;s most premium stays</h2>
            <p>
              This was a pilot — and it was a pan-India production. Every state, every category. Cliff-side retreats, heritage properties, design-forward boutique stays, private villa estates, high-altitude mountain lodges, beachfront escapes. The kind of properties that warranted exceptional storytelling because their price point demanded it.
            </p>
            <p>
              Producing 500+ videos across this inventory, at consistent quality and with a distinct creative voice for each property, required building a system, not just a shoot schedule.
            </p>

            <div className="cs-phone-showcase">
              <PhoneFrame videoSrc="/videos/mmt-treels-cs.mp4" hideMuteBtn />
              <div className="cs-screenshot-caption">MMT Treels · Overview of the Product</div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 04. My Role */}
          <section className="cs-section">
            <span className="cs-label">04. My Role</span>
            <h2>Building the creative system</h2>
            <p>
              I was the creative engine behind this from concept to final cut. Every decision about how a property looked, felt, and was narrated on screen came through me.
            </p>
            <div className="cs-cms-row">
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>A</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Pre-production</div>
                  <div className="cs-cms-title">Storyboarding &amp; moodboarding</div>
                  <div className="cs-cms-desc">Before a single shot was taken, I built a storyboard and moodboard for every property. What was its core emotional sell? Who was the traveller it was talking to? What were the specific moments that had to be captured? A private forest lodge in Jim Corbett is a completely different brief from a Portuguese-heritage villa in Goa. The board determined the shoot, not the other way around.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(139,92,246,0.12)', color: '#4C1D95' }}>B</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Production</div>
                  <div className="cs-cms-title">Shoot direction</div>
                  <div className="cs-cms-desc">Directed the production team across 250+ properties, calling specific shots, controlling pacing, holding the visual rhythm tight enough to carry both the 15-second cut and the 60-second walkthrough. The first two seconds of every Treel were non-negotiable — the hook had to land before a thumb could move.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>C</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Post-production</div>
                  <div className="cs-cms-title">Scripting at scale</div>
                  <div className="cs-cms-desc">Wrote scripts for all 500+ videos. Each built around a single emotional truth, not a feature list. The property with a rooftop infinity pool wasn&apos;t sold on its pool — it was sold on the specific, irreplaceable feeling of being suspended above a valley at sunset, somewhere that felt hard to reach. The script surfaced that. The visuals closed it.</div>
                </div>
              </div>
              <div className="cs-cms-layer">
                <div className="cs-cms-num">
                  <span className="cs-layer-n" style={{ background: 'rgba(232,64,64,0.12)', color: '#7A1010' }}>D</span>
                </div>
                <div className="cs-cms-body">
                  <div className="cs-cms-kind">Cross-functional</div>
                  <div className="cs-cms-title">Product alignment</div>
                  <div className="cs-cms-desc">Worked closely with MMT&apos;s product team so the content system served both storytelling and conversion — embedding wishlist saves, share actions, and cross-sell touchpoints into the viewing experience without breaking the narrative.</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 05. The Strategic Thinking */}
          <section className="cs-section">
            <span className="cs-label">05. The Thinking</span>
            <h2>Three decisions that shaped the system</h2>
            <div className="cs-moments">
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>I</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">Insight</div>
                  <p className="cs-moment-text"><strong>Premium hotel discovery isn&apos;t a search problem. It&apos;s an emotional one.</strong> A traveller spending ₹15,000 to ₹40,000 a night isn&apos;t filtering by star rating — they&apos;re waiting to feel something. Traditional OTA interfaces were built for transactional search. Treels moved MMT&apos;s discovery moment upstream: from &ldquo;I know what I want, find it for me&rdquo; to &ldquo;I didn&apos;t know I wanted this until I just saw it.&rdquo;</p>
                </div>
              </div>
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>D</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">Decision</div>
                  <p className="cs-moment-text"><strong>The two-format architecture was a deliberate product call.</strong> One format for discovery, one for decision. The 15-second Treel created desire. The 60-second walkthrough converted it. This wasn&apos;t about producing two versions of the same thing — it was about matching format to moment. Most content systems collapse these into one and serve neither well.</p>
                </div>
              </div>
              <div className="cs-moment">
                <div className="cs-moment-n">
                  <span className="cs-m-circle" style={{ background: 'rgba(139,92,246,0.12)', color: '#4C1D95' }}>S</span>
                </div>
                <div className="cs-moment-body">
                  <div className="cs-moment-kind">System</div>
                  <p className="cs-moment-text"><strong>Producing 500+ videos at consistent quality required building a system, not just a shoot schedule.</strong> Every property got a storyboard before a camera arrived. The board determined the shoot, not the other way around. That constraint — pre-production rigour at scale — is what kept the creative voice consistent across 250 completely different properties.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="cs-rule" />

          {/* 06. Impact */}
          <section className="cs-section">
            <span className="cs-label">06. Impact</span>
            <h2>What the system changed</h2>
            <p>
              These are product metrics, not content vanity numbers. They show that the system built was changing what users did, not just what they watched.
            </p>
            <div className="cs-outcome-metrics">
              <div className="cs-omc">
                <div className="cs-omc__bar" style={{ width: '30%', background: '#E8531A' }} />
                <div className="cs-omc__value" style={{ color: '#E8531A' }}>30K+</div>
                <div className="cs-omc__label">Unique visitors</div>
                <div className="cs-omc__sub">In the first six months of Treels going live on the MMT app</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc__bar" style={{ width: '55%', background: '#1D9E75' }} />
                <div className="cs-omc__value" style={{ color: '#1D9E75' }}>150%</div>
                <div className="cs-omc__label">Engagement lift</div>
                <div className="cs-omc__sub">Wishlist saves, shares, and cross-sells across the Treels surface</div>
              </div>
              <div className="cs-omc">
                <div className="cs-omc__bar" style={{ width: '25%', background: '#2563EB' }} />
                <div className="cs-omc__value" style={{ color: '#2563EB' }}>25%</div>
                <div className="cs-omc__label">Topline lift</div>
                <div className="cs-omc__sub">Revenue contribution from premium stays above ₹15,000 per night</div>
              </div>
            </div>
            <div className="cs-verdict">
              <p className="cs-verdict__q">MMT already had the best premium inventory in Indian domestic travel. What it lacked was a format that could do that inventory justice — one that communicated not just what a property had, but what it felt like to be there. When storytelling is built for the right moment in the right format, it converts.</p>
              <p className="cs-verdict__foot">MakeMyTrip · Creative Direction &amp; Content Systems · Jul 2023 – Apr 2025</p>
            </div>
          </section>

        </article>
      </main>
    </>
  )
}
