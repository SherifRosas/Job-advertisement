// Shared verification code storage
// In production, use Redis or a database

const VERIFICATION_CODES: Record<string, { code: string; expires: number }> = {}

export function storeVerificationCode(key: string, code: string, expiresInMinutes: number = 10) {
  VERIFICATION_CODES[key] = {
    code,
    expires: Date.now() + expiresInMinutes * 60 * 1000,
  }
}

export function getVerificationCode(key: string): { code: string; expires: number } | null {
  return VERIFICATION_CODES[key] || null
}

export function verifyCode(key: string, code: string): boolean {
  const stored = VERIFICATION_CODES[key]
  if (!stored) {
    return false
  }
  
  if (stored.code !== code) {
    return false
  }
  
  if (Date.now() > stored.expires) {
    delete VERIFICATION_CODES[key]
    return false
  }
  
  return true
}

export function deleteVerificationCode(key: string) {
  delete VERIFICATION_CODES[key]
}

