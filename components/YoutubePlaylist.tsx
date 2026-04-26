'use client'

export interface PlaylistVideo {
  videoId: string
  title: string
  views: number
  published: string
}

interface Props {
  playlistId: string
  onVideoSelect: (videoId: string, index: number) => void
  videos: PlaylistVideo[]
  playlistTitle?: string
  channelName?: string
  sidebarGradient?: string
}

// ── Sonet X-Line default videos (hardcoded from RSS) ─────────────────────────
export const SONET_VIDEOS: PlaylistVideo[] = [
  { videoId: '5zjPdDojYe4', title: 'The Kia Sonet X-Line | #TheRareKind | Coming Soon',        views: 13935331, published: '2022-08-20' },
  { videoId: 'JKRIiDd4jys', title: 'The Kia Sonet X-Line | #TheRareKind | Coming Soon',        views: 14407515, published: '2022-08-26' },
  { videoId: 'ONc-QBLhIhk', title: 'The Kia Sonet X-Line | Unexpectedly Rare | Bookings open', views: 41832800, published: '2022-09-01' },
  { videoId: 'nlMzBKf-NMk', title: 'The Kia Sonet X-Line | #TheRareKind | Book Now',           views: 20436849, published: '2022-09-17' },
  { videoId: 'sCojKyjfwh8', title: 'Sonet X-Line | Meet The Rare Kind | Diamond',              views: 584817,   published: '2022-10-13' },
  { videoId: '4aZY1RnxAGY', title: 'Sonet X-Line | Meet The Rare Kind | Graphite',             views: 263810,   published: '2022-10-17' },
  { videoId: 'nJIgllF7RL8', title: 'Sonet X-Line | Meet The Rare Kind | Aurora',               views: 98725,    published: '2022-10-18' },
]

// ── #CarensFamilyDrive playlist videos ──────────────────────────────────────
export const CARENS_VIDEOS: PlaylistVideo[] = [
  { videoId: 'LdeiRXNjJqk', title: 'Kia Carens | Meet the Mehtas | EP01 — Tech A Look',                  views: 2100000, published: '2022-03-15' },
  { videoId: 'Ds1Dmg8HcOs', title: 'Kia Carens | Meet the Mehtas | EP02 — Make Space for Mom',           views: 1800000, published: '2022-03-22' },
  { videoId: 'ZTPbAp8uHOc', title: 'Kia Carens | Meet The Mehtas | EP03 — The Fam vs Instagram',         views: 1650000, published: '2022-03-29' },
  { videoId: 'MP5Q3r6UFkc', title: 'Kia Carens | Meet The Mehtas | EP04 — Party time…on wheels!',        views: 1420000, published: '2022-04-05' },
  { videoId: 'jgwEyR6UOhU', title: 'Kia Carens | Meet The Mehtas | EP05 — Perfect match for the football team', views: 1250000, published: '2022-04-12' },
  { videoId: 'z2i4tzRu8qU', title: 'Kia Carens | Meet The Mehtas | EP06 — Dog save us!',                 views: 980000,  published: '2022-04-19' },
  { videoId: 'j0MjVtKXpSs', title: 'Kia Carens | Carens Laughter Pit-Stop feat. Atul Khatri',            views: 3200000, published: '2022-02-10' },
  { videoId: '_pVrTi-awFE', title: 'Kia Carens | Carens Laughter Pit-Stop | Stunning Looks',             views: 850000,  published: '2022-01-18' },
  { videoId: '2xLQFxnT8zQ', title: 'Kia Carens | Carens Laughter Pit-Stop | Comfortable 3rd Row Seats',  views: 760000,  published: '2022-01-20' },
  { videoId: '5NlU-2oQjDU', title: 'Kia Carens | Carens Laughter Pit-Stop | Room For Everyone',           views: 640000,  published: '2022-01-22' },
  { videoId: 'h5naIbjQtTg', title: 'Kia Carens | Carens Laughter Pit-Stop | The Joy Of Sunroof',         views: 590000,  published: '2022-01-24' },
  { videoId: 'XFlj11uvPd8', title: 'Kia Carens | Carens Laughter Pit-Stop | Personal Charging Ports',    views: 520000,  published: '2022-01-26' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000)     return `${Math.round(n / 1_000)}K`
  return `${n}`
}

