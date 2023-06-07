
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, Navigate, useNavigate } from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import  global  from "../../utils/global";
import axios from "axios";
import UserRecipient from "../Userdashboard/UserRecipient";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Select from "react-select";
import countryList from 'react-select-country-list'
import Page404 from "../pageNotfound/Page404";
// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const Addnewcard = () => {

  /************ Start-show hide condtion page ***************/
  const token = localStorage.getItem("token");
  const userdt = JSON.parse(localStorage.getItem("remi-user-dt"))

  /************ Start -Recipient Bank Details state***************/
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

  /************ Start -messageText state***************/
  const [BankNameText, setBankNameText] = useState('');
  const [AccountNameText, setAccountNameText] = useState('');
  const [AccountNumberText, setAccountNumberText] = useState('');

  const [emailRecipientText, setEmailRecipientText] = useState('');
  const [first_nameRecipientText, setFirst_nameRecipientText] = useState('');
  const [last_nameRecipientText, setLast_nameRecipientText] = useState('');
  const [middle_nameRecipientText, setMiddle_nameRecipientText] = useState('');
  const [mobileRecipientText, setMobileRecipientText] = useState('');


  /************ Start -Recipient Bank Details state***************/
  const [formValue, setFormValue] = React.useState({
    bankName: '', accountName: '', accountNumber: '', firstName: '', middleName: '',
    lastName: '', email: '', mobile: '', flat: '', building: '', street: '', postcode: '', city: '',
    state: '', country_code: '', country: '', reasonMoney: ''
  });

  /************ Start -Recipient Bank Details function***************/
  const handleStep2InputChange = (e, key) => {
    let valueForm = formValue
    valueForm[key] = e.target.value
    setFormValue(valueForm)
  }
  /************ Start - Cancel Recipient Bank Details function***************/
  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);
  }


  /****************** select country *******************/

  const [countryValue, setcountryValue] = React.useState('')
  const countryoptions = useMemo(() => countryList().getData(), [])

  const changeHandler = countryValue => {
    setcountryValue(countryValue)
  }

  /* start-- useRef is used for focusing on inputbox */
  const input_location = useRef(null);



  // Start page show hide condtion page

  const navigate = useNavigate('');





  /**********************Design function************ */
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };


  /**************************************************************************
* ************** Start  Recipient Bank Details ****************************
* ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  const input_grant_type = useRef(null);
  const input_recipientAccountName = useRef(null);
  const input_recipientAccountNumber = useRef(null);
  const input_recipientFirstName = useRef(null);
  const input_recipientMiddleName = useRef(null);
  const input_recipientLastName = useRef(null);
  const input_recipientEmail = useRef(null);
  const input_recipientMobile = useRef(null);
  const input_recipientReasoMoney = useRef(null);
  const input_recipientAddress = useRef(null);


  const handleRecipientBankDetails = (event) => {
    event.preventDefault();


    setLoading(true); // Set loading before sending api request
    axios.post(global.serverUrl + '/payment/recipient-create/', {
      bank_name: formValue.bankName,
      account_name: formValue.accountName,
      account_number: formValue.accountNumber,
      first_name: formValue.firstName,
      middle_name: formValue.middleName,
      last_name: formValue.lastName,
      email: formValue.email,
      mobile: formValue.mobile,
      flat: formValue.flat,
      building: formValue.building,
      sreet: formValue.street,
      postcode: formValue.postcode,
      city: formValue.city,
      state: formValue.state,
      country_code: formValue.country_code,
      country: formValue.country,
      reasonMoney: formValue.reasonMoney

    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },

    })
      .then(function (response) {
        setLoading(false); // Stop loading  
        navigate('/user-recipients');


      })
      .catch(function (error, message) {
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);



      })
  }
  // }


  return (
    <>
      {
        userdt?.digital_id_verified && token? (
          <div className="margin-set">
            <div className="tabs-page">
              <Sidebar />
              <div className="content-body">
                <section className="showrecepient">
                  <div class="form-head mb-4">
                    <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b>
                      <NavLink to="/user-card-list">
                        <button className="start-form-button back-btn" >
                          <MdOutlineKeyboardBackspace />
                          Back
                        </button>
                      </NavLink>
                    </h2>
                  </div>
                  <form className="single-recipient">
                    <div className="card">
                      <div className="card-body">


                        {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}

                        <div className="row">
                          <h5>Bank Information</h5>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                className="rate_input form-control"
                                name="bankName"
                                defaultValue={formValue.bankName}
                                onChange={(e) => handleStep2InputChange(e, 'bankName')}
                              />
                              <span style={myStyle}>{BankNameText.Enterbank ? BankNameText.Enterbank : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                // ref={input_recipientAccountName}
                                defaultValue={formValue.accountName}
                                onChange={(e) => handleStep2InputChange(e, 'accountName')}
                                className='rate_input form-control'
                              // autoFocus="autofocus"
                              />
                              {/* {error&&formValue.accountName.length<=0?
                            <span style={myStyle}>Please Enter the Account Name </span>:""} */}
                              <span style={myStyle}>{BankNameText.Enteraccountname ? BankNameText.Enteraccountname : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                name="accountNumber"
                                // ref={input_recipientAccountNumber}
                                className='rate_input form-control'
                                defaultValue={formValue.accountNumber}
                                onChange={(e) => handleStep2InputChange(e, 'accountNumber')}
                              />
                              {/* {error&&formValue.accountNumber.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""} */}
                              <span style={myStyle}>{BankNameText.Enteraccountnumber ? BankNameText.Enteraccountnumber : ''}</span>
                              <span style={myStyle}>{BankNameText.Accountnumberexist ? BankNameText.Accountnumberexist : ''}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row each-row">
                          <h5>Recipient Details</h5>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                // ref={input_recipientFirstName}
                                className='rate_input form-control'
                                name="firstName"
                                defaultValue={formValue.firstName}
                                onChange={(e) => handleStep2InputChange(e, 'firstName')}
                              />
                              {/* {error&&formValue.firstName.length<=0?
                            <span style={myStyle}>Please Enter the First Name </span>:""} */}
                              <span style={myStyle}>{BankNameText.first_name ? BankNameText.first_name : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Middle Name</p>
                              <input
                                type="text"
                                // ref={input_recipientMiddleName}
                                className='rate_input form-control'
                                name="middleName"
                                defaultValue={formValue.middleName}
                                onChange={(e) => handleStep2InputChange(e, 'middleName')}
                              />
                              <span style={myStyle}>{BankNameText.middle_name ? BankNameText.middle_name : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                // ref={input_recipientLastName}
                                className='rate_input form-control'
                                name="lastName"
                                defaultValue={formValue.lastName}
                                onChange={(e) => handleStep2InputChange(e, 'lastName')}
                              />
                              <span style={myStyle}>{BankNameText.last_name ? BankNameText.last_name : ''}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="email"
                                // ref={input_recipientEmail}
                                className='rate_input form-control'
                                name="email"
                                defaultValue={formValue.email}
                                onChange={(e) => handleStep2InputChange(e, 'email')}
                              />
                              <span style={myStyle}>{BankNameText.email ? BankNameText.email : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="number"
                                // ref={input_recipientMobile}
                                className='rate_input form-control'
                                name="mobile"
                                defaultValue={formValue.mobile}
                                onChange={(e) => handleStep2InputChange(e, 'mobile')}
                              />
                              <span style={myStyle}>{BankNameText.mobile ? BankNameText.mobile : ''}</span>
                              <span style={myStyle}>{BankNameText.Entermobile ? BankNameText.Entermobile : ''}</span>
                              <span style={myStyle}>{BankNameText.Validmobile ? BankNameText.Validmobile : ''}</span>
                              <span style={myStyle}>{BankNameText.Mobileexist ? BankNameText.Mobileexist : ''}</span>
                              <span style={myStyle}>{BankNameText.Invalidmobile ? BankNameText.Invalidmobile : ''}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row each-row">
                          <h5>Address</h5>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Flat/Unit No.</p>
                              <Form.Control
                                type="text"
                                className='rate_input form-control'
                                name="flat"
                                defaultValue={formValue.flat}
                                onChange={(e) => handleStep2InputChange(e, 'flat')}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Building/Unit No.</p>
                              <Form.Control
                                type="text"
                                className='rate_input form-control'
                                name="building"
                                defaultValue={formValue.building}
                                onChange={(e) => handleStep2InputChange(e, 'building')}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Street</p>
                              <Form.Control
                                type="text"
                                className='rate_input form-control'
                                name="street"
                                defaultValue={formValue.street}
                                onChange={(e) => handleStep2InputChange(e, 'street')}
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Postcode</p>
                              <Form.Control
                                type="text"
                                name="postcode"
                                className='rate_input form-control'
                                defaultValue={formValue.postcode}
                                onChange={(e) => handleStep2InputChange(e, 'postcode')}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">City/Town</p>
                              <Form.Control
                                type="text"
                                name="city"
                                className='rate_input form-control'
                                defaultValue={formValue.city}
                                onChange={(e) => handleStep2InputChange(e, 'city')}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">State</p>
                              <Form.Control
                                type="text"
                                name="state"
                                className='rate_input form-control'
                                defaultValue={formValue.state}
                                onChange={(e) => handleStep2InputChange(e, 'state')}
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country Code</p>
                              <Form.Control
                                type="text"
                                name="country_code"
                                className='rate_input form-control'
                                defaultValue={formValue.country_code}
                                onChange={(e) => handleStep2InputChange(e, 'country_code')}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country</p>
                              <Select
                                ref={input_location}
                                options={countryoptions}
                                value={countryValue}
                                onChange={changeHandler}
                              />
                        
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Reason For Sending Money</p>
                              <select
                                className="form-select rate_input form-control"
                                aria-label="Select a reason"
                                // ref={input_recipientReasoMoney}
                                name="reasonMoney"
                                defaultValue={formValue.reasonMoney}
                                onChange={(e) => handleStep2InputChange(e, 'reasonMoney')}
                              >
                                <option selected>Select a reason</option>
                                <option value="Family Support">Family Support</option>
                                <option value="Education">Education</option>
                                <option value="Tax Payment">Tax Payment</option>
                                <option value="Loan Payment">Loan Payment</option>
                                <option value="Travel Payment">Travel Payment</option>
                                <option value="Utility Payment">Utility Payment</option>
                              </select>
                              {/* {error&&formValue.reasonMoney.length<=0?
                            <span style={myStyle}>Please Select the Reason For Sending Money </span>:""} */}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <button
                              type="submit"
                              className="start-form-button"
                              onClick={handlRecipientBankDetails}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col-md-8">
                            <button
                              type="submit"
                              className="form-button"
                              onClick={handleRecipientBankDetails}
                            >
                              Create Recipient

                              {loading ? <>
                                <div className="loader-overly">
                                  <div className="loader" >

                                  </div>

                                </div>
                              </> : <></>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>



                </section>
              </div>
            </div>
          </div>

        ) : (
          <Navigate to="/send-money" />
        )
      }
    </>
  )
}



export default Addnewcard;