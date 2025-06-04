import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export default function ObjectStateVariable() {
  // 初始化对象状态，包含 name 和 age 两个字段
  const [person, setPerson] = useState({ name: "Peter", age: 24 });

  return (
    <div>
      <h2>Object State Variables</h2>

      {/* 实时查看对象状态 */}
      <pre>{JSON.stringify(person, null, 2)}</pre>

      {/* 输入框：修改 name */}
      <Form.Control
        type="text"
        value={person.name}
        onChange={(e) =>
          setPerson({ ...person, name: e.target.value }) // 覆盖 name
        }
        placeholder="Name"
        className="mb-2"
      />

      {/* 输入框：修改 age */}
      <Form.Control
        type="number"
        value={person.age}
        onChange={(e) =>
          setPerson({ ...person, age: parseInt(e.target.value) }) // 覆盖 age
        }
        placeholder="Age"
        className="mb-2"
      />

      <hr />
    </div>
  );
}
