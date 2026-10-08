import { useState, useEffect, useRef } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Laboratory from './components/Laboratory'
import Contact from './components/Contact'
import Toast from './components/Toast'
import { PROFILE } from './profile'

const LOADING_MESSAGES = [
  { text: 'Initializing AI Workspace...', delay: 0 },
  { text: 'Loading architecture modules...', delay: 600 },
  { text: 'Connecting agent systems...', delay: 1200 },
  { text: 'Launching interface...', delay: 1900 },
  { text: 'Ready.', delay: 2500 },
]

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    LOADING_MESSAGES.forEach((m, i) => {
      setTimeout(() => setMsgIdx(i), m.delay)
    })

    // Progress bar
    const start = Date.now()
    const duration = 2700
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 600)
    }, 3000)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#030712',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '50%', animation: 'rotate-slow 4s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(139,92,246,0.3)', borderRadius: '50%', animation: 'counter-rotate 3s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', background: 'var(--signal-blue)', boxShadow: '0 0 16px rgba(59,130,246,0.8)' }} />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>{PROFILE.name} · Portfolio</span>
      </div>

      {/* Message */}
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--signal-green)', marginBottom: 40, height: 20, letterSpacing: '0.04em' }}>
        {LOADING_MESSAGES[msgIdx]?.text}
        <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
      </div>

      {/* Progress */}
      <div style={{ width: 'min(320px, calc(100vw - 64px))', height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 1, transition: 'width 0.1s linear', boxShadow: '0 0 12px rgba(59,130,246,0.5)' }} />
      </div>

      {/* Percentage */}
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#334155', marginTop: 12 }}>
        {Math.round(progress)}%
      </div>
    </div>
  )
}

function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12)
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`
        ringRef.current.style.top = `${ringPosRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => setIsHover(true)
    const onLeave = () => setIsHover(false)

    const interactables = document.querySelectorAll('button, a, [role="button"]')
    interactables.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      interactables.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  if (!enabled) return null

  const base: React.CSSProperties = { position: 'fixed', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -50%)' }

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{ ...base, width: isHover ? 8 : 6, height: isHover ? 8 : 6, borderRadius: '50%', background: isHover ? '#a78bfa' : '#60a5fa', boxShadow: isHover ? '0 0 12px rgba(167,139,250,0.8)' : '0 0 8px rgba(96,165,250,0.7)', transition: 'width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s' }} />
      {/* Ring */}
      <div ref={ringRef} style={{ ...base, width: isHover ? 40 : 32, height: isHover ? 40 : 32, borderRadius: '50%', border: `1px solid ${isHover ? 'rgba(167,139,250,0.5)' : 'rgba(96,165,250,0.3)'}`, transition: 'width 0.3s, height 0.3s, border-color 0.3s' }} />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease', minHeight: '100vh', background: '#030712', position: 'relative' }}>
        <ParticleCanvas />
        <CustomCursor />
        <Nav />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Laboratory />
          <Contact />
        </main>
        <Toast />
      </div>
    </>
  )
}
