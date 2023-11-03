import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentStepState,
  currentErrorState,
  currentLessonState,
  hasErrorState,
} from "@/store";

function Terminal() {
  const [pastConsoleInputs, setPastConsoleInputs] = useState<
    { successMessage: string; input: string }[]
  >([]);
  const [consoleInput, setConsoleInput] = useState("");
  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [, setHasError] = useRecoilState(hasErrorState);
  const [, setCurrentError] = useRecoilState(currentErrorState);
  const [lessonContent] = useRecoilState(currentLessonState);

  const handleConsoleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let feedback = "";
    if (
      lessonContent &&
      lessonContent.steps &&
      lessonContent.steps.length > currentStep &&
      lessonContent.steps[currentStep].instructions
    ) {
      const instructions = lessonContent.steps[currentStep].instructions;

      instructions.forEach((instruction: { type: string; input: string }) => {
        if (instruction.type === "terminal") {
          if (instruction.input === consoleInput) {
            setHasError(false);
            setCurrentError("Success");
            feedback = "Success";
            setCurrentContentStep(currentStep + 1);
          } else {
            setHasError(true);
            setCurrentError("Invalid Command");
            feedback = "Invalid Command";
          }
        }
      });
    }

    setPastConsoleInputs([
      ...pastConsoleInputs,
      { successMessage: feedback, input: consoleInput },
    ]);

    setConsoleInput("");
  };

  return (
    <div className="h-[400px] flex flex-col">
      <div>
        <div className="bg-[#282828] w-fit px-11 py-3 rounded-tr-lg text-base font-bold">
          Console
        </div>
      </div>
      <div className="bg-[#282828] h-full p-6">
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
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col-reverse">
            {pastConsoleInputs?.map((input, index) => (
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
