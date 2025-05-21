export default function Float() {
    return (
      <div id="wd-float-divs">
        <h2>Float</h2>
  
        {/* ✅ 图文混排浮动 */}
        <div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="float-right"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
  
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="float-left"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
  
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="float-right"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
  
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="float-left"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius hic tempora eveniet vel expedita? <br />
  
          <div className="wd-float-done"></div>
        </div>
  
        {/* ✅ 彩色盒子横排 + 图片右浮动 */}
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red
          </div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="float-right"
          />
          <div className="wd-float-done"></div>
        </div>
      </div>
    );
  }
  