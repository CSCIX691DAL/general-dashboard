export interface Parameter{
  name: string;
  type: string;
}

export interface Report{
  name: string;
  display_name: string;
  sql: string;
  input_params: Parameter[];
  id: number;
  model_name: string;
  database_connection_fk: number;
}
