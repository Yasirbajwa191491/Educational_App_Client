import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sasystems from '../images/sasystems.png';

const AdHeader = () => {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Row>
        <Col>
          <Link to="/">
            <img src={sasystems} alt="ads header" className="img-fluid w-100" style={{ height: "230px",objectFit:"fill" }} />
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AdHeader;
