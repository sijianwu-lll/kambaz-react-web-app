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
import { enroll, unenroll } from "./Courses/Enrollments/reducer";


export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const selectedCourse = useSelector((state: any) => state.coursesReducer.selectedCourse);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer?.enrollments || []);

  const [formCourse, setFormCourse] = useState<any>(
    selectedCourse ?? { _id: "", name: "", description: "" }
  );
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      setFormCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) =>
        enrollments.some(
          (e: any) => e.user === currentUser?._id && e.course === c._id
        )
      );

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  return (
    <div id="wd-dashboard" className="ms-md-4 mt-3 me-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* 切换查看全部/只看自己 */}
      <Button
        className="float-end mb-3"
        variant="info"
        onClick={() => setShowAllCourses(!showAllCourses)}
      >
        {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
      </Button>

      {/* 添加/编辑课程（仅 FACULTY） */}
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
            onChange={(e) =>
              setFormCourse({ ...formCourse, name: e.target.value })
            }
          />
          <FormControl
            className="mb-3"
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={formCourse.description}
            onChange={(e) =>
              setFormCourse({ ...formCourse, description: e.target.value })
            }
          />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
          {visibleCourses.map((c: any) => (
            <Col key={c._id} style={{ width: "260px" }}>
              <Card className="h-100 wd-dashboard-course">
                <Link
                  to={isEnrolled(c._id) ? `/Kambaz/Courses/${c._id}/Home` : "#"}
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
                  {isEnrolled(c._id) ? (
                    <Link
                      to={`/Kambaz/Courses/${c._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                  ) : (
                    <span className="text-muted">Not enrolled</span>
                  )}

                  <div className="d-flex gap-2">
                    {showAllCourses && (
                      isEnrolled(c._id) ? (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            dispatch(unenroll({ user: currentUser._id, course: c._id }))
                          }
                        >
                           Unenroll
                        </Button>

                      ) : (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                          dispatch(enroll({ user: currentUser._id, course: c._id }))
                          }
                        >
                            Enroll
                        </Button>

                      )
                    )}

                    {isFaculty && (
                      <>
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
                      </>
                    )}
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
