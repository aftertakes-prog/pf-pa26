'use client'
import { useState, useCallback } from 'react'
import KiaDemoFrame from './KiaDemoFrame'
import KiaCaseStudyPanel from './KiaCaseStudyPanel'

type Campaign = 'sonet' | 'carens'

const CONTENT = {
  sonet: {
    company: 'Innocean India × Kia India',
    period:  'Aug–Oct 2022',
    title:   'Sonet X Line — The Rare Kind',
    scope:   ['Brand Strategy', 'Campaign Writing', 'ATL + Digital + Retail'],
    desc:    "Built brand strategy and copy voice for the flagship X Line variant launch. The Rare Kind wasn't a tagline — it was the organising principle across TV, OOH, digital, and 500+ Kia dealerships. One idea. Every touchpoint.",
    outcome: '75M+ YouTube views · 42M on the flagship film · 2M+ organic impressions',
  },
  carens: {
    company: 'Innocean India × Kia India',
    period:  'Nov 2021–Feb 2022',
    title:   'Carens — Made for Every Family',
    scope:   ['Brand Strategy', 'Campaign Writing', 'Community Storytelling'],
    desc:    "Positioned the Carens for every kind of Indian family — not a postcard version of one. Multi-film ATL, gamified digital with 2× industry engagement in two weeks, and the #CarensFamilyDrive community storytelling arc post-launch.",
    outcome: '19K+ pre-launch bookings · 2× engagement rate · 200K+ units sold',
  },
} as const

export default function KiaBrandCard() {
  const [campaign, setCampaign] = useState<Campaign>('sonet')
  const [panelOpen, setPanelOpen]   = useState(false)

  const c = CONTENT[campaign]
  const handleClose = useCallback(() => setPanelOpen(false), [])

  return (
    <>
      <div className="brand-card brand-card--browser">

        {/* Media — pills inside here drive campaign state */}
        <div className="work-card__media">
          <KiaDemoFrame campaign={campaign} onCampaignChange={setCampaign} />
        </div>

        {/* Content — updates when campaign changes */}
        <div className="work-card__content">
          <div className="card-meta">
            <span className="card-meta__index">02</span>
            <span className="card-meta__company">{c.company}</span>
            <span className="card-meta__period">{c.period}</span>
          </div>
          <h3 className="card-title">{c.title}</h3>
          <div className="card-scope">
            {c.scope.map(s => <span key={s}>{s}</span>)}
          </div>
          <p className="card-desc">{c.desc}</p>
          <p className="card-outcome">↗ {c.outcome}</p>
          <button className="kia-cs-cta" onClick={() => setPanelOpen(true)}>
            Read case study →
          </button>
        </div>

      </div>

      <KiaCaseStudyPanel isOpen={panelOpen} onClose={handleClose} campaign={campaign} />
    </>
  )
}
