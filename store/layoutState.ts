import { DEFAULT_LAYOUTS } from "@/constants";
import { Layouts } from "react-grid-layout";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  layouts: Layouts;
  setLayouts: (layouts: Layouts) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layouts: DEFAULT_LAYOUTS, // 初始布局
      setLayouts: (layouts) => set({ layouts }), // 更新布局
    }),
    {
      name: "grid-layouts", // 存储到 localStorage 的 key
    }
  )
);
