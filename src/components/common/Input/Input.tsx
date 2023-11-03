import type { ComponentPropsWithRef, FC, ReactElement } from "react";
import cx from "classnames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  wrapperProps?: ComponentPropsWithRef<"div">,
  wrapperClassName?: string;
  icon?: ReactElement,
}

const Input: FC<InputProps> = ({
  wrapperProps,
  wrapperClassName,
  className,
  icon,
  ...otherProps
}) => (
  <div
    className={cx(
      "border-b border-solid border-light-gray2",
      "grid grid-cols-input pb-4 pt-4 text-light-gray",
      {
        "grid-cols-input": icon,
        "grid-cols-1": !icon,
      },
      wrapperClassName,
    )}
    {...wrapperProps}
  >
    {icon && (
      <div className="flex justify-start items-center">
        {icon}
      </div>
    )}
    <input
      className={cx(
        "outline-none text-lg leading-5",
        className,
      )}
      {...otherProps}
    />
  </div>
);

export default Input;
