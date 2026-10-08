import { useEffect, useRef, useState } from 'react'

const PROJECTS_LIVE = [
  { name: 'NeuralFlow', status: 'RUNNING', progress: 87, color: 'var(--signal-green)', requests: '24.2K/s' },
  { name: 'VectorMind', status: 'INDEXING', progress: 62, color: 'var(--signal-blue)', requests: '8.7K/s' },
  { name: 'AgentOS', status: 'DEPLOYING', progress: 44, color: 'var(--signal-orange)', requests: '—' },
  { name: 'Prometheus', status: 'ACTIVE', progress: 100, color: 'var(--signal-purple)', requests: '1.1K/s' },
]

const DEPLOYMENTS = [
  { env: 'prod-us-east', status: 'healthy', version: 'v4.2.1', ts: '2m ago', color: 'var(--signal-green)' },
  { env: 'prod-eu-west', status: 'healthy', version: 'v4.2.1', ts: '4m ago', color: 'var(--signal-green)' },
  { env: 'staging', status: 'deploying', version: 'v4.3.0-rc1', ts: 'now', color: 'var(--signal-orange)' },
  { env: 'dev', status: 'healthy', version: 'v4.3.0-dev', ts: '12m ago', color: 'var(--signal-blue)' },
]

const COMMITS = [
  { hash: 'a3f7c91', msg: 'feat: streaming multi-agent response aggregation', ts: '18m', author: 'apark', branch: 'main' },
  { hash: 'b12e403', msg: 'fix: memory leak in vector cache eviction', ts: '1h', author: 'apark', branch: 'main' },
  { hash: 'c891a2f', msg: 'perf: 40% reduction in embedding latency', ts: '3h', author: 'apark', branch: 'feature/fast-embed' },
  { hash: 'd445f7e', msg: 'chore: update model registry to v3 schema', ts: '5h', author: 'apark', branch: 'main' },
  { hash: 'e23b109', msg: 'feat: add cross-encoder reranking pipeline', ts: '8h', author: 'apark', branch: 'main' },
]

const WORKFLOW_NODES = [
  { id: 'input', label: 'User Input', x: 8, y: 42, color: '#60a5fa' },
  { id: 'router', label: 'Intent Router', x: 28, y: 42, color: '#a78bfa' },
  { id: 'retrieval', label: 'Vector Retrieval', x: 50, y: 20, color: '#34d399' },
  { id: 'reasoning', label: 'Chain of Thought', x: 50, y: 65, color: '#fbbf24' },
  { id: 'synthesize', label: 'Synthesizer', x: 72, y: 42, color: '#a78bfa' },
  { id: 'output', label: 'Response', x: 90, y: 42, color: '#60a5fa' },
]

const WORKFLOW_EDGES = [
  ['input', 'router'],
  ['router', 'retrieval'],
  ['router', 'reasoning'],
  ['retrieval', 'synthesize'],
  ['reasoning', 'synthesize'],
  ['synthesize', 'output'],
]

function getNode(id: string) {
  return WORKFLOW_NODES.find((n) => n.id === id)!
}

