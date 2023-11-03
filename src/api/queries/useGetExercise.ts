import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const QUERY_KEY = "useGetExercise";

export const getExercise = async (id: string): Promise<AxiosResponse> => {
  const { data } = await apiClient.get(`/user/lesson/${id}/exercise`);
  return data;
};

export const useGetExercise = (id: string) => {
  return useQuery<any, AxiosError>([QUERY_KEY, id], () => getExercise(id), {
    enabled: !!id,
  });
};
