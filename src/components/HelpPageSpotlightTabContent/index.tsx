import { FC } from "react";

import { HelpPageSpotlightCard } from "../HelpPageSpotlightCard";

import styles from "./styles.module.scss";
import { ISpotlightUserReview } from "@/types/HelpPage";

interface IProps {
  reviews: ISpotlightUserReview[];
}

export const HelpPageSpotlightTabContent: FC<IProps> = ({ reviews }) => {
  return (
    <div className={styles.wrapper}>
      {reviews.map((review, idx) => (
        <HelpPageSpotlightCard
          key={idx}
          avatar={review.avatar}
          username={review.name}
          rating={review.rating}
          text={review.text}
          reviews={review.reviews}
        />
      ))}
    </div>
  );
};
