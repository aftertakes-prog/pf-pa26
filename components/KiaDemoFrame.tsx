'use client'
import BrowserFrame from './BrowserFrame'
import { SONET_VIDEOS, CARENS_VIDEOS, SONET_GRADIENT, CARENS_GRADIENT } from './YoutubePlaylist'

type Campaign = 'sonet' | 'carens'

const CONFIG = {
  sonet: {
    label:          'Sonet',
    url:            'youtube.com/playlist?list=PL_mUkanXQHmdparUnp5U155w9BXqEbuzj',
    playlistId:     'PL_mUkanXQHmdparUnp5U155w9BXqEbuzj',
    videos:         SONET_VIDEOS,
    playlistTitle:  'Sonet X-Line',
    channelName:    'Kia India',
    sidebarGradient: SONET_GRADIENT,
  },
  carens: {
    label:          'Carens',
    url:            'youtube.com/playlist?list=PL_mUkanXQHmefYeFad_gYBr4SLc59g7S-',
    playlistId:     'PL_mUkanXQHmefYeFad_gYBr4SLc59g7S-',
    videos:         CARENS_VIDEOS,
    playlistTitle:  '#CarensFamilyDrive',
    channelName:    'Kia India',
    sidebarGradient: CARENS_GRADIENT,
  },
} as const

interface Props {
  campaign: Campaign
  onCampaignChange: (c: Campaign) => void
}

export default function KiaDemoFrame({ campaign, onCampaignChange }: Props) {
  const active = CONFIG[campaign]

  return (
    <div className="brand-demo-wrap">
      {/* Pills — outside and above the browser frame */}
      <div className="brand-demo-switcher">
        <span className="brand-demo-switcher__label">Campaign</span>
        <div className="brand-demo-switcher__pills">
          {(Object.keys(CONFIG) as Campaign[]).map(c => (
            <button
              key={c}
              onClick={() => onCampaignChange(c)}
              className={`brand-switcher-pill brand-switcher-pill--${c}${campaign === c ? ' is-active' : ''}`}
            >
              {CONFIG[c].label}
            </button>
          ))}
        </div>
      </div>

      {/* Browser frame — swaps content when campaign changes */}
      <BrowserFrame
        url={active.url}
        playlistId={active.playlistId}
        playlistVideos={active.videos}
        playlistTitle={active.playlistTitle}
        channelName={active.channelName}
        sidebarGradient={active.sidebarGradient}
      />
    </div>
  )
}
