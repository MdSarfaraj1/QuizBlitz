export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email.trim());
};

export const validatePassword = (password) => {
  // At least 8 characters with at least one number
  return password.length >= 8 && /\d/.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const getPasswordStrength = (password) => {
  if (password.length < 8) return "weak";

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength < 3) return "weak";
  if (strength < 5) return "medium";
  return "strong";
};