import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInSchema } from '../../../domain/auth/auth.api.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS, setLocalStorageValue } from '../../../utils/localStorage.utils';
import { generateRandomId } from '../../../utils/utils';
import { useGoogleLogin } from '@react-oauth/google';
import { fetchUserGoogleInfo } from '../../../domain/auth/auth.api';
import { useMsal } from '@azure/msal-react';

export const SignInPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { instance } = useMsal();

  const { formState, handleSubmit, register } = useForm<SignInSchema>({
    resolver: yupResolver(SignInSchema)
  });

  const saveUserData = async (login: string) => {
    setLocalStorageValue(LOCAL_STORAGE_KEYS.CURRENT_USER, { login, id: generateRandomId() });
    await queryClient.invalidateQueries();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = await fetchUserGoogleInfo(tokenResponse.access_token);
      await saveUserData(user?.email || '');
      return null;
    }
  });

  const { mutate: azureSingIn } = useMutation({
    mutationFn: async () => {
      try {
        const res = await instance.loginPopup();
        await saveUserData(res.account?.username || '');
        return null;
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }
  });

  const { mutate: singIn } = useMutation<null, Error, SignInSchema>({
    mutationFn: async (data) => {
      await saveUserData(data?.login || '');
      return null;
    }
  });

  const onSubmit: SubmitHandler<SignInSchema> = (formData) => {
    singIn(formData);
  };

  return (
    <div className="flex justify-center py-24 text-xxl">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-8 flex flex-1 flex-col gap-4 sm:max-w-[400px]">
        <TextField
          {...register('login')}
          label="Login"
          helperText={formState?.errors?.login?.message || ''}
          error={!!formState?.errors?.login}
        />
        <TextField
          {...register('password')}
          type="password"
          label="Password"
          helperText={formState?.errors?.password?.message || ''}
          error={!!formState?.errors?.password}
        />
        <Button size="large" type="submit" variant="contained">
          Sign In
        </Button>
        <Button onClick={() => googleLogin()} size="large" variant="contained">
          Sign In With Google
        </Button>
        <Button onClick={() => azureSingIn()} size="large" variant="contained">
          Sign In With Azure
        </Button>
        <div className="text-center text-xxs text-gray-600">
          If you do not have an account, we will automatically create one during login.
        </div>
      </form>
    </div>
  );
};
