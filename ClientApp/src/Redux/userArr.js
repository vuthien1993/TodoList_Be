import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//////////
const PREFIX = "https://localhost:7001/api/useritems";

//http get
export const fetchApiUser = createAsyncThunk("fetchApiUser", async () => {
  const url = PREFIX;
  const res = await fetch(url);
  const data = res.json();
  return data;
});
// http post
export const addNewUser = createAsyncThunk("addNewUser", async (newUser) => {
  const url = PREFIX;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

const initialState = {
  userArr: [],
};
const userArr = createSlice({
  name: "userArr",
  initialState,
  extraReducers: {
    [fetchApiUser.fulfilled]: (state, actions) => {
      state.userArr = actions.payload;
    },
    [addNewUser.fulfilled]: (state, actions) => {
      state.userArr = [...state.userArr, actions.payload];
    },
  },
  reducers: {},
});

export const userArrAction = userArr.actions;
export default userArr.reducer;
