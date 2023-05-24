import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { resendOtp, verifyEmail } from "../../utils/Api";


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
    const data = location.state

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
        
        console.log("otp.length", otp)
        let length = otp.toString()

        if(length.length == 6){
            setLoading(true)
            let obj = {}
            if (Object.keys(data) == 'email') {
                obj.email = data.email
            } else {
                obj.mobile = data.mobile
            }
            obj.otp = otp
            verifyEmail(obj).then((res) => {
                console.log("verifing email", res)
                if (res.code == 200) {
                    toast.success("verification successful",
                        { position:"bottom-right", autoClose: 2000, hideProgressBar: true })
                    localStorage.setItem('token', res.access_token)
                    setLoading(false)
                     if (res?.data?.digital_id_verified && res?.data.digital_id_verified == "true") {
                        const user = JSON.parse(localStorage.getItem("remi-user-dt"))
                        user.digital_id_verified = "true"
                        localStorage.setItem("remi-user-dt",JSON.stringify(user))
                        navigate("/dashboard")
                    } else {
                        const user = JSON.parse(localStorage.getItem("remi-user-dt"))
                        user.digital_id_verified = "false"
                        localStorage.setItem("remi-user-dt",JSON.stringify(user))
                        navigate('/send-money')
                    }
                }else if(res.code == "400"){
                    toast.error(res.message,
                    { position:"bottom-right", autoClose: 2000, hideProgressBar: true });
                    setLoading(false)
                }            
            }).catch((error) => {
                console.log(error.response)
                if (error.response.status == 400) {
                    toast.error(error.response.data.message,
                        { position:"bottom-right", autoClose: 2000, hideProgressBar: true });
                }
                setLoading(false)
            })
        } else {

            toast.error("Please enter 6 digit O.T.P", { position:"bottom-right", autoClose: 2000, hideProgressBar: true })
        }
    }

    const handleResendOtp =(e)=>{
        e.preventDefault()
        setLoading(true)
        let obj = {}
        if (Object.keys(data) == 'email') {
            obj.email = data.email
        } else {
            obj.mobile = data.mobile
        }
        obj.type = "email"
        resendOtp(obj)
        .then((res)=>{
            console.log("resend-otp-----", res)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error.response)
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
                                    <p>A verification code sent to your number. Please enter the code to continue.</p>
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
                                                <button variant="primary"
                                                    type="button" 
                                                    onClick={(e)=>{handleResendOtp(e)}}
                                                    className="continue_button w-75"
                                                >
                                                    Resend OTP
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