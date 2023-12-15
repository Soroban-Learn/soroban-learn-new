import { FC } from "react";

import styles from "./styles.module.scss";

interface IProps {
  title: string;
  bg?: string;
  color?: string;
}

export const Chip: FC<IProps> = ({ title, color, bg }) => {
  return (
    <div className={styles.wrapper} style={{ background: bg }}>
      <span className={styles.text} style={{ color: color }}>
        {title}
      </span>
    </div>
  );
};
