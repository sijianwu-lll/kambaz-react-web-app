import { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "./Database";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  return (
    <div id="wd-dashboard" className="ms-md-4 mt-3 me-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <Button
          onClick={addNewCourse}
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
        >
          Add
        </Button>
        <Button
          onClick={updateCourse}
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
        >
          Update
        </Button>
      </h5>
      <FormControl
        className="mb-2"
        placeholder="Course Name"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        className="mb-3"
        as="textarea"
        rows={3}
        placeholder="Course Description"
        value={course.description}
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
          {courses.map((course) => (
            <Col key={course._id} style={{ width: "260px" }}>
              <Card className="h-100 wd-dashboard-course">
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.image || "/images/reactjs.jpg"}
                    variant="top"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                </Link>

                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => {}}
                  >
                    Go
                  </Button>
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      id="wd-edit-course-click"
                      onClick={(e) => {
                        e.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      id="wd-delete-course-click"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
