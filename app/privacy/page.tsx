import CopyrightFooter from '@/components/CopyrightFooter'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-2xl mb-8">سياسة الخصوصية</p>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-gray-700">
                We collect personal information including name, address, phone number, email, and National ID images for the application process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700">
                Your information is used solely for processing your job application, communication regarding your application status, and interview scheduling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information. All data is encrypted and stored securely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Retention</h2>
              <p className="text-gray-700">
                We retain your application data for the duration of the selection process and as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-700">
                You have the right to access, correct, or delete your personal information. Contact us for assistance.
              </p>
            </section>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </div>
  )
}


