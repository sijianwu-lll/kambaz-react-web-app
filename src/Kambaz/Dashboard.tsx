import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import {
  enroll,
  unenroll,
} from "./Courses/Enrollments/reducer";
import * as enrollmentsClient from "./Courses/Enrollments/client";


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
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!currentUser) return;
      const userEnrollments = await enrollmentsClient.findCoursesForUser(currentUser._id);
      userEnrollments.forEach((e: any) => dispatch(enroll(e)));
    };
    fetchEnrollments();
  }, [currentUser]);

  const toggleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    const enrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
    if (enrolled) {
      await enrollmentsClient.unenroll(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } else {
      const e = await enrollmentsClient.enroll(currentUser._id, courseId);
      dispatch(enroll(e));
    }
  };

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

                  {isFaculty ? (
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c);
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
                  ) : (
                    <Button
                      variant={
                        enrollments.some(
                          (e: any) => e.user === currentUser._id && e.course === c._id
                        )
                          ? "danger"
                          : "success"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        toggleEnrollment(c._id);
                      }}
                    >
                      {enrollments.some(
                        (e: any) => e.user === currentUser._id && e.course === c._id
                      )
                        ? "Unenroll"
                        : "Enroll"}
                    </Button>
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
