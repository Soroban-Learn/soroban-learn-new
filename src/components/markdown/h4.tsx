import type { FC } from "react";
import { HeadingProps } from 'react-markdown/lib/ast-to-react';

export const H4: FC<HeadingProps> = ({ children }) => (
  <h4 className="text-2xl font-bold leading-loose mt-4 mb-2">
    {children}
  </h4>
);
