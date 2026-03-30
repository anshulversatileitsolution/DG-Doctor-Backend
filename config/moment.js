// moment.js

const moment = require('moment');

module.exports = {
  // Get current date
  now: () => moment(),

  // Format a date with given format string
  formatDate: (date, format = 'YYYY-MM-DD') => moment(date).format(format),

  // Parse a date string with given format
  parseDate: (dateStr, format = 'YYYY-MM-DD') => moment(dateStr, format),

  // Get start of day/week/month/year
  startOfDay: (date) => moment(date).startOf('day'),
  startOfWeek: (date) => moment(date).startOf('week'),
  startOfMonth: (date) => moment(date).startOf('month'),
  startOfYear: (date) => moment(date).startOf('year'),

  // Get end of day/week/month/year
  endOfDay: (date) => moment(date).endOf('day'),
  endOfWeek: (date) => moment(date).endOf('week'),
  endOfMonth: (date) => moment(date).endOf('month'),
  endOfYear: (date) => moment(date).endOf('year'),

  // Add/Subtract time
  addDays: (date, days) => moment(date).add(days, 'days'),
  addMonths: (date, months) => moment(date).add(months, 'months'),
  addYears: (date, years) => moment(date).add(years, 'years'),

  subtractDays: (date, days) => moment(date).subtract(days, 'days'),
  subtractMonths: (date, months) => moment(date).subtract(months, 'months'),
  subtractYears: (date, years) => moment(date).subtract(years, 'years'),

  // Compare dates
  isBefore: (date1, date2) => moment(date1).isBefore(moment(date2)),
  isAfter: (date1, date2) => moment(date1).isAfter(moment(date2)),
  isSame: (date1, date2, unit = 'day') => moment(date1).isSame(moment(date2), unit),

  // Difference between dates
  diffDays: (date1, date2) => moment(date1).diff(moment(date2), 'days'),
  diffMonths: (date1, date2) => moment(date1).diff(moment(date2), 'months'),
  diffYears: (date1, date2) => moment(date1).diff(moment(date2), 'years'),

  // Get day, month, year
  getDay: (date) => moment(date).date(), // day of month
  getMonth: (date) => moment(date).month() + 1, // month 1-12
  getYear: (date) => moment(date).year(),

  // Format as relative time
  fromNow: (date, withoutSuffix = false) => moment(date).fromNow(withoutSuffix),
  from: (date, refDate) => moment(date).from(moment(refDate)),

  // Validate date
  isValid: (date, format = null) => moment(date, format, true).isValid(),

  // Get Unix timestamp
  toUnix: (date) => moment(date).unix(),
  fromUnix: (timestamp) => moment.unix(timestamp),
};