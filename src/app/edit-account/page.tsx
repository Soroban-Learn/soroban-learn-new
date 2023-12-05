'use client';
import React, { useEffect, useState } from 'react';
import toast, { Themes } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/moonlight.css';

import Image from 'next/image';
import Header from '@/components/Header';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/common/ProfileInput';

import defaultuser from '@/assets/images/defaultuser.png';

import { useUserProfile } from '@/api/mutations';

function EditAccount() {
  const [user, setUser] = useState({ username: '', email: '' });
  const { userProfileUpdateMutation } = useUserProfile();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    userProfileUpdateMutation.mutate(user);

    toast('Profile Updated', { theme: 'dark' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='container'>
        <div className='w-full flex items-center gap-10 mt-12 flex-col md:flex-row'>
          <div className='relative'>
            <div className='w-36 h-36 rounded-full shadow overflow-hidden relative'>
              <Image
                src={defaultuser}
                alt='defaultuser'
                className='object-cover'
                fill
              />
            </div>
            <div className='flex items-center justify-center rounded-full absolute bottom-0 right-0 bg-white h-10 w-10 cursor-pointer'>
              <i
                className='far fa-upload text-primary h-4 w-4'
                aria-hidden='true'
              ></i>
            </div>
          </div>

          <div className='flex items-center justify-center flex-col'>
            <h1 className='text-white text-4xl font-normal'>Hi,</h1>
            {/* <p>Member since Jan. 23, 2023</p> */}
          </div>

          <Button
            className='ml-auto mt-8 w-full md:w-fit rounded-2xl hidden md:block'
            type='submit'
            form='hook-form'
            icon={<i className='fal fa-save' />}
          >
            Save Changes
          </Button>
        </div>

        <div className='bg-neutral-800 rounded-lg p-12 my-12'>
          <h3 className='text-white text-xl font-bold'>User Information</h3>
          <p className='text-zinc-500 text-base font-normal mb-10'>
            Here you can edit public information about yourself
          </p>

          <form id='hook-form'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='Username'
                  placeholder='Andrew'
                  icon={<i className='far fa-user-alt text-xs' />}
                />

                <ProfileInput
                  label='Email'
                  placeholder='smith@mail.io'
                  icon={
                    <i
                      className='far fa-envelope text-xs'
                      aria-hidden='true'
                    ></i>
                  }
                />
              </div>

              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='New Password'
                  type='password'
                  icon={<i className='far fa-lock text-xs' />}
                />
                <ProfileInput
                  label='Confirm New Password'
                  type='password'
                  icon={<i className='far fa-lock text-xs' />}
                />
              </div>
            </div>

            <Button
              className='ml-auto mt-8 w-full md:w-fit rounded-2xl md:hidden'
              type='submit'
              form='hook-form'
              icon={<i className='fal fa-save' />}
            >
              Save Changes
            </Button>

            <input
              type='file'
              name='avatar'
              hidden
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
