import { EllipsisVertical } from "lucide-react";
import React, { ReactNode } from "react";

interface DragHandleProps {
  children: ReactNode;
}

const DragHandle: React.FC<DragHandleProps> = () => {
  return (
    <div className={`drag-handle absolute top-0 right-0 flex h-12 cursor-move items-center rounded px-1`}>
      <EllipsisVertical />
    </div>
  );
};

export default DragHandle;
