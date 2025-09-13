import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      fixed="top" 
      className="shadow-sm"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <img 
            src="/logo192.png" 
            alt="Medora" 
            width="40" 
            height="40" 
            className="me-2"
          />
          Medora
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
            <Nav.Link as={Link} to="/services" className="mx-2">Services</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">Contact</Nav.Link>
            <Button 
              variant="primary" 
              className="ms-3 px-4"
              style={{ borderRadius: '25px' }}
            >
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
