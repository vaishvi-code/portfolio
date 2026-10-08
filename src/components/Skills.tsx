import { useEffect, useRef, useState } from 'react'

const SKILL_CATEGORIES = [
  {
    category: 'AI Engineering',
    color: '#3b82f6',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 88 },
      { name: 'BERT / NLP', level: 90 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'Model Evaluation', level: 86 },
    ],
  },
  {
    category: 'Data Science',
    color: '#10b981',
    skills: [
      { name: 'Kafka / Airflow', level: 86 },
      { name: 'dbt / DuckDB / Parquet', level: 86 },
      { name: 'Pandas / NumPy', level: 92 },
      { name: 'PostgreSQL / MongoDB', level: 84 },
    ],
  },
  {
    category: 'Development',
    color: '#8b5cf6',
    skills: [
      { name: 'Python / Java / C', level: 91 },
      { name: 'Flask / FastAPI / REST', level: 88 },
      { name: 'React / Node.js', level: 82 },
      { name: 'Docker / Git / CI/CD', level: 86 },
    ],
  },
  {
    category: 'Applied AI',
    color: '#f59e0b',
    skills: [
      { name: 'RAG / Prompt Engineering', level: 86 },
      { name: 'LLM APIs / Serving', level: 84 },
      { name: 'KV-Cache Optimization', level: 82 },
      { name: 'AWS S3 / EC2 / Rekognition', level: 82 },
    ],
  },
]

const CAPABILITY_MATRIX = [
  { label: 'AI/ML Engineering', value: 90, color: '#3b82f6' },
  { label: 'Data Engineering', value: 86, color: '#8b5cf6' },
  { label: 'LLM Systems', value: 85, color: '#10b981' },
  { label: 'Python Development', value: 92, color: '#06b6d4' },
  { label: 'Full-Stack Engineering', value: 84, color: '#f59e0b' },
  { label: 'Cloud & DevOps', value: 82, color: '#f472b6' },
]

function SkillBar({ name, level, color, animate }: { name: string; level: number; color: string; animate: boolean }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{name}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color }}>
          {animate ? level : 0}%
        </span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: animate ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: 2,
          transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 8px ${color}50`,
        }} />
      </div>
    </div>
  )
}

function CapabilityRow({ label, value, color, animate, delay }: { label: string; value: number; color: string; animate: boolean; delay: number }) {
  const blocks = Math.round(value / 10)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, opacity: animate ? 1 : 0, transition: `opacity 0.5s ${delay}s ease` }}>
      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 500, color: '#94a3b8', width: 180, flexShrink: 0 }}>{label}</span>
      <div style={{ display: 'flex', gap: 3, flex: 1 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 14, borderRadius: 3,
            background: i < blocks ? color : 'rgba(255,255,255,0.06)',
            opacity: i < blocks ? 1 - (i * 0.015) : 1,
            transition: `background 0.1s ${delay + i * 0.06}s ease`,
            boxShadow: i < blocks ? `0 0 6px ${color}50` : 'none',
          }} />
        ))}
      </div>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color, width: 36, textAlign: 'right' }}>{value}%</span>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative', background: 'rgba(0,0,0,0.15)' }}>
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 72, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-green)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>// room_05.capability_matrix</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1, marginBottom: 16 }}>
            Skills I use.<br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Areas I'm growing.
            </span>
          </h2>
        </div>

        {/* Capability matrix */}
        <div style={{ padding: '40px 48px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, marginBottom: 48, opacity: visible ? 1 : 0, transition: 'opacity 0.7s 0.1s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>Technical Focus Matrix</div>
          {CAPABILITY_MATRIX.map((c, i) => (
            <CapabilityRow key={c.label} {...c} animate={visible} delay={0.1 + i * 0.08} />
          ))}
        </div>

        {/* Skill categories grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s 0.4s ease' }}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} style={{ padding: '28px 32px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, boxShadow: `0 0 10px ${cat.color}60` }} />
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 600, color: '#e2e8f0' }}>{cat.category}</span>
              </div>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} color={cat.color} animate={visible} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
