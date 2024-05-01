"use client";

import { FC } from "react";

import Header from "@/components/Header";
import { HelpPageSidebar } from "@/components/HelpPageSidebar";
import { HelpTopButtonList } from "@/components/HelpTopButtonList";
import { HelpPageContentWrapper } from "@/containers/help/ContentWrapper";
import { HelpPageTutorSpotlight } from "@/components/HelpPageTutorSpotlight";
import { HelpPageLatestNews } from "@/components/HelpPageLatestNews";

import {
  helpPageSettingsItems,
  helpTopBlockItems,
} from "@/constants/mockData/helpPage";

const HelpPage: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row pl-[100px] pr-[160px] pt-[56px]">
        <HelpPageSidebar items={helpPageSettingsItems} />

        <HelpPageContentWrapper>
          <HelpTopButtonList items={helpTopBlockItems} />
          <HelpPageTutorSpotlight />
          <HelpPageLatestNews />
        </HelpPageContentWrapper>
      </div>
    </div>
  );
};

export default HelpPage;
