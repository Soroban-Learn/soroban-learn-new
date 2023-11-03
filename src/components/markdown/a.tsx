import { NormalComponents } from 'react-markdown/lib/complex-types';

export const A: NormalComponents['a'] = ({ children, href }) => (
  <a href={href} className="underline" target="_blank" rel="noreferrer">
    {children}
  </a>
);
