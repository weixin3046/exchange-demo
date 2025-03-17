import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function TradeLayout() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 12, h: 4 },
    { i: "b", x: 4, y: 0, w: 4, h: 4 },
    { i: "c", x: 0, y: 4, w: 2, h: 4 },
    { i: "d", x: 2, y: 4, w: 2, h: 4 },
  ];
  const handleChangeLayout = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log(currentLayout, allLayouts);
    // 数据保存在本地
  };
  return (
    <div style={{ margin: "50px" }}>
      <h1>React Grid Layout Demo</h1>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }} // 定义布局
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }} // 每行的列数
        rowHeight={60} // 每行的高度
        width={1200} // 网格的宽度
        isResizable={true} // 允许调整大小
        isDraggable={true} // 允许拖动
        draggableHandle=".drag-handle"
        onLayoutChange={handleChangeLayout}
      >
        <div key="a" className="relative rounded border border-black p-5 shadow-2xl">
          <div className="drag-handle absolute top-1.5 right-1.5 z-10 cursor-move">🔧</div>
          <h3>Box A</h3>
        </div>
        <div key="b" className="relative rounded border border-black p-5 shadow-2xl">
          <div className="drag-handle absolute top-1.5 right-1.5 z-10 cursor-move">🔧</div>
          <h3>Box B</h3>
        </div>
        <div key="c" className="relative rounded border border-black p-5 shadow-2xl">
          <div className="drag-handle absolute top-1.5 right-1.5 z-10 cursor-move">🔧</div>
          <h3> Box C</h3>
        </div>
        <div key="d" className="relative rounded border border-black p-5 shadow-2xl">
          <div className="drag-handle absolute top-1.5 right-1.5 z-10 cursor-move">🔧</div>
          <h3>Box D</h3>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
