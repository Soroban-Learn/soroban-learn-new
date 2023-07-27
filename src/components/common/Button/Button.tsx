import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react"
import cx from "classnames";

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  label,
  ...otherProps
}) => (
  <button
    className={cx(
      "bg-primary flex justify-center items-center px-10 py-3",
      className,
    )}
    {...otherProps}
  >
    {children || label}
  </button>
);

export default Button;
