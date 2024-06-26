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
  LineNumbersState,
  BlockedRangesState,
} from "@/store";

// Hooks
import { useStepValidation } from "@/hooks";
import { ExerciseListItem } from "@/types";
import { useValidateExercise } from "@/api/mutations/useValidateExercise";
import { useLessonContext } from "@/hooks/useLessonContext";
import { PlayVideoLessonButton } from "@/components/PlayVideoLessonButton";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";

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
  const [blockedRanges] = useRecoilState(BlockedRangesState);
  const [lineNumbers] = useRecoilState(LineNumbersState);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [videoModalOpen, setVideoModalOpen] = useState(false);

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

    if (stepType === "info") {
      input = "empty";
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

  function onPlayVideoButtonClick() {
    setVideoModalOpen(true);
  }

  return (
    <div className="z-40 fixed md:relative h-main md:w-1/2">
      <div
        className="md:hidden rotate-90 absolute top-44 -right-[78px] bg-black p-2 w-32 flex items-center justify-center"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Open"} Sidebar
      </div>

      <div
        className={`${
          sidebarOpen === true ? "max-w-full w-[80vw]" : "w-0 overflow-hidden"
        } md:w-full md:flex flex-col gap-4 h-[80%] md:h-main flex bottom-0 z-50 bg-black pt-10`}
      >
        <div className="h-full pl-10 pr-2 relative">
          <Scrollbar scrollerProps={{ elementRef: onScrollerInit }}>
            <div className="pr-8 pb-20">
              <h1 className="text-4xl font-semibold mb-6">Mastering Soroban</h1>
              <hr className="mb-4 mt-2 bg-gray-200 border border-slate-900" />

              <div className="my-2">
                <PlayVideoLessonButton
                  onCLick={onPlayVideoButtonClick}
                  time="5h 20m"
                />
              </div>

              <VideoPlayerModal
                isOpen={videoModalOpen}
                onClose={() => {
                  setVideoModalOpen(false);
                }}
              />

              {exerciseData?.length ? (
                <>
                  {showDescription && (
                    <>
                      <h2 className="text-2xl font-semibold mb-6">
                        {currentExercise && currentExercise?.title}
                      </h2>
                    </>
                  )}

                  {/* <div className="w-64 h-14 bg-indigo-600 rounded-full shadow text-white text-sm font-bold flex items-center justify-center gap-4 mb-4 cursor-pointer">
                  <i className="fa fa-play" /> Play Video Lesson
                </div> */}

                  <div>
                    {showDescription && (
                      <Description lessonContent={exerciseData[currentStep]} />
                    )}
                    {!showDescription && <JoinDiscord />}
                  </div>

                  {currentExercise?.step_validation?.type !== "terminal" ? (
                    <div
                      className={cx(
                        "w-full flex justify-end items-end",
                        "bg-gradient-to-b from-transparent to-black pb-2"
                      )}
                    >
                      <button
                        className="bg-primary text-white flex justify-end items-center px-6 py-3 rounded-md"
                        onClick={validateExerciseHandler}
                        disabled={percentComplete === 100}
                      >
                        <span className="mr-2">Submit</span>
                        <i className="fa fa-arrow-right text-sm" />
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="animate-pulse">
                  <h3 className="h-4 bg-slate-900 rounded-md mt-6"></h3>

                  <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-slate-900 rounded-md"></li>
                    <li className="w-full h-4 bg-slate-900 rounded-md"></li>
                    <li className="w-full h-4 bg-slate-900 rounded-md"></li>
                    <li className="w-full h-4 bg-slate-900 rounded-md"></li>
                  </ul>
                </div>
              )}
            </div>
          </Scrollbar>
        </div>
        <div>
          <Progress
            percentComplete={Math.round(percentComplete)}
            label="Completed"
          />
          {/* <FileExplorer
          nodes={fileStructure}
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
