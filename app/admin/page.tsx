import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Debug logging
  console.log('Admin Dashboard - Session check:', {
    hasSession: !!session,
    hasUser: !!session?.user,
    userEmail: session?.user?.email,
    userRole: (session?.user as any)?.role,
    userId: (session?.user as any)?.id,
  })
  
  if (!session) {
    console.log('No session found, redirecting to login')
    redirect('/admin/login')
  }
  
  const userRole = (session.user as any)?.role
  // Allow both 'admin' and 'main-admin' roles
  if (userRole !== 'admin' && userRole !== 'main-admin') {
    console.log('User role is not admin:', userRole, 'Redirecting to login')
    redirect('/admin/login')
  }

  // Get all applications for stats (with error handling)
  let allApplications = []
  try {
    allApplications = await db.getAllApplications() || []
  } catch (error) {
    console.error('Error fetching applications:', error)
    allApplications = []
  }

  const totalApplications = allApplications.length
  const paidApplications = allApplications.filter(app => app.paymentStatus === 'paid').length
  const pendingPayments = allApplications.filter(app => app.paymentStatus === 'pending').length
  const selectedCount = allApplications.filter(app => app.selectionStatus === 'selected').length

  // Get revenue total (with error handling)
  let revenueTotal = 0
  try {
    const allRevenue = await db.getAllRevenue() || []
    revenueTotal = allRevenue.reduce((sum, rev) => sum + (rev.amount || 0), 0)
  } catch (error) {
    console.error('Error fetching revenue:', error)
    revenueTotal = 0
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Link
              href="/admin/applications"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              View Applications
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Applications</h3>
            <p className="text-3xl font-bold">{totalApplications}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Paid Applications</h3>
            <p className="text-3xl font-bold text-green-600">{paidApplications}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingPayments}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Selected</h3>
            <p className="text-3xl font-bold text-blue-600">{selectedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            {revenueTotal.toLocaleString()} EGP
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/applications"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-2">Manage Applications</h3>
            <p className="text-gray-600">View and manage all applications</p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-2">Settings</h3>
            <p className="text-gray-600">Configure advertisement and system settings</p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-2">Messages</h3>
            <p className="text-gray-600">View and manage automated messages</p>
          </Link>

          <Link
            href="/admin/campaigns"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-2">Marketing Campaigns</h3>
            <p className="text-gray-600">Create and manage automated marketing campaigns</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

