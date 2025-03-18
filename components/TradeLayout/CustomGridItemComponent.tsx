import { forwardRef } from "react";

interface CustomGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
}

const CustomGridItemComponent = forwardRef<HTMLDivElement, CustomGridItemProps>(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ ...style, position: "relative" }} // 确保 react-grid-layout 正确计算位置
        className={`custom-grid-item ${className || ""}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <div className="drag-handle absolute top-1.5 right-1.5 z-10 cursor-move">🔧</div>
        {children}
        {/* 添加 resizable 句柄 */}
        {/* <ResizeHandle handleAxis="s" /> */}
        {/* <span className="react-resizable-handle react-resizable-handle-s absolute bottom-0 h-[3px] w-full cursor-ns-resize bg-gray-100" /> */}
      </div>
    );
  }
);
CustomGridItemComponent.displayName = "CustomGridItemComponent";
export default CustomGridItemComponent;
