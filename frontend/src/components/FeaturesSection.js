import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fas fa-brain',
      title: 'AI-Powered Diagnostics',
      description: 'Advanced machine learning algorithms for accurate diagnosis and treatment recommendations.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile-First Design',
      description: 'Access patient records and manage care from anywhere with our responsive mobile interface.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security ensuring patient data protection and regulatory compliance.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and reporting tools for better healthcare management.'
    },
    {
      icon: 'fas fa-users',
      title: 'Team Collaboration',
      description: 'Seamless communication between healthcare providers and support staff.'
    },
    {
      icon: 'fas fa-clock',
      title: '24/7 Support',
      description: 'Round-the-clock technical support to ensure uninterrupted healthcare operations.'
    }
  ];

  return (
    <section className="features-section py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3">Why Choose Medora EHR?</h2>
            <p className="lead text-muted">
              Comprehensive healthcare solutions designed for modern medical practices
            </p>
          </Col>
        </Row>
        <Row>
          {features.map((feature, index) => (
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
                    className="feature-icon mb-3"
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
                    <i className={feature.icon}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
