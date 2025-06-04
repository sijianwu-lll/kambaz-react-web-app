import React, { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<any>(null);

  const handleClick = (e: any) => {
    // 为了避免 JSON.stringify 报错，移除 circular 引用
    e.target = e.target.outerHTML;
    delete e.view;
    setEvent(e);
  };

  return (
    <div>
      <h2>Event Object</h2>

      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>

      <pre>{JSON.stringify(event, null, 2)}</pre>

      <hr />
    </div>
  );
}
