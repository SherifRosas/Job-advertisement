import { z } from 'zod'

export const applicationSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phoneNumber: z.string().regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  requirementsAgreed: z.boolean().refine(val => val === true, {
    message: 'You must agree to meet the job requirements',
  }),
  documentsAgreed: z.boolean().refine(val => val === true, {
    message: 'You must agree to submit official documents on interview day',
  }),
})

export const emailVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

export const phoneVerificationSchema = z.object({
  phoneNumber: z.string().regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>


