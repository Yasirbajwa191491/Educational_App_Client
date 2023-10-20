import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountry,
  fetchProgram,
  fetchScholarship,
  fetchUniversity,
  fetchCourses,
  fetchScholarshipDetail
} from "../Redux/Reducers";
import FilterResult from "./FilterResult";
import ScholarshipResult from "./ScholarshipResult";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.educationReducer.country);
  const state = useSelector((state) => state.educationReducer);
  const [isCoursesDisabled, setIsCoursesDisabled] = useState(true);
  const [isScholarshipsDisabled, setIsScholarshipsDisabled] = useState(false);
  const [data,setData] = useState({
    scholarship:'',
    country:'',
    program:'',
    university:'',
    startMonth:'',
    startYear:''
  });

  const toggleCourses = () => {
    setIsCoursesDisabled(true);
    setIsScholarshipsDisabled(false);
  };

  const toggleScholarships = () => {
    setIsCoursesDisabled(false);
    setIsScholarshipsDisabled(true);
  };
  const handleChange = (event) => {
    const {name,value}=event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const searchHandler=(event) => {
  event.preventDefault();
  if(isCoursesDisabled){
    const {country,program,university,startMonth,startYear}=data;
    let filter={
      country,program,university,startMonth,startYear
    }
    dispatch(fetchCourses(filter))
  }
else if(isScholarshipsDisabled){
  const {scholarship,country,program,university,startMonth,startYear}=data;
  let filter={
    scholarship,country,program,university,startMonth,startYear
  }
  dispatch(fetchScholarshipDetail(filter))
}
  }

  const startYear = 2015;
  const endYear = 2050;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }
  useEffect(() => {
    dispatch(fetchCountry());
    dispatch(fetchProgram());
    dispatch(fetchScholarship());
    dispatch(fetchUniversity());
  }, []);
  return (
    <Container style={{padding:"0px 20px"}}>
      <Row>
      <Col xs={12} md={3} style={{padding:" 0px 5px"}}>
    <div className="d-flex justify-content-between align-items-center my-3">
    <Button style={{backgroundColor:isScholarshipsDisabled && '#00008b'}}
              variant="contained"
              disabled={isCoursesDisabled}
              onClick={toggleCourses}
            >
              Courses
            </Button>
            <Button style={{backgroundColor: isCoursesDisabled && '#00008b'}}
              variant="contained"
              disabled={isScholarshipsDisabled}
              onClick={toggleScholarships}
            >
              Scholarships
            </Button>
    </div>
      </Col>
      <Col xs={12} md={9}></Col>
        <Col xs={12} md={3} style={{padding:" 0px 5px"}} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="age-label">Countries </InputLabel>
                <Select labelId="age-label" id="age-select" label="Country" name="country" value={data.country} onChange={handleChange}>
                  <MenuItem value={""}>Select Country</MenuItem>

                  {country?.map((curEle) => {
                    return (
                      <MenuItem value={curEle?.country}  key={curEle?._id}>
                        {curEle?.country}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        {
          isScholarshipsDisabled&&   <Col xs={12} md={3} style={{padding:" 0px 5px"}}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="age-label">Scholarships</InputLabel>
                <Select labelId="age-label" id="age-select" label="Scholarship" name="scholarship" value={data.scholarship} onChange={handleChange}>
                  <MenuItem value={""}>Select Scholarship</MenuItem>
                  {state?.scholarship?.map((curEle) => {
                    return (
                      <MenuItem value={curEle?.scholarship} key={curEle?._id}>
                        {curEle?.scholarship}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        }
      
        <Col xs={12} md={3} style={{padding:" 0px 5px"}}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="gender-label">Programs</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-select"
                  label="Programs"
                  name="program"
                  value={data.program} onChange={handleChange}
                >
                  <MenuItem value="">Select Program</MenuItem>
                  {state?.program?.map((curEle) => {
                    return (
                      <MenuItem value={curEle?.program} key={curEle?._id}>
                        {curEle?.program}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        <Col xs={12} md={3} style={{padding:" 0px 5px"}} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="gender-label">Universities</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-select"
                  label="Universities"
                  name="university"
                  value={data.university} onChange={handleChange}
                >
                  <MenuItem value="">Select University</MenuItem>
                  {state?.university?.map((curEle) => {
                    return (
                      <MenuItem value={curEle?.university}  key={curEle?._id}>
                        {curEle?.university}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        <Col xs={12} md={3} style={{padding:" 0px 5px"}} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="gender-label">Course Start Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month-select"
                  label="Start Month"
                  name="startMonth"
                  value={data.startMonth} onChange={handleChange}
                >
                  <MenuItem value="">Select Month</MenuItem>
                  <MenuItem value="01">January</MenuItem>
                  <MenuItem value="02">February</MenuItem>
                  <MenuItem value="03">March</MenuItem>
                  <MenuItem value="04">April</MenuItem>
                  <MenuItem value="05">May</MenuItem>
                  <MenuItem value="06">June</MenuItem>
                  <MenuItem value="07">July</MenuItem>
                  <MenuItem value="08">August</MenuItem>
                  <MenuItem value="09">September</MenuItem>
                  <MenuItem value="10">October</MenuItem>
                  <MenuItem value="11">November</MenuItem>
                  <MenuItem value="12">December</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        <Col xs={12} md={3} style={{padding:" 0px 5px"}} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-3'>
                <InputLabel id="gender-label">Course Start Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year-select"
                  label="Select a Year"
                  name="startYear"
                  value={data.startYear} onChange={handleChange}
                >
                  <MenuItem value="">Select Year</MenuItem>
                  {years.map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Col>
        {/* <Col xs={12} md={3} style={{padding:" 0px 5px"}} ></Col> */}
        <Col xs={12} md={12} className="my-4 d-flex justify-content-center align-items-center">
        <Button style={{backgroundColor:"#00008b"}}  variant="contained" onClick={searchHandler} >Search</Button>
        </Col>
        {/* <Col xs={12} md={4} ></Col> */}
        {
          isCoursesDisabled&&  
          <Col>
          <FilterResult  />
        </Col>
        }
        {
          isScholarshipsDisabled&&  
          <Col>
          <ScholarshipResult />
        </Col>
        }
       
      </Row>
    </Container>
  );
};

export default SearchFilter;
