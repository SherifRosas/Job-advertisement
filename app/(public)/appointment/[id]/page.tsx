'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db, supabase, TABLES } from '@/lib/supabase'

export default function AppointmentPage() {
  const params = useParams()
  const appointmentId = params.id as string
  const [appointment, setAppointment] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Try to get appointment by ID first
        const { data: appointmentById, error: errorById } = await supabase
          .from(TABLES.appointments)
          .select('*')
          .eq('id', appointmentId)
          .single()
        
        // If not found by ID, try by applicationId
        let appointmentData = appointmentById
        if (errorById && errorById.code === 'PGRST116') {
          appointmentData = await db.getAppointmentByApplicationId(appointmentId)
        }

        if (!appointmentData) {
          setLoading(false)
          return
        }

        setAppointment(appointmentData)

        // Get application
        const applicationData = await db.getApplicationById(appointmentData.applicationId)
        if (applicationData) {
          setApplication(applicationData)
        }
      } catch (error) {
        console.error('Error fetching appointment data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [appointmentId])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!appointment) {
    return <div className="min-h-screen flex items-center justify-center">Appointment not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Interview Appointment</h1>
        <p className="text-center text-gray-600 mb-8">موعد المقابلة</p>

        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Applicant Name:</span>
                <span>{appointment.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Time:</span>
                <span>{appointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Location:</span>
                <span>{appointment.location}</span>
              </div>
              {appointment.socialSecurityCardDetails && (
                <div className="flex justify-between">
                  <span className="font-semibold">Social Security Card:</span>
                  <span>{appointment.socialSecurityCardDetails}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Security Mark:</span>
                <span className="font-mono">{appointment.securityMark}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please bring all official documents on the day of the interview.
              This appointment is valid only with the security mark shown above.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Print / طباعة
            </button>
            <button
              onClick={() => {
                // TODO: Generate PDF
                alert('PDF download feature coming soon')
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


