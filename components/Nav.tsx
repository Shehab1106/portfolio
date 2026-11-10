"use client"

import { useEffect, useState } from "react"
import { profile } from "@/lib/content"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="nav-in">
        <a className="brand-mark" href="#top" aria-label="Shehab Sherif, home">
          <span className="dot" aria-hidden />
          <span className="mono">shehab sherif</span>
        </a>
        <div className="nav-links">
          <a className="hide-sm" href="#work">Work</a>
          <a className="hide-sm" href="#about">About</a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="cta" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
