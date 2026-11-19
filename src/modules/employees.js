import {
  validateName,
  validateEmail,
  validateSalary,
  validateDepartment,
} from './validation.js';

const employees = [];
let nextId = 1;

export function createEmployee(name, email, department, salary, joiningDate) {
  const nameCheck = validateName(name);
  const emailCheck = validateEmail(email);
  const salaryCheck = validateSalary(salary);
  const deptCheck = validateDepartment(department);

  if (!nameCheck.valid) {
    console.log('Error:', nameCheck.message);
    return null;
  }
  if (!emailCheck.valid) {
    console.log('Error:', emailCheck.message);
    return null;
  }
  if (!salaryCheck.valid) {
    console.log('Error:', salaryCheck.message);
    return null;
  }
  if (!deptCheck.valid) {
    console.log('Error:', deptCheck.message);
    return null;
  }

  const employee = {
    id: nextId,
    name: name.trim(),
    email: email.trim(),
    department,
    salary,
    joiningDate: joiningDate || new Date().toISOString().split('T')[0],
  };

  employees.push(employee);
  nextId++;
  console.log(`Employee "${employee.name}" created with ID ${employee.id}.`);
  return employee;
}

export function updateEmployee(id, updates) {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    console.log(`Error: No employee found with ID ${id}.`);
    return null;
  }

  if (updates.name !== undefined) {
    const check = validateName(updates.name);
    if (!check.valid) {
      console.log('Error:', check.message);
      return null;
    }
    employees[index].name = updates.name.trim();
  }

  if (updates.email !== undefined) {
    const check = validateEmail(updates.email);
    if (!check.valid) {
      console.log('Error:', check.message);
      return null;
    }
    employees[index].email = updates.email.trim();
  }

  if (updates.salary !== undefined) {
    const check = validateSalary(updates.salary);
    if (!check.valid) {
      console.log('Error:', check.message);
      return null;
    }
    employees[index].salary = updates.salary;
  }

  if (updates.department !== undefined) {
    const check = validateDepartment(updates.department);
    if (!check.valid) {
      console.log('Error:', check.message);
      return null;
    }
    employees[index].department = updates.department;
  }

  console.log(`Employee ID ${id} updated.`);
  return employees[index];
}

export function deleteEmployee(id) {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    console.log(`Error: No employee found with ID ${id}.`);
    return false;
  }
  const removed = employees.splice(index, 1);
  console.log(`Employee "${removed[0].name}" deleted.`);
  return true;
}

export function listEmployees() {
  return [...employees];
}
