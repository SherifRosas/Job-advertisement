import crypto from 'crypto'
import QRCode from 'qrcode'

const QR_SECRET = process.env.QR_CODE_SECRET || 'default-qr-secret-change-in-production'

export interface QRCodeData {
  advertisementId: string
  timestamp: string
  hash: string
}

export async function generateQRCode(advertisementId: string): Promise<{ code: string; image: string }> {
  const timestamp = new Date().toISOString()
  const data = `${advertisementId}-${timestamp}-${QR_SECRET}`
  const hash = crypto.createHash('sha256').update(data).digest('hex')
  
  const qrData: QRCodeData = {
    advertisementId,
    timestamp,
    hash: hash.substring(0, 32),
  }
  
  const codeString = JSON.stringify(qrData)
  const key = crypto.scryptSync(QR_SECRET, 'salt', 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(codeString, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const encryptedCode = iv.toString('hex') + ':' + encrypted
  
  const image = await QRCode.toDataURL(encryptedCode)
  
  return {
    code: encryptedCode,
    image,
  }
}

export function verifyQRCode(code: string, advertisementId: string): boolean {
  try {
    const [ivHex, encrypted] = code.split(':')
    if (!ivHex || !encrypted) {
      return false
    }
    
    const key = crypto.scryptSync(QR_SECRET, 'salt', 32)
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    const qrData: QRCodeData = JSON.parse(decrypted)
    
    // Verify advertisement ID matches
    if (qrData.advertisementId !== advertisementId) {
      return false
    }
    
    // Verify timestamp is not too old (30 days)
    const timestamp = new Date(qrData.timestamp)
    const now = new Date()
    const daysDiff = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysDiff > 30) {
      return false
    }
    
    // Verify hash
    const data = `${qrData.advertisementId}-${qrData.timestamp}-${QR_SECRET}`
    const expectedHash = crypto.createHash('sha256').update(data).digest('hex').substring(0, 32)
    
    return qrData.hash === expectedHash
  } catch (error) {
    return false
  }
}

