import type { AxiosResponse, AxiosError } from "axios";
import type {
  ErrorResponse,
  UserRegistratioResponse,
  UserRegistrationRequestParams,
} from "@/types";
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from "recoil";

import { apiClient } from '../apiClient';
import { queryClient } from "../queryClient";
import { tokenState, userState } from "@/store/sessionStates";

const USER_REGISTRATION_QUERY_KEY = ['userRegistration'];

export const userRegistration = async (
  registrationData: UserRegistrationRequestParams,
): Promise<UserRegistratioResponse> => {
  const { data }: AxiosResponse<UserRegistratioResponse> =
    await apiClient.post("/auth/signup", registrationData);
  return data;
}

export const useUserRegistration = () => {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  return useMutation<
    UserRegistratioResponse,
    AxiosError<ErrorResponse>,
    UserRegistrationRequestParams
  >(userRegistration, {
    onSuccess: (data: UserRegistratioResponse) => {
      if (data.success) {
        const { info: { access_token, ...user } } = data;
        setToken(access_token);
        setUser(user);
      }
      queryClient.invalidateQueries(USER_REGISTRATION_QUERY_KEY);
    },
  });
}
