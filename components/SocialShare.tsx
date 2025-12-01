'use client'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export default function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Job Advertisement - Egyptian Ministry of Education',
  description = 'Financial Accounts Manager Position',
  className = ''
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Share: / مشاركة:</span>
      
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <span>📘</span>
        <span className="text-sm">Facebook</span>
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <span>🐦</span>
        <span className="text-sm">Twitter</span>
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <span>💼</span>
        <span className="text-sm">LinkedIn</span>
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <span>💬</span>
        <span className="text-sm">WhatsApp</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        aria-label="Copy link"
      >
        <span>🔗</span>
        <span className="text-sm">Copy Link</span>
      </button>
    </div>
  )
}

