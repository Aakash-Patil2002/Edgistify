import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import style from "./Login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (password!=='') {
      setPassError(false);
    } else {
      setPassError(true);
    }

    if (emailRegex.test(email) && password!=='') {
      axios
        .post("http://localhost:5001/api/auth/login", { email, password })
        .then((result) => {
          if (result) {
            localStorage.setItem("user", result.data.user);
            localStorage.setItem("jwt", result.data.token);
          }
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };
  return (
    <>
      <div className={style.login_page}>
        <main className={style.login_form}>
          <form  onSubmit={loginHandler}>
            <h2 className={style.login_heading}>Login</h2>
            <div className=" input-group">
              <span className="input-group-text">
                <FaUserCircle />
              </span>
              <input
                type="text"
                value={email}
                className={style.inp1 + " form-control"}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className={emailError ? `${style.error}` : `${style.hideError}`}>
              Enter valid email
            </p>

            <div className="input-group">
              <span className="input-group-text">
                <IoIosLock />
              </span>
              <input
                value={password}
                type={showPass ? "text" : "password"}
                className={style.inp1 + " form-control"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-group-text eye_img"
                onMouseDown={() => setShowPass(true)}
                onMouseUp={() => setShowPass(false)}
              >
                {showPass ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            <p className={passError ? `${style.error}` : `${style.hideError}`}>
              Enter valid password
            </p>

            <button type="submit" className={style.btn + " mt-1"}>
              Login
            </button>
            <div className="d-flex justify-content-between">
              <p className={style.swipe}>
                New here?{" "}
                <span>
                  <Link to="/register">Sign up</Link>
                </span>
              </p>
              <p className={style.forget}>
                <Link to={"/forgetPass"} className={style.forget}>
                  Forgot password?
                </Link>
              </p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
