import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <div>
      {/* First Hero Section */}
      <section className="hero-section py-5" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Revolutionizing Healthcare with 
                <span className="text-warning"> AI-Powered</span> Solutions
              </h1>
              <p className="lead mb-4">
                Medora EHR provides comprehensive electronic health record management 
                with advanced AI capabilities, seamless integration, and patient-centered care.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="px-4 py-3"
                  style={{ borderRadius: '30px' }}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3"
                  style={{ borderRadius: '30px' }}
                >
                  Watch Demo
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <div 
                  className="hero-image"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '3rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <i className="fas fa-heartbeat" style={{ fontSize: '8rem', color: '#ffc107' }}></i>
                  <h3 className="mt-3">Smart Healthcare</h3>
                  <p>AI-driven insights for better patient outcomes</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gateway to Better Health Section */}
      <section className="gateway-section py-5" style={{ 
        backgroundColor: '#f8f9fa',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-4">
                <span style={{ color: '#6c757d' }}>Gateway to</span>{' '}
                <span style={{ color: '#007bff' }}>Better Health</span>
              </h2>
              <p className="lead text-muted mb-5">
                MEDORA is an AI-powered digital healthcare ecosystem that delivers personalized, 
                secure, and accessible healthcare for everyone.
              </p>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-5">
                  <Row>
                    {/* For Patients Card */}
                    <Col md={4} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div 
                          className="feature-icon mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            color: 'white',
                            fontSize: '2rem'
                          }}
                        >
                          <i className="fas fa-user-plus"></i>
                        </div>
                        <h5 className="fw-bold mb-2" style={{ color: '#343a40' }}>For Patients</h5>
                        <p className="text-muted mb-3">Comprehensive health management</p>
                        <div className="d-flex flex-column gap-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              backgroundColor: '#007bff',
                              borderColor: '#007bff',
                              fontWeight: '600'
                            }}
                          >
                            Patient Register
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              borderColor: '#007bff',
                              color: '#007bff',
                              fontWeight: '600'
                            }}
                          >
                            Patient Login
                          </Button>
                        </div>
                      </div>
                    </Col>

                    {/* For Doctors Card */}
                    <Col md={4} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div 
                          className="feature-icon mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            color: 'white',
                            fontSize: '2rem'
                          }}
                        >
                          <i className="fas fa-heart"></i>
                        </div>
                        <h5 className="fw-bold mb-2" style={{ color: '#343a40' }}>For Doctors</h5>
                        <p className="text-muted mb-3">Enhanced diagnostic tools</p>
                        <div className="d-flex flex-column gap-2">
                          <Button 
                            variant="success" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              backgroundColor: '#28a745',
                              borderColor: '#28a745',
                              fontWeight: '600'
                            }}
                          >
                            Doctor Register
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              borderColor: '#28a745',
                              color: '#28a745',
                              fontWeight: '600'
                            }}
                          >
                            Doctor Login
                          </Button>
                        </div>
                      </div>
                    </Col>

                    {/* For Healthcare Card */}
                    <Col md={4}>
                      <div className="text-center">
                        <div 
                          className="feature-icon mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            color: 'white',
                            fontSize: '2rem'
                          }}
                        >
                          <i className="fas fa-shield-alt"></i>
                        </div>
                        <h5 className="fw-bold mb-2" style={{ color: '#343a40' }}>For Healthcare</h5>
                        <p className="text-muted mb-3">Streamlined staff & operations</p>
                        <div className="d-flex flex-column gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              backgroundColor: '#6f42c1',
                              borderColor: '#6f42c1',
                              fontWeight: '600'
                            }}
                          >
                            Staff Register
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="px-3 py-2"
                            style={{ 
                              borderRadius: '8px',
                              borderColor: '#6f42c1',
                              color: '#6f42c1',
                              fontWeight: '600'
                            }}
                          >
                            Staff Login
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </section>
    </div>
  );
};

export default HeroSection;
