// components/Header.tsx
"use client"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-serif tracking-wide">
          <Link href="/">Floral Lumina</Link>
        </div>
        <nav className="hidden md:flex gap-6 text-sm uppercase tracking-wide">
          {["About", "Top", "Gallery", "Q&A", "News"].map((label) => (
            <Link href={`#${label.toLowerCase()}`} key={label} className="hover:opacity-70">
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-sm"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
          {["About", "Top", "Gallery", "Q&A", "News"].map((label) => (
            <Link href={`#${label.toLowerCase()}`} key={label} className="block text-sm">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}