import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/pro-regular-svg-icons";

// Components
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface RegistrationProps {
  goBack: () => void;
}

export const RegistrationHelper: FC<RegistrationProps> = ({ goBack }) => (
  <div
    className="flex justify-center items-center text-lg"
    onClick={goBack}
  >
    <FontAwesomeIcon icon={faArrowLeft} />
    <div className="ml-5 cursor-pointer">Go back</div>
  </div>
)

export const Registration = () => (
  <div className="w-full bg-white rounded-[10px] pt-14 pb-12 relative text-center px-12">
    <div className="text-2xl text-light-gray mb-12">
      Let’s get started!
    </div>
    <div className="grid grid-cols-2 gap-11">
      <Input placeholder="First" icon={<FontAwesomeIcon icon={faUser} />} />
      <Input placeholder="Last" />
    </div>
    <Input
      icon={<FontAwesomeIcon icon={faEnvelope} />}
      placeholder="E-mail"
      wrapperClassName="mt-2.5"
    />
    <Input
      icon={<FontAwesomeIcon icon={faLock} />}
      placeholder="Password"
      type="password"
      wrapperClassName="mt-2.5"
    />
    <Input
      icon={<FontAwesomeIcon icon={faLock} />}
      placeholder="Repeat Password"
      type="password"
      wrapperClassName="mt-2.5 mb-9"
    />
    <Button className="w-5/6 mx-auto rounded-[50px] text-lg py-6 leading-5">
      Create Account
    </Button>
  </div>
);
