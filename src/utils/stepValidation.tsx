import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import toast from "react-simple-toasts";
import {
  currentLessonState,
  ideCodeState,
  LineNumbersState,
  BlockedRangesState,
} from "@/utils/recoilState";

export function useStepValidation(
  currentStep: number,
  setCurrentContentStep: (arg0: any) => void,
  consoleInput: any,
  setHasError: boolean,
  setCurrentError: string
) {
  interface LessonContent {
    steps: any[];
  }
  const [lessonContent] = useRecoilState<LessonContent>(currentLessonState);
  const [ideCode, setIdeCode] = useRecoilState(ideCodeState);
  const [lineNumbers, setLineNumbers] = useRecoilState(LineNumbersState);
  const [blockedRanges, setBlockedRanges] = useRecoilState(BlockedRangesState);

  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      toast(error + "! Please try again.", {
        position: "top-right",
        duration: 3000,
        className: "error-toast",
      });
      setError("");
    }
  }, [error]);

  if (
    lessonContent &&
    lessonContent.steps &&
    lessonContent.steps[currentStep] &&
    lessonContent.steps[currentStep].instructions
  ) {
    const instructions = lessonContent.steps[currentStep].instructions;

    let accumulatedInput = "";
    for (let i = 0; i < currentStep; i++) {
      if (
        lessonContent.steps[i] &&
        lessonContent.steps[i].instructions &&
        lessonContent.steps[i].instructions[0].type === "code"
      ) {
        accumulatedInput += lessonContent.steps[i].instructions[0].input;
      }
    }

    const validateStep = () => {
      instructions.forEach((instruction: { type: string; input: string }) => {
        if (instruction.type === "terminal") {
          if (instruction.input === consoleInput) {
            setCurrentContentStep(currentStep + 1);
          } else {
            setHasError(true);
            setCurrentError("Invalid Command");
          }
        } else if (instruction.type === "code") {
          const ideCodeSingleLine = ideCode.replace(/\s+/g, "");

          if (ideCodeSingleLine === accumulatedInput + instruction.input) {
            setCurrentContentStep(currentStep + 1);
          } else {
            setError("Invalid Code");
          }
        }
      });
    };

    return { validateStep };
  }

  return {};
}
