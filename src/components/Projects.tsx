import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id: 'data-pipeline',
    name: 'Real-Time Data Pipeline',
    tagline: 'Local-first analytics lakehouse',
    desc: 'Built an end-to-end Hacker News pipeline from Kafka ingestion to a Parquet medallion lakehouse, dbt and DuckDB transformation, and a Streamlit analytics layer orchestrated by Airflow.',
    status: 'Complete',
    statusColor: 'var(--signal-green)',
    stack: ['Python', 'Kafka', 'Airflow', 'dbt', 'DuckDB', 'Docker'],
    metrics: [
      { label: 'NLP Throughput', value: '500+/hr' },
      { label: 'dbt Trigger', value: '15 min' },
      { label: 'Delivery', value: 'CI/CD' },
    ],
    accent: '#3b82f6',
    icon: '⬡',
    year: 'DATA',
    link: 'https://github.com/vaishvi-code/realtime-streaming-ai',
    linkLabel: 'View Repository',
  },
  {
    id: 'emotion-detection',
    name: 'Emotion Detection',
    tagline: 'Multi-label NLP classification',
    desc: 'Implemented a BERT and Focal Loss classifier on GoEmotions, choosing Focal Loss to address severe class imbalance across 28 emotion labels and outperforming a TF-IDF baseline.',
    status: 'Complete',
    statusColor: 'var(--signal-green)',
    stack: ['Python', 'BERT', 'Hugging Face', 'NLP', 'Scikit-learn'],
    metrics: [
      { label: 'Samples', value: '58K' },
      { label: 'Micro-F1', value: '0.52' },
      { label: 'Hamming Loss', value: '0.043' },
    ],
    accent: '#8b5cf6',
    icon: '◈',
    year: 'AI/ML',
    link: 'https://drive.google.com/file/d/1LonhRjXaJbYfhOV52nySOkXdyhFAiLW1/view',
    linkLabel: 'View Project',
  },
  {
    id: 'foodpool',
    name: 'FoodPool',
    tagline: 'Collaborative food ordering platform',
    desc: 'Architected a React, Flask, and PostgreSQL application with group polling, real-time collaboration, recurring orders, a stateless REST API, and documented contracts for 3+ collaborators.',
    status: 'Complete',
    statusColor: 'var(--signal-green)',
    stack: ['React', 'Flask', 'PostgreSQL', 'JWT', 'REST API', 'Pytest'],
    metrics: [
      { label: 'Automated Tests', value: '200+' },
      { label: 'Users', value: '50+' },
      { label: 'Cost Reduction', value: '20–35%' },
    ],
    accent: '#f59e0b',
    icon: '⟁',
    year: 'FULL STACK',
    link: 'https://github.com/srushti3333/SE-Project_g15',
    linkLabel: 'View Repository',
  },
  {
    id: 'mood-muze',
    name: 'Mood Muze',
    tagline: 'Privacy-first emotion playlist recommender',
    desc: 'Built a browser-based recommender that maps facial emotion from a live webcam feed to playlists. Inference runs locally, so no video leaves the device.',
    status: 'Complete',
    statusColor: 'var(--signal-green)',
    stack: ['DeepFace', 'OpenCV', 'NLP', 'Flask', 'REST API', 'JavaScript'],
    metrics: [
      { label: 'Emotions', value: '7' },
      { label: 'Satisfaction', value: '90%' },
      { label: 'Relevance Gain', value: '30%' },
    ],
    accent: '#06b6d4',
    icon: '◉',
    year: 'COMPUTER VISION',
    link: 'https://vaishvi-code.github.io/Mood_Muze/',
    linkLabel: 'Open Live Project',
  },
  {
    id: 'robotics-club',
    name: 'Robotics Club',
    tagline: 'Live robotics community website',
    desc: 'A deployed web experience for a robotics community, presenting its identity and providing a central place for members and visitors to engage with the club.',
    status: 'Live',
    statusColor: 'var(--signal-green)',
    stack: ['Web Development', 'Responsive UI', 'Deployment'],
    metrics: [
      { label: 'Availability', value: 'Live' },
      { label: 'Project Type', value: 'Web' },
      { label: 'Audience', value: 'Club' },
    ],
    accent: '#10b981',
    icon: '◆',
    year: 'WEB',
    link: 'https://robotics26.vercel.app/',
    linkLabel: 'Visit Website',
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        padding: '32px',
        background: hovered ? `rgba(${project.accent.replace('#','').match(/.{2}/g)!.map(h=>parseInt(h,16)).join(',')}, 0.06)` : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? project.accent + '44' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.4), 0 0 40px ${project.accent}15` : 'none',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient gradient on hover */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 200, height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}20 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, color: project.accent, marginBottom: 8 }}>{project.icon}</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 4 }}>{project.name}</h3>
          <div style={{ fontSize: 13, color: '#64748b' }}>{project.tagline}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: project.statusColor, letterSpacing: '0.1em', padding: '3px 8px', background: `${project.statusColor}15`, border: `1px solid ${project.statusColor}30`, borderRadius: 20 }}>{project.status}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155' }}>{project.year}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', marginBottom: 24 }}>{project.desc}</p>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {project.metrics.map((m) => (
          <div key={m.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 700, color: project.accent, marginBottom: 2 }}>{m.value}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#475569', letterSpacing: '0.06em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.stack.map((tech) => (
          <span key={tech} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#64748b',
            padding: '3px 10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 20,
            transition: 'all 0.2s ease',
          }}>
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginTop: 24,
          color: project.accent,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textDecoration: 'none',
        }}
      >
        {project.linkLabel} ↗
      </a>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '0', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-blue)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>// room_04.projects</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1, marginBottom: 16 }}>
            Selected<br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Project Work</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480 }}>
            End-to-end systems spanning real-time data engineering, natural language processing, computer vision, and collaborative product development.
          </p>
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition: 'all 0.7s 0.2s ease',
        }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
