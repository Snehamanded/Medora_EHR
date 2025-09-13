import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      hospital: 'City General Hospital',
      content: 'Medora EHR has transformed our practice. The AI-powered insights help us make better decisions and provide superior patient care.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Emergency Physician',
      hospital: 'Metro Health Center',
      content: 'The mobile interface is incredible. I can access patient records instantly, even during emergencies. It\'s a game-changer.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Family Physician',
      hospital: 'Community Health Clinic',
      content: 'The analytics dashboard gives us insights we never had before. Our patient outcomes have improved significantly.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted">
              Trusted by healthcare professionals worldwide
            </p>
          </Col>
        </Row>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card 
                className="h-100 border-0 shadow-sm"
                style={{ borderRadius: '15px' }}
              >
                <Card.Body className="p-4">
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-warning"></i>
                    ))}
                  </div>
                  <p className="text-muted mb-4">"{testimonial.content}"</p>
                  <div className="d-flex align-items-center">
                    <div 
                      className="avatar me-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                      <br />
                      <small className="text-muted">{testimonial.hospital}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
