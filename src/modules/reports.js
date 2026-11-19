import { listEmployees } from './employees.js';
import { formatEmployeeInfo } from '../utils/index.js';

export function generateReport() {
  const employees = listEmployees();
  if (employees.length === 0) {
    return 'No employees to report.';
  }

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = (totalSalary / employees.length).toFixed(2);

  const deptCount = {};
  employees.forEach((emp) => {
    deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
  });

  let report = '===== Employee Report =====\n';
  report += `Total Employees: ${employees.length}\n`;
  report += `Total Salary: $${totalSalary}\n`;
  report += `Average Salary: $${avgSalary}\n`;
  report += '\nEmployees by Department:\n';

  for (const dept in deptCount) {
    report += `  ${dept}: ${deptCount[dept]}\n`;
  }

  report += '\nEmployee List:\n';
  employees.forEach((emp) => {
    report += `  ${formatEmployeeInfo(emp)}\n`;
  });

  return report;
}
