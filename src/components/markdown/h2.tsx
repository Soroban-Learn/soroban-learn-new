import type { FC } from "react";
import { HeadingProps } from "react-markdown/lib/ast-to-react";

export const H2: FC<HeadingProps> = ({ children }) => (
  <h2 className="text-white text-2xl font-bold mb-6 mt-6">{children}</h2>
);
