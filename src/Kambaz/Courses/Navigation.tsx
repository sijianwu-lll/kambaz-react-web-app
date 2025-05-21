import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      <Link
        to="/Kambaz/Courses/1234/Home"
        className="list-group-item active border border-0"
        id="wd-course-home-link"
      >
        Home
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Modules"
        className="list-group-item text-danger border border-0"
        id="wd-course-modules-link"
      >
        Modules
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Piazza"
        className="list-group-item text-danger border border-0"
        id="wd-course-piazza-link"
      >
        Piazza
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Zoom"
        className="list-group-item text-danger border border-0"
        id="wd-course-zoom-link"
      >
        Zoom
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Assignments"
        className="list-group-item text-danger border border-0"
        id="wd-course-assignments-link"
      >
        Assignments
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Quizzes"
        className="list-group-item text-danger border border-0"
        id="wd-course-quizzes-link"
      >
        Quizzes
      </Link>
      <Link
        to="/Kambaz/Courses/1234/People"
        className="list-group-item text-danger border border-0"
        id="wd-course-people-link"
      >
        People
      </Link>

    </div>
  );
}
