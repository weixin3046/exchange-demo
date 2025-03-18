import React from "react";

interface ResizeHandleProps {
  handleAxis: string; // 方向，如 "s", "e", "se"
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ handleAxis }) => {
  return (
    <span
      className={`custom-resize-handle custom-resize-handle-${handleAxis} absolute h-[3px] w-full cursor-ns-resize bg-gray-100`}
    />
  );
};

export default ResizeHandle;
