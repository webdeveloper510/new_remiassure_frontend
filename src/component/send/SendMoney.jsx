import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { Links, NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from "../context/UserContext";
import { HiSwitchHorizontal } from 'react-icons/hi';
import Accordion from 'react-bootstrap/Accordion';
import creditcards from '../../assets/img/userdashboard/mastercard.png';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import ReactFlagsSelect from "react-flags-select";
import verified from '../../assets/img/userdashboard/3.png';
import { BsCheckCircleFill } from "react-icons/bs";
import Select from "react-select";
import countryList from 'react-select-country-list'
import sendmoney from "../../assets/img/userdashboard/money3.webp";
import Page404 from "../pageNotfound/Page404";
import nocard from "../../assets/img/userdashboard/nocard.jpg";
// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const SendMoney = () => {
  console.log('send Mondey')
  /************ Start page show hide condtion page ***************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);


  /************ Start -Recipient Bank Details***************/
  const [summaryList, setSummaryList] = React.useState(false);
  const [amountSummary, setAmountSummary] = React.useState(false);

  // const [bank_data, setBank_data] = React.useState([]);
  const [id, setId] = React.useState('');
  const [formValue, setFormValue] = React.useState({
    bankName: '', accountName: '', accountNumber: '', firstName: '', middleName: '',
    lastName: '', email: '', mobile: '', flat: '', building: '', street: '', postcode: '', city: '', state: '',
    country_code: '', country: '', reasonMoney: ''
  });

  /************ Start -messageText state***************/
  const [BankNameText, setBankNameText] = React.useState('');


  /******************* start Amount value  state   *******/
  const [amountValue, setAmountValue] = React.useState({
    amountInput: '',
    // summaryList: false,
  })
  /******************* Start IS Digital Id get State Data   *******/
  const [verificationValue, setverificationValue] = React.useState(false);
  /******************* End IS Digital Id get State Data    *******/

  /******************* Start  start select value get datae  *******/
  const { location } = useContext(UserContext);

  /******************* Start Api call Amount & Delivery State  *******/
  const [from, setFrom] = React.useState('USD');
  const [shows, setShows] = React.useState(false);
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState();
  const [exchange_amount, setExchange_amount] = React.useState();
  const [total_amount, setTotal_amount] = React.useState('');
  const [total_rate, setTotal_rate] = React.useState('');

  // const [options, setOptions] = React.useState([]);
  // const [output, setOutput] = React.useState(0);
  // const [info, setInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  /******************* Verify payment state digital Api state  *******/
  // const [code, setConde] =React.useState('');
  const [data, setData] = React.useState([]);
  /******************* End digital Api state   ***********************/

  /**************************** sender details data state *******************/
  const [senderDetailData, setSenderDetailData] = React.useState('');
  const [senderDetailText, setSenderDetailText] = React.useState('');
  const [formSenderValue, setFormSenderValue] = React.useState({
  firstName: '', middleName: '', lastName: '',DateofBirth: '',gender: '',CountryofBirth: '',  email: '', mobile: '',
   flat: '', building: '', street: '', postcode: '', city: '', state: '', country_code: '', countryName: '', 
  });

  /************ Start -Recipient card Error***************/
  const [currencyerrorText, setCurrencyerrorText] = React.useState('');

  /****************** modal credit card details */

  /******************* start card show  state   *******/
  const [showCards, setshowCards] = React.useState("");


  /************ Start -Recipient card Error***************/
  const [CardErrorText, setCardErrorText] = React.useState('');

  const [formCardValue, setformCardValue] = React.useState({
    cardNumber: '', securityCode: '', cardName: '', exp_month: '', exp_year: '',
  });

  /************ Start -Card List State***************/
  const [bankCardData, setBankCardData] = React.useState('');

  /************ Start -Digital id Verify state***************/
  const [code, setCode] = React.useState('')
  /*************************** Start- SelectPayment State************************* */
  const [checked, setChecked] = React.useState(false);

  /*************************SummeryData State************************ */
  const [summeryData, setSummeryData] = React.useState([]);




  const handleCloseDetails = () => setshowCards(false);
  const ShowCardDetails = () => setshowCards(true);


  // Start -Recipient Crad Details 
  const handleCardInputChange = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let CardForm = formCardValue
    CardForm[key] = e.target.value
    setformCardValue(CardForm)
    console.log(formCardValue)
  }

  const navigate = useNavigate();
  const notify = () => toast.success("Sign Up Successfully!");
  const emptyData = () => toast.warn("Please fill out all the fields");
  const emailExits = () => toast.error("User with this Email already exists!");


  // Start -Recipient Bank Details 
  const handleStep2InputChange = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let valueForm = formValue
    valueForm[key] = e.target.value
    setFormValue(valueForm)
    console.log(formValue)
  }


  // Start Amount Api
  // Start -Recipient Bank Details 
  const handleAmountCahngeValue = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let AmountData = amountValue
    AmountData[key] = e.target.value
    setAmountValue(AmountData)
    console.log(amountValue)
  }

  /************* sender details data function *******/
  const hamdleSenderDetailsData = (e, key) =>{
    console.log(e.target.value)
    console.log(key)
    let SenderData = formSenderValue
    SenderData[key] = e.target.value
    setFormSenderValue(SenderData)
    console.log(formSenderValue)
  }


  // function handleDataStore(){

  //   var courses =JSON.parse(localStorage.getItem('courses') || "[]")
  //   var course ={
  //     bank_name:bank_name,
  //     account_name:account_name
  //   }
  //   courses.push(course)

  //   localStorage.setItem('courses', JSON.stringify(courses))
  // }



  //multiple function call
  function someFunc() {
    handleShow();
    // handleDataStore();
  }

  const handleRecipientSummary = () => {
    setStep(step + 1);
    setSummaryList(!summaryList);
  }


  const handleAmountSummary = () => {
    // setStep(step+1);
    handleAmountDelivery();
    setAmountSummary(!amountSummary);
  }



  console.log(amountSummary, "amountSummaryamountSummary")

  //Get item localstorage
  const courses = localStorage.getItem('courses');
  console.log(courses, "coursescourses");


  //Total Amount get data
  const Total_amount = localStorage.getItem("Total_amount");
  console.log("Amonut", Total_amount);

  //Total Amount rate data 
  const Total_INR = localStorage.getItem("Total_INR");
  console.log("Amount rate", Total_INR);

  const [selected, setSelected] = React.useState("");

  //start Summury content change
  const [payment, setPayment] = React.useState('Bank Transfer');
  const [payment_partners, setPayment_partners] = React.useState('Bank');


  // start Recive Radio button
  const initialValue = {
    recivedMethod: "bankTransfer",
    payOutPartner: "bank",
    paymentType: "Oslo",
    // amount:0
  }
  const [moneyTransiction, setMoneyTransiction] = React.useState(initialValue);
  const {
    recivedMethod,
    payOutPartner,
    paymentType,
    // amount
  } = moneyTransiction;

  const onInputChange = e => {
    console.log(e.target.name)
    console.log(e.target.value)
    // console.log(defaultCountryData.length)
    setMoneyTransiction(item1 => ({ ...item1, [e.target.name]: e.target.value }));
  }
  // End Recive Radio button



  // console.log(from, "fromfromfromfromfromfromfromfrom")
  // console.log(to, "totototototototo")


  const handleFrom = (e) => {
    setFrom(e.target.value)
  }

  const handleTo = (e) => {
    setTo(e.target.value)
  }

  // useEffect(() =>)
  // const handleAmount = (e) =>{
  //   setAmount(e.target.value)
  //     if (amount.value.length == 0)
  //     { 

  //       return (setAmount.value.length = 0);
  //     }  	
  // }

  useEffect(() => {
    console.log(amountValue.amountInput)
  }, [amountValue.amountInput])


  const handleEntailmentRequest = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }

  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }

  const handlSenderDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }


  /**********Get data to localstoarge ***************/
  const FromValue = localStorage.getItem("FromValue")
  console.log(FromValue, "FromValue");

  const ToValue = localStorage.getItem("ToValue")
  console.log(ToValue, "ToValue");

  const AmountValue = localStorage.getItem("AmountValue")
  console.log(AmountValue, "AmountValue");

  const recipient_id = localStorage.getItem("recipient_id")
  console.log(recipient_id, "recipient_id");

  const recipientMoneyReason = localStorage.getItem("recipientMoneyReason")
  console.log(recipientMoneyReason, "recipientMoneyReason");

  const recipientDestination = localStorage.getItem("recipientDestination")
  console.log(recipientDestination, "recipientDestination");

  const recipientName = localStorage.getItem("recipientName")
  console.log(recipientName, "recipientName");



  /****************** select country *******************/

  const [countryValue, setcountryValue] = React.useState('')
  const countryoptions = useMemo(() => countryList().getData(), [])

  const changeHandler = countryValue => {
    setcountryValue(countryValue)
  }



  /*************************** Start- Select Payment Function************************* */
  const getCardDataPayment = (value) => {
    let CardForm = formCardValue
    CardForm.cardName = value.name;
    CardForm.cardNumber = value.number;
    CardForm.exp_month = value.exp_month;
    CardForm.exp_year = value.exp_year;

    setformCardValue(CardForm)
    console.log("value data===========================>123", formCardValue)
    // console.log("value data===========================>123",value)
  }
  /*************************** End - Select Payment Function************************* */




  /**************************************************************************
   * ************** Start  All Amount & Delivery  ******************************
   * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  const input_From = useRef(null);
  const input_To = useRef(null);
  const input_AmountSend = useRef(null);


  const handleAmountDelivery = () => {
    //  event.preventDefault();
    //  alert("hii")
    //useRef is used for focusing on inputbox
    if (from.length == 0) {
      input_From.current.focus();
      setError(true);
    } else if (to.length == 0) {
      input_To.current.focus();
      setError(true);
    } else if (amountValue.amountInput.length == 0) {
      input_AmountSend.current.focus();
      setError(true);
    }

    else {

      setLoading(true); // Set loading before sending API request
      axios.post(API.BASE_URL + 'exchange-rate/', {
        from: from,
        to: to,
        amount: amountValue.amountInput
      }, {
        headers: {
          // 'Content-Type': 'application/json',
        },

      })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("Total_amount", response.data.amount);
          if (response.status)
            setStep(step + 1) //next step call
          setShows(!shows) //show hide summery function call
          setLoading(false); // Stop loading 
          localStorage.setItem("FromValue", from);
          localStorage.setItem("ToValue", to);
          localStorage.setItem("AmountValue", amountValue.amountInput);

        })
        .catch(function (error, message) {
          console.log(error.response);
          setLoading(false); // Stop loading in case of error
          // if(error.responsetverificationValuese.data.status){
          //     toast.error(error.response.data.message);
          // } 
          console.log(error, "klnklnklnknnnnnnnnnnnn");
        })
    }
  }

  // End Api call Amount & Delivery

  /**************************************************************************
   * ************** Start  Total Amount Api call  ******************************
   * ***********************************************************************/
  const myTotalAmount = (event) => {
    event.preventDefault();
    // console.log("====================>",amount)
    //useRef is used for focusing on inputbox
    if (from.length == 0) {
      input_From.current.focus();
      setError(true);
    } else if (to.length == 0) {
      input_To.current.focus();
      setError(true);
    } else if (amountValue.amountInput.length == 0) {
      input_AmountSend.current.focus();
      setError(true);
    }

    else {
      setLoading(true); // Set loading before sending API request
      axios.post(API.BASE_URL + 'exchange-rate/', {
        from: from,
        to: to,
        amount: amountValue.amountInput

      }, {
        headers: {
          // 'Content-Type': 'application/json',
        },

      })
        .then(function (response) {
          console.log(response);
          if (response.status)
            localStorage.setItem("Total_amount", response.data.amount);
          setTotal_amount(response.data.amount);
          setExchange_amount(response.data.amount);
          setTotal_rate(response.data.rate);
          setLoading(false); // Stop loading
          localStorage.setItem("FromValue", from);
          localStorage.setItem("ToValue", to);
          localStorage.setItem("AmountValue", amountValue.amountInput);
        })
        .catch(function (error, message) {
          console.log(error.response)
          setLoading(false); // Stop loading in case of error

          setCurrencyerrorText(error.response.data.error)
        })

    }
  }
  // End Total Amount Api call 

  /**************************************************************************
* ************** Start  Total Amount Api call  ******************************
* ***********************************************************************/
  const myTotalAmountFromTo = (value) => {
    // event.preventDefault();
    console.log("====================>", amount)
    //useRef is used for focusing on inputbox
    if (from.length == 0) {
      input_From.current.focus();
      setError(true);
    } else if (to.length == 0) {
      input_To.current.focus();
      setError(true);
    } else if (amountValue.amountInput.length == 0) {
      input_AmountSend.current.focus();
      setError(true);
    }

    else {
      setLoading(true); // Set loading before sending API request
      axios.post(API.BASE_URL + 'exchange-rate/', {
        from: from,
        to: to,
        amount: amountValue.amountInput

      }, {
        headers: {
          // 'Content-Type': 'application/json',
        },

      })
        .then(function (response) {
          console.log(response);
          if (response.status)
            localStorage.setItem("Total_amount", response.data.amount);
          console.log(total_amount, "total_amounttotal_amount")
          setTotal_amount(response.data.amount);
          setExchange_amount(response.data.amount);
          setTotal_rate(response.data.rate);
          setLoading(false); // Stop loading
          localStorage.setItem("FromValue", from);
          localStorage.setItem("ToValue", to);
          localStorage.setItem("AmountValue", amountValue.amountInput);
        })
        .catch(function (error, message) {
          console.log(error.response)
          setLoading(false); // Stop loading in case of error
          // if(error.response.data.status){
          //     toast.error(error.response.data.message);
          // } 
          // console.log(error, "klnklnklnknnnnnnnnnnnn"); 
          setCurrencyerrorText(error.response.data.error)
        })

    }
  }
  // End Total Amount Api call 


  /**************************************************************************
   * ************** Start condtion -IS Digital ID Api call ******************************
   * ***********************************************************************/
  const handleISDigitalVerified = () => {
    // event.preventDefault();
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'is-digitalid-verified/', {
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log(response);
        console.log("Recipients APIIIII", response.data);
        // setStep(step+1)
        setverificationValue(response.data.Verificationstatus);
        console.log(verificationValue, "setverificationValue")
        // setStep(step+1)
        setLoading(false); // Stop loading

        // if (response.data.verification_status == false){
        //   setStep(step+1)
        // } else{
        //   setStep(step+1)
        // } 
        // // notify();

      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        // if(error.response.status){
        //     toast.error(error.response.data.detail);
        // } 
      })
  }

  /**************************************************************************
   * ************** Start -Digital ID Verifiyed Payment Api call *************
   * ***********************************************************************/

  /*********************Get Data for localStorage******************** */
  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

