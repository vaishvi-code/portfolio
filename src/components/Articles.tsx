import { useEffect, useRef, useState } from 'react'

const ARTICLES = [
  {
    id: 'art-001',
    title: 'Scaling Multi-Agent Systems Beyond Context Window Limits',
    category: 'Research',
    categoryColor: 'var(--signal-blue)',
    date: 'Dec 2024',
    readTime: '18 min',
    abstract: 'Most multi-agent frameworks hit a wall at ~128K tokens per agent. This paper explores hierarchical memory compression, dynamic context eviction, and cross-agent state sharing to sustain coherent reasoning across sessions exceeding 10M effective tokens.',
    tags: ['Multi-Agent', 'Memory', 'LLM Architecture'],
    reads: '12.4K',
    featured: true,
  },
  {
    id: 'art-002',
    title: 'Vector Search Architectures for Production RAG Systems',
    category: 'Engineering',
    categoryColor: 'var(--signal-green)',
    date: 'Oct 2024',
    readTime: '14 min',
    abstract: 'A practical guide to building vector search that actually holds up in production: HNSW tuning, quantization tradeoffs, hybrid BM25+vector retrieval, reranking strategies, and monitoring query quality drift over time.',
    tags: ['RAG', 'Vector Search', 'Production'],
    reads: '8.7K',
    featured: false,
  },
  {
    id: 'art-003',
    title: 'Real-Time LLM Inference Optimization: A Practitioner\'s Guide',
    category: 'Performance',
    categoryColor: 'var(--signal-orange)',
    date: 'Sep 2024',
    readTime: '22 min',
    abstract: 'Latency is the enemy of LLM UX. This guide covers speculative decoding, continuous batching, KV-cache quantization, model sharding strategies, and practical profiling approaches for sub-100ms time-to-first-token.',
    tags: ['Inference', 'Latency', 'GPU'],
    reads: '21.2K',
    featured: true,
  },
  {
    id: 'art-004',
    title: 'Building Reliable AI Agents: Failure Modes and Recovery Strategies',
    category: 'Architecture',
    categoryColor: 'var(--signal-purple)',
    date: 'Aug 2024',
    readTime: '16 min',
    abstract: 'Autonomous agents fail in unexpected ways. This post catalogs 24 distinct failure modes observed across 18 months of production agent systems, with concrete architectural patterns to detect, recover from, and prevent each one.',
    tags: ['Agents', 'Reliability', 'Architecture'],
    reads: '15.9K',
    featured: false,
  },
]

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="articles" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative', background: 'rgba(0,0,0,0.15)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-purple)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>// room_07.research_notebooks</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1, marginBottom: 16 }}>
            Engineering<br />
            <span style={{ background: 'linear-gradient(135deg, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Notebooks
            </span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480 }}>
            Technical deep-dives from the trenches of production AI engineering. Not tutorials. Hard-won knowledge.
          </p>
        </div>

        {/* Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s 0.2s ease' }}>
          {ARTICLES.map((article, i) => (
            <div
              key={article.id}
              style={{
                padding: '32px 40px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                display: 'grid',
                gridTemplateColumns: article.featured ? '1fr auto' : '1fr auto',
                gap: 24,
                alignItems: 'start',
                transition: 'all 0.3s ease',
                animationDelay: `${i * 0.1}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.transform = 'translateX(8px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              {/* Left border accent */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, ${article.categoryColor}, transparent)`, borderRadius: '20px 0 0 20px' }} />

              <div style={{ paddingLeft: 12 }}>
                {/* Meta */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: article.categoryColor, padding: '2px 8px', background: `${article.categoryColor.includes('var') ? 'rgba(59,130,246,0.1)' : article.categoryColor + '15'}`, border: `1px solid ${article.categoryColor.includes('var') ? 'rgba(59,130,246,0.2)' : article.categoryColor + '30'}`, borderRadius: 20, letterSpacing: '0.08em' }}>
                    {article.category}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{article.date}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{article.readTime} read</span>
                  {article.featured && (
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#f59e0b', letterSpacing: '0.08em' }}>FEATURED</span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {article.title}
                </h3>

                {/* Abstract */}
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', marginBottom: 16 }}>{article.abstract}</p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: reads + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, paddingTop: 4 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#e2e8f0' }}>{article.reads}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>reads</div>
                </div>
                <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#94a3b8', fontSize: 12, fontWeight: 500, transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  Read →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
