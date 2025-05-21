import { Row, Col } from "react-bootstrap";

export default function BootstrapGrids() {
  return (
    <div id="wd-bs-grid-system">
      <h2>Grid system</h2>

      {/* ➤ 左右两栏 */}
      <Row>
        <Col className="bg-danger text-white">
          <h3>Left half</h3>
        </Col>
        <Col className="bg-primary text-white">
          <h3>Right half</h3>
        </Col>
      </Row>

      <br />

      {/* ➤ ⅓ + ⅔ */}
      <Row>
        <Col xs={4} className="bg-warning">
          <h3>One third</h3>
        </Col>
        <Col xs={8} className="bg-success text-white">
          <h3>Two thirds</h3>
        </Col>
      </Row>

      <br />

      {/* ➤ 三栏布局：侧栏 + 主内容 + 侧栏 */}
      <Row>
        <Col xs={2} className="bg-black text-white">
          <h3>Sidebar</h3>
        </Col>
        <Col xs={8} className="bg-secondary text-white">
          <h3>Main content</h3>
        </Col>
        <Col xs={2} className="bg-info">
          <h3>Sidebar</h3>
        </Col>
      </Row>

      <br />

      {/* ✅ 响应式四列布局 A-D */}
      <div id="wd-bs-responsive-grids">
        <h2>Responsive grid system</h2>
        <Row>
          <Col xs={12} md={6} xl={3} className="bg-warning">
            <h3>Column A</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-primary text-white">
            <h3>Column B</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-danger text-white">
            <h3>Column C</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-success text-white">
            <h3>Column D</h3>
          </Col>
        </Row>
      </div>

      <br />

      {/* ✅ 响应式 1~12 布局 */}
      <div id="wd-bs-responsive-dramatic">
        <h2>Responsive grid system</h2>
        <Row>
          {[...Array(12)].map((_, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              xxl={1}
              className={
                ["bg-warning", "bg-primary text-white", "bg-danger text-white", "bg-success text-white"][index % 4]
              }
            >
              <h4>{index + 1}</h4>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
