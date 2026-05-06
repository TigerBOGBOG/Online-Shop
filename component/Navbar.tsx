"use client"
import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const navLinks = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับ", href: "/about" },
  { label: "บริการ", href: "/services" },
  { label: "ติดต่อ", href: "/contact" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-gray-900 rounded-lg" />
          <span className="text-sm font-semibold text-gray-900 tracking-tight">Kuy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/signin"
            className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 px-4 py-1.5 rounded-lg transition-colors"
          >
            สมัครสมาชิก
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-5 h-px bg-gray-900 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-gray-900 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-gray-900 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </header>
  )
}
