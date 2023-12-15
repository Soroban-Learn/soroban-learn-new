import { FC } from "react";

import PlayVideoIcon from "@/assets/images/playVideoIcon.svg";

import Image from "next/image";

import styles from "./styles.module.scss";

interface IProps {
  time: string;
  onCLick: () => void;
}

export const PlayVideoLessonButton: FC<IProps> = ({ time, onCLick }) => {
  return (
    <button onClick={onCLick} className={styles.wrapper}>
      <Image src={PlayVideoIcon} alt="playVideoButton" />
      <p>
        Play <b>Video Lesson</b>
      </p>
      <p className={styles.time}>{time}</p>
    </button>
  );
};
