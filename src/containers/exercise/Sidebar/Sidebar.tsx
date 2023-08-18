import { useCallback, useEffect, useRef, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Components
import Scrollbar from "@/components/common/Scrollbar";
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

const Sidebar = ({ exerciseData }: { exerciseData: any }) => {
  const scrollerRef = useRef<HTMLDivElement | null>();

  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [selectedFileId, setSelectedFileId] =
    useRecoilState(selectedFileIdState);
  const [stepType, setStepType] = useRecoilState(stepTypeState);

  const lessonContent = useRecoilValue(currentLessonState);
  const fileStructure = useRecoilValue(fileStructureState);

  const { validateStep } = useStepValidation(
    currentStep,
    setCurrentContentStep,
    ""
  );

  const showDescription = useMemo(() => {
    return exerciseData && currentStep < exerciseData.length;
  }, [exerciseData, currentStep]);

  const onScrollerInit = useCallback((element: HTMLDivElement | null) => {
    scrollerRef.current = element;
  }, []);

  const handleStepProgression = useCallback(() => {
    validateStep && validateStep();
  }, [validateStep]);

  useEffect(() => {
    setStepType((exerciseData && exerciseData[currentStep]?.stepType) || "");
  }, [currentStep, exerciseData, setStepType]);

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
                <h3 className="text-lg leading-loose">Jonathon</h3>
                <h2 className="text-5xl font-semibold mb-6">
                  {exerciseData && exerciseData[0]?.title}
                </h2>
              </>
            )}
            <div>
              {showDescription && (
                <Description
                  lessonContent={exerciseData}
                  currentStep={currentStep}
                />
              )}
              {!showDescription && <JoinDiscord />}
            </div>
          </div>
        </Scrollbar>
        {stepType !== "terminal" && showDescription && (
          <div
            className={cx(
              "absolute bottom-0 left-0 w-full flex justify-end items-end",
              "bg-gradient-to-b from-transparent to-black h-28 pr-10 pb-2"
            )}
          >
            <button
              className="bg-transparent text-light-gray flex justify-end items-center"
              onClick={handleStepProgression}
            >
              <span className="mr-2">Next Exercise</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>
          </div>
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
};

export default Sidebar;
