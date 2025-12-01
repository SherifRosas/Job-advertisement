'use client'

import { useLanguage } from './LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded hover:bg-gray-100 ${
          language === 'ar' ? 'font-bold text-blue-600' : 'text-gray-600'
        }`}
      >
        AR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded hover:bg-gray-100 ${
          language === 'en' ? 'font-bold text-blue-600' : 'text-gray-600'
        }`}
      >
        EN
      </button>
    </div>
  )
}


