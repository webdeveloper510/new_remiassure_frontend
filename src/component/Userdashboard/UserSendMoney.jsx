import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from "../context/UserContext";
import { HiSwitchHorizontal } from 'react-icons/hi';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router";
import ReactFlagsSelect from "react-flags-select";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import Accordion from 'react-bootstrap/Accordion';
import creditcards from '../../assets/img/userdashboard/mastercard.png';
import Sidebar from './Sidebar';
import Select from "react-select";
import countryList from 'react-select-country-list'
import Page404 from "../pageNotfound/Page404";
import nocard from "../../assets/img/userdashboard/nocard.jpg";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}



const UserSendMoney = () => {


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

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const recipentID = localStorage.getItem("recipentID");
  console.log("recipentID", recipentID);



  // let {recipient_id} = useParams();
  // // alert(id)
  //   console.log("========================>",recipient_id) ;

  /************ Start page show hide condtion page ***************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp);

  const paymetCardId = localStorage.getItem("paymetCardId")
  console.log(paymetCardId, "paymetCardId")


  /******************* Start Api call Amount & Delivery State  *******/
  const [from, setFrom] = React.useState('AUD');
  const [shows, setShows] = React.useState(false);
  const [to, setTo] = React.useState('NZD');
  const [amount, setAmount] = React.useState();
  const [exchange_amount, setExchange_amount] = React.useState();
  const [total_amount, setTotal_amount] = React.useState('');
  const [total_rate, setTotal_rate] = React.useState('1.0998');

  // const [options, setOptions] = React.useState([]);
  const [output, setOutput] = React.useState(0);
  const [info, setInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  /*************************** Start- SelectPayment State************************* */
  const [checkedValueCard, setCheckedValueCard] = React.useState(false);

  const [currencyerrorText, setCurrencyerrorText] = React.useState('');

  /************** Start - Recipient Bank Details************ **********/
  const [error, setError] = React.useState(false);
  const [recipientBankName, setRecipientBankName] = React.useState('');
  const [recipientAccountName, setRecipientAccountName] = React.useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = React.useState('');
  const [recipientMiddleName, setRecipientMiddleName] = React.useState('');
  const [recipientLastName, setRecipientLastName] = React.useState('');
  const [recipientMobile, setRecipientMobile] = React.useState('');
  const [recipientReasoMoney, setrecipientReasoMoney] = React.useState('');
  const [recipientAddress, setRecipientAddress] = React.useState('');


  /************ Start -Recipient Bank Details***************/
  const [id, setId] = React.useState('');

  const [formValue, setFormValue] = React.useState({
    accountNumber: '', firstName: '', middleName: '',
    lastName: '', email: '', mobile: '', flat: '', building: '', street: '', postcode: '', city: '', state: '',
    country_code: '', country: '', reasonMoney: ''
  });

  const [inputPhoneValue, setInputPhoneValue] = React.useState({
   mobile: '',
  });


  const [bankNameValue, setBankNameValue] = React.useState({
    bankName: '',
   });
   const [accountNameValue, setAccountNameValue] = React.useState({
    accountName: '',
   });
   const [accountNumberValue, setAccountNumberValue] = React.useState({
    accountNumber: '',
   });

   const bankNameRef = React.useRef(null);
   const accountNameRef = React.useRef(null);
   const accountNumberRef = React.useRef(null);
 
 

  /************ Start -messageText state***************/
  const [BankNameText, setBankNameText] = React.useState('');


  /******************* start Amount value  state   *******/
  const [amountValue, setAmountValue] = React.useState({
    amountInput: '',
    // summaryList: false,
  })

  /******************* start card show  state   *******/
  const [showCards, setshowCards] = React.useState("");

  /************ Start -Recipient List Bank Details***************/
  const [data, setData] = React.useState([]);

  /************ Start -Recipient card Error***************/
  const [CardErrorText, setCardErrorText] = React.useState('');

  const [formCardValue, setformCardValue] = React.useState({
    recipient_id, cardNumber: '', securityCode: '', cardName: '', exp_month: '', exp_year: '',
  });

  /************ Start -Card List State***************/
  const [bankCardData, setBankCardData] = React.useState('');
/*******************************Start- cardError State*****************************/
  const [errorCard, seterrorCard] = React.useState(false);



  /************ Start -Recpient data ***************/

  const handleCloseDetails = () => setshowCards(false);
  const ShowCardDetails = () => setshowCards(true);

  // start select value get data
  const { location } = useContext(UserContext);


  // Start -Recipient Bank Details 
  const handleStep2InputChange = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let valueForm = formValue
    valueForm[key] = e.target.value
    setFormValue(valueForm)
    console.log(formValue)
  }
  

    // Start - Phone Bank value
    const handleInputPhoneValue = (e, key) => {
      console.log(e.target.value)
      console.log(key)
      let valueFormData = inputPhoneValue
      valueFormData[key] = e.target.value
      setInputPhoneValue(valueFormData)
      console.log(inputPhoneValue)
    }

     // Start - BankValue Bank value
     const handleBankValue = React.useCallback((e, key) => {
      const regex = /^[a-zA-Z]+$/;
      const value = e.target.value;
      if (value === '' || regex.test(value)) {
        setBankNameValue(prevState => ({
          ...prevState,
          [key]: value
        }));
        setTimeout(() => {
          bankNameRef.current.focus();
        }, 10);
      }
    }, []);


 // Start - AccountName value Bank value
    const handleAccountValue = React.useCallback((e, key) => {
      const regex = /^[a-zA-Z]+$/;
      const value = e.target.value;
      if (value === '' || regex.test(value)) {
        setAccountNameValue(prevState => ({
          ...prevState,
          [key]: value
        }));
        setTimeout(() => {
          accountNameRef.current.focus();
        }, 10);
      }
    }, []);
    
     // Start - AccountNumber value Bank value
     const handleAccountNumberValue = React.useCallback((e, key) => {
      const newValue = e.target.value.trim().replace(/[^0-9]/g, ''); // remove non-numeric characters and leading/trailing whitespace
      setAccountNumberValue(prevState => ({
        ...prevState,
        [key]: newValue
      }));
      setTimeout(() => {
        accountNumberRef.current.focus();
      }, 10);
    }, []);

  /*************************** Start- Select Payment Function************************* */
  const getCardDataPayment = (value) => {
    let CardForm = formCardValue
    CardForm.cardName = value.name;
    CardForm.cardNumber = value.number;
    CardForm.exp_month = value.exp_month;
    CardForm.exp_year = value.exp_year;
    CardForm.recipient_id = recipentID;

    setFormValue(CardForm)
    console.log("value data===========================>123", formCardValue)
    // console.log("value data===========================>123",value)
  }
  /*************************** End - Select Payment Function************************* */

  /*************************** Start- Recipient-Select-Payment Function************************* */
  const selectRecipientPayemen = (value) => {
    localStorage.setItem("recipentID", value)
    setStep(step + 1)

    let CardForm = formCardValue
    CardForm.cardName = value.name;
    CardForm.cardNumber = value.number;
    CardForm.exp_month = value.exp_month;
    CardForm.exp_year = value.exp_year;
    CardForm.recipient_id = recipentID;


    setformCardValue(CardForm)
    console.log("Recipient Payment Data===========================>123", formCardValue)
    // console.log("value data===========================>123",value)

  }


  // Start -Recipient Crad Details 
  const handleCardInputChange = (e, key) => {
    console.log(e.target.value)
    console.log(key)
    let CardForm = formCardValue
    CardForm[key] = e.target.value
    setformCardValue(CardForm)
    console.log(formCardValue)
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


  /************************saveCardChecked function ******************/
  const handleCheckboxChange = () => {
    setCheckedValueCard(!checkedValueCard);
  };

  
  //multiple function call
  function someFunc() {
    // handleShow();
    setStep(step + 1);

    // handleDataStore();
  }

  const handleAmountSummary = () => {
    // setStep(step+1);
    handleAmountDelivery();

  }



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
    console.log(amount)
  }, [amount])


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



  /****************** select country *******************/

    
  const [countryValue, setcountryValue] =React.useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = countryValue => {
      setcountryValue(countryValue)
  }


  /* start-- useRef is used for focusing on inputbox */
  const input_location = useRef(null);

  const navigate = useNavigate();
  // const notify = () => toast.success("Amount & Delivery Successfully!!");



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
          // if(error.response.data.status){
          //     toast.error(error.response.data.message);
          // } 
          // setCurrencyerrorText(error.response.data.error)
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
          setCurrencyerrorText(error.response.data.error);
        })

    }
  }
  // End Total Amount Api call 

  /**************************************************************************
  * ************** Start  Total Amount From Api call  ******************************
  * ***********************************************************************/
  const myTotalAmountFrom = (value) => {
    setFrom(value);
    // setTo(value)
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
        from: value,
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
          setCurrencyerrorText(error.response.data.error)
        })

    }
  }
  // End Total Amount Api call 
  /**************************************************************************
  * ************** Start  Total Amount To Api call  ******************************
  * ***********************************************************************/
  const myTotalAmountTo = (value) => {
    setTo(value)
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
        to: value,
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
          setCurrencyerrorText(error.response.data.error)
        })

    }
  }
  // End Total Amount Api call 



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
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/recipient-create/', {
      bank_name: bankNameValue.bankName,
      account_name: accountNameValue.accountName,
      account_number: accountNumberValue.accountNumber,
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
      country_code: '45',
      country: countryValue.label,
      reason: formValue.reasonMoney,

    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        console.log(response.data.recipient_data.id)
        handleShow(); //show view page
        setStep(step + 1)
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
  * ************** Start  Recipient List ************************************
  * ***********************************************************************/

  useEffect(() => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/recipient-list/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setData(response.data);
        setLoading(false); // Stop loading
        localStorage.setItem("User_Recipient_id", response.data.id);

        //   if (response.status)
        // // notify();
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false); // Stop loading in case of error 
      })
  }, [])

  console.log(data, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")


  /**************************************************************************
 * ************** Start  Create Card Bank Details ****************************
 * ***********************************************************************/
  const input_bankName = useRef(null);
 


  // const handleCradBankDetails = (event) => {
  //   setCheckedValueCard(!checkedValueCard)
  //   console.log(checkedValueCard, "checkedValueCardcheckedValueCard")
  //   event.preventDefault();

  //   axios.post(API.BASE_URL + 'payment/create-card/', {
  //     name: formCardValue.cardName,
  //     card_number: formCardValue.cardNumber,
  //     expiry_month: formCardValue.exp_month,
  //     expiry_year: formCardValue.exp_year,

  //   }, {
  //     headers: {
  //       "Authorization": `Bearer ${signup_token ? signup_token : token}`,
  //     },

  //   })
  //     .then(function (response) {
  //       console.log(response.data);

  //     })
  //     .catch(function (error, message) {
  //       console.log(error.response);
  //       setCardErrorText(error.response.data);

  //     })
  // }
  // //  }


  /**************************************************************************
  * ************** Start  Paymet Card Bank Details ****************************
  * ***********************************************************************/
  const input_cardName = useRef(null);
  const input_cardNumber = useRef(null);
  const input_exp_month = useRef(null);
  const input_exp_year = useRef(null);
  const input_securityCode = useRef(null);

  const handlePaymentCard = (event) => {
    let numericValue = checkedValueCard ? '1': '0' ; // Move the variable declaration outside the if block

    if (checkedValueCard) {
      console.log(numericValue);
      console.log("===================>checkedValueCard", checkedValueCard);
    }
    
    console.log(formCardValue, "formCardValueformCardValue")
    event.preventDefault();
         //useRef is used for focusing on inputbox
      //  if (formCardValue.cardName.length==0){
      //   input_cardName.current.focus();
      //       seterrorCard(true);
      //   } else if (formCardValue.cardNumber.length==0){
      //     input_cardNumber.current.focus();
      //     seterrorCard(true);
      //   } else if (formCardValue.exp_month.length==0){
      //     input_exp_month.current.focus();
      //     seterrorCard(true);
      //   } else if (formCardValue.exp_year.length==0){
      //     input_exp_year.current.focus();
      //     seterrorCard(true);
      //   } else if (formCardValue.securityCode.length==0){
      //     input_securityCode.current.focus();
      //     seterrorCard(true);
      //   }
      //   else{

    axios.post(API.BASE_URL + 'payment/stripe/card/', {
      name: formCardValue.cardName,
      card_number: formCardValue.cardNumber,
      expiry_month: formCardValue.exp_month,
      expiry_year: formCardValue.exp_year,
      cvc: formCardValue.securityCode,
      save_card:numericValue,


    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        handleCloseDetails();
        localStorage.setItem("paymetCardId", response.data.card_id);
        handlePay();
        navigate('/dashboard');
       

      })
      .catch(function (error, message) {
        console.log(error.response);
        // setCardErrorText(error.response.data);

      })
  }
  // }

  /**************************************************************************
  * ************** Start  Paymet Card Select Bank Details ****************************
  * ***********************************************************************/
  const handlePaymentCardSelect = (event) => {
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
        handleCloseDetails();
        // window.location.reload();
        setLoading(false); // Stop loading 
        navigate('/dashboard');

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
      send_currency: FromValue,
      recieve_currency: ToValue,
      send_amount: AmountValue,
      recieve_amount: Total_amount ,
      recipient_id: recipient_id.length > 0 ? recipient_id : recipentID,
      reason: recipientMoneyReason,
      destination: recipientDestination,
      reason: recipientMoneyReason,
      card_id: paymetCardId,
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },

    })
      .then(function (response) {
        console.log(response);
        // setStep(step + 1)
        setLoading(false); // Stop loading 
        // localStorage.setItem("paymetCardId", response.data.card_id);
      })
      .catch(function (error, message) {
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        setBankNameText(error.response.data);
        

      })
  }



  /**************************************************************************
 * ************** Start  Bank card List ************************************
 * ***********************************************************************/

  useEffect(() => {
    getList();

  }, [])

  const getList = () => {
    axios.post(API.BASE_URL + 'payment/card-list/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setBankCardData(response.data);
        console.log(bankCardData, "bankCardDatabankCardData")
        localStorage.setItem("CardData", JSON.stringify(response.data.data))
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
      })
  }


  console.log(data, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  /**************************************************************************
   * ************** Start  Recipient List Delete ****************************
   * ***********************************************************************/

  const handleRemovecardDetails = (value) => {
    console.log("========>Delete", value)

    axios.delete(API.BASE_URL + `payment/card/${value}`, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
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
   * ************** Start  Recipient Bank Details ****************************
   * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  const handleCardUpdateDetails = (value) => {
    console.log("============>token", token)

    // event.preventDefault();
    setLoading(true); // Set loading before sending API requestssss
    axios.patch(API.BASE_URL + `payment/card/${value}`, {
      // name:name,
      // card_number:number,
      // expiry_month:exp_month,
      // expiry_year: exp_year,


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
        setBankNameText(error.response.data);

      })
  }
  // }





  // Start design state
  const { useState } = React;
  const [step, setStep] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  const HandleRecipientlist = () => {
    setActive(!isActive);
  };


  const step_form = step + 1;

  const Form = () => {

    if (step == 0) {

      return (
        <Step1 />
      );

    } else if (step == 1) {

      return (
        <Step2 />);

    } else if (step == 2) {

      return (
        <Step3 />);

    }
  }

// console.log("To", to)
// console.log("From", from)

  const Step1 = () => {

    return (
      <>

        {/* {
          token || DigitalCode != undefined || '' ? (

            <> */}
        <section>
          <div class="form-head mb-4">
            <h2 class="text-black font-w600 mb-0"><b>Amount & Delivery</b>
            </h2>
          </div>


          <form>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input_field rate-value">
                      <p className="get-text Exchange_rate">Exchange Rate</p>
                      <p className="exchange-rate exchange_value" >1 <span>{from}</span> = {total_rate} <span>{to}</span> </p>
                      {/* <input type="text" className='rate_input form-control' /> */}
                    </div>
                  </div>
                </div>
                <div className="row each-row">
                  <span style={myStyle}>{currencyerrorText}</span>
                  <div className="col-md-6">
                    <div className="input_field">
                      <p className="get-text">From<span style={{ color: 'red' }} >*</span></p>
                      <select
                        className="form-select rate_input form-control"
                        aria-label="Select a reason"
                        value={from}
                        ref={input_From}
                        //  onChange={handleFrom}
                        onChange={(e) => { myTotalAmountFrom(e.target.value)}}
                      // onBlurCapture={myTotalAmount}
                      >
                        {/* <option value="">--- Select Currency ---</option> */}
                        <option value="AUD" selected="selected">AUD</option>
                        <option value="NZD">NZD</option>
                     

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
                        onChange={(e) => { myTotalAmountTo(e.target.value) }}
                      >


                        {/* <option value="">--- Select Currency ---</option> */}

                        {/* <option value="INR" selected="selected">INR</option> */}
                        <option value="NZD" selected="selected">NZD</option>
                        <option value="AUD">AUD</option>
                        <option value="EUR">EUR</option>
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
                  <div className="col-md-6">
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

                  <div className="col-md-6">
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
            </div>
          </form>

        </section>
        {/* </>
          ) : (
            <>
              <Page404 />
            </>
          )
        } */}

      </>
    );
  }


  const Step2 = () => {

    return (
      <>
        {/* {
          token || DigitalCode != undefined || '' ? (
            <> */}
        <section>
          <div className={isActive ? "col-md-12 add-recipent-section" : "col-md-12 remove-add-recipent-section"}>
            <div class="form-head mb-4">
              <h2 class="text-black font-w600 mb-0"><b>Select a recipient to send money</b>
              </h2>

            </div>


            <div className="card">
              <div className="card-body">


                {data?.length != 0 ? (
                  <div>
                    {
                      data.data?.map((res, index) => {
                        return (

                          <ul key={res.id}>
                            <a onClick={() => { selectRecipientPayemen(res.id) }}>

                              <li><a>{res.name} <BsChevronDoubleRight /></a></li>
                            </a>

                          </ul>

                        )
                      })}

                  </div>
                ) : (
                  <>
                  </>
                )
                }


                {data?.length == 0 ? (
                  <>
                    <div class="no-recipt">
                      <h5>No Recipient</h5>
                      <img src={norecipients} alt="no-recipeint" />
                    </div>
                  </>

                ) : (
                  <>

                  </>
                )
                }

                <div className="add-rec">
                  <button className="form-button" onClick={() => { setStep(step - 1) }} style={{ "float": "left" }}>Previous</button>
                  <button className="form-button" onClick={handleToggle} style={{ "float": "right" }}><BsFillPersonPlusFill /> Add Recepients</button>
                </div>


              </div>
            </div>

          </div>


          <div className={isActive ? "removerecepient" : "showrecepient"} >
            <div class="form-head mb-4">
              <h2 class="text-black font-w600 mb-0"><b>Recipient Bank Details</b>
              </h2>
            </div>
            <form>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5>Bank Information</h5>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          className="rate_input form-control"
                          name="bankName"
                          value={bankNameValue.bankName}
                          onChange={(e) => handleBankValue(e, 'bankName')}
                          ref={bankNameRef}
                        />
                        {/* {error&&formValue.bankName.length<=0?
                        <span style={myStyle}>Please Enter the Bank Name </span>:""}   */}
                        <span style={myStyle}>{BankNameText.Enterbank ? BankNameText.Enterbank : ''}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                        type="text"
                        className="rate_input form-control"
                        name="accountName"
                        value={accountNameValue.accountName}
                        onChange={(e) => handleAccountValue(e, 'accountName')}
                        ref={accountNameRef}
                        />

                        <span style={myStyle}>{BankNameText.Enteraccountname ? BankNameText.Enteraccountname : ''}</span>
                        {/* <span style={myStyle}>{BankNameText.message ? BankNameText.message : ''}</span> */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                        <input
                         type="text"
                         className="rate_input form-control"
                         name="accountNumber"
                         value={accountNumberValue.accountNumber}
                         onChange={(e) => handleAccountNumberValue(e, 'accountNumber')}
                         ref={accountNumberRef}
                        />
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
                        <span style={myStyle}>{BankNameText.Enteremail ? BankNameText.Enteremail : ''}</span>
                        <span style={myStyle}>{BankNameText.Emailexist ? BankNameText.Emailexist : ''}</span>
                        <span style={myStyle}>{BankNameText.Emailinvalid ? BankNameText.Emailinvalid : ''}</span>
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

                         {/* <PhoneInput
                          country={"eg"}
                          enableSearch={true}
                          name="mobile"
                          defaultValue={inputPhoneValue.mobile}
                          onChange={(e) => handleInputPhoneValue(e, 'mobile')}
                          /> */}

                        <span style={myStyle}>{BankNameText.mobile ? BankNameText.mobile : ''}</span>
                        <span style={myStyle}>{BankNameText.Entermobile ? BankNameText.Entermobile : ''}</span>
                        <span style={myStyle}>{BankNameText.Mobileexist ? BankNameText.Mobileexist : ''}</span>
                        <span style={myStyle}>{BankNameText.Validmobile ? BankNameText.Validmobile : ''}</span>
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

``
                  <div className="row each-row">
                    {/* <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Country Code<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"

                          className='rate_input form-control'
                          name="country_code"
                          defaultValue={formValue.country_code}
                          onChange={(e) => handleStep2InputChange(e, 'country_code')}
                        />
                        <span style={myStyle}>{BankNameText.Entercountrycode ? BankNameText.Entercountrycode : ''}</span>

                      </div>
                    </div> */}
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                        <Select
                          // ref={input_location}
                          options={options} 
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
                      <button type="submit" className="start-form-button" onClick={handlRecipientBankDetails}>Clear</button>
                    </div>
                    <div className="col-md-8">
                      {/* <button className="form-button" onClick={handleShow}>Continue</button> */}
                      {/* <button className="form-button" onClick={someFunc}>Continue</button> */}
                      <button type="" className="form-button" onClick={handleRecipientBankDetails}>Continue</button>
                      <button type="submit" className="form-button" onClick={HandleRecipientlist}>Previous</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>




          </div>
        </section>
        {/* </>
          ) : (
            <>
            <Page404 />
            </>
          )
        } */}


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
        {/* {
          token ||DigitalCode != undefined || '' ? (
            <> */}
        <section>
          <div class="form-head mb-4">
            <h2 class="text-black font-w600 mb-0"><b>Payment details</b>
            </h2>
          </div>
          <div className="form_body">
            <div className="row each-row">
              <h5>Payment type</h5>
              <div className="col-md-12">


                <label class="container-new">
                  <span className="radio-tick">Osko</span>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    // id="flexRadioDefault3" 
                    checked={moneyTransiction.paymentType == "Oslo"}
                    value="Oslo"
                    onChange={e => onInputChange(e)}
                    // onClick={ShowCardDetails}
                  />
                  <span className="checkmark"></span>
                </label>

              </div>
              <div className="col-md-12">
                <label class="container-new">
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
                <label class="container-new">
                  <span className="radio-tick">PoLI Internet Banking</span>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    // id="flexRadioDefault3" 
                    checked={moneyTransiction.paymentType == " PoLI Internet Banking"}
                    value=" PoLI Internet Banking"
                    onChange={e => onInputChange(e)}
                    // onClick={ShowCardDetails}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <button className="start-form-button">Clear</button>
              </div>
              <div className="col-md-8">
                <button className="form-button"  onClick={() => { setStep(step +1) }}>Continue</button>
                {/* <button className="form-button" onClick={() => { setStep(step - 1) }}>Previous</button> */}
              </div>
            </div>
          </div>



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
                      {/* <tr>
                        <th>#</th>
                        <th>Cards Details</th>
                      </tr> */}
                    </thead>

                    <tbody>

                      {
                        bankCardData.data?.map((res, index) => {
                          console.log(res, "resresresresresresresresresres")
                          return (

                            <tr key={res.id}>
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
                                          <p>
                                            <input
                                              // onClick ={}
                                              maxlength="3"
                                              type="password"
                                              defaultValue={formCardValue.securityCode}
                                              onChange={(e) => handleCardInputChange(e, 'securityCode')}
                                            />
                                          </p>
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
                      {/* <tr>
                        <th>#</th>
                        <th>Cards Details</th>
                      </tr> */}
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
                            ref={input_cardName}
                            type="text"
                            className='rate_input form-control'
                            name="cardName"
                            defaultValue={formCardValue.cardName}
                            onChange={(e) => handleCardInputChange(e, 'cardName')}
                          />
                           {errorCard&&formCardValue.cardName.length<=0?
                              <span style={myStyle}>Please select the Card </span>:""} 

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
                           ref={input_cardName}
                            max="16" 
                            type="text"
                            className='rate_input form-control'
                            name="cardNumber"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            defaultValue={formCardValue.cardNumber}
                            onChange={(e) => handleCardInputChange(e, 'cardNumber')}
                          />
                           
                          <i class="fa fa-credit-card" id="cardtype"></i>
                        </div>
                        {errorCard&&formCardValue.cardNumber.length<=0?
                              <span style={myStyle}>Please select the Card Number </span>:""} 
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
                              type="test"
                              ref={input_exp_month}
                              className='rate_input form-control'
                              name="exp_month"
                              placeholder="Month"
                              defaultValue={formCardValue.exp_month}
                              onChange={(e) => handleCardInputChange(e, 'exp_month')}
                            />
                             {errorCard&&formCardValue.exp_month.length<=0?
                              <span style={myStyle}>Please select the Card expiry month </span>:""} 
                            <span style={myStyle}>{CardErrorText.Entermonth ? CardErrorText.Entermonth : ''}</span>
                            <span style={myStyle}>{CardErrorText.expiry_month ? CardErrorText.expiry_month : ''}</span>
                            <span style={myStyle}>{CardErrorText.invalidmonth ? CardErrorText.invalidmonth : ''}</span>
                            <i class="fa fa-calendar"></i>

                          </div>
                          <span>/</span>
                          <div className="card-fields">
                            <input
                              min="0"
                              maxlength="4"
                              type="text"
                              ref={input_exp_year}
                              className='rate_input form-control'
                              name="exp_year"
                              placeholder="Year"
                              defaultValue={formCardValue.exp_year}
                              onChange={(e) => handleCardInputChange(e, 'exp_year')}
                            />
                            {errorCard&&formCardValue.exp_year.length<=0?
                              <span style={myStyle}>Please select the Card expiry year </span>:""} 
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
                            ref={input_securityCode}
                            className='rate_input form-control'
                            name="securityCode"
                            placeholder="xxx"
                            defaultValue={formCardValue.securityCode}
                            onChange={(e) => handleCardInputChange(e, 'securityCode')}
                          />
                          {errorCard&&formCardValue.securityCode.length<=0?
                              <span style={myStyle}>Please select the Card CVV </span>:""} 


                          <span style={myStyle}>{CardErrorText.Entercvc ? CardErrorText.Entercvc : ''}</span>
                          <i class="fa fa-lock"></i>
                        </div>

                      </div>
                    </div>


                  </div>


                  <div className="col-md-12">
                    <div className="saved-label">
                      {/* <input
                        inline
                        label="1"
                        name="group1"
                        type= "checkbox"
                        
                      
                      /> */}
                       <input
                        type="checkbox"
                        checked={checkedValueCard}
                        onChange={handleCheckboxChange}
                        // onChange={handleCradBankDetails}
                      />
                      {/* <Button type="submit" variant="primary" onClick={handleCradBankDetails}>
                          Save
                        </Button> */}
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

        </section>
        {/* </>
          ) : (
            <>
             <Page404 />
            </>
          )
        } */}
      </>
    );
  }
  return (

    <>



      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (
          <>
            <div className="margin-set">
              <div className="tabs-page">
                <Sidebar />

                <div className="content-body">

                  <div className="col-md-10">{
                    <Form />}
                  </div>


                </div>
              </div>
            </div>

          </>

        ) : (
          <>
            <Page404 />
          </>
        )
      }


    </>
  );
}



export default UserSendMoney;