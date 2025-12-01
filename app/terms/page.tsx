import CopyrightFooter from '@/components/CopyrightFooter'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-2xl mb-8">شروط الخدمة</p>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using this job advertisement system, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Application Process</h2>
              <p className="text-gray-700">
                Applicants must provide accurate and complete information. False or misleading information may result in application rejection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
              <p className="text-gray-700">
                The application fee of 1,000 EGP is non-refundable once payment is processed. Payment must be completed to finalize the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Selection Process</h2>
              <p className="text-gray-700">
                Selection will be made within one month of advertisement publication. The Ministry reserves the right to select or reject any applicant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Protection</h2>
              <p className="text-gray-700">
                All personal information is protected and used solely for the application process. See our Privacy Policy for details.
              </p>
            </section>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </div>
  )
}


