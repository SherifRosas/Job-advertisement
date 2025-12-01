'use client'

import { useEffect } from 'react'
import { enableContentProtection } from '@/lib/content-protection'

export default function ContentProtection() {
  useEffect(() => {
    enableContentProtection()
  }, [])

  return null
}


