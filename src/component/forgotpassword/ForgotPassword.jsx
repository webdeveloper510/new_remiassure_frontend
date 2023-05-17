import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate} from 'react-router-dom';

import { toast } from "react-toastify";
import axios from 'axios';
import UserContext from '../context/UserContext';
import Page404 from "../pageNotfound/Page404";
import { resetEmail } from "../../utils/Api";
import validate from "../../pages/FormValidationRules";

const myStyle ={
    color: "red",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop:"4px",
    display:"block",
    // textAlign:"center"
}

const ForgotPassword = () => {
    /**************************token ************************ */

/**************************State ************************ */

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState({emailErr:""})

    //
    const [EnteremailText, setEnteremailText] = useState('');
    const [ValidemailText, setValidemailText] = useState('');
    const [Notegistered, setNotegistered] = useState('');

    const notify = () =>toast.success("Check your email to Reset Password");
    const wrongData = () =>toast.warm("This E-mail is not our records, please try again");
    const navigate = useNavigate('');

    const token_forgot = localStorage.getItem("token_forgot");
    // const token_forgot_url = localStorage.getItem("token_forgot_url");


    const handleEmail =(e) =>{
        setEmail(e.target.value);
    }


    let sessionID;
    setTimeout(
        function() {
            sessionID = localStorage.getItem("SessionID");
            // console.log("Login Session", sessionID);
        },3000
    );

    const handleForget = (event) => {
        event.preventDefault();
        let validateErr = validate({
            email:email
        })
        setError({emailErr:validateErr})
        if(Object.keys(validateErr).length == 0){
            setLoading(true); // Set loading before sending API request
        resetEmail(email).then((res)=>{
            setLoading(false);
            localStorage.setItem("token_forgot", res.token)
            localStorage.setItem("customerId_forgot", res.customer_id);
            navigate('/reset-passwords',{state:{customer_id: res.data.customer_id}})
            if(res.code =="200"){
                toast.success("Please Check Your Email",{ position:"bottom-right", autoClose: 2000, hideProgressBar: true})
            }
        }).catch((error)=>{
            // console.log(error.response)
            if(error.response.status == 400){
                toast.error(error.response.data.message,{ position:"bottom-right", autoClose: 2000, hideProgressBar: true })
            }
            setLoading(false)
        })
        }

        }
        
    
    return(
        <>
         <section className="why-us section-bgba forgot_banner">
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
                                <div className="card card-forgot-password">
                                    <div className="card-body">
                
                                        <h5 className="Sign-heading">Forgot Password ?</h5>

                                        <div className="form_login">
                                            <form>
                                            <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                 <Form.Label>Your Email<span style={{ color: 'red' }} >*</span></Form.Label>
                                                    <Form.Control 
                                                    type="email"
                                                    value={email}
                                                    onChange={handleEmail}
                                                    placeholder="Enter email"
                                                    />
                                                    <span style={myStyle}>{error.emailErr?.email ? error.emailErr.email :""}</span>
                                                    <span style={myStyle}>{EnteremailText? EnteremailText: ''}</span>
                                                    <span style={myStyle}>{ValidemailText? ValidemailText: ''}</span>
                                                    <span style={myStyle}>{Notegistered? Notegistered: ''}</span>
                                            </Form.Group>

                                    
                                                <button variant="primary" 
                                            type="submit" 
                                            className="login_button"
                                            onClick={handleForget}
                                            >
                                                    Forgot Password
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



export default ForgotPassword;