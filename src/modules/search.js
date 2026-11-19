import { listEmployees } from './employees.js';

export function searchByName(name) {
  if (!name || name.trim().length === 0) {
    console.log('Error: Search name cannot be empty.');
    return [];
  }
  const keyword = name.trim().toLowerCase();
  const results = listEmployees().filter((emp) =>
    emp.name.toLowerCase().includes(keyword)
  );
  console.log(`Found ${results.length} employee(s) matching name "${name}".`);
  return results;
}

export function searchByDepartment(department) {
  if (!department || department.trim().length === 0) {
    console.log('Error: Department name cannot be empty.');
    return [];
  }
  const keyword = department.trim().toLowerCase();
  const results = listEmployees().filter((emp) =>
    emp.department.toLowerCase().includes(keyword)
  );
  console.log(
    `Found ${results.length} employee(s) in department "${department}".`
  );
  return results;
}
