import type { ComponentPropsWithRef, ForwardRefRenderFunction, ReactElement } from "react";
import { forwardRef } from "react";
import cx from "classnames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  wrapperProps?: ComponentPropsWithRef<"div">,
  wrapperClassName?: string;
  icon?: ReactElement;
  error?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref,
) => {
  const {
    wrapperProps,
    wrapperClassName,
    className,
    icon,
    error,
    ...otherProps
  } = props;

  return (
    <>
      <div
        className={cx(
          "border-b border-solid border-light-gray2",
          "grid grid-cols-input pb-4 pt-4 text-light-gray",
          {
            "grid-cols-input": icon,
            "grid-cols-1": !icon,
          },
          wrapperClassName
        )}
        {...wrapperProps}
      >
        {icon && (
          <div
            className={cx("flex justify-start items-center", {
              "text-error": !!error,
            })}
          >
            {icon}
          </div>
        )}
        <input
          className={cx(
            "outline-none text-lg leading-3",
            {
              "text-error": !!error,
            },
            className
          )}
          ref={ref}
          autoComplete="off"
          {...otherProps}
        />
      </div>
      {error && (
        <div className="text-error text-left pt-1 text-sm">{error}</div>
      )}
    </>
  );
}

export default forwardRef(Input);
