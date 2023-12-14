import { FC } from "react";

import { IHelpPageTopBlockItem } from "@/types/HelpPage";

import Image from "next/image";

interface IProps {
  item: IHelpPageTopBlockItem;
}

export const HelpTopButton: FC<IProps> = ({ item }) => {
  return (
    <button className={`${item.color} w-full h-[94px]`}>
      <div
        className={`flex flex-row space-x-4 items-center bg-[${item.color}]`}
      >
        {item.icon && <Image src={item.icon} alt="icon" />}
        {item.title && <span className="text-xl">{item.title}</span>}
      </div>
    </button>
  );
};
