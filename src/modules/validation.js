import { DEPARTMENTS } from './departments.js';

export function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  return { valid: true, message: '' };
}

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return { valid: false, message: 'Email address is not valid.' };
  }
  return { valid: true, message: '' };
}

export function validateSalary(salary) {
  if (typeof salary !== 'number' || salary <= 0) {
    return { valid: false, message: 'Salary must be a positive number.' };
  }
  return { valid: true, message: '' };
}

export function validateDepartment(department) {
  if (!DEPARTMENTS.includes(department)) {
    return { valid: false, message: `Department must be one of: ${DEPARTMENTS.join(', ')}.` };
  }
  return { valid: true, message: '' };
}
