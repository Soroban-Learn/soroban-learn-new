import cx from 'classnames';
import Image, { StaticImageData } from 'next/image';

import React, { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  photo: StaticImageData;
  height?: number;
  width?: number;
}

const ModalLogo: React.FC<Props> = ({ photo, height, width, className }) => (
  <div
    className={cx(
      'w-[108px] h-[108px] absolute -top-12 left-0 right-0 bg-white rounded-full',
      'flex justify-center items-center mx-auto',
      className
    )}
  >
    <Image src={photo} width={width} height={height} alt='Logo' />
  </div>
);

export default ModalLogo;
