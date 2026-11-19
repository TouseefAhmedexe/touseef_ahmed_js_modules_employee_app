import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  listEmployees,
  searchByName,
  searchByDepartment,
  getDepartmentNames,
  formatEmployeeList,
} from './src/index.js';

console.log('Available Departments:', getDepartmentNames());

console.log('\n--- Creating Employees ---');
createEmployee(
  'Ali Hassan',
  'ali.hassan@email.com',
  'Engineering',
  85000,
  '2023-03-15'
);
createEmployee(
  'Sara Khan',
  'sara.khan@email.com',
  'Marketing',
  72000,
  '2022-07-01'
);
createEmployee(
  'Bilal Ahmed',
  'bilal.ahmed@email.com',
  'Finance',
  68000,
  '2024-01-10'
);
createEmployee(
  'Ayesha Noor',
  'ayesha.noor@email.com',
  'Human Resources',
  60000,
  '2023-09-20'
);
createEmployee(
  'Usman Ali',
  'usman.ali@email.com',
  'Engineering',
  90000,
  '2021-11-05'
);

console.log('\n--- All Employees ---');
console.log(formatEmployeeList(listEmployees()));

console.log('\n--- Updating Employee ID 2 ---');
updateEmployee(2, { salary: 78000, department: 'Sales' });

console.log('\n--- Deleting Employee ID 3 ---');
deleteEmployee(3);

console.log('\n--- Employees After Update and Delete ---');
console.log(formatEmployeeList(listEmployees()));

console.log('\n--- Search by Name: "ali" ---');
const nameResults = searchByName('ali');
console.log(formatEmployeeList(nameResults));

console.log('\n--- Search by Department: "Engineering" ---');
const deptResults = searchByDepartment('Engineering');
console.log(formatEmployeeList(deptResults));

console.log('\n--- Loading Report Module Dynamically ---');
import('./src/modules/reports.js').then((module) => {
  const report = module.generateReport();
  console.log(report);
});
