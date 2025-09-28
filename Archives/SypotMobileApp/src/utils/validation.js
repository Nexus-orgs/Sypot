/**
 * Form Validation Utilities
 * Reusable validation functions for all forms in the app
 */

// Email validation
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

// Phone number validation
export const validatePhone = phone => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (phone && !phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};

// Password validation
export const validatePassword = password => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

// Username validation
export const validateUsername = username => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!username || username.trim() === '') {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

// Name validation
export const validateName = name => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return null;
};

// URL validation
export const validateURL = url => {
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (url && !urlRegex.test(url)) {
    return 'Please enter a valid URL';
  }
  return null;
};

// Date validation (format: MM/DD/YYYY)
export const validateDate = date => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!date || date.trim() === '') {
    return 'Date is required';
  }
  if (!dateRegex.test(date)) {
    return 'Please enter date in MM/DD/YYYY format';
  }

  // Check if date is valid
  const parts = date.split('/');
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getMonth() + 1 !== month ||
    testDate.getDate() !== day ||
    testDate.getFullYear() !== year
  ) {
    return 'Please enter a valid date';
  }

  return null;
};

// Time validation (format: HH:MM AM/PM)
export const validateTime = time => {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
  if (time && !timeRegex.test(time)) {
    return 'Please enter time in HH:MM AM/PM format';
  }
  return null;
};

// Price validation
export const validatePrice = price => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  if (price && !priceRegex.test(price)) {
    return 'Please enter a valid price';
  }
  if (price && parseFloat(price) < 0) {
    return 'Price cannot be negative';
  }
  return null;
};

// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

// Min length validation
export const validateMinLength = (
  value,
  minLength,
  fieldName = 'This field',
) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

// Max length validation
export const validateMaxLength = (
  value,
  maxLength,
  fieldName = 'This field',
) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return null;
};

// Number validation
export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  if (min !== null && num < min) {
    return `Number must be at least ${min}`;
  }
  if (max !== null && num > max) {
    return `Number must be at most ${max}`;
  }
  return null;
};

// Credit card validation
export const validateCreditCard = cardNumber => {
  const cardRegex = /^[0-9]{13,19}$/;
  const cleanCard = cardNumber.replace(/\s/g, '');

  if (!cleanCard || cleanCard === '') {
    return 'Card number is required';
  }
  if (!cardRegex.test(cleanCard)) {
    return 'Please enter a valid card number';
  }

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  for (let i = cleanCard.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanCard[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return 'Please enter a valid card number';
  }

  return null;
};

// CVV validation
export const validateCVV = cvv => {
  const cvvRegex = /^[0-9]{3,4}$/;
  if (!cvv || cvv === '') {
    return 'CVV is required';
  }
  if (!cvvRegex.test(cvv)) {
    return 'Please enter a valid CVV';
  }
  return null;
};

// Expiry date validation (MM/YY format)
export const validateExpiryDate = expiry => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiry || expiry === '') {
    return 'Expiry date is required';
  }
  if (!expiryRegex.test(expiry)) {
    return 'Please enter expiry in MM/YY format';
  }

  const parts = expiry.split('/');
  const month = parseInt(parts[0], 10);
  const year = parseInt('20' + parts[1], 10);
  const now = new Date();
  const expiryDate = new Date(year, month - 1);

  if (expiryDate < now) {
    return 'Card has expired';
  }

  return null;
};

// Composite form validation
export const validateForm = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const rules = validationRules[field];
    const value = formData[field];

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  }

  return errors;
};

// Check if form has errors
export const hasErrors = errors => {
  return Object.keys(errors).some(
    key => errors[key] !== null && errors[key] !== undefined,
  );
};

// Clear specific error
export const clearError = (errors, field) => {
  const newErrors = { ...errors };
  delete newErrors[field];
  return newErrors;
};

// Clear all errors
export const clearAllErrors = () => {
  return {};
};
