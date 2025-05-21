import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "5610",
    title: "CS5610 React JS",
    desc: "Full Stack software developer",
    img: "/images/5610.jpg",
  },
  {
    id: "5010",
    title: "CS5010 Node.js",
    desc: "Server-side JavaScript",
    img: "/images/5010.jpg",
  },
  {
    id: "5200",
    title: "CS5200 MongoDB",
    desc: "NoSQL Document DB",
    img: "/images/5200.jpg",
  },
  {
    id: "5610",
    title: "CS5610 Express",
    desc: "Backend web framework",
    img: "/images/5610.jpg",
  },
  {
    id: "5610",
    title: "CS5610 HTML/CSS",
    desc: "Basics of frontend layout",
    img: "/images/5610.jpg",
  },
  {
    id: "5610",
    title: "CS5610 GitHub",
    desc: "Version control and collaboration",
    img: "/images/5610.jpg",
  },
  {
    id: "5610",
    title: "CS5610 TypeScript",
    desc: "Typed JavaScript at scale",
    img: "/images/5610.jpg",
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="ms-md-4 mt-3 me-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
          {courses.map((course) => (
            <Col key={course.id} style={{ width: "260px" }}>
              <Card className="h-100">
                <Link
                  to={`/Kambaz/Courses/${course.id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.img}
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-nowrap overflow-hidden">
                      {course.title}
                    </Card.Title>
                    <Card.Text
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.desc}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
