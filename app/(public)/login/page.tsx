import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mb-6">تسجيل الدخول</p>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-700 font-semibold mb-2">📝 Simplified Flow</p>
          <p className="text-blue-600 text-sm mb-4">
            Login is not required in the current simplified flow. You can go directly to the application form.
          </p>
          <button
            onClick={() => router.push('/apply')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Go to Application Form →
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          OAuth and Google login are disabled for this deployment.
        </p>
      </div>
    </div>
  )
}

