import Button from '@mui/material/Button';
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const cardStyles = {
  // maxWidth: '300px',
  // minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // maxWidth: '500px',
  // height: '300px',
  padding: '35px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.45)',
  boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(15px)',
};

const textStyles = {
  margin: '0',
};

const footerStyles = {
  fontSize: '0.65em',
  color: '#446',
};
const buttonStyles = {
  alignSelf: 'flex-end',
  backgroundColor:"#00008b" // Align the button to the right within the flex container
};
const FilterResult = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.educationReducer);

  return (
    <div>
      <h2 className="text-secondary mx-3"><strong>Search Result</strong></h2>
      {state?.courses?.map((curEle) => {
        return (
          <div style={cardStyles} className="card my-3">
      <p style={textStyles}>
        {curEle.program} program in  
        <strong> {curEle.university}, </strong> {curEle.country}
      </p>
      <Button variant="contained" style={buttonStyles}>
        Enquire Now
      </Button>
      <p style={footerStyles} className="card-footer mt-3">
        Course: {curEle.courseName}, Starting Month: {curEle.startMonth} {curEle.startYear}, Duration: {curEle.duration}
      </p>
    </div>
        );
      })}
    </div>
  );
};

export default FilterResult;
