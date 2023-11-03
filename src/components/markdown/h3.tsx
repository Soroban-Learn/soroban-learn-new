import type { FC } from "react";
import { HeadingProps } from 'react-markdown/lib/ast-to-react';

export const H3: FC<HeadingProps> = ({ children }) =>
  <h3 className="text-lg leading-loose">{children}</h3>;
