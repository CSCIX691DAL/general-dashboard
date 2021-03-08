export interface Parameter{
  name: string;
  type: string;
}

export interface Chart{
  name: string;
  options: string[];
}

export interface Report{
  name: string;
  displayName: string;
  sql: string;
  params: Parameter[];
  charts: Chart[];
  id: number;
}

export const Reports: Report[] = [
  {id: 1, name: 'Search by Hire date', displayName: 'HireDate', sql: 'select * from employees where ' +
      'hire_date >= CAST("@" AS DATE) and' +
      ' hire_date <= CAST("@" AS DATE);',
    params: [{name: 'startDate', type: 'Date'}, {name: 'endDate', type: 'Date'}],
  charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
    {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},
  {id: 2, name: 'Search by birthdate', displayName: 'BirthDate', sql: 'select * from employees where ' +
      'birth_date >= CAST("@" AS DATE) and ' +
      'birth_date <= CAST("@" AS DATE);',
    params: [{name: 'startDate', type: 'Date'}, {name: 'endDate', type: 'Date'}],
    charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
      {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},
  {id: 3, name: 'Search by lastname', displayName: 'LastName', sql: 'select * from employees where last_name like \'%@%\';',
    params: [{name: 'lastName', type: 'text'}],
    charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
      {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},

];
