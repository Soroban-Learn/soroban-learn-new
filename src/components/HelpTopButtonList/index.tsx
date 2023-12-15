import { FC } from "react";

import { IHelpPageTopBlockItem } from "@/types/HelpPage";

import { HelpTopButton } from "../HelpTopBlock";

import styles from "./styles.module.scss";

interface IProps {
  items: IHelpPageTopBlockItem[];
}

export const HelpTopButtonList: FC<IProps> = ({ items }) => {
  return (
    <div className={styles.listWrapper}>
      {items.map((item, idx) => (
        <HelpTopButton key={idx} item={item} />
      ))}
    </div>
  );
};
