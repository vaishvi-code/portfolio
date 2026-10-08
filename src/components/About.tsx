import { useEffect, useRef, useState } from 'react'

const TIMELINE = [
  {
    year: '2026',
    title: 'Graduate Research Assistant',
    org: 'NC State University · Robotics Lab',
    desc: 'Characterized 5,000+ LLM requests and built an ML scheduling policy for KV-cache management, improving P95 latency by 18% over FCFS.',
    color: 'var(--signal-blue)',
  },
  {
    year: '2025',
    title: 'Software Engineer Intern',
    org: 'Cignex Technologies · Ahmedabad, India',
    desc: 'Delivered an AWS Rekognition sketch-to-photo system with 85% accuracy, improving precision by 15% and reducing pipeline latency by 20%.',
    color: 'var(--signal-purple)',
  },
  {
    year: '2024',
    title: 'Artificial Intelligence Intern',
    org: 'IBM SkillsBuild with CSRBOX · Ahmedabad, India',
    desc: 'Built an IBM Watson movie recommendation app with Python and Flask, achieving 88% user satisfaction and reducing response time by 25%.',
    color: 'var(--signal-cyan)',
  },
]

const PRINCIPLES = [
  {
    icon: '◈',
    title: 'Master of Computer Science',
    desc: 'North Carolina State University · Aug 2025–May 2027 · GPA 3.9/4.0. Graduate Teaching Assistant for Computer Networks.',
  },
  {
    icon: '⬡',
    title: 'Graduate Coursework',
    desc: 'Algorithms, Software Engineering, Data Analysis, AI of Things, Neural Networks, Deep Learning, Parallel Systems, ML with Graphs, and Generative AI.',
  },
  {
    icon: '⟁',
    title: 'Bachelor of Engineering · Computer Science',
    desc: 'New L.J. Institute of Engineering and Technology, Gujarat Technological University · Aug 2021–Jun 2025 · CGPA 9.8/10.0.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 80, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-blue)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
            // room_02.about
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1, marginBottom: 24 }}>
            Curious by nature.<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Practical by design.
            </span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#64748b', maxWidth: 560 }}>
            I'm a Computer Science master's student at NC State working across LLM systems, machine learning,
            data engineering, and full-stack development—with a focus on measurable, useful outcomes.
          </p>
        </div>

        {/* Grid: Principles + Timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-24px)', transition: 'all 0.7s 0.2s ease' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{
                padding: '28px 32px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)'
                e.currentTarget.style.background = 'rgba(59,130,246,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
              }}
              >
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: 'var(--signal-blue)', marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: '#64748b' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(24px)', transition: 'all 0.7s 0.3s ease' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569', letterSpacing: '0.1em', marginBottom: 32, textTransform: 'uppercase' }}>
              Experience
            </div>
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: 16, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(139,92,246,0.2), transparent)' }} />

              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 40, position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, width: 33, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 12px ${item.color}`, flexShrink: 0 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: item.color, letterSpacing: '0.1em', marginBottom: 4 }}>{item.year}</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>{item.org}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
