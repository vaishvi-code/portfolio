import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../profile'

const CHANNELS = [
  { icon: '◈', label: 'Email', value: PROFILE.email, color: '#3b82f6', href: `mailto:${PROFILE.email}` },
  { icon: '⬡', label: 'GitHub', value: PROFILE.github, color: '#8b5cf6', href: `https://${PROFILE.github}` },
  { icon: '⟁', label: 'LinkedIn', value: PROFILE.linkedin, color: '#10b981', href: `https://${PROFILE.linkedin}` },
  { icon: '◉', label: 'Phone', value: PROFILE.phone, color: '#f59e0b', href: `tel:${PROFILE.phone.replace(/[^+\d]/g, '')}` },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setSending(true)
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      window.location.href = mailtoUrl
      setSending(false)
      setSent(true)
    }, 800)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    color: '#f1f5f9',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box' as const,
  }

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '120px 6vw 160px', position: 'relative' }}>
      {/* Final ambient glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-blue)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>// room_08.contact</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.05, marginBottom: 24 }}>
            Let's build something<br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto', animation: 'gradient-shift 4s ease infinite' }}>
              meaningful together.
            </span>
          </h2>
          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 520, margin: '0 auto' }}>
            I'm looking for entry-level opportunities in AI engineering, data science, and applied LLM work.
            I'd love to connect with teams where I can contribute, learn, and grow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 48, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s 0.2s ease' }}>
          {/* Left: channels */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Channels</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.label === 'Email' || ch.label === 'Phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ch.color}44`; e.currentTarget.style.background = `${ch.color}08` }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: ch.color }}>{ch.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.08em', marginBottom: 2 }}>{ch.label}</div>
                    <div style={{ fontSize: 14, color: '#e2e8f0' }}>{ch.value}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: ch.color, opacity: 0.6 }}>↗</span>
                </a>
              ))}
            </div>

            {/* Status */}
            <div style={{ padding: '20px 24px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-green)', boxShadow: '0 0 8px rgba(16,185,129,0.8)', animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-green)' }}>Available for opportunities</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Based in {PROFILE.location}. Target roles: {PROFILE.targetRoles}.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ padding: '36px 40px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--signal-green)', marginBottom: 12 }}>Message received.</div>
                <div style={{ fontSize: 15, color: '#64748b' }}>I'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>
                  Send a message
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={{ ...inputStyle }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>EMAIL</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ ...inputStyle }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>MESSAGE</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about what you're building..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || !name || !email || !message}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: sending ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    border: 'none',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    transition: 'all 0.2s ease',
                    opacity: (!name || !email || !message) ? 0.5 : 1,
                    boxShadow: sending ? 'none' : '0 0 24px rgba(59,130,246,0.25)',
                  }}
                  onMouseEnter={(e) => { if (!sending) e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none' }}
                >
                  {sending ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'rotate-slow 0.8s linear infinite' }} />
                      Sending...
                    </span>
                  ) : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#334155', marginBottom: 8 }}>
            {PROFILE.name} — AI Engineer & Data Scientist
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#1e293b' }}>
            Built with precision · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </section>
  )
}
