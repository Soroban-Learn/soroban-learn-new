import Image, { StaticImageData } from 'next/image';
import React, { useState, FC } from 'react';

import LogoIcon from '@/components/common/LogoIcon';
import Button from '../common/Button';
import classNames from 'classnames';
import { ICourse } from '@/types/Course';

import { v4 as uuidv4 } from 'uuid';

type Props = {
  course: ICourse;
};

const logoIconPropsMapping = {
  expert: [null, null, null],
  advance: [null, null, { fill: '#757575' }],
  beginner: [null, { fill: '#757575' }, { fill: '#757575' }],
};

const CourseCard: FC<Props> = ({ course }) => {
  const logoIcons =
    (logoIconPropsMapping as Record<string, any>)[course.level] || [];

  return (
    <div className='flex  flex-col px-[33px] pt-[40px] pb-[60px] w-[414px] rounded-[10px] bg-gradient-linear  relative shadow-md'>
      <div className='flex mb-[-45px] '>
        <div className='mr-[35px] lg:mr-[20px] w-[127px] h-[127px]'>
          <Image
            src={course.image}
            alt='poster'
            className='w-[127px] h-[127px] absolute z-50 top-[-29px]'
          />
        </div>
        <div className='mr-[38px] lg:mr-[20px]'>
          <h4 className='text-xs mb-3.5 tracking-[1.2px] uppercase'>
            Est time
          </h4>
          <h4 className='text-sm'>{course.estimate}</h4>
        </div>

        <div className=''>
          <h4 className='text-xs mb-3.5 tracking-[1.2px] uppercase'>
            Difficulty
          </h4>
          <div className='flex gap-[10px]'>
            {logoIcons.map((props: { fill: string | undefined }) => (
              <LogoIcon
                fill={props && props.fill ? props.fill : undefined}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
      </div>

      <h3 className='text-white font-medium text-[30px] tracking-[-0.3px] mb-[27px]'>
        {course.title}
      </h3>
      <p className='text-light-gray4 tracking-[-0.16px] mb-[27px]'>
        {course.description}
      </p>

      <h3 className='text-white font-bold mb-3'>Prerequisites</h3>
      <h4 className='text-white text-[14px] mb-[35px]'>{course.dependency}</h4>

      <div className=''>
        {course.isActive ? (
          <Button
            label='Resume course'
            icon={<i className='far fa-play' />}
            className='rounded-[100px]'
          />
        ) : (
          <Button
            label='Start Course'
            icon={<i className='far fa-lock' />}
            className='rounded-[100px]'
            customBgColor='bg-black-btn'
          />
        )}
      </div>

      <div className='absolute h-[25px] rounded-tl-none rounded-tr-none rounded-br-[10px] rounded-bl-[10px] shadow-md bg-black4 bottom-0 left-0 w-full'>
        <div
          style={{ width: `${course.progress}%` }}
          className={classNames(
            'bg-white',
            'rounded-tl-none',
            'rounded-tr-none',
            'rounded-bl-[10px]',
            {
              'rounded-br-[10px]': course.progress === 100,
            },
            'text-end',
            'text-dark-black',
            'text-sm',
            'font-medium',
            'pr-1'
          )}
        >
          {course.progress}%
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
//background: linear-gradient(150deg, #474747 18.38%, #0F0F0F 136.27%);
