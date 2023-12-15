import { FC } from "react";

import Image from "next/image";

import SelectedSidebarItemDotIcon from "@/assets/images/selectedSidebarItemDot.svg";

import styles from "./styles.module.scss";

export const SelectedSidebarItemDot: FC = () => {
  return (
    <Image
      src={SelectedSidebarItemDotIcon}
      alt="SelectedSidebarItemDotIcon"
      width={80}
      height={80}
      className={styles.selectedDotWrapper}
    />
  );
};
