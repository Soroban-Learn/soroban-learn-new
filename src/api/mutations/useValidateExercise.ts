import { ValidateExerciseParams } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "../apiClient";
import { QUERY_KEY as GET_EXERCISE_QUERY_KEY } from "../queries";

const validateExercise = async (params: ValidateExerciseParams) => {
  await apiClient.put("/user/exercise/" + params.exerciseId + "/validate", {
    exercise_id: params.exerciseId,
    input: params.input,
    type: params.type,
  });
};

export const useValidateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ValidateExerciseParams>(
    validateExercise,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_EXERCISE_QUERY_KEY]);
      },
    }
  );
};
