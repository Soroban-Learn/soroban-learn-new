import type { AxiosResponse, AxiosError } from 'axios';
import type {
  ErrorResponse,
  UserProfileUpdateParams,
  UserProfileResponse,
} from '@/types';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../apiClient';
import { queryClient } from '../queryClient';

const USER_PROFILE_UPDATE_QUERY_KEY = ['userProfileUpdate'];

export const updateUserProfile = async (
  profileData: UserProfileUpdateParams
): Promise<UserProfileResponse> => {
  const { data }: AxiosResponse<UserProfileResponse> = await apiClient.put(
    '/user/profile',
    profileData
  );
  return data;
};

export const useUserProfile = () => {
  const userProfileUpdateMutation = useMutation<
    UserProfileResponse,
    AxiosError<ErrorResponse>,
    UserProfileUpdateParams
  >(updateUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_PROFILE_UPDATE_QUERY_KEY);
    },
  });

  return { userProfileUpdateMutation };
};
