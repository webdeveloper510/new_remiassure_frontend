
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import { updatePayment } from "../../utils/Api";

// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}


const Editrecipientuser = () => {

  /**************************token ************************ */
  const token = localStorage.getItem("token");
  // console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  // console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  // console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  // console.log("Verification Message", verification_otp);

  const DigitalCode = localStorage.getItem("DigitalCode");
  // console.log("DigitalCode", DigitalCode);

  const AmountValue = localStorage.getItem("AmountValue");
  // console.log("AmountValue", AmountValue)

  const Total_amount = localStorage.getItem("Total_amount");
  // console.log("Amonut", Total_amount);



  const RecipientUserName = localStorage.getItem("RecipientUserName");
  // console.log("RecipientUserName", RecipientUserName);



  //Get data of update value 




  /*************data get ************/
  let { id } = useParams();
  // alert(id)
  console.log("========================>", id);


  /************ Start -Recipient Bank Details state***************/
  const [errorUserRecipient, setErrorUserRecipient] = useState(false);
  const [loading, setLoading] = useState(false);

  /************ Start -messageText state***************/
  const [BankNameText, setBankNameText] = useState('');
  // const [userRecipientData, setUserRecipientData] = useState('');
  const [RecepientsData, setRecepientsData] = useState('');

  /************ Start -Recipient Bank Details state***************/
  const [bank_name, setBank_name] = useState('');
  const [account_name, setAccount_name] = useState('');
  const [account_number, setAccount_number] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [flat, setFlat] = useState('');
  const [gender, setGender] = useState('');
  const [building, setBuilding] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country_code, setCountry_code] = useState('');
  const [country, setCountry] = useState('');
  const [Date_of_birth, setDate_of_birth] = useState('');
  const [Countrybirth, setCountrybirth] = useState('');
  const [reasonMoney, setReasonMoney] = useState('');
  const [customer_id, setCustomer_id] = useState('');

  const [data, setData] = useState({
    bank_name: '', account_name: '', account_number: '', first_name: '', middle_name: '',
    last_name: '', email: '', mobile: '', flat: '', building: '', street: '',  city: '',
    state: '', country: ''
  });

  const recipientSchema = Yup.object().shape({
    bank_name: Yup.string().min(2).max(50).required(),
      accountName: Yup.string().min(2).max(50).required(),
      accountNumber: Yup.string().min(11).max(17).required(),
    firstName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter").required("First name is required"),
    middleName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter").required("Middle Name is required"),
    lastName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter").required("Last name is required"),
    email: Yup.string().email().min(6, "Minimum 6 Letter").max(50, "Maximum 50 letter").required("Email is required"),
    mobile: Yup.string().min(7).max(15).required(),
    flat: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Flat No. is required"),
    building: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Building No. is required"),
    street: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Street is required"),
    city: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("City is required"),
    state: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("State is required"),
    country: Yup.string().required("Country is required"),
    
  })

  

  const countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote D\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Lao People\'S Democratic Republic', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ]
  /************ Start - Edi-Recipient Bank Details function***************/
  const handleBankNameValue = (event) => {
    const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
    if (event.target.value === '' || regex.test(event.target.value)) {
      setBank_name(event.target.value);
    }
  };


  const handleAccountNameValue = (event) => {
    const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
    if (event.target.value === '' || regex.test(event.target.value)) {
      setAccount_name(event.target.value);
    }
  };

   const handleAccountNumberValue = (event) => {
    const newValue = event.target.value.replace(/\D/, ""); // remove non-numeric characters
    setAccount_number(newValue);
  
  };

 


  /************ Start - Cancel Recipient Bank Details function***************/
  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);

    console.log("handle request ");
  }

  /****************** select country *******************/
  const [countryValue, setcountryValue] = useState('')
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

