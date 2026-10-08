import { useEffect, useState } from 'react'

interface ToastData {
  title: string
  description?: string
  actionLabel?: string
  actionUrl?: string
}

export default function Toast() {
  const [toast, setToast] = useState<ToastData | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>
      setToast(customEvent.detail)
      setVisible(true)

      clearTimeout(timer)
      timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => setToast(null), 300)
      }, 5000)
    }

    window.addEventListener('portfolio-toast', onToast)
    return () => {
      window.removeEventListener('portfolio-toast', onToast)
      clearTimeout(timer)
    }
  }, [])

  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99999,
        maxWidth: 380,
        width: 'calc(100vw - 48px)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 16,
          padding: '16px 18px',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6), 0 0 24px rgba(59, 130, 246, 0.2)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
        }}
      >
        {/* Animated Check Icon */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: 'var(--signal-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)',
          }}
        >
          ✓
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#f8fafc',
              marginBottom: 2,
            }}
          >
            {toast.title}
          </div>
          {toast.description && (
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: '#94a3b8',
                marginBottom: toast.actionUrl ? 8 : 0,
                wordBreak: 'break-word',
              }}
            >
              {toast.description}
            </div>
          )}

          {toast.actionUrl && (
            <a
              href={toast.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#60a5fa',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: 2,
              }}
            >
              {toast.actionLabel || 'View File ↗'}
            </a>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: 4,
            fontSize: 14,
            lineHeight: 1,
            borderRadius: 6,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
