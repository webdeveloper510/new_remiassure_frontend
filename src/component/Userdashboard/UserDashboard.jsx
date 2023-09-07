import React, { useState, useContext, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import UserMoney from "./UserMoney/UserMoney"
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
import authDashHelper from "../../utils/AuthDashHelper";
import { useNavigate } from "react-router";


const UserDashboard = () => {

  /**************************token ************************ */
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

useEffect(()=>{
  if (authDashHelper('dashCheck') === false) {
    navigate("/send-money")
 }
},[])


  /**************************Feild of state ************************ */


  return (
    <>
          <div className="margin-set">
            <div class="tabs-page">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                <div className="sidebar">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first"><RxDashboard />Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second"><BsCurrencyExchange />New Transfer</Nav.Link>
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

                      <div className="user-sendmoney"> <UserMoney /></div>
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

    </>
  )
}



export default UserDashboard;