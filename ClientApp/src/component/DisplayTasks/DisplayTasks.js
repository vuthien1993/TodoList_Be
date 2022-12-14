import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction, selectIsdone } from "../../Redux/important";
import { Link } from "react-router-dom";
import { selectImportant } from "../../Redux/important";
function DisplayTasks(props) {
  const timeNow = new Date().getDate();

  const [id, setId] = useState("");

  //chon cac state tu redux
  const display = useSelector((state) => state.nextStep.display);
  const width = useSelector((state) => state.nextStep.width);
  const displayMyday = useSelector((state) => state.important.displayMyday);
  const displayImportant = useSelector(
    (state) => state.important.displayImportant
  );
  const displayTasks = useSelector((state) => state.important.displayTasks);
  const showCompleted = useSelector((state) => state.important.showCompleted);
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const idDetail = useSelector((state) => state.important.idTasks);
  const dispatch = useDispatch();

  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    const isDone = ele.isDone;
    const isMyday = ele.isMyday;
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    dispatch(importantAction.showDetail({ tasksName, idDetail, isMyday }));
    dispatch(importantAction.showImportantDetail({ isImportant, isDone }));
    console.log(showTasksDetail);
  };
  //chon viec quan trong
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const idI = ele.id;
    dispatch(selectImportant(idI));

    // dispatch(importantAction.important({ idI }));
    if (ele.id === id) {
      const isImportant = !ele.isImportant;
      dispatch(importantAction.showImportantDetail({ isImportant }));
    }
  };
  //ham chon va bo chon hoan thanh cong viec
  const isDoneHandler = (ele, event) => {
    event.stopPropagation();
    const idC = ele.id;
    dispatch(selectIsdone(idC));

    // dispatch(importantAction.complete({ idC }));
    if (idC === idDetail) {
      dispatch(importantAction.showCompletedDetail());
    }
  };
  const showCompletedHandler = () => {
    dispatch(importantAction.showCompleted());
  };
  ////////////////////// x??? l?? step/////////////
  const nextStepArr = useSelector((state) => state.nextStep.nextStepArr);
  const displayStep = (ele) => {
    const stepDetail = nextStepArr.filter(
      (element) => element.idDetail === ele.id
    );
    const stepDetailCompleted = stepDetail.filter((e) => e.isDone === true);
    return { stepDetail, stepDetailCompleted };
  };
  ////////////////khai bao bi???n t???i ??u code jsx ////////////
  const datePlannedToday = (
    <span className="textBlue">
      <span className="fa-solid fa-calendar-days" />
      <span>Today</span>
    </span>
  );
  const datePlannedTomorow = (
    <span className="textGray">
      <span className="fa-solid fa-calendar-days" />
      <span>Tomorow</span>
    </span>
  );

  const iconMyday = (
    <span className="textGray">
      <svg
        className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
        fill="currentColor"
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <path
          d="M8 1c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 10a3 3 0 100-6 3 3 0 000 6zm0-1a2 2 0 110-4 2 2 0 010 4zm6.5-1.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM8 13c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zM2.5 8.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zm.65-5.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 9.7a.5.5 0 11-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm9-9.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 9.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z"
          fill="currentColor"
        ></path>
      </svg>
      My Day
    </span>
  );

  return (
    <>
      <div>
        {[...props.tasksArrToday].reverse().map((ele) => {
          return (
            <div
              className={`${
                display && width < 910
                  ? "borderTasksArrMobile"
                  : ele.id === idDetail
                  ? "borderTasksArrActive"
                  : "borderTasksArr"
              }`}
              key={ele.id}
              onClick={() => showTasksDetailHandler(ele)}
            >
              <Link to="id/AKDJSDSSSSSSJDNKSDSDF=DETAIL">
                <div className="fll iconLine">
                  <i
                    className="fa-regular fa-circle "
                    onClick={(event) => {
                      isDoneHandler(ele, event);
                    }}
                  ></i>
                </div>
                <div className="fll taskName">
                  <span
                    className={`${
                      !ele.isMyday &&
                      displayStep(ele).stepDetail.length === 0 &&
                      !ele.isPlanned &&
                      !ele.timeOut &&
                      displayTasks &&
                      ele.time === timeNow &&
                      "tasksLine"
                    } `}
                  >
                    <span className="fontSize14">{ele.tasks}</span>
                  </span>
                  <br />
                  <span className="mydayFontsize">
                    {(ele.isMyday && displayMyday && !displayTasks && (
                      <span className="textGray">Tasks</span>
                    )) ||
                      (ele.isImportant && !displayTasks && (
                        <span className="textGray">Tasks</span>
                      ))}

                    {ele.isPlanned &&
                      !ele.timeOut &&
                      ele.time === timeNow &&
                      datePlannedToday}
                    {!ele.timeOut &&
                      ele.time === timeNow + 1 &&
                      datePlannedTomorow}
                    {!ele.timeOut && ele.time > timeNow + 1 && (
                      <span className="later textGray">
                        <span className="fa-solid fa-calendar-days" />
                        <span>{ele.timed}</span>
                      </span>
                    )}
                    {ele.isMyday && displayTasks && iconMyday}
                    {ele.timeOut && (
                      <span className="textRed">
                        <span className="fa-solid fa-calendar-days" />
                        <span> {ele.timed}</span>
                      </span>
                    )}
                    {displayStep(ele).stepDetail.length !== 0 &&
                      ele.isMyday === true && (
                        <span className="textGray">
                          .
                          {displayStep(ele).stepDetail.length ===
                            displayStep(ele).stepDetailCompleted.length && (
                            <span className="fa-regular fa-circle-check" />
                          )}
                          {displayStep(ele).stepDetailCompleted.length} of{" "}
                          {displayStep(ele).stepDetail.length}
                        </span>
                      )}
                    {displayStep(ele).stepDetail.length !== 0 &&
                      ele.isMyday === false && (
                        <span className="textGray">
                          {displayStep(ele).stepDetail.length ===
                            displayStep(ele).stepDetailCompleted.length && (
                            <span className="fa-regular fa-circle-check" />
                          )}{" "}
                          {displayStep(ele).stepDetailCompleted.length} of{" "}
                          {displayStep(ele).stepDetail.length}
                        </span>
                      )}
                  </span>
                </div>
                <div className={`fll iconLineStar`}>
                  {!ele.isImportant && (
                    <i
                      style={{ color: "blue" }}
                      onClick={(event) => testHandler(ele, event)}
                      className="fa-regular fa-star"
                      data-toggle="tooltip"
                      title="Mark tasks as important!"
                    ></i>
                  )}
                  {ele.isImportant && (
                    <i
                      onClick={(event) => testHandler(ele, event)}
                      style={{ color: "blue" }}
                      className="fa-solid fa-star"
                      data-toggle="tooltip"
                      title="Remove importance!"
                    ></i>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* viec da hoan thanh */}
      {props.tasksArrCompleted.length > 0 && (
        <>
          <br />

          <div onClick={showCompletedHandler} className="completed">
            {!showCompleted ? (
              <span className="fa-solid fa-chevron-right iconWidthCompleted" />
            ) : (
              <span className="fa-solid fa-chevron-down iconWidthCompleted" />
            )}
            <span>Completed</span> <span>{props.tasksArrCompleted.length}</span>
          </div>
        </>
      )}

      {showCompleted && (
        <div>
          {props.tasksArrCompleted.map((ele) => {
            return (
              <div
                className={`${
                  display && width < 910
                    ? "borderTasksArrMobile"
                    : ele.id === idDetail
                    ? "borderTasksArrActive"
                    : "borderTasksArr"
                }`}
                key={ele.id}
                onClick={() => showTasksDetailHandler(ele)}
              >
                <div className="fll iconLine">
                  <i
                    style={{ color: "blue" }}
                    className="fa-solid fa-circle-check"
                    onClick={(event) => isDoneHandler(ele, event)}
                  ></i>
                </div>
                <div className="fll taskName">
                  <span
                    className={`${
                      !ele.isMyday &&
                      displayStep(ele).stepDetail.length === 0 &&
                      !ele.isPlanned &&
                      !ele.timeOut &&
                      displayTasks &&
                      ele.time === timeNow &&
                      "tasksLine"
                    }`}
                  >
                    <span className="checked fontSize14"> {ele.tasks}</span>
                  </span>
                  <br />
                  <span className="mydayFontsize">
                    {ele.isImportant && displayImportant && (
                      <span className="textGray">Tasks</span>
                    )}
                    {ele.isMyday && displayMyday && (
                      <span className="textGray">Tasks</span>
                    )}
                    {ele.isPlanned &&
                      !ele.timeOut &&
                      ele.time === timeNow &&
                      datePlannedToday}
                    {ele.isPlanned &&
                      !ele.timeOut &&
                      ele.time === timeNow + 1 &&
                      datePlannedTomorow}
                    {ele.isPlanned && !ele.timeOut && ele.time > timeNow + 1 && (
                      <span className="later textGray">
                        <span className="fa-solid fa-calendar-days" />
                        <span>{ele.timed}</span>
                      </span>
                    )}

                    {ele.isMyday && displayTasks && iconMyday}
                    {ele.timeOut && (
                      <span className="textRed">
                        <span className="fa-solid fa-calendar-days" />
                        <span> {ele.timed}</span>
                      </span>
                    )}
                    {displayStep(ele).stepDetail.length !== 0 &&
                      ele.isMyday === true && (
                        <span className="textGray">
                          .{" "}
                          {displayStep(ele).stepDetail.length ===
                            displayStep(ele).stepDetailCompleted.length && (
                            <span className="fa-regular fa-circle-check" />
                          )}
                          {displayStep(ele).stepDetailCompleted.length} of{" "}
                          {displayStep(ele).stepDetail.length}
                        </span>
                      )}
                    {displayStep(ele).stepDetail.length !== 0 &&
                      ele.isMyday === false && (
                        <span className="textGray">
                          {displayStep(ele).stepDetail.length ===
                            displayStep(ele).stepDetailCompleted.length && (
                            <span className="fa-regular fa-circle-check" />
                          )}{" "}
                          {displayStep(ele).stepDetailCompleted.length} of{" "}
                          {displayStep(ele).stepDetail.length}
                        </span>
                      )}
                  </span>
                </div>
                <div className={`fll iconLineStar`}>
                  {!ele.isImportant && (
                    <i
                      style={{ color: "blue" }}
                      onClick={(event) => testHandler(ele, event)}
                      className="fa-regular fa-star"
                      data-toggle="tooltip"
                      title="Mark tasks as important!"
                    ></i>
                  )}
                  {ele.isImportant && (
                    <i
                      onClick={(event) => testHandler(ele, event)}
                      style={{ color: "blue" }}
                      className="fa-solid fa-star"
                      data-toggle="tooltip"
                      title="Remove importance!"
                    ></i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
export default DisplayTasks;
