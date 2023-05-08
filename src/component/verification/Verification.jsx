import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import OtpInput from "react18-input-otp";

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { Navigate, useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Page404 from "../pageNotfound/Page404";
import { verifyEmail } from "../../utils/Api";


{/* start -- css*/ }
const myStyle = {
    color: "red",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop: "4px",
    display: "block",
    textAlign: "center"
}
const successStyle = {
    color: "green",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop: "4px",
    display: "block",
    textAlign: "center"
}
{/* End -- css*/ }


const Verification = () => {

    /**************************token ************************ */

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const location = useLocation()
    const { email } = location.state

    // start Error mesasge states
    const [EnterOtpText, setEnterOtpText] = useState('');
    const [InvalidotpText, setInvalidotpText] = useState('');
    const [AlreadyverifiedText, setAlreadyverifiedText] = useState('');

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    const navigate = useNavigate();

    const handleEmailVerification = (event) => {
        event.preventDefault();
        setLoading(true)
        verifyEmail({ email_otp: otp, email: email }).then((res) => {
            console.log("verifing email", res)
            if (res.code == 200) {
                toast.success("Email verification successful",
                    { position: "top-right", autoClose: 2000, theme: "colored" })
                localStorage.setItem('token', res.access_token)
                setLoading(false)
                navigate('/send-money')
            }


        }).catch((error) => {
            console.log(error.response)
            if (error.response.status == 400) {
                toast.error(error.response.data.message,
                    { position: "top-right", autoClose: 2000, theme: "colored" });
            }
            setLoading(false)
        })

    }

    return (
        <>
            <section className="why-us section-bgba verification_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-verification">
                                <div className="card-body">
                                    <span style={successStyle}>{AlreadyverifiedText ? AlreadyverifiedText : ""}</span>
                                    <h5 className="Sign-heading">Verify your Account</h5>
                                    <p>A verification code sent to your email. Please enter the code to continue.</p>
                                    <div className="form_verification">
                                        <form onSubmit={handleEmailVerification} >
                                            <OtpInput
                                                value={otp}
                                                onChange={handleChange}
                                                numInputs={6}
                                                isSuccessed={true}
                                                successStyle="success"
                                                separator={<span></span>}
                                                separateAfter={3}
                                                className="verification_input"
                                                onSubmit={console.log(otp)}

                                            />
                                            <span style={myStyle}>{EnterOtpText ? EnterOtpText : ""}</span>
                                            <span style={myStyle}>{InvalidotpText ? InvalidotpText : ""}</span>
                                            <div className="text-center pt-3">
                                                <button variant="primary"
                                                    type="submit"
                                                    className="continue_button w-75"
                                                >
                                                    Continue
                                                    {
                                                        loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >
                                                                </div>
                                                            </div>
                                                        </> : <></>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



export default Verification;