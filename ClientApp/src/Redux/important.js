import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];

const PREFIX = "https://localhost:7001/api/todoitems/";

//redux thunk call api

export const fetchApiTasks = createAsyncThunk("callApi", async () => {
  const url = PREFIX;
  const res = await fetch(url);
  const data = await res.json();
  return data;
});

//redux thunk add new tasks

export const addNewTask = createAsyncThunk("addNewTask", async (newTasks) => {
  const url = PREFIX;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newTasks),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

//redux thunk delete

export const deleteTask = createAsyncThunk("deleteTasks", async (id) => {
  const url = PREFIX + id;
  const res = await fetch(url, {
    method: "DELETE",
  });
  const data = res.json();
  return data;
});

// select important
export const selectImportant = createAsyncThunk(
  "selectImportant",
  async (id) => {
    const url = PREFIX + id + "/important";
    const res = await fetch(url, {
      method: "PATCH",
    });
    const data = res.json();
    return data;
  }
);
// select isdone
export const selectIsdone = createAsyncThunk("selectIsdone", async (id) => {
  const url = PREFIX + id + "/isdone";
  const res = await fetch(url, {
    method: "PATCH",
  });
  const data = res.json();
  return data;
});

// select myday
export const selectIsmyday = createAsyncThunk("selectIsmyday", async (id) => {
  const url = PREFIX + id + "/ismyday";
  const res = await fetch(url, {
    method: "PATCH",
  });
  const data = res.json();
  return data;
});
//khai báo các state
const initialState = {
  showPlannedWeek: false,
  showPlannedLater: false,
  showPlannedTimeOut: false,
  showPlannedTomorow: false,
  showPlanned: false,
  isMyday: false,
  isDone: false,
  idTasks: "",
  isImportant: false,
  showTasksDetail: false,
  tasksName: "",
  tasksArr: [],
  showCompleted: false,
  displayMyday: true,
  displayImportant: false,
  displayPlanned: false,
  displayTasks: false,
};
const important = createSlice({
  name: "important",
  initialState,
  extraReducers: {
    //http get
    [fetchApiTasks.fulfilled]: (state, actions) => {
      state.tasksArr = actions.payload;
    },

    //http post
    [addNewTask.fulfilled]: (state, actions) => {
      state.tasksArr = [...state.tasksArr, actions.payload];
    },
    //http delete
    [deleteTask.fulfilled]: (state, { payload }) => {
      const index = state.tasksArr.findIndex((ele) => ele.id === payload.id);
      state.tasksArr.splice(index, 1);
    },
    //select important
    [selectImportant.fulfilled]: (state, { payload }) => {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.id ? { ...ele, isImportant: !ele.isImportant } : ele
      );
      state.tasksArr = updateArr;
    },
    //select isdone
    [selectIsdone.fulfilled]: (state, { payload }) => {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.id ? { ...ele, isDone: !ele.isDone } : ele
      );
      state.tasksArr = updateArr;
    },
    //select myday
    [selectIsmyday.fulfilled]: (state, { payload }) => {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.id ? { ...ele, isMyday: !ele.isMyday } : ele
      );
      state.tasksArr = updateArr;
      /////////////////////////
      state.isMyday = payload.isMyday;
    },
  },
  reducers: {
    //add task
    addtasks(state, { payload }) {
      const newTasks = payload.tasksItem;
      state.tasksArr = [...state.tasksArr, newTasks];
      // localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //xoa task
    deleteTask(state, { payload }) {
      const index = state.tasksArr.findIndex((ele) => ele.id === payload.id);
      state.tasksArr.splice(index, 1);
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //tich chon star o moi task
    important(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idI ? { ...ele, isImportant: !ele.isImportant } : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    //ham tich chon star o modal detail
    importantDetail(state) {
      state.isImportant = !state.isImportant;
    },
    //hien thi chi tiet task
    showDetail(state, { payload }) {
      state.showTasksDetail = true;
      state.tasksName = payload.tasksName;
      state.isImportant = payload.isImportant;
      state.idTasks = payload.idDetail;
      state.isMyday = payload.isMyday;
    },
    //ht viec quan trong o modaldetail
    showImportantDetail(state, { payload }) {
      state.isImportant = payload.isImportant;
    },
    //an chi tiet
    hidenDetail(state) {
      state.showTasksDetail = false;
    },
    //danh dau viec da hoan thanh
    complete(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idC ? { ...ele, isDone: !ele.isDone } : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    showCompletedDetail(state) {
      state.isDone = !state.isDone;
    },
    //an hien viec hoan thanh
    showCompleted(state) {
      state.showCompleted = !state.showCompleted;
    },
    //ham add xóa my day
    isMyday(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        ele.id === payload.idDetail
          ? { ...ele, isMyday: !payload.isMyday }
          : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
      state.isMyday = !payload.isMyday;
    },
    showPlanned(state) {
      state.showPlanned = !state.showPlanned;
    },
    //check timout
    checkTimeOut(state, { payload }) {
      const updateArr = state.tasksArr.map((ele) =>
        (ele.time < payload.timeNow && ele.month === payload.monthNow) ||
        ele.month < payload.monthNow
          ? { ...ele, timeOut: true }
          : ele
      );
      state.tasksArr = updateArr;
      localStorage.setItem("tasksArr", JSON.stringify(state.tasksArr));
    },
    showPlannedTimeOut(state) {
      state.showPlannedTimeOut = !state.showPlannedTimeOut;
    },
    showPlannedTomorow(state) {
      state.showPlannedTomorow = !state.showPlannedTomorow;
    },
    showPlannedLater(state) {
      state.showPlannedLater = !state.showPlannedLater;
    },
    showPlannedWeek(state) {
      state.showPlannedWeek = !state.showPlannedWeek;
    },
    //set hien thi theo danh muc menurow
    displayMyday(state) {
      state.displayMyday = true;
      state.displayImportant = false;
      state.displayPlanned = false;
      state.displayTasks = false;
    },
    displayImportant(state) {
      state.displayMyday = false;
      state.displayImportant = true;
      state.displayPlanned = false;
      state.displayTasks = false;
    },
    displayPlanned(state) {
      state.displayMyday = false;
      state.displayImportant = false;
      state.displayPlanned = true;
      state.displayTasks = false;
    },
    displayTasks(state) {
      state.displayMyday = false;
      state.displayImportant = false;
      state.displayPlanned = false;
      state.displayTasks = true;
    },
  },
});

export const importantAction = important.actions;
export default important.reducer;
