
import React, { useState, useContext, useEffect, useRef } from "react";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, useNavigate, useParams } from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import UserRecipient from "../Userdashboard/UserRecipient";
import profileimage from '../../assets/img/userdashboard/images.png';

import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Page404 from "../pageNotfound/Page404";
// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const SingleRecipientProfile = () => {

  /*********************Start page show hide condtion page ****************************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const RecipientUserName = localStorage.getItem("RecipientUserName");
  console.log("RecipientUserName", RecipientUserName);

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);




  /*************data get ************/
  let { id } = useParams();
  // alert(id)
  console.log("========================>", id);


  /************ Start -Recipient Bank Details state***************/
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

  /************ Start -messageText state***************/
  const [senderDetailData, setSenderDetailData] = React.useState('');
  // const [userRecipientData, setUserRecipientData] = useState('');

  /************ Start -Recipient Bank Details state***************/

  const [formValue, setFormValue] = React.useState({
    bankName: '', accountName: '', accountNumber: '', firstName: '', middleName: '',
    lastName: '', email: '', mobile: '', address: '', reasonMoney: ''
  });

  /************ Start -Recipient Bank Details function***************/
  const handleStep2InputChange = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let valueForm = formValue
    valueForm[key] = e.target.value
    setFormValue(valueForm)
    console.log(formValue)
  }
  /************ Start - Cancel Recipient Bank Details function***************/
  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }



  // Start page show hide condtion page

  const navigate = useNavigate('');


  // const search = useLocation()


  /**********************Design function************ */
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };


  /**************************************************************************
    * ************** Start  Recipient Bank Details ****************************
    * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  useEffect(() => {
    console.log("Data=========>", id)

    // event.preventDefault();
    //  setLoading(true); // Set loading before sending API requestssss
    axios.get(API.BASE_URL + `payment/recipient-update/${id}`, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setSenderDetailData(response.data.data);
        //  setLoading(false); // Stop loading   
      })
      .catch(function (error, message) {
        console.log(error.response);
        //  setLoading(false); // Stop loading in case of error
        // setBankNameText(error.response.data); 

      })

  }, [])






  return (
    <>
     {
      LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (
      <section>
        <div className="margin-set">
          <div className="tabs-page">
            <Sidebar />
            <div className="content-body">
              <section className="edit_recipient_section">

                <div className="form-head mb-4">
                  <h2 className="text-black font-w600 mb-0"><b>Profile</b>
                    <NavLink to="/userrecipients">
                      <button className="start-form-button back-btn" >
                        <MdOutlineKeyboardBackspace />
                        Back
                      </button>
                    </NavLink>
                  </h2>
                </div>
                {/* <div className="row">
          <NavLink to="/userrecipients">
                    <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
                </NavLink>
          </div> */}

                <div className="row">
                  <div className="col-lg-12">
                    <div className="profile card card-body px-3 pt-3 pb-0">

                      {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}

                      <div className="profile-head">
                        <div className="photo-content">
                          {/* <h1>{senderDetailData.first_name}</h1> */}
                        </div>
                        <div className="profile-info">
                          <div className="profile-photo">
                            <img src={profileimage} alt="images" />
                          </div>
                          <div className="profile-details">
                            <div className="profile-name">
                              <h4 className="text-primary mb-0">{senderDetailData.first_name}</h4>
                            </div>
                          </div>
                        </div>

                        <form className="single-recipient">
                          <div className="view-profile-section">
                            <Table stripped bordered hover size="sm" className="profile-table">
                              <tr><th colspan={2}>Bank information</th></tr>
                              <tr>
                                <td>Bank Name: </td>
                                <td>{senderDetailData.bank_name}</td>
                              </tr>
                              <tr>
                                <td>Account Name: </td>
                                <td>{senderDetailData.account_name}</td>
                              </tr>
                              <tr>
                                <td>Account Number: </td>
                                <td>{senderDetailData.account_number}</td>
                              </tr>
                              <tr><th colspan={2}>Personal information</th></tr>
                              <tr>
                                <td>First Name: </td>
                                <td>{senderDetailData.account_number}</td>
                              </tr>
                              <tr>
                                <td>Middle Name: </td>
                                <td>{senderDetailData.middle_name}</td>
                              </tr>
                              <tr>
                                <td>Last Name: </td>
                                <td>{senderDetailData.last_name}</td>
                              </tr>
                              <tr>
                                <td>Email: </td>
                                <td>{senderDetailData.last_name}</td>
                              </tr>
                              <tr>
                                <td>Mobile Number: </td>
                                <td>{senderDetailData.mobile}</td>
                              </tr>
                              <tr><th colspan={2}>Address</th></tr>
                              <tr>
                                <td>Flat: </td>
                                <td>{senderDetailData.flast}</td>
                              </tr>
                              <tr>
                                <td>Building: </td>
                                <td>{senderDetailData.building}</td>
                              </tr>
                              <tr>
                                <td>Street: </td>
                                <td>{senderDetailData.street}</td>
                              </tr>
                              <tr>
                                <td>Postcode: </td>
                                <td>{senderDetailData.postcode}</td>
                              </tr>
                              <tr>
                                <td>City: </td>
                                <td>{senderDetailData.city}</td>
                              </tr>
                              <tr>
                                <td>State: </td>
                                <td>{senderDetailData.state}</td>
                              </tr>
                              <tr>
                                <td>Country code: </td>
                                <td>{senderDetailData.country_code}</td>
                              </tr>
                              <tr>
                                <td>Country: </td>
                                <td>{senderDetailData.country}</td>
                              </tr>
                              <tr>
                                <td>Reason for sending Money: </td>
                                <td>{senderDetailData.reasonMoney}</td>
                              </tr>
                            </Table>
                            {/* <ul>
                      <li><b>Bank Name: </b>{senderDetailData.bank_name}</li>
                      <li><b>Account Name: </b>{senderDetailData.account_name}</li>
                      <li><b>Account Number: </b>{senderDetailData.account_number}</li>
                      <li><b>First Name : </b>{senderDetailData.first_name}</li>
                      <li><b>Middle Name : </b>{senderDetailData.middle_name}</li>
                      <li><b>Last Name : </b>{senderDetailData.last_name}</li>
                      <li><b>Email: </b>{senderDetailData.email}</li>
                      <li><b>Mobile Number : </b>{senderDetailData.mobile}</li>
                      <li><b>Flat : </b>{senderDetailData.flast}</li>
                      <li><b>Building : </b>{senderDetailData.building}</li>
                      <li><b>Street : </b>{senderDetailData.street}</li>
                      <li><b>Postcode: </b>{senderDetailData.postcode}</li>
                      <li><b>City : </b>{senderDetailData.city}</li>
                      <li><b>State: </b>{senderDetailData.state}</li>
                      <li><b>Country code : </b>{senderDetailData.country_code}</li>
                      <li><b>Country : </b>{senderDetailData.country}</li>
                      <li><b>Country code : </b>{senderDetailData.reasonMoney}</li>
                      </ul> */}
                          </div>








                          <div className="row">
                            <div className="col-md-4">
                              {/* <button 
                      type="submit" 
                      className="start-form-button"
                      onClick={handlRecipientBankDetails}
                      >
                        Clear
                      </button> */}
                            </div>
                            <div className="col-md-8">
                              {/* <button
                      type="button" 
                      className="form-button single_button"
                      disabled
                      >
                      Save
                      
                      
                      </button> */}
                            </div>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>


              </section>
            </div>
          </div>
        </div>
      </section>
      ):(
        <>
        <Page404 />
        </>
      )
      }
    </>
  )
}



export default SingleRecipientProfile;