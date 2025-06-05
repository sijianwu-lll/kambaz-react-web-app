import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  addCourse,
  deleteCourse,
  updateCourse,
  setSelectedCourse,
} from "./Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const selectedCourse = useSelector((state: any) => state.coursesReducer.selectedCourse);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer?.enrollments || []);

  // ✅ 安全初始化，避免 null 错误
  const [formCourse, setFormCourse] = useState<any>(
    selectedCourse ?? { _id: "", name: "", description: "" }
  );

  // ✅ 当选中课程变化时，更新本地表单状态
  useEffect(() => {
    if (selectedCourse) {
      setFormCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const filteredCourses = courses.filter((c: any) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === c._id)
  );

  return (
    <div id="wd-dashboard" className="ms-md-4 mt-3 me-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              onClick={() => {
                dispatch(addCourse(formCourse));
                setFormCourse({ _id: "", name: "", description: "" });
              }}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              onClick={() => {
                dispatch(updateCourse(formCourse));
              }}
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={formCourse.name}
            onChange={(e) => setFormCourse({ ...formCourse, name: e.target.value })}
          />
          <FormControl
            className="mb-3"
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={formCourse.description}
            onChange={(e) => setFormCourse({ ...formCourse, description: e.target.value })}
          />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
          {filteredCourses.map((c: any) => (
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

                <Card.Footer className="d-flex justify-content-between">
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
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setSelectedCourse(c));
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
                          dispatch(deleteCourse(c._id));
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
