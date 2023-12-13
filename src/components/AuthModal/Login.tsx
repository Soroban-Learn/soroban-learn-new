import { type FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Components
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ModalLogo from '../common/ModalLogo/ModalLogo';

// Schemas
import { type LoginSchema, loginSchema } from '@/utils/schemas';

// Mutations
import { useUserLogin } from '@/api/mutations/useUserLogin';
import toast, { Themes } from 'react-simple-toasts';

import 'react-simple-toasts/dist/theme/failure.css';

import logo from '@/assets/images/logo-purple.png';

interface LoginHelperProps {
  goToRegister: () => void;
}

export const LoginHelper: FC<LoginHelperProps> = ({ goToRegister }) => (
  <div className='text-lg'>
    Don’t have an account?{` `}
    <span className='underline font-bold cursor-pointer' onClick={goToRegister}>
      Create one
    </span>
  </div>
);

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const { mutateAsync, error, isError, isLoading } = useUserLogin();

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      try {
        await mutateAsync(data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error?.message;

        if (errorMessage) {
          toast(errorMessage, {
            theme: Themes.FAILURE,
            duration: 2000,
          });
        }
      }
    },
    [mutateAsync]
  );

  return (
    <form
      className='w-full bg-white rounded-[10px] pt-12 pb-9 relative text-center px-12'
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalLogo photo={logo} height={72} width={72}/>
      {/* <Button className="w-full rounded-[50px] text-lg py-6 leading-5">
        <FontAwesomeIcon icon={faLink} />
        <span className="ml-3">Log in with Wallet</span>
      </Button>
      <div className="h-px bg-light-gray2 my-12 relative">
        <div className={cx(
          "w-12 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-light-gray text-sm"
        )}>
          OR
        </div>
      </div> */}
      <div className='mb-9 text-[32px] text-gray'>Welcome!</div>
      {isError && (
        <div className='text-error mb-2'>{error?.response?.data.message}</div>
      )}
      <Input
        placeholder='E-mail'
        icon={<i className='fa fa-envelope' />}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        placeholder='Password'
        wrapperClassName='mt-7'
        type='password'
        icon={<i className='fa fa-lock' />}
        error={errors.password?.message}
        {...register('password')}
      />
      <div className='my-7 text-primary cursor-pointer'>Forgot Password?</div>
      <Button
        className='w-full rounded-[50px] text-lg py-0 h-[70px] leading-5 !bg-black'
        type='submit'
        loading={isLoading}
      >
        Log in with account
      </Button>
    </form>
  );
};