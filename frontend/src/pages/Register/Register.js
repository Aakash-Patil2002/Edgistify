import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import style from './Register.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passError, setPassError] = useState(false)
  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (name !== '') {
      setNameError(false);
    } else {
      setNameError(true);
    }
    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (passwordRegex.test(password)) {

      setPassError(false);
    } else {
      setPassError(true);
    }
    if (emailRegex.test(email) && passwordRegex.test(password) && name !== '') {
      axios.post("http://localhost:5001/api/auth/register", { name, email, password }).then((result) => {
        alert(result.data.message);
        navigate('/login');
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }

  }
  return (
      <div className={style.login_page}>
        <form className={style.login_form} onSubmit={registerHandler}>
          <h2 className={style.login_heading}>Register</h2>
          <div className="input-group ">
            <span className="input-group-text"><FaUserCircle /></span>
            <input type="text" value={name} className={style.inp1 + " form-control"} placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <p className={nameError ? `${style.error}` : `${style.hideError}`}>Name is Require</p>

          <div className=" input-group">
            <span className="input-group-text"><FaUserCircle /></span>
            <input type="text" value={email} className={style.inp1 + " form-control"} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <p className={emailError ? `${style.error}` : `${style.hideError}`}>Enter valid email</p>

          <div className="input-group">
            <span className="input-group-text"><IoIosLock /></span>
            <input value={password} type={showPass ? "text" : "password"} className={style.inp1 + " form-control"} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <span className="input-group-text eye_img" onMouseDown={() => setShowPass(true)} onMouseUp={() => setShowPass(false)}>{showPass ? <IoEye /> : <IoEyeOff />}</span>
          </div>
          <p className={passError ? `${style.error}` : `${style.hideError}`}>Enter strong password</p>

          <button type="submit" className={style.btn + " mt-1"}>Register</button>
          <div className="d-flex justify-content-between">
            <p className={style.swipe}>Already have account? <span><Link to='/login'>Sign In</Link></span></p>
          </div>
        </form>
      </div>
  )
}

export default Register
