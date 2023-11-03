import React, { useState } from "react";
import { LessonItem } from "@/types";
import ExerciseListItem from "@/components/ExerciseListItem";

function LessonItem({
  title,
  totalExercises,
  completed_exercises,
  exercises,
  index,
  is_complete,
}: LessonItem) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex w-full justify-start items-center py-6">
        <div className="w-16 h-16 rounded-full border border-zinc-500 flex items-center justify-center mr-6 mb-auto flex-none">
          {is_complete ? (
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1194 0.828125C21.5882 1.29688 21.5882 2 21.1194 2.42188L8.74443 14.7969C8.32255 15.2656 7.61943 15.2656 7.19755 14.7969L0.822551 8.42188C0.353801 8 0.353801 7.29688 0.822551 6.82812C1.24443 6.40625 1.94755 6.40625 2.36943 6.82812L7.99443 12.4531L19.5726 0.828125C19.9944 0.40625 20.6976 0.40625 21.1194 0.828125Z"
                fill="#919191"
              />
            </svg>
          ) : (
            index + 1
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex items-center">
            <div className="h-16 flex items-center">
              <h3 className="text-white text-2xl font-normal leading-normal">
                {title}
              </h3>
            </div>

            <div className="text-white text-2xl font-bold leading-loose ml-auto">
              {completed_exercises}/{totalExercises}
            </div>

            <div
              className={`ml-4 cursor-pointer transition-all ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg
                width="15"
                height="8"
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0625 2.01562L8.125 7.60156C7.92969 7.79688 7.69531 7.875 7.5 7.875C7.26563 7.875 7.03125 7.79688 6.83594 7.64062L0.898439 2.01562C0.507814 1.66406 0.507814 1.07812 0.859377 0.6875C1.21094 0.296875 1.79688 0.296875 2.1875 0.648438L7.5 5.64844L12.7734 0.648438C13.1641 0.296875 13.75 0.296875 14.1016 0.6875C14.4531 1.07812 14.4531 1.66406 14.0625 2.01562Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {isExpanded ? (
            <div className="w-full flex flex-col gap-4 py-6">
              {exercises.map((exercise) => (
                <ExerciseListItem
                  title={exercise.title}
                  is_completed={exercise.completed}
                  key={exercise.id}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full h-px border border-neutral-900" />
    </div>
  );
}

export default LessonItem;
