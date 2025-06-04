import { useState } from "react";

export default function CounterComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>useState Hook - Integer State</h2>
      <p>Current Count: {count}</p>
      <button className="btn btn-success me-2" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <hr />
    </div>
  );
}
