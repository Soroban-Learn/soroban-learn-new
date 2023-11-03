import { NormalComponents } from 'react-markdown/lib/complex-types';

export const P: NormalComponents['p'] = ({ children, ...otherProps }) =>
  <p className="text-base leading-snug my-2" {...otherProps}>{children}</p>;
