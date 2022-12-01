import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApiTasks } from "./Redux/important";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./layout/NavBar";
import MenuRow from "./layout/MenuRow";
import MyDay from "./component/MyDay/MyDay";
import Planned from "./component/Planned/Planned";
import Tasks from "./component/Tasks/Tasks";
import Important from "./component/Important/Important";
import { importantAction } from "./Redux/important";
import SignUp from "./component/SignUp/SignUp";
import LogIn from "./component/LogIn/LogIn";
import useWrapper from "./hook/use-wrapper";
import "./App.css";
import { fetchApiUser } from "./Redux/userArr";

function App() {
  const { timeNow, monthNow } = useWrapper();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApiTasks());
    dispatch(fetchApiUser());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
    }, 1000);
  }, []);

  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks/myday" />} />

          <Route path="/tasks/*" element={<MenuRow />}>
            <Route path="myday" element={<MyDay />}>
              <Route path="id/AKDJSDSSSSSSJDNKSDSDF=DETAIL" />
            </Route>
            <Route path="important" element={<Important />}>
              <Route path="id/AKDJSDSSSSSSJDNKSDSDF=DETAIL" />
            </Route>
            <Route path="planned" element={<Planned />}>
              <Route path="id/AKDJSDSSSSSSJDNKSDSDF=DETAIL" />
            </Route>
            <Route path="inbox" element={<Tasks />}>
              {" "}
              <Route path="id/AKDJSDSSSSSSJDNKSDSDF=DETAIL" />
            </Route>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
