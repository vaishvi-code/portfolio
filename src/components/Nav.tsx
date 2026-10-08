import { useState, useEffect } from 'react'
import { PROFILE } from '../profile'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: '✦' },
  { id: 'about', label: 'About', icon: '◈' },
  { id: 'projects', label: 'Projects', icon: '⬡' },
  { id: 'skills', label: 'Skills', icon: '◉' },
  { id: 'laboratory', label: 'Research', icon: '◎' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [active, setActive] = useState('hero')
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 80 || menuOpen)
      setLastY(y)

      // Detect active section
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 140 && rect.bottom > 140) {
            setActive(item.id)
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY, menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Active item label for mobile pill
  const activeItem = NAV_ITEMS.find((n) => n.id === active) || NAV_ITEMS[0]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: isMobile ? 12 : 20,
          left: '50%',
          transform: `translateX(-50%) translateY(${visible ? 0 : -80}px)`,
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          opacity: visible ? 1 : 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 12 : 4,
          padding: isMobile ? '8px 14px' : '8px 12px',
          width: isMobile ? 'min(440px, calc(100vw - 28px))' : 'auto',
          background: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 50,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo dot & Initials */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 0,
            cursor: 'pointer',
            paddingRight: isMobile ? 0 : 12,
            borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
            marginRight: isMobile ? 0 : 4,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-blue)', boxShadow: '0 0 8px rgba(59,130,246,0.8)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.02em' }}>{PROFILE.initials}</span>
          {isMobile && (
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginLeft: 4 }}>
              / {activeItem.label}
            </span>
          )}
        </button>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
                  cursor: 'pointer',
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
          </div>
        )}

        {/* Mobile Hamburger Toggle */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: menuOpen ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${menuOpen ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 20,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: menuOpen ? '#60a5fa' : '#e2e8f0',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            <span style={{ fontSize: 13, lineHeight: 1 }}>{menuOpen ? '✕' : '☰'}</span>
          </button>
        )}
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '24px 20px',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 400,
              width: '100%',
              margin: '0 auto',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24,
              padding: '24px 20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-green)', animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-green)' }}>{PROFILE.availability}</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 18, cursor: 'pointer', padding: 4 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: active === item.id ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                    background: active === item.id ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.02)',
                    color: active === item.id ? '#60a5fa' : '#cbd5e1',
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ color: active === item.id ? 'var(--signal-blue)' : '#475569', fontSize: 14 }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {active === item.id && (
                    <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--signal-blue)' }}>ACTIVE</span>
                  )}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 10 }}>
              <a
                href={PROFILE.resume}
                download="Vaishvi_Patel_Resume.pdf"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: 12,
                  color: '#c084fc',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <span>Résumé</span>
                <span>↓</span>
              </a>
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
