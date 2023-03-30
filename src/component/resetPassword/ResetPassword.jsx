import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate, useParams} from 'react-router-dom';

import { toast } from "react-toastify";
import {API} from "../../config/API";
import axios from 'axios';
import UserContext from '../context/UserContext';

const myStyle = {
    color: 'red',
}

const RecentPassword = () => {

    const [password, setPassword] = useState('');
    const [reset_password_otp, setReset_password_otp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /*********************Start Validation state Text************** */
    const [EnterotpText, setEnterotpText] = useState('');
    const [InvalidotpText, setInvalidotpText] = useState('');
    const [EnterpasswordText, setEnterpasswordText] = useState('');
    
    // const {id} = useParams();

    const handlePassword =(e) =>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value);
    }
    const handleResetpasswordotp = (e) =>{
        setReset_password_otp(e.target.value);
    }


    const token_forgot = localStorage.getItem("token_forgot");
    console.log("Token_Forgot_password", token_forgot);


    // const token_forgot_url = localStorage.getItem("token_forgot_url");
    // console.log("token_forgot_url", token_forgot_url);


    const notify = () =>toast.success("Check your email to Reset Password");
    const wrongData = () =>toast.warm("This E-mail is not our records, please try again");

    const navigate = useNavigate();



    const handleRecent = (event) => {
        event.preventDefault();
        setLoading(true); // Set loading before sending API request
            axios.post(API.BASE_URL + `reset-password/`, {
                password: password,
                reset_password_otp:  reset_password_otp,
                confirmPassword: confirmPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }}, {
            })
            .then(function(response) {
                console.log("Forget API" ,response);
                setLoading(false); // Stop loading
                navigate('/login')
                // notify();
            })
            .catch(function(error) {
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
                // if(error.response.status){
                //     toast.error(error.response.data.message || error.response.data.non_field_errors);
                // }
                setInvalidotpText(error.response.data.Invalidotp);
                setEnterpasswordText(error.response.data.Enterpassword);
                setEnterotpText(error.response.data.Enterotp)
                
             
            })
        }
    
    return(
        <>
         {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
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
                                            type="number"
                                            value={reset_password_otp}
                                            onChange={handleResetpasswordotp}
                                             placeholder="Enter Reset password otp" 
                                             />
                                              <span style={myStyle}>{EnterotpText? EnterotpText: ''}</span>
                                             <span style={myStyle}>{InvalidotpText? InvalidotpText: ''}</span>
                                         
                                        </Form.Group>
                                        
                                      <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                            <Form.Label>New Password<span style={{color: 'red'}} >*</span></Form.Label>
                                            <Form.Control 
                                            type="password"
                                            value={password}
                                            onChange={handlePassword}
                                             placeholder="Enter New Password" 
                                             />
                                            
                                             <span style={myStyle}>{EnterpasswordText? EnterpasswordText: ''}</span>
                                        </Form.Group>

                                        <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                            <Form.Label>Confirm Password<span style={{color: 'red'}} >*</span></Form.Label>
                                            <Form.Control 
                                            type="password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPassword}
                                             placeholder="Confirm Password" />
                                        </Form.Group>

                                        <button variant="primary" 
                                       type="submit" 
                                       className="login_button"
                                       onClick={handleRecent}
                                       >
                                            Recent Password
                                            {loading ? <>
                                                <div class="loader-overly"> 
                                                <div class="loader" > 
                                                
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

        {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}


        </>

    )
}



export default RecentPassword;