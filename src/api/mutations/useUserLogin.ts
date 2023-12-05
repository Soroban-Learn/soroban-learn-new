import type { AxiosResponse, AxiosError } from 'axios';
import type {
  ErrorResponse,
  UserLoginRequestParams,
  UserLoginResponse,
} from '@/types';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../apiClient';
import { queryClient } from '../queryClient';
import { useAuth } from '@/hooks';


const USER_LOGIN_QUERY_KEY = ['userLogin'];

export const userLogin = async (
  loginData: UserLoginRequestParams
): Promise<UserLoginResponse> => {
  const { data }: AxiosResponse<UserLoginResponse> = await apiClient.post(
    '/auth/login',
    loginData
  );
  return data;
};

export const useUserLogin = () => {
  const { setupSession } = useAuth();

  return useMutation<
    UserLoginResponse,
    AxiosError<ErrorResponse>,
    UserLoginRequestParams
  >(userLogin, {
    onSuccess: (data: UserLoginResponse) => {
      if (data.auth) {
        const { access_token, ...user } = data.info;
        setupSession(access_token, user);
      }
      queryClient.invalidateQueries(USER_LOGIN_QUERY_KEY);
    },
  });
};
