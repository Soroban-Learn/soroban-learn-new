import type { FC, PropsWithChildren } from "react";
import type {
  ElementPropsWithElementRef,
  ElementPropsWithElementRefAndRenderer,
} from "react-scrollbars-custom/dist/types/types";
import { useRef } from "react";
import ReactScrollbar from "react-scrollbars-custom";

const TrackY: FC<ElementPropsWithElementRef<HTMLDivElement>> = (props) => {
  const { elementRef, ...restProps } = props;
  return <span {...restProps} ref={elementRef} className="!bg-black !rounded-md !w-1" />;
}

const ThumbY: FC<ElementPropsWithElementRef<HTMLDivElement>> = (props) => {
  const { elementRef, ...restProps } = props;
  return <span {...restProps} ref={elementRef} className="!bg-white !w-full !block !rounded-md" />;
}

interface ScrollbarProps {
  className?: string;
  scrollerProps?: ElementPropsWithElementRefAndRenderer;
}

const Scrollbar: FC<PropsWithChildren<ScrollbarProps>> = ({
  children,
  className,
  scrollerProps,
}) => (
  <ReactScrollbar
    disableTracksWidthCompensation
    trackYProps={{
      renderer: TrackY,
    }}
    thumbYProps={{
      renderer: ThumbY,
    }}
    className={className}
    scrollerProps={scrollerProps}
  >
    <div className="pr-4">
      {children}
    </div>
  </ReactScrollbar>
);

export default Scrollbar;
