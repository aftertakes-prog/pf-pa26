'use client'
import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import YoutubePlaylist, { PlaylistVideo, SONET_VIDEOS } from './YoutubePlaylist'

interface BrowserFrameProps {
  videoSrc?: string
  poster?: string
  url?: string
  /** Render an interactive YouTube playlist UI (fetched from RSS, no API key) */
  playlistId?: string
  /** Videos to show in the playlist UI (defaults to Sonet X-Line set) */
  playlistVideos?: PlaylistVideo[]
  /** Playlist display title shown in the sidebar */
  playlistTitle?: string
  /** Channel name shown in the sidebar */
  channelName?: string
  /** CSS gradient string for the sidebar panel */
  sidebarGradient?: string
  /** Static image thumbnail (for non-interactive previews) */
  thumbnailSrc?: string
  /** Direct embed URL — used only for the PIP player */
  embedUrl?: string
  className?: string
}

export default function BrowserFrame({
  videoSrc,
  poster,
  url = 'studio.spinny.com',
  playlistId,
  playlistVideos = SONET_VIDEOS,
  playlistTitle,
  channelName,
  sidebarGradient,
  thumbnailSrc,
  embedUrl,
  className = '',
}: BrowserFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [pipOpen, setPipOpen] = useState(false)
  const [pipVideoId, setPipVideoId] = useState<string | null>(null)
  const [pipPos, setPipPos] = useState({ x: 0, y: 0 })
  const pipRef = useRef<HTMLDivElement>(null)
  const dragOrigin = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  const PIP_DEFAULT_WIDTH = 440
  const PIP_MIN_WIDTH = Math.round(PIP_DEFAULT_WIDTH * 0.75) // 330px
  const [pipWidth, setPipWidth] = useState(PIP_DEFAULT_WIDTH)
  const resizeOrigin = useRef({ mx: 0, w: 0 })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return
    video.play().catch(() => {})
  }, [videoSrc])

  const openPip = (videoId?: string) => {
    setPipPos({
      x: Math.max(0, window.innerWidth - 460),
      y: Math.max(0, window.innerHeight - 300),
    })
    setPipVideoId(videoId ?? null)
    setPipOpen(true)
  }

  const closePip = () => {
    setPipOpen(false)
    setPipVideoId(null)
    setPipWidth(PIP_DEFAULT_WIDTH)
  }

  const startResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    resizeOrigin.current = { mx: e.clientX, w: pipWidth }
    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientX - resizeOrigin.current.mx
      setPipWidth(Math.max(PIP_MIN_WIDTH, resizeOrigin.current.w + delta))
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    // Don't drag when clicking buttons, the resize handle, or inside the iframe (iframe events don't reach here anyway)
    if ((e.target as HTMLElement).closest('button, .browser-pip__resize-handle')) return
    e.preventDefault()
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pipPos.x, py: pipPos.y }
    pipRef.current?.classList.add('is-dragging')

    const onMove = (ev: PointerEvent) => {
      setPipPos({
        x: dragOrigin.current.px + ev.clientX - dragOrigin.current.mx,
        y: dragOrigin.current.py + ev.clientY - dragOrigin.current.my,
      })
    }

    const onUp = () => {
      pipRef.current?.classList.remove('is-dragging')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // Build PIP src: specific video or fallback to full playlist embed
  const pipSrc = pipVideoId
    ? `https://www.youtube.com/embed/${pipVideoId}?list=${playlistId ?? ''}&autoplay=1`
    : embedUrl ?? ''

  // Determine screen modifier class
  const screenClass = playlistId
    ? 'browser-screen--playlist'
    : thumbnailSrc
    ? 'browser-screen--thumbnail'
    : ''

  return (
    <>
      <div className={`browser-wrap ${className}`}>
        {/* Title bar */}
        <div className="browser-toolbar">
          <div className="browser-dots">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
          </div>
          <div className="browser-url-bar">
            <span className="browser-url-text">{url}</span>
          </div>
          <div className="browser-dots-spacer" />
        </div>

        {/* Screen */}
        <div className={`browser-screen ${screenClass}`}>
          {playlistId ? (
            <YoutubePlaylist
              playlistId={playlistId}
              videos={playlistVideos}
              playlistTitle={playlistTitle}
              channelName={channelName}
              sidebarGradient={sidebarGradient}
              onVideoSelect={(videoId) => openPip(videoId)}
            />
          ) : thumbnailSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailSrc} alt="Page preview" className="browser-thumbnail" />
              {embedUrl && (
                <button className="browser-pip-btn" onClick={() => openPip()} aria-label="Watch in player">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 11h-8v6h8v-6zm4 8V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.98h18v14.04z"/>
                  </svg>
                </button>
              )}
            </>
          ) : videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              className="browser-video"
            />
          ) : (
            <div className="browser-placeholder">
              <div className="browser-placeholder__grid" />
            </div>
          )}
        </div>
      </div>

      {/* PIP portal — rendered into document.body to escape any transformed ancestors */}
      {mounted && pipOpen && pipSrc && createPortal(
        <div
          ref={pipRef}
          className="browser-wrap browser-pip"
          style={{ transform: `translate(${pipPos.x}px, ${pipPos.y}px)`, width: `${pipWidth}px` }}
        >
          {/* Toolbar — draggable */}
          <div className="browser-toolbar browser-pip__toolbar" onPointerDown={startDrag}>
            <div className="browser-url-bar">
              <span className="browser-url-text">{url}</span>
            </div>
            <button className="browser-pip__close-btn" onClick={closePip} title="Close">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Video content */}
          <div className="browser-screen browser-screen--embed">
            <div className="browser-pip__shield" />
            <iframe
              src={pipSrc}
              className="browser-embed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              title="PIP player"
            />
          </div>

          {/* Edge drag strips — sit on top of the iframe so all 4 edges are draggable */}
          <div className="browser-pip__edge browser-pip__edge--top"    onPointerDown={startDrag} />
          <div className="browser-pip__edge browser-pip__edge--left"   onPointerDown={startDrag} />
          <div className="browser-pip__edge browser-pip__edge--right"  onPointerDown={startDrag} />
          <div className="browser-pip__edge browser-pip__edge--bottom" onPointerDown={startDrag} />
          {/* Corner drag handles */}
          <div className="browser-pip__edge browser-pip__edge--corner-tl" onPointerDown={startDrag} />
          <div className="browser-pip__edge browser-pip__edge--corner-tr" onPointerDown={startDrag} />
          <div className="browser-pip__edge browser-pip__edge--corner-bl" onPointerDown={startDrag} />

          {/* Resize handle — bottom-right corner */}
          <div className="browser-pip__resize-handle" onPointerDown={startResize} title="Resize" />
        </div>,
        document.body
      )}
    </>
  )
}
