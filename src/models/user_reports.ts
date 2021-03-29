export interface Parameter{
  name: string;
  type: string;
}

export interface user_report{
  id: number;
  user_id_fk: number;
  report_id_fk: number;
  isActive: boolean;
  input_params_values: Parameter[];
}
