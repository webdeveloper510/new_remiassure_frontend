import React, { useState, useContext, useEffect, useRef } from "react";
import { links, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserProfile from "./UserProfile";
import AddNewRecipient from "./AddNewRecipient";
import ChangePassword from "./ChangePassword";
import Transfer from "./Transfer";
import Dashboard from "./Dashboard";
import { BsCurrencyExchange } from "react-icons/bs";
import { BsFilePersonFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegCreditCard } from "react-icons/fa";
import Page404 from "../pageNotfound/Page404";


const Sidebar = () => {

  /**************************token ************************ */
  const token = localStorage.getItem("token");
  // console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  // console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  // console.log("signup_token", signup_token);

  const DigitalCode = localStorage.getItem("DigitalCode");
  // console.log("DigitalCode", DigitalCode);


  const verification_otp = localStorage.getItem("verification_otp");
  // console.log("Verification Message", verification_otp)


  /**************************Feild of state ************************ */
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (

    <>
      <div className={`Sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <button className="btn view_mobile_sidebar toggle-button" onClick={handleSidebarToggle}><RxDashboard /> View Dashboard</button>

        <div className="sidebar">
          {isOpen && (
            <label className="close-sidebar btn-close" onClick={handleCloseSidebar}>

            </label>
          )}
          <nav>
            <ul>
              <li><NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink></li>
              <li><NavLink to="/user-send-money"><BsCurrencyExchange />New Transfer</NavLink></li>
              <li><NavLink to="/user-profile"><BsFilePersonFill />Profile Information</NavLink></li>
              <li><NavLink to="/transactions"><BiTransfer />Transactions</NavLink></li>
              <li><NavLink to="/user-recipients"><BsFillPersonPlusFill />Recipients</NavLink></li>
              {/* <li><NavLink to="/user-card-list"><FaRegCreditCard />Cards</NavLink></li> */}
              <li><NavLink to="/change-password"><RiLockPasswordLine />Password</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={handleCloseSidebar} />}
    </>
  )
}



export default Sidebar;