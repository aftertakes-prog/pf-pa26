import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'go-Tribe: Writing a Loyalty Program Back to Life — Pooja Koundal',
  description: 'How restructuring a loyalty program made honest copy possible, and moved booker activation by 22%.',
}

export default function GoTribePage() {
  return (
    <>
      <Nav />
      <main className="cs-main">

        {/* Hero */}
        <section className="cs-hero">
          <Link href="/#work" className="cs-back">← Selected Work</Link>
          <p className="cs-kicker">UX Writing · Content Strategy · Case Study</p>
          <h1 className="cs-hero__title">go-Tribe: writing a loyalty program back to life</h1>
          <p className="cs-hero__thesis">
            The program had a structural problem. But structural problems show up as copy problems first — confusing entry language, benefits buried behind effort, progress that felt like a lecture. I came in to figure out what the copy needed to say, and ended up helping reshape what the program needed to be.
          </p>
          <div className="cs-meta-strip">
            <span className="cs-meta-tag"><strong>Role</strong> UX Writer</span>
            <span className="cs-meta-tag"><strong>Company</strong> MakeMyTrip · goibibo</span>
            <span className="cs-meta-tag"><strong>Team</strong> 1 Designer · 1 Researcher · 2 PMs · 1 Data Scientist</span>
            <span className="cs-meta-tag"><strong>Timeline</strong> 6 Months</span>
          </div>
        </section>

        {/* Body */}
        <article className="cs-body">

  {/* Intro — My contribution */}
  <section className="cs-section">
    <span className="cs-label">What I owned on this project</span>
    <h2>My contribution, specifically</h2>
    <div className="cs-contrib">
      <div className="cs-contrib-row">
        <span className="cs-contrib-label">Copy strategy</span>
        <span className="cs-contrib-body"><strong>Defined the content framework</strong> for the redesigned program: what each tier communicates, what the progress copy says at every stage, and how benefits are framed at booking touchpoints vs the program page.</span>
      </div>
      <div className="cs-contrib-row">
        <span className="cs-contrib-label">Research contribution</span>
        <span className="cs-contrib-body"><strong>Joined the 28-day user research sprint</strong> and helped shape interview questions focused on language: how users described the program, what words they used for &ldquo;membership&rdquo; vs &ldquo;loyalty,&rdquo; and where their expectations broke down.</span>
      </div>
      <div className="cs-contrib-row">
        <span className="cs-contrib-label">Structural reframe</span>
        <span className="cs-contrib-body"><strong>Argued for the 3-tier restructure</strong> on content grounds: the old 2-tier model couldn&apos;t support honest copy. You can&apos;t write &ldquo;join for free&rdquo; when there&apos;s a ₹15,000 barrier. The structure had to change for the copy to be true.</span>
      </div>
      <div className="cs-contrib-row">
        <span className="cs-contrib-label">Touchpoint copy</span>
        <span className="cs-contrib-body"><strong>Wrote copy across every program touchpoint:</strong> tier labels, progress indicators, benefit tooltips (seat selection, meals, hotel), upgrade notifications, feedback prompts, and the savings dashboard on the program page.</span>
      </div>
      <div className="cs-contrib-row">
        <span className="cs-contrib-label">Content guidelines</span>
        <span className="cs-contrib-body"><strong>Documented copy principles</strong> for the program so the design team could apply them independently: one CTA per state, benefit-first framing, progress copy over gate copy, and struck-price patterns for surfacing saved value.</span>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 01. Problem */}
  <section className="cs-section">
    <span className="cs-label">01. The problem I was handed</span>
    <h2>A program users knew about but didn&apos;t change their behaviour for</h2>
    <p>
      go-Tribe was MakeMyTrip / goibibo&apos;s loyalty program — a 2-tier structure (Star and SuperStar) designed to convert frequent bookers into loyal customers. The data showed it wasn&apos;t working: members and non-members were booking at nearly identical rates.
    </p>
    <div className="csbuy-stat-row">
      <div className="csbuy-stat-cell">
        <div className="csbuy-stat-n">≈0</div>
        <div className="csbuy-stat-d">Measurable difference in booking behaviour between go-Tribe members and non-members</div>
      </div>
      <div className="csbuy-stat-cell">
        <div className="csbuy-stat-n">₹15K</div>
        <div className="csbuy-stat-d">Minimum spend to unlock any Star benefit — the first thing users saw before any value</div>
      </div>
      <div className="csbuy-stat-cell">
        <div className="csbuy-stat-n">6mo</div>
        <div className="csbuy-stat-d">Window to show meaningful improvement across Product, Design, Research, and Data Science</div>
      </div>
    </div>
    <p>
      When I looked at the existing copy, the problem was immediately visible. The program page led with what users had to spend. Benefits were listed, not explained. Progress messaging told people how far they were from the threshold, not how close they were to something worth having. The copy was technically accurate and completely unconvincing.
    </p>
  </section>

  <hr className="cs-rule" />

  {/* 02. Research */}
  <section className="cs-section">
    <span className="cs-label">02. What I found in research</span>
    <h2>Users were using a different mental model than the one we built for</h2>
    <p>
      I joined the user research sprint specifically to understand the language problem. We interviewed go-Tribe members, non-members, and churned users across three cohorts. My focus: how users talked about the program, what they expected when they heard &ldquo;loyalty,&rdquo; and where the copy was creating confusion vs where the product logic was.
    </p>
    <div className="cs-research-table">
      <div className="cs-rt-row">
        <div className="cs-rt-label">Cohort 1</div>
        <div className="cs-rt-val">Traveling with friends · ₹6–7k/person · 5–6 day booking window · short trips (3–5 days)</div>
      </div>
      <div className="cs-rt-row">
        <div className="cs-rt-label">Cohort 2</div>
        <div className="cs-rt-val">Traveling with family · ₹10–11k/person · 1–2 day booking window · short trips (3–5 days)</div>
      </div>
      <div className="cs-rt-row">
        <div className="cs-rt-label">Cohort 3</div>
        <div className="cs-rt-val">Traveling solo · ₹4–5k/person · 3–4 day booking window · short trips (3–5 days)</div>
      </div>
    </div>
    <div className="cs-uquote">
      <p className="cs-uquote-text">&ldquo;I made a booking of ₹8,000 and it showed me that I am ₹7,000 away from becoming a loyal member.&rdquo;</p>
      <p className="cs-uquote-attr">User interview · A/B test discovery</p>
    </div>
    <div className="cs-uquote">
      <p className="cs-uquote-text">&ldquo;I come to goibibo for offers and deals, they have good deals, but other platforms are giving cashback and in the end it is all same.&rdquo;</p>
      <p className="cs-uquote-attr">Non go-Tribe user · interview finding</p>
    </div>
    <p>
      The key insight wasn&apos;t just about features or thresholds. Users were calling it a &ldquo;membership&rdquo; consistently — not a loyalty program. That&apos;s a content-level signal. Memberships are something you join and immediately benefit from. Loyalty programs ask you to earn. We were writing membership language over a loyalty program structure, and users could feel the gap even if they couldn&apos;t name it.
    </p>
    <div className="cs-insight-pair">
      <div className="cs-insight-card">
        <span className="cs-ins-badge">Content insight 1</span>
        <p className="cs-ins-text">The entry copy was framed as a cost: &ldquo;spend ₹15,000 to become a Star.&rdquo; No loyalty program copy works when the first thing it communicates is the price of admission.</p>
      </div>
      <div className="cs-insight-card">
        <span className="cs-ins-badge">Content insight 2</span>
        <p className="cs-ins-text">Benefits were on a separate page, visible only after joining. Users who hadn&apos;t joined yet had no copy reason to. The value had to move to where the decision was being made.</p>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 03. Copy problems */}
  <section className="cs-section">
    <span className="cs-label">03. The copy problems underneath the product problems</span>
    <h2>Five things the copy was doing wrong</h2>
    <div className="cs-pain-list">
      <div className="cs-pain-item">
        <div className="cs-pain-num"><span className="cs-p-circle">1</span></div>
        <div className="cs-pain-body">
          <div className="cs-pain-title">Leading with cost, not value</div>
          <div className="cs-pain-desc">₹15,000 to unlock Star. The threshold was the headline. Copy that opens with what the user has to give never convinces them of what they&apos;ll get.</div>
        </div>
      </div>
      <div className="cs-pain-item">
        <div className="cs-pain-num"><span className="cs-p-circle">2</span></div>
        <div className="cs-pain-body">
          <div className="cs-pain-title">Benefits buried behind effort</div>
          <div className="cs-pain-desc">Understanding what you&apos;d actually receive required reading the entire program page. No copy should make value feel like homework.</div>
        </div>
      </div>
      <div className="cs-pain-item">
        <div className="cs-pain-num"><span className="cs-p-circle">3</span></div>
        <div className="cs-pain-body">
          <div className="cs-pain-title">Progress copy that demoralised</div>
          <div className="cs-pain-desc">&ldquo;₹7,000 away from becoming a loyal member&rdquo; after an ₹8,000 booking. That&apos;s mathematically accurate and motivationally counterproductive.</div>
        </div>
      </div>
      <div className="cs-pain-item">
        <div className="cs-pain-num"><span className="cs-p-circle">4</span></div>
        <div className="cs-pain-body">
          <div className="cs-pain-title">Benefits on a clock users didn&apos;t share</div>
          <div className="cs-pain-desc">Exclusive sales tied to calendar dates. Users book when they need to travel. The copy was advertising a benefit the product couldn&apos;t reliably deliver at the moment it was needed.</div>
        </div>
      </div>
      <div className="cs-pain-item">
        <div className="cs-pain-num"><span className="cs-p-circle">5</span></div>
        <div className="cs-pain-body">
          <div className="cs-pain-title">Claiming felt like a secondary task</div>
          <div className="cs-pain-desc">Benefits required Tribe Coins to redeem — a separate action mid-booking. The copy had to explain a mechanic that shouldn&apos;t have existed. Good copy doesn&apos;t patch bad UX.</div>
        </div>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 04. Argument */}
  <section className="cs-section">
    <span className="cs-label">04. The argument I made</span>
    <h2>The copy can&apos;t fix a structure that&apos;s fundamentally dishonest</h2>
    <p>
      Early in the project, the instinct was to improve the program page copy and surface benefits more clearly. I pushed back on this direction. My argument: you cannot write &ldquo;join for free&rdquo; when there&apos;s a ₹15,000 entry threshold. You cannot write &ldquo;just one booking away&rdquo; when the threshold is spend-based and most users never cross it. The copy would be lying — and users would feel that, even without knowing exactly why.
    </p>
    <p>
      The structural change — from 2 tiers with spend thresholds to 3 tiers where your first booking makes you a member — wasn&apos;t just a product decision. It was what made honest copy possible.
    </p>
    <div className="cs-tier-split">
      <div className="cs-tier-col">
        <div className="cs-tier-head">
          <span className="cs-tier-tag" style={{ background: 'rgba(217,64,64,0.1)', color: '#7A1010' }}>Before</span>
          <span style={{ fontSize: '11px', color: 'var(--c-muted)', marginLeft: '0.5rem' }}>Star · SuperStar</span>
        </div>
        <div className="cs-tier-body">
          <div className="cs-tier-row"><span className="cs-tier-label">Entry — Star</span><span className="cs-tier-val">Spend ₹15,000</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">Entry — SuperStar</span><span className="cs-tier-val">Spend ₹85,000</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">What copy could say</span><span className="cs-tier-val">&ldquo;Spend ₹X to reach stars&rdquo;</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">Tier 1 benefits</span><span className="cs-tier-val">None until threshold</span></div>
        </div>
      </div>
      <div className="cs-tier-col">
        <div className="cs-tier-head">
          <span className="cs-tier-tag" style={{ background: 'rgba(29,158,117,0.1)', color: '#14593A' }}>After</span>
          <span style={{ fontSize: '11px', color: 'var(--c-muted)', marginLeft: '0.5rem' }}>go-Tribe 1 · 2 · 3</span>
        </div>
        <div className="cs-tier-body">
          <div className="cs-tier-row"><span className="cs-tier-label">Entry — Tier 1</span><span className="cs-tier-val">1 booking (no barrier)</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">Entry — Tier 2</span><span className="cs-tier-val">3 trips</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">What copy could say</span><span className="cs-tier-val">&ldquo;Just 1 trip away!&rdquo;</span></div>
          <div className="cs-tier-row"><span className="cs-tier-label">Tier 1 benefits</span><span className="cs-tier-val">Immediate on first booking</span></div>
        </div>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 05. Two tests */}
  <section className="cs-section">
    <span className="cs-label">05. Two tests, one lesson</span>
    <h2>Test 1 proved that copy alone doesn&apos;t move behaviour</h2>
    <p>
      We ran two A/B tests before the full redesign, each over three months. The first gave me better copy to work with but the same broken structure. The second changed the structure.
    </p>
    <div className="cs-ab-split">
      <div className="cs-ab-col">
        <div className="cs-ab-head">
          Test 1
          <span className="cs-ab-badge" style={{ background: 'var(--c-surface)', color: 'var(--c-muted)' }}>Flat</span>
        </div>
        <div className="cs-ab-body">
          <div className="cs-ab-title">Intermediary reward program</div>
          <div className="cs-ab-desc">I wrote a goCash reward system: ₹100 per booking, progress surfaced inline. Core copy: &ldquo;You book, we reward.&rdquo; The copy was clean. The structure was still spend-to-earn.</div>
          <div className="cs-ab-result" style={{ color: 'var(--c-muted)' }}>Bookings per booker +15%. Not bad. Not a step-change. The copy couldn&apos;t overcome a structure users didn&apos;t trust.</div>
        </div>
      </div>
      <div className="cs-ab-col">
        <div className="cs-ab-head">
          Test 2
          <span className="cs-ab-badge" style={{ background: 'rgba(29,158,117,0.1)', color: '#14593A' }}>Signal</span>
        </div>
        <div className="cs-ab-body">
          <div className="cs-ab-title">Reduced entry barrier</div>
          <div className="cs-ab-desc">Star entry cut ₹15k → ₹8k. SuperStar ₹85k → ₹60k. Benefits moved to booking touchpoints. The copy had a structure it could be honest about.</div>
          <div className="cs-ab-result" style={{ color: '#14593A' }}>Booker activation +22%, bookings per booker +18%, conversion +16%. Everything moved.</div>
        </div>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 06. What I wrote */}
  <section className="cs-section">
    <span className="cs-label">06. What I wrote</span>
    <h2>Copy decisions across every touchpoint</h2>
    <p>
      Once the structure was right, the copy job was to make membership feel immediate and worth something at every point of contact — not just on the program page.
    </p>

    <div className="cs-copy-block">
      <div className="cs-copy-head">
        Progress indicator · homepage
        <span className="cs-copy-tag" style={{ background: 'rgba(29,158,117,0.1)', color: '#14593A' }}>Tier 1 → 2</span>
      </div>
      <div className="cs-copy-body">
        <div className="cs-copy-context">User is on go-Tribe 1. Has 2 bookings. Needs 1 more to reach go-Tribe 2.</div>
        <div className="cs-copy-decision">
          <div className="cd-label">Old copy</div>
          <div className="cd-copy">&ldquo;Complete a booking* to join goTribe membership&rdquo;</div>
          <div className="cd-note">Gate framing. Membership sounds conditional and distant. The asterisk adds friction before any value is communicated.</div>
        </div>
        <div className="cs-copy-decision">
          <div className="cd-label">New copy</div>
          <div className="cd-copy">&ldquo;Just 1 trip away!&rdquo;</div>
          <div className="cd-note">Progress framing. Specific number. Forward-looking. The user is close to something, not far from a threshold. Same fact, opposite emotional register.</div>
        </div>
      </div>
    </div>

    <div className="cs-copy-block">
      <div className="cs-copy-head">
        Seat selection · flight add-ons
        <span className="cs-copy-tag" style={{ background: 'rgba(26,58,143,0.1)', color: '#0F2260' }}>Benefit in context</span>
      </div>
      <div className="cs-copy-body">
        <div className="cs-copy-context">go-Tribe 2 member is choosing a seat. Seat 3F normally costs ₹150.</div>
        <div className="cs-copy-decision">
          <div className="cd-label">Benefit tooltip</div>
          <div className="cd-copy">&ldquo;Free for you · Since you&apos;re a goTribe2 member · 3F (₹150) → FREE&rdquo;</div>
          <div className="cd-note">Three things happening: personalisation (&ldquo;for you&rdquo;), attribution (&ldquo;since you&apos;re a member&rdquo;), and concrete value (struck price). The user doesn&apos;t have to remember what their membership includes — it shows up at the moment it matters.</div>
        </div>
      </div>
    </div>

    <div className="cs-copy-block">
      <div className="cs-copy-head">
        Tier upgrade · booking confirmation
        <span className="cs-copy-tag" style={{ background: 'rgba(212,133,10,0.1)', color: '#7A4A0A' }}>Milestone moment</span>
      </div>
      <div className="cs-copy-body">
        <div className="cs-copy-context">User just crossed into go-Tribe 2 for the first time.</div>
        <div className="cs-copy-decision">
          <div className="cd-label">Upgrade notification</div>
          <div className="cd-copy">&ldquo;Congratulations! You are now a goTribe2 member · Benefits unlocked — use these on your next booking&rdquo;</div>
          <div className="cd-note">The milestone can&apos;t just celebrate — it has to orient. &ldquo;Use these on your next booking&rdquo; turns the notification into a forward-looking promise. Without that line, it&apos;s just a badge.</div>
        </div>
      </div>
    </div>

    <div className="cs-copy-block">
      <div className="cs-copy-head">
        Program page · savings dashboard
        <span className="cs-copy-tag" style={{ background: 'var(--c-surface)', color: 'var(--c-muted)' }}>Returning member</span>
      </div>
      <div className="cs-copy-body">
        <div className="cs-copy-context">Returning member lands on the go-Tribe program page.</div>
        <div className="cs-copy-decision">
          <div className="cd-label">Old state</div>
          <div className="cd-copy">Generic program overview. Tier comparison. No personalised savings data above the fold.</div>
          <div className="cd-note">Treated every visit like a first visit. Didn&apos;t acknowledge what the member had already earned, which made the program feel transactional rather than cumulative.</div>
        </div>
        <div className="cs-copy-decision">
          <div className="cd-label">New state</div>
          <div className="cd-copy">&ldquo;Saved ₹1,200 so far · With your goTribe Membership&rdquo; + goCash Earned on 3 bookings + Savings Done on 3 bookings + Benefits Availed</div>
          <div className="cd-note">Leads with accumulated value. The member sees what they&apos;ve already received before they see what&apos;s next. Loyalty copy should make people feel the relationship is real, not just describe it.</div>
        </div>
      </div>
    </div>

    <div className="cs-copy-block">
      <div className="cs-copy-head">
        Feedback prompt · post-benefit
        <span className="cs-copy-tag" style={{ background: 'rgba(29,158,117,0.1)', color: '#14593A' }}>Trust loop</span>
      </div>
      <div className="cs-copy-body">
        <div className="cs-copy-context">User availed a room upgrade benefit. Feedback prompt shown after check-out.</div>
        <div className="cs-copy-decision">
          <div className="cd-label">Feedback anchor</div>
          <div className="cd-copy">&ldquo;How was your goTribe experience? · You availed this benefit: Room upgrade to Luxury Suite with balcony view&rdquo;</div>
          <div className="cd-note">Generic feedback asks &ldquo;how was your stay?&rdquo; This is different. It names the specific benefit and asks about that. The program demonstrates it remembers what it gave you — which is what makes users feel like members rather than transactions.</div>
        </div>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 07. Moments */}
  <section className="cs-section">
    <span className="cs-label">07. What the decisions looked like</span>
    <h2>Three moments worth naming</h2>
    <div className="cs-moments">
      <div className="cs-moment">
        <div className="cs-moment-n">
          <span className="cs-m-circle" style={{ background: 'rgba(212,133,10,0.12)', color: '#7A4A0A' }}>T</span>
        </div>
        <div className="cs-moment-body">
          <div className="cs-moment-kind">Tradeoff</div>
          <p className="cs-moment-text"><strong>I chose to surface benefits at booking touchpoints rather than contain them to the program page.</strong> The PM&apos;s concern was information overload during checkout. My argument: a benefit surfaced at the moment of decision is a conversion tool. A benefit on a separate page is wallpaper. We tested it. Conversion moved +16%.</p>
        </div>
      </div>
      <div className="cs-moment">
        <div className="cs-moment-n">
          <span className="cs-m-circle" style={{ background: 'rgba(37,99,235,0.12)', color: '#1E3A8A' }}>P</span>
        </div>
        <div className="cs-moment-body">
          <div className="cs-moment-kind">Pushback</div>
          <p className="cs-moment-text"><strong>I argued against iterating copy on the broken structure.</strong> The team&apos;s instinct after test 1 was to improve the reward copy. My point: until the entry barrier changed, any copy I wrote was technically true but emotionally dishonest. &ldquo;Join now for rewards&rdquo; doesn&apos;t land when joining requires ₹15,000. The structural change came first.</p>
        </div>
      </div>
      <div className="cs-moment">
        <div className="cs-moment-n">
          <span className="cs-m-circle" style={{ background: 'rgba(29,158,117,0.12)', color: '#14593A' }}>S</span>
        </div>
        <div className="cs-moment-body">
          <div className="cs-moment-kind">Shift</div>
          <p className="cs-moment-text"><strong>By the end of the project, the team reviewed copy by asking &ldquo;where does the user read this?&rdquo; first.</strong> That&apos;s the shift I care most about. It changed how we designed the seat tooltip, the upgrade notification, and the savings dashboard — all of which were originally designed as program-page features before becoming touchpoint features.</p>
        </div>
      </div>
    </div>
  </section>

  <hr className="cs-rule" />

  {/* 08. Outcome */}
  <section className="cs-section">
    <span className="cs-label">08. What moved</span>
    <h2>Outcomes from the final redesign</h2>
    <div className="cs-outcome-metrics">
      <div className="cs-omc">
        <div className="cs-omc__bar" style={{ width: '22%', background: '#E8531A' }} />
        <div className="cs-omc__value" style={{ color: '#E8531A' }}>+22%</div>
        <div className="cs-omc__label">Booker activation</div>
        <div className="cs-omc__sub">Tier 1 users converting to active bookers</div>
      </div>
      <div className="cs-omc">
        <div className="cs-omc__bar" style={{ width: '18%', background: '#1D9E75' }} />
        <div className="cs-omc__value" style={{ color: '#1D9E75' }}>+18%</div>
        <div className="cs-omc__label">Bookings per booker</div>
        <div className="cs-omc__sub">Members booking more frequently post-join</div>
      </div>
      <div className="cs-omc">
        <div className="cs-omc__bar" style={{ width: '16%', background: '#2563EB' }} />
        <div className="cs-omc__value" style={{ color: '#2563EB' }}>+16%</div>
        <div className="cs-omc__label">Conversion</div>
        <div className="cs-omc__sub">Review → payment completion rate</div>
      </div>
    </div>
    <p>
      Flight seat attach rate increased 4% MoM post-launch. That metric is a UX writing signal specifically — it moved because benefit copy appeared inline at seat selection, not because seats got cheaper or the UI changed. Copy in the right place at the right time.
    </p>
    <div className="cs-verdict">
      <p className="cs-verdict__q">The copy was never the problem. The problem was that the structure made honest copy impossible. Once those were aligned, the writing had something real to do — and did it.</p>
      <p className="cs-verdict__foot">MakeMyTrip · goibibo · go-Tribe Loyalty Redesign · UX Writing &amp; Content Strategy · 6 Months</p>
    </div>
  </section>

        </article>
      </main>
    </>
  )
}
