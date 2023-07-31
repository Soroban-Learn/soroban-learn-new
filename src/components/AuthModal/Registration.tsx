import { type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/pro-regular-svg-icons";

// Components
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import AuthLogo from "./AuthLogo";

// Schemas
import {
  type RegistrationSchema,
  registrationSchema,
} from "@/utils/schemas/registrationSchema";

// Mutations
import { useUserRegistration } from "@/api/mutations/useUserRegistration";

interface RegistrationProps {
  goToLogin: () => void;
}

export const RegistrationHelper: FC<RegistrationProps> = ({ goToLogin }) => (
  <div className="flex justify-center items-center text-lg">
    Already have an account?
    <span
      className="underline font-bold cursor-pointer ml-2"
      onClick={goToLogin}
    >
      Login
    </span>
  </div>
)

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationSchema>({
    resolver: yupResolver(registrationSchema),
  });

  const { mutate, isLoading } = useUserRegistration();

  const onSubmit = useCallback((data: RegistrationSchema) => {
    mutate({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      username: data.username,
    });
  }, [mutate]);

  return (
    <form
      className="w-full bg-white rounded-[10px] pt-20 pb-12 relative text-center px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthLogo />
      <div className="text-2xl text-light-gray mb-12">
        Let’s get started!
      </div>
      <div className="grid grid-cols-2 gap-11">
        <div>
          <Input
            placeholder="First"
            icon={<FontAwesomeIcon icon={faUser} />}
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </div>
        <div>
          <Input
            placeholder="Last"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
      </div>
      <Input
        icon={<FontAwesomeIcon icon={faEnvelope} />}
        placeholder="E-mail"
        wrapperClassName="mt-2.5"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        icon={<FontAwesomeIcon icon={faUser} />}
        placeholder="Username"
        wrapperClassName="mt-2.5"
        error={errors.username?.message}
        {...register("username")}
      />
      <Input
        icon={<FontAwesomeIcon icon={faLock} />}
        placeholder="Password"
        type="password"
        wrapperClassName="mt-2.5"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        icon={<FontAwesomeIcon icon={faLock} />}
        placeholder="Repeat Password"
        type="password"
        wrapperClassName="mt-2.5"
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm")}
      />
      <Button
        type="submit"
        className="w-5/6 mx-auto rounded-[50px] text-lg py-0 h-[70px] leading-5 mt-9 !bg-black"
        loading={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
}
