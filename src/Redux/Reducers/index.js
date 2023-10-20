import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Helpers/URL";

const initialState = {
  country: [],
  scholarship:[],
  program:[],
  university:[],
  error_country: "",
  success_country: false,
  error_scholarship: "",
  success_scholarship: false,
  error_program: "",
  success_program: false,
  error_university: "",
  success_university: false,
  courses:[],
  courses_list:[],
  scholarship_list:[],
  scholarship_details:[],
  course_submit:'',
  submit_scholarship:''
};

export const fetchCountry = createAsyncThunk("fetchCountry", async () => {
  const response = await axios.get(`${URL}/api/country/allcountries`);
  return response.data;
});
export const fetchCourse = createAsyncThunk("fetchCourse", async () => {
  const response = await axios.get(`${URL}/api/course/allCoursesList`);
  return response.data;
});
export const fetchScholarAllDetail = createAsyncThunk("fetchScholarAllDetail", async () => {
  const response = await axios.get(`${URL}/api/scholarshipDetail/allScholarshipDetailList`);
  return response.data;
});
export const fetchScholarship = createAsyncThunk("fetchScholarship", async () => {
  const response = await axios.get(`${URL}/api/scholarship/allScholarships`);
  return response.data;
});
export const fetchProgram = createAsyncThunk("fetchProgram", async () => {
  const response = await axios.get(`${URL}/api/program/allPrograms`);
  return response.data;
});
export const fetchUniversity = createAsyncThunk("fetchUniversity", async () => {
  const response = await axios.get(`${URL}/api/university/allUniversity`);
  return response.data;
});
export const fetchCourses = createAsyncThunk("fetchCourses", async (data) => {
  let {country,program,university,startMonth,startYear}=data;
  const response = await axios.get(`${URL}/api/course/course-filter?country=${country}&program=${program}&university
  =${university}&startMonth=${startMonth}&startYear=${startYear}`);
  return response.data;
});
export const fetchScholarshipDetail = createAsyncThunk("fetchScholarshipDetail", async (data) => {
  let {scholarship,country,program,university,startMonth,startYear}=data;
  const response = await axios.get(`${URL}/api/scholarshipDetail/scholarship_filter?scholarship=${scholarship}&country=${country}&program=${program}&university
  =${university}&startMonth=${startMonth}&startYear=${startYear}`);
  return response.data;
});


export const submitCountry = createAsyncThunk("submitCountry", async (name)=>{
   let response=await axios.post(`${URL}/api/country/submitCountry`,{
    country: name
   });
   return response.data;
});
export const submitCourse = createAsyncThunk("submitCourse", async (name)=>{
  const {   country,
  program,
  university,
  startMonth,
  startYear,
  duration,
  courseName}=name;
   let response=await axios.post(`${URL}/api/course/submitCourse`,{
    country,
  program,
  university,
  startMonth,
  startYear,
  duration,
  courseName
   });
   return response.data;
});
export const submitScholarshipDetail = createAsyncThunk("submitScholarshipDetail", async (name)=>{
  const {   
    country,
  program,
  university,
  startMonth,
  startYear,
  scholarship}=name;
   let response=await axios.post(`${URL}/api/scholarshipDetail/submitScholarshipDetail`,{
    country,
    program,
    university,
    startMonth,
    startYear,
    scholarship
   });
   return response.data;
});
export const submitUniversity = createAsyncThunk("submitUniversity", async (name)=>{
   let response=await axios.post(`${URL}/api/university/submitUniversity`,{
    university: name
   });
   return response.data;
});
export const submitProgram = createAsyncThunk("submitProgram", async (name)=>{
   let response=await axios.post(`${URL}/api/program/submitProgram`,{
    program: name
   });
   return response.data;
});
export const submitScholarship = createAsyncThunk("submitScholarship", async (name)=>{
   let response=await axios.post(`${URL}/api/scholarship/submitScholarship`,{
    scholarship: name
   });
   return response.data;
});
const educationReducer = createSlice({
  name: "educationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.country = action.payload;
      })
      .addCase(submitCountry.rejected, (state, action) => {
        state.error_country = action.error.message;
        state.success_country=false;
      })
      .addCase(submitCountry.fulfilled, (state, action) => {
        state.success_country = true;
        state.error_country=false;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses=action.payload;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.courses_list=action.payload;
      })
      .addCase(fetchScholarAllDetail.fulfilled, (state, action) => {
        state.scholarship_list=action.payload;
      })
      .addCase(fetchScholarshipDetail.fulfilled, (state, action) => {
        state.scholarship_details=action.payload;
      })
      .addCase(submitScholarship.rejected, (state, action) => {
        state.error_scholarship = action.error.message;
        state.success_scholarship=false;
      })
      .addCase(submitCourse.fulfilled, (state, action) => {
        state.course_submit = action.payload.message;
     
      })
      .addCase(submitScholarshipDetail.fulfilled, (state, action) => {
        state.submit_scholarship = action.payload.message;
     
      })
      .addCase(submitScholarship.fulfilled, (state, action) => {
        state.success_scholarship = true;
        state.error_scholarship=false;
      })
      .addCase(submitUniversity.rejected, (state, action) => {
        state.error_university = action.error.message;
        state.success_university=false;
      })
      .addCase(submitUniversity.fulfilled, (state, action) => {
        state.success_university = true;
        state.error_university=false;
      })
      .addCase(submitProgram.rejected, (state, action) => {
        state.error_program = action.error.message;
        state.success_program=false;
      })
      .addCase(submitProgram.fulfilled, (state, action) => {
        state.success_program = true;
        state.error_program=false;
      })
      .addCase(fetchScholarship.fulfilled, (state, action) => {
        state.scholarship = action.payload;
      })
      .addCase(fetchProgram.fulfilled, (state, action) => {
        state.program = action.payload;
      })
      .addCase(fetchUniversity.fulfilled, (state, action) => {
        state.university = action.payload;
      });
  },
});

export default educationReducer.reducer;
