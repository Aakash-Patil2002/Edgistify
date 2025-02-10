import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo-dark.png'
const Navbar = () => {
  const [user,setUser]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    setUser(localStorage.getItem('user'))
  },[])
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    setUser('')
    navigate('/login');
  };
  return (
    <div className="bg-light">
      <div className={styles.navbarTop}>
        <p className="d-none d-md-block">BEST SPECIAL OFFERS! 40% OFF!</p>
        <img
          className={styles.logo}
          src={logo}
          alt="Logo"
        />
        <div className={styles.navbarIcons}>
          <Link to="/cart">
            <i className="fa fa-shopping-cart d-none d-md-inline-block"></i>
          </Link>
          <div className="dropdown">
            <button
              className="btn px-0 dropdown-toggle text-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className={styles.user}>{user ? user : "Guest"}</span>
            </button>
            <ul className="dropdown-menu">
              {user ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myorders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item btn btn-danger"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            className={`searchIcon d-md-none ${styles.searchIcon}`}
            id="searchIcon"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      <div className={`navbar-middle d-none d-md-block ${styles.navbarMiddle}`}>
        <ul className={`navigation-links ${styles.navigationLinks}`}>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/cart">CART</Link>
          </li>
          <li>
            <Link to="/myorders">MY ORDERS</Link>
          </li>
          <li>
            <Link to="/">PAGES</Link>
          </li>
          <li>
            <Link to="/">MEGA</Link>
          </li>
          <li>
            <Link to="/">CONTACTS</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
