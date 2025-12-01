'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (lang: 'ar' | 'en') => {
    const newPath = pathname.replace(/^\/(ar|en)/, `/${lang}`) || `/${lang}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage('ar')}
        className="px-3 py-1 rounded hover:bg-gray-100"
      >
        AR
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className="px-3 py-1 rounded hover:bg-gray-100"
      >
        EN
      </button>
    </div>
  )
}


