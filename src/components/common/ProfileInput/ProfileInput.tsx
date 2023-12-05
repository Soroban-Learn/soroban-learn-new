import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  ReactElement,
  forwardRef,
} from 'react';
import cx from 'classnames';

interface InputProps extends ComponentPropsWithRef<'input'> {
  wrapperProps?: ComponentPropsWithRef<'div'>;
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
    <div className={cx('flex flex-col flex-1', wrapperClassName)} {...wrapperProps}>
      <div className='flex gap-2 items-center'>
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <label
            htmlFor='first-name'
            className='text-zinc-100 text-xs font-normal leading-none '
          >
            {label}
          </label>
        </div>
      </div>
      <input
        ref={ref}
        autoComplete='off'
        className='px-4 py-2 rounded-md border border-neutral-500 text-zinc-100 text-base font-normal leading-7 bg-transparent mt-2'
        {...otherProps}
      />
      {error && (
        <div className='text-error text-left pt-1 text-sm'>{error}</div>
      )}
    </div>
  );
};

export default forwardRef(ProfileInput);