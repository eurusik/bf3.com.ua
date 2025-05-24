/**
 * Utility functions for formatting dates
 */
import { getTranslations } from 'next-intl/server';

/**
 * Format a date string to a localized format (DD.MM.YYYY)
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (defaults to 'uk-UA')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'uk-UA'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Format a date string to a full format with time
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (defaults to 'uk-UA')
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string, locale: string = 'uk-UA'): string {
  const date = new Date(dateString);
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format a date to a relative time (e.g., "2 days ago")
 * @param dateString - The date string to format
 * @param locale - The locale for the UI language (defaults to 'uk')
 * @returns Relative time string
 */
export async function formatRelativeTime(dateString: string, locale: string = 'uk'): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'dateTime' });
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  
  // Calculate time differences
  const timeUnits = [
    { value: Math.floor(diffTime / (1000 * 60 * 60 * 24)), unit: 'day' },
    { value: Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), unit: 'hour' },
    { value: Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)), unit: 'minute' },
    { value: Math.floor((diffTime % (1000 * 60)) / 1000), unit: 'second' }
  ];
  
  const [days, hours, minutes, seconds] = timeUnits.map(unit => unit.value);
  
  // Special cases
  if (days === 0 && hours === 0 && minutes === 0 && seconds < 5) {
    return t('justNow');
  }
  
  if (days === 1) {
    return t('yesterday');
  }
  
  // Format based on the most significant time unit
  if (days >= 7) {
    return formatDate(dateString, locale === 'uk' ? 'uk-UA' : 'en-US');
  }
  
  if (days > 0) {
    return formatTimeWithUnit(days, 'day', t);
  }
  
  if (hours > 0) {
    return formatTimeWithUnit(hours, 'hour', t);
  }
  
  if (minutes > 0) {
    return formatTimeWithUnit(minutes, 'minute', t);
  }
  
  return formatTimeWithUnit(seconds, 'second', t);
}

/**
 * Helper function to format time with the appropriate unit
 * @param value - The numeric value
 * @param unit - The time unit (day, hour, minute, second)
 * @param t - The translation function
 * @returns Formatted time string
 */
function formatTimeWithUnit(value: number, unit: string, t: (key: string) => string): string {
  const unitForms = {
    day: [t('day'), t('days'), t('manyDays')],
    hour: [t('hour'), t('hours'), t('manyHours')],
    minute: [t('minute'), t('minutes'), t('manyMinutes')],
    second: [t('second'), t('seconds'), t('manySeconds')]
  };
  
  const [form1, form2, form5] = unitForms[unit as keyof typeof unitForms];
  return `${value} ${getWordForm(value, form1, form2, form5)} ${t('ago')}`;
}

/**
 * Helper function to get the correct form of a word based on number in Ukrainian/Russian grammar
 * @param number - The number to determine the word form
 * @param form1 - Form for 1 (e.g., день)
 * @param form2 - Form for 2-4 (e.g., дні)
 * @param form5 - Form for 5+ (e.g., днів)
 * @returns Correct form of the word
 */
function getWordForm(number: number, form1: string, form2: string, form5: string): string {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return form1;
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return form2;
  } else {
    return form5;
  }
}
