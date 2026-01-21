import React from "react";
import { IconProps, IconVariants } from "./types";

export interface BasedIconProps extends IconProps {
  children?: React.ReactNode;
}

const BasedIcon: React.FC<BasedIconProps> = ({
  className,
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  fill = "none",
  style,
  animated = false,
  animationDuration = "300ms",
  animationDelay = "0s",
  onAnimationEnd,
  children,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      style={{
        ...style,
        ...(animated && {
          animation: `fadeIn ${animationDuration} ease-in-out ${animationDelay} forwards`,
        }),
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </svg>
  );
};

export default BasedIcon;
export { IconVariants };
