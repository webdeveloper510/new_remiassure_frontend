import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { resendOtp, verifyEmail } from "../../utils/Api";
import { NavLink } from "react-bootstrap";



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

const PopVerify = ({ handler, close }) => {

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const { mobile } = JSON.parse(localStorage.getItem("remi-user-dt"))

    // start Error mesasge states
    const [EnterOtpText, setEnterOtpText] = useState('');
    const [InvalidotpText, setInvalidotpText] = useState('');
    const [AlreadyverifiedText, setAlreadyverifiedText] = useState('');

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    const handleVerification = (event) => {
        event.preventDefault();
        let length = otp.toString()

        if (length.length == 6) {
            setLoading(true)
            let obj = {}
            obj.mobile = mobile
            obj.otp = otp
            verifyEmail(obj).then((res) => {
                if (res.code == 200) {
                    localStorage.setItem('token', res.access_token)
                    setLoading(false)
                    close()
                    handler(true)
                } else if (res.code == "400") {
                    toast.error(res.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    setLoading(false)
                    close()
                    handler(false)
                }
            }).catch((error) => {
                console.log(error.response)
                if (error.response.status == 400) {
                    toast.error(error.response.data.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                }
                close()
                setLoading(false)
            })
        } else {
            toast.error("Please enter 6 digit O.T.P", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        }
    }

    const handleResendOtp = () => {
        setLoading(true)
        let obj = {}
        obj.mobile = mobile
        obj.type = "email"
        resendOtp(obj)
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        let obj = {}
        obj.mobile = mobile
        obj.type = "email"
        resendOtp(obj)
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className="card-body">
            <span style={successStyle}>{AlreadyverifiedText ? AlreadyverifiedText : ""}</span>
            <h5 className="Sign-heading">Verify your Account</h5>
            <p style= {{textAlign:"center",paddingTop: "6px"}}>A verification code sent to your number. Please enter the code to continue.</p>
            <div className="form_verification">
                <form onSubmit={handleVerification} >
                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        isInputNum={true}
                        isSuccessed={true}
                        successStyle="success"
                        separator={<span></span>}
                        separateAfter={3}
                        className="verification_input"
                        onSubmit={console.log(otp)}

                    />
                    <span style={myStyle}>{EnterOtpText ? EnterOtpText : ""}</span>
                    <span style={myStyle}>{InvalidotpText ? InvalidotpText : ""}</span>
                    <NavLink className="resend_otp_link" onClick={()=>{handleResendOtp()}}>
                        Resend OTP
                        {
                            loading ? <>
                                <div className="loader-overly">
                                    <div className="loader" >
                                    </div>
                                </div>
                            </> : <></>
                        }
                    </NavLink>
                    <div className="text-center pt-3 Verify_pop">
                        <button variant="primary"
                            type="submit"
                            className="continue_button"
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
                            onClick={(e) => { close() }}
                            className="cancel_button "
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PopVerify