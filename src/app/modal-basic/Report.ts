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
  sql: string;
  params: Parameter[];
  charts: Chart[];
  id: number;
}

export const Reports: Report[] = [
  {id: 1, name: 'Search by Hire date', sql: 'select * from employees where ' +
      'hire_date >= CAST("@" AS DATE) and' +
      ' hire_date <= CAST("@" AS DATE);',
    params: [{name: 'date1', type: 'Date'}, {name: 'date2', type: 'Date'}],
  charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
    {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},
  {id: 2, name: 'Search by birthdate', sql: 'select * from employees where ' +
      'birth_date >= CAST("@" AS DATE) and ' +
      'birth_date <= CAST("@" AS DATE);',
    params: [{name: 'date1', type: 'Date'}, {name: 'date2', type: 'Date'}],
    charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
      {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},
  {id: 3, name: 'Search by lastname', sql: 'select * from employees where last_name like \'%@%\';',
    params: [{name: 'name', type: 'text'}],
    charts: [{name: 'x-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']},
      {name: 'y-axis', options: ['EmployeeID', 'BirthDate', 'FirstName', 'LastName', 'Gender', 'HireDate']}]},

];
