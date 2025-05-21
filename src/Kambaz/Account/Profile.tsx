import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Profile</h2>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control defaultValue="tony.stark" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control defaultValue="Tony Stark" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control defaultValue="ironman@avengers.com" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" defaultValue="********" />
      </Form.Group>

      <Button variant="primary" className="w-100">
        Update Profile
      </Button>
    </div>
  );
}
