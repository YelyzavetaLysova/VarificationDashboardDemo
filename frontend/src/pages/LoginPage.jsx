// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // Redirect to dashboard
      navigate("/upload");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="px-5 py-3 shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src="/mediafutures-logo.png" height="32" alt="Media Futures" />
            <span className="ms-3 fs-4 fw-bold">Analytic Vision</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" active>
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Login Form */}
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4 text-center">Log In</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="loginEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group controlId="loginPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button variant="primary" size="lg" type="submit" disabled={loading}>
                      {loading && <Spinner animation="border" size="sm" className="me-2" />}
                      {loading ? "Logging in…" : "Log In"}
                    </Button>
                  </div>

                  <div className="text-center">
                    <small className="text-muted">
                      Don’t have an account? <Link to="/signup">Sign up here</Link>
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center text-muted py-3">
        <small>© {new Date().getFullYear()} Media Futures – Analytic Vision Dashboard</small>
      </footer>
    </>
  );
}
