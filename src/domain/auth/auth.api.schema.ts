import { InferType, object, string } from 'yup';

export const SignInSchema = object({
  login: string().required('Required Field').min(6, 'Min 6 characters'),
  password: string().required('Required Field').min(6, 'Min 6 characters')
});
export type SignInSchema = InferType<typeof SignInSchema>;
