// src/pages/LandingPage.jsx
import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="px-5 py-3 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src="/mediafutures-logo.png"
              height="32"
              alt="Media Futures"
            />
            <span className="ms-3 fs-4 fw-bold">Analytic Vision</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/login" className="px-3">
              Log In
            </Nav.Link>
            <Nav.Link href="/signup" className="px-3">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="bg-light text-center py-5">
        <Container className="hero-container">
          <h1 className="display-4 fw-bold mb-3">Welcome to Analytic Vision</h1>
          <p className="lead mb-4">
            Rapidly upload, inspect, and analyze your video keyframes&nbsp;–
            all within a single, intuitive dashboard.
          </p>
          <Button variant="primary" size="lg" className="me-2">
            Get Started
          </Button>
        </Container>
      </section>

      {/* Feature Cards */}
      <Container className="py-5">
        <Row className="g-4">
          {[
            {
              title: "Fast Upload",
              text: "Drop or browse to upload your images and videos in one click.",
            },
            {
              title: "Keyframe Picker",
              text: "Quickly scan through frames and select the most important shots.",
            },
            {
              title: "Custom Widgets",
              text: "Drag, resize, and configure analytics widgets any way you like.",
            },
          ].map((f, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-center text-center">
                  <Card.Title>{f.title}</Card.Title>
                  <Card.Text className="text-muted">{f.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Banner */}
      <section className="bg-primary text-white text-center py-4">
        <Container>
          <h2 className="mb-3">Ready to get started?</h2>
          <Button variant="light" size="lg" className="rounded-pill px-4">
            Create Your Account
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="text-center text-muted py-3">
        <small>
          © {new Date().getFullYear()} Media Futures – Analytic Vision Dashboard
        </small>
      </footer>
    </>
  );
}
