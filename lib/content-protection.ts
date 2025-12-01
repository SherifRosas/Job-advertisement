'use client'

export function enableContentProtection() {
  if (typeof window === 'undefined') return

  // Disable right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    alert('Content is protected. Copying is not allowed.')
    return false
  })

  // Disable text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault()
    return false
  })

  // Disable keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Disable Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+S, Ctrl+P, Print Screen
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 's' || e.key === 'p')
    ) {
      e.preventDefault()
      alert('This action is not allowed.')
      return false
    }

    // Disable Print Screen
    if (e.key === 'PrintScreen') {
      e.preventDefault()
      alert('Screenshots are not allowed.')
      return false
    }

    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
      e.preventDefault()
      return false
    }
  })

  // Disable drag
  document.addEventListener('dragstart', (e) => {
    e.preventDefault()
    return false
  })

  // Add watermark
  const style = document.createElement('style')
  style.textContent = `
    body::before {
      content: 'Ministry of Education - Official';
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 3rem;
      color: rgba(0, 0, 0, 0.05);
      pointer-events: none;
      z-index: 9999;
      user-select: none;
    }
  `
  document.head.appendChild(style)

  // Disable copy on copy event
  document.addEventListener('copy', (e) => {
    e.preventDefault()
    alert('Copying content is not allowed.')
    return false
  })
}


