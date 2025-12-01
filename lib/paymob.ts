// Paymob payment gateway integration

export interface PaymobConfig {
  apiKey: string
  integrationId: string
  hmacSecret: string
}

export interface PaymentRequest {
  applicationId: string
  amount: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

export async function initiatePaymobPayment(request: PaymentRequest): Promise<{ paymentUrl: string; orderId: string }> {
  const apiKey = process.env.PAYMOB_API_KEY
  const integrationId = process.env.PAYMOB_INTEGRATION_ID

  if (!apiKey || !integrationId) {
    throw new Error('Paymob credentials not configured')
  }

  try {
    // Step 1: Get auth token
    const authResponse = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
      }),
    })

    const authData = await authResponse.json()
    const token = authData.token

    if (!token) {
      throw new Error('Failed to get auth token')
    }

    // Step 2: Create order
    const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: 'false',
        amount_cents: request.amount * 100, // Convert to cents
        currency: request.currency,
        merchant_order_id: request.applicationId,
      }),
    })

    const orderData = await orderResponse.json()
    const orderId = orderData.id

    // Step 3: Get payment key
    const paymentKeyResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: request.amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: 'NA',
          email: request.customerEmail,
          floor: 'NA',
          first_name: request.customerName.split(' ')[0] || request.customerName,
          street: 'NA',
          building: 'NA',
          phone_number: request.customerPhone,
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'EG',
          last_name: request.customerName.split(' ').slice(1).join(' ') || 'NA',
          state: 'NA',
        },
        currency: request.currency,
        integration_id: integrationId,
      }),
    })

    const paymentKeyData = await paymentKeyResponse.json()
    const paymentKey = paymentKeyData.token

    // Step 4: Generate payment URL
    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`

    return {
      paymentUrl,
      orderId: orderId.toString(),
    }
  } catch (error: any) {
    console.error('Paymob payment error:', error)
    throw new Error(`Payment initiation failed: ${error.message}`)
  }
}

export function verifyPaymobHMAC(data: any, receivedHmac: string): boolean {
  const hmacSecret = process.env.PAYMOB_HMAC_SECRET || ''
  const crypto = require('crypto')
  const calculatedHmac = crypto.createHmac('sha512', hmacSecret).update(JSON.stringify(data)).digest('hex')
  return calculatedHmac === receivedHmac
}


