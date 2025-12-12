'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { enableContentProtection } from '@/lib/content-protection'

export default function ContentProtection() {
  const pathname = usePathname()

  useEffect(() => {
    // Only enable protection on the job advertisement page (home page)
    // Don't enable on admin pages or other pages
    if (pathname === '/' || pathname === '/apply') {
      const cleanup = enableContentProtection()
      return cleanup // Cleanup on unmount
    }
  }, [pathname])

  return null
}


