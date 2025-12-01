import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtmaaomweaqoumbclpox.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bWFhb213ZWFxb3VtYmNscG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDEwNjksImV4cCI6MjA3OTk3NzA2OX0.KKOfzcF0PAVUaAZTTHKwdHRgqhZKiHRBmhY6plgdNTo'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names (matching Prisma schema)
export const TABLES = {
  users: 'users',
  applications: 'applications',
  coupons: 'coupons',
  appointments: 'appointments',
  messages: 'messages',
  settings: 'settings',
  revenue: 'revenue',
} as const

// Helper functions for common operations
export const db = {
  // User operations
  async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from(TABLES.users)
        .select('*')
        .eq('email', email)
        .single()
      
      // PGRST116 means no rows found, which is OK
      if (error && error.code !== 'PGRST116') {
        console.error('Error getting user by email:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Exception in getUserByEmail:', error)
      return null
    }
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from(TABLES.users)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createUser(userData: {
    id: string
    email: string
    emailVerified?: boolean
    phoneNumber?: string
    phoneVerified?: boolean
    gmailId?: string
    name?: string
    address?: string
    nationalIdFront?: string
    nationalIdBack?: string
  }) {
    const { data, error } = await supabase
      .from(TABLES.users)
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(id: string, updates: Partial<{
    emailVerified: boolean
    phoneNumber: string
    phoneVerified: boolean
    name: string
    address: string
    nationalIdFront: string
    nationalIdBack: string
  }>) {
    const { data, error } = await supabase
      .from(TABLES.users)
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Application operations
  async createApplication(applicationData: {
    id: string
    userId: string
    fullName: string
    address: string
    phoneNumber: string
    nationalIdFront: string
    nationalIdBack: string
    requirementsAgreed: boolean
    documentsAgreed: boolean
    aiVerified?: boolean
    paymentStatus?: string
    paymentAmount?: number
  }) {
    const { data, error } = await supabase
      .from(TABLES.applications)
      .insert(applicationData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getApplicationById(id: string) {
    const { data, error } = await supabase
      .from(TABLES.applications)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getApplicationsByUserId(userId: string) {
    const { data, error } = await supabase
      .from(TABLES.applications)
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getAllApplications() {
    try {
      const { data, error } = await supabase
        .from(TABLES.applications)
        .select('*')
        .order('createdAt', { ascending: false })
      
      if (error) {
        console.error('Error fetching applications:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Exception fetching applications:', error)
      return []
    }
  },

  async updateApplication(id: string, updates: Partial<{
    aiVerified: boolean
    aiVerificationNotes: string
    paymentStatus: string
    paymentTransactionId: string
    selectionStatus: string
    selectedAt: string
    selectedBy: string
    selectionEmailSent: boolean
    selectionEmailSentAt: string
  }>) {
    const { data, error } = await supabase
      .from(TABLES.applications)
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Settings operations
  async getSettings() {
    const { data, error } = await supabase
      .from(TABLES.settings)
      .select('*')
      .eq('id', 'default')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateSettings(updates: Partial<{
    bankAccountNumber: string
    bankName: string
    bankDetails: string
    advertisementStartDate: string
    selectionDeadline: string
    interviewLocation: string
    advertisementStatus: string
    closedAt: string
    closedBy: string
    reactivationQrCode: string
    qrCodeExpiresAt: string
    qrCodeUsed: boolean
    adminGmail: string
    canReactivate: boolean
  }>) {
    const { data, error } = await supabase
      .from(TABLES.settings)
      .upsert({
        id: 'default',
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Coupon operations
  async createCoupon(couponData: {
    id: string
    applicationId: string
    couponCode: string
    securityMark: string
    downloadable?: boolean
    printable?: boolean
  }) {
    const { data, error } = await supabase
      .from(TABLES.coupons)
      .insert(couponData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCouponByApplicationId(applicationId: string) {
    const { data, error } = await supabase
      .from(TABLES.coupons)
      .select('*')
      .eq('applicationId', applicationId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getCouponById(id: string) {
    const { data, error } = await supabase
      .from(TABLES.coupons)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Appointment operations
  async createAppointment(appointmentData: {
    id: string
    applicationId: string
    applicantName: string
    socialSecurityCardDetails?: string
    securityMark: string
    date: string
    time: string
    location: string
  }) {
    const { data, error } = await supabase
      .from(TABLES.appointments)
      .insert(appointmentData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAppointmentByApplicationId(applicationId: string) {
    const { data, error } = await supabase
      .from(TABLES.appointments)
      .select('*')
      .eq('applicationId', applicationId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Message operations
  async createMessage(messageData: {
    id: string
    userId?: string
    applicationId?: string
    type: string
    status?: string
    content?: string
    sentAt?: string
  }) {
    const { data, error } = await supabase
      .from(TABLES.messages)
      .insert(messageData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Revenue operations
  async createRevenue(revenueData: {
    id: string
    applicationId: string
    amount: number
    paymentDate?: string
    status?: string
  }) {
    const { data, error } = await supabase
      .from(TABLES.revenue)
      .insert(revenueData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAllRevenue() {
    try {
      const { data, error } = await supabase
        .from(TABLES.revenue)
        .select('*')
        .order('paymentDate', { ascending: false })
      
      if (error) {
        console.error('Error fetching revenue:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Exception fetching revenue:', error)
      return []
    }
  },

  // Message operations (additional)
  async getAllMessages(limit: number = 100) {
    const { data, error } = await supabase
      .from(TABLES.messages)
      .select('*')
      .order('sentAt', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },
}

