import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  ReactElement,
  forwardRef,
} from "react";
import cx from "classnames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  wrapperProps?: ComponentPropsWithRef<"div">;
  wrapperClassName?: string;
  icon?: ReactElement;
  error?: string;
  label: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ProfileInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {
    wrapperProps,
    wrapperClassName,
    className,
    icon,
    error,
    label,
    defaultValue,
    onChange,
    ...otherProps
  } = props;

  return (
    <div className="flex flex-col flex-1">
      <label
        htmlFor="first-name"
        className="text-zinc-100 text-xs font-normal leading-none mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        name="first-name"
        className="px-4 py-2 rounded-md border border-neutral-500 text-zinc-100 text-base font-normal leading-7 bg-transparent"
        defaultValue={defaultValue}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
};

export default forwardRef(ProfileInput);
