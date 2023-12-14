import Image from 'next/image';
import React, { FC } from 'react';

import LogoIcon from '@/components/common/LogoIcon';
import Button from '../common/Button';
import classNames from 'classnames';
import { ICourse } from '@/types/Course';

import { v4 as uuid4 } from 'uuid';

type Props = {
  course: ICourse;
  onHandleOpenModal: (course: ICourse) => void;
  arePrerequisitesCompleted: (course: ICourse) => boolean;

};

const logoIconPropsMapping = {
  expert: [null, null, null],
  advance: [null, null, { fill: '#757575' }],
  beginner: [null, { fill: '#757575' }, { fill: '#757575' }],
};


const CourseCard: FC<Props> = ({
  course,
  onHandleOpenModal,
  arePrerequisitesCompleted,
}) => {
  const logoIcons =
    (logoIconPropsMapping as Record<string, any>)[course.level] || [];

  const onHandleOpenModalCourse = () => {
    onHandleOpenModal(course);
  };

  const prerequisitesCompleted = arePrerequisitesCompleted(course);

  return (
    <div className='flex  flex-col px-[15px] sm:px-[33px] pt-[40px] pb-[60px] w-[290px] sm:w-[380px] lg:w-[414px] rounded-[10px] bg-gradient-linear  relative shadow-md'>
      <div className='flex mb-[-45px]'>
        <div className='mr-[-13px] sm:mr-[18px] lg:mr-[35px] w-[127px] h-[127px]'>
          <div className='absolute top-[-31px]'>
            <div className='relative w-[100px] h-[100px] sm:w-[127px] sm:h-[127px] z-49 overflow-hidden'>
              <Image src={course.image} alt='poster' />
              {course.progress === 100 && (
                <div className='absolute transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-white h-[18px] overflow-hidden top-[23px] right-[24px] w-[222px] text-center'>
                  <span className='block text-black text-[8px] font-semibold uppercase h-full leading-[19px] tracking-[0.4px]'>
                    Complete
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='mr-[10px] sm:mr-[20px] whitespace-nowrap overflow-hidden'>
          <h4 className=' text-[10px] sm:text-xs mb-3.5 tracking-[1.2px] uppercase'>
            Est time
          </h4>
          <h4 className='text-xs sm:text-sm'>{course.estimate}</h4>
        </div>

        <div>
          <h4 className=' text-[10px] sm:text-xs mb-3.5 tracking-[1.2px] uppercase'>
            Difficulty
          </h4>
          <div className='flex gap-[10px]'>
            {logoIcons.map((props: { fill: string | undefined }) => (
              <LogoIcon
                fill={props && props.fill ? props.fill : undefined}
                key={uuid4()}
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

      {course.progress === 100 ? (
        <div className='flex items-center gap-4 flex-col md:flex-row'>
          <div className='flex items-center gap-2'>
            <i className='far fa-check-circle' />
            <h5 className='text-white text-[16px] font-bold'>Completed!</h5>
          </div>

          <div>
            <Button
              label='Review Course'
              className=' border-2 border-white rounded-[100px] h-[48px] font-bold'
              customBgColor='bg-inherit'
            />
          </div>
        </div>
      ) : (
        <div>
          {course.isActive || prerequisitesCompleted ? (

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
              onClick={onHandleOpenModalCourse}
            />
          )}
        </div>
      )}

      {course.progress > 0 && (
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
              'font-bold',
              'pr-1'
            )}
          >
            {course.progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
