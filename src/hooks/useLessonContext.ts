import {
  consoleCodeState,
  currentErrorState,
  currentStepState,
  hasErrorState,
  ideCodeState,
  stepTypeState,
} from "@/store";
import { useRecoilState } from "recoil";

export const useLessonContext = () => {
  const [activeEditorCode, setActiveEditorCode] = useRecoilState(ideCodeState);
  const [consoleInputs, setConsoleInputs] = useRecoilState(consoleCodeState);
  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [stepType, setStepType] = useRecoilState(stepTypeState);

  return {
    activeEditorCode,
    currentStep,
    stepType,
    consoleInputs,
    setActiveEditorCode,
    setCurrentContentStep,
    setStepType,
    setConsoleInputs,
  };
};
