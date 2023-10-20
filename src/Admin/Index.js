import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country"
import Scholarship from './Scholarship';
import Program from './Program';
import University from './University';
import CourseDetail from './CourseDetail';
import ScholarshipDetail from './ScholarshipDetail';
const Index = () => {
  return (
    <div>
    <h2 className='text-center text-info my-5'>Admin Dashboard</h2>
        <Container>
      <Row>
        <Col xs={12} md={6}>
     <Country />
        </Col>
        <Col xs={12} md={6}>
     <Scholarship/>
        </Col>
        <Col xs={12} md={6}>
     <Program />
        </Col>
        <Col xs={12} md={6}>
     <University/>
        </Col>
        <Col xs={12} md={6}>
     <CourseDetail/>
        </Col>
        <Col xs={12} md={6}>
     <ScholarshipDetail/>
        </Col>
        </Row>
        </Container>
    </div>
  )
}

export default Index