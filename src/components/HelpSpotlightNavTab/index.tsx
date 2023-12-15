import { FC } from "react";

import styles from "./styles.module.scss";

interface IProps {
  title: string;
  color?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const HelpSpotlightNavTab: FC<IProps> = ({
  title,
  color,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.tabWrapper}
      style={{ background: isSelected ? color : "none" }}
    >
      {title}
    </button>
  );
};
