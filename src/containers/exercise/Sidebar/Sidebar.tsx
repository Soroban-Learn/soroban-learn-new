import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import FileExplorer from "@/components/FileExplorer";
import Progress from "@/components/common/Progress";
import { Description, JoinDiscord } from "@/components/exercise";

// Store
import {
  currentLessonState,
  currentStepState,
  fileStructureState,
  selectedFileIdState,
  stepTypeState,
} from "@/store";

// Hooks
import { useStepValidation } from "@/hooks";

const Sidebar = () => {
  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [selectedFileId, setSelectedFileId] = useRecoilState(selectedFileIdState);
  const [stepType, setStepType] = useRecoilState(stepTypeState);

  const lessonContent = useRecoilValue(currentLessonState);
  const fileStructure = useRecoilValue(fileStructureState);

  const { validateStep } = useStepValidation(
    currentStep,
    setCurrentContentStep,
    "",
  );

  const showDescription = useMemo(() => {
    return lessonContent.steps && currentStep < lessonContent.steps.length;
  }, [lessonContent, currentStep]);

  const handleStepProgression = useCallback(() => {
    validateStep && validateStep();
  }, [validateStep]);

  useEffect(() => {
    setStepType(
      (lessonContent?.steps &&
        lessonContent.steps.length &&
        lessonContent.steps[currentStep]?.stepType) ||
        ""
    );
  }, [currentStep, lessonContent, setStepType]);

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div className="h-full px-12 overflow-auto">
        {showDescription && (
          <>
            <h3 className="text-lg leading-loose">Current Exercise</h3>
            <h2 className="text-5xl font-semibold mb-6">
              {lessonContent.title}
            </h2>
          </>
        )}
        <div>
          {showDescription && (
            <Description lessonContent={lessonContent} currentStep={currentStep}  />
          )}
          {!showDescription && <JoinDiscord />}
        </div>
        {stepType !== "terminal" && showDescription && (
          <button
            className="bg-indigo-600 py-2 px-4 rounded-md mt-5 float-right"
            onClick={handleStepProgression}
          >
            Next Step
          </button>
        )}
      </div>
      <div>
        <Progress percentComplete={30} label="Completed" />
        <FileExplorer
          nodes={fileStructure}
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
        />
      </div>
    </div>
  );
}

export default Sidebar;
