const add = (a: number, b: number) => {
    alert(`${a} + ${b} = ${a + b}`);
  };
  
  export default function PassingDataOnEvent() {
    return (
      <div id="wd-passing-data-on-event">
        <h2>Passing Data on Event</h2>
  
        <button
          onClick={() => add(2, 3)} // ✅ 使用箭头函数包装，避免立即执行
          className="btn btn-primary"
          id="wd-pass-data-click"
        >
          Pass 2 and 3 to add()
        </button>
  
        <hr />
      </div>
    );
  }
  