import { RegisterForCourseParams, RegisterForCourseResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { apiClient } from "../apiClient";

const registerForCourse = async (params: RegisterForCourseParams) => {
  const { data }: AxiosResponse<RegisterForCourseResponse> =
  await apiClient.put("/user/course", {
    course_id: params.courseId,
  });

  return data;
};

export const useRegisterForCourse = () => {
  return useMutation<RegisterForCourseResponse, AxiosError, RegisterForCourseParams>(
    registerForCourse,
    {
      onSuccess: () => {
        // Handle success state
      },
      // ... other mutation options if needed
    }
  );
};
