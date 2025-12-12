'use client'

import { useLanguage } from './LanguageContext'

interface LanguageSwitcherProps {
  variant?: 'default' | 'header'
}

export default function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  if (variant === 'header') {
    return (
      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded transition-all ${
            language === 'ar' 
              ? 'bg-white text-blue-600 font-bold shadow-md' 
              : 'text-white hover:bg-white/30'
          }`}
        >
          عربي
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded transition-all ${
            language === 'en' 
              ? 'bg-white text-blue-600 font-bold shadow-md' 
              : 'text-white hover:bg-white/30'
          }`}
        >
          English
        </button>
      </div>
    )
  }

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


