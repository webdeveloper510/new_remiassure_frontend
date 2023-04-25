
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


const EditCardUser = () => {

  /**************************token ************************ */
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



  /*************data get ************/
  let { id } = useParams();
  //    alert(id)
  console.log("========================>", id);


  /************ Start -Recipient Bank Details state***************/
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  /************ Start -messageText state***************/
  const [BankNameText, setBankNameText] = React.useState('');
  // const [userRecipientData, setUserRecipientData] = useState('');
  const [RecepientsData, setRecepientsData] = React.useState('');

  /************ Start -Card Bank Details state***************/
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [exp_month, setExp_month] = useState('');
  const [exp_year, setExp_year] = useState('');



  const handleName =(event) => {
    const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
    if (event.target.value === '' || regex.test(event.target.value)) {
      setName(event.target.value);
    }
   
  }

  const handleNumber =(event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
    setNumber(newValue);

  }

  const handleExpiryMonth =(event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
    setExp_month(newValue);
  }

  const handleExpiryYear =(event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
    setExp_year(newValue);
  }

  /************ Start -Recipient Bank Details function***************/
  // const handleStep2InputChange =(e,key) =>{
  //   console.log(e.target.value)
  //   console.log(key)
  //   let valueForm = formValue
  //   valueForm[key] = e.target.value
  //   setFormValue(valueForm)
  //   console.log(formValue)
  // }
  /************ Start - Cancel Recipient Bank Details function***************/
  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }

  //Get data of update value 

  /****************** select country *******************/

  const [countryValue, setcountryValue] = React.useState('')
  const countryoptions = useMemo(() => countryList().getData(), [])

  const changeHandler = countryValue => {
    setcountryValue(countryValue)
  }

  /* start-- useRef is used for focusing on inputbox */
  const input_name= useRef(null);
  const input_card_number = useRef(null);
  const input_expiry_month = useRef(null);
  const input_expiry_year = useRef(null);
  

  // Start page show hide condtion page

  const navigate = useNavigate('');


  /**************************************************************************
    * ************** Start  Recipient Bank Details ****************************
    * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  useEffect(() => {
    console.log("Data=========>", id)

    // event.preventDefault();
    //  setLoading(true); // Set loading before sending API requestssss
    axios.post(API.BASE_URL + `payment/card/${id}`, {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setName(response.data.data.name);
        setNumber(response.data.data.card_number);
        console.log(number, " =========> number");
        setExp_month(response.data.data.expiry_month);
        setExp_year(response.data.data.expiry_year);
        //  setLoading(false); // Stop loading   
      })
      .catch(function (error, message) {
        console.log(error.response);
        //  setLoading(false); // Stop loading in case of error
        // setBankNameText(error.response.data); 

      })

  }, [])

  /**************************************************************************
    * ************** Start  Recipient Bank Details ****************************
    * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  const handleCardUpdateDetails = (value) => {
     if(name.length==0){
      input_name.current.focus();
      setError(true);
    } else if (number.length==0){
      input_card_number.current.focus();
      setError(true);
    }else if (exp_month.length==0){
      input_expiry_month.current.focus();
      setError(true);
    }else if (exp_year.length==0){
      input_expiry_year.current.focus();
      setError(true);
    }
    else{
    console.log("============>token", token)
   
    // event.preventDefault();
    setLoading(true); // Set loading before sending API requestssss
    axios.patch(API.BASE_URL + `payment/card/${value}`, {
      name: name,
      card_number: number,
      expiry_month: exp_month,
      expiry_year: exp_year,


    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false); // Stop loading 
        navigate('/userCardLists');

      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        // setBankNameText(error.response.data);

      })
  }
}







  return (
    <>
      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (

          <section>
            <div className="margin-set">
              <div className="tabs-page">
                <Sidebar />

                {/* <div class="form-head mb-4">
                <h2 ><b>Profile</b>
                </h2>
                <NavLink to="/userrecipients">
                    <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
                </NavLink>
              </div> */}


                <div className="content-body">
                  <section className="edit_recipient_section">
                    <div class="form-head mb-4">
                      <h2 class="text-black font-w600 mb-0"><b>Update Card </b>
                        <NavLink to="/userCardLists">
                          <button className="start-form-button back-btn" >
                            <MdOutlineKeyboardBackspace />
                            Back
                          </button>
                        </NavLink>
                        {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}

                      </h2></div>
                    {/* <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span>
          <span style={myStyle}>{BankNameText.userrecipient? BankNameText.userrecipient: ''}</span> */}
                    <form className="single-recipient">
                      <div className="card">
                        <div className="card-body">

                          <div className="row">
                            {/* <h5>Bank Information</h5> */}
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Card Name<span style={{ color: 'red' }} >*</span></p>
                                <input
                                  ref={input_name}
                                  type="text"
                                  className="rate_input form-control"
                                  name="name"
                                  value={name}
                                  onChange={(e) => {handleName(e)}}
                                //  placeholder={RecepientsData.bank_name}
                                />
                                 {error&& name.length<=0?
				                         <span style={myStyle}>Please Enter the Card Name </span>:""}


                                <span style={myStyle}>{BankNameText.name? BankNameText.name: ''}</span> 

                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Card Number<span style={{ color: 'red' }} >*</span></p>
                                <input
                                  type="text"
                                  name="number"
                                  ref={input_card_number}
                                  value={number}
                                  onChange={handleNumber}
                                  className='rate_input form-control'
                                />
                                 {error&& number.length<=0?
				                         <span style={myStyle}>Please Enter the Card Number </span>:""}

                                <span style={myStyle}>{BankNameText.card_number? BankNameText.card_number: ''}</span>

                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Card expiry month<span style={{ color: 'red' }} >*</span></p>
                                <input
                                 type="text"
                                 name="exp_month"
                                 ref={input_expiry_month}
                                 value={exp_month}
                                 onChange={handleExpiryMonth}
                                 className='rate_input form-control'
                                />
                                 {error&& exp_month.length<=0?
				                         <span style={myStyle}>Please Enter the Card Expiry Month </span>:""}

                                <span style={myStyle}>{BankNameText.expiry_month ? BankNameText.expiry_month : ''}</span>
                                <span style={myStyle}>{BankNameText.Accountnumberexist ? BankNameText.Accountnumberexist : ''}</span>
                              </div>
                            </div>
                            </div>
                            <div className="row each-row">
                            <div className="col-md-4">
                              <div className="input_field">
                                <p className="get-text">Card expiry yaer<span style={{ color: 'red' }} >*</span></p>
                                <input
                                 type="text"
                                 name="exp_year"
                                 ref={input_expiry_year}
                                 value={exp_year}
                                 onChange={handleExpiryYear}
                                 className='rate_input form-control'
                                />
                               {error&& exp_year.length<=0?
				                         <span style={myStyle}>Please Enter the Card Expiry Year </span>:""}

                                <span style={myStyle}>{BankNameText.expiry_year? BankNameText.expiry_year: ''}</span>
                              <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span> 
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
                                Clear
                              </button>
                            </div>
                            <div className="col-md-8">
                              <button
                                type="button"
                                className="form-button"
                                onClick={() => handleCardUpdateDetails(id)}
                              >
                                Update Card

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
          </section>

        ) : (
          <>
            <Page404 />
          </>

        )
      }
    </>
  )
}



export default EditCardUser;