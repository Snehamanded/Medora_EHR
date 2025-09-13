import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <div className="about-page">
      <section className="py-5" style={{ marginTop: '80px' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-4 fw-bold mb-3">About Medora EHR</h1>
              <p className="lead text-muted">
                Transforming healthcare through innovative technology solutions
              </p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="mb-4">Our Mission</h2>
              <p className="lead">
                To revolutionize healthcare delivery by providing comprehensive, 
                AI-powered electronic health record solutions that enhance patient care, 
                streamline workflows, and improve clinical outcomes.
              </p>
              <p>
                Founded in 2020, Medora EHR has been at the forefront of healthcare 
                technology innovation, serving thousands of healthcare providers worldwide 
                with cutting-edge solutions that make healthcare more efficient and effective.
              </p>
            </Col>
            <Col lg={6}>
              <div 
                className="about-image"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  padding: '3rem',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-heartbeat" style={{ fontSize: '6rem', marginBottom: '1rem' }}></i>
                <h3>Healthcare Innovation</h3>
                <p>Empowering healthcare professionals with advanced technology</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
