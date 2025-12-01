import crypto from 'crypto'

const SECRET = process.env.SECURITY_MARK_SECRET || 'default-secret-change-in-production'

export function generateSecurityMark(applicationId: string, timestamp: Date): string {
  const data = `${applicationId}-${timestamp.toISOString()}-${SECRET}`
  const hash = crypto.createHash('sha256').update(data).digest('hex')
  return hash.substring(0, 16).toUpperCase()
}

export function verifySecurityMark(
  mark: string,
  applicationId: string,
  timestamp: Date
): boolean {
  const expectedMark = generateSecurityMark(applicationId, timestamp)
  return mark === expectedMark
}


