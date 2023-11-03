import { NormalComponents } from "react-markdown/lib/complex-types";

export const P: NormalComponents["p"] = ({ children, ...otherProps }) => (
  <p className="text-md leading-normal my-2" {...otherProps}>
    {children}
  </p>
);
