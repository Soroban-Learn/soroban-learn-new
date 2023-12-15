import {
  IHelpPageNewsItem,
  IHelpPageSidebarItem,
  IHelpPageTopBlockItem,
} from "@/types/HelpPage";

import NewsPic1 from "@/assets/images/newsPic1.png";
import NewsPic2 from "@/assets/images/newsPic2.png";
import NewsPic3 from "@/assets/images/newsPic3.png";
import NewsPic4 from "@/assets/images/newsPic4.png";

import OverviewIcon from "@/assets/images/list.svg";
import OpenRequestsIcon from "@/assets/images/message.svg";
import RequestHistoryIcon from "@/assets/images/history.svg";
import SettingsIcon from "@/assets/images/cogs.svg";

import INeedTutorIcon from "@/assets/images/chalkboard-teacher.svg";
import ImStuck from "@/assets/images/tagIcon.svg";
import INeedCodeReview from "@/assets/images/gitReviewIcon.svg";

export const helpPageNewsItems: IHelpPageNewsItem[] = [
  {
    image: NewsPic1,
    text: "Books are awesome, you should read them instead of this title.",
    date: "December 11, 2023",
    link: "",
  },
  {
    image: NewsPic2,
    text: "What are those? And why do we care?",
    date: "December 11, 2023",
    link: "",
  },
  {
    image: NewsPic3,
    text: "Short Title Gang",
    date: "December 11, 2023",
    link: "",
  },
  {
    image: NewsPic4,
    text: "Books are awesome, you should read them instead of this title.",
    date: "December 11, 2023",
    link: "",
  },
];

export const helpPageSettingsItems: IHelpPageSidebarItem[] = [
  {
    icon: OverviewIcon,
    title: "Overview",
  },
  {
    icon: OpenRequestsIcon,
    title: "Open Requests",
  },
  {
    icon: RequestHistoryIcon,
    title: "Request History",
  },
  {
    icon: SettingsIcon,
    title: "Settings",
  },
];

export const helpTopBlockItems: IHelpPageTopBlockItem[] = [
  {
    icon: INeedTutorIcon,
    title: "I need a tutor",
    color:
      "linear-gradient(313deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 59.89%, rgba(0, 0, 0, 0.00) 59.89%), #5546FF",
  },
  {
    icon: ImStuck,
    title: "I’m stuck on some code",
    color:
      "linear-gradient(286deg, rgba(255, 255, 255, 0.30) 5.82%, rgba(255, 255, 255, 0.00) 72.16%), #D2B71A",
  },
  {
    icon: INeedCodeReview,
    title: "I need my code reviewed",
    color:
      "linear-gradient(286deg, rgba(255, 255, 255, 0.30) 5.82%, rgba(255, 255, 255, 0.00) 72.15%, rgba(0, 0, 0, 0.00) 72.16%), #1C1B23",
  },
];
