
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, useNavigate, useParams } from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import UserRecipient from "../Userdashboard/UserRecipient";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Sidebar from './Sidebar';
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

const Profile = () => {
  /************************Start page show hide condtion page ******************************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const RecipientUserName = localStorage.getItem("RecipientUserName");
  console.log("RecipientUserName", RecipientUserName);

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  //Get data of update value 
  /*************data get ************/
  let { id } = useParams();
  // alert(id)
  console.log("========================>", id);


  /************ Start -Recipient Bank Details state***************/
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorUserRecipient, setErrorUserRecipient] = useState(false);

  /************ Start -messageText state***************/
  const [profileText, setProfileText] = React.useState('');
  const [BankNameText, setBankNameText] = React.useState('');
  // const [userRecipientData, setUserRecipientData] = useState('');
  const [RecepientsData, setRecepientsData] = React.useState('');
  /**************************** get profile data *******************/
  const [senderDetailData, setSenderDetailData] = React.useState('');

  /************ Start -Recipient Bank Details state***************/
  // const [bankName, setBankName] = useState('')
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [flat, setFlat] = useState('');
  const [gender, setGender] = useState('');
  const [building, setBuilding] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country_code, setCountry_code] = useState('');
  const [country, setcountry] = useState('');
  const [Date_of_birth, setDate_of_birth] = useState('');
  const [Countrybirth, setCountrybirth] = useState('');
  const [reasonMoney, setReasonMoney] = useState('');
  const [customer_id, setCustomer_id] = useState('');



  /************ Start -Recipient Bank Details function***************/
  // const  =(e,key) =>{
  //   console.log(e.target.value)
  //   console.log(key)
  //   let valueForm = formValue
  //   valueForm[key] = e.target.value
  //   setFormValue(valueForm)
  //   console.log(formValue)
  // }
  /************ Start - Cancel Recipient Bank Details function***************/
  // const handlRecipientBankDetails = (e) => {
  //   e.preventDefault();
  //   window.location.reload(false);

  //   console.log("handle request ");
  // }



  /****************** Start select country *******************/
  // const [countryValue, setcountryValue] = useState('')
  
  // const countryoptions = useMemo(() => countryList().getData(), [])
  // console.log(countryoptions, "countryoptionscountryoptions")

  // const changeHandler = countryValue => {
  //   setcountryValue(countryValue)
  
  // }

