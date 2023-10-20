import { configureStore } from "@reduxjs/toolkit";
import educationReducer from "../Reducers/index"

const store=configureStore({
    reducer: {educationReducer}
});

export default store;