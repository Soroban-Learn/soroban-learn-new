import React, { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

export const HelpPageContentWrapper: FC<IProps> = ({ children }) => {
  return <div className="w-3/4">{children}</div>;
};
