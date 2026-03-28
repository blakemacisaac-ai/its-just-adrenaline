'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = { href: string; icon: string; label: string; key: string }
const NAV: NavItem[] = [
  { href: '/',          icon: '🏠', label: 'Home',      key: 'home' },
  { href: '/program',   icon: '📖', label: 'Programme', key: 'program' },
  { href: '/panic',     icon: '🌊', label: 'Pocket',    key: 'panic' },
  { href: '/anchors',   icon: '⚓', label: 'Anchors',   key: 'anchors' },
  { href: '/journal',   icon: '📋', label: 'Journal',   key: 'journal' },
]

export default function BottomNav({ active }: { active?: string }) {
  const pathname = usePathname()
  return (
    <nav className="bottom-nav">
      {NAV.map(item => {
        const isActive = active === item.key || pathname === item.href
        return (
          <Link key={item.key} href={item.href} className={`bottom-nav-item${isActive ? ' active' : ''}`}>
            <span className="bottom-nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
