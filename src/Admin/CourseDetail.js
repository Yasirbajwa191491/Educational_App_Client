import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountry,
    fetchProgram,
    fetchUniversity,fetchCourse,submitCourse } from "../Redux/Reducers";
import { styled } from "@mui/material/styles";
import { Container, Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from 'react-hot-toast';
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CourseDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const courses_list = useSelector((state) => state.educationReducer.courses_list);
  const country = useSelector((state) => state.educationReducer.country);

  const state = useSelector((state) => state.educationReducer);
  const [name, setName] = useState("");
  const [data,setData] = useState({
    country:'',
    program:'',
    university:'',
    startMonth:'',
    startYear:'',
    duration:'',
    courseName:''
  });

  const handleChange = (event) => {
    const {name,value}=event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const startYear = 2015;
  const endYear = 2050;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // submit program 
  const submitHandler =async(e)=>{
    e.preventDefault();
  await  dispatch(submitCourse(data))
   await dispatch(fetchCourse());

    if(state?.course_submit){
      toast.success(state?.course_submit,{
        position: 'top-right'
      });
    }
 
    setName('')
    handleClose();
  }
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchCountry());
    dispatch(fetchProgram());
    dispatch(fetchUniversity());
  }, [dispatch]);

  return (
    <div>
     <Toaster />
      <h4 className="text-center text-secondary my-5">Course Details</h4>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button style={{backgroundColor:"#00008b"}} variant="contained" onClick={handleOpen}>
          Add Course Detail
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Program</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Starting <br/> Month</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>University</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses_list
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.courseName}
                  </StyledTableCell>
                  <StyledTableCell>{row.program}</StyledTableCell>
                  <StyledTableCell>{row.country}</StyledTableCell>
                  <StyledTableCell>{row.startMonth} {row.startYear}</StyledTableCell>
                  <StyledTableCell>{row.duration}</StyledTableCell>
                  <StyledTableCell>{row.university}</StyledTableCell>
                  <StyledTableCell>{row.country}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={courses_list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Create Country Modal  */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Create New Program
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            <Col xs={12} md={12}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
              <TextField id="outlined-basic" label="Course Name" variant="outlined" name="courseName" value={data.courseName} onChange={handleChange} />
              </FormControl>
            </Box>
          </div>
        </Col>
            <Col xs={12} md={12}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
              <TextField id="outlined-basic" label="Duration" variant="outlined" name="duration" value={data.duration} onChange={handleChange} />
              </FormControl>
            </Box>
          </div>
        </Col>
            <Col xs={12} md={12}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
                <InputLabel id="age-label">Countries</InputLabel>
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
          
  
      
        <Col xs={12} md={12}>
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
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
        <Col xs={12} md={12} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
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
        <Col xs={12} md={12} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
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
        <Col xs={12} md={12} >
          <div className="column">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth className='my-2'>
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
              <Button style={{backgroundColor:"#00008b"}} variant="contained" className="my-2" onClick={submitHandler}>
          Submit
        </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CourseDetail;
