import type { ComponentPropsWithoutRef, FC } from "react";
import { useMemo } from "react";
import cx from "classnames";

export interface ProgressProps extends ComponentPropsWithoutRef<'div'> {
  percentComplete: number;
  label?: string;
}

const Progress: FC<ProgressProps> = ({ percentComplete , label, ...otherProps }) => {

  // Keep the progress value in the range from 0 to 100
  const progressValue = useMemo(() => {
    if (percentComplete  > 100) {
      return 100;
    } else if (percentComplete  < 0) {
      return 0;
    }
    return percentComplete ;
  }, [percentComplete ]);

  return (
    <div
      className="bg-[#0A0A0A] relative h-11 flex justify-end items-center overflow-hidden rounded-tr-[10px]"
      {...otherProps}
    >
      <div
        className={cx(
          'absolute top-0 left-0 h-full',
          'bg-[#5546FF] flex justify-end items-center font-bold',
          'transition-all duration-500 ease-in-out',
        )}
        style={{ width: `${progressValue}%` }}
      >
        {progressValue > 10 && <span className="pr-3">{progressValue}%</span>}
      </div>
      {label && (
        <div className="text-[#5F5F5F] pr-3.5">{label}</div>
      )}
    </div>
  );
}

export default Progress;
