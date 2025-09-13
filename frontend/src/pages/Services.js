import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      title: 'Electronic Health Records',
      description: 'Comprehensive patient record management with advanced search and filtering capabilities.',
      icon: 'fas fa-file-medical'
    },
    {
      title: 'AI-Powered Diagnostics',
      description: 'Machine learning algorithms that assist in diagnosis and treatment recommendations.',
      icon: 'fas fa-brain'
    },
    {
      title: 'Telemedicine Platform',
      description: 'Secure video consultations and remote patient monitoring capabilities.',
      icon: 'fas fa-video'
    },
    {
      title: 'Prescription Management',
      description: 'Digital prescription writing, drug interaction checking, and pharmacy integration.',
      icon: 'fas fa-pills'
    },
    {
      title: 'Laboratory Integration',
      description: 'Seamless integration with lab systems for test ordering and result management.',
      icon: 'fas fa-flask'
    },
    {
      title: 'Billing & Insurance',
      description: 'Automated billing, insurance verification, and claims processing.',
      icon: 'fas fa-credit-card'
    }
  ];

  return (
    <div className="services-page">
      <section className="py-5" style={{ marginTop: '80px' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Our Services</h1>
              <p className="lead text-muted">
                Comprehensive healthcare solutions tailored to your practice needs
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card 
                  className="h-100 border-0 shadow-sm"
                  style={{ 
                    borderRadius: '15px',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Card.Body className="text-center p-4">
                    <div 
                      className="service-icon mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        color: 'white',
                        fontSize: '2rem'
                      }}
                    >
                      <i className={service.icon}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-muted">{service.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Services;
