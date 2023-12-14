"use client";

import Header from "@/components/Header";
import React from "react";

import CourseCard from "@/components/CourseCard";
import { LEVELS } from "@/types/LevelEnum";
import cardPoster from "@/assets/images/card-poster.png";

import CourseModal from "@/components/CourseModal";
import { useCourseModal } from "@/hooks/useCourseModal";

function Courses() {
  const {
    courseModal,
    onHandleCloseModal,
    coursesData,
    onHandleOpenModal,
    arePrerequisitesCompleted,
    incompletePrerequisites,
  } = useCourseModal();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container">
        <h2 className="text-white text-6xl mt-24 mb-14 text-center md:text-start">
          Course Collections
        </h2>

        <div className="flex gap-12 md:gap-[108px] items-center md:items-end mb-[60px] flex-col md:flex-row">
          <h3 className="text-white text-[40px] tracking-[-0.4px] text-center">
            Mastering Soroban
          </h3>
          <h4 className="text-gray-primary text-[24px] tracking-[-0.24px] text-center">
            3 Courses
          </h4>
        </div>

        <div className="flex flex-col items-center justify-center md:flex-row gap-[47px] flex-wrap md:items-start xl:flex-nowrap ">
          {coursesData.map((course) => (
            <CourseCard
              course={course}
              key={course.title}
              onHandleOpenModal={onHandleOpenModal}
              arePrerequisitesCompleted={arePrerequisitesCompleted}
            />
          ))}
        </div>
      </div>

      <CourseModal
        isOpenModal={courseModal}
        onHandleCloseModal={onHandleCloseModal}
        incompletePrerequisites={incompletePrerequisites}
      />
    </div>
  );
}

export default Courses;
