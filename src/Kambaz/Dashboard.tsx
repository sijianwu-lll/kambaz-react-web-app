import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";

type DashboardProps = {
  course: { _id?: string; name: string; description: string };
  setCourse: React.Dispatch<React.SetStateAction<{ _id?: string; name: string; description: string }>>;
  addCourse: () => Promise<void>;
  updateCourse: () => Promise<void>; // ✅ 添加 updateCourse 参数
  deleteCourse: (courseId: string) => Promise<void>;
  courses: any[];
  setCourses: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function Dashboard({
  course,
  setCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  courses,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <div id="wd-dashboard" className="ms-md-4 mt-3 me-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <Button
        className="float-end mb-3"
        variant="info"
        onClick={() => setShowAllCourses(!showAllCourses)}
      >
        {showAllCourses ? "Show My Courses" : "Show All Courses"}
      </Button>

      {isFaculty && (
        <>
          <h5>
            {course._id ? "Edit Course" : "New Course"}
            <Button
              onClick={course._id ? updateCourse : addCourse}
              className="btn btn-primary float-end"
              id={course._id ? "wd-update-course-click" : "wd-add-new-course-click"}
            >
              {course._id ? "Update" : "Add"}
            </Button>
          </h5>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
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
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
          {courses.map((c: any) => (
            <Col key={c._id} style={{ width: "260px" }}>
              <Card className="h-100 wd-dashboard-course">
                <Link
                  to={`/Kambaz/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={c.image || "/images/5610.jpg"}
                    variant="top"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                </Link>

                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="btn btn-primary"
                  >
                    Go
                  </Link>

                  {isFaculty && (
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c); // ✅ 进入编辑状态
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCourse(c._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
