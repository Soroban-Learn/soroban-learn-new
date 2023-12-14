"use client";

import { FC } from "react";

import Header from "@/components/Header";
import { HelpPageSidebar } from "@/components/HelpPageSidebar";

import OverviewIcon from "@/assets/images/list.svg";
import OpenRequestsIcon from "@/assets/images/message.svg";
import RequestHistoryIcon from "@/assets/images/history.svg";
import SettingsIcon from "@/assets/images/cogs.svg";

import INeedTutorIcon from "@/assets/images/chalkboard-teacher.svg";
import ImStuck from "@/assets/images/tagIcon.svg";
import INeedCodeReview from "@/assets/images/gitReviewIcon.svg";

import { IHelpPageSidebarItem, IHelpPageTopBlockItem } from "@/types/HelpPage";
import { HelpTopButton } from "@/components/HelpTopBlock";
import { HelpTopButtonList } from "@/components/HelpTopButtonList";

const helpPageSettingsItems: IHelpPageSidebarItem[] = [
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

const helpTopBlockItems: IHelpPageTopBlockItem[] = [
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

const HelpPage: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row">
        <HelpPageSidebar items={helpPageSettingsItems} />
        <HelpTopButtonList items={helpTopBlockItems} />
      </div>
    </div>
  );
};

export default HelpPage;
