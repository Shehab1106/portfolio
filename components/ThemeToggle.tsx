"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setTheme(attr ?? system)
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      /* storage unavailable (private mode) — the choice just won't persist */
    }
  }

  const isDark = theme === "dark"

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.6 6.6 0 009.8 9.8z" />
    </svg>
  )
}
