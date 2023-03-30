import React, {useEffect, useState} from "react";
import {links, NavLink, useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import UserContext from '../context/UserContext';
import {API} from "../../config/API";
import axios from 'axios';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCheck} from '@fortawesome/free-solid-svg-icons';

// <!-- Vendor CSS Files -->
import '../../assets/vendor/animatecss/animate.min.css';
import '../../assets/vendor/aos/aos.css';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/glightbox/css/glightbox.min.css';
import '../../assets/vendor/swiper/swiper-bundle.min.css';
import logo from '../../assets/img/home/logo.svg';
// Main CSS File
import '../../assets/css/style.css';
// responsive CSS File
import '../../assets/css/responsive.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { HiInformationCircle } from "react-icons/hi";
import { FaHandsHelping } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

import app from '../../assets/img/home/Group 01.svg';


const Header =() => {


  const [ setSessionId ] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const mobilemenuShow = () => setShow(true);

  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  // const token_forgot = localStorage.getItem("token_forgot");
  //   console.log("TOken_Forgot_password", token_forgot);
 
  let sessionID;
  const navigate = useNavigate();

  const notify = () => toast.success("User Logged Out!");
  const memberLog = () => toast.warn("Please Login to Continue");

  const handleLogout = (event) => {
      event.preventDefault();
      localStorage.clear();
      navigate('/login')
      // window.location.reload(false);
      // window.location.reload();
      // notify();
      
  }

    return(
        <>

          {/* <!-- ======= Header ======= --> */}
            <header id="header" className="fixed-top d-flex align-items-center header-transparent">
              <div className="container d-flex justify-content-between align-items-center">

                <div className="logo">
                  <h1 className="text-light">
                  <NavLink to="/">
                    <img src={logo} alt="logo"  />
                    </NavLink>
                  </h1>
                </div>

                <nav id="navbar" className="navbar">
                  <ul>
                    <li>
                      <NavLink className="" to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/aboutus"> About us</NavLink>
                      </li>
                    <li>
                      <NavLink to="/help">Help</NavLink>
                    </li>
                    <li>
                      <NavLink to="/referral">Referral</NavLink>
                    </li>

                    {/* <li> */}
                    {      
                      verification_otp || token != undefined || '' ? (

                        <li class="dropdown">
                          <a href="#">
                            <span>
                            My account <IoIosArrowDown style={{ color: 'rgb(20, 34, 224);' }}/>
                              </span> 
                          </a>
                        <ul>
                        <li> <NavLink to="/dashboard">Dashboard</NavLink></li>
                          <li><NavLink onClick={handleLogout}>Logout</NavLink></li>
                        </ul>
                      </li>
                      
                      ) : (
                        <>
                        <li>
                        <NavLink to="/signup">Signup</NavLink>
                        </li>
                        <li>
                        <NavLink to="/login">Login</NavLink>
                        </li>
                        </>
                      )
                    }
                    {/* </li> */}

                  </ul>
                
                </nav> 
                {/* <!-- .navbar --> */}

                <RxHamburgerMenu onClick={mobilemenuShow}  className="mobile-btn"/>

                <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> <div className="logo">
                  <h1 className="text-light">
                  <NavLink to="/">
                    <img src={logo} alt="logo"  />
                    </NavLink>
                  </h1>
                </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         

                <nav id="navbar" className="navbar">
                  <ul>
                    <li>
                      <NavLink className="" to="/" onClick={handleClose}><GoHome/> Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/aboutus" onClick={handleClose}> <HiInformationCircle/> About us</NavLink>
                      </li>
                    <li>
                      <NavLink to="/help" onClick={handleClose}><FaHandsHelping/>Help</NavLink>
                    </li>
                    <li>
                      <NavLink to="/referral" onClick={handleClose}><HiUserGroup/>Referral</NavLink>
                    </li>

                    {/* <li> */}
                    {      
                      verification_otp || token != undefined || '' ? (

                        <li class="dropdown">
                          <a href="#">
                            <span>
                            My account <IoIosArrowDown style={{ color: 'rgb(20, 34, 224);' }}/>
                              </span> 
                          </a>
                        <ul>
                        <li> <NavLink to="/dashboard" onClick={handleClose}>UserDashboard</NavLink></li>
                          <li><NavLink onClick={handleLogout}>Logout</NavLink></li>
                        </ul>
                      </li>
                      
                      ) : (
                        <>
                        <li>
                        <NavLink to="/signup" onClick={handleClose}>Signup</NavLink>
                        </li>
                        <li>
                        <NavLink to="/login" onClick={handleClose}>Login</NavLink>
                        </li>
                        </>
                      )
                    }
                    {/* </li> */}

                  </ul>
                
                </nav> 
                {/* <!-- .navbar --> */}

                <div className="row">
                  <div className="mobile-app-section">
                <p>Download the RemitAssure App</p>
                <img src={app} alt="app-icons"/>
                </div>
                </div>
        </Offcanvas.Body>
      </Offcanvas>
                

              </div>
            </header>
            {/* <!-- End Header --> */}

        </>
    )
}


export default Header;