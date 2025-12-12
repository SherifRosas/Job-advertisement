'use client'

import { useLanguage } from './LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function PlatformHeader() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Platform Title */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              {isArabic ? (
                <>
                  <span className="block">منصة النفير العالمية للدعاية والإعلانات</span>
                  <span className="block text-sm font-normal opacity-90 mt-1">alnafeer Global Advertising Platform</span>
                </>
              ) : (
                <>
                  <span className="block">alnafeer Global Advertising Platform</span>
                  <span className="block text-sm font-normal opacity-90 mt-1" dir="rtl">منصة النفير العالمية للدعاية والإعلانات</span>
                </>
              )}
            </h1>
          </div>

          {/* Language Switcher */}
          <div className="ml-4">
            <LanguageSwitcher variant="header" />
          </div>
        </div>
      </div>
    </header>
  )
}



