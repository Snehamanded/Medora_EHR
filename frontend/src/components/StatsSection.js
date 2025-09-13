import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const StatsSection = () => {
  const stats = [
    { number: '10,000+', label: 'Healthcare Providers' },
    { number: '1M+', label: 'Patients Served' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '50+', label: 'Countries' }
  ];

  return (
    <section 
      className="stats-section py-5"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <Container>
        <Row className="text-center">
          {stats.map((stat, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <div className="stat-item">
                <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
                <p className="lead mb-0">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StatsSection;
