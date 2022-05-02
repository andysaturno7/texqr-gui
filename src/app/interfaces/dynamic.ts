export interface Dynamic {
  table: string;
  field: string;
  fieldLabel: string;
  required?: boolean;
  type: string;
  selectOptions?: string | [];
}
