import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react"
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-regular-svg-icons";

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label?: string;
  loading?: boolean;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  label,
  loading,
  disabled,
  ...otherProps
}) => (
  <button
    className={cx(
      "bg-primary flex justify-center items-center px-10 py-3",
      {
        'opacity-70': disabled || loading,
      },
      className,
    )}
    disabled={disabled || loading}
    {...otherProps}
  >
    {!loading && (children || label)}
    {loading && (
      <FontAwesomeIcon
        className="animate-spin text-2xl"
        icon={faSpinnerThird}
      />
    )}
  </button>
);

export default Button;
