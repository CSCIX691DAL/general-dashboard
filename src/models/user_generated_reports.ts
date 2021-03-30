export interface Parameter{
  name: string;
  type: string;
}

export interface user_generated_reports {
  id: number;
  user_id_fk: number;
  report_id_fk: number;
  isActive: boolean;
  input_params_values: Parameter[];
}
