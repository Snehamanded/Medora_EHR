import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer 
      className="footer py-5"
      style={{ backgroundColor: '#2c3e50', color: 'white' }}
    >
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">
              <img 
                src="/logo192.png" 
                alt="Medora" 
                width="30" 
                height="30" 
                className="me-2"
              />
              Medora EHR
            </h5>
            <p className="text-muted">
              Revolutionizing healthcare with AI-powered electronic health record solutions.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="text-muted me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-muted me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-muted me-3">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="text-muted">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Product</h6>
            <ul className="list-unstyled">
              <li><a href="/services" className="text-muted text-decoration-none">Features</a></li>
              <li><a href="/pricing" className="text-muted text-decoration-none">Pricing</a></li>
              <li><a href="/api" className="text-muted text-decoration-none">API</a></li>
              <li><a href="/integrations" className="text-muted text-decoration-none">Integrations</a></li>
            </ul>
          </Col>
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-muted text-decoration-none">About</a></li>
              <li><a href="/careers" className="text-muted text-decoration-none">Careers</a></li>
              <li><a href="/blog" className="text-muted text-decoration-none">Blog</a></li>
              <li><a href="/press" className="text-muted text-decoration-none">Press</a></li>
            </ul>
          </Col>
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-muted text-decoration-none">Help Center</a></li>
              <li><a href="/contact" className="text-muted text-decoration-none">Contact</a></li>
              <li><a href="/status" className="text-muted text-decoration-none">Status</a></li>
              <li><a href="/security" className="text-muted text-decoration-none">Security</a></li>
            </ul>
          </Col>
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="/privacy" className="text-muted text-decoration-none">Privacy</a></li>
              <li><a href="/terms" className="text-muted text-decoration-none">Terms</a></li>
              <li><a href="/hipaa" className="text-muted text-decoration-none">HIPAA</a></li>
              <li><a href="/compliance" className="text-muted text-decoration-none">Compliance</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" style={{ borderColor: '#34495e' }} />
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0 text-muted">
              © 2024 Medora EHR. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0 text-muted">
              Made with ❤️ for healthcare professionals
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
