import {Protocol} from 'puppeteer';
import integer = Protocol.integer;

export interface UserGeneratedReport{
  id: integer;
  user_id_fk: integer;
  report_id_fk: integer;
  isActive: integer;
  input_param_values: Text;
  chart_type: Text;
}
