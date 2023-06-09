import React, { useState, useContext, useEffect } from "react";
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
import Page404 from "../pageNotfound/Page404";


const UserDashboard = () => {

  /**************************token ************************ */
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  /**************************Feild of state ************************ */


  return (
    <>
      {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (

          <div className="margin-set">

            <div class="tabs-page">
              {/* <div class="header"><h1>UserDashboard</h1></div> */}
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                <div className="sidebar">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first"><RxDashboard />Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second"><BsCurrencyExchange />Send Money</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third"><BsFilePersonFill />Profile Information</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth"><BiTransfer />Transfer</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth"><BsFillPersonPlusFill />Recipients</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="sixth"><RiLockPasswordLine />Password</Nav.Link>
                    </Nav.Item>

                  </Nav>
                </div>
                <div className="content-body">
                  <Tab.Content>

                    <Tab.Pane eventKey="first">

                      <Dashboard />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">

                      <div className="user-sendmoney"> <UserSendMoney /></div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div className="user-sendmoney"><UserProfile /></div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <Transfer />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                      <div className="tabs-recipent"> <AddNewRecipient /></div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                      <div className="tabs-recipent"> <ChangePassword /></div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>

              </Tab.Container>
            </div>


          </div>
        ) : (
          <>
            <Page404 />
          </>

        )
      }



      {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}

    </>
  )
}



export default UserDashboard;