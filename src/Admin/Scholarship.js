import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchScholarship,submitScholarship } from "../Redux/Reducers";
import { styled } from "@mui/material/styles";
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
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
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

const Scholarship = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const country = useSelector((state) => state.educationReducer.scholarship);
  const state = useSelector((state) => state.educationReducer);
  const [name, setName] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // submit scholarship 
  const submitHandler =async(e)=>{
    e.preventDefault();
 await dispatch(submitScholarship(name))
   await dispatch(fetchScholarship());
    if(state?.error_scholarship){
      toast.error(state?.error_scholarship,{
        position: 'top-right'
      });
    }
    if(state?.success_scholarship){
      toast.success('Submitted Scholarship',{
        position: 'top-right'
      });
    }
   
    setName('')
    handleClose();
  }
  useEffect(() => {
    dispatch(fetchScholarship());
  }, []);

  return (
    <div>
     <Toaster />
      <h4 className="text-center text-secondary my-5">Scholarships</h4>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button style={{backgroundColor:"#00008b"}} variant="contained" onClick={handleOpen}>
          New Scholarship Name
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Scholarship Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {country
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell>{row.scholarship}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={country.length}
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
              Create New Scholarship
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Scholarship Name"
                  variant="outlined"
                  autoComplete="off"
                  value={name}
                  className="w-100"
                  onChange={(e) => setName(e.target.value)}
                  inputProps={{ autoComplete: "off" }}
                />
              </Box>
              <Button style={{backgroundColor:"#00008b"}} variant="contained" className="my-3" onClick={submitHandler}>
          Submit
        </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Scholarship;