function timeAgo(dateStr: string) {
  const ms = Date.now() - new Date(dateStr).getTime()
  const y = Math.floor(ms / (1000 * 60 * 60 * 24 * 365))
  if (y > 0) return `${y} year${y > 1 ? 's' : ''} ago`
  const m = Math.floor(ms / (1000 * 60 * 60 * 24 * 30))
  return m > 0 ? `${m} months ago` : 'Recently'
}

function thumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

// ── Default sidebar gradient (Sonet — warm brown from X-Line palette) ────────
const SONET_GRADIENT = 'linear-gradient(180deg, #c9a678 0%, #a07848 35%, #7a5830 65%, #5c3e1e 100%)'
// Carens sidebar gradient — Kia red, matching the Carens campaign palette
const CARENS_GRADIENT = 'linear-gradient(180deg, #c0503c 0%, #96321e 35%, #6e1e14 65%, #4a100a 100%)'

export { CARENS_GRADIENT, SONET_GRADIENT }

export default function YoutubePlaylist({ playlistId: _playlistId, onVideoSelect, videos, playlistTitle = 'Sonet X-Line', channelName = 'Kia India', sidebarGradient = SONET_GRADIENT }: Props) {
  const totalViews = videos.reduce((s, v) => s + v.views, 0)
  const channelInitial = channelName.charAt(0).toUpperCase()

  return (
    <div className="yt-playlist">

      {/* ── LEFT SIDEBAR ── */}
      <div className="yt-playlist__sidebar" style={{ background: sidebarGradient }} data-lenis-prevent>
        {/* Stacked thumbnail card */}
        <div className="yt-playlist__card">
          <div className="yt-playlist__stack">
            <div className="yt-playlist__stack-back2" />
            <div className="yt-playlist__stack-back1" />
            <div className="yt-playlist__cover-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(videos[0].videoId)} alt={playlistTitle} className="yt-playlist__cover" />
              <div className="yt-playlist__cover-overlay">
                <div className="yt-playlist__play-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  <span>PLAY ALL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="yt-playlist__info">
            <div className="yt-playlist__title">{playlistTitle}</div>
            <div className="yt-playlist__channel-row">
              <div className="yt-playlist__channel-avatar">{channelInitial}</div>
              <span className="yt-playlist__channel-name">{channelName}</span>
            </div>
            <div className="yt-playlist__stats">
              Playlist · {videos.length} videos · {fmtViews(totalViews)} views
            </div>
            <button
              className="yt-playlist__play-btn"
              onClick={() => onVideoSelect(videos[0].videoId, 1)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Play all
            </button>
            <div className="yt-playlist__action-row">
              <button className="yt-playlist__action-btn" title="Save">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
              </button>
              <button className="yt-playlist__action-btn" title="Share">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
              </button>
              <button className="yt-playlist__action-btn" title="More">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT VIDEO LIST ── */}
      <div className="yt-playlist__list" data-lenis-prevent>
        {videos.map((v, i) => (
          <button
            key={v.videoId}
            className="yt-playlist__item"
            onClick={() => onVideoSelect(v.videoId, i + 1)}
          >
            <span className="yt-playlist__item-num">{i + 1}</span>
            <div className="yt-playlist__item-thumb-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(v.videoId)} alt={v.title} className="yt-playlist__item-thumb" />
            </div>
            <div className="yt-playlist__item-info">
              <div className="yt-playlist__item-title">{v.title}</div>
              <div className="yt-playlist__item-meta">
                {channelName} · {fmtViews(v.views)} views · {timeAgo(v.published)}
              </div>
            </div>
            <button className="yt-playlist__item-more" onClick={e => e.stopPropagation()} title="More">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
          </button>
        ))}
      </div>

    </div>
  )
}
