import Link from 'next/link'

export default function CopyrightFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Ministry of Education</h3>
            <p className="text-sm text-gray-400">
              © {currentYear} Egyptian Ministry of Education. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Official Government Entity
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-400 hover:text-white">
                  Check Application Status
                </Link>
              </li>
              <li>
                <a href="tel:+201205465036" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <span>📞</span>
                  <span>Call Support: 01205465036</span>
                </a>
              </li>
              <li>
                <a href="mailto:optimumoptimum959@gmail.com" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <span>✉️</span>
                  <span>Email Support</span>
                </a>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Security</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>🔒 SSL Encrypted</p>
              <p>✅ Official Domain</p>
              <p>🛡️ Secure Payment</p>
              <p>📧 Report Fraud: security@education.gov.eg</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>This is an official job advertisement from the Egyptian Ministry of Education.</p>
          <p className="mt-2">All applications are processed securely and confidentially.</p>
        </div>
      </div>
    </footer>
  )
}


