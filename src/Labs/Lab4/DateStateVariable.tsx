import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());

  // 把 JS Date 转换为 HTML date 输入格式：YYYY-MM-DD
  const dateObjectToHtmlDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      {/* 原始 Date 对象 */}
      <h3>{JSON.stringify(startDate)}</h3>

      {/* 格式化后的日期 */}
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>

      {/* 日期选择器，默认值使用格式化后的字符串 */}
      <Form.Control
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        className="mb-2"
      />

      <hr />
    </div>
  );
}
