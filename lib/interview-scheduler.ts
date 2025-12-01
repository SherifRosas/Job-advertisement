import { supabase, TABLES } from './supabase'

// Interview scheduling configuration
const MAX_PER_HOUR = 10

// Working window: from 15/12/2025 to 31/12/2025 (inclusive)
// excluding Thursdays, Fridays, and Saturdays
const START_DATE = new Date(2025, 11, 15) // 15 December 2025
const END_DATE = new Date(2025, 11, 31) // 31 December 2025

// Allowed hours each day (10:00 AM to 2:00 PM)
const TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'] as const

type TimeSlot = (typeof TIME_SLOTS)[number]

const TIME_LABEL_TO_HOUR: Record<TimeSlot, number> = {
  '10:00 AM': 10,
  '11:00 AM': 11,
  '12:00 PM': 12,
  '1:00 PM': 13,
  '2:00 PM': 14,
}

function isExcludedDay(date: Date): boolean {
  const day = date.getDay() // 0 = Sunday, 6 = Saturday
  // Exclude Thursday (4), Friday (5), Saturday (6)
  return day === 4 || day === 5 || day === 6
}

export interface InterviewSlot {
  dateISO: string
  time: TimeSlot
}

/**
 * Find the next available interview slot according to the scheduling rules:
 * - Dates: 15/12/2025 to 31/12/2025
 * - Days: Excluding Thursdays, Fridays, and Saturdays
 * - Hours: 10:00 AM to 2:00 PM
 * - Capacity: 10 appointments per hour
 */
export async function findNextInterviewSlot(): Promise<InterviewSlot | null> {
  // Start from the configured start date
  const current = new Date(START_DATE.getTime())

  while (current <= END_DATE) {
    if (!isExcludedDay(current)) {
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


