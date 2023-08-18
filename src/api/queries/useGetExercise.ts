import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

const QUERY_KEY = ["Exercise"];

export const getExercise = async (id: string): Promise<AxiosResponse> => {
  const { data } = await apiClient.get(`/lesson/${id}/exercise`);
  return data;
}

export const useGetExercise = (id: string) => {
  return useQuery<any, AxiosError>(QUERY_KEY, () => getExercise(id));
}
