import { type FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Components
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ModalLogo from '../common/ModalLogo';

// Schemas
import {
  type RegistrationSchema,
  registrationSchema,
} from '@/utils/schemas/registrationSchema';

// Mutations
import { useUserRegistration } from '@/api/mutations/useUserRegistration';
import { registerErrors } from '@/constants/registerErrors';
import { RegisterFieldName } from '@/types/RegisterFields';

import logo from '@/assets/images/logo-purple.png';


interface RegistrationProps {
  goToLogin: () => void;
}

export const RegistrationHelper: FC<RegistrationProps> = ({ goToLogin }) => (
  <div className='flex justify-center items-center text-lg'>
    Already have an account?
    <span
      className='underline font-bold cursor-pointer ml-2'
      onClick={goToLogin}
    >
      Login
    </span>
  </div>
);

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: yupResolver(registrationSchema),
    mode: 'onBlur',
  });

  const { mutate, isLoading, error: apiError } = useUserRegistration();

  const onSubmit = useCallback(
    (data: RegistrationSchema) => {
      mutate({
        email: data.email,
        username: data.username,
        password: data.password,
      });
    },
    [mutate]
  );

  const handleClearErros = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(event.target.name as RegisterFieldName);
  };

  useEffect(() => {
    const errorMessage = apiError?.response?.data.error?.message as string;

    const validateInputs = () => {
      switch (errorMessage) {
        case registerErrors.emailExist:
          setError('email', {
            type: 'custom',
            message: errorMessage.slice(0, -1),
          });
          break;
        case registerErrors.userExist:
          setError('username', {
            type: 'custom',
            message: errorMessage.slice(0,-1),
          });
      }
    };

    if (errorMessage) {
      validateInputs();
    }
  }, [apiError, setError]);

  return (
    <form
      className='w-full bg-white rounded-[10px] pt-20 pb-12 relative text-center px-12'
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalLogo photo={logo} height={72} width={72}/>
      <div className='text-2xl text-light-gray mb-12'>Let’s get started!</div>
      <Input
        icon={<i className='fa fa-envelope' />}
        placeholder='E-mail'
        wrapperClassName='mt-2.5'
        error={errors.email?.message}
        onFocus={handleClearErros}
        {...register('email')}
      />
      <Input
        icon={<i className='fa fa-user' />}
        placeholder='Username'
        wrapperClassName='mt-2.5'
        error={errors.username?.message}
        onFocus={handleClearErros}
        {...register('username')}
      />
      <Input
        icon={<i className='fa fa-lock' />}
        placeholder='Password'
        type='password'
        wrapperClassName='mt-2.5'
        error={errors.password?.message}
        onFocus={handleClearErros}
        {...register('password')}
      />
      <Input
        icon={<i className='fa fa-lock' />}
        placeholder='Repeat Password'
        type='password'
        wrapperClassName='mt-2.5'
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm')}
      />
      <Button
        type='submit'
        className='w-5/6 mx-auto rounded-[50px] text-lg py-0 h-[70px] leading-5 mt-9 !bg-black'
        loading={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
};
