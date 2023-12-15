import { FC, useState } from "react";

import { IHelpPageSidebarItem } from "@/types/HelpPage";

import { HelpPageSidebarItem } from "../HelpPageSidebarItem";

interface IProps {
  items: IHelpPageSidebarItem[];
}

export const HelpPageSidebar: FC<IProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<IHelpPageSidebarItem>();

  function onItemClick(item: IHelpPageSidebarItem) {
    setSelectedItem(item);
  }

  return (
    <div className="w-1/4 pt-[18px] h-full flex flex-col space-y-[40px]">
      {items.map((item, index) => (
        <HelpPageSidebarItem
          key={index}
          item={item}
          isSelected={item.title === selectedItem?.title}
          onClick={() => onItemClick(item)}
          isHR={index === items.length - 2}
        />
      ))}
    </div>
  );
};
