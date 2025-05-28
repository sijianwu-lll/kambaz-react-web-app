import './Classes.css';

export default function Classes() {
  const color = 'blue';
  const dangerous = true;

  return (
    <div id="wd-classes">
      <h2>Classes</h2>

      {/* 静态类名 */}
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>

      {/* 动态构建类名 */}
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>

      {/* 条件选择类名 */}
      <div
        className={`${
          dangerous ? 'wd-bg-red' : 'wd-bg-green'
        } wd-fg-black wd-padding-10px`}
      >
        Dangerous background
      </div>

      <hr />
    </div>
  );
}
