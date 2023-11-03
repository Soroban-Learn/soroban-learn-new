import { ValidateExerciseParams } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { apiClient } from "../apiClient";
import { QUERY_KEY as GET_EXERCISE_QUERY_KEY } from "../queries";

import { currentErrorState } from "@/store";

const validateExercise = async (params: ValidateExerciseParams) => {
  const singleLineComments = /\/\/.*$/gm;
  const multiLineComments = /\/\*[\s\S]*?\*\//gm;

  let formattedInput = params.input;
  formattedInput = formattedInput.replace(singleLineComments, "");
  formattedInput = formattedInput.replace(multiLineComments, "");

  await apiClient.put("/user/exercise/" + params.exerciseId + "/validate", {
    exercise_id: params.exerciseId,
    input: formattedInput.replace(/\s+/g, " ").trim(),
    type: params.type,
  });
};

interface ErrorResponse {
  error: {
    message: string;
    // ... any other properties expected in the error response
    success?: boolean; // optional based on your error structure
  };
}

export const useValidateExercise = () => {
  const queryClient = useQueryClient();
  const [, setCurrentError] = useRecoilState(currentErrorState);

  return useMutation<void, AxiosError, ValidateExerciseParams>(
    validateExercise,
    {
      onSuccess: () => {
        setCurrentError("");
        queryClient.invalidateQueries([GET_EXERCISE_QUERY_KEY]);
      },

      onError: (error: AxiosError) => {
        const errorResponse = error.response?.data as ErrorResponse;
        if (errorResponse.error.message) {
          setCurrentError(errorResponse.error.message);
        }
      },
    }
  );
};
