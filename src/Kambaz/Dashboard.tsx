import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* Course 1 - your real course */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5610/Home" className="wd-dashboard-course-link">
            <img src="/images/cs5610.png" width={200} />
            <div>
              <h5>CS5610 41980 Web Development</h5>
              <p className="wd-dashboard-course-title">
                202540_2 Summer 1 2025 Semester
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Example Course 2 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="/images/cs5610.png" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Frontend Frameworks</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Example Course 3 */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className="wd-dashboard-course-title">Backend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Add more courses similarly */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
            <img src="/images/mongodb.jpg" width={200} />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className="wd-dashboard-course-title">Database Design</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
            <img src="/images/htmlcss.jpg" width={200} />
            <div>
              <h5>CS4567 HTML & CSS</h5>
              <p className="wd-dashboard-course-title">UI Layout & Design</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="/images/typescript.jpg" width={200} />
            <div>
              <h5>CS5678 TypeScript</h5>
              <p className="wd-dashboard-course-title">Type-safe Programming</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
            <img src="/images/express.jpg" width={200} />
            <div>
              <h5>CS6789 Express</h5>
              <p className="wd-dashboard-course-title">Backend API Design</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
