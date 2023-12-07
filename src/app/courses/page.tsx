'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';

import cardPoster from '@/assets/images/card-poster.png';
import Logo from '@/assets/images/logo.svg';

function Courses() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='container'>
        <h2 className='text-white text-6xl mt-24 tracking-tight mb-14'>
          Course Collections
        </h2>

        <div className='flex gap-[108px] items-center mb-[50px]'>
          <h3 className='text-white text-[40px]'>Mastering Soroban</h3>
          <h4 className='text-gray-primary text-[24px]'>3 Courses</h4>
        </div>

        <div className='flex'>
          <div className='flex flex-col w-[414px] rounded-[10px] bg-gradient-to-br from-light-gray3 to to-black3 relative'>
            <div className='flex px-[33px]'>
              <Image src={cardPoster} alt='poster' className='w-[127px] h-[127px]' />

              <div className="">
                <h4 className='text-xs mb-3.5'>Est time</h4>
                <h4 className='text-sm'>50m</h4>
              </div>

              <div className="">
              <h4 className='text-xs mb-3.5'>Difficulty</h4>
              <div className="flex">
                {/* <Image src={Logo} alt='logo'/> */}
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Courses;
