
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, Navigate, useNavigate } from 'react-router-dom';
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
import { createRecipient } from "../../utils/Api";


// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const Addnewrecipient = () => {

  /************ Start-show hide condtion page ***************/
  const token = localStorage.getItem("token");

  const userdt = JSON.parse(localStorage.getItem("remi-user-dt"))


  /************ Start -Recipient Bank Details state***************/

  const recipientSchema = Yup.object().shape({
    bankNameValue: Yup.string().min(2).max(50).required(),
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
    country_code: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Language is required"),
    postcode: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Sending To is required"),
    reasonMoney: Yup.string().required()
  })

  const initialValues = {
    bankNameValue: "",
    accountName: "",
    accountNumber: "",
    firstName: '',
    middleName: '',
    lastName: "",
    email: "",
    mobile: "",
    flat: "",
    building: "",
    street: "",
    city: '',
    state: '',
    country: '',
    country_code: "",
    postcode: "",
    reasonMoney: ""
  }


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

  // const [formValue, setFormValue] = React.useState({
  //   firstName: '', middleName: '',
  //   lastName: '', email: '', flat: '', building: '', street: '', postcode: '', city: '',
  //   state: '', country_code: '', country: '', reasonMoney: ''
  // });

  /************ Start -Recipient Bank Details function***************/
  // const handleStep2InputChange = (e, key) => {
  //   console.log(e)
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

  /****************** select country *******************/
  const [countryValue, setcountryValue] = React.useState('')
  const countryoptions = useMemo(() => countryList().getData(), [])

  // const changeHandler = countryValue => {
  //   setcountryValue(countryValue)
  // }

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


  // const handleAccountNameValue = (event) => {
  //   const regex = /^[a-zA-Z]+$/; // regex pattern to allow only alphabets
  //   if (event.target.value === '' || regex.test(event.target.value)) {
  //     setAccountName(event.target.value);
  //   }
  // };


  const country = [
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


  /**********************Design function************ */
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };


  /**************************************************************************
* ************** Start  Recipient Bank Details ****************************
* ***********************************************************************/

  /* start-- useRef is used for focusing on inputbox */
  // const input_grant_type = useRef(null);
  // const input_recipientAccountName = useRef(null);
  // const input_recipientAccountNumber = useRef(null);
  // const input_recipientFirstName = useRef(null);
  // const input_recipientMiddleName = useRef(null);
  // const input_recipientLastName = useRef(null);
  // const input_recipientEmail = useRef(null);
  // const input_recipientMobile = useRef(null);
  // const input_recipientReasoMoney = useRef(null);
  // const input_recipientAddress = useRef(null);


  const handleRecipientBankDetails = (event) => {
    event.preventDefault();

    //useRef is used for focusing on inputbox
    //     if(errorBankName.length==0){
    //   		input_grant_type.current.focus();
    //   		setError(true);
    //       console.log(error, "error")
    //   	} 

    //  else{

    // setLoading(true); // Set loading before sending API request
    // axios.post(API.BASE_URL + 'payment/recipient-create/', {
    //   bank_name: bankNameValue,
    //   account_name: accountName,
    //   account_number:accountNumber,
    //   first_name: formValue.firstName,
    //   middle_name: formValue.middleName,
    //   last_name: formValue.lastName,
    //   email: formValue.email,
    //   mobile: mobile,
    //   flat: formValue.flat,
    //   building: formValue.building,
    //   street: formValue.street,
    //   postcode: formValue.postcode,
    //   city: formValue.city,
    //   state: formValue.state,
    //  country_code: formValue.country_code,
    //   country: countryValue.label,
    //   reason: formValue.reasonMoney

    // }, {
    //   headers: {
    //     "Authorization": `Bearer ${signup_token ? signup_token : token}`,
    //   },

    // })
    //   .then(function (response) {
    //     console.log(response);
    //     setLoading(false); // Stop loading  
    //     navigate('/userrecipients');


    //   })
    //   .catch(function (error, message) {
    //     console.log(error.response);
    //     setLoading(false); // Stop loading in case of error
    //     setBankNameText(error.response.data);



    //   })
  }
  // }
  const formik = useFormik({
    initialValues,
    validationSchema: recipientSchema,
    onSubmit: async (values) => {
      // console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppp",values)
      setLoading(true)
      createRecipient({
        bank_name: values.bankNameValue,
        account_name: values.accountName,
        account_number: values.accountNumber,
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
        country: values.country,
        country_code: values.country_code,
        postcode: values.postcode,
        reason: values.reasonMoney
      }).then((res) => {
        console.log("rescipient+++++++++++++++", res)
        setLoading(false)
      }).catch((error) => {
        console.log(error.response)
        if (error.response.data.code == "400") {
          toast.error(error.response.data.message, { position:"bottom-right", autoClose: 2000, hideProgressBar: true })
        }
        setLoading(false)
      })

    }
  })



  return (
    <>
      {/* <Recipients /> */}

      {
        userdt?.digital_id_verified && token ? (

          <div className="margin-set">
            <div className="tabs-page">
              <Sidebar />
              <div className="content-body">
                <section className="showrecepient">
                  <div class="form-head mb-4">
                    <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b>
                      <NavLink to="/user-recipients">
                        <button className="start-form-button back-btn" >
                          <MdOutlineKeyboardBackspace />
                          Back
                        </button>
                      </NavLink>
                    </h2>
                  </div>
                  <form onSubmit={formik.handleSubmit} noValidate className="single-recipient">
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
                                autoComplete='off'
                                placeholder="Enter Bank Name"
                                {...formik.getFieldProps('bankNameValue')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.bankNameValue && formik.errors.bankNameValue },
                                  {
                                    'is-valid': formik.touched.bankNameValue && !formik.errors.bankNameValue,
                                  }
                                )}
                              />
                              <span style={myStyle}>{BankNameText.Enterbank ? BankNameText.Enterbank : ''}</span>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                autoComplete='off'
                                placeholder="Enter Account Name"
                                {...formik.getFieldProps('accountName')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.accountName && formik.errors.accountName },
                                  {
                                    'is-valid': formik.touched.accountName && !formik.errors.accountName,
                                  }
                                )}
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
                                autoComplete='off'
                                placeholder="Enter Account Number"
                                // onKeyDown={(e) => inputvalidation(e)}
                                {...formik.getFieldProps('accountNumber')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.accountNumber && formik.errors.accountNumber },
                                  {
                                    'is-valid': formik.touched.accountNumber && !formik.errors.accountNumber,
                                  }
                                )}
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
                                // type="text"
                                // // ref={input_recipientFirstName}
                                // className='rate_input form-control'
                                // name="firstName"
                                // defaultValue={formValue.firstName}
                                // onChange={(e) => handleStep2InputChange(e, 'firstName')}
                                type="text"
                                autoComplete='off'
                                placeholder="Enter first name"
                                {...formik.getFieldProps('firstName')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.firstName && formik.errors.firstName },
                                  {
                                    'is-valid': formik.touched.firstName && !formik.errors.firstName,
                                  }
                                )}
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
                                // ref={input_middleName}
                                className='rate_input form-control'
                                placeholder="Enter middle name"
                                autoComplete='off'
                                {...formik.getFieldProps('middleName')}
                              />
                              <span style={myStyle}>{BankNameText.middle_name ? BankNameText.middle_name : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                // type="text"
                                // // ref={input_recipientLastName}
                                // className='rate_input form-control'
                                // name="lastName"
                                // defaultValue={formValue.lastName}
                                // onChange={(e) => handleStep2InputChange(e, 'lastName')}
                                type="text"
                                placeholder="Enter last name"
                                autoComplete='off'
                                {...formik.getFieldProps('lastName')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.lastName && formik.errors.lastName },
                                  {
                                    'is-valid': formik.touched.lastName && !formik.errors.lastName,
                                  }
                                )}
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
                                // type="email"
                                // // ref={input_recipientEmail}
                                // className='rate_input form-control'
                                // name="email"
                                // defaultValue={formValue.email}
                                // onChange={(e) => handleStep2InputChange(e, 'email')}
                                type="email"
                                placeholder="Enter email"
                                autoComplete='off'
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
                              <span style={myStyle}>{BankNameText.Enteremail ? BankNameText.Enteremail : ''}</span>
                              <span style={myStyle}>{BankNameText.Emailinvalid ? BankNameText.Emailinvalid : ''}</span>
                              <span style={myStyle}>{BankNameText.Emailexist ? BankNameText.Emailexist : ''}</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                              <PhoneInput
                                enableSearch={true}
                                name="mobile"
                                inputStyle={{ border: "none", margin: "none" }}
                                inputClass="phoneInp"
                                defaultCountry={"au"}
                                onChange={mno => { formik.setFieldValue('mobile', mno); formik.setFieldTouched('mobile', true) }}
                                className={clsx(
                                  'form-control form-control-sm bg-transparent',
                                  { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                  {
                                    'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                  }
                                )}
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
                              <p className="get-text">Flat/Unit No.<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter Flat No."
                                autoComplete='off'
                                {...formik.getFieldProps('flat')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.flat && formik.errors.flat },
                                  {
                                    'is-valid': formik.touched.flat && !formik.errors.flat,
                                  }
                                )}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Building/Unit No.<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                autoComplete='off'
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
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Postcode<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter Postcode"
                                autoComplete='off'
                                {...formik.getFieldProps('postcode')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.postcode && formik.errors.postcode },
                                  {
                                    'is-valid': formik.touched.postcode && !formik.errors.postcode,
                                  }
                                )}
                              />
                            </Form.Group>
                          </div>
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
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country Code<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="text"
                                placeholder="Enter Country Code"
                                autoComplete='off'
                                {...formik.getFieldProps('country_code')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.country_code && formik.errors.country_code },
                                  {
                                    'is-valid': formik.touched.country_code && !formik.errors.country_code,
                                  }
                                )}
                              />

                              <span style={myStyle}>{BankNameText.Entercountrycode ? BankNameText.Entercountrycode : ''}</span>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                              <Form.Select
                                name="country"
                                {...formik.getFieldProps('country')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.country && formik.errors.country },
                                  {
                                    'is-valid': formik.touched.country && !formik.errors.country,
                                  }
                                )}
                              >
                                <option value="">Country</option>
                                {
                                  country.map((location) => {
                                    return (
                                      <option value={location.code}>{location.name}</option>
                                    )
                                  })
                                }


                              </Form.Select>

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
                              {/* <select
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
                              </select> */}
                              <Form.Select
                                name="reasonMoney"
                                {...formik.getFieldProps('reasonMoney')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.reasonMoney && formik.errors.reasonMoney },
                                  {
                                    'is-valid': formik.touched.reasonMoney && !formik.errors.reasonMoney,
                                  }
                                )}
                              >
                                <option value="">Select a reason</option>
                                <option value="Family Support">Family Support</option>
                                <option value="Education">Education</option>
                                <option value="Tax Payment">Tax Payment</option>
                                <option value="Loan Payment">Loan Payment</option>
                                <option value="Travel Payment">Travel Payment</option>
                                <option value="Utility Payment">Utility Payment</option>


                              </Form.Select>
                              <span style={myStyle}>{BankNameText.Reason ? BankNameText.Reason : ''}</span>
                              {/* {error&&formValue.reasonMoney.length<=0?
                            <span style={myStyle}>Please Select the Reason For Sending Money </span>:""} */}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <button
                              type="button"
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
                            // onClick={handleRecipientBankDetails}
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
          <Navigate to="/send-money" />
        )
      }

    </>
  )
}



export default Addnewrecipient;