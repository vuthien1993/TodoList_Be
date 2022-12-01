import React from "react";
import useInput from "../../hook/use-input";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../../Redux/userArr";
import { useDispatch, useSelector } from "react-redux";
import "./SignUp.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userArr = useSelector((state) => state.userArr.userArr);
  let emailInputAvalaible = false;
  //validate input bằng custom hook use-input
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsvalid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 7);
  const {
    value: enteredCfPassword,
    isValid: enteredCfPasswordIsvalid,
    hasError: cfPasswordInputHasError,
    valueChangeHandler: cfPasswordChangeHandler,
    inputBlurHandler: cfPasswordBlurHandler,
    reset: resetCfPasswordInput,
  } = useInput((value) => value === enteredPassword);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsvalid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // kiem tra email nhap vao da được sd chưa
  userArr.forEach((ele) => {
    if (ele.email === enteredEmail) {
      emailInputAvalaible = true;
    }
    return emailInputAvalaible;
  });

  const {
    value: enteredName,
    isValid: enteredNameIsvalid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsvalid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => value.length > 9);
  let formIsvalid = false;

  if (
    enteredCfPassword &&
    enteredNameIsvalid &&
    enteredEmailIsvalid &&
    enteredPasswordIsvalid &&
    enteredPhoneIsvalid &&
    !emailInputAvalaible
  ) {
    formIsvalid = true;
  }
  //ham submit data
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredPasswordIsvalid && !enteredEmailIsvalid) {
      return;
    }
    resetPasswordInput();
    resetEmailInput();
    resetNameInput();
    resetPhoneInput();
    const userItem = {
      userName: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      phoneNumber: enteredPhone,
    };
    console.log(userItem);
    dispatch(addNewUser(userItem));
    alert("dang ky thanh cong");
    navigate("/login", { replace: true });
    //dieu huong den trang login
  };
  const passwordInputClasses = passwordInputHasError ? " invalid" : "";
  const cfPasswordInputClasses = cfPasswordInputHasError ? " invalid" : "";
  const emailInputClasses = emailInputHasError ? " invalid" : "";
  const nameInputClasses = nameInputHasError ? " invalid" : "";
  const phoneInputClasses = phoneInputHasError ? " invalid" : "";

  return (
    <div className="backgroundSignUp">
      <div className="borderSignUp">
        <h1>SING UP</h1>
        <form onSubmit={formSubmitHandler}>
          <div className={nameInputClasses}>
            <input
              placeholder="Full Name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameInputHasError && (
              <p className="error-text">Please enter name</p>
            )}
          </div>
          <div className={emailInputClasses}>
            <input
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailInputHasError && (
              <p className="error-text">Please enter a valid email</p>
            )}
            {emailInputAvalaible && (
              <p className="error-text">
                This email is already in use, please enter another email
              </p>
            )}
          </div>
          <div className={passwordInputClasses}>
            <input
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordInputHasError && (
              <p className="error-text">
                Please enter password, password is larger than 8 characters
              </p>
            )}
          </div>
          <div className={cfPasswordInputClasses}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={enteredCfPassword}
              onChange={cfPasswordChangeHandler}
              onBlur={cfPasswordBlurHandler}
            />
            {cfPasswordInputHasError && (
              <p className="error-text">
                Please enter the password and confirm the password is the same!
              </p>
            )}
          </div>
          <div className={phoneInputClasses}>
            <input
              placeholder="Phone"
              type="number"
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
            {phoneInputHasError && (
              <p className="error-text">
                Please enter phone, phone is larger than 8 characters
              </p>
            )}
          </div>
          <div className="buttonDisabled">
            <button disabled={!formIsvalid} type="submit">
              SIGN UP
            </button>
          </div>
          <p>
            <span>Login?</span>
            <Link to="/login">
              <span>Click</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
