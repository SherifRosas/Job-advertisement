'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PlatformHeader from '@/components/PlatformHeader'

interface Campaign {
  id: string
  name: string
  description?: string
  type: string
  platforms: string[]
  status: string
  scheduleType: string
  startDate?: string
  endDate?: string
  content?: string
  language: string
  createdAt: string
  executions?: CampaignExecution[]
}

interface CampaignExecution {
  id: string
  platform: string
  status: string
  scheduledAt: string
  executedAt?: string
  reach?: number
  engagement?: number
  clicks?: number
}

interface CampaignMetrics {
  totalReach: number
  totalEngagement: number
  totalClicks: number
  executionCount: number
  successRate: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      if (data.success) {
        setCampaigns(data.campaigns || [])
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCampaignDetails = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns?id=${campaignId}`)
      const data = await response.json()
      if (data.success) {
        setSelectedCampaign(data.campaign)
        setMetrics(data.metrics)
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error)
    }
  }

  const handleAction = async (campaignId: string, action: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await response.json()
      if (data.success) {
        alert(`Campaign ${action} completed successfully`)
        fetchCampaigns()
        if (selectedCampaign?.id === campaignId) {
          fetchCampaignDetails(campaignId)
        }
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error performing action:', error)
      alert('Failed to perform action')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading campaigns...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PlatformHeader />
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Marketing Campaigns</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Create Campaign
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No campaigns found</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create Your First Campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaigns List */}
            <div className="lg:col-span-2 space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                      {campaign.description && (
                        <p className="text-gray-600 text-sm mb-2">{campaign.description}</p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {campaign.type} • {campaign.scheduleType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Platforms:</p>
                    <div className="flex gap-2 flex-wrap">
                      {campaign.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {campaign.executions && campaign.executions.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Latest Executions: {campaign.executions.length}
                      </p>
                      <div className="space-y-1">
                        {campaign.executions.slice(0, 3).map((exec) => (
                          <div
                            key={exec.id}
                            className="flex items-center justify-between text-xs text-gray-500"
                          >
                            <span>{exec.platform} - {exec.status}</span>
                            {exec.reach && <span>Reach: {exec.reach}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => fetchCampaignDetails(campaign.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                    {campaign.status === 'active' && (
                      <button
                        onClick={() => handleAction(campaign.id, 'pause')}
                        className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                      >
                        Pause
                      </button>
                    )}
                    {campaign.status === 'paused' && (
                      <button
                        onClick={() => handleAction(campaign.id, 'resume')}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Resume
                      </button>
                    )}
                    {campaign.status !== 'cancelled' && (
                      <button
                        onClick={() => handleAction(campaign.id, 'cancel')}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Campaign Details Sidebar */}
            {selectedCampaign && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Campaign Details</h3>
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedCampaign.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>
                        {selectedCampaign.status}
                      </span>
                    </div>

                    {metrics && (
                      <div className="border-t pt-4">
                        <h4 className="font-bold mb-2">Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Reach:</span>
                            <span className="font-medium">{metrics.totalReach}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Engagement:</span>
                            <span className="font-medium">{metrics.totalEngagement}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Clicks:</span>
                            <span className="font-medium">{metrics.totalClicks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Executions:</span>
                            <span className="font-medium">{metrics.executionCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Success Rate:</span>
                            <span className="font-medium">{metrics.successRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCampaign.content && (
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">Content Preview</p>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedCampaign.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchCampaigns()
          }}
        />
      )}
    </div>
  )
}

function CreateCampaignModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'social_post' as 'social_post' | 'email_campaign' | 'multi_channel',
    platforms: [] as string[],
    scheduleType: 'once' as 'once' | 'recurring' | 'interval',
    startDate: '',
    endDate: '',
    recurrenceRule: '',
    content: '',
    language: 'ar' as 'ar' | 'en' | 'both',
    autoGenerate: true,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        onSuccess()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Failed to create campaign')
    } finally {
      setSubmitting(false)
    }
  }

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Create New Campaign</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Campaign Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-900"
            >
              <option value="social_post">Social Media Post</option>
              <option value="email_campaign">Email Campaign</option>
              <option value="multi_channel">Multi-Channel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Platforms *</label>
            <div className="flex gap-2 flex-wrap">
              {['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1 rounded ${
                    formData.platforms.includes(platform)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Schedule Type *</label>
            <select
              required
              value={formData.scheduleType}
              onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value as any })}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-900"
            >
              <option value="once">Once</option>
              <option value="recurring">Recurring</option>
              <option value="interval">Interval</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {formData.scheduleType === 'interval' && (
            <div>
              <label className="block text-sm font-medium mb-1">Interval (days)</label>
              <input
                type="number"
                min="1"
                value={formData.recurrenceRule}
                onChange={(e) => setFormData({ ...formData, recurrenceRule: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., 3 for every 3 days"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-900"
            >
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.autoGenerate}
                onChange={(e) => setFormData({ ...formData, autoGenerate: e.target.checked })}
              />
              <span className="text-sm">Auto-generate content using AI</span>
            </label>
          </div>

          {!formData.autoGenerate && (
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
                placeholder="Enter campaign content..."
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || formData.platforms.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}




