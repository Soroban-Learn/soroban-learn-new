import type { FC } from "react";
import Image from "next/image";
import cx from "classnames";

// Assets
import WalletImg from "@/assets/images/wallet.png";
import Keys from "@/assets/images/keys.png";

// Components
import Button from "@/components/common/Button";

interface WalletHelperProps {
  goToLogin: () => void;
}

export const WalletHelper: FC<WalletHelperProps> = ({ goToLogin }) => (
  <div className="text-lg">
    No thanks,{` `}
    <span className="underline font-bold cursor-pointer" onClick={goToLogin}>
      I have an account
    </span>
  </div>
);

export const Wallet = () => (
  <div className="w-full bg-white rounded-[10px] py-8 pt-[137px] relative text-center px-24">
    <Image
      className="absolute top-3 left-1/2 -translate-x-1/2"
      width={139}
      height={139}
      src={WalletImg}
      alt=""
    />
    <div className="text-light-gray text-center text-[32px]">
      You’ll need a<span className="text-gray"> Stellar wallet </span>
      to continue.
    </div>
    <Button className="w-full mt-11 rounded-[50px] text-lg py-6 leading-5">
      <i className="fa fa-link" />
      <span className="ml-3">Link Wallet</span>
    </Button>
    <div
      className={cx(
        "border-b-2 border-solid border-primary text-primary",
        "flex justify-center items-center pb-4 mt-[60px] cursor-pointer"
      )}
    >
      <Image src={Keys} width={23} height={23} alt="" />
      <span className="text-lg font-bold ml-6">Download Freighter Wallet</span>
    </div>
    <div className="text-sm text-light-gray mt-7">
      Freighter is a non-custodial wallet extension that enables you to sign
      Stellar transactions via your browser.
    </div>
  </div>
);
