import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentStepState,
  currentErrorState,
  currentLessonState,
  hasErrorState,
  currentExerciseState,
} from "@/store";
import { useLessonContext } from "@/hooks/useLessonContext";
import { ExerciseListItem } from "@/types";
import { useValidateExercise } from "@/api/mutations/useValidateExercise";

function Terminal({ exerciseData }: { exerciseData: ExerciseListItem[] }) {
  const { consoleInputs, setConsoleInputs, stepType } = useLessonContext();

  const [consoleInput, setConsoleInput] = useState("");
  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [, setHasError] = useRecoilState(hasErrorState);
  const [, setCurrentError] = useRecoilState(currentErrorState);
  const [lessonContent] = useRecoilState(currentLessonState);
  const [currentExercise, setCurrentExercise] =
    useRecoilState<ExerciseListItem>(currentExerciseState);

  const { mutate: validateExercise } = useValidateExercise();

  const handleConsoleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let feedback = "";

    validateExercise({
      exerciseId: currentExercise.id || "",
      input: consoleInput,
      type: stepType,
    });

    setConsoleInputs((prev) => [
      ...prev,
      { successMessage: feedback, input: consoleInput },
    ]);

    setConsoleInput("");
  };

  return (
    <div className="h-[400px] flex flex-col">
      <div>
        <div className="bg-gray w-fit px-11 py-3 rounded-tr-lg text-base font-bold">
          Console
        </div>
      </div>
      <div className="bg-gray h-full p-6">
        <div>
          <div className="flex flex-col-reverse">
            <form onSubmit={handleConsoleSubmit}>
              <div className="flex">
                <span>%</span>
                <input
                  type="text"
                  className="bg-transparent ml-2 border-transparent focus:border-transparent focus:ring-0 !outline-none w-full"
                  onChange={(e) => setConsoleInput(e.target.value)}
                  value={consoleInput}
                  disabled={stepType !== "terminal"}
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col-reverse">
            {consoleInputs?.map((input, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-indigo-600">
                  {">"} {input.input}
                </span>
                <span className="text-xs">{input.successMessage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
