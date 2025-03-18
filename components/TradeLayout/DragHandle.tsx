import React, { ReactNode } from "react";

interface DragHandleProps {
  children: ReactNode;
}

const DragHandle: React.FC<DragHandleProps> = ({ children }) => {
  return <div className={`drag-handle flex h-12 cursor-move items-center rounded bg-gray-600 px-2`}>{children}</div>;
};

export default DragHandle;
