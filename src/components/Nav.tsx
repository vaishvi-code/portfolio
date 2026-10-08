import { useState, useEffect } from 'react'
import { PROFILE } from '../profile'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'laboratory', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 80)
      setLastY(y)

      // Detect active section
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(item.id)
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? 0 : -80}px)`,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
        opacity: visible ? 1 : 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px',
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 50,
      }}
    >
      {/* Logo dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 12, borderRight: '1px solid rgba(255,255,255,0.08)', marginRight: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-blue)', boxShadow: '0 0 8px rgba(59,130,246,0.8)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: '#f1f5f9', letterSpacing: '0.02em' }}>{PROFILE.initials}</span>
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          style={{
            background: active === item.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
            border: active === item.id ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
            borderRadius: 24,
            padding: '5px 12px',
            fontSize: 12,
            fontWeight: 500,
            color: active === item.id ? '#60a5fa' : '#94a3b8',
            transition: 'all 0.2s ease',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={(e) => {
            if (active !== item.id) {
              e.currentTarget.style.color = '#f1f5f9'
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }
          }}
          onMouseLeave={(e) => {
            if (active !== item.id) {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.background = 'transparent'
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
