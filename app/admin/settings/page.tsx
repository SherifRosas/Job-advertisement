import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import Link from 'next/link'
import CloseAdvertisementButton from '@/components/CloseAdvertisementButton'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  const userRole = (session.user as any)?.role
  if (!session || (userRole !== 'admin' && userRole !== 'main-admin')) {
    redirect('/admin/login')
  }

  const settings = await db.getSettings()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Link
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Advertisement Status</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Status: <span className="font-bold">{settings?.advertisementStatus || 'active'}</span>
              </p>
              {settings?.closedAt && (
                <p className="text-sm text-gray-500">
                  Closed on: {new Date(settings.closedAt).toLocaleString()}
                </p>
              )}
            </div>
            {settings?.advertisementStatus === 'active' ? (
              <CloseAdvertisementButton />
            ) : (
              <Link
                href="/admin/reactivate"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Reactivate Advertisement
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Bank Account Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <p className="text-gray-900">{settings?.bankName || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <p className="text-gray-900">{settings?.bankAccountNumber || 'Not set'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


