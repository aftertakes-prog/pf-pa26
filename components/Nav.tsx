'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [lightMode, setLightMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      setLightMode(true)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    const next = !lightMode
    setLightMode(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    }
  }

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // On case study pages the sections don't exist — let the browser navigate to /#section
    if (pathname !== '/') return
    e.preventDefault()
    const hash = href.slice(1) // '/#work' → '#work'
    const target = document.querySelector(hash)
    if (!target) return
    const lenis = (window as unknown as Record<string, unknown>).__lenis as {
      scrollTo: (el: Element, opts: object) => void
    } | undefined
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.6 })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <Link href="/" className="nav__logo">PK</Link>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="nav__link" onClick={(e) => handleAnchor(e, href)}>
                <span className="nav__link-inner">
                  <span className="nav__link-text">{label}</span>
                  <span className="nav__link-text" aria-hidden="true">{label}</span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav__theme-toggle"
              onClick={toggleTheme}
              aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              title={lightMode ? 'Dark' : 'Light'}
            >
              {lightMode ? '◑' : '◐'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
