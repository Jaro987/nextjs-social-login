import { DBUserSettings, Revenue, UserSettings } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = ({ dateStr, withTime = false, locale = 'en-US', withWeekday = false }: {
  dateStr: string | undefined | null;
  withTime?: boolean;
  locale?: string;
  withWeekday?: boolean;
}
) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: withWeekday ? 'long' : undefined,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  if (withTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function mapDBUserSettingsToUserSettings(settings: DBUserSettings): UserSettings {

  return {
    id: settings.id,
    userId: settings.user_id,
    createProfile: settings.create_profile,
    editMyProfile: settings.edit_my_profile,
    createMyEvent: settings.create_my_event,
    cancelMyEvent: settings.cancel_my_event,
    revokeMyEvent: settings.revoke_my_event,
    sevenDayReminder: settings.seven_day_reminder,
    oneDayReminder: settings.one_day_reminder
  }
}