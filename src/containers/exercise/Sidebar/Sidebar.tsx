import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cx from "classnames";

// Components
import Scrollbar from "@/components/common/Scrollbar";
import FileExplorer from "@/components/FileExplorer";
import Progress from "@/components/common/Progress";
import { Description, JoinDiscord } from "@/components/exercise";

// Store
import {
  currentLessonState,
  fileStructureState,
  selectedFileIdState,
  currentExerciseState,
} from "@/store";

// Hooks
import { useStepValidation } from "@/hooks";
import { ExerciseListItem } from "@/types";
import { useValidateExercise } from "@/api/mutations/useValidateExercise";
import { useLessonContext } from "@/hooks/useLessonContext";

const Sidebar = ({ exerciseData }: { exerciseData: ExerciseListItem[] }) => {
  const scrollerRef = useRef<HTMLDivElement | null>();

  const { mutate: validateExercise } = useValidateExercise();

  const {
    activeEditorCode,
    consoleInputs,
    currentStep,
    stepType,
    setStepType,
    setCurrentContentStep,
  } = useLessonContext();

  const [selectedFileId, setSelectedFileId] =
    useRecoilState(selectedFileIdState);

  const lessonContent = useRecoilValue(currentLessonState);
  const fileStructure = useRecoilValue(fileStructureState);

  const showDescription = useMemo(() => {
    return exerciseData?.some((e) => !e.is_completed);
  }, [exerciseData]);

  const percentComplete =
    (exerciseData?.filter((e: ExerciseListItem) => e.is_completed).length /
      exerciseData?.length) *
    100;

  const [currentExercise, setCurrentExercise] =
    useRecoilState<ExerciseListItem>(currentExerciseState);

  const onScrollerInit = useCallback((element: HTMLDivElement | null) => {
    scrollerRef.current = element;
  }, []);

  const validateExerciseHandler = () => {
    if (!currentExercise) {
      return;
    }

    let input;

    if (stepType === "code") {
      input = activeEditorCode;
    }

    if (stepType === "terminal") {
      input = consoleInputs?.at(consoleInputs.length - 1)?.input;
    }

    if (!input) {
      return;
    }

    validateExercise({
      exerciseId: currentExercise.id || "",
      input,
      type: stepType,
    });
  };

  useEffect(() => {
    if (!exerciseData) {
      return;
    }

    const exerciseIdx = exerciseData.findIndex((e) => !e.is_completed);

    if (exerciseIdx > -1) {
      setCurrentExercise(exerciseData[exerciseIdx]);
      setCurrentContentStep(exerciseIdx);
    }
  }, [exerciseData, setCurrentContentStep]);

  useEffect(() => {
    if (!currentExercise) {
      return;
    }

    setStepType(currentExercise?.step_validation?.type || "terminal");
  }, [currentExercise, setStepType]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div className="h-full pl-10 pr-2 relative">
        <Scrollbar scrollerProps={{ elementRef: onScrollerInit }}>
          <div className="pr-8 pb-20">
            {showDescription && (
              <>
                <h2 className="text-4xl font-semibold mb-6">
                  {currentExercise && currentExercise?.title}
                </h2>
              </>
            )}
            <div>
              {showDescription && (
                <Description lessonContent={exerciseData[currentStep]} />
              )}
              {!showDescription && <JoinDiscord />}
            </div>
          </div>
        </Scrollbar>
        {currentExercise?.step_validation?.type !== "terminal" ? (
          <div
            className={cx(
              "absolute bottom-0 left-0 w-full flex justify-end items-end",
              "bg-gradient-to-b from-transparent to-black h-28 pr-10 pb-2"
            )}
          >
            <button
              className="bg-transparent text-light-gray flex justify-end items-center"
              onClick={validateExerciseHandler}
              disabled={percentComplete === 100}
            >
              <span className="mr-2">Next Exercise</span>
              <i className="fa fa-arrow-right text-sm" />
            </button>
          </div>
        ) : null}
      </div>
      <div>
        <Progress percentComplete={percentComplete} label="Completed" />
        {/* <FileExplorer
          nodes={fileStructure}
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
        /> */}
      </div>
    </div>
  );
};

export default Sidebar;
