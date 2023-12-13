import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../apiClient';
import { AxiosError } from 'axios';
import { queryKeys } from '@/constants/queryKeys';

export const getProfile = async () => {
  const response = await apiClient.get('/auth/profile');

  return response?.data;
};

export const useGetProfile = () => {
  return useQuery<string, AxiosError>([queryKeys.getProfile], getProfile, {
    retry: false,
  });
};
