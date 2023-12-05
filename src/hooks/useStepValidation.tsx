import type { LessonContent } from "@/types";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Store
import { currentLessonState, ideCodeState } from "@/store";

export function useStepValidation(
  currentStep: number,
  setCurrentContentStep: (arg0: number) => void,
  consoleInput: string,
  setHasError?: (bool: boolean) => void,
  setCurrentError?: (err: string) => void
) {
  const [lessonContent] = useRecoilState<LessonContent>(currentLessonState);

  const ideCode = useRecoilValue(ideCodeState);

  // Initialize the validateStep function separately
  const validateStep = () => {
    // Your validation logic here
  };

  useEffect(() => {
    let accumulatedInput = "";

    if (
      lessonContent &&
      lessonContent.length > currentStep &&
      lessonContent[currentStep].steps &&
      lessonContent[currentStep].steps.length > 0
    ) {
      const instructions = lessonContent[currentStep].steps[0].instructions;

      for (let i = 0; i < currentStep; i++) {
        if (
          lessonContent[i] &&
          lessonContent[i].steps &&
          lessonContent[i].steps.length > 0 &&
          instructions[0].type === "code"
        ) {
          accumulatedInput += instructions[0].input;
        }
      }

      // Call the validateStep function immediately
      validateStep();
    }
  }, [
    currentStep,
    lessonContent,
    consoleInput,
    ideCode,
    setCurrentContentStep,
    setHasError,
    setCurrentError,
  ]);

  // Return the validateStep function separately
  return { validateStep };
}
