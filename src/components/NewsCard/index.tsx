import { FC } from "react";

import Image from "next/image";

import { IHelpPageNewsItem } from "@/types/HelpPage";

import ArrowIcon from "@/assets/images/arrow-up-right.svg";

import { Chip } from "../common/Chip";

import styles from "./styles.module.scss";

interface IProps extends IHelpPageNewsItem {}

export const NewsCard: FC<IProps> = ({ image, text, link, date }) => {
  return (
    <div className={styles.wrapper}>
      <Image src={image} alt="img" className="w-2/5" />
      <div className="w-3/5 p-4">
        <div>
          <Chip title="News" />
          <p className="text-xl mt-2">{text}</p>
        </div>

        <div className="flex flex-row justify-between pt-4">
          <p className="text-stone-600 text-xs">{date}</p>
          <a
            href={link}
            className="text-xs cursor-pointer flex flex-row space-x-2"
          >
            Read more
            <Image
              color="white"
              height={12}
              width={12}
              src={ArrowIcon}
              alt="ArrowIcon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
