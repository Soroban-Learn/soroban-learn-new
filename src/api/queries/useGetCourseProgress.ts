import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

const QUERY_KEY = ["Course"];

export const getCourseProgress = async (id: string): Promise<AxiosResponse> => {
  const { data } = await apiClient.get(`/course/${id}/info`);
  return data;
}

export const useGetCourseProgress = (id: string) => {
  return useQuery<any, AxiosError>(QUERY_KEY, () => getCourseProgress(id));
}
