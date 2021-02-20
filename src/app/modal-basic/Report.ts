export interface Parameter{
  name: string;
  type: string;
}

export interface Report{
  name: string;
  sql: string;
  params: Parameter[];
  id: number;
}

export const Reports: Report[] = [
  {id: 1, name: 'Search by Hire date', sql: 'select * from employees where ' +
      'hire_date >= CAST("@" AS DATE) and' +
      ' hire_date <= CAST("@" AS DATE);',
    params: [{name: 'date1', type: 'Date'}, {name: 'date2', type: 'date'}]},
  {id: 2, name: 'Search by birthdate', sql: 'select * from employees where ' +
      'birth_date >= CAST("@" AS DATE) and ' +
      'birth_date <= CAST("@" AS DATE);',
    params: [{name: 'date1', type: 'Date'}, {name: 'date2', type: 'date'}]},
  {id: 3, name: 'Search by lastname', sql: 'select * from employees where last_name like \'%@%\';',
    params: [{name: 'name', type: 'text'}]},

];
