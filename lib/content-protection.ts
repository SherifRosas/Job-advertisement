'use client'

export function enableContentProtection() {
  if (typeof window === 'undefined') return

  // Only enable protection on job advertisement page (not admin pages)
  const isAdminPage = window.location.pathname.startsWith('/admin')
  if (isAdminPage) {
    return // Don't enable protection on admin pages
  }

  // Disable copy (Ctrl+C / Cmd+C)
  const handleCopy = (e: ClipboardEvent) => {
    e.preventDefault()
    alert('Copying content from this page is not allowed.')
    return false
  }

  // Disable paste (Ctrl+V / Cmd+V) - only on job ad page
  const handlePaste = (e: ClipboardEvent) => {
    // Allow paste in input fields and textareas (for forms)
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return // Allow paste in form fields
    }
    e.preventDefault()
    alert('Pasting content on this page is not allowed.')
    return false
  }

  // Disable keyboard shortcuts for copy/paste
  const handleKeyDown = (e: KeyboardEvent) => {
    // Disable Ctrl+C / Cmd+C (Copy)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault()
      alert('Copying content is not allowed on this page.')
      return false
    }

    // Disable Ctrl+V / Cmd+V (Paste) - but allow in form fields
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        alert('Pasting content is not allowed on this page.')
        return false
      }
    }

    // Disable Ctrl+A / Cmd+A (Select All) - but allow in form fields
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        return false
      }
    }
  }

  // Disable right-click context menu (prevents copy from context menu)
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    alert('Right-click is disabled on this page.')
    return false
  }

  // Disable text selection (prevents drag-to-select)
  // Use throttling to improve scroll performance
  let selectStartThrottle: number | null = null
  const handleSelectStart = (e: Event) => {
    // Throttle to prevent scroll lag
    if (selectStartThrottle) return
    
    selectStartThrottle = window.setTimeout(() => {
      selectStartThrottle = null
    }, 100)
    
    const target = e.target as HTMLElement
    // Allow selection in form fields
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return
    }
    e.preventDefault()
    return false
  }

  // Add event listeners with passive option where possible for better scroll performance
  document.addEventListener('copy', handleCopy)
  document.addEventListener('paste', handlePaste)
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('contextmenu', handleContextMenu)
  // Use passive: false only when we need preventDefault
  document.addEventListener('selectstart', handleSelectStart, { passive: false })

  // Add CSS to prevent text selection (except in form fields)
  const style = document.createElement('style')
  style.id = 'job-ad-content-protection'
  style.textContent = `
    /* Prevent text selection except in form fields */
    body:not(.admin-page) *:not(input):not(textarea):not(select) {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    
    /* Allow selection in form fields */
    input, textarea, select {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    
    /* Add watermark */
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

  // Cleanup function (returned for potential cleanup)
  return () => {
    document.removeEventListener('copy', handleCopy)
    document.removeEventListener('paste', handlePaste)
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('contextmenu', handleContextMenu)
    document.removeEventListener('selectstart', handleSelectStart)
    const styleElement = document.getElementById('job-ad-content-protection')
    if (styleElement) {
      styleElement.remove()
    }
  }
}


