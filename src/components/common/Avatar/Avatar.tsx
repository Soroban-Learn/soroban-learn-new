import type { FC } from "react";
import Image, { StaticImageData, type ImageProps } from "next/image";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface AvatarProps extends Omit<ImageProps, 'alt' | 'src'> {
  src?: StaticImageData;
}

const Avatar: FC<AvatarProps> = ({ src, className, ...otherProps }) => (
  <>
    {src && (
      <Image
        src={src}
        width={40}
        height={40}
        alt="Avatar"
        className={cx(
          'rounded-full object-cover',
          className,
        )}
        {...otherProps}
      />
    )}
    {!src && (
      <div
        className={cx(
          'w-10 h-10 bg-dark-gray rounded-full flex justify-center items-center',
          className,
        )}
        {...otherProps}
      >
        <FontAwesomeIcon icon={faUser} className="text-lg" />
      </div>
    )}
  </>
);

export default Avatar;
