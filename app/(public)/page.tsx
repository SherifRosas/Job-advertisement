import Image from 'next/image'
import Link from 'next/link'
import ContentProtection from '@/components/ContentProtection'
import CopyrightFooter from '@/components/CopyrightFooter'
import AIChatbot from '@/components/AIChatbot'
import SocialShare from '@/components/SocialShare'
import { getSettings } from '@/lib/supabase-server'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import HomeContent from '@/components/HomeContent'

export default async function HomePage() {
  // Check advertisement status
  // Default to open if query fails
  let isClosed = false
  try {
    const settings = await getSettings()
    isClosed = settings?.advertisementStatus === 'closed' || false
  } catch (error) {
    // If database query fails, default to open (allow applications)
    console.error('Error fetching settings:', error)
    isClosed = false
  }

  return (
    <>
      <ContentProtection />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 via-slate-900 to-black">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80 backdrop-blur-md border-b border-purple-500/30 shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Egyptian Ministry of Education
                </h1>
                <p className="text-sm text-yellow-300 font-medium">وزارة التربية والتعليم</p>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/login"
                  className="text-sm text-white hover:text-gray-100 px-3 py-1 rounded hover:bg-gray-800 transition-colors font-medium"
                >
                  Admin Login
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <HomeContent isClosed={isClosed} />
        </main>

        <CopyrightFooter />
        <AIChatbot />
      </div>
    </>
  )
}

