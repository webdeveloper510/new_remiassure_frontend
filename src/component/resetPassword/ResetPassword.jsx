import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate, useParams} from 'react-router-dom';

import { toast } from "react-toastify";
import {API} from "../../config/API";
import axios from 'axios';
import UserContext from '../context/UserContext';
import Page404 from "../pageNotfound/Page404";
import { resetPassword } from "../../utils/Api";
import validate from "../../pages/FormValidationRules";

const myStyle = {
    color: "red",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop:"4px",
    display:"block",
    textAlign:"center"
}

const RecentPassword = () => {

 /**************************token ************************ */
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const signup_token = localStorage.getItem("signup_token")
    console.log("signup_token", signup_token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp);

  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  const customerId_forgot = localStorage.getItem("customerId_forgot");
  console.log("customerId_forgot", customerId_forgot);
    
/**************************transaction of state ************************ */
    const [data , setData] =useState({reset_password_otp:"", password:"", confirmPassword:""})
    // const [password, setPassword] = useState('');
    // const [reset_password_otp, setReset_password_otp] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [error , setError] = useState({
        otpErr:"" , passwordErr :"" , confirmPasswordErr:""
    })
    /*********************Start Validation state Text************** */
    const [EnterotpText, setEnterotpText] = useState('');
    const [InvalidotpText, setInvalidotpText] = useState('');
    const [EnterpasswordText, setEnterpasswordText] = useState('');
    
    // const {id} = useParams();

    const handleResetpasswordotp =(e) =>{
        setData({...data, reset_password_otp:e.target.value})
        let value = e.target.value
        let validateErr = validate({
            reset_password_otp:value
        })
        if(value == ""){
            setError({...data,otpErr:validateErr})
        }else{
            setError({...data,otpErr:""})
        }
    }
    const handlePassword = (e) =>{
        setData({...data, password:e.target.value})
        
        let value = e.target.value
        let validateErr = validate({
            password:value
        })
        if(value == ""){
            setError({...data,passwordErr:validateErr})
        }else{
            setError({...data,passwordErr:""})
        }
    }
    const handleConfirmPassword = (e) =>{
        setData({...data, confirmPassword:e.target.value})
        let value = e.target.value
        let validateErr = validate({
            confirmPasswordErr:value
        })
        if(value == ""){
            setError({...data,confirmPasswordErr:validateErr})
        }else{
            setError({...data,confirmPasswordErr:""})
        }
    }


    const token_forgot = localStorage.getItem("token_forgot");
    console.log("Token_Forgot_password", token_forgot);


    // const token_forgot_url = localStorage.getItem("token_forgot_url");
    // console.log("token_forgot_url", token_forgot_url);


    const notify = () =>toast.success("Check your email to Reset Password");
    const wrongData = () =>toast.warm("This E-mail is not our records, please try again");
    const passError = () =>toast.error("Reset Password Not Successfully")
    const navigate = useNavigate();



    const handleRecent = (event) => {
        event.preventDefault();
        let validateErr = validate({
            reset_password_otp:data.reset_password_otp,
            password:data.password,
            confirm_pass:data.confirmPassword
        })
        setError({otpErr:validateErr , passwordErr:validateErr , confirmPasswordErr:validateErr})
            setActive(false)
        // setLoading(true); // Set loading before sending API request
        if(Object.keys(validateErr).length == 0){
            data.customer_id=customerId_forgot
            resetPassword(data).then((res)=>{
                console.log(res)
                setLoading(false); // Stop loading
                navigate('/login')
                localStorage.setItem("verification_otp" ,data.reset_password_otp)
                if(res.code == "200"){
                    toast.success("Password Reset Successfully",{ position: "top-right", autoClose: 2000, theme: "colored" })
                }
            }).catch((error)=>{
                console.log(error.response)
                if(error.response.code){
                    toast.error(error.response.message || error.response.non_field_errors);
                }
                if(error.response.status == 400){
                    toast.error(error.response.data.message, { position: "top-right", autoClose: 2000, theme: "colored" });
                }
                setLoading(false)
            })
        }
            // axios.post(API.BASE_URL + `reset-password/`, {
            //     customer_id:customerId_forgot,
            //     password: password,
            //     reset_password_otp:  reset_password_otp,
            //     confirmPassword: confirmPassword,
            // }, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // "Authorization" : `Bearer ${signup_token ? signup_token : token}`,
            //     }}, {
            // })
            // .then(function(response) {
            //     console.log("Forget API" ,response);
            //     setLoading(false); // Stop loading
            //     navigate('/login')
            //     // notify();
            // })
            // .catch(function(error) {
            //     console.log(error.response);
            //     setLoading(false); // Stop loading in case of error
            //     // if(error.response.status){
            //     //     toast.error(error.response.data.message || error.response.data.non_field_errors);
            //     // }
            //     setInvalidotpText(error.response.data.Invalidotp);
            //     setEnterpasswordText(error.response.data.Enterpassword);
            //     setEnterotpText(error.response.data.Enterotp)
            // })
        
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
            <section className="why-us section-bgba recent_banner">
            <div className="container">
                <div className="row">
                    {/* <div className="col-lg-6">
                        <div className="support_image">
                            <img src="assets/img/help/help_img02.png" alt="support_images" />
                        </div>
                    </div> */}

                    <div className="col-lg-12">
                        {/* start-- card */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card card-recent-password">
                                    <div className="card-body">
                                        <h5 className="Sign-heading">Reset Password </h5>

                                        <div className="form_login">
                                            <form>

                                            <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                    <Form.Label>Reset Password Otp<span style={{color: 'red'}} >*</span></Form.Label>
                                                    <Form.Control 
                                                    type="text"
                                                    value={data.reset_password_otp}
                                                    onChange={(e)=>handleResetpasswordotp(e)}
                                                    placeholder="Enter Reset password otp" 
                                                    />
                                                    <span style={myStyle}>{error.otpErr?.reset_password_otp ? error.otpErr.reset_password_otp :""}</span>
                                                    <span style={myStyle}>{EnterotpText? EnterotpText: ''}</span>
                                                    <span style={myStyle}>{InvalidotpText? InvalidotpText: ''}</span>
                                                
                                                </Form.Group>
                                                
                                            <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                    <Form.Label>New Password<span style={{color: 'red'}} >*</span></Form.Label>
                                                    <Form.Control 
                                                    type="password"
                                                    value={data.password}
                                                    onChange={(e)=>handlePassword(e)}
                                                    placeholder="Enter New Password" 
                                                    />
                                                    <span style={myStyle}>{error.passwordErr?.password ? error.passwordErr.password :""}</span>
                                                    <span style={myStyle}>{EnterpasswordText? EnterpasswordText: ''}</span>
                                                </Form.Group>

                                                <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                    <Form.Label>Confirm Password<span style={{color: 'red'}} >*</span></Form.Label>
                                                    <Form.Control 
                                                    type="password"
                                                    value={data.confirmPassword}
                                                    onChange={(e)=>handleConfirmPassword(e)}
                                                    placeholder="Confirm Password" 
                                                    />
                                                    <span style={myStyle}>{error.confirmPasswordErr?.confirm_pass ? error.confirmPasswordErr.confirm_pass :""}</span>
                                                    <span className={active ==true ? 'not_match' : 'hide'}>Passwords do not match</span>
                                                </Form.Group>

                                                <button variant="primary" 
                                            type="submit" 
                                            className="login_button"
                                            onClick={handleRecent}
                                            >
                                                    Recent Password
                                                    {loading ? <>
                                                        <div className="loader-overly"> 
                                                        <div className="loader" > 
                                                        
                                                        </div>
                                                        
                                                        </div>
                                                    </> : <></>}
                                                </button>
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



export default RecentPassword;