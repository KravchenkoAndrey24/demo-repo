import { UserOutDto } from '../domain/auth/auth.api.type';

export const GET_CURRENT_USER_QUERY = {
  name: 'get-currenr-user'
} as const;
export type GET_CURRENT_USER_QUERY = typeof GET_CURRENT_USER_QUERY & { schema: UserOutDto };
