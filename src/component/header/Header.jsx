import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';

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
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

import app from '../../assets/img/home/Group 01.svg';


const Header = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const mobilemenuShow = () => setShow(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("remi-user-dt"));
  const LoginDigitalidVerified = user?.digital_id_verified

  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    toast.success('Logout Successfully', { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
    navigate('/login')
  }

  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center header-transparent">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <h1 className="text-light">
              <NavLink to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </h1>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <NavLink className="" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about-us"> About us</NavLink>
              </li>
              <li>
                <NavLink to="/help">Help</NavLink>
              </li>
              <li>
                <NavLink to="/referral">Referral</NavLink>
              </li>
              {
                token && user ? (
                  <li class="dropdown">
                    <span>
                      My account <IoIosArrowDown style={{ color: 'rgb(20, 34, 224);' }} />
                    </span>
                    <ul>
                      {
                        LoginDigitalidVerified == "true" ? (
                          <li> <NavLink to="/dashboard">Dashboard</NavLink></li>
                        ) : (
                          <li> <NavLink to="/send-money">Send Money</NavLink></li>
                        )
                      }
                      <li><NavLink onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/sign-up">Signup</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  </>
                )
              }
            </ul>
          </nav>
          <RxHamburgerMenu onClick={mobilemenuShow} className="mobile-btn" />
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> <div className="logo">
                <h1 className="text-light">
                  <NavLink to="/">
                    <img src={logo} alt="logo" />
                  </NavLink>
                </h1>
              </div></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <nav id="navbar" className="navbar">
                <ul>
                  <li>
                    <NavLink className="" to="/" onClick={handleClose}><GoHome /> Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about-us" onClick={handleClose}> <HiInformationCircle /> About us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/help" onClick={handleClose}><FaHandsHelping />Help</NavLink>
                  </li>
                  <li>
                    <NavLink to="/referral" onClick={handleClose}><HiUserGroup />Referral</NavLink>
                  </li>
                  {
                    token && user ? (
                      <li class="dropdown">
                        <a href="#">
                          <span>
                            My account <IoIosArrowDown style={{ color: 'rgb(20, 34, 224);' }} />
                          </span>
                        </a>
                        <ul>
                          {
                            LoginDigitalidVerified == "true" ? (
                              <li> <NavLink to="/dashboard" onClick={handleClose}>User Dashboard</NavLink></li>
                            ) : (
                              <li> <NavLink to="/send-money" onClick={handleClose}>Send Money</NavLink></li>
                            )
                          }
                          <li><NavLink onClick={handleLogout}>Logout</NavLink></li>
                        </ul>
                      </li>
                    ) : (
                      <>
                        <li>
                          <NavLink to="/sign-up" onClick={handleClose}><FaUserPlus />Signup</NavLink>
                        </li>
                        <li>
                          <NavLink to="/login" onClick={handleClose}><AiOutlineLogin />Login</NavLink>
                        </li>
                      </>
                    )
                  }
                </ul>
              </nav>
              <div className="row">
                <div className="mobile-app-section">
                  <p>Download the RemitAssure App</p>
                  <img src={app} alt="app-icons" />
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </header>
    </>
  )
}


export default Header;