import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

export default function TOC() {
  const location = useLocation();

  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab1"
          active={location.pathname.includes("Lab1")}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab2"
          active={location.pathname.includes("Lab2")}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab3"
          active={location.pathname.includes("Lab3")}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Kambaz"
          active={location.pathname.includes("Kambaz")}
        >
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi" target="_blank">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
