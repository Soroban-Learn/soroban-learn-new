import { IHelpPageTopBlockItem } from "@/types/HelpPage";
import { FC } from "react";
import { HelpTopButton } from "../HelpTopBlock";

interface IProps {
  items: IHelpPageTopBlockItem[];
}

export const HelpTopButtonList: FC<IProps> = ({ items }) => {
  return (
    <div className="flex flex-row space-x-4 items-start">
      {items.map((item, idx) => (
        <HelpTopButton key={idx} item={item} />
      ))}
    </div>
  );
};
