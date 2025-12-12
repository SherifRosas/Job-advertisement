import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import Link from 'next/link'
import SendMessagesButton from '@/components/SendMessagesButton'

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)
  
  const userRole = (session.user as any)?.role
  if (!session || (userRole !== 'admin' && userRole !== 'main-admin')) {
    redirect('/admin/login')
  }

  // Get all messages
  const messagesData = await db.getAllMessages(100)
  
  // Fetch related data for each message
  const messages = await Promise.all(
    messagesData.map(async (message) => {
      const user = message.userId ? await db.getUserById(message.userId) : null
      const application = message.applicationId ? await db.getApplicationById(message.applicationId) : null
      
      return {
        ...message,
        user: user || null,
        application: application || null,
      }
    })
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="flex space-x-4">
              <SendMessagesButton />
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {message.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {message.user?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        message.status === 'sent'
                          ? 'bg-green-100 text-green-800'
                          : message.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {message.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {message.sentAt ? new Date(message.sentAt).toLocaleString() : message.createdAt ? new Date(message.createdAt).toLocaleString() : 'Not sent'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {message.content?.substring(0, 100) || 'N/A'}...
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


