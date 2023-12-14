import { courseModalState } from '@/store';
import { useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import cardPoster from '@/assets/images/card-poster.png';
import { LEVELS } from '@/types/LevelEnum';
import { ICourse } from '@/types/Course';

const coursesData = [
  {
    title: 'Getting Started',
    dependency: 'None',
    image: cardPoster,
    estimate: '50m',
    level: LEVELS.BEGINNER,
    progress: 25,
    isActive: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc id cursus metus.',
  },

  {
    title: 'The Second Course',
    dependency: 'Getting Started',
    image: cardPoster,
    estimate: '50m',
    level: LEVELS.ADVANCE,
    progress: 0,
    isActive: false,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc id cursus metus.',
  },

  {
    title: 'Mastery of Beans',
    dependency: 'Getting Started, The Second Course',
    image: cardPoster,
    estimate: '50m',
    level: LEVELS.EXPERT,
    progress: 100,
    isActive: false,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc id cursus metus.',
  },
];

export const useCourseModal = () => {
  const [courseModal, setCourseModal] = useRecoilState(courseModalState);
  const [activeCourse, setActiveCourse] = useState<ICourse | null>(null);

  const onHandleOpenModal = useCallback(
    (course: ICourse) => {
      setCourseModal(true);
      setActiveCourse(course);
    },
    [setCourseModal, setActiveCourse]
  );

  const onHandleCloseModal = () => {
    setCourseModal(false);
    setActiveCourse(null);
  };

  const arePrerequisitesCompleted = (course: ICourse) => {
    if (course.dependency === 'None') {
      return true;
    }

    const dependencies = course.dependency.split(', ');
    if (dependencies) {
      for (const dependency of dependencies) {
        const dependentCourse = coursesData.find((c) => c.title === dependency);
        if (!dependentCourse || dependentCourse.progress !== 100) {
          return false;
        }
      }
    }

    return true;
  };

  const incompletePrerequisites = (): string[] => {
    if (activeCourse?.dependency === 'None') {
      return [];
    }

    const dependencies = activeCourse?.dependency.split(', ');
    return (
      dependencies?.filter((dependency) => {
        const dependentCourse = coursesData.find((course) => course.title === dependency);
        return !dependentCourse || dependentCourse.progress !== 100;
      }) || []
    );
  };

  return {
    courseModal,
    onHandleOpenModal,
    arePrerequisitesCompleted,
    coursesData,
    incompletePrerequisites,
    onHandleCloseModal,
    activeCourse,
  };
};