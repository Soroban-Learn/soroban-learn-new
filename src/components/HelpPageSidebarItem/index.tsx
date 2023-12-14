import { FC } from "react";

import Image from "next/image";

import cx from "classnames";

import { IHelpPageSidebarItem } from "@/types/HelpPage";

import { SelectedSidebarItemDot } from "../SelectedSidebarItemDot";

import styles from "./styles.module.scss";

interface IProps {
  item: IHelpPageSidebarItem;
  isSelected: boolean;
  onClick: () => void;
  isHR?: boolean;
}

export const HelpPageSidebarItem: FC<IProps> = ({
  item,
  isSelected,
  onClick,
  isHR = false,
}) => {
  return (
    <div className={"max-w-[222px] flex flex-col w-max items-start"}>
      <p
        onClick={onClick}
        className={"flex flex-row items-center space-x-2 cursor-pointer"}
      >
        {isSelected ? <SelectedSidebarItemDot /> : <p className="w-[20px]" />}
        <p className="flex flex-row items-center space-x-[30px]">
          <Image src={item.icon} alt={item.icon} />
          <span className={cx({ "font-bold": isSelected })}>{item.title}</span>
        </p>
      </p>

      {isHR && <hr className={styles.hr} />}
    </div>
  );
};
