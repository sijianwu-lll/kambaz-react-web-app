import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  // 添加一个随机数到数组末尾
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  // 删除指定下标的元素
  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>

      {/* 添加按钮 */}
      <Button onClick={addElement} className="mb-3">
        Add Element
      </Button>

      {/* 渲染数组列表 */}
      <ul className="list-group">
        {array.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item}
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}
