import { Inter } from 'next/font/google';
import { IBM_Plex_Sans } from 'next/font/google';

import './globals.css';
import LayoutProviders from './layoutProviders';

const inter = Inter({ subsets: ['latin'] });
const imbplexsans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Soroban Learn',
  description:
    'Become a smart contract developer on Soroban! Bite sized courses and a learn at your own pace approach.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://pro.fontawesome.com/releases/v5.15.4/css/all.css'
          integrity='sha384-rqn26AG5Pj86AF4SO72RK5fyefcQ/x32DNQfChxWvbXIyXFePlEktwD18fEz+kQU'
          crossOrigin='anonymous'
        />
      </head>
      <body className={imbplexsans.className}>
        <div className='w-full text-center py-3 bg-primary fixed z-50'>
          This currently serves as a testing ground. Things may break and the
          database resets often.
        </div>
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
