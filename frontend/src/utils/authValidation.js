const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export function validateLogin(email, password) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(email.trim()))
    errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}
export function validateSignup(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!form.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!passwordPattern.test(form.password))
    errors.password =
      "Use 8+ characters with an uppercase letter, a lowercase letter, and a number.";
  if (!form.confirmPassword) errors.confirmPassword = "Confirm your password.";
  else if (form.confirmPassword !== form.password)
    errors.confirmPassword = "Passwords do not match.";
  if (!form.terms) errors.terms = "Accept the terms to continue.";
  return errors;
}
