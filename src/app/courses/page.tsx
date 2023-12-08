'use client';

import Header from '@/components/Header';
import React from 'react';

import CourseCard from '@/components/CourseCard';
import cardPoster from '@/assets/images/card-poster.png';
import { LEVELS } from '@/types/LevelEnum';

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
    progress: 50,
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

function Courses() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='container'>
        <h2 className='text-white text-6xl mt-24 tracking-tight mb-14'>
          Course Collections
        </h2>

        <div className='flex gap-[108px] items-center mb-[60px]'>
          <h3 className='text-white text-[40px]'>Mastering Soroban</h3>
          <h4 className='text-gray-primary text-[24px]'>3 Courses</h4>
        </div>

        <div className='flex flex-col items-center justify-center lg:flex-row gap-[47px] flex-wrap lg:items-start lg:flex-nowrap'>
          {coursesData.map((course) => (
            <CourseCard course={course} key={course.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
