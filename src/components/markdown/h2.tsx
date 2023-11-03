import type { FC } from "react";
import { HeadingProps } from 'react-markdown/lib/ast-to-react';

export const H2: FC<HeadingProps> = ({ children }) => (
  <h2 className="text-4xl font-semibold mb-6">{children}</h2>
);