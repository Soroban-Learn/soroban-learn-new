import { FC } from "react";

import { NewsCard } from "../NewsCard";

import { helpPageNewsItems } from "@/constants/mockData/helpPage";

import styles from "./styled.module.scss";

export const HelpPageLatestNews: FC = () => {
  return (
    <div className={styles.wrapper}>
      <span className="text-3xl">Latest News</span>

      <div className={styles.cardsContainer}>
        {helpPageNewsItems.map((newsItem, idx) => (
          <NewsCard
            key={idx}
            image={newsItem.image}
            text={newsItem.text}
            date={newsItem.date}
            link={newsItem.link}
          />
        ))}
      </div>
    </div>
  );
};
