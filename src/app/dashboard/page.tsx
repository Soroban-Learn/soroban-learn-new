"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import LessonItem from "@/components/LessonItem";
import { LessonItem as ILessonItem } from "@/types/Lesson";

// Queries
import { useGetCourseProgress } from "@/api/queries";
import { useAuth } from "@/hooks";
import { useGetProfile } from "@/api/queries/useCheckProfile";
import { useRegisterForCourse } from "@/api/mutations";

function Dashboard() {
  const { getUser, isAuth } = useAuth();
  const { data: profileData } = useGetProfile();

  console.log("[[[profileData]]]", profileData);

  const router = useRouter();

  const { data, status: getCoursesReqStatus } = useGetCourseProgress({
    courseId: "db0759d7-3dc0-48fc-9e10-0239fadad978",
    userId: getUser().id,
  });

  console.log("[[[data]]]", data);

  useEffect(() => {
    if (data?.current_lesson_id) {
      router.prefetch("/lesson/" + data.current_lesson_id);
    }
  }, [router, data]);

  const redirectToLesson = useCallback(() => {
    // if (data?.current_lesson_id === 'b1586142-2872-46ae-888c-c0933cfc364e') {
    router.push("/lesson/" + data?.current_lesson_id);
    // } else {
    //   alert('Future lessons are currently being rewritten are not available yet.');
    // }
  }, [router, data]);

  const isCompleted = useMemo(() => {
    return data?.lessons.some((lesson) => lesson.completed_exercises > 0);
  }, [data]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container">
        <div className="w-full">
          <h1 className="text-white text-4xl font-normal mt-20">My Courses</h1>
        </div>

        {data ? (
          <div className="flex flex-col lg:flex-row gap-16 w-full items-start mt-12">
            <div className="w-1/2 md:w-1/5 lg:w-1/3 flex items-start">
              <svg
                width="309"
                height="309"
                viewBox="0 0 309 309"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="309"
                  height="309"
                  rx="33"
                  fill="url(#paint0_linear_1510_382)"
                />
                <circle
                  opacity="0.2"
                  cx="154.5"
                  cy="154.5"
                  r="119.5"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle
                  opacity="0.3"
                  cx="154"
                  cy="155"
                  r="84"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M135.169 163.71L183 201.365C172.15 208.079 156.391 207.499 146.389 199.625L112.411 172.877C109.196 170.346 109.196 166.242 112.411 163.71C118.696 158.763 128.885 158.763 135.169 163.71Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M112.902 167.738C115.591 165.688 119.219 164.599 122.946 164.599L112.902 167.738ZM122.946 164.599C126.673 164.599 130.301 165.688 132.99 167.739L122.946 164.599ZM135.585 164.023L186 202.458L183.058 204.221C171.532 211.128 154.883 210.569 144.174 202.405L110.307 176.586C108.239 175.01 107 172.763 107 170.305C107 167.847 108.239 165.6 110.307 164.023C113.881 161.299 118.463 160 122.946 160C127.429 160 132.01 161.298 135.585 164.023ZM132.99 167.739L177.725 201.842L132.99 167.739ZM177.725 201.842C167.882 206.111 155.08 205.026 146.768 198.69L112.902 172.871C112.902 172.871 112.902 172.871 112.902 172.871C111.765 172.005 111.402 171.049 111.402 170.305C111.402 169.561 111.765 168.605 112.902 167.738"
                  fill="white"
                />
                <path
                  d="M162.608 108.821L195.655 133.243C198.782 135.554 198.782 139.301 195.655 141.612C189.542 146.129 179.633 146.129 173.521 141.612L127 107.232C137.553 101.102 152.88 101.631 162.608 108.821Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M130.275 107.012L175.01 140.419C177.699 142.428 181.327 143.495 185.054 143.495C188.781 143.495 192.409 142.428 195.098 140.419C196.235 139.571 196.598 138.634 196.598 137.906C196.598 137.177 196.235 136.24 195.098 135.392L161.232 110.1C152.92 103.893 140.118 102.83 130.275 107.012ZM124.942 104.681C136.468 97.9151 153.117 98.4626 163.826 106.461L197.693 131.752C199.761 133.297 201 135.497 201 137.906C201 140.314 199.761 142.514 197.693 144.059C194.119 146.728 189.537 148 185.054 148C180.571 148 175.99 146.728 172.415 144.059L122 106.409L124.942 104.681Z"
                  fill="white"
                />
                <path
                  d="M190.073 194L120.152 142.267C110.083 134.818 109.342 123.081 117.927 115L187.848 166.733C197.917 174.182 198.658 185.919 190.073 194Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M117.94 110L188.981 162.933C194.421 166.986 197.523 172.357 197.949 178.007C198.377 183.666 196.095 189.28 191.396 193.734L190.06 195L119.019 142.067C113.579 138.014 110.477 132.644 110.051 126.993C109.623 121.334 111.905 115.72 116.604 111.266L117.94 110ZM118.345 115.893C115.415 119.235 114.187 123.02 114.461 126.646C114.772 130.766 117.048 135.008 121.626 138.419L189.655 189.107C192.585 185.765 193.813 181.98 193.539 178.354C193.228 174.234 190.952 169.992 186.374 166.582L118.345 115.893Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1510_382"
                    x1="154.5"
                    y1="-2.47359e-06"
                    x2="237.5"
                    y2="309"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#5546FF" />
                    <stop offset="1" stopColor="#5546FF" stopOpacity="0.66" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="text-white text-4xl font-normal">{data?.title}</h2>
              <p className="text-stone-300 text-base font-normal">
                {data?.description}
              </p>
              <div className="flex gap-12">
                <div className="text-zinc-500 text-xl font-normal leading-7">
                  <div>
                    <span className="text-white text-xl font-bold leading-7">
                      {data?.completed_lessons ?? 0}
                    </span>
                    / {data?.lessons.length}
                  </div>
                  <div>Lessons</div>
                </div>
                <div className="text-zinc-500 text-xl font-normal leading-7">
                  <div>
                    <span className="text-white text-xl font-bold leading-7">
                      {data?.completed_lessons === 0
                        ? "0"
                        : Math.round(
                            (data?.completed_lessons / data?.lessons.length) *
                              100
                          )}
                      %
                    </span>
                  </div>
                  <div>Completed</div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <button
                className="bg-neutral-900 rounded-full text-center text-white text-base font-bold w-full h-11 min-w-0 max-w-full md:max-w-sm"
                onClick={redirectToLesson}
              >
                {isCompleted ? "Continue" : "Start"} Course
              </button>
            </div>
          </div>
        ) : (
          <div>
            {getCoursesReqStatus == "error" ? (
              <div className="mt-10">You have no courses yet...</div>
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
        )}

        <div className="mt-6">
          {data &&
            data.lessons.map((lesson: ILessonItem, index: number) => {
              // If lesson.exercises is a string, parse it into an array of Exercise objects
              const exercises =
                typeof lesson.exercises === "string"
                  ? JSON.parse(lesson.exercises)
                  : lesson.exercises;

              return (
                <LessonItem
                  id={lesson.id}
                  title={lesson.title}
                  index={index}
                  totalExercises={exercises.length}
                  exercises={exercises}
                  completed_exercises={lesson.completed_exercises ?? 0}
                  key={lesson.id}
                  is_complete={lesson.is_complete}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
