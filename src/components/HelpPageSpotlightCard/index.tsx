import { FC } from "react";

import Image from "next/image";

import FullStarIcon from "@/assets/images/fullStar.svg";
import AlmostFullStarIcon from "@/assets/images/09Star.svg";

import styles from "./styles.module.scss";

interface IProps {
  avatar: any;
  username: string;
  text: string;
  rating: string;
  reviews: number;
}

export const HelpPageSpotlightCard: FC<IProps> = ({
  avatar,
  username,
  text,
  rating,
  reviews,
}) => {
  return (
    <div className={styles.withAvatarWrapper}>
      <Image src={avatar} alt="avatar" className={styles.avatar} />

      <div className={styles.wrapper}>
        <div className="pt-12 px-3">
          <span className={styles.userName}>{username}</span>
          <div className={styles.text}>{text}</div>
        </div>

        <hr
          style={{ height: "2px", backgroundColor: "#232323", border: "none" }}
        />

        <div className="px-3">
          <div className="flex flex-row space-x-2 mt-2">
            <Image src={FullStarIcon} alt="FullStarIcon" />
            <Image src={FullStarIcon} alt="FullStarIcon" />
            <Image src={FullStarIcon} alt="FullStarIcon" />
            <Image src={FullStarIcon} alt="FullStarIcon" />
            <Image src={AlmostFullStarIcon} alt="AlmostFullStarIcon" />
          </div>
          <div>
            <div className="flex flex-row items-center space-x-10 mt-1 text-stone-400 text-xs">
              <span className="flex flex-row">
                <p className="text-yellow-300">{rating}</p>/5
              </span>

              <span>{reviews} Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
