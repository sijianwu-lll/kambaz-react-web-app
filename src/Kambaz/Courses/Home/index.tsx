import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      {/* 左侧：Modules，自动填满，右边留点间距 */}
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* 右侧：状态栏，仅在 xl 屏幕及以上可见 */}
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