function WorkflowGraph() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActive((a) => (a + 1) % WORKFLOW_EDGES.length), 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ width: '100%', height: 180, position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {WORKFLOW_EDGES.map(([a, b], i) => {
          const from = getNode(a)
          const to = getNode(b)
          const isActive = i === active
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={isActive ? from.color : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 0.8 : 0.4}
                style={{ transition: 'all 0.3s ease' }}
              />
              {isActive && (
                <circle r={1.2} fill={from.color}>
                  <animateMotion
                    dur="0.9s"
                    repeatCount="1"
                    path={`M${from.x},${from.y} L${to.x},${to.y}`}
                  />
                </circle>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {WORKFLOW_NODES.map((node) => {
          const isActiveNode = WORKFLOW_EDGES[active]?.includes(node.id)
          return (
            <g key={node.id}>
              <circle
                cx={node.x} cy={node.y} r={4.5}
                fill={`${node.color}22`}
                stroke={isActiveNode ? node.color : `${node.color}44`}
                strokeWidth={isActiveNode ? 1.2 : 0.6}
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle
                cx={node.x} cy={node.y} r={2}
                fill={node.color}
                opacity={isActiveNode ? 1 : 0.5}
              />
              <text
                x={node.x} y={node.y + 9}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={4.5}
                fontFamily="JetBrains Mono, monospace"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function CommandCenter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [termLines, setTermLines] = useState<string[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Terminal stream
  const TERM_MESSAGES = [
    '> agent.NeuralFlow: processing batch [workers=12]',
    '> vector.search: k=8, latency=21ms, score=0.934',
    '> llm.generate: tokens=847, latency=1.2s',
    '> cache.hit: embedding_pool 73% utilization',
    '> agent.AgentOS: spawning sub-agent [task=summarize]',
    '> deploy.staging: image pulled, container starting',
    '> monitor: p99_latency=34ms threshold=50ms ✓',
    '> rerank: cross-encoder score=[0.91, 0.87, 0.84]',
    '> memory.write: session_id=a3f2 docs=14 saved',
    '> workflow.complete: 3 agents · 847 tokens · 2.1s',
  ]

  useEffect(() => {
    if (!visible) return
    let i = 0
    const tick = () => {
      setTermLines((prev) => {
        const next = [...prev, TERM_MESSAGES[i % TERM_MESSAGES.length]]
        return next.slice(-8)
      })
      i++
    }
    tick()
    const interval = setInterval(tick, 1600)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section id="command" ref={sectionRef} style={{ padding: '120px 6vw', position: 'relative', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-blue)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>// room_03.command_center</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f8fafc', lineHeight: 1.1 }}>
            Engineering<br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Command Center
            </span>
          </h2>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 20 }}>
          {/* Left: Live projects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transition: 'all 0.7s 0.1s ease' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Live Projects</div>
            {PROJECTS_LIVE.map((p) => (
              <div key={p.name} style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{p.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: p.color, letterSpacing: '0.08em' }}>{p.status}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`, borderRadius: 2, transition: 'width 1s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{p.progress}%</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{p.requests}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: Workflow + Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, opacity: visible ? 1 : 0, transition: 'all 0.7s 0.2s ease' }}>
            {/* Workflow */}
            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Workflow · Live</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal-green)', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--signal-green)' }}>ACTIVE</span>
                </span>
              </div>
              <WorkflowGraph />
            </div>

            {/* Terminal */}
            <div style={{ flex: 1, padding: '20px 24px', background: '#020508', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 16, position: 'relative', overflow: 'hidden', minHeight: 220 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', marginLeft: 8 }}>ai-workspace ~</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {termLines.map((line, i) => (
                  <div key={i} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    color: i === termLines.length - 1 ? 'var(--signal-green)' : '#475569',
                    lineHeight: 1.5,
                    opacity: 1 - (termLines.length - 1 - i) * 0.12,
                  }}>
                    {line}
                  </div>
                ))}
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--signal-green)' }}>
                  <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Deployments + Commits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(20px)', transition: 'all 0.7s 0.3s ease' }}>
            {/* Deployments */}
            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Deployment Status</div>
              {DEPLOYMENTS.map((d) => (
                <div key={d.env} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#e2e8f0', marginBottom: 1 }}>{d.env}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>{d.version}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: d.color }}>{d.status}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155' }}>{d.ts}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Commits */}
            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Recent Commits</div>
              {COMMITS.map((c) => (
                <div key={c.hash} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--signal-blue)', flexShrink: 0, marginTop: 2 }}>{c.hash}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#cbd5e1', lineHeight: 1.5 }}>{c.msg}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#334155' }}>
                    {c.ts} ago · {c.author} · {c.branch}
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
