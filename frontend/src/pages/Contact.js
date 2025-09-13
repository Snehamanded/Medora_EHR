import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="py-5" style={{ marginTop: '80px' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
              <p className="lead text-muted">
                Get in touch with our team for support, sales, or general inquiries
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your last name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Enter the subject" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-5 py-3"
                    style={{ borderRadius: '30px' }}
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} className="text-center mb-4">
              <div 
                className="contact-info"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  color: 'white'
                }}
              >
                <i className="fas fa-phone mb-3" style={{ fontSize: '2rem' }}></i>
                <h5>Phone</h5>
                <p className="mb-0">+1 (555) 123-4567</p>
              </div>
            </Col>
            <Col lg={4} className="text-center mb-4">
              <div 
                className="contact-info"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  color: 'white'
                }}
              >
                <i className="fas fa-envelope mb-3" style={{ fontSize: '2rem' }}></i>
                <h5>Email</h5>
                <p className="mb-0">support@medora.dev</p>
              </div>
            </Col>
            <Col lg={4} className="text-center mb-4">
              <div 
                className="contact-info"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  color: 'white'
                }}
              >
                <i className="fas fa-map-marker-alt mb-3" style={{ fontSize: '2rem' }}></i>
                <h5>Address</h5>
                <p className="mb-0">123 Healthcare St, Medical City, MC 12345</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