/****************** start-- useRef is used for focusing on inputbox *******************/
  const input_firstName = useRef(null);
  const input_middleName = useRef(null);
  const input_lastName = useRef(null);
  const input_email = useRef(null);
  const input_mobile = useRef(null);
  const input_flat = useRef(null);
  const input_building = useRef(null);
  const input_street = useRef(null);
  const input_city = useRef(null);
  const input_state = useRef(null);
  // const input_country = useRef(null);
  


  // Start page show hide condtion page
  const navigate = useNavigate('');


  // const search = useLocation()


  /**********************Design function************ */
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  /**********************Localstorage getting data*********** */

  // function handleDataStore(){

  //   var courses =JSON.parse(localStorage.getItem('RecepientsData') || "[]")
  //   var course ={
  //     account_name:formValue.account_name,
  //     // account_name:account_name
  //   }
  //   courses.push(course)

  //   localStorage.setItem('courses', JSON.stringify(courses))
  // }

  /**************************************************************************
    * ************** Start-- get data Profile ****************************
    * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
      useEffect(() => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'user-profile/', {}, {
          headers: {
            "Authorization": `Bearer ${signup_token ? signup_token : token}`,

          }
        })
          .then(function (response) {
            console.log("Recipients APIIIII", response.data);
            setFirstName(response.data.data.First_name);
            setMiddleName(response.data.data.Middle_name);
            setLastName(response.data.data.Last_name);
            setEmail(response.data.data.email);
            setMobile(response.data.data.mobile);
            // setcountryValue(response.data.data.location);
            setcountry(response.data.data.location);
            // alert(countryValue)
            setFlat(response.data.data.flat);
            setBuilding(response.data.data.building);
            setStreet(response.data.data.street);
            // setPostcode(response.data.address.postcode);
            setCity(response.data.data.city);
            setState(response.data.data.state);

          
            setReasonMoney(response.data.data.reasonMoney);
            setCustomer_id(response.data.data.customer_id);



            setLoading(false); // Stop loading
            //   if (response.status)
            // // notify();
          })
          .catch(function (error) {
            console.log(error);
            console.log(error.response);
            setLoading(false); // Stop loading in case of error

          })
      }, [])


   /**************************************************************************
    * ************** Start  Recipient Bank Details ****************************
    * ***********************************************************************/

      /* start-- useRef is used for focusing on inputbox */
      const handleUserProfileUpdate = (event) => {
        // console.log(countryValue,"countryValue==========================>");
        // alert("hii")
        // console.log("============>token", token)
        event.preventDefault();
        //   if (firstName.length==0){
        //     input_firstName.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (middleName.length==0){
        //     input_middleName.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (lastName.length==0){
        //     input_lastName.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (email.length==0){
        //     input_email.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (mobile.length==0){
        //     input_mobile.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (flat.length==0){
        //     input_flat.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (building.length==0){
        //     input_building.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (street.length==0){
        //     input_street.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (city.length==0){
        //     input_city.current.focus();
        //     setErrorUserRecipient(true);
        //   }else if (state.length==0){
        //     input_state.current.focus();
        //     setErrorUserRecipient(true);
        //   }
        //   // }else if (country.length==0){
        //   //   input_country.current.focus();
        //   //   setErrorUserRecipient(true);
        //   // }
        // else{
        setLoading(true); // Set loading before sending API requestssss
        axios.post(API.BASE_URL + 'update-profile/', {
          First_name: firstName,
          Middle_name: middleName,
          Last_name: lastName,
          email: email,
          mobile: mobile,
          flat: flat,
          building: building,
          street: street,
          city: city,
          state: state,
          location: country,
        }, {
          headers: {
            "Authorization": `Bearer ${signup_token ? signup_token : token}`,
          },
        })
          .then(function (response) {
            console.log(response);
            setLoading(false); // Stop loading 
            navigate('/dashboard');  
          })
          .catch(function (error, message) {
            console.log(error.response);
            setLoading(false); // Stop loading in case of error
            setBankNameText(error.response.data)
            console.log(BankNameText, "BankNameText")
          })
      }
    // }







  return (
    <>
      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (

      
            <div className="margin-set">
              <div className="tabs-page">
                <Sidebar />
                <div className="content-body">
                  <section className="edit_recipient_section">
                    <div class="form-head mb-4">
                      <h2 class="text-black font-w600 mb-0"><b>Profile Update</b></h2></div>
                    <form className="single-recipient">
                      <div className="card">
                        <div className="card-body">
                          <div className="row each-row">
                            <h5>Personal Details</h5>
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                                <input
                                  type="text"
                                  ref={input_firstName}
                                  className='rate_input form-control'
                                  Value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                               {errorUserRecipient&&firstName.length<=0?
                            <span style={myStyle}>Please Enter the First Name </span>:""} 

                                <span style={myStyle}>{BankNameText?.Enterfirstname ? BankNameText?.Enterfirstname : ''}</span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Middle Name</p>
                                <input
                                  type="text"
                                  ref={input_middleName}
                                  className='rate_input form-control'
                                  Value={middleName}
                                  onChange={(e) => setMiddleName(e.target.value)}
                                />

                                {errorUserRecipient&&middleName.length<=0?
                              <span style={myStyle}>Please Enter the Middle Name </span>:""} 

                                <span style={myStyle}>{BankNameText?.Entermiddlename ? BankNameText?.Entermiddlename : ''}</span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                                <input
                                  type="text"
                                   ref={input_lastName}
                                  className='rate_input form-control'
                                  Value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                                {errorUserRecipient&&lastName.length<=0?
                              <span style={myStyle}>Please Enter the Last Name </span>:""} 

                                <span style={myStyle}>{BankNameText?.Enterlastname ? BankNameText?.Enterlastname : ''}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row each-row">
                            <div className="col-md-6">
                              <div className="input_field">
                                <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                                <input
                                  type="email"
                                   ref={input_email}
                                  className='rate_input form-control'
                                  name="email"
                                  Value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                   {errorUserRecipient&&email.length<=0?
                              <span style={myStyle}>Please Enter the Email Address </span>:""} 

                                <span style={myStyle}>{BankNameText?.email ? BankNameText?.email : ''}</span>

                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="input_field">
                                <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                                {/* <input
                                  type="number"
                              
                                  name="mobile"
                                  Value={mobile}
                                  onChange={(e) => setMobile(e.target.value)}
                                /> */}
                                <PhoneInput
                                ref={input_mobile}
                                country={"eg"}
                                enableSearch={true}
                                value={mobile}
                                onChange={(mobile) => setMobile(mobile)}
                              />
                               {errorUserRecipient&& mobile.length<=0?
                                  <span style={myStyle}>Please Enter the Mobile Number </span>:""} 

                                <span style={myStyle}>{BankNameText?.mobile ? BankNameText?.mobile : ''}</span>
                                <span style={myStyle}>{BankNameText?.Entervalidmobile ? BankNameText?.Entervalidmobile : ''}</span>
                                <span style={myStyle}>{BankNameText?.Mobileexist ? BankNameText?.Mobileexist : ''}</span>
                                <span style={myStyle}>{BankNameText?.Invalidmobile ? BankNameText?.Invalidmobile : ''}</span>
                              </div>
                            </div>
                            {/* <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Referral code<span style={{color: 'red'}} >*</span></p>
                        <input 
                        type="text" 
                          className='rate_input form-control'
                          name="referralCode"`
                          Value={referralCode}
                          onChange={(e)=>setReferralCode(e.target.value)}
                          />
                          <span style={myStyle}>{BankNameText.mobile? BankNameText.mobile: ''}</span>
                          <span style={myStyle}>{BankNameText.Entervalidmobile? BankNameText.Entervalidmobile: ''}</span>
                          <span style={myStyle}>{BankNameText.Mobileexist? BankNameText.Mobileexist: ''}</span>
                          <span style={myStyle}>{BankNameText.Invalidmobile? BankNameText.Invalidmobile: ''}</span>
                      </div>
                    </div> */}
                          </div>

                          <div className="row each-row">
                            <h5>Address</h5>
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">Flat/Unit No.</p>
                                <Form.Control
                                  type="text"
                                  ref={input_flat}
                                  className='rate_input form-control'
                                  Value={flat}
                                  onChange={(e) => setFlat(e.target.value)}
                                />
                                 {errorUserRecipient&&flat.length<=0?
                                  <span style={myStyle}>Please Enter the Flat Name</span>:""} 
                                     <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                              </Form.Group>
                            </div>
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">Building/Unit No.</p>
                                <Form.Control
                                  type="text"
                                  ref={input_building}
                                  className='rate_input form-control'
                                  Value={building}
                                  onChange={(e) => setBuilding(e.target.value)}
                                />
                                  {errorUserRecipient&&building.length<=0?
                                  <span style={myStyle}>Please Enter the Building Name</span>:""} 
                                     <span style={myStyle}>{BankNameText?.Enterbuilding ? BankNameText?.Enterbuilding : ''}</span>
                              </Form.Group>
                            </div>
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">Street</p>
                                <Form.Control
                                  type="text"
                                  ref={input_street}
                                  className='rate_input form-control'
                                  Value={street}
                                  onChange={(e) => setStreet(e.target.value)}
                                />
                                  {errorUserRecipient&&street.length<=0?
                                  <span style={myStyle}>Please Enter the Street Name</span>:""} 
                                     <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                                
                              </Form.Group>
                            </div>
                          </div>
                          <div className="row each-row">
                            {/* <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">Postcode</p>
                                <Form.Control
                                  type="text"
                                  className='rate_input form-control'
                                  Value={postcode}
                                  onChange={(e) => setPostcode(e.target.value)}
                                />
                              </Form.Group>
                            </div> */}
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">City/Town</p>
                                <Form.Control
                                  type="text"
                                  ref={input_city}
                                  className='rate_input form-control'
                                  Value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                                     {errorUserRecipient&&city.length<=0?
                                  <span style={myStyle}>Please Enter the City Name</span>:""} 
                                     <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                              </Form.Group>
                            </div>
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">State</p>
                                <Form.Control
                                  type="text"
                                  ref={input_state}
                                  className='rate_input form-control'
                                  Value={state}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                  {errorUserRecipient&&state.length<=0?
                                  <span style={myStyle}>Please Enter the State Name</span>:""} 
                              </Form.Group>
                              <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                            </div>
                            <div className="col-md-4">
                              <Form.Group className="form_label" controlId="Firstname">
                                <p className="get-text">Country</p>
                                {/* <Select
                                //  ref={input_country}
                                  options={countryoptions}
                                  defaultValue={countryValue}
                                  onChange={changeHandler}
                                /> */}

                                    <Form.Select 
                                    value={country}
                                    onChange={(e) => setcountry(e.target.value)}
                                       >   
                                      <option value="">--- Select Location ---</option>
                                      <option value="Australia">Australia</option>
                                      <option value="New zealand">New zealand</option>
                                                
                                                    </Form.Select>
                                 {/* {errorUserRecipient&&country.length<=0?
                                  <span style={myStyle}>Please Enter the Country Name</span>:""}  */}
                                     <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>

                              </Form.Group>
                              
                            </div>
                          </div>
                          <div className="row each-row">


                            {/* <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                            <p className="get-text">Country Code</p>
                            <Form.Control 
                              type="text" 
                              className='rate_input form-control' 
                              Value={country_code}
                              onChange={(e)=>setCountry_code(e.target.value)}
                              />
                        </Form.Group>
                      </div> */}
                            

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
                              <button
                                type="button"
                                className="form-button"
                                onClick={handleUserProfileUpdate}
                              >
                                Update

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



export default Profile;