import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CtaSection = () => {
  return (
    <section 
      className="cta-section py-5"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <Container>
        <Row className="text-center">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 fw-bold mb-4">
              Ready to Transform Your Healthcare Practice?
            </h2>
            <p className="lead mb-4">
              Join thousands of healthcare providers who trust Medora EHR for their practice management needs.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button 
                variant="warning" 
                size="lg" 
                className="px-5 py-3"
                style={{ borderRadius: '30px' }}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="px-5 py-3"
                style={{ borderRadius: '30px' }}
              >
                Schedule Demo
              </Button>
            </div>
            <p className="mt-3 mb-0">
              <small>No credit card required • 30-day free trial • Cancel anytime</small>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaSection;
