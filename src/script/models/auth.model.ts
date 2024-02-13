import { FieldValues } from 'react-hook-form';

export interface AuthFormValues extends FieldValues {
  login: string;
  password: string;
}
