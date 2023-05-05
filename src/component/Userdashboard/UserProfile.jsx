
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
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import { userProfile, updateProfile } from "../../utils/Api";

// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const Profile = () => {
  /************************Start page show hide condtion page ******************************/
  const token = localStorage.getItem("token");
  // console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  // console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const signup_token = localStorage.getItem("signup_token")
  // console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  // console.log("Verification Message", verification_otp)

  const RecipientUserName = localStorage.getItem("RecipientUserName");
  // console.log("RecipientUserName", RecipientUserName);

  const DigitalCode = localStorage.getItem("DigitalCode");
  // console.log("DigitalCode", DigitalCode);

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
  // const [firstName, setFirstName] = useState('');
  // const [middleName, setMiddleName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [mobile, setMobile] = useState('');
  const [referralCode, setReferralCode] = useState('');
  // const [flat, setFlat] = useState('');
  const [gender, setGender] = useState('');
  // const [building, setBuilding] = useState('');
  // const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country_code, setCountry_code] = useState('');
  // const [country, setcountry] = useState('');
  // const [Date_of_birth, setDate_of_birth] = useState('');
  // const [Countrybirth, setCountrybirth] = useState('');
  // const [reasonMoney, setReasonMoney] = useState('');
  // const [customer_id, setCustomer_id] = useState('');







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
  // const input_firstName = useRef(null);
  // const input_middleName = useRef(null);
  // const input_lastName = useRef(null);
  // const input_email = useRef(null);
  // const input_mobile = useRef(null);
  // const input_flat = useRef(null);
  // const input_building = useRef(null);
  // const input_street = useRef(null);
  // const input_city = useRef(null);
  // const input_state = useRef(null);
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

  // useEffect(()=>{
  //   setLoading(true)
  //   UserProfile({}).then((res)=>{
  //     console.log("response----------==========", res)
  //   }).catch((error)=>{
  //     console.log(error.response)
  //     setLoading(false)
  //   })
  // },[])

  /* start-- useRef is used for focusing on inputbox */
  // useEffect(() => {
  //   setLoading(true); // Set loading before sending API request
  //   axios.post(API.BASE_URL + 'user-profile/', {}, {
  //     headers: {
  //       "Authorization": `Bearer ${signup_token ? signup_token : token}`,

  //     }
  //   })
  //     .then(function (response) {
  //       console.log("Recipients APIIIII", response.data);
  //       setFirstName(response.data.data.First_name);
  //       setMiddleName(response.data.data.Middle_name);
  //       setLastName(response.data.data.Last_name);
  //       setEmail(response.data.data.email);
  //       setMobile(response.data.data.mobile);
  //       // setcountryValue(response.data.data.location);
  //       setcountry(response.data.data.location);
  //       // alert(countryValue)
  //       setFlat(response.data.data.flat);
  //       setBuilding(response.data.data.building);
  //       setStreet(response.data.data.street);
  //       // setPostcode(response.data.address.postcode);
  //       setCity(response.data.data.city);
  //       setState(response.data.data.state);


  //       setReasonMoney(response.data.data.reasonMoney);
  //       setCustomer_id(response.data.data.customer_id);



  //       setLoading(false); // Stop loading
  //       //   if (response.status)
  //       // // notify();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log(error.response);
  //       setLoading(false); // Stop loading in case of error

  //     })
  // }, [])


  /**************************************************************************
   * ************** Start  Recipient Bank Details ****************************
   * ***********************************************************************/

  const [data, setData] = useState({ emailId: "", phoneno: "", country: "" })

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter").required("First name is required"),
    middleName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter"),
    lastName: Yup.string().min(1, "Minimum 1 Letter").max(100, "Maximum 100 letter").required("Last name is required"),
    email: Yup.string().email().min(6, "Minimum 6 Letter").max(50, "Maximum 50 letter"),
    mobile: Yup.string().min(7, "Minimum 7 Letter").max(18, "Maximum 18 letter").required("Mobile No. is required"),
    flat: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Flat No. is required"),
    building: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Building No. is required"),
    street: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("Street is required"),
    city: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("City is required"),
    state: Yup.string().min(1, "Minimum 1 Letter").max(200, "Maximum 200 letter").required("State is required"),
    country: Yup.string().oneOf(['Australia', 'New Zealand']).required("Country is required"),
    language: Yup.string().required("Language is required"),
    sendingTo: Yup.string().required("Sending To is required"),
    sendingFrom: Yup.string().required()
  })



  const initialValues = {
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
    language: "",
    sendingTo: "",
    sendingFrom: "United States"
  }
  useEffect(() => {
    setLoading(true)
    userProfile().then((res) => {
      console.log("response----------==========", res)
      if (res.code == "200") {
        setLoading(false)
        // console.log({
        //   ...data, emailId: res.data.email, phoneno: res.data.mobile, country: res.data.location
        // })
        setData({
          ...data, emailId: res.data.email, phoneno: res.data.mobile, country: res.data.location
        })
        formik.setFieldValue("mobile", res.data.mobile)
        formik.setFieldValue("country", res.data.location)
      }
    }).catch((error) => {
      console.log(error.response)
      if (error.response.data.code == "400") {
        toast.error(error.response.data.message, { position: "top-right", autoClose: 2000, theme: "colored" })
      }
      setLoading(false)
    })
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      console.log("++++++++++++++++++++++++++++++++++++")
      setLoading(true)
      updateProfile({
        First_name: values.firstName, Middle_name: values.middleName, Last_name: values.lastName,
        email: values.email, mobile: values.mobile, flat: values.flat, building: values.building, street: values.street,
        city: values.city, state: values.state, country: values.country
      }).then((res) => {
        console.log("user res----------------", res)
      }).catch((error) => {
        console.log(error.response)
        if (error.response.data.code == "400") {
          toast.error(error.response.data.message, { position: "top-right", autoClose: 2000, theme: "colored" })
        }
        setLoading(false)

      })
    }
  })

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
    // setLoading(true); // Set loading before sending API requestssss
    // axios.post(API.BASE_URL + 'update-profile/', {
    //   First_name: firstName,
    //   Middle_name: middleName,
    //   Last_name: lastName,
    //   email: email,
    //   mobile: mobile,
    //   flat: flat,
    //   building: building,
    //   street: street,
    //   city: city,
    //   state: state,
    //   location: country,
    // }, {
    //   headers: {
    //     "Authorization": `Bearer ${signup_token ? signup_token : token}`,
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     setLoading(false); // Stop loading 
    //     navigate('/dashboard');  
    //   })
    //   .catch(function (error, message) {
    //     console.log(error.response);
    //     setLoading(false); // Stop loading in case of error
    //     setBankNameText(error.response.data)
    //     console.log(BankNameText, "BankNameText")
    //   })
  }
  // }

  const language = [
    { value: "da", name: "Dansk" },
    { value: "de", name: "Deutsch" },
    { value: "en", name: "English" },
    { value: "es", name: "Español" },
    { value: "fr", name: "Français" },
    { value: "it", name: "Italiano" },
    { value: "nl", name: "Nederlands" },
    { value: "no", name: "Norsk" },
    { value: "pl", name: "Polski" },
    { value: "pt", name: "Português" },
    { value: "ro", name: "Română" },
    { value: "fi", name: "Suomi" },
    { value: "sv", name: "Svenska" },
    { value: "tl", name: "Tagalog" },
    { value: "vi", name: "Tiếng Việt" },
    { value: "tr", name: "Türkçe" },
    { value: "th", name: "ไทย" },
    { value: "ko", name: "한국어" },
    { value: "zh", name: "简体中文" }
  ]

  const sendTo = [
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


const handleCountry = (e) => {
  formik.setFieldValue('country', e.target.value)
  setData({...data , country:e.target.value})
  console.log(e.target.value,"--------------------------")
}




  return (
    <>
      {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (


          <div className="margin-set">
            <div className="tabs-page">
              <Sidebar />
              <div className="content-body">
                <section className="edit_recipient_section">
                  <div className="form-head mb-4">
                    <h2 className="text-black font-w600 mb-0"><b>Profile Update</b></h2></div>
                  <form onSubmit={formik.handleSubmit} noValidate className="single-recipient">
                    <div className="card">
                      <div className="card-body">
                        <div className="row each-row">
                          <h5>Personal Details</h5>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                // type="text"
                                // ref={input_firstName}
                                // className='rate_input form-control'
                                // Value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
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
                              {/* <span>{formik.errors.firstName ? formik.errors.firstName :""}</span> */}
                              {/* {errorUserRecipient && firstName.length <= 0 ?
                                <span style={myStyle}>Please Enter the First Name </span> : ""}

                              <span style={myStyle}>{BankNameText?.EnterfirstName ? BankNameText?.EnterfirstName : ''}</span> */}
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
                              // type="text"
                              // placeholder="Enter middle name"
                              // {...formik.getFieldProps('middleName')}
                              // className={clsx(
                              //   'form-control bg-transparent',
                              //   { 'is-invalid': formik.touched.middleName && formik.errors.middleName },
                              //   {
                              //     'is-valid': formik.touched.middleName && !formik.errors.middleName,
                              //   }
                              // )}
                              />


                              {/* {errorUserRecipient && middleName.length <= 0 ?
                                <span style={myStyle}>Please Enter the Middle Name </span> : ""}

                              <span style={myStyle}>{BankNameText?.Entermiddlename ? BankNameText?.Entermiddlename : ''}</span> */}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                // type="text"
                                // ref={input_lastName}
                                // className='rate_input form-control'
                                // Value={lastName}
                                // onChange={(e) => setLastName(e.target.value)}
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
                              {/* {errorUserRecipient && lastName.length <= 0 ?
                                <span style={myStyle}>Please Enter the Last Name </span> : ""}

                              <span style={myStyle}>{BankNameText?.Enterlastname ? BankNameText?.Enterlastname : ''}</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="row each-row">
                          <div className="col-md-6">
                            <div className="input_field">
                              <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                              <input
                                // type="email"
                                //  ref={input_email}
                                // className='rate_input form-control'
                                // name="email"
                                // Value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={data.emailId}
                                placeholder="Enter email"
                                autoComplete='off'
                                // onChange={formik.getFieldProps('email')}
                                // {...formik.getFieldProps('email')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.email && formik.errors.email },
                                  {
                                    'is-valid': formik.touched.email && !formik.errors.email,
                                  }
                                )}
                              />
                              {/* {errorUserRecipient && email.length <= 0 ?
                                <span style={myStyle}>Please Enter the Email Address </span> : ""}*/}

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
                                // ref={input_mobile}
                                // country={"eg"}
                                // enableSearch={true}
                                // value={mobile}
                                // onChange={(mobile) => setMobile(mobile)}
                                country={"au"}
                                name="mobile"
                                value={data.phoneno}
                                inputStyle={{ border: "none", margin: "none" }}
                                inputClass="phoneInp"
                                defaultCountry={"au"}
                                onlyCountries={["au", "nz"]}
                                onChange={mno => { formik.setFieldValue('mobile', mno); formik.setFieldTouched('mobile', true) }}
                                className={clsx(
                                  'form-control form-control-sm bg-transparent',
                                  { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                  {
                                    'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                  }
                                )}
                              />
                              {/* {errorUserRecipient && mobile.length <= 0 ?
                                <span style={myStyle}>Please Enter the Mobile Number </span> : ""} */}

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
                              <p className="get-text">Flat/Unit No.<span style={{ color: 'red' }} >*</span></p>

                              <Form.Control
                                // type="text"
                                // ref={input_flat}
                                // className='rate_input form-control'
                                // Value={flat}
                                // onChange={(e) => setFlat(e.target.value)}
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
                              {/* {errorUserRecipient && flat.length <= 0 ?
                                <span style={myStyle}>Please Enter the Flat Name</span> : ""}</span> */}
                              <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Building/Unit No.<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                // type="text"
                                // ref={input_building}
                                // className='rate_input form-control'
                                // Value={building}
                                // onChange={(e) => setBuilding(e.target.value)}
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
                              {/* {errorUserRecipient && building.length <= 0 ?
                                <span style={myStyle}>Please Enter the Building Name</span> : ""}</span> */}
                              <span style={myStyle}>{BankNameText?.Enterbuilding ? BankNameText?.Enterbuilding : ''}</span>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Street<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                // type="text"
                                // ref={input_street}
                                // className='rate_input form-control'
                                // Value={street}
                                // onChange={(e) => setStreet(e.target.value)}
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
                              {/* {errorUserRecipient && street.length <= 0 ?
                                <span style={myStyle}>Please Enter the Street Name</span> : ""}*/}
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
                              <p className="get-text">City/Town<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                // type="text"
                                // ref={input_city}
                                // className='rate_input form-control'
                                // Value={city}
                                // onChange={(e) => setCity(e.target.value)}
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
                              {/* {errorUserRecipient && city.length <= 0 ?
                                <span style={myStyle}>Please Enter the City Name</span> : ""}*/}
                              <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                // type="text"
                                // ref={input_state}
                                // className='rate_input form-control'
                                // Value={state}
                                // onChange={(e) => setState(e.target.value)}
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
                              {/* {errorUserRecipient && state.length <= 0 ?
                                <span style={myStyle}>Please Enter the State Name</span> : ""} */}
                            </Form.Group>
                            {/* <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span> */}
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                              {/* <Select
                                //  ref={input_country}
                                  options={countryoptions}
                                  defaultValue={countryValue}
                                  onChange={changeHandler}
                                /> */}

                              <Form.Select
                                name="country"
                                value={data.country}
                                onChange={(e)=>{handleCountry(e)}}
                                // {...formik.getFieldProps('country')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.country && formik.errors.country },
                                  {
                                    'is-valid': formik.touched.country && !formik.errors.country,
                                  }
                                )}
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
                          <h5>Others</h5>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Language<span style={{ color: 'red' }} >*</span></p>
                              {/* <Select
                                //  ref={input_country}
                                  options={countryoptions}
                                  defaultValue={countryValue}
                                  onChange={changeHandler}
                                /> */}

                              <Form.Select
                                name="language"
                                {...formik.getFieldProps('language')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.language && formik.errors.language },
                                  {
                                    'is-valid': formik.touched.language && !formik.errors.language,
                                  }
                                )}
                              >
                                <option value="">--- Select Language ---</option>
                                {
                                  language.map((lang) => {
                                    return (
                                      <option value={lang.value}>{lang.name}</option>
                                    )
                                  })
                                }

                              </Form.Select>
                              {/* {errorUserRecipient&&country.length<=0?
                                  <span style={myStyle}>Please Enter the Country Name</span>:""}  */}
                              <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>

                            </Form.Group>

                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Sending To<span style={{ color: 'red' }} >*</span></p>
                              {/* <Select
                                //  ref={input_country}
                                  options={countryoptions}
                                  defaultValue={countryValue}
                                  onChange={changeHandler}
                                /> */}

                              <Form.Select
                                name="sendingTo"
                                {...formik.getFieldProps('sendingTo')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.sendingTo && formik.errors.sendingTo },
                                  {
                                    'is-valid': formik.touched.sendingTo && !formik.errors.sendingTo,
                                  }
                                )}
                              >
                                <option value="">--- sending To ---</option>
                                {
                                  sendTo.map((send) => {
                                    return (
                                      <option value={send.code}>{send.name}</option>
                                    )
                                  })
                                }


                              </Form.Select>
                              {/* {errorUserRecipient&&country.length<=0?
                                  <span style={myStyle}>Please Enter the Country Name</span>:""}  */}
                              <span style={myStyle}>{BankNameText?.Enterflat ? BankNameText?.Enterflat : ''}</span>

                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Sending from</p>
                              <Form.Control
                                // type="text"
                                // ref={input_street}
                                // className='rate_input form-control'
                                // Value={street}
                                // onChange={(e) => setStreet(e.target.value)}
                                type="text"
                                autoComplete='off'
                                value={initialValues.sendingFrom}
                              // {...formik.getFieldProps('sendingFrom')}
                              // className={clsx(
                              //   'form-control bg-transparent',
                              //   { 'is-invalid': formik.touched.sendingFrom && formik.errors.sendingFrom },
                              //   {
                              //     'is-valid': formik.touched.sendingFrom && !formik.errors.sendingFrom,
                              //   }
                              // )}
                              />
                              {/* {errorUserRecipient && street.length <= 0 ?
                                <span style={myStyle}>Please Enter the Street Name</span> : ""}*/}
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
                              type="submit"
                              className="form-button"
                            >
                              Update

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
          <>
            <Page404 />
          </>

        )
      }
    </>
  )
}



export default Profile;