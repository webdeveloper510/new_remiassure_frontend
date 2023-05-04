import React, { useEffect, useState, useRef, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, Link, useNavigate } from "react-router-dom";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { useLocation } from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';
import Page404 from "../pageNotfound/Page404";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import { API } from "../../config/API";
import axios from 'axios';
import { toast } from 'react-toastify';
import validate from "../../pages/FormValidationRules";
import { userRegister } from "../../utils/Api";

{/* start -- css*/ }
const myStyle = {
    color: "red",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop: "4px",
    display: "block",
    // textAlign: "left"
}
{/* End -- css*/ }


const Signup = () => {
    /**************************token ************************ */

    // const [error, setError] = useState()

    const token = localStorage.getItem("token");
    // console.log("TOKEN", token);

    const signup_token = localStorage.getItem("signup_token")
    // console.log("signup_token", signup_token);

    const verification_otp = localStorage.getItem("verification_otp");
    // console.log("Verification Message", verification_otp);

    const DigitalCode = localStorage.getItem("DigitalCode");
    // console.log("DigitalCode", DigitalCode);

    /**************************State ************************ */
    const [data, setData] = useState({location:'', email:'', mobile:'', password:'',confirmPassword:""})
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    /****************Show hide password state********************** */
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [referral_code, setrReferral_code] = useState('');

    /****************Error state********************** */
    const [error , setError] = useState({emailErr:"", passwordErr:"", confirmPasswordErr:"", locationErr:"", mobileErr:"" , referralErr:""})
    // const [emailErr, setEmailErr] = useState('');
    // const [passwordErr, setPasswordErr] = useState('');
    // const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    // const [locationErr, setLocationErr] = useState('');
    // const [mobileErr, setMobileErr] = useState('');
    // const [referralErr, setrReferralErr] = useState('');
    
    
    const [referral_value, setrReferral_value] = useState('');
    const [promo_marketing, setPromo_marketing] = useState(false);
    const [active, setActive] = useState(false);

    const [sucessText, setSucessText] = useState('');

    const [locationText, setLocationText] = useState('');
    const [emailText, setEmailleText] = useState('');
    const [emailExistText, setEmailExistText] = useState('');
    const [emailvalidAddress, setEmailvalidAddress] = useState('');
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
    
    const emailExits = () => toast.error("Please fill out all the fields");
    const Mobileexist =() => toast.error("Mobile number already exist.")


    // console.log("Show", show)

    useEffect(() => {
        // console.log('show=============>', show)
        if (show == false) {
            setrReferral_code("")

        }

    })
    // console.log("REF", data.referral_code)



    /* start-- useRef is used for focusing on inputbox */
    const input_location = useRef(null);
    const input_email = useRef(null);
    const input_mobile = useRef(null);
    const input_password = useRef(null);
    const input_confirm_pass = useRef(null);
    const input_referral_code = useRef(null);


    const navigate = useNavigate();
    // const notify = () => toast.success("Sign Up Successfully!");
    // const emptyData = () => toast.warn("Please fill out all the fields");
    // const emailExits = () => toast.error("User with this Email already exists!");

    /****************Show hide password functionality********************** */
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);

    /****************Show hide password functionality********************** */
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prevState => !prevState)



    /****************input feild functionality********************** */
   
    
    const handleLocation = (e) => {
        setData({...data, location:e.target.value})
        let value = e.target.value
        console.log("location-----------------------",{ location:e.target.value})
        var validateErr = validate({
            location:value,            
        })
       
        if(value == ""){
            setError({...error, locationErr:validateErr})
        }else{
            setError({...error , locationErr:""})
        } 
    }   

    const handleEmail = (e) => {
        let value = e.target.value
        setData({...data, email:e.target.value})
        let validateErr = validate({
         email:value
        })
         if(value == ""){
             setError({...error,emailErr:validateErr})
         }else{
             setError({...error,emailErr:""})
         } 
     }

     const handleMobile = (mobile) => {
        setData({...data,mobile})
        let value = mobile
        let validateErr = validate({
         mobile:value
        })
         if(value == ""){
            console.log("mobile". validateErr)
             setError(validateErr)
         }else{
             setError({...error, mobileErr:""})
         } 
     }

     const handlePassword = (e) => {
        setData({...data, password:e.target.value})
        let value = e.target.value
        let validateErr = validate({
         password:value
        })
         if(value == ""){
             setError({...error, passwordErr:validateErr})
         }else{
             setError({...error,passwordErr:""})
         } 
     }

     const handleConfirmPass = (e) => {
        setData({...data, confirmPassword:e.target.value})
        let value = e.target.value
        let validateErr = validate({
         confirm_pass:value
        })
         if(value == ""){
             setError({...error,confirmPasswordErr:validateErr})
         }else{
             setError({...error, confirmPasswordErr:""})
         } 
     }

     

    // const handleReferral_code = (e) => {
    //     set
    //     console.log(e.target.value )
        // setrReferral_code(e.target.value);
        // console.log(e.target.value)
        // let value = e.target.value;
        // let validateErr = validate({
        //     referral_code:
        // })
        // console.log(validateErr)
        // if(value == ""){
        //     setError({...error, referralErr:validateErr})
        // }else{
        //     setError({...error,referralErr:""})
        // }

    // }

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

    const handleSignup = (event) => {
        
        event.preventDefault()
        console.log("data", data,referral_code)

        let validateErr = validate({
            location:data.location,
            email:data.email,
            mobile:data.mobile,
            password:data.password,
            confirm_pass:data.confirmPassword,
            referral_code:referral_code
        })
        // console.log(validateErr)
        setError({emailErr:validateErr, passwordErr:validateErr , confirmPasswordErr:validateErr , locationErr:validateErr, mobileErr:validateErr , referralErr:validateErr})
        if(Object.keys(validateErr).length === 0){
            setLoading(true)
            userRegister(data,referral_code).then((res)=>{
                console.log("user-signup",referral_code, res)
                if(res.code === "200"){
                    console.log('check+++++++++++++++++=',res)
                    toast.success('Sighup Succesfully', { position: "top-right", autoClose: 2000, theme: "colored" });
                    localStorage.setItem("signup_token", res.tokens.access);
                }       
                navigate('/verification')
                setLoading(false)        
            }).catch((error)=>{
                console.log(error.response)
                if(error.response.data.code == "400"){
                    toast.error(error.response.data.message, { position: "top-right", autoClose: 2000, theme: "colored" });
                    
                }
                setLoading(false)
            })
        }

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
        // if (data.password !== data.confirmPassword) {
        //     // alert("Passwords don't match");
        //     setActive(true)
        // } else {
        //     setActive(false)
        //     setLoading(true); // Set loading before sending API request
        //     let data = {
        //         email: email,
        //         mobile: mobile,
        //         password: password,
        //         confirmPassword: confirmPassword,
        //         // location: location,
        //         location: location,
        //         referral_code: referral_code,
        //         promo_marketing: promo_marketing.Active,
        //     }
        //     if (!show)
        //         delete data['referral_code']
        //     axios.post(API.BASE_URL + 'register/', data, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },

        //     })
        //         .then(function (response) {
        //             console.log(response);
        //             localStorage.setItem("signup_token", response.data.tokens.access);
        //             //validation
        //             setSucessText(response.data.data.message && response.data.data.msg)
        //             setMobileText(response.data.Mobile);
        //             console.log(mobileText, "mobileTextmobileTextmobileText");


        //             setLoading(false); // Stop loading
        //             // notify();
        //             navigate('/verification');
        //             // console.log(navigate, "jkfjkdkvnfkvnfkvnfkvnvknvknvkvnkvnvknknvknvknk")
        //         })
        //         .catch(function (error, message) {
        //             setLoading(false); // Stop loading
        //             if (error.toJSON().message === 'Network Error') {
        //                 console.log('Please check your internet connection!!')
        //             }

        //             else {
        //                 if (error.response.data.status) {

        //                 }
        //                 setSucessText(error.response.data.message || error.response.data.msg)
        //                 setLocationText(error.response.data.Location);
        //                 setEmailleText(error.response.data.Enteremail);
        //                 setEmailExistText(error.response.data.Emailexist);
        //                 setPasswordText(error.response.data.Password);
        //                 setReferralText(error.response.data.Enterreferralcode);
        //                 setReferralInvalidText(error.response.data.Invalidreferralcode);
        //                 setMobileText(error.response.data.Entermobile);
        //                 setMobileValidText(error.response.data.Checkmobile);
        //                 setEmailvalidAddress(error.response.data.email)
        //                 setMobileExistsValidText(error.response.data.Mobileexist)
        //                 setMobileSpecialCharacter(error.response.data.password)
        //             }

        //         })
        // }
    }


    /**************************************************************************
     * ************** Start-- get value Url **********************************
     * ***********************************************************************/

    useEffect(() => {
        const search1 = search.search;
        const term = new URLSearchParams(search1).get('ref');
        console.log(term, "termterm")
        if (term) {
            setrReferral_code(term)
            setShow(true)
            console.log(referral_code, "referral_codereferral_codereferral_code");


        }

        console.log(show)

    }, [referral_code,show]);

    //End get value Urls


    //Multiple Api call function 
    // function handleSignupData() {
    //     // handleSignup();
    //     // handleDataStore()

    // }


    return (
        <>
            {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
            {/* {
                token || DigitalCode != undefined || '' ? (
                    <>
                        <Page404 />
                    </>
                ) : (
                    <> */}
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
                                                               
                                                                <Form.Label>Where are you sending money from?<span style={{ color: 'red' }} >*</span></Form.Label>

                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label>Location<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                    <Form.Select
                                                                        name="location"
                                                                        onChange={(e)=>handleLocation(e)}
                                                                    >
                                                                        <option value="">--- Select Location ---</option>
                                                                        <option value="Australia">Australia</option>
                                                                        <option value="New Zealand">New Zealand</option>
                                                                    
                                                                    </Form.Select>
                                                                    <span style={myStyle}>{error.locationErr?.location ? error.locationErr.location :""}</span>
                                                                    <span style={myStyle}>{locationText ? locationText : ""}</span>
                                                                </Form.Group>


                                                                {/* <PhoneInput
                                                                country={getCountryCode(data.location) || "au"}
                                                                value={data.location}
                                                                defaultCountry={"au"}
                                                                onlyCountries={["au", "nz"]}
                                                                onChange={(location) => setData(location)}
                                                            /> 
                                                            <span style={myStyle}>{error?.location ? error.location :"" }</span> */}
                                                           


                                                                <Form.Group className="mb-3 form_label" >
                                                                    <Form.Label>Your Email<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        ref={input_email}
                                                                        value={data.email}
                                                                        onChange={(e)=> handleEmail(e)}
                                                                        placeholder="Enter email"
                                                                    />
                                                                    {/* {error&&email.length<=0?
                                                                   <span style={myStyle}>Please Enter the Email </span>:""}	 */}
                                                                    <span style={myStyle}>{error.emailErr?.email ? error.emailErr.email :"" }</span>
                                                                    <span style={myStyle}>{emailText ? emailText : ""}</span>
                                                                    <span style={myStyle}>{emailExistText ? emailExistText : ""}</span>
                                                                    <span style={myStyle}>{emailvalidAddress ? emailvalidAddress : ""}</span>

                                                                </Form.Group>


                                                                <Form.Group className="mb-3 form_label" >
                                                                    <Form.Label>Your Phone<span style={{ color: 'red' }} >*</span> </Form.Label>

                                                                    <PhoneInput
                                                                        country={getCountryCode(data.location) || "au"}
                                                                        ref={input_mobile}
                                                                        name="mobile"
                                                                        value={data.mobile}
                                                                        defaultCountry={"au"}
                                                                        onlyCountries={["au", "nz"]}
                                                                        onChange={(mobile) => handleMobile(mobile)}
                                                                    />
                                                                    <span style={myStyle}>{error.mobileErr?.mobile ? error.mobileErr.mobile :"" }</span>
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
                                                                    <span style={myStyle}>{mobileText ? mobileText : ""}</span>
                                                                    <span style={myStyle}>{mobileValidText ? mobileValidText : ""}</span>
                                                                    <span style={myStyle}>{mobileExistsValidText ? mobileExistsValidText : ""}</span>

                                                                </Form.Group>

                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label> Your Password<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                    <Form.Control
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        id="password"
                                                                        name="password"                                            
                                                                        ref={input_password}
                                                                        value={data.password}
                                                                        onChange={(e)=> handlePassword(e)}
                                                                        placeholder="Password"
                                                                    />
                                                                    <span onClick={toggleShowPassword} className="pass_icons">
                                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                                    </span>
                                                                    <span style={myStyle}>{error.passwordErr?.password ? error.passwordErr.password :"" }</span>
                                                                    {/* {error&&password.length<=0?
                                                    <span style={myStyle}>Please Enter the Password </span>:""}	 */}
                                                                    <span style={myStyle}>{passwordText ? passwordText : ""}</span>
                                                                    <span style={myStyle}>{mobileSpecialCharacter ? mobileSpecialCharacter : ""}</span>

                                                                </Form.Group>

                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label> Confirm Password<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                    <Form.Control
                                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                                        name="confirmPassword"
                                                                        value={data.confirmPassword}
                                                                        ref={input_confirm_pass}
                                                                        placeholder="Confirm Password"
                                                                        onChange={(e)=> handleConfirmPass(e)}
                                                                        className='rate_input form-control'
                                                                    />
                                                                   
                                                                    <span onClick={toggleShowConfirmPassword} className="pass_icons">
                                                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                                    </span>
                                                                    <span style={myStyle}>{error.confirmPasswordErr?.confirm_pass ? error.confirmPasswordErr.confirm_pass :"" }</span>

                                                                    <span className={active == true ? 'not_match' : 'hide'}>Passwords do not match</span>
                                                                </Form.Group>



                                                                <Form.Check className="form_switch"
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
                                                                    <Form.Group className="mb-3 form_label">
                                                                        <Form.Label>Your Referral Code</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            ref={input_referral_code}
                                                                            value={referral_code}
                                                                            onChange={(e)=>setrReferral_code(e.target.value)}
                                                                            placeholder="Enter Referral Code"
                                                                        />
                                                                        <span style={myStyle}>{error.referralErr?.referral_code ? error.referralErr.referral_code :"" }</span>
                                                                        {/* {error&&referral_code.length<=0?
                                                    <span style={myStyle}>Please Enter the Referralcode </span>:""}	 */}
                                                                        <span style={myStyle}>{referralText ? referralText : ""}</span>
                                                                        <span style={myStyle}>{referralInvalidText ? referralInvalidText : ""}</span>
                                                                    </Form.Group>
                                                                </div>}

                                                                <Form.Group className="mb-3 form_checkbox">

                                                                    <Form.Check className="form_label"
                                                                        type="checkbox"
                                                                        value={promo_marketing}
                                                                        onChange={(e)=>handlePromo_marketing(e)}
                                                                        checked={promo_marketing.Active} // <-- set the checked prop of input\

                                                                        label="If you DO NOT wish to receive marketing information 
                                                                    about out products and special offers, please check this box"
                                                                    />
                                                                </Form.Group>

                                                                <button variant="primary"
                                                                    type="button"
                                                                    onClick={(e)=>handleSignup(e)}
                                                                    className="signup_button ">
                                                                    Signup
                                                                    {loading ? <>
                                                                        <div className="loader-overly">
                                                                            <div className="loader" >

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
                    {/* </>
                )
            } */}

            {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}


        </>

    )
}



export default Signup;