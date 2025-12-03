import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface VerificationResult {
  verified: boolean
  notes: string[]
  confidence: number
}

/**
 * Verify Egyptian phone number compatibility with all mobile networks
 */
export function validateEgyptianPhoneNumber(phoneNumber: string): {
  valid: boolean
  network?: 'Vodafone' | 'Orange' | 'Etisalat' | 'WE' | 'Landline'
  message: string
} {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // Egyptian phone number patterns
  const patterns = {
    // Vodafone: 010, 011, 012
    Vodafone: /^(010|011|012)\d{8}$/,
    // Orange: 015
    Orange: /^015\d{8}$/,
    // Etisalat: 016
    Etisalat: /^016\d{8}$/,
    // WE (Telecom Egypt): 017
    WE: /^017\d{8}$/,
    // Landline (Cairo/Giza): 02xxxxxxxx
    Landline: /^02\d{8}$/,
  }

  // Check each network
  for (const [network, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) {
      return {
        valid: true,
        network: network as 'Vodafone' | 'Orange' | 'Etisalat' | 'WE' | 'Landline',
        message: `Valid ${network} number`,
      }
    }
  }

  // Check if it's a valid length (11 digits for mobile, 10 for landline)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return {
      valid: false,
      message: 'Phone number format is correct but network not recognized. Please use Vodafone (010/011/012), Orange (015), Etisalat (016), or WE (017)',
    }
  }

  return {
    valid: false,
    message: 'Invalid Egyptian phone number format. Must be 11 digits starting with 0 (e.g., 01012345678)',
  }
}

/**
 * Extract text from ID image using OpenAI Vision API
 */
async function extractTextFromID(imagePath: string, openai: OpenAI): Promise<string> {
  try {
    // Read image file (in production, this would be from storage)
    // For now, we'll use the OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all text from this Egyptian National ID card. Focus on the name field. Return the name exactly as it appears on the ID card in Arabic or English.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imagePath.startsWith('http') ? imagePath : `data:image/jpeg;base64,${imagePath}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    })

    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('OCR extraction error:', error)
    return ''
  }
}

/**
 * Compare names with fuzzy matching for Arabic/English variations
 */
function compareNames(formName: string, idName: string): {
  matches: boolean
  confidence: number
  notes: string[]
} {
  const notes: string[] = []
  let confidence = 0

  // Normalize names (remove extra spaces, convert to lowercase)
  const normalize = (name: string) => name.toLowerCase().trim().replace(/\s+/g, ' ')
  const normalizedForm = normalize(formName)
  const normalizedID = normalize(idName)

  // Exact match
  if (normalizedForm === normalizedID) {
    return { matches: true, confidence: 1.0, notes: ['Names match exactly'] }
  }

  // Check if names are similar (fuzzy match)
  const formWords = normalizedForm.split(' ')
  const idWords = normalizedID.split(' ')

  // Check if all words from form exist in ID (order doesn't matter)
  const matchingWords = formWords.filter((word) => idWords.some((idWord) => idWord.includes(word) || word.includes(idWord)))
  const matchRatio = matchingWords.length / Math.max(formWords.length, idWords.length)

  if (matchRatio >= 0.8) {
    confidence = 0.9
    notes.push('Names are very similar (high confidence match)')
  } else if (matchRatio >= 0.6) {
    confidence = 0.7
    notes.push('Names are somewhat similar (moderate confidence)')
  } else {
    confidence = 0.3
    notes.push('Names do not match well - manual review recommended')
  }

  return {
    matches: matchRatio >= 0.6,
    confidence,
    notes: [...notes, `Form name: "${formName}"`, `ID name: "${idName}"`],
  }
}

export async function verifyApplicationData(
  personalData: {
    fullName: string
    address: string
    phoneNumber: string
  },
  nationalIdFrontPath: string,
  nationalIdBackPath: string
): Promise<VerificationResult> {
  const notes: string[] = []
  let verified = true
  let confidence = 1.0

  try {
    // 1. Validate Egyptian phone number
    const phoneValidation = validateEgyptianPhoneNumber(personalData.phoneNumber)
    if (!phoneValidation.valid) {
      verified = false
      confidence *= 0.5
      notes.push(`❌ Phone validation failed: ${phoneValidation.message}`)
    } else {
      notes.push(`✅ Phone validated: ${phoneValidation.network} network`)
    }

    // 2. Extract name from ID card using AI
    if (!process.env.OPENAI_API_KEY) {
      notes.push('⚠️ OpenAI API not configured - skipping ID name verification')
      return {
        verified: phoneValidation.valid,
        notes,
        confidence: phoneValidation.valid ? 0.7 : 0.3,
      }
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Extract name from front of ID card
    const idName = await extractTextFromID(nationalIdFrontPath, openai)
    
    if (!idName) {
      notes.push('⚠️ Could not extract name from ID card - manual review required')
      confidence *= 0.6
    } else {
      // 3. Compare form name with ID name
      const nameComparison = compareNames(personalData.fullName, idName)
      
      if (!nameComparison.matches) {
        verified = false
        confidence *= nameComparison.confidence
        notes.push(`❌ Name mismatch detected`)
      } else {
        notes.push(`✅ Name verified: ${nameComparison.confidence >= 0.9 ? 'High' : 'Moderate'} confidence match`)
      }
      
      notes.push(...nameComparison.notes)
    }

    // 4. Additional validations
    if (personalData.fullName.length < 3) {
      verified = false
      notes.push('❌ Name is too short')
    }

    if (personalData.address.length < 5) {
      notes.push('⚠️ Address seems short - please verify')
      confidence *= 0.9
    }

    return {
      verified,
      notes,
      confidence: Math.max(0, Math.min(1, confidence)),
    }
  } catch (error) {
    console.error('AI verification error:', error)
    return {
      verified: false,
      notes: ['❌ AI verification failed. Manual review required.', error instanceof Error ? error.message : 'Unknown error'],
      confidence: 0,
    }
  }
}


