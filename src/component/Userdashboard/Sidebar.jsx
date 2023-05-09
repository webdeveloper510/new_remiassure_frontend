import React, { useState, useContext, useEffect } from "react";
import { links, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import UserSendMoney from "./UserSendMoney";
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


const sidebar = () => {

  /**************************token ************************ */
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);


  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)


  /**************************Feild of state ************************ */


  return (

    <>
      <div className="sidebar">
        <nav>
          <ul>
            <li><NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink></li>
            <li><NavLink to="/user-send-money"><BsCurrencyExchange />Send Money</NavLink></li>
            <li><NavLink to="/user-profile"><BsFilePersonFill />Profile Information</NavLink></li>
            <li><NavLink to="/transfer"><BiTransfer />Transaction</NavLink></li>
            <li><NavLink to="/user-recipients"><BsFillPersonPlusFill />Recipients</NavLink></li>
            <li><NavLink to="/user-card-list"><FaRegCreditCard />Card</NavLink></li>
            <li><NavLink to="/change-password"><RiLockPasswordLine />Password</NavLink></li>
          </ul>
        </nav>
      </div>
    </>
  )
}



export default sidebar;