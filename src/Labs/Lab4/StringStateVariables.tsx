import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");

  return (
    <div>
      <h2>String State Variables</h2>

      {/* 实时显示输入内容 */}
      <p>{firstName}</p>

      {/* 表单输入框绑定 state */}
      <Form.Control
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your name"
        className="mb-2"
      />

      <hr />
    </div>
  );
}
