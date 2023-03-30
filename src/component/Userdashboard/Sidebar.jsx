import React, { useState, useContext, useEffect  } from "react";
import {links, NavLink, useNavigate} from 'react-router-dom';
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
import { BsCurrencyExchange} from "react-icons/bs";
import { BsFilePersonFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";


const sidebar = () => {
  
  /**************************token ************************ */
     const token = localStorage.getItem("token");
     console.log("TOKEN", token);
  
    
const verification_otp = localStorage.getItem("verification_otp");
console.log("Verification Message", verification_otp)
  
  
  /**************************Feild of state ************************ */
  

    return (

    <>
    {  
           token || verification_otp != undefined || '' ? (
    
    <div  className="sidebar">
        <nav>
            <ul>
                <li><NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink></li>
                <li><NavLink to="/usersendmoney"><BsCurrencyExchange />Send Money</NavLink></li>
                <li><NavLink to="/userprofile"><BsFilePersonFill />Profile Information</NavLink></li>
                <li><NavLink to="/transfer"><BiTransfer />Transfer</NavLink></li>
                <li><NavLink to="/userrecipients"><BsFillPersonPlusFill />Recipients</NavLink></li>
                <li><NavLink to="/changepassword"><RiLockPasswordLine />Password</NavLink></li>
            </ul>
        </nav>
    {/* <Nav variant="pills" className="flex-column">
    <Nav.Item>
        <NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/usersendmoney"><BsCurrencyExchange />Send Money</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard"><BsFilePersonFill />Profile Information</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard"><BiTransfer />Transfer</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard"><BsFillPersonPlusFill />Recipients</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard"><RiLockPasswordLine />Password</NavLink>
      </Nav.Item>

    </Nav> */}
    </div>

):(
  <></>

 )
}

</>
 )
}



export default sidebar;