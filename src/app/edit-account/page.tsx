'use client';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Themes } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/moonlight.css';

import Image from 'next/image';
import Header from '@/components/Header';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/common/ProfileInput';

import defaultUser from '@/assets/images/defaultuser.png';

import { useUserProfile } from '@/api/mutations';
import cn from 'classnames';
import { UserProfileUpdateParams } from '@/types';
import 'react-simple-toasts/dist/theme/success.css';
import 'react-simple-toasts/dist/theme/failure.css';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditFieldNames } from '@/types/RegisterFields';
import { updateSchema } from '@/utils/schemas/updateSchema';
import { fileUploading } from '@/utils/fileUpload';
import { alertMessages } from '@/constants/alertMessages';
import { ALLOW_AVATAR_EXTENSIONS } from '@/constants/fileExtensions';
import { userDataParser } from '@/utils/userDataParser';
import { localStorageKeys } from '@/constants/localStorageKeys';

function EditAccount() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    clearErrors,
    trigger,

    formState: { errors },
  } = useForm<UserProfileUpdateParams>({
    defaultValues: {
      username: '',
      email: '',
      avatar: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(updateSchema) as Resolver<UserProfileUpdateParams>,
    mode: 'all',
  });
  const [displayedUserName, setDisplayedUserName] = useState('');

  const { userProfileUpdateMutation } = useUserProfile();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem(localStorageKeys.user);
    if (userData) {
      const parsedUser = JSON.parse(userData);

      reset(parsedUser);
      setDisplayedUserName(parsedUser.username);
    }
  }, [reset]);

  const handleFormSubmit = async (formData: UserProfileUpdateParams) => {
    const newUserObj = {
      email: formData.email,
      username: formData.username,
      ...(formData.avatar ? { avatar: formData.avatar } : {}),
    };

    if (formData.avatar) {
      newUserObj.avatar = formData.avatar;
    }

    try {
      const userData = await userProfileUpdateMutation.mutateAsync({
        ...newUserObj,
      });

      setDisplayedUserName(formData.username as string);

      const parsedUserData = userDataParser(userData.user_info);

      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify(parsedUserData)
      );

      toast(alertMessages.profileUpdated, { theme: Themes.SUCCESS });
    } catch (error: any) {
      toast(error?.response?.data?.error?.message, {
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
      fileUploading({ file, setValue });
    }
    toast('Profile Updated', { theme: 'dark' });
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const handleInputChanges =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { onChange, name } = register(field as EditFieldNames);
      onChange(e);
      clearErrors(name);
      trigger(name);
    };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='container'>
        <div className='w-full flex items-center gap-10 mt-12 flex-col md:flex-row'>
          <div className='relative'>
            <div className='w-36 h-36 rounded-full shadow overflow-hidden relative'>
              <Image
                src={watch('avatar') || defaultUser}
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
                className='far fa-upload text-primary h-4 w-4'
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

          <form id='hook-form' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='Username'
                  icon={<i className='far fa-user-alt text-xs' />}
                  error={errors.username?.message}
                  {...register('username')}
                  onChange={handleInputChanges('username')}
                />

                <ProfileInput
                  label='Email'
                  icon={
                    <i
                      className='far fa-envelope text-xs'
                      aria-hidden='true'
                    ></i>
                  }
                  error={errors.email?.message}
                  {...register('email')}
                  onChange={handleInputChanges('email')}
                />
              </div>

              <div className='flex flex-col md:flex-row gap-6'>
                <ProfileInput
                  label='New Password'
                  type='password'
                  icon={<i className='far fa-lock text-xs' />}
                  error={errors.password?.message}
                  {...register('password')}
                  onChange={handleInputChanges('password')}
                />
                <ProfileInput
                  label='Confirm New Password'
                  type='password'
                  icon={<i className='far fa-lock text-xs' />}
                  error={errors.passwordConfirm?.message}
                  {...register('passwordConfirm')}
                  onChange={handleInputChanges('passwordConfirm')}
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
              ref={inputRef}
              name='avatar'
              hidden
              accept={ALLOW_AVATAR_EXTENSIONS}
              onChange={handleChangeInputFile}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
