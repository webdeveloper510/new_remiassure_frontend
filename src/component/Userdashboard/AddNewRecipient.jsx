
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, useNavigate } from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import { API } from "../../config/API";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const Addnewrecipient = () => {

  /************ Start-show hide condtion page ***************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const RecipientUserName = localStorage.getItem("RecipientUserName");
  console.log("RecipientUserName", RecipientUserName);

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);


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
/************************Counrt Mobile code ************************ */



  /************ Start -Recipient Bank Details state***************/
  const [bankNameValue, setBankNameValue] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState(''); 
  const [mobile, setMobile] = useState("");
  
  const [formValue, setFormValue] = React.useState({
    firstName: '', middleName: '',
    lastName: '', email: '', flat: '', building: '', street: '', postcode: '', city: '',
    state: '', country_code: '', country: '', reasonMoney: ''
  });

  /************ Start -Recipient Bank Details function***************/
  const handleStep2InputChange = (e, key) => {
    console.log(e)
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

/*************************Character pass value in Bank Name ************************ */
  const handleChange = (event) => {
    const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
    if (event.target.value === '' || regex.test(event.target.value)) {
      setBankNameValue(event.target.value);
    }
  };


  const handleAccountNameValue = (event) => {
    const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
    if (event.target.value === '' || regex.test(event.target.value)) {
      setAccountName(event.target.value);
    }
  };

   const handleAccountNumberValue = (event) => {
    const newValue = event.target.value.replace(/\D/, ""); // remove non-numeric characters
    setAccountNumber(newValue);
      console.log(accountNumber, "accountNumberaccountNumber") 
  };



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

    //useRef is used for focusing on inputbox
    //     if(errorBankName.length==0){
    //   		input_grant_type.current.focus();
    //   		setError(true);
    //       console.log(error, "error")
    //   	} 

    //  else{

    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/recipient-create/', {
      bank_name: bankNameValue,
      account_name: accountName,
      account_number:accountNumber,
      first_name: formValue.firstName,
      middle_name: formValue.middleName,
      last_name: formValue.lastName,
      email: formValue.email,
      mobile: mobile,
      flat: formValue.flat,
      building: formValue.building,
      street: formValue.street,
      postcode: formValue.postcode,
      city: formValue.city,
      state: formValue.state,
     country_code: formValue.country_code,
      country: countryValue.label,
      reason: formValue.reasonMoney

    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        setLoading(false); // Stop loading  
        navigate('/userrecipients');


      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);



      })
  }
  // }


  return (
    <>
      {/* <Recipients /> */}

      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (

          <div className="margin-set">
            <div className="tabs-page">
              <Sidebar />
              <div className="content-body">
                <section className="showrecepient">
                  <div class="form-head mb-4">
                    <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b>
                      <NavLink to="/userrecipients">
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
                                value={bankNameValue} 
                                onChange={handleChange}
                              />
                              <span style={myStyle}>{BankNameText.Enterbank ? BankNameText.Enterbank : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                className='rate_input form-control'
                                value={accountName}
                                onChange={handleAccountNameValue}

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
                                value={accountNumber}
                                onChange={handleAccountNumberValue}
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
                              <span style={myStyle}>{BankNameText.Enterfirstname ? BankNameText.Enterfirstname : ''}</span>
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
                              <span style={myStyle}>{BankNameText.Enterlastname ? BankNameText.Enterlastname : ''}</span>
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
                              <span style={myStyle}>{BankNameText.Enteremail ? BankNameText.Enteremail : ''}</span>
                              <span style={myStyle}>{BankNameText.Emailinvalid ? BankNameText.Emailinvalid : ''}</span>
                              <span style={myStyle}>{BankNameText.Emailexist ? BankNameText.Emailexist : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                              <PhoneInput
                                country={"eg"}
                                enableSearch={true}
                                value={mobile}
                                onChange={(mobile) => setMobile(mobile)}
                              />
                              {/* <input
                                type="number"
                                // ref={input_recipientMobile}
                                className='rate_input form-control'
                                name="mobile"
                                defaultValue={formValue.mobile}
                                onChange={(e) => handleStep2InputChange(e, 'mobile')}
                              /> */}
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
                              <p className="get-text">Country Code<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                name="country_code"
                                className='rate_input form-control'
                                defaultValue={formValue.country_code}
                                onChange={(e) => handleStep2InputChange(e, 'country_code')}
                              />
                                <span style={myStyle}>{BankNameText.Entercountrycode ? BankNameText.Entercountrycode : ''}</span>
                            </Form.Group> 
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                              <Select
                                ref={input_location}
                                options={countryoptions}
                                value={countryValue}
                                onChange={changeHandler}
                              />
                                <span style={myStyle}>{BankNameText.Selectcountry ? BankNameText.Selectcountry : ''}</span>
                              {/* <CountryDropdown 
                      id="UNIQUE_ID"
                      name="country"
                       className='YOUR_CSS_CLASS rate_input form-control'
                        preferredCountries={['gb', 'us' ]}
                         value="" handleChange={e=> console.log(e.target.value)}
                         defaultValue={formValue.country}
                         onChange={(e)=> handleStep2InputChange(e,'country')}
                         >

                         </CountryDropdown> */}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
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
                              <span style={myStyle}>{BankNameText.Reason ? BankNameText.Reason : ''}</span>
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
                                <div class="loader-overly">
                                  <div class="loader" >

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
          <>
            <Page404 />
          </>

        )
      }

    </>
  )
}



export default Addnewrecipient;