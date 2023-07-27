import { NormalComponents } from 'react-markdown/lib/complex-types';

export const P: NormalComponents['p'] = ({ children, ...otherProps }) =>
  <p className="text-sm leading-snug my-2" {...otherProps}>{children}</p>;
