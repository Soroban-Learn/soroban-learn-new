import type {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react';
import cx from 'classnames';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label?: string;
  loading?: boolean;
  icon?: ReactElement;
  customBgColor?: string;
  nextIcon?:ReactElement;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  label,
  loading,
  disabled,
  icon,
  customBgColor = 'bg-primary', 
  nextIcon,
  ...otherProps
}) => (
  <button
    className={cx(
      'flex justify-center items-center px-10 py-3',
      {
        'opacity-70': disabled || loading,
      },
      customBgColor, 
      className
    )}
    disabled={disabled || loading}
    {...otherProps}
  >
    <div className='flex items-center gap-3'>
      {icon && <div className='flex items-center'>{icon}</div>}
      {!loading && (children || label)}
      {nextIcon && <div className='flex items-center'>{nextIcon}</div>}
    </div>
    {loading && <i className='animate-spin text-2xl fa fa-spinner-third' />}
  </button>
);

export default Button;