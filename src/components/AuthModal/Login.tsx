import type { FC } from "react";
import Image from "next/image";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/pro-regular-svg-icons";

// Assets
import Logo from "@/assets/images/logo-purple.png";

// Components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface LoginHelperProps {
  goToRegister: () => void;
}

export const LoginHelper: FC<LoginHelperProps> = ({ goToRegister }) => (
  <div className="text-lg">
    Don’t have an account?{` `}
    <span className="underline font-bold cursor-pointer" onClick={goToRegister}>
      Create one
    </span>
  </div>
);

export const Login = () => (
  <div className="w-full bg-white rounded-[10px] pt-12 pb-9 relative text-center px-12">
    <div className={cx(
      "w-[108px] h-[108px] absolute -top-16 left-0 right-0 bg-white rounded-full",
      "flex justify-center items-center mx-auto",
    )}>
      <Image src={Logo} width={72} height={72} alt="Logo" />
    </div>
    <div className="text-[32px] text-dark-gray mb-8">Welcome back</div>
    <Button className="w-full rounded-[50px] text-lg py-6 leading-5">
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
    </div>
    <Input
      placeholder="E-mail"
      icon={<FontAwesomeIcon icon={faEnvelope} />}
    />
    <Input
      placeholder="Password"
      wrapperClassName="mt-7"
      type="password"
      icon={<FontAwesomeIcon icon={faLock} />}
    />
    <div className="my-7 text-primary cursor-pointer">Forgot Password?</div>
    <Button className="w-full rounded-[50px] text-lg py-6 leading-5 !bg-black">
      Log in with account
    </Button>
  </div>
);