/************************Next page digital id verification**************************** */
  const handleVerifiedPaymentDigitalId = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'digital-verification/', {
      code: DigitalCode,
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,

      },

    })
      .then(function (response) {
        console.log(response);
        if (response.status)
         handlePay()
        setStep(step + 1) //next step call
        setData(response.data);
        setLoading(false); // Stop loading 

      })
      .catch(function (error, message) {
        console.log(error.response)
        setLoading(false); // Stop loading in case of error
        if (error.response.data.status) {
          // setStep(step-1) //next step call
          // toast.error(error.response.data.message);
        }
        console.log(error, "klnklnklnknnnnnnnnnnnn");
      })
  }

  /************************Previous page digital id verification**************************** */
  // const handleVerifiedPaymentDigitalIdPrevious = (event) => {
  //   event.preventDefault();
  //   setLoading(true); // Set loading before sending API request
  //   axios.post(API.BASE_URL + 'digital-verification/', {
  //     code: DigitalCode,
  //   }, {
  //     headers: {
  //       "Authorization": `Bearer ${signup_token ? signup_token : token}`,

  //     },

  //   })
  //     .then(function (response) {
  //       console.log(response);
  //       if (response.status)
  //       // handlePay()
  //       handleISDigitalVerified()
  //       setStep(step-1) //next step call
  //       setData(response.data);
  //       setLoading(false); // Stop loading 

  //     })
  //     .catch(function (error, message) {
  //       console.log(error.response)
  //       setLoading(false); // Stop loading in case of error
  //       if (error.response.data.status) {
  //         // setStep(step-1) //next step call
  //         // toast.error(error.response.data.message);
  //       }
  //       console.log(error, "klnklnklnknnnnnnnnnnnn");
  //     })
  // }








  /**************************************************************************
   * ************** Start Sender-details-Lists Api *********************************
   * ***********************************************************************/

  useEffect(() => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'user-profile/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setSenderDetailData(response.data.data);
        console.log(senderDetailData, "senderDetailData")
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
   * ************** Start Sender-details-Create Api *********************************
   * ***********************************************************************/

    const handleCreateSenderDetails = (event) => {
      event.preventDefault();

      axios.post(API.BASE_URL +'/create-sender/', {
        First_name: formSenderValue.firstName,
        Middle_name: formSenderValue.middleName,
        Last_name: formSenderValue.lastName,
        Date_of_birth: formSenderValue.DateofBirth,
        Gender: formSenderValue.gender,
        country_of_birth: formSenderValue.CountryofBirth,
        email: formSenderValue.email,
        mobile: formSenderValue.mobile,
        flat: formSenderValue.flat,
        building: formSenderValue.building,
        street: formSenderValue.street,
        postcode: formSenderValue.postcode,
        city: formSenderValue.city,
        state: formSenderValue.state,
        country_code: formSenderValue.country_code,
        country: countryValue.label,
      }, {
        headers:{
          "Authorization": `Bearer ${signup_token ? signup_token : token}`,

        }
      })
      .then(function(response){
        console.log(response)
        setStep(step+1);
      })

      .catch(function(error){
        console.log(error.response)
      })

    }




  /**************************************************************************
   * ************** Start  Recipient Bank Details ****************************
   * ***********************************************************************/
  /* start-- useRef is used for focusing on inputbox */
  const input_bankName = useRef(null);
  const input_accountName = useRef(null);
  const input_accountNumber = useRef(null);

  const handleCreateRecipientValidation = (event) => {
    event.preventDefault();
    // useRef is used for focusing on inputbox
    //  if ( formValue.bankName.length==0){
    //   input_bankName.current.focus();
    //       setError(true);
    //  }
    // } else if (formValue.accountName.length==0){
    //   input_accountName.current.focus();
    //     setError(true);
    // }
    // } else if (formValue.accountNumber.length==0){
    //   input_accountNumber.current.focus();
    //     setError(true);
    // } 
    // else if (referral_code.length==0){
    //     referral_code.current.focus();
    //     setError(true);
    // } 

    // else{
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/create-recipient-validation/', {
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
      street: formValue.street,
      postcode: formValue.postcode,
      country_code: formValue.country_code,
      city: formValue.city,
      state: formValue.state,
      country: countryValue.label,
      reason: formValue.reasonMoney

    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        handleShow(); //show view page
        setLoading(false); // Stop loading 
        setId(response.data.recipient_data.id)

        localStorage.setItem("recipientMoneyReason", formValue.reasonMoney);
        localStorage.setItem("recipientDestination", countryValue.label);
        localStorage.setItem("recipientName", formValue.firstName);
      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);

      })
  }
  // }
  console.log(id, '============> id');
  localStorage.setItem("recipient_id", id);




  /**************************************************************************
     * ************** Start  Recipient Bank Details ****************************
     * ***********************************************************************/
  const handleRecipientBankDetails = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/recipient-create/', {
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
        // handleShow(); //show view page
        setStep(step + 1);
        setLoading(false); // Stop loading 
        setId(response.data.recipient_data.id)

        localStorage.setItem("recipientMoneyReason", formValue.reasonMoney);
        localStorage.setItem("recipientDestination", countryValue.label);
        localStorage.setItem("recipientName", formValue.firstName);
      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);

      })
  }
  console.log(id, '============> id');
  localStorage.setItem("recipient_id", id);

  /**************************************************************************
 * ************** Start  Create Card Bank Details ****************************
 * ***********************************************************************/
  const handleCradBankDetails = (event) => {
    setChecked(true)
    event.preventDefault();

    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/create-card/', {
      card_number: formCardValue.cardNumber,
      expiry_month: formCardValue.exp_month,
      expiry_year: formCardValue.exp_year,
      name: formCardValue.cardName,
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        // handleCloseDetails();
        // window.location.reload();
        // setLoading(false); // Stop loading 
        // navigate('/dashboard'); 


      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setSenderDetailText(error.response.data);

      })
  }
  // }

  /**************************************************************************
 * ************** Start  Bank card List ************************************
 * ***********************************************************************/

  useEffect(() => {
    getList();
  }, [])

  const getList = () => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/card-list/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setBankCardData(response.data);
        console.log(bankCardData, "bankCardDatabankCardData")
        localStorage.setItem("RecepientsData", JSON.stringify(response.data.data))
        setLoading(false); // Stop loading


        //   if (response.status)
        // // notify();
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false); // Stop loading in case of error

      })

  }

  console.log(data, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  /**************************************************************************
     * ************** Start Stripe card Paymet****************************
     * ***********************************************************************/
  const handlePaymentCard = (event) => {
    event.preventDefault();

    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/stripe/card/', {
      send_currency: FromValue,
      recieve_currency: ToValue,
      amount: AmountValue,
      recipient_id: recipient_id,
      reason: recipientMoneyReason,
      destination: recipientDestination,
      name: formCardValue.cardName,
      number: formCardValue.cardNumber,
      exp_month: formCardValue.exp_month,
      exp_year: formCardValue.exp_year,
      cvc: formCardValue.securityCode,
  
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        setStep(step + 1);
        localStorage.setItem("paymetTransactionId",response.data.transaction_id);
      

        handleISDigitalVerified();
        setLoading(false); // Stop loading 
        // navigate('/transfer'); 

      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setCardErrorText(error.response.data);

      })
  }
  // }

  /**************************************************************************
   * ************** Start Paymet Or Pay Api****************************
   * ***********************************************************************/
  const handlePay = () => {
    // event.preventDefault();
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/stripe/charge/', {
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        // setStep(step + 1)
        setLoading(false); // Stop loading 
      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);

      })
  }

  /**************************************************************************
 * ************** Start- Card List Delete ****************************
 * ***********************************************************************/


  /**************************************************************************
   * ************** Start  Recipient List Delete ****************************
   * ***********************************************************************/

  const handleRemovecardDetails = (value) => {
    console.log("========>Delete", value)

    axios.delete(API.BASE_URL + `payment/card/${value}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        handleClose()
        getList();
        // alert('Remove Successfully.')
        // setLoading(false); // Stop loading 
        // navigate('/userrecipients');   


      })
      .catch(function (error, message) {
        console.log(error.response);
        // setLoading(false); // Stop loading in case of error


      })
  }

     /**************************************************************************
   * ************** Start  Get DataSummery Lists ************************************
   * ***********************************************************************/
     const paymetTransactionId = localStorage.getItem("paymetTransactionId");
     console.log("paymetTransactionId ====================>", paymetTransactionId);

        useEffect(() => {
          setLoading(true); // Set loading before sending API request
          axios.post(API.BASE_URL + 'payment/summary/', {
            transaction_id:paymetTransactionId
          }, {
            headers: {
              "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      
            },
      
          })
            .then(function(response) {
                console.log("Recipients APIIIII", response.data);
                setSummeryData(response.data.data);
                console.log(summeryData, "summeryData==========>")
                setLoading(false); // Stop loading
          
          
              //   if (response.status)
              // // notify();
            })
            .catch(function(error) {
                console.log(error);
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
              
            })
          
        }, [])


  console.log(summeryData," summeryData==========>")




  // Start design state
  const { useState } = React;
  const [step, setStep] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //  const step = step+1;

  const Form = () => {
    // const dataFetchedRef = useRef(true);
    // console.log(dataFetchedRef)
    // if (dataFetchedRef.current) {
    //    dataFetchedRef.current = false;
    // console.log(dataFetchedRef.current)
    // console.log('FORMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    if (step == 0) {

      return (
        <Step1 />
      );

    }
    else if (step == 1) {

      return (
        <Step2 />);

    } else if (step == 2) {

      return (
        <Step3 />);

    } else if (step == 3) {

      return (
        <Step4 />);
    }
    else if (step == 4) {

      return (
        <Step5 />);
    } else if (step == 5) {

      return (
        <Step6 />);
    }
  }
  // }


  //  console.log(step, "stepstepstepstepstepstepstep")

  const Step1 = () => {


    return (
      <>

        <div>
          {/* {
            token || verification_otp ||DigitalCode != undefined || '' ? ( */}

              <section>
                <div className="progressBar">
                  <div className="progress">
                    <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
                  </div>
                </div>


                <form>
                  <div className="form_body">
                    <div className="header exchangemoney-header">
                      <h1>Amount & delivery</h1>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input_field rate-value">
                          <p className="get-text Exchange_rate">Exchange Rate</p>
                          <p className="exchange-rate exchange_value" >1 <span>{from}</span> = {total_rate} <span>{to}</span> </p>
                          {/* <input type="text" className='rate_input form-control' /> */}
                        </div>
                      </div>
                    </div>
                    <div className="row  each-row">
                      <div className="exchange-errors"><span style={myStyle}>{currencyerrorText}</span></div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">From<span style={{ color: 'red' }} >*</span></p>
                          <select
                            className="form-select rate_input form-control"
                            aria-label="Select a reason"
                            value={from}
                            ref={input_From}
                            //  onChange={handleFrom}
                            onChange={(e) => { myTotalAmountFromTo(e.target.value); setFrom(e.target.value) }}
                          // onBlurCapture={myTotalAmount}
                          >
                            {/* <option value="">--- Select Currency ---</option> */}
                            console.log('Step11111111111111111111111111111111111111')               <option value="EUR">EUR</option>
                            <option value="INR">INR</option>
                            <option value="BRL">BRL</option>
                            <option value="BGN">BGN</option>
                            <option value="XAF">XAF</option>
                            <option value="CAD">CAD</option>
                            <option value="EUR">EUR</option>
                            <option value="CZK">CZK</option>
                            <option value="DKK">DKK</option>
                            <option value="GHS">GHS</option>
                            <option value="ISK">ISK</option>
                            <option value="JOD">JPD</option>
                            <option value="KWD">KWD</option>
                            <option value="NZD">NZD</option>
                            <option value="PHP">PHP</option>
                            <option value="ZAR">ZAR</option>
                            <option value="CHF">CHF</option>
                            <option value="GBP">GBP</option>

                          </select>
                          {error && from.length <= 0 ?
                            <span style={myStyle}>Please Select the Location </span> : ""}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">To<span style={{ color: 'red' }} >*</span></p>
                          <select
                            className="form-select rate_input form-control"
                            aria-label="Select a reason"
                            value={to}
                            ref={input_To}
                            //  onChange={handleTo}
                            onChange={(e) => { myTotalAmountFromTo(e.target.value); setTo(e.target.value) }}
                          >


                            <option value="">--- Select Currency ---</option>

                            {/* <option value="INR" selected="selected">INR</option> */}
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>
                            <option value="BRL">BRL</option>
                            <option value="USD">USD</option>
                            <option value="BGN">BGN</option>
                            <option value="XAF">XAF</option>
                            <option value="CAD">CAD</option>
                            <option value="EUR">EUR</option>
                            <option value="CZK">CZK</option>
                            <option value="DKK">DKK</option>
                            <option value="GHS">GHS</option>
                            <option value="ISK">ISK</option>
                            <option value="JOD">JPD</option>
                            <option value="KWD">KWD</option>
                            <option value="NZD">NZD</option>
                            <option value="PHP">PHP</option>
                            <option value="ZAR">ZAR</option>
                            <option value="CHF">CHF</option>
                            <option value="GBP">GBP</option>
                          </select>
                          {error && to.length <= 0 ?
                            <span style={myStyle}>Please Select the Location </span> : ""}
                        </div>
                      </div>

                    </div>
                    <div className="row each-row">
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Amount Send<span style={{ color: 'red' }} >*</span></p>

                          <input
                            type="text"
                            // autoFocus="autofocus"
                            ref={input_AmountSend}
                            className='rate_input form-control'
                            // onChange={(e)=> {myTotalAmount(e.target.value); setAmount(e.target.value)}}
                            name="amountInput"
                            defaultValue={amountValue.amountInput}
                            onChange={(e) => handleAmountCahngeValue(e, 'amountInput')}
                            onBlurCapture={myTotalAmount}
                          // onkeyup={(text)=> myTotalAmount(text)}
                          // onChange={e => onInputChangeDealType(e)}
                          />
                          {error && amountValue.amountInput.length <= 0 ?
                            <span style={myStyle}>Please Enter the Amount </span> : ""}

                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">
                            Exchange Amount
                          </p>
                          <input
                            type="text"
                            defaultValue={exchange_amount && amountValue.amountInput != 0 || "" ? exchange_amount : ""}
                            className='rate_input form-control'

                          />

                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Receive Method</h5>
                      <div className="col-md-12">
                        <label className="container-new">
                          <span className="radio-tick">BankTransfer</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="recivedMethod"
                            value="bankTransfer"
                            checked={moneyTransiction.recivedMethod == "bankTransfer"}
                            onChange={e => onInputChange(e)}
                          // id="flexRadioDefault1" 

                          />
                          <span className="checkmark"></span>
                        </label>

                      </div>
                      <div className="col-md-12">

                        <label className="container-new">
                          <span className="radio-tick">MobileWallet</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="recivedMethod"
                            value="mobileWallet"
                            checked={moneyTransiction.recivedMethod == "mobileWallet"}
                            onChange={e => onInputChange(e)}
                          // id="flexRadioDefault2"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Payout Partners</h5>
                      <div className="col-md-12">

                        <label className="container-new">
                          <span className="radio-tick">Bank</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payOutPartner"
                            // id="flexRadioDefault3" 
                            checked={moneyTransiction.payOutPartner == "bank"}
                            value="bank"
                            onChange={e => onInputChange(e)}

                          />
                          <span className="checkmark"></span>
                        </label>

                      </div>
                      <div className="col-md-12">

                        <label className="container-new">
                          <span className="radio-tick">Services</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payOutPartner"
                            // id="flexRadioDefault4"
                            checked={moneyTransiction.payOutPartner == "services"}
                            value="services"
                            onChange={e => onInputChange(e)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <button
                          className="start-form-button"
                          onClick={handleEntailmentRequest}
                        >Clear</button>
                      </div>
                      <div className="col-md-8">
                        <button
                          type="submit"
                          className="form-button"
                          //  onChange={() => setShows(!shows)}
                          onClick={handleAmountSummary}
                        // onClick={()=>{setStep(step+1)}}
                        >
                          Continue
                          {/* {loading ? <>
                    <div class="loader-overly"> 
                        <div class="loader" > 
                                                      
                          </div>
                                                      
                    </div>
              </> : <></>} */}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            {/* ) : (
              <>
               <Page404 />
              </>

            )
          } */}

        </div>



      </>
    );
  }


  const Step2 = () => {





    return (
      <>
        <div>
          {/* {
            token || verification_otp ||DigitalCode != undefined || '' ? ( */}
              <section>
                <div className="progressBar">
                  <div className="progress">
                    <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step2">{step}</span>
                  </div>
                </div>
                <form>

                  <div className="form_body">
                    <div className="header">
                      <h1>Recipient Bank Details</h1>
                    </div>
                    <div className="col-md-12">
                      <div className="input_field">
                        <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          ref={input_bankName}
                          className="rate_input form-control"
                          name="bankName"
                          defaultValue={formValue.bankName}
                          onChange={(e) => handleStep2InputChange(e, 'bankName')}
                        />
                        {/* {error&&formValue.bankName.length<=0?
                        <span style={myStyle}>Please Enter the Bank Name </span>:""} */}

                        <span style={myStyle}>{BankNameText.Enterbank ? BankNameText.Enterbank : ''}</span>

                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-12">
                        <div className="input_field">
                          <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            ref={input_accountName}
                            defaultValue={formValue.accountName}
                            onChange={(e) => handleStep2InputChange(e, 'accountName')}
                            className='rate_input form-control'
                          // autoFocus="autofocus"
                          />
                          {/* {error&&formValue.accountName.length<=0?
                        <span style={myStyle}>Please Enter the Bank Name </span>:""} */}

                          <span style={myStyle}>{BankNameText.Enteraccountname ? BankNameText.Enteraccountname : ''}</span>

                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-12">
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
                          {/* {error&&formValue.bankName.length<=0?
                        <span style={myStyle}>Please Enter the Bank Name </span>:""} */}

                          <span style={myStyle}>{BankNameText.Enteraccountnumber ? BankNameText.Enteraccountnumber : ''}</span>
                          <span style={myStyle}>{BankNameText.Accountexist ? BankNameText.Accountexist : ''}</span>

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
                          <span style={myStyle}>{BankNameText.Emailexist ? BankNameText.Emailexist : ''}</span>

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            // ref={input_recipientMobile}
                            className='rate_input form-control'
                            name="mobile"
                            defaultValue={formValue.mobile}
                            onChange={(e) => handleStep2InputChange(e, 'mobile')}
                          />
                          <span style={myStyle}>{BankNameText.mobile ? BankNameText.mobile : ''}</span>
                          <span style={myStyle}>{BankNameText.Validmobile ? BankNameText.Validmobile : ''}</span>
                          <span style={myStyle}>{BankNameText.Mobileexist ? BankNameText.Mobileexist : ''}</span>
                          <span style={myStyle}>{BankNameText.Entermobile ? BankNameText.Entermobile : ''}</span>

                        </div>
                      </div>
                    </div>

                    <div className="row each-row">
                      <h5>Address</h5>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Flat/Unit No.</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="flat"
                            defaultValue={formValue.flat}
                            onChange={(e) => handleStep2InputChange(e, 'flat')}
                          />
                          <span style={myStyle}>{BankNameText.Enterflat ? BankNameText.Enterflat : ''}</span>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Building/Unit No.</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="building"
                            defaultValue={formValue.building}
                            onChange={(e) => handleStep2InputChange(e, 'building')}
                          />
                          <span style={myStyle}>{BankNameText.Enterbuilding ? BankNameText.Enterbuilding : ''}</span>

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Street</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="street"
                            defaultValue={formValue.street}
                            onChange={(e) => handleStep2InputChange(e, 'street')}
                          />
                          <span style={myStyle}>{BankNameText.Enterstreet ? BankNameText.Enterstreet : ''}</span>

                        </div>
                      </div>

                    </div>


                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Postcode</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="postcode"
                            defaultValue={formValue.postcode}
                            onChange={(e) => handleStep2InputChange(e, 'postcode')}
                          />
                          <span style={myStyle}>{BankNameText.Enterpostcode ? BankNameText.Enterpostcode : ''}</span>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">City/Town</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="city"
                            defaultValue={formValue.city}
                            onChange={(e) => handleStep2InputChange(e, 'city')}
                          />
                          <span style={myStyle}>{BankNameText.Entercity ? BankNameText.Entercity : ''}</span>

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">State</p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="state"
                            defaultValue={formValue.state}
                            onChange={(e) => handleStep2InputChange(e, 'state')}
                          />
                          <span style={myStyle}>{BankNameText.Entercity ? BankNameText.Entercity : ''}</span>
                        </div>
                      </div>

                    </div>


                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Country Code <span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"

                            className='rate_input form-control'
                            name="country_code"
                            defaultValue={formValue.country_code}
                            onChange={(e) => handleStep2InputChange(e, 'country_code')}
                          />
                          <span style={myStyle}>{BankNameText.Entercountrycode ? BankNameText.Entercountrycode : ''}</span>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                          <Select
                            // ref={input_location}
                            options={countryoptions}
                            value={countryValue}
                            onChange={changeHandler}
                          />
                          <span style={myStyle}>{BankNameText.Selectcountry ? BankNameText.Selectcountry : ''}</span>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
                          <select
                            className="form-select rate_input form-control"
                            aria-label="Select a reason"
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

                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-4">
                        <button type="submit" className="start-form-button" onClick={handlRecipientBankDetails}>Cancel</button>
                      </div>
                      <div className="col-md-8">
                        {/* <button className="form-button" onClick={handleShow}>Continue</button> */}
                        <button type="submit" className="form-button" onClick={handleCreateRecipientValidation}>Continue</button>
                        {/* <button className="form-button" onClick={handleRecipientBankDetails}>Continue</button> */}
                        <button className="form-button" onClick={() => { setStep(step -1) }}>Previous</button>
                      </div>
                    </div>
                  </div>
                </form>


                <Modal show={show} onHide={handleClose}
                  centereds
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Recipient details Summary</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <Table>
                      <thead>
                        <tr>
                          <th colSpan={2} className="popup-heading">Bank Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Bank Name</th>
                          <td>{formValue.bankName}</td>
                        </tr>
                        <tr>
                          <th>Account Name</th>
                          <td>{formValue.accountName}</td>
                        </tr>
                        <tr>
                          <th>Account number</th>
                          <td>{formValue.accountNumber}</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th colSpan={2} className="popup-heading">Recipient Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>First Name</th>
                          <td>{formValue.firstName}</td>
                        </tr>
                        <tr>
                          <th>Last Name</th>
                          <td>{formValue.lastName}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{formValue.email}</td>
                        </tr>
                        <tr>
                          <th>Mobile</th>
                          <td>{formValue.mobile}</td>
                        </tr>
                        <tr>
                          <th>Country Code</th>
                          <td>{formValue.country_code}</td>
                        </tr>
                        {/* <tr>
                          <th>Address</th>
                          <td>{addressData}</td>
                        </tr> */}
                        <tr>
                          <>

                          </>

                          <th>Reason For Sending Money</th>
                          <td>{formValue.reasonMoney}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Modal.Body>
                  <Modal.Footer>

                    <button className="start-form-button" variant="secondary" onClick={handleClose}>
                      Go back to Edit
                    </button>
                    {/* <button className="form-button" onClick={()=>{setStep(step+1)}}>Continue</button> */}
                    <button className="form-button" variant="primary" onClick={handleRecipientBankDetails}>Continue</button>

                    {/* onClick={() => setShow(!show)} */}
                    {/* <Button variant="primary" onClick={handleDigitalValue}>Continue</Button>  */}

                  </Modal.Footer>
                </Modal>

              </section>
            {/* ) : (
              <>
               <Page404 />
              </>

            )
          } */}
        </div>


      </>
    );
  }


  const Step3 = () => {

    const [cardDeleteShow, setCardDeleteShow] = React.useState(false);
    const handleClose = () => setCardDeleteShow(false);
    const [delete_id, setDelete_Id] = React.useState('');
    const handleDeleteShow = (key) => {
      console.log("=========>cardDelete", key)
      setCardDeleteShow(true);
      setDelete_Id(key)

    }



    return (
      <>
        <div>
          {/* {
            token || verification_otp ||DigitalCode != undefined || '' ? (
              <> */}
                <section>
                  <div className="progressBar">
                    <div className="progress">
                      <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
                      <span className="progress-bar bg-success progress-bar-striped step2">{step}</span>
                      <span className="progress-bar bg-success progress-bar-striped step3">{step}</span>
                    </div>
                  </div>
                  <div className="form_body">
                    <div className="header">
                      <h1>Payment details</h1>
                    </div>
                    <div className="row each-row">
                      <h5>Payment type</h5>

                      <div className="col-md-12">
                        <label className="container-new">
                          <span className="radio-tick">Osko</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentType"
                            // id="flexRadioDefault3" 
                            checked={moneyTransiction.paymentType == "Oslo"}
                            value="Oslo"
                            onChange={e => onInputChange(e)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                      <div className="col-md-12">
                        <label className="container-new">
                          <span className="radio-tick">Debit/Credit Card</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentType"
                            // id="flexRadioDefault3" 
                            checked={moneyTransiction.paymentType == "Debit/Credit Card"}
                            value="Debit/Credit Card"
                            onChange={e => onInputChange(e)}
                            onClick={ShowCardDetails}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                      <div className="col-md-12">
                        <label className="container-new">
                          <span className="radio-tick">PoLI Internet Banking</span>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentType"
                            // id="flexRadioDefault3" 
                            checked={moneyTransiction.paymentType == " PoLI Internet Banking"}
                            value=" PoLI Internet Banking"
                            onChange={e => onInputChange(e)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <button className="start-form-button">Cancel</button>
                      </div>
                      <div className="col-md-8">
                        {/* <button className="form-button">Continue</button> */}
                        <button className="form-button" onClick={() => {setStep(step-1)}}>Previous</button>
                      </div>
                    </div>
                  </div>
                </section>

                <Modal className="modal-card" show={showCards} onHide={handleCloseDetails}>
                  <Modal.Header closeButton>
                    <Modal.Title>Your cards</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    {/* start List card */}

                    <Table>
                    {bankCardData?.length != 0 ? (
                      <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cards Details</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                    
                     
                      <tbody>

                        {
                          bankCardData.data?.map((res, index) => {
                            console.log(res, "resresresresresresresresresres")
                            return (

                              <tr key={res.iddashboard}>
                                <td>
                                  <input
                                    type="radio"
                                    name="radio"
                                    // checked={checked}
                                    onChange={() => getCardDataPayment(res)}
                                  />
                                </td>
                                <td>
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header><img src={creditcards} alt="credit cards" /><span>{res.number}</span> </Accordion.Header>
                                      <Accordion.Body>
                                        <ul>
                                          <li>
                                            <label>Name on Card</label>
                                            <p>{res.name}</p>
                                          </li>
                                          <li>
                                            <label>Card Number</label>
                                            <p>{res.number}</p>
                                          </li>
                                          <li>
                                            <label>Expiry on</label>
                                            <p>{res.exp_year}/{res.exp_month}</p>
                                          </li>
                                          <li>
                                            <label>CVV</label>
                                            <input
                                              // onClick ={}
                                              maxlength="3"
                                              type="password"
                                              defaultValue={formCardValue.securityCode}
                                              onChange={(e) => handleCardInputChange(e, 'securityCode')}
                                            />
                                          </li>
                                          <li>
                                            <div className="card-delete">
                                              <Button className="btn btn-danger" onClick={() => { handleDeleteShow(res.id) }}>
                                                Delete</Button></div>
                                          </li>
                                        </ul>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </td>
                                {/* <td>
                                </td> */}
                              </tr>

                            )
                          })}

                        <Modal show={cardDeleteShow} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Card</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close </Button>
                            <Button
                              className="delete_recipient"
                              variant="danger"
                              onClick={() => { handleRemovecardDetails(delete_id) }}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </tbody>
                      </>
                       ) : (
                        <>
                        </>
                      )
                      }


                      {bankCardData?.length == 0 ? (
                        <>
                          <thead>
                              <tr>
                                <th>#</th>
                                <th>Cards Detail</th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td colSpan={2}> No Cards<br></br>
                              <img src={nocard} alt="nocard" />
                              </td>
                               </tr>
                            </tbody>
                           </>
                          ) : (
                            <>

                            </>
                          )
                          }
  
                    </Table>
                    {/* End List card */}




                    {/* start add card */}
                    <div className="addnewcard">
                      <p>Please add your card details</p>

                      <form>
                        <div className="row each-row">
                          <div className="col-md-12">
                            <div className="input_field">
                              <p className="get-text">Your name as it appears on card<span style={{ color: 'red' }} >*</span> </p>
                              <div className="card-fields">
                                <input
                                  type="text"
                                  className='rate_input form-control'
                                  name="cardName"
                                  defaultValue={formCardValue.cardName}
                                  onChange={(e) => handleCardInputChange(e, 'cardName')}
                                  placeholder="Name"
                                />
                                <span style={myStyle}>{CardErrorText.Name ? CardErrorText.Name : ''}</span>
                                <span style={myStyle}>{CardErrorText.name ? CardErrorText.name : ''}</span>
                                <i class="fa fa-user"></i>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-12">
                            <div className="input_field">
                              {/* <img src={creditcards}  alt="credit cards" /> */}
                              <p className="get-text">Card Number<span style={{ color: 'red' }} >*</span> </p>
                              <div className="card-fields">
                                <input
                                  min="0"
                                  maxlength="4"
                                  type="number"
                                  className='rate_input form-control'
                                  name="cardNumber"
                                  placeholder="XXXX-XXXX-XXXX-XXXX"
                                  defaultValue={formCardValue.cardNumber}
                                  onChange={(e) => handleCardInputChange(e, 'cardNumber')}
                                />
                                <i class="fa fa-credit-card" id="cardtype"></i>
                              </div>
                              <span style={myStyle}>{CardErrorText.Entercard ? CardErrorText.Entercard : ''}</span>
                              <span style={myStyle}>{CardErrorText.card_number ? CardErrorText.card_number : ''}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row each-row">

                          <div className="col-md-8">
                            <div className="input_field">
                              <p className="get-text">Expiration Date<span style={{ color: 'red' }} >*</span></p>
                              <div className="card-date">
                                <div className="card-fields">
                                  <input
                                    min="0"
                                    maxlength="2"
                                    type="text"
                                    className='rate_input form-control'
                                    name="exp_month"
                                    placeholder="Month"
                                    maxLength={2}
                                    defaultValue={formCardValue.exp_month}
                                    onChange={(e) => handleCardInputChange(e, 'exp_month')}
                                  />
                                  <span style={myStyle}>{CardErrorText.Entermonth ? CardErrorText.Entermonth : ''}</span>
                                  <span style={myStyle}>{CardErrorText.expiry_month ? CardErrorText.expiry_month : ''}</span>
                                  <i class="fa fa-calendar"></i>

                                </div>
                                <span>/</span>
                                <div className="card-fields">
                                  <input
                                    type="text"
                                    className='rate_input form-control'
                                    name="exp_year"
                                    maxLength={4}
                                    placeholder="Year"
                                    defaultValue={formCardValue.exp_year}
                                    onChange={(e) => handleCardInputChange(e, 'exp_year')}
                                  />
                                  <span style={myStyle}>{CardErrorText.Enteryear ? CardErrorText.Enteryear : ''}</span>
                                  <span style={myStyle}>{CardErrorText.expiry_year ? CardErrorText.expiry_year : ''}</span>
                                  <i class="fa fa-calendar"></i>

                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">CVV<span style={{ color: 'red' }} >*</span> </p>
                              <div className="card-fields">
                                <input
                                  maxlength="3"
                                  type="password"
                                  className='rate_input form-control'
                                  name="securityCode"
                                  placeholder="xxx"
                                  defaultValue={formCardValue.securityCode}
                                  onChange={(e) => handleCardInputChange(e, 'securityCode')}
                                />
                                <span style={myStyle}>{CardErrorText.Entercvc ? CardErrorText.Entercvc : ''}</span>
                                <i class="fa fa-lock"></i>
                              </div>

                            </div>
                          </div>


                        </div>


                        <div className="col-md-12">
                          <div className="saved-label">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={handleCradBankDetails}
                            />
                            {/* <Button type="submit" variant="primary" onClick={handleCradBankDetails}>
                              Save
                              </Button>  */}
                            <label>Save Card Details</label></div>
                        </div>
                      </form>
                    </div>

                    {/* End add card */}

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handlePaymentCard}>
                      Payment
                    </Button>
                  </Modal.Footer>
                </Modal>

              {/* </>
            ) : (
              <>
               <Page404 />
              </>

            )
          } */}
        </div>



      </>
    );
  }

  const Step4 = () => {


    useEffect(() => {

      const script = document.createElement('script');

      script.src = 'https://digitalid-sandbox.com/sdk/app.js';
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {

        /* Verify with Digital iD */
        window.digitalId.init({
          clientId: 'ctid2poVwlVfjH2PAnWEAB2l4v',
          uxMode: 'popup',
          onLoadComplete: function () {
            console.log(1, "log");
            console.log(step, "stepdmskdmklm")
          },
          onComplete: function (res, error, onComplete) {
            console.log(2, "log2");
            setStep(step + 1);
            console.log(step, "stepdmskdmklm")
            
            console.log(res, "codes")
            localStorage.setItem("DigitalCode", res.code);
            localStorage.setItem("DigitalTransactionId", res.transaction_id)
            // console.log(error, "error")
            // navigate("/sendMoney")
            // if(error.response){
            //   toast.error(error.error_description || error.response.error )
            //   navigate("/sendMoney")
            // }


          },
          onClick: function (opts) {
            console.log(3, "log")
          },
          onKeepAlive: function () {
            console.log(4, "log")
          }
        });

      }

    }, []);

    return (
      <>

        <div>
          {/* {
            token || verification_otp ||DigitalCode != undefined || '' ? ( */}
              <section>
                <div className="progressBar">
                  <div className="progress">
                    <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step2">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step3">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step4">{step}</span>
                  </div>
                </div>
                <div className="form_body">
                  <div className="header">
                    <h1>Sender Details </h1>
                  </div>
                  
                  <form>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            className='rate_input form-control'
                            name="firstName"
                            defaultValue={formSenderValue.firstName}
                            onChange={(e) => hamdleSenderDetailsData(e, 'firstName')}
                             />
                              <span style={myStyle}>{senderDetailText.Enterfirstname ? senderDetailText.Enterfirstname : ''}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Middle Name</p>
                          <input 
                          type="text" 
                          className='rate_input form-control'
                          name="middleName"
                          defaultValue={formSenderValue.middleName}
                          onChange={(e) => hamdleSenderDetailsData(e, 'middleName')}

                           />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                          <input 
                          type="text"
                           className='rate_input form-control'
                           name="lastName"
                           defaultValue={formSenderValue.lastName}
                           onChange={(e) => hamdleSenderDetailsData(e, 'lastName')}
                            />
                               <span style={myStyle}>{senderDetailText.Enterlastname ? senderDetailText.Enterlastname : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Customer ID<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            className='rate_input form-control'
                            value={senderDetailData.customer_id}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Date of birth<span style={{ color: 'red' }} >*</span></p>
                          <input 
                          type="date" 
                          className='rate_input form-control'
                          name="DateofBirth"
                          defaultValue={formSenderValue.DateofBirth}
                          onChange={(e) => hamdleSenderDetailsData(e, 'DateofBirth')}
                           />
                            <span style={myStyle}>{senderDetailText.Enterdob ? senderDetailText.Enterdob : ''}</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Gender<span style={{ color: 'red' }} >*</span></p>
                          <div className="inline-flex">
                            <label className="container-new form-gender">
                              <span className="radio-tick">Male</span>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                defaultValue={'Male'}
                                onChange={(e) => hamdleSenderDetailsData(e, 'gender')}
                              />
                              <span className="checkmark"></span>
                            </label>
                            <label class="container-new form-gender">
                              <span className="radio-tick">Female</span>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value=" Female"
                                defaultValue={'Female'}
                                onChange={(e) => hamdleSenderDetailsData(e, 'gender')}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <span style={myStyle}>{senderDetailText.Entergender ? senderDetailText.Entergender : ''}</span>
                        </div>
                        

                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Country of Birth<span style={{ color: 'red' }} >*</span></p>
                          <Select
                            // ref={input_location}
                            options={countryoptions}
                            // value={countryValue}
                            onChange={changeHandler}
                          //   name="middleName"
                          // defaultValue={formSenderValue.}
                          // onChange={(e) => hamdleSenderDetailsData(e, 'middleName')}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">ID Type<span style={{ color: 'red' }} >*</span></p>
                          <input type="text" className='rate_input form-control' />
                        </div>
                      </div> */}
                    </div>
                    <div className="row each-row">
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                          <input
                              type="email"
                              value={senderDetailData.email}
                              className='rate_input form-control'
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                          <input
                             type="text"
                             className='rate_input form-control'
                             value={senderDetailData.mobile}
                          />

                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Address</h5>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Flat/Unit No.</p>
                          <input 
                          type="text"
                           className='rate_input form-control'
                           name="flat"
                          defaultValue={formSenderValue.flat}
                          onChange={(e) => hamdleSenderDetailsData(e, 'flat')}
                            />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Building No./Name</p>
                          <input
                           type="text" 
                           className='rate_input form-control'
                           name="building"
                          defaultValue={formSenderValue.building}
                          onChange={(e) => hamdleSenderDetailsData(e, 'building')}
                            />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Street</p>
                          <input
                           type="text"
                            className='rate_input form-control'
                            name="street"
                          defaultValue={formSenderValue.street}
                          onChange={(e) => hamdleSenderDetailsData(e, 'street')}
                             />
                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Postcode</p>
                          <input 
                          type="text"
                           className='rate_inpuspant form-control' 
                           name="postcode"
                          defaultValue={formSenderValue.postcode}
                          onChange={(e) => hamdleSenderDetailsData(e, 'postcode')}
                           />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">City/Town</p>
                          <input 
                          type="text" 
                          className='rate_input form-control'
                          name="city"
                          defaultValue={formSenderValue.city}
                          onChange={(e) => hamdleSenderDetailsData(e, 'city')}
                           />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">State</p>
                          <input
                           type="text"
                            className='rate_input form-control'
                            name="state"
                          defaultValue={formSenderValue.state}
                          onChange={(e) => hamdleSenderDetailsData(e, 'state')}
                             />
                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Country Code</p>
                          <input
                            type="text"
                            className='rate_input form-control'
                            name="country_code"
                          defaultValue={formSenderValue.country_code}
                          onChange={(e) => hamdleSenderDetailsData(e, 'country_code')}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Country Name</p>
                          <Select
                            // ref={input_location}
                            options={countryoptions}
                            value={countryValue}
                            onChange={changeHandler}
                          />

                        </div>
                      </div>
                    </div>
                   
                  </form>

                  <div className="row each-row">
                      <div className="col-md-2 new_buttonss">
                        <button className="start-form-button" onClick={handlSenderDetails}>Clear</button>
                      </div>
                      <div className="col-md-10 new_buttons">

                        <button className="form-button" onClick={() => {setStep(step-1)}}>Previous</button>


                        {verificationValue == false ? (
                          <div id="digitalid-verify"></div>
                        ) : (
                          <>
                             <button className="form-button" onClick={handleCreateSenderDetails}> Continue</button>
                          </>
                        )
                        } 




                      </div>
                    </div>
                </div>

              </section>

            {/* ) : (
              <>
               <Page404 />
              </>

            )
          } */}
        </div>



      </>
    );
  }

  const Step5 = () => {

    return (
      <>
        <div>
          {/* {
            token || verification_otp || DigitalCode != undefined || '' ? ( */}
              <section>
                <div className="progressBar">
                  <div className="progress">
                    <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step2">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step3">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step4">{step}</span>
                    <span className="progress-bar bg-success progress-bar-striped step5">{step}</span>
                  </div>
                </div>
                <div className="form_body">
                  <div className="header">
                    <h1>Payment Summary</h1>
                  </div>
                  <div className="row">
                    <Table className="final-summary">
                      <thead>
                        <tr>
                          <th colSpan={2} className="popup-heading">Transaction Details </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Amount to Send</td>
                          <td>{summeryData.send_amount}</td>
                        </tr>
                        <tr>
                          <td>Fees</td>
                          <td>{summeryData.recieve_amount}</td>
                        </tr>
                        <tr>
                          <td>Total Cost</td>
                          <td>{summeryData.send_amount}</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th colSpan={2} className="popup-heading">Transfer to </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Account No.</td>
                          <td>{summeryData.account_number}</td>
                        </tr>
                        <tr>
                          <td>Account Name</td>
                          <td>{summeryData.account_name}</td>
                        </tr>
                        <tr>
                          <td>Bank Name</td>
                          <td>{summeryData.bank_name}</td>
                        </tr>
                        <tr>
                          <td>Total Recipient Received</td>
                          <td>{summeryData.recieve_amount}</td>
                        </tr>
                        <tr>
                          <td>Received Method</td>
                          <td>{summeryData.send_method}</td>
                        </tr>
                      </tbody>

                    </Table>
                  </div>


                  <div class="row">
                    {/* <div className="col-md-4">
                <button className="start-form-button">Cancel</button>
              </div> */}
                    <div className="col-md-12 verified-section">
              {/* 
                      <button className="form-button" onClick={handlePay}>Pay</button> */}
                      {/* <button className="form-button" onClick={()=>{setStep(step+1)}}>Continue</button> */}

                      <button className="form-button" onClick={handleVerifiedPaymentDigitalId}>Continue</button>
                      
                      <button className="form-button" onClick={() => { setStep(step - 1) }}>Previous</button>
                      {/* <button className="form-button" onClick={handleVerifiedPaymentDigitalIdPrevious}>Previous</button> */}
                    </div>
                  </div>
                </div>
              </section>
            {/* ) : (
              <>
               <Page404 />
              </>

            )
          } */}
        </div>


      </>
    );
  }

  const Step6 = () => {

    return (
      <>

        <section>
          <div className="progressBar">
            <div className="progress">
              <span className="progress-bar bg-success progress-bar-striped step1">{step}</span>
              <span className="progress-bar bg-success progress-bar-striped step2">{step}</span>
              <span className="progress-bar bg-success progress-bar-striped step3">{step}</span>
              <span className="progress-bar bg-success progress-bar-striped step4">{step}</span>
              <span className="progress-bar bg-success progress-bar-striped step5">{step}</span>
              <span className="progress-bar bg-success progress-bar-striped step6">{step}</span>
            </div>
          </div>
          <div className="form_body">
            {/* <button className="form-button" onClick={()=>{setStep(step-1)}}>Previous</button> */}
            <div className="header">
              <h1>Thank you</h1>
            </div>
            <div className="col-md-12 align-center">
              <img className="verifies-img" src={verified} alt="verified" />
              <button className="form-button" onClick={() => {setStep(step-1)}}>Previous</button>
              <p>Thanks for choosing RemitAssure</p>
              <NavLink to="/dashboard">
                 <button type="submit" class="form-button" style={{ "width": '100%' }}>Go back to Dashboard</button></NavLink>
            </div>

          </div>
        </section>


      </>
    );
  }



  return (

    <>
      <div>
        {
          1 ? (
            <div class="form">
               {  
                  token || verification_otp|| DigitalCode != undefined || '' ? (
                   <>

                  <section className="why-us section-bgba user_dashboard_banner">
                    <div className="container">
                      <div className="row">

                        <div className="col-md-8">{
                          <Form />}
                        </div>
                
                        <div className="col-md-4">

                          {/* <img src={sendmoney} className="send-money-img" /> */}

                          <Table>

                            {
                              step > 0 && Total_amount != '' ? (

                                <div className="summary">
                                  <BsCheckCircleFill />
                                  <h5>Summary</h5>
                                  <tbody>
                                    <tr>
                                      <th>Amount</th>
                                      <td>{amountValue.amountInput + " " + from + " ⇒ " + total_amount + " " + to}</td>
                                      {/* <td>{total_amount }</td> */}
                                    </tr>
                                    <tr>
                                      <th>Received Method</th>
                                      <td>{recivedMethod}</td>
                                    </tr>
                                    <tr>
                                      <th>Payout Partners</th>
                                      <td>{payOutPartner}</td>
                                    </tr>
                                  </tbody>
                                </div>
                              ) : (
                                <>
                                </>

                              )

                            }

                            {
                              step > 0 && formValue.bankName != '' ? (
                                <div className="summary1">
                                  <BsCheckCircleFill />
                                  <h5>Recipient details Summary</h5>
                                  <tbody>
                                    <tr>
                                      <th>Full Name</th>
                                      <td>{formValue.firstName} <span>{formValue.lastName}</span></td>
                                    </tr>
                                    <tr>
                                      <th>Mobile</th>
                                      <td>{formValue.mobile}</td>
                                    </tr>
                                    <tr>
                                      <th>Reason For Sending Money</th>
                                      <td>{formValue.reasonMoney}</td>
                                    </tr>
                                  </tbody>

                                </div>

                              ) : (
                                <>
                                </>

                              )

                            }

                          </Table>




                          {/* {  
                    step > 0 && formValue.bankName != ''  ? (
              
                  
                    <>
                    <div className="summary">
                      <h5>Recipient details Summary</h5>
                      <Table>
                        <tbody>
                          <tr>
                            <th>First Name</th>
                            <td>{firstName}</td>
                          </tr>
                          <tr>
                            <th>Mobile</th>
                            <td>{mobileData}</td>
                          </tr>
                          <tr>
                            <th>Reason For Sending Money</th>
                            <td>{reasonMoney}</td>  
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </>
                  
                  
                    
                  ):(
                    <>
                    </>
                  
                  )
                  
                  }  */}

                        </div>


                      </div>
                    </div>
                  </section>
                  </>
                  ) : (
                      <>
                      <Page404 />
                      </>
                  )
                  }

            </div>
          ) : (
            <></>

          )
        }
      </div>




    </>
  );
}



export default SendMoney;