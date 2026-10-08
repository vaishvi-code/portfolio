export function triggerResumeDownload() {
  const link = document.createElement('a')
  link.href = '/Vaishvi_Patel_Resume.pdf'
  link.download = 'Vaishvi_Patel_Resume.pdf'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.dispatchEvent(
    new CustomEvent('portfolio-toast', {
      detail: {
        title: 'Résumé Download Started',
        description: 'Vaishvi_Patel_Resume.pdf was sent to your downloads.',
        actionLabel: 'Preview PDF ↗',
        actionUrl: '/Vaishvi_Patel_Resume.pdf',
      },
    })
  )
}
