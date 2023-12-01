import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { IInfo } from "@/types/Info";

interface IGetCourseProgress {
  courseId: string;
  userId: string;
}

const QUERY_KEY = ["Course"];

export const getCourseProgress = async (
  params: IGetCourseProgress
): Promise<IInfo> => {
  const { data } = await apiClient.get(
    `/user/${params.userId}/course/${params.courseId}/info`
  );

  return data;
};

export const useGetCourseProgress = (params: IGetCourseProgress) => {
  return useQuery<IInfo, AxiosError>(
    [QUERY_KEY, params.userId, params.courseId],
    () => getCourseProgress(params),
    { enabled: !!params.courseId && !!params.userId }
  );
};
