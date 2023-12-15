import { FC, useState } from "react";

import { HelpSpotlightNavTab } from "../HelpSpotlightNavTab";
import { HelpPageSpotlightTabContent } from "../HelpPageSpotlightTabContent";

import AlienAvatarSpotlight from "@/assets/images/alienAvatar.png";
import ChadAvatarSpotlight from "@/assets/images/ChadAvatar.png";
import JosueAvatarSpotlight from "@/assets/images/JosueAvatar.png";

import styles from "./styles.module.scss";
import { ISpotlightUserReview } from "@/types/HelpPage";

const helpPageSpotlightTabs = ["Featured", "Favorite"];

const helpSpotlightUsersReviews: ISpotlightUserReview[] = [
  {
    avatar: AlienAvatarSpotlight,
    name: "Silence",
    text: "Web3 dev with 10+ years of experience",
    rating: "4.9",
    reviews: 43,
  },
  {
    avatar: ChadAvatarSpotlight,
    name: "Chad",
    text: "Senior developer with decades of experience in multiple fields",
    rating: "4.9",
    reviews: 43,
  },
  {
    avatar: JosueAvatarSpotlight,
    name: "Josue Soto",
    text: "Game Developer & Tech Lead",
    rating: "4.9",
    reviews: 43,
  },
  {
    avatar: AlienAvatarSpotlight,
    name: "Silence",
    text: "Web3 dev with 10+ years of experience",
    rating: "4.9",
    reviews: 43,
  },
];

export const HelpPageTutorSpotlight: FC = () => {
  const [selectedTab, setSelectedTab] = useState(helpPageSpotlightTabs[0]);

  function onTabCLick(item: string) {
    setSelectedTab(item);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBlock}>
        <span className={styles.title}>Tutor Spotlight</span>
        <button className={styles.buttonExploreTutors}>Explore Tutors</button>
      </div>

      <div className="pt-[30px] flex flex-row">
        {helpPageSpotlightTabs.map((item, idx) => (
          <HelpSpotlightNavTab
            onClick={() => onTabCLick(item)}
            key={idx}
            title={item}
            isSelected={selectedTab === item}
          />
        ))}
      </div>
      <HelpPageSpotlightTabContent reviews={helpSpotlightUsersReviews} />
    </div>
  );
};
