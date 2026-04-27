'use client'
import { useRef, useEffect, useState } from 'react'

interface PhoneFrameProps {
  videoSrc?: string
  poster?: string
  frameSrc?: string
  className?: string
  hideMuteBtn?: boolean
}

export default function PhoneFrame({
  videoSrc,
  poster,
  frameSrc = '/images/iphone-frame.png',
  className = '',
  hideMuteBtn = false,
}: PhoneFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return
    video.play().catch(() => {})
  }, [videoSrc])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className={`iphone-wrap ${className}`}>
      <div className="iphone-screen">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="iphone-video"
          />
        ) : poster ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={poster} alt="" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: 'auto', maxWidth: 'none' }} />
        ) : (
          <div className="iphone-screen-placeholder" />
        )}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt=""
        aria-hidden
        className="iphone-frame-img"
        draggable={false}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />

      {videoSrc && !hideMuteBtn && (
        <button
          className="iphone-mute-btn"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            /* Speaker with X (muted) */
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            /* Speaker with waves (unmuted) */
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
