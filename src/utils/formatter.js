import { formatJoiningDate } from './dateUtils.js';

export function formatEmployeeInfo(employee) {
  return `ID: ${employee.id} | Name: ${employee.name} | Department: ${employee.department} | Salary: $${employee.salary} | Joined: ${formatJoiningDate(employee.joiningDate)}`;
}

export default function formatEmployeeList(employees) {
  if (employees.length === 0) {
    return 'No employees found.';
  }
  return employees.map((emp, index) => `${index + 1}. ${formatEmployeeInfo(emp)}`).join('\n');
}
