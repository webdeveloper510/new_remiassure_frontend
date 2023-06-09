import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { resendOtp, verifyEmail } from "../../utils/Api";
import { Alert } from "react-bootstrap";
import { useEffect } from "react";


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
    const [show_alert, setShowAlert] = useState(1)

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(0)
        }, 5000)
        if (localStorage.getItem("token") && localStorage.getItem("remi-user-dt")) {
            let user = JSON.parse(localStorage.getItem("remi-user-dt"));
            if (user?.digital_id_verified && user.digital_id_verified === "true") {
                navigate("/dashboard")
            }
            else {
                navigate("/send-money")
            }
        }

    }, [show_alert])


    const handleEmailVerification = (event) => {
        event.preventDefault();
        let length = otp.toString()
        if (length.length == 6) {
            setLoading(true)
            let obj = {}
            let keys = Object.keys(data)
            if (keys[0] == 'email') {
                obj.email = data.email
            } else {
                obj.mobile = data.mobile
            }
            obj.otp = otp
            if (keys.length == 2 && keys[1] == 'component') {
                obj.page = 'register'
            }
            verifyEmail(obj).then((res) => {
                if (res.code == 200) {
                    toast.success("verification successful",
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    let d = new Date()
                    d.setDate(d.getDate() + 1);
                    console.log(d)
                    localStorage.setItem('tkn-exp', d)
                    localStorage.setItem('token', res.access_token)
                    setLoading(false)
                    if (res?.data?.digital_id_verified && res?.data.digital_id_verified == "true") {
                        const user = res?.data
                        user.digital_id_verified = "true"
                        localStorage.setItem("remi-user-dt", JSON.stringify(user))
                        navigate("/dashboard")
                    } else {
                        const user = res?.data
                        user.digital_id_verified = "false"
                        localStorage.setItem("remi-user-dt", JSON.stringify(user))
                        navigate('/send-money')
                    }
                } else if (res.code == "400") {
                    toast.error(res.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    setLoading(false)
                }
            }).catch((error) => {
                if (error.response.status == 400) {
                    toast.error(error.response.data.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                }
                setLoading(false)
            })
        } else {

            toast.error("Please enter the OTP", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        }
    }

    const handleResendOtp = (e) => {
        e.preventDefault()
        setLoading(true)
        let obj = {}
        let keys = Object.keys(data)
        if (keys[0] == 'email') {
            obj.email = data.email
        } else {
            obj.mobile = data.mobile
        }
        obj.type = "email"
        setLoading(true)
        resendOtp(obj).then((res) => {
            if (res.code == "200") {
                setShowAlert(2)
            } else {
                setShowAlert(3)
            }
            setLoading(false)
        }).catch((error) => {
            setShowAlert(3)
            setLoading(false)
        })
        setLoading(false)
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
                                    <h5 className="Sign-heading mb-4">Verify your Account</h5>
                                    {
                                        show_alert === 1 ? (
                                            <Alert className="m-0" >
                                                {/*onClose={() => setShowAlert(0)} dismissible  */}
                                                <span>
                                                    A verification code has been sent to your number.
                                                </span>
                                            </Alert>
                                        ) : show_alert === 2 ? (
                                            <Alert className="m-0" >
                                                <span>The verification code has been resent.</span>
                                            </Alert>
                                        ) : show_alert === 3 ? (
                                            <Alert className="m-0" >
                                                <span>There might be an issue in resending, please try again.</span>
                                            </Alert>
                                        ) : (
                                            <Alert className="m-0" >
                                                <span> Please enter the verification code to continue.</span>
                                            </Alert>
                                        )
                                    }

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
                                                    onClick={(e) => { handleResendOtp(e) }}
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