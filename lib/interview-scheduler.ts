import { supabase, TABLES } from './supabase'

// Interview scheduling configuration
const MAX_PER_HOUR = 10

// Working window: from 01/12/2025 to 31/12/2025 (inclusive)
// Wednesdays only
const START_DATE = new Date(2025, 11, 1) // 1 December 2025
const END_DATE = new Date(2025, 11, 31) // 31 December 2025

// Allowed hours each day (11:00 AM to 2:00 PM)
const TIME_SLOTS = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'] as const

type TimeSlot = (typeof TIME_SLOTS)[number]

const TIME_LABEL_TO_HOUR: Record<TimeSlot, number> = {
  '11:00 AM': 11,
  '12:00 PM': 12,
  '1:00 PM': 13,
  '2:00 PM': 14,
}

// Only allow Wednesdays
function isAllowedDay(date: Date): boolean {
  const day = date.getDay() // 0 = Sunday, 3 = Wednesday, 6 = Saturday
  return day === 3
}

export interface InterviewSlot {
  dateISO: string
  time: TimeSlot
}

/**
 * Find the next available interview slot according to the scheduling rules:
 * - Dates: 01/12/2025 to 31/12/2025
 * - Days: Wednesdays only
 * - Hours: 11:00 AM to 2:00 PM
 * - Capacity: 10 appointments per hour
 */
export async function findNextInterviewSlot(): Promise<InterviewSlot | null> {
  // Start from the configured start date
  const current = new Date(START_DATE.getTime())

  while (current <= END_DATE) {
    if (isAllowedDay(current)) {
      // For this day, check each time slot
      const dayStart = new Date(current.getTime())
      dayStart.setHours(0, 0, 0, 0)

      const dayEnd = new Date(current.getTime())
      dayEnd.setHours(23, 59, 59, 999)

      for (const time of TIME_SLOTS) {
        // Count existing appointments for this day + time slot
        const { count, error } = await supabase
          .from(TABLES.appointments)
          .select('id', { count: 'exact', head: true })
          .gte('date', dayStart.toISOString())
          .lte('date', dayEnd.toISOString())
          .eq('time', time)

        if (error) {
          console.error('Error counting appointments for slot:', { error, date: current, time })
          continue
        }

        const existingCount = count ?? 0
        if (existingCount < MAX_PER_HOUR) {
          // Build full datetime for this slot
          const slotDate = new Date(current.getTime())
          const hour = TIME_LABEL_TO_HOUR[time]
          slotDate.setHours(hour, 0, 0, 0)

          return {
            dateISO: slotDate.toISOString(),
            time,
          }
        }
      }
    }

    // Move to next day
    current.setDate(current.getDate() + 1)
  }

  // No available slots
  return null
}

