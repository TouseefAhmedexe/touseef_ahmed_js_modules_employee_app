export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Human Resources',
  'Finance',
  'Sales',
  'Design',
];

export function getDepartmentNames() {
  return DEPARTMENTS;
}

export function departmentExists(department) {
  return DEPARTMENTS.includes(department);
}

export default DEPARTMENTS;
