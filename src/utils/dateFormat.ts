import { format } from 'date-fns'
import { ka, enUS } from 'date-fns/locale'

/**
 * Get the date-fns locale object based on locale string
 */
function getDateLocale(locale: string) {
  return locale === 'ka' ? ka : enUS
}

/**
 * Safely parse a date string into a Date object
 * Returns null if the date is invalid
 */
function safeParseDate(date: string | null | undefined): Date | null {
  if (!date) return null
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return null
    return d
  } catch {
    return null
  }
}

/**
 * Format a date string with locale support
 * Default format: 'd MMM, yyyy' (e.g., "28 Jan, 2026" or "28 იან, 2026")
 */
export function formatDate(date: string | null | undefined, locale: string, formatStr: string = 'd MMM, yyyy'): string {
  const d = safeParseDate(date)
  if (!d) return ''
  try {
    return format(d, formatStr, { locale: getDateLocale(locale) })
  } catch {
    return ''
  }
}

/**
 * Format a full date with day name
 * Format: 'EEEE, d MMMM yyyy' (e.g., "Wednesday, 28 January 2026")
 */
export function formatFullDate(date: string | null | undefined, locale: string): string {
  return formatDate(date, locale, 'EEEE, d MMMM yyyy')
}

/**
 * Format a long date without day name
 * Format: 'd MMMM yyyy' (e.g., "28 January 2026")
 */
export function formatLongDate(date: string | null | undefined, locale: string): string {
  return formatDate(date, locale, 'd MMMM yyyy')
}

/**
 * Get day number from a date string (e.g., "28")
 */
export function getDay(date: string | null | undefined): string {
  const d = safeParseDate(date)
  if (!d) return ''
  return format(d, 'dd')
}

/**
 * Get abbreviated month name with locale support (e.g., "Jan" or "იან")
 */
export function getMonth(date: string | null | undefined, locale: string): string {
  const d = safeParseDate(date)
  if (!d) return ''
  try {
    return format(d, 'MMM', { locale: getDateLocale(locale) })
  } catch {
    return ''
  }
}

/**
 * Get time from a date string (24h format, e.g., "14:30")
 */
export function getTime(date: string | null | undefined): string {
  const d = safeParseDate(date)
  if (!d) return ''
  return format(d, 'HH:mm')
}

/**
 * Format date for display using toLocaleDateString with proper locale
 * Used for simple date display without date-fns formatting
 */
export function formatLocalDate(date: string | null | undefined, locale: string): string {
  const d = safeParseDate(date)
  if (!d) return ''
  const localeStr = locale === 'ka' ? 'ka-GE' : 'en-US'
  return d.toLocaleDateString(localeStr)
}
