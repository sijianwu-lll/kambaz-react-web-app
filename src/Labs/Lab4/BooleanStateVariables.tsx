import React, { useState } from "react";

export default function BooleanStateVariables() {
  const [done, setDone] = useState(true);

  return (
    <div id="wd-boolean-state-variables">
      <h2>Boolean State Variables</h2>

      {/* 状态显示文本 */}
      <p>{done ? "Done" : "Not done"}</p>

      {/* Checkbox 控制布尔状态 */}
      <label className="form-control">
        <input
          type="checkbox"
          checked={done}
          onChange={() => setDone(!done)} // 切换 true/false
        />
        {" "}Done
      </label>

      {/* 条件渲染提示内容 */}
      {done && (
        <div className="alert alert-success">
          Yay! You are done
        </div>
      )}

      <hr />
    </div>
  );
}
