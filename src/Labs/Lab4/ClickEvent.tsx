const hello = () => {
    alert("Hello World!");
  };
  
  const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
  };
  
  export default function ClickEvent() {
    return (
      <div id="wd-click-event">
        <h2>Click Event</h2>
  
        {/* 单函数调用 */}
        <button onClick={hello} id="wd-hello-world-click">
          Hello World!
        </button>
  
        {/* 传参时使用箭头函数包裹 */}
        <button onClick={() => lifeIs("Good!")} id="wd-life-is-good-click">
          Life is Good!
        </button>
  
        {/* 多行逻辑：使用箭头函数 + 大括号 */}
        <button
          onClick={() => {
            hello();
            lifeIs("Great!");
          }}
          id="wd-life-is-great-click"
        >
          Life is Great!
        </button>
  
        <hr />
      </div>
    );
  }
  