/********************** Start- form-validation ***********************/
const input_bankName = useRef(null);
const input_accountName = useRef(null);
const input_accountNumber = useRef(null);
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
const input_country = useRef(null);


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
    * ************** Start  Recipient Bank Details ****************************
    * ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  const initialValues = {
    bank_name:"",
    account_name:"",
    account_number:"",
    first_name: '',
    middle_name: '',
    last_name: "",
    email: "",
    mobile: "",
    flat: "",
    building: "",
    street: "",
    city: '',
    state: '',
    country: '',
  
  }
  useEffect(() => {
    console.log("Data=========>", id)
    //  setLoading(true); // Set loading before sending API requestssss
    axios.get(API.BASE_URL + `payment/recipient-update/${id}`, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        let value = response.data.data
        console.log({...data, bank_name: value.bank_name, account_name: value.account_name,
          account_number: value.account_number, first_name: value.first_name, middle_name: value.middle_name,
          last_name: value.last_name, email: value.email, mobile: value.mobile,
          flat: value.flat, building: value.building, state: value.state, city: value.city,
           street: value.street, country: value.country,})
        //  setLoading(false); // Stop loading   
        setData({...data, bank_name: value.bank_name, account_name: value.account_name,
          account_number: value.account_number, first_name: value.first_name, middle_name: value.middle_name,
          last_name: value.last_name, email: value.email, mobile: value.mobile,
          flat: value.flat, building: value.building, state: value.state, city: value.city,
           street: value.street, country: value.country,})
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
  const handleRecipientBankDetails = (value) => {

    if (bank_name.length==0){
      input_bankName.current.focus();
      setErrorUserRecipient(true);
    } else if (account_name.length==0){
      input_accountName.current.focus();
      setErrorUserRecipient(true);
    }else if (account_number.length==0){
      input_accountNumber.current.focus();
      setErrorUserRecipient(true);
    }else if (firstName.length==0){
      input_firstName.current.focus();
      setErrorUserRecipient(true);
    }else if (middleName.length==0){
      input_middleName.current.focus();
      setErrorUserRecipient(true);
    }else if (lastName.length==0){
      input_lastName.current.focus();
      setErrorUserRecipient(true);
    }else if (email.length==0){
      input_firstName.current.focus();
      setErrorUserRecipient(true);
    }else if (mobile.length==0){
      input_mobile.current.focus();
      setErrorUserRecipient(true);
    }else if (flat.length==0){
      input_flat.current.focus();
      setErrorUserRecipient(true);
    }else if (building.length==0){
      input_building.current.focus();
      setErrorUserRecipient(true);
    }else if (street.length==0){
      input_street.current.focus();
      setErrorUserRecipient(true);
    }else if (city.length==0){
      input_city.current.focus();
      setErrorUserRecipient(true);
    }else if (state.length==0){
      input_state.current.focus();
      setErrorUserRecipient(true);
    }else if (country.length==0){
      input_country.current.focus();
      setErrorUserRecipient(true);
    }
   else{
    console.log("============>token", token)

    //useRef is used for focusing on inputbox
    // event.preventDefault();
    setLoading(true); // Set loading before sending API requestssss
    axios.post(API.BASE_URL + `payment/recipient-update/${value}`, {
      bank_name: bank_name,
      account_name: account_name,
      account_number: account_number,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      mobile: mobile,
      flat: flat,
      building: building,
      street: street,
      city: city,
      state: state,
      country: countryValue.label,
   
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
        // setBankNameText(error.response.data);

      })
  }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: recipientSchema,
    onSubmit : async (values) => {
      // console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppp",values)
      setLoading(true)
      updatePayment({
      bank_name: values.bank_name,
      account_name: values.account_name,
      account_number: values.account_number,
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      email: values.email,
      mobile: values.mobile,
      flat: values.flat,
      building: values.building,
      street: values.street,
      city: values.city,
      state: values.state,
      country: values.countryValue.label,
      }).then((res)=>{
        console.log("rescipient+++++++++++++++", res)
        setLoading(false)
      }).catch((error)=>{
        console.log(error.response)
        if(error.response.data.code=="400"){
          toast.error(error.response.data.message,{ position: "top-right", autoClose: 2000, theme: "colored" })
        }
        setLoading(false)
      })

    }
  })



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
                    <h2 class="text-black font-w600 mb-0"><b>Update Recipient </b>
                      <NavLink to="/userrecipients">
                        <button className="start-form-button back-btn" >
                          <MdOutlineKeyboardBackspace />
                          Back
                        </button>
                      </NavLink>
                      {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}

                    </h2></div>
                  <span style={myStyle}>{BankNameText.Accountnumberexist ? BankNameText.Accountnumberexist : ''}</span>
                  <span style={myStyle}>{BankNameText.userrecipient ? BankNameText.userrecipient : ''}</span>
                  <form className="single-recipient">
                    <div className="card">
                      <div className="card-body">

                        <div className="row">
                          <h5>Bank Information</h5>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                              //  type="text"
                              //  name="bankName"
                               value={data.bank_name}
                              //  onChange={handleBankNameValue}
                              //  className='rate_input form-control'
                              //  ref={input_bankName}
                              type="text"
                                autoComplete='off'
                                placeholder="Enter Bank Name"
                                {...formik.getFieldProps('bank_name')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.bank_name && formik.errors.bank_name },
                                  {
                                    'is-valid': formik.touched.bank_name && !formik.errors.bank_name,
                                  }
                                )}
                              />
                             {errorUserRecipient && bank_name.length<=0?
                            <span style={myStyle}>Please Enter the Bank Name </span>:""} 

                              <span style={myStyle}>{BankNameText.Enterbankname ? BankNameText.Enterbankname : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                              //  type="text"
                              //  name="input_accountName"
                              //  value={account_name}
                              //  onChange={handleAccountNameValue}
                              //  className='rate_input form-control'
                              //  ref={input_accountName}
                              value={data.account_name}
                              type="text"
                                autoComplete='off'
                                placeholder="Enter Account Name"
                                {...formik.getFieldProps('account_name')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.account_name && formik.errors.account_name },
                                  {
                                    'is-valid': formik.touched.account_name && !formik.errors.account_name,
                                  }
                                )}
                              />
                               {errorUserRecipient&&account_name.length<=0?
                            <span style={myStyle}>Please Enter the Account Name </span>:""} 

                              <span style={myStyle}>{BankNameText.Enteraccountname ? BankNameText.Enteraccountname : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                              <input
                               type="text"
                               autoComplete='off'
                               value={data.account_number}
                               placeholder="Enter Account Number"
                               {...formik.getFieldProps('account_number')}
                               className={clsx(
                                 'form-control bg-transparent',
                                 { 'is-invalid': formik.touched.account_number && formik.errors.account_number },
                                 {
                                   'is-valid': formik.touched.account_number && !formik.errors.account_number,
                                 }
                               )}
                              />
                              {errorUserRecipient&&account_number.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""}

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
                                autoComplete='off'
                                value={data.first_name}
                                placeholder="Enter first name"
                                {...formik.getFieldProps('first_name')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.first_name && formik.errors.first_name },
                                  {
                                    'is-valid': formik.touched.first_name && !formik.errors.first_name,
                                  }
                                )}
                              />
                             {errorUserRecipient&&firstName.length<=0?
                            <span style={myStyle}>Please Enter the First Name </span>:""} 

                              <span style={myStyle}>{BankNameText.first_name ? BankNameText.first_name : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Middle Name</p>
                              <input
                                type="text"
                                // ref={input_middleName}
                                className='rate_input form-control'
                                placeholder="Enter middle name"
                                autoComplete='off'
                                value={data.middle_name}
                                {...formik.getFieldProps('middleName')}
                              />
                              {errorUserRecipient&&middleName.length<=0?
                              <span style={myStyle}>Please Enter the Middle Name </span>:""} 

                              <span style={myStyle}>{BankNameText.middle_name ? BankNameText.middle_name : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                placeholder="Enter last name"
                                autoComplete='off'
                                value={data.last_name}
                                {...formik.getFieldProps('last_name')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.last_name && formik.errors.last_name },
                                  {
                                    'is-valid': formik.touched.last_name && !formik.errors.last_name,
                                  }
                                )}
                              />
                               {errorUserRecipient&&lastName.length<=0?
                              <span style={myStyle}>Please Enter the Last Name </span>:""} 

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
                                placeholder="Enter email"
                                autoComplete='off'
                                value={data.email}
                                // onChange={formik.getFieldProps('email')}
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.email && formik.errors.email },
                                  {
                                    'is-valid': formik.touched.email && !formik.errors.email,
                                  }
                                )}
                              />
                                {errorUserRecipient&&email.length<=0?
                              <span style={myStyle}>Please Enter the Email Address </span>:""} 

                              <span style={myStyle}>{BankNameText.email ? BankNameText.email : ''}</span>
                              <span style={myStyle}>{BankNameText.Emailinvalid ? BankNameText.Emailinvalid : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                              {/* <PhoneInput
                               
                                // ref={input_recipientMobile}
                                className='rate_input form-control'
                                country={"eg"}
                                enableSearch={true}
                                name="mobile"
                                defaultValue={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                              // placeholder={RecepientsData.mobile}
                              /> */}
                              <PhoneInput
                              //  ref={input_mobile}
                              //   country={"eg"}
                              //   enableSearch={true}
                              //   value={mobile}
                              //   onChange={(mobile) => setMobile(mobile)}
                              enableSearch={true}
                                name="mobile"
                                inputStyle={{ border: "none", margin: "none" }}
                                inputClass="phoneInp"
                                defaultCountry={"au"}
                                value={data.mobile}
                                onChange={mno => { formik.setFieldValue('mobile', mno); formik.setFieldTouched('mobile', true) }}
                                className={clsx(
                                    'form-control form-control-sm bg-transparent',
                                    { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                    {
                                        'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                    }
                                )}
                              />
                                  {errorUserRecipient&&mobile.length<=0?
                                  <span style={myStyle}>Please Enter the Mobile Number </span>:""} 

                              <span style={myStyle}>{BankNameText.mobile ? BankNameText.mobile : ''}</span>
                              <span style={myStyle}>{BankNameText.Entervalidmobile ? BankNameText.Entervalidmobile : ''}</span>
                              <span style={myStyle}>{BankNameText.Mobileexist ? BankNameText.Mobileexist : ''}</span>
                              <span style={myStyle}>{BankNameText.Validmobile ? BankNameText.Validmobile : ''}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row each-row">
                          <h5>Address</h5>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Flat/Unit No.<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter Flat No."
                                autoComplete='off'
                                value={data.flat}
                                {...formik.getFieldProps('flat')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.flat && formik.errors.flat },
                                  {
                                    'is-valid': formik.touched.flat && !formik.errors.flat,
                                  }
                                )}
                              />
                                {errorUserRecipient&&flat.length<=0?
                                  <span style={myStyle}>Please Enter the Flat Name</span>:""} 

                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Building/Unit No.<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                autoComplete='off'
                                value={data.building}
                                placeholder="Enter building no."
                                {...formik.getFieldProps('building')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.building && formik.errors.building },
                                  {
                                    'is-valid': formik.touched.building && !formik.errors.building,
                                  }
                                )}
                              />
                              {errorUserRecipient&&building.length<=0?
                                  <span style={myStyle}>Please Enter the Building Name</span>:""} 
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Street<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter street"
                                autoComplete='off'
                                {...formik.getFieldProps('street')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.street && formik.errors.street },
                                  {
                                    'is-valid': formik.touched.street && !formik.errors.street,
                                  }
                                )}
                              />
                               {errorUserRecipient&&street.length<=0?
                                  <span style={myStyle}>Please Enter the Street Name</span>:""} 
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
                                name="postcode"
                                defaultValue={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                              // placeholder={RecepientsData.postcode}
                              />
                            </Form.Group>
                          </div> */}
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">City/Town<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter City"
                                autoComplete='off'
                                {...formik.getFieldProps('city')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.city && formik.errors.city },
                                  {
                                    'is-valid': formik.touched.city && !formik.errors.city,
                                  }
                                )}
                                />
                               {errorUserRecipient&&city.length<=0?
                                  <span style={myStyle}>Please Enter the City Name</span>:""} 
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter State"
                                autoComplete='off'
                                {...formik.getFieldProps('state')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.state && formik.errors.state },
                                  {
                                    'is-valid': formik.touched.state && !formik.errors.state,
                                  }
                                )}
                              />
                                {errorUserRecipient&&state.length<=0?
                                  <span style={myStyle}>Please Enter the State Name</span>:""} 
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                              <Form.Select
                                name="country"
                                {...formik.getFieldProps('country')}
                                value={data.country}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.country && formik.errors.country },
                                  {
                                    'is-valid': formik.touched.country && !formik.errors.country,
                                  }
                                )}
                              >
                                <option value="">Select country</option>
                                {
                                  countries.map((location) => {
                                    return (
                                      <option value={location.code}>{location.name}</option>
                                    )
                                  })
                                }


                              </Form.Select>
                                 {errorUserRecipient&&country.length<=0?
                                  <span style={myStyle}>Please Enter the Country Name</span>:""} 


                              {/* <CountryDropdown
                       id="UNIQUE_ID" 
                       className='YOUR_CSS_CLASS rate_input form-control'
                        preferredCountries={['gb', 'us' ]} 
                        value="" handleChange={e=> console.log(e.target.value)}
                        name="country"
                        defaultValue={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        // placeholder={RecepientsData.country}
                        ></CountryDropdown> */}
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
                                name="country_code"
                                defaultValue={country_code}
                                onChange={(e) => setCountry_code(e.target.value)}
                              // placeholder={RecepientsData.country_code}
                              />
                            </Form.Group>
                          </div> */}
                         
                          {/* <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Reason For Sending Money</p>
                              <select
                                className="form-select rate_input form-control"
                                aria-label="Select a reason"
                                // ref={input_recipientReasoMoney}
                                name="reasonMoney"
                                defaultValue={reasonMoney}
                                onChange={(e) => setReasonMoney(e.target.value)}
                              >
                                <option selected>Select a reason</option>
                                <option value="Family Support">Family Support</option>
                                <option value="Education">Education</option>
                                <option value="Tax Payment">Tax Payment</option>
                                <option value="Loan Payment">Loan Payment</option>
                                <option value="Travel Payment">Travel Payment</option>
                                <option value="Utility Payment">Utility Payment</option>
                              </select>
                        
                            </div>
                          </div> */}
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
                              onClick={() => handleRecipientBankDetails(id)}
                            >
                              Update Recipient

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



export default Editrecipientuser;