import cx from "classnames";
import Image from "next/image";

// Assets
import Logo from "@/assets/images/logo-purple.png";

const AuthLogo = () => (
  <div className={cx(
    "w-[108px] h-[108px] absolute -top-12 left-0 right-0 bg-white rounded-full",
    "flex justify-center items-center mx-auto",
  )}>
    <Image src={Logo} width={72} height={72} alt="Logo" />
  </div>
);

export default AuthLogo;
