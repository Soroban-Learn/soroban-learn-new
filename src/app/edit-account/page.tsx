'use client';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Themes } from 'react-simple-toasts';

import Image from 'next/image';
import Header from '@/components/Header';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/common/ProfileInput';

import defaultuser from '@/assets/images/defaultuser.png';

import { useUserProfile } from '@/api/mutations';
import cn from 'classnames';
import { UserProfileUpdateParams } from '@/types';
import 'react-simple-toasts/dist/theme/moonlight.css';
import 'react-simple-toasts/dist/theme/failure.css';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditFieldNames } from '@/types/RegisterFields';
import { updationSchema } from '@/utils/schemas/updateSchema';

function EditAccount() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    clearErrors,

    formState: { errors, isValid },
  } = useForm<UserProfileUpdateParams>({
    defaultValues: {
      username: '',
      email: '',
      avatar: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(
      updationSchema
    ) as Resolver<UserProfileUpdateParams>,
    mode: 'onBlur',
  });
  const [displayedUserName, setDisplayedUserName] = useState('');

  const { userProfileUpdateMutation } = useUserProfile();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);

      reset(parsedUser);
      setDisplayedUserName(parsedUser.username);
    }
  }, [reset]);

  const handleFormSubmit = async (formData: UserProfileUpdateParams) => {
    const newUserObj = {
      email: formData.email,
      avatar: formData.avatar,
      username: formData.username,
    };

    try {
      const userData = await userProfileUpdateMutation.mutateAsync({
        ...newUserObj,
      });

      console.log(userData);

      toast('Profile Updated', { theme: 'dark' });
    } catch (error: any) {
      toast(error.response?.data.error.message, {
        theme: Themes.FAILURE,
        duration: 2000,
      });
    }
  };

  const handleChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 5e6) {
        toast('Please unpload a file smaller than 5MB', {
          theme: Themes.FAILURE,
          duration: 2000,
        });
      } else {
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result;

          if (result && typeof result === 'string') {
            setValue('avatar', result);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const handleClearErros = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(event.target.name as EditFieldNames);
  };

  console.log(getValues());
  console.log(errors);

  console.log(isValid);

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='container'>
        <div className='w-full flex items-center gap-10 mt-12'>
          <div className='relative'>
            <div className='w-36 h-36 rounded-full shadow overflow-hidden relative'>
              <Image
                src={watch('avatar') || defaultuser}
                alt='defaultuser'
                className={cn({
                  'object-fill bg-center bg-current': watch('avatar'),
                  'object-cover': !watch('avatar'),
                })}
                fill
              />
            </div>
            <div
              onClick={onChooseFile}
              className='flex items-center justify-center rounded-full absolute bottom-0 right-0 bg-white h-10 w-10 cursor-pointer'
            >
              <i
                className='fa fa-upload text-primary h-4 w-4'
                aria-hidden='true'
              ></i>
            </div>
          </div>

          <div className='flex items-center justify-center flex-col'>
            <h1 className='text-white text-4xl font-normal'>
              Hi, {displayedUserName}
            </h1>
            {/* <p>Member since Jan. 23, 2023</p> */}
          </div>
        </div>

        <div className='bg-neutral-800 rounded-lg p-12 my-12'>
          <h3 className='text-white text-xl font-bold'>User Information</h3>
          <p className='text-zinc-500 text-base font-normal mb-10'>
            Here you can edit public information about yourself
          </p>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='Username'
                  icon={<i className='fa fa-user' />}
                  error={errors.username?.message}
                  onFocus={handleClearErros}
                  {...register('username')}
                />

                <ProfileInput
                  label='Email'
                  icon={<i className='fa fa-envelope' />}
                  error={errors.email?.message}
                  onFocus={handleClearErros}
                  {...register('email')}
                />
              </div>

              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='New Password'
                  type='password'
                  icon={<i className='fa fa-lock' />}
                  error={errors.password?.message}
                  onFocus={handleClearErros}
                  {...register('password')}
                />
                <ProfileInput
                  label='Confirm New Password'
                  type='password'
                  icon={<i className='fa fa-lock' />}
                  error={errors.passwordConfirm?.message}
                  onFocus={handleClearErros}
                  {...register('passwordConfirm')}
                />
              </div>
            </div>

            <input
              type='file'
              ref={inputRef}
              name='avatar'
              hidden
              accept='image/png, image/jpeg'
              onChange={handleChangeInputFile}
            />

            <Button
              className='ml-auto mt-8 w-full md:w-fit'
              // disabled={true}
              type='submit'
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
