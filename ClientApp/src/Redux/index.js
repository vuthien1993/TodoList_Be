import { configureStore } from "@reduxjs/toolkit";
import importantReducer from "./important";
import nextStepReducer from "./nextStep";
import userArrReducer from "./userArr";
const store = configureStore({
  reducer: {
    important: importantReducer,
    nextStep: nextStepReducer,
    userArr: userArrReducer,
  },
});
export default store;
