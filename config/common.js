// common.js

// Email validation (basic)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Strong Password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// URL validation (http, https, optional www)
const urlRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

// Phone number (International format, optional +, 10-15 digits)
const phoneRegex = /^\+?\d{10,15}$/;

// Username: letters, numbers, underscores, 3-16 characters
const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

// Date (YYYY-MM-DD)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Time (HH:MM, 24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Credit card (Visa, MasterCard, American Express, Diners Club, Discover)
const creditCardRegex = new RegExp(
  "^(?:4[0-9]{12}(?:[0-9]{3})?|" +
    "5[1-5][0-9]{14}|" +
    "3[47][0-9]{13}|" +
    "3(?:0[0-5]|[68][0-9])[0-9]{11}|" +
    "6(?:011|5[0-9]{2})[0-9]{12})$",
);

// IPv4 address
const ipv4Regex =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

// Hex color (#FFF or #FFFFFF)
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Password medium strength: min 6 chars, at least 1 letter, 1 number
const mediumPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Only letters (a-z, case-insensitive)
const lettersOnlyRegex = /^[A-Za-z]+$/;

// Only numbers
const numbersOnlyRegex = /^[0-9]+$/;

// Alphanumeric (letters + numbers)
const alphaNumericRegex = /^[A-Za-z0-9]+$/;

// Export all regexes
module.exports = {
  emailRegex,
  strongPasswordRegex,
  mediumPasswordRegex,
  urlRegex,
  phoneRegex,
  usernameRegex,
  dateRegex,
  timeRegex,
  creditCardRegex,
  ipv4Regex,
  hexColorRegex,
  lettersOnlyRegex,
  numbersOnlyRegex,
  alphaNumericRegex,
};
