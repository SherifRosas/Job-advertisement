import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import Link from 'next/link'
import ApplicationActions from '@/components/ApplicationActions'

interface PageProps {
  searchParams?: Promise<{
    status?: string
  }>
}

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    redirect('/admin/login')
  }

  // Get all applications and related data
  const applicationsData = await db.getAllApplications()
  
  // Fetch related data for each application
  const applicationsWithRelations = await Promise.all(
    applicationsData.map(async (app) => {
      const user = await db.getUserById(app.userId)
      const coupon = await db.getCouponByApplicationId(app.id)
      const appointment = await db.getAppointmentByApplicationId(app.id)
      
      return {
        ...app,
        user: user || null,
        coupon: coupon || null,
        appointment: appointment || null,
      }
    })
  )

  const resolvedSearchParams = await searchParams
  const filterStatus = (resolvedSearchParams?.status || 'all').toLowerCase()
  const applications = applicationsWithRelations.filter((app) => {
    if (filterStatus === 'all') return true
    const status = (app.selectionStatus || 'pending').toLowerCase()
    return status === filterStatus
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Applications</h1>
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
        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Filter by selection status</h2>
            <p className="text-sm text-gray-500">View pending, selected, or rejected applicants</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Selected', value: 'selected' },
              { label: 'Rejected', value: 'rejected' },
            ].map((item) => {
              const isActive = filterStatus === item.value
              return (
                <Link
                  key={item.value}
                  href={item.value === 'all' ? '/admin/applications' : `/admin/applications?status=${item.value}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{app.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.user?.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.aiVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.aiVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.selectionStatus === 'selected'
                          ? 'bg-blue-100 text-blue-800'
                          : app.selectionStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.selectionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.appointment ? (
                      <div>
                        <div>{new Date(app.appointment.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{app.appointment.time}</div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No interview</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ApplicationActions application={{
                      id: app.id,
                      fullName: app.fullName,
                      user: { email: app.user?.email || 'N/A' },
                      paymentStatus: app.paymentStatus || 'pending',
                      selectionStatus: app.selectionStatus || 'pending',
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}


