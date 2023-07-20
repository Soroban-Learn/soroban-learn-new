import { type FC, type MouseEvent, useCallback } from "react";
import Image from "next/image";
import cx from "classnames";

// Assets
import Times from '@/assets/images/times.svg';

export interface Tab {
  title: string;
  key: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTabKey: string;
  setActiveTabKey: (key: string) => void;
  onTabClose?: (key: string) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, activeTabKey, setActiveTabKey, onTabClose }) => {
  const changeKey = useCallback((key: string) => setActiveTabKey(key), [setActiveTabKey]);

  const close = useCallback((key: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onTabClose) {
      onTabClose(key);
    }
  }, [onTabClose]);

  return (
    <div className="flex">
      {tabs.map((tab, index) => (
        <div
          key={tab.key}
          className={cx(
            'rounded-tr-[0.625rem] font-medium',
            'min-w-[10rem] max-w-[16rem] h-12 cursor-pointer',
            'flex justify-center items-center',
            'relative mr-2 px-3.5 last:mr-0',
            'ease-linear duration-50',
            {
              'rounded-tl-[0.625rem]': index !== 0,
              'bg-[#232323]': activeTabKey === tab.key,
              'bg-[#23232380]': activeTabKey !== tab.key,
              'border border-solid border-[#232323] border-b-0': activeTabKey !== tab.key,
            }
          )}
          onClick={() => changeKey(tab.key)}
        >
          <span className={cx(
            'max-w-[160px] overflow-hidden whitespace-nowrap',
            {
              'opacity-50': activeTabKey !== tab.key,
            }
          )}>
            {tab.title}
          </span>
          {!!onTabClose && (
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => close(tab.key, e)}
              className="pl-4 opacity-50 hover:opacity-100 relative z-20"
            >
              <Image src={Times} alt="close" />
            </button>
          )}
          {tab.title.length > 20 && (
            <div
              className={cx(
                'absolute -top-px -right-px h-full w-20 z-10',
                'bg-gradient-to-r from-[#11111100] to-[#111111] rounded-tr-[0.625rem]',
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
