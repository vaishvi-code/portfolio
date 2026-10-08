import { useEffect, useState } from 'react'
import { PROFILE } from '../profile'

const TAGLINES = [
  'Building useful AI, one iteration at a time.',
  'Exploring data. Training models. Learning constantly.',
  'Turning LLM ideas into practical experiences.',
  'Ready to contribute, grow, and solve real problems.',
]

const SYSTEM_STATS = [
  { label: 'PROJECTS', value: '05', color: 'var(--signal-blue)', unit: '' },
  { label: 'GPA', value: '3.9', color: 'var(--signal-purple)', unit: '/4' },
  { label: 'RESEARCH', value: 'ACTIVE', color: 'var(--signal-orange)', unit: '' },
  { label: 'OPPORTUNITIES', value: 'OPEN', color: 'var(--signal-green)', unit: '' },
]

function useTypewriter(texts: string[], speed = 55) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing')

  useEffect(() => {
    const current = texts[idx]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 2200)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2)
      } else {
        setIdx((i) => (i + 1) % texts.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, idx, texts, speed])

  return displayed
}

function NeuralOrbit() {
  return (
    <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 320, height: 320, opacity: 0.6 }}>
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '50%',
        animation: 'rotate-slow 25s linear infinite',
      }}>
        <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-blue)', boxShadow: '0 0 12px rgba(59,130,246,0.8)' }} />
        <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'var(--signal-purple)', boxShadow: '0 0 8px rgba(139,92,246,0.6)' }} />
      </div>

      {/* Mid ring */}
      <div style={{
        position: 'absolute', inset: 40,
        border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: '50%',
        animation: 'counter-rotate 18s linear infinite',
      }}>
        <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: 'var(--signal-cyan)', boxShadow: '0 0 10px rgba(6,182,212,0.7)' }} />
        <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: 'var(--signal-green)', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
      </div>

      {/* Inner ring */}
      <div style={{
        position: 'absolute', inset: 80,
        border: '1px solid rgba(6,182,212,0.25)',
        borderRadius: '50%',
        animation: 'rotate-slow 12s linear infinite',
      }}>
        <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'var(--signal-orange)', boxShadow: '0 0 8px rgba(245,158,11,0.7)' }} />
      </div>

      {/* Center node */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 48, height: 48,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(59,130,246,0.4)',
        boxShadow: '0 0 32px rgba(59,130,246,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--signal-blue)', boxShadow: '0 0 16px rgba(59,130,246,0.8)' }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const tagline = useTypewriter(TAGLINES)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 6vw',
      overflow: 'hidden',
    }}>
      {/* Ambient gradient */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '15%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {/* Status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--signal-green)', boxShadow: '0 0 8px rgba(16,185,129,0.8)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-green)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {PROFILE.availability}
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          color: '#f8fafc',
          marginBottom: 8,
          animation: 'fadeInUp 0.7s ease forwards',
        }}>
          {PROFILE.name}
        </h1>

        {/* Role */}
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 26px)',
          fontWeight: 400,
          color: '#475569',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 32,
          animation: 'fadeInUp 0.7s 0.1s ease both',
        }}>
          {PROFILE.role}
        </div>

        {/* Typewriter tagline */}
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(22px, 3vw, 36px)',
          fontWeight: 600,
          color: '#f1f5f9',
          minHeight: 48,
          marginBottom: 48,
          animation: 'fadeInUp 0.7s 0.2s ease both',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {tagline}
          </span>
          <span style={{ color: 'var(--signal-blue)', animation: 'blink 1s step-end infinite' }}>|</span>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: '#64748b',
          maxWidth: 520,
          marginBottom: 48,
          animation: 'fadeInUp 0.7s 0.3s ease both',
        }}>
          {PROFILE.intro}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeInUp 0.7s 0.4s ease both' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 24px rgba(59,130,246,0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(59,130,246,0.25)'
            }}
          >
            View Projects →
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 28px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#94a3b8',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.04em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
              e.currentTarget.style.color = '#f1f5f9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#94a3b8'
            }}
          >
            Get in Touch
          </button>
          <a
            href={PROFILE.resume}
            download="Vaishvi_Patel_Resume.pdf"
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 10,
              color: '#a78bfa',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(167,139,250,0.65)'
              e.currentTarget.style.background = 'rgba(139,92,246,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Download Résumé ↓
          </a>
        </div>
      </div>

      {/* Orbital visualization */}
      <NeuralOrbit />

      {/* System stats strip */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: '6vw',
        display: 'flex',
        gap: 40,
        animation: 'fadeIn 1s 0.8s ease both',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s 0.8s ease',
      }}>
        {SYSTEM_STATS.map((stat) => (
          <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 600, color: stat.color, letterSpacing: '-0.02em' }}>
              {stat.value}<span style={{ fontSize: 12, fontWeight: 400, color: '#475569' }}>{stat.unit}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: '6vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: 0.4,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', letterSpacing: '0.15em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #64748b, transparent)' }} />
      </div>
    </section>
  )
}
