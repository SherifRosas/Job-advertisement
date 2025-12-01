// Draft saving utility for application forms
// Saves to both localStorage and optionally to database

const DRAFT_KEY_PREFIX = 'application_draft_'
const DRAFT_EXPIRY_DAYS = 30

export interface ApplicationDraft {
  fullName: string
  address: string
  phoneNumber: string
  requirementsAgreed: boolean
  documentsAgreed: boolean
  savedAt: string
  expiresAt: string
}

export function saveDraftToLocalStorage(userId: string, draft: Partial<ApplicationDraft>) {
  try {
    const draftData: ApplicationDraft = {
      fullName: draft.fullName || '',
      address: draft.address || '',
      phoneNumber: draft.phoneNumber || '',
      requirementsAgreed: draft.requirementsAgreed || false,
      documentsAgreed: draft.documentsAgreed || false,
      savedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    }

    const key = `${DRAFT_KEY_PREFIX}${userId}`
    localStorage.setItem(key, JSON.stringify(draftData))
    return true
  } catch (error) {
    console.error('Error saving draft to localStorage:', error)
    return false
  }
}

export function loadDraftFromLocalStorage(userId: string): ApplicationDraft | null {
  try {
    const key = `${DRAFT_KEY_PREFIX}${userId}`
    const draftJson = localStorage.getItem(key)
    
    if (!draftJson) return null

    const draft: ApplicationDraft = JSON.parse(draftJson)
    
    // Check if draft has expired
    if (new Date(draft.expiresAt) < new Date()) {
      localStorage.removeItem(key)
      return null
    }

    return draft
  } catch (error) {
    console.error('Error loading draft from localStorage:', error)
    return null
  }
}

export function clearDraft(userId: string) {
  try {
    const key = `${DRAFT_KEY_PREFIX}${userId}`
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error clearing draft:', error)
    return false
  }
}

export function hasDraft(userId: string): boolean {
  const draft = loadDraftFromLocalStorage(userId)
  return draft !== null
}

