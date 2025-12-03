import { z } from 'zod'

export const applicationSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phoneNumber: z.string()
    .regex(/^0[0-9]{10}$/, 'Phone number must be 11 digits starting with 0 (e.g., 01012345678)')
    .refine((val) => {
      // Validate Egyptian mobile networks
      const cleaned = val.replace(/\D/g, '')
      return /^(010|011|012|015|016|017)\d{8}$/.test(cleaned)
    }, {
      message: 'Phone number must be from a valid Egyptian mobile network (Vodafone: 010/011/012, Orange: 015, Etisalat: 016, WE: 017)',
    }),
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
  phoneNumber: z.string()
    .regex(/^0[0-9]{10}$/, 'Phone number must be 11 digits starting with 0 (e.g., 01012345678)')
    .refine((val) => {
      // Validate Egyptian mobile networks
      const cleaned = val.replace(/\D/g, '')
      return /^(010|011|012|015|016|017)\d{8}$/.test(cleaned)
    }, {
      message: 'Phone number must be from a valid Egyptian mobile network (Vodafone: 010/011/012, Orange: 015, Etisalat: 016, WE: 017)',
    }),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>


