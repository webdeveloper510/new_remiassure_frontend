import React, { useEffect, useState , useRef,useMemo} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, Link, useNavigate } from "react-router-dom";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import {useLocation} from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';
import Page404 from "../pageNotfound/Page404";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';




import {API} from "../../config/API";
import axios from 'axios';
import { toast } from 'react-toastify';

{/* start -- css*/}
const myStyle= {
    color: "red",
  fontSize:"13px",
  textTransform: "capitalize",
  marginTop:"4px",
  display:"block"
 }
 {/* End -- css*/}


const Signup = () => {
     /**************************token ************************ */

    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
  
    const signup_token = localStorage.getItem("signup_token")
      console.log("signup_token", signup_token);
  
    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp);
  
    const DigitalCode = localStorage.getItem("DigitalCode");
    console.log("DigitalCode", DigitalCode);
  
  /**************************State ************************ */

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(false);
     /****************Show hide password state********************** */
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [referral_code, setrReferral_code] = useState('');
    const [referral_value, setrReferral_value] = useState('');
    const [promo_marketing, setPromo_marketing] = useState(false);
    const [mobile, setMobile] = useState('');
    const [active, setActive] = useState(false);

    const [sucessText, setSucessText] = useState('');

    const [locationText, setLocationText] = useState('');
    const [emailText, setEmailleText] = useState('');
    const [emailExistText, setEmailExistText] = useState('');
    const [emailvalidAddress,setEmailvalidAddress ] = useState('');
    const [mobileText, setMobileText] = useState('');
    const [mobileSpecialCharacter, setMobileSpecialCharacter] = useState();
    const [mobileValidText, setMobileValidText] = useState('');
    const [mobileExistsValidText, setMobileExistsValidText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [referralText, setReferralText] = useState('');
    const [referralInvalidText, setReferralInvalidText] = useState('');
   
 
    



    const search = useLocation()
    const [checkBoxValue, setCheckBoxvalue] = useState(false);
    
    const [countryValue, setcountryValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = countryValue => {
        setcountryValue(countryValue)
    }


    console.log("Show",show)

    useEffect(() => {
        console.log('show=============>',show)
        if(show == false) {
            setrReferral_code("")
            
        }
        
    })
    console.log("REF", referral_code)



   /* start-- useRef is used for focusing on inputbox */
   const input_location = useRef(null);
   const input_email = useRef(null);
   const input_mobile = useRef(null);
   const input_password = useRef(null);
   const input_refferal_code = useRef(null);
   

    const navigate = useNavigate();
    // const notify = () => toast.success("Sign Up Successfully!");
    // const emptyData = () => toast.warn("Please fill out all the fields");
    // const emailExits = () => toast.error("User with this Email already exists!");

  /****************Show hide password functionality********************** */
      const toggleShowPassword = () => setShowPassword(prevState => !prevState);

/****************Show hide password functionality********************** */
      const toggleShowConfirmPassword = () => setShowConfirmPassword (prevState => !prevState)



  /****************input feild functionality********************** */
    const handleEmail =(e) => {
        setEmail(e.target.value);
    }
    const handleMobile =(e) =>{
        setMobile(e.target.value);
    }
    const handlePassword =(e) => {
        setPassword(e.target.value);

    }
    const handleConfirmPassword =(e) => {
        setConfirmPassword(e.target.value);

    }
    const handeleLocation =(e) => {
        setLocation(e.target.value);
    } 

    const handleReferral_code = (e) =>{
        setrReferral_code(e.target.value);
       
    }

    const handlePromo_marketing = (e) => {
        const { checked } = e.target;
    
        console.log("checked " + checked);
    
        setPromo_marketing((promo_marketing) => ({
          ...promo_marketing, // <-- shallow copy previous state
          Active: checked // <-- set new Active checked value
        }));
      };

      const getCountryCode = (country) => {
        // Map country names to country codes
        switch (country) {
          case "New Zealand":
            return "nz";
          case "Australia":
            return "au";
          // Add more countries here
          default:
            return "";
        }
      };

/**************************************************************************
 * ************** Start -Signup Api call **********************************
 * ***********************************************************************/
  
    const handleSignupApi = (event) => {
        event.preventDefault();
        //useRef is used for focusing on inputbox
    //    if (mobile.length==0){
    //         input_mobile.current.focus();
    //         setError(true);
    //     } else if (password.length==0){
    //         input_password.current.focus();
    //         setError(true);
    //     } else if (countryValue.length==0){
    //         countryValue.current.focus();
    //         setError(true);
    //     } 
        // else if (referral_code.length==0){
        //     referral_code.current.focus();
        //     setError(true);
        // } 

        // else{
         if (password !== confirmPassword) {
                // alert("Passwords don't match");
             setActive(true)
           } else {
           setActive(false)
        setLoading(true); // Set loading before sending API request
        let data = {
            email: email,
            mobile: mobile,
            password: password,
            confirmPassword: confirmPassword,
            // location: location,
            location: location,
            referral_code: referral_code,
            promo_marketing: promo_marketing.Active,
        }
        if (!show)
         delete data['referral_code'] 
        axios.post(API.BASE_URL + 'register/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
          
        })
        .then(function(response) {
            console.log(response);
            localStorage.setItem("signup_token", response.data.tokens.access);
            localStorage.setItem("signup_email", email)
            //validation
            setSucessText(response.data.data.message && response.data.data.msg)
            setMobileText(response.data.Mobile);
            console.log(mobileText, "mobileTextmobileTextmobileText");
         
          
            setLoading(false); // Stop loading
                // notify();
                navigate('/verification');   
                // console.log(navigate, "jkfjkdkvnfkvnfkvnfkvnvknvknvkvnkvnvknknvknvknk")
        })
        .catch(function(error, message) {
            setLoading(false); // Stop loading
            if(error.toJSON().message === 'Network Error'){
                console.log('Please check your internet connection!!')
            }
            
            else{
                    if(error.response.data.status){
                    
                    } 
                    setSucessText(error.response.data.message || error.response.data.msg)
                    setLocationText(error.response.data.Location);
                    setEmailleText(error.response.data.Enteremail);
                    setEmailExistText(error.response.data.Emailexist);
                    setPasswordText(error.response.data.Password);
                    setReferralText(error.response.data.Enterreferralcode);
                    setReferralInvalidText(error.response.data.Invalidreferralcode);
                    setMobileText(error.response.data.Entermobile);
                    setMobileValidText(error.response.data.Checkmobile);
                    setEmailvalidAddress(error.response.data.email)
                    setMobileExistsValidText(error.response.data.Mobileexist)
                    setMobileSpecialCharacter(error.response.data.password)
            }
           
        })
    }
 }
    

/**************************************************************************
 * ************** Start-- get value Url **********************************
 * ***********************************************************************/

    useEffect(() => {
         const search1 = search.search;
        const term = new URLSearchParams(search1).get('ref');
        console.log(term, "termterm")
        if(term){
            setrReferral_code(term)
            setShow(true)
            console.log(referral_code, "referral_codereferral_codereferral_code");
        

        }

        console.log(show)
       
      },[]);

//End get value Urls


//Multiple Api call function 
  function handleSignupData() {
    // handleSignupApi();
    // handleDataStore()

  }

 

  


    return(
        <>
         {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
         {  
          token || DigitalCode != undefined || '' ? (
            <>
            <Page404 />
            </>
            ) : (
                <>
            <section className="why-us section-bgba signup_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="support_image">
                                <img src="assets/img/help/help_img02.svg" alt="support_images" />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            {/* start-- card */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-signup">
                                        <div className="card-body">
                                        

                                            <h5 className="Sign-heading">Sign Up</h5>
                                            <div className="form_signup">

                                                <form>
                                                {/* <Form.Label>Where are you sending money from?<span style={{color: 'red'}} >*</span></Form.Label>
                                                <Select
                                                ref={input_location}
                                                options={options} 
                                                value={countryValue} 
                                                onChange={changeHandler}
                                                /> */}
                                                {/* {error&&countryValue.length<=0?
                                                    <span style={myStyle}>Please select the Location </span>:""} */}
                                                        {/* <span  style={myStyle}>{locationText? locationText: ""}</span>  */}
                                                
                
                                                    <Form.Label>Where are you sending money from?<span style={{color: 'red'}} >*</span></Form.Label>
                                                    {/* <CountryDropdown
                                                
                                                    className='YOUR_CSS_CLASS rate_input form-control'
                                                    preferredCountries={['gb', 'us' ]} 
                                                    ref={input_location}
                                                    value={location}
                                                    handleChange={handeleLocation}
                                                    //   handleChange={e=> console.log(e.target.value)}
                                                    >
                                                        {error&&location.length<=0?
                                                    <span style={myStyle}>Please check the Location </span>:""}
                                                    </CountryDropdown> */}
                                                    <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                    <Form.Label>Location<span style={{color: 'red'}} >*</span> </Form.Label>
                                                    <Form.Select 
                                                    value={location}
                                                    onChange={handeleLocation}
                                                    >   
                                                        <option value="">--- Select Location ---</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="New Zealand">New Zealand</option>
                                                
                                                    </Form.Select>
                                                    <span  style={myStyle}>{locationText? locationText: ""}</span> 
                                                    </Form.Group>


                                                    {/* <PhoneInput
                                                                country={getCountryCode(location) || "au"}
                                                                value={location}
                                                                defaultCountry={"au"}
                                                                onlyCountries={["au", "nz"]}
                                                                onChange={(location) => setMobile(location)}
                                                            /> */}

 
                                                    <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                        <Form.Label>Your Email<span style={{color: 'red'}} >*</span> </Form.Label>
                                                        <Form.Control 
                                                        type="email"
                                                        ref={input_email}
                                                        value={email}
                                                        onChange={handleEmail}
                                                        placeholder="Enter email"
                                                        />
                                                        {/* {error&&email.length<=0?
                                                    <span style={myStyle}>Please Enter the Email </span>:""}	 */}
                                                    <span  style={myStyle}>{emailText? emailText: ""}</span> 
                                                    <span  style={myStyle}>{emailExistText? emailExistText: ""}</span> 
                                                    <span  style={myStyle}>{emailvalidAddress? emailvalidAddress: ""}</span> 
                            
                                                    </Form.Group>
                                                    

                                                    <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                        <Form.Label>Your Phone<span style={{color: 'red'}} >*</span> </Form.Label>

                                                        <PhoneInput
                                                                country={getCountryCode(location) || "au"}
                                                                value={mobile}
                                                                defaultCountry={"au"}
                                                                onlyCountries={["au", "nz"]}
                                                                onChange={(mobile) => setMobile(mobile)}
                                                            />
                                                        {/* <PhoneInput 
                                                        type="mobile"
                                                        ref={input_mobile}
                                                        country={"au"}
                                                        onlyCountries={["au", "nz"]}
                                                        enableSearch={true}
                                                       // country={"eg"}
                                                        enableSearch={false}
                                                        value={mobile}
                                                        onChange={(mobile) => setMobile(mobile)}
                                                        placeholder="Enter Phone"
                                                        />  */}
                                                        {/* {error&&mobile.length<=0?
                                                    <span style={myStyle}>Please Enter the Mobile </span>:""}	 */}
                                                        <span  style={myStyle}>{mobileText? mobileText: ""}</span>  
                                                        <span  style={myStyle}>{mobileValidText? mobileValidText: ""}</span>  
                                                        <span  style={myStyle}>{mobileExistsValidText? mobileExistsValidText: ""}</span>  
                                                     
                                                    </Form.Group>

                                                    <Form.Group className="mb-3 form_label" controlId="formBasicPassword">
                                                        <Form.Label> Your Password<span style={{color: 'red'}} >*</span> </Form.Label>
                                                        <Form.Control 
                                                        type={showPassword ? 'text' : 'password'}
                                                        id="password"
                                                        name="password"
                                                        ref={input_password}
                                                        value={password}
                                                        onChange={handlePassword}
                                                        placeholder="Password" 
                                                        />
                                                         <span onClick={toggleShowPassword} className="pass_icons">
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                         </span>
                                                        {/* {error&&password.length<=0?
                                                    <span style={myStyle}>Please Enter the Password </span>:""}	 */}
                                                    <span  style={myStyle}>{passwordText? passwordText: ""}</span>  
                                                    <span  style={myStyle}>{mobileSpecialCharacter? mobileSpecialCharacter: ""}</span>  
                                                    
                                                    </Form.Group>

                                                    <Form.Group className="mb-3 form_label" controlId="formBasicPassword">
                                                    <Form.Label> Confirm Password<span style={{color: 'red'}} >*</span> </Form.Label>
                                                    <Form.Control
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={confirmPassword}
                                                        placeholder="Confirm Password" 
                                                        onChange={handleConfirmPassword}
                                                        className='rate_input form-control'
                                                    />
                                                     <span onClick={toggleShowConfirmPassword} className="pass_icons">
                                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </span>

                                                    <span className={active == true ? 'not_match' : 'hide'}>Passwords do not match</span>
                                                    </Form.Group>



                                                    <Form.Check  className="form_switch"
                                                    type="switch" 
                                                    onClick={() => setShow(!show)}
                                                    // value={referral_code}
                                                    checked={show ? true : false}
                                                    // onChange={(e)=> {myReferalCode(e.target.value);setrReferral_code(e.target.value)}}
                                                    //   onChange={(e)=> {setrReferral_code(e.target.value)}}
                                                    id="custom-switch" 
                                                    label="Referred by a friend? Use the referral code below." 
                                                
                                                    />
                                                {show && <div>
                                                    <Form.Group  className="mb-3 form_label" controlId="formBasicEmail">
                                                        <Form.Label>Your Referral Code</Form.Label>
                                                        <Form.Control 
                                                        type="text"
                                                        ref={input_refferal_code}
                                                        value={referral_code}
                                                        onChange={handleReferral_code}
                                                        placeholder="Enter Referral Code" 
                                                        />
                                                        {/* {error&&referral_code.length<=0?
                                                    <span style={myStyle}>Please Enter the Referralcode </span>:""}	 */}
                                                        <span  style={myStyle}>{referralText? referralText: ""}</span> 
                                                        <span  style={myStyle}>{referralInvalidText? referralInvalidText: ""}</span> 
                                                    </Form.Group>
                                                    </div>}

                                                    <Form.Group className="mb-3 form_checkbox" controlId="formBasicCheckbox">
                                                    
                                                        <Form.Check className="form_label"
                                                            type="checkbox"
                                                            value={promo_marketing}
                                                            onChange={handlePromo_marketing}
                                                            checked={promo_marketing.Active} // <-- set the checked prop of input\

                                                            label="If you DO NOT wish to receive marketing information 
                                                                    about out products and special offers, please check this box"
                                                        />
                                                    </Form.Group>

                                                    <button variant="primary"
                                                    type="submit" 
                                                    onClick={handleSignupApi}
                                                    className="signup_button ">
                                                        Signup
                                                    {loading ? <>
                                                            <div class="loader-overly"> 
                                                            <div class="loader" > 
                                                            
                                                            </div>
                                                            
                                                            </div>
                                                        </> : <></>}
                                                    </button>
                                                    <p className="already_content">Already have an account? 
                                                    <NavLink to="/login">Sign in</NavLink>
                                                    </p>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End-- card */}
                        </div>
                    </div>
                </div>
            </section>
            </>
            )
         }

        {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}


        </>

    )
}



export default Signup;