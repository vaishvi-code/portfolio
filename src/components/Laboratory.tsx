import { useEffect, useRef, useState } from 'react'

const EXPERIMENTS = [
  {
    id: 'exp-001',
    name: 'ML Scheduling for LLM Serving',
    status: 'RESEARCH',
    statusColor: 'var(--signal-green)',
    progress: 80,
    desc: 'Built an ML-based scheduling policy for KV-cache memory management in a full-stack LLM serving system, improving P95 latency by 18% over an FCFS baseline.',
    tags: ['LLM Serving', 'KV-Cache', 'Scheduling'],
    started: 'MAY 2026',
    icon: '◈',
    accent: '#3b82f6',
  },
  {
    id: 'exp-002',
    name: 'LLM Workload Characterization',
    status: 'RESEARCH',
    statusColor: 'var(--signal-green)',
    progress: 75,
    desc: 'Analyzed output-length distributions and prefix-reuse patterns across 5,000+ LongBench and HumanEval requests, finding that 40% of prompts share reusable prefixes.',
    tags: ['LongBench', 'HumanEval', 'Data Analysis'],
    started: 'MAY 2026',
    icon: '⬡',
    accent: '#8b5cf6',
  },
  {
    id: 'exp-003',
    name: 'RAG & Generative AI',
    status: 'INTEREST',
    statusColor: 'var(--signal-orange)',
    progress: 35,
    desc: 'Continuing to explore retrieval quality, grounded generation, prompt design, and practical evaluation methods for dependable generative AI applications.',
    tags: ['RAG', 'GenAI', 'Evaluation'],
    started: 'ONGOING',
    icon: '◎',
    accent: '#10b981',
  },
]

export default function Laboratory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])


  return (
    <section id="laboratory" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 600, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>// room_06.ai_laboratory</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1, marginBottom: 16 }}>
            Research in progress.<br />
            <span style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Questions I'm exploring.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480 }}>
            Graduate research and ongoing technical interests in efficient LLM serving and dependable generative AI. This work is presented as research experience, not as published papers.
          </p>
        </div>

        {/* Experiments grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s 0.2s ease' }}>
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelected(selected === exp.id ? null : exp.id)}
              style={{
                padding: '24px',
                background: selected === exp.id ? `rgba(${exp.accent.slice(1).match(/.{2}/g)!.map(h=>parseInt(h,16)).join(',')}, 0.08)` : 'rgba(255,255,255,0.025)',
                border: `1px solid ${selected === exp.id ? exp.accent + '44' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 16,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (selected !== exp.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== exp.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'none'
                }
              }}
            >
              {/* Top bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: exp.statusColor, letterSpacing: '0.08em' }}>{exp.status}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155' }}>{exp.id}</span>
              </div>

              {/* Icon + name */}
              <div style={{ fontSize: 28, marginBottom: 8 }}>{exp.icon}</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 600, color: '#e2e8f0', marginBottom: 12, lineHeight: 1.3 }}>{exp.name}</div>

              {/* Progress */}
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${exp.progress}%`, background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}66)`, borderRadius: 2 }} />
              </div>

              {/* Expanded content */}
              <div style={{ overflow: 'hidden', maxHeight: selected === exp.id ? 200 : 0, transition: 'max-height 0.4s ease', opacity: selected === exp.id ? 1 : 0 }}>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: '#64748b', marginBottom: 16 }}>{exp.desc}</p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: exp.accent, padding: '2px 8px', background: `${exp.accent}15`, border: `1px solid ${exp.accent}30`, borderRadius: 20 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom info */}
              <div style={{ marginTop: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
                <span>{exp.started}</span>
                <span>{exp.progress}% explored</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
