export default function Flex() {
    return (
      <div id="wd-css-flex">
        <h2>Flex</h2>
  
        {/* 第一阶段：基本横排 */}
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow">Column 1</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red">Column 3</div>
        </div>
  
        <br />
  
        {/* 第二阶段：第三列自动填满剩余空间 */}
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow">Column 1</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
        </div>
  
        <br />
  
        {/* 第三阶段：第一列固定宽度，第三列填满剩余空间 */}
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
        </div>
      </div>
    );
  }
  