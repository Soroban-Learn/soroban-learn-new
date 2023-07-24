import type { FC, ReactNode, PropsWithChildren } from "react";
import { useCallback, useRef, useState } from "react";
import cx from "classnames";

// Hooks
import { useClickOutside } from "@/hooks";

interface DropdownOption {
  icon: ReactNode,
  label: string;
  onClick?: () => void;
}

export interface DropdownProps {
  options: DropdownOption[];
  className?: string;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  options,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const handleButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleOptionClick = useCallback(
    (option: DropdownOption) => {
      if (option.onClick) {
        option.onClick();
      }
      handleButtonClick();
    },
    [handleButtonClick],
  );

  useClickOutside(ref, closeDropdown);

  return (
    <div className="relative" ref={ref}>
      <button
        className={cx('p-0 m-0 bg-transparent', className)}
        onClick={handleButtonClick}
      >
        {children}
      </button>
      <div
        className={cx(
          'w-48 bg-gradient-to-r from-[#5d5d5d] to-[#4d4d4d] rounded-xl',
          'absolute -right-5 top-full mt-8 z-20',
          'transition-all duration-200 ease-out',
          {
            'opacity-0 scale-90 -translate-y-5 invisible': !isOpen,
            'opacity-100 scale-100 translate-y-0': isOpen,
          }
        )}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={cx(
              'h-16 flex justify-start items-center cursor-pointer hover:opacity-60',
              'transition-all duration-150 ease-linear',
              'border-t border-[#7D7D7D] border-solid first:border-transparent',
            )}
            onClick={() => handleOptionClick(option)}
          >
            <div className="w-16 flex justify-center items-center">
              {option.icon}
            </div>
            <span>{option.label}</span>
          </div>
        ))}
        <div
          className={cx(
            'absolute -top-[0.7rem] right-4 w-0 h-0',
            'border-solid border-t-0 border-x-[0.8rem] border-b-[0.8rem]',
            'border-x-transparent border-t-transparent border-b-[#4d4d4d]',
          )}
        />
      </div>
    </div>
  );
}

export default Dropdown;
