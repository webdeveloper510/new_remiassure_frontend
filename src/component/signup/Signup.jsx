import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { exchangeRate, registerOtpResend, sendEmail, userRegisterCheck, userRegisterVerify } from "../../utils/Api";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import countryList from "../../utils/senderCountries.json"
import { Alert, Modal, Button, ModalBody } from "react-bootstrap";
import OtpInput from "react18-input-otp";
const Signup = () => {

    const search = useLocation()
    const [show, setShow] = useState(false);
    const [country_code, setCountryCode] = useState("AU")
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [referral_code, setrReferral_code] = useState('');
    const [promo_marketing, setPromo_marketing] = useState("0");
    const [isGetOtp, setIsGetOtp] = useState(false)
    const [otp, setOtp] = useState("");
    const [count_invalid, setCountInvalid] = useState(0);
    const [open_modal, setOpenModal] = useState(false)
    const [show_alert, setShowAlert] = useState(1)
    const navigate = useNavigate();
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prevState => !prevState)

    const initialValues = {
        location: "",
        email: "",
        password: "",
        confirmPassword: "",
        referral_code: "",
        mobile: ""
    }

    const signSchema = Yup.object().shape({
        location: Yup.string().required(),
        email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,10}$/, "Invalid email format").min(6).max(50).required("Email is required"),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/, 'Password must contain uppercase, lowercase, symbols, digits, minimum 6 characters').required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords did not match").required("Password confirmation is required"),
        referral_code: show ? Yup.string().length(6, "Referral code must contain 6 characters").required("Referral Code is required") : Yup.string().notRequired(),
        mobile: Yup.string().min(11).required()
    })

    useEffect(() => {
        exchangeRate({ amount: "1", from: "AUD", to: "NGN" }).then(res => {
            const data = { send_amt: "1", exchange_amt: res.amount, from_type: "AUD", to_type: "NGN", exch_rate: res.rate }
            localStorage.removeItem("exchange_curr")
            localStorage.setItem("exchange_curr", JSON.stringify(data))
        })
        if (localStorage.getItem("token") && localStorage.getItem("remi-user-dt")) {
            let user = JSON.parse(localStorage.getItem("remi-user-dt"));
            if (user?.digital_id_verified && user.digital_id_verified === "true") {
                navigate("/dashboard")
            } else {
                navigate("/send-money")
            }
        }
    }, [])

    useEffect(() => {
        formik.resetForm()
        setIsGetOtp(false)
    }, [search])

    const formik = useFormik({
        initialValues,
        validationSchema: signSchema,
        onSubmit: async (values) => {
            setLoading(true)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
            let data = { ...values, promo_marketing: promo_marketing, country_code: country_code, mobile: "+" + values.mobile }
            if (data.referral_code === "" || show === false) {
                delete data["referral_code"]
            }
            userRegisterCheck(data).then((res) => {
                if (res.code === "200") {
                    toast.success(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });

                    setIsGetOtp(true)

                } else if (res.code == '400') {
                    toast.error(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                }
                else if (res.code == '201') {
                    toast.success(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    setIsGetOtp(true)
                }
                setLoading(false)
            }).catch((error) => {
                if (error.response.code == "400") {
                    toast.error(error.response.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                }
                setLoading(false)
            })
        }

    })

    useEffect(() => {
        const search1 = search.search;
        const term = new URLSearchParams(search1).get('ref');
        if (term) {
            setrReferral_code(term)
            setShow(true)
        }

    }, [referral_code, show]);

    const handlePromo_marketing = (e) => {
        const { checked } = e.target;
        if (checked) {
            setPromo_marketing("1")

        } else {
            setPromo_marketing("0")

        }
    };

    const handleChange = (e) => {
        formik.setFieldValue("location", e.target.value)
        formik.setFieldTouched("location", true)
        countryList.map((item) => {
            if (item.name === e.target.value) {
                setCountryCode(item.iso2)
            }
        })
    }

    const handlePhone = (e, coun) => {
        let mno = e.substring(2);
        const mobileNumber = parseInt(mno, 10)
        formik.setFieldValue('mobile', coun.dialCode + mobileNumber);
        formik.setFieldValue('location', coun.name)
    }

    const handleRef = (event) => {
        const result = event.target.value.replace(/[^A-z0-9_-]/gi, "")
        formik.setFieldValue(event.target.name, result)
        formik.setFieldTouched(event.target.name, true)
        // if(result.length == 6){
        //     formik.setErrors({...formik.errors, referral_code:""})
        // }
    }
    const handleBlur = () => {
        formik.setFieldTouched('mobile', true)
    }

    useEffect(() => {
        if (count_invalid === 3) {
            setOpenModal(true)
            setOtp("")
        }
    }, [count_invalid])

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
            let data = { ...formik.values, promo_marketing: promo_marketing, country_code: country_code, mobile: "+" + formik.values.mobile, otp: otp }
            if (data.referral_code === "" || show === false) {
                delete data["referral_code"]
            }
            userRegisterVerify(data).then((res) => {
                if (res.code === "200") {
                    toast.success(res.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    let d = new Date()
                    d.setDate(d.getDate() + 1);
                    localStorage.setItem('tkn-exp', d)
                    localStorage.setItem('token', res.access_token)
                    setLoading(false)
                    const user = res?.data
                    user.digital_id_verified = "false"
                    localStorage.setItem("remi-user-dt", JSON.stringify(user))
                    navigate('/send-money')
                    sendEmail()
                } else if (res.code == "400") {
                    toast.error(res.message,
                        { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    setCountInvalid(count_invalid + 1)
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
            toast.error("Please enter the valid OTP", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        }
    }

    const handleResendOtp = (e) => {
        e.preventDefault()
        setLoading(true)
        setOtp(null)
        registerOtpResend({ mobile: "+" + formik.values.mobile }).then(res => {
            if (res.code === "200") {
                setShowAlert(2)
            } else {
                setShowAlert(3)
            }
        }).catch((error) => {
            setShowAlert(3)
            setLoading(false)
        })
        setLoading(false)
    }

    const handleClose = () => {
        setOpenModal(false)
        navigate("/help")
    }

    const handleOtpChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    return (
        <>
            {
                !isGetOtp ? (
                    <section className="sigupsec">
                        
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="sign-image-sec">
                                <img src="assets/img/home/signup.png" className="signup" alt="alt_image"/>
                                <div className="inner-image-sig">
                                <img src="assets/img/home/signup2.png" className="upper-image" alt="alt_image"/>
                                </div>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card1 card-signup1">
                                                <div className="card-body">
                                                    <h2 className="Sign-heading">Sign Up</h2>
                                                    <p className="money-form">Where are you sending money from?</p>
                                                    <div className="form_signup">
                                                        <form onSubmit={formik.handleSubmit} autoComplete="on">
                                                           
                                                            <Form.Group className="mb-2 form_label">
                                                                <Form.Label>Location<span style={{ color: '#FD6063' }} >*</span> </Form.Label>
                                                                <Form.Select
                                                                    name="location"
                                                                    value={formik.values.location ? formik.values.location : "Australia"}
                                                                    onChange={handleChange}
                                                                    className='form-control bg-transparent'
                                                                >
                                                                    {
                                                                        countryList && countryList.length > 0 ?
                                                                            countryList?.map((opt) => {
                                                                                return (
                                                                                    <option value={opt?.name} key={opt?.id}>{opt?.name}</option>
                                                                                )
                                                                            }) : ""
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group>
															<div className="row">
																<div className="col-md-6 phone-row">
                                                            <Form.Group className="mb-2 form_label" >
                                                                <Form.Label>Your Phone<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                <PhoneInput
                                                                    onlyCountries={["au", "nz"]}
                                                                    country={country_code ? country_code.toLowerCase() : "au"}
                                                                    name="mobile"
                                                                    inputStyle={{ border: "none", margin: "none" }}
                                                                    inputClass="phoneInp"
                                                                    placeholder="Enter Phone..."
                                                                    defaultCountry={"au"}
                                                                    inputProps={{ required: true }}
                                                                    countryCodeEditable={false}
                                                                    onChange={(val, coun) => { handlePhone(val, coun) }}
                                                                    className={clsx(
                                                                        'form-control form-control-sm bg-transparent',
                                                                        { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                                                        {
                                                                            'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                                                        }
                                                                    )}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </Form.Group>
															</div>
															<div className="col-md-6 email-row">
                                                            <Form.Group className="mb-2 form_label" >
                                                                <Form.Label>Your Email<span style={{ color: '#FD6063' }} >*</span> </Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    placeholder="Enter Your Email..."
                                                                    {...formik.getFieldProps('email')}
                                                                    className={clsx(
                                                                        'form-control bg-transparent',
                                                                        { 'is-invalid': formik.touched.email && formik.errors.email },
                                                                        {
                                                                            'is-valid': formik.touched.email && !formik.errors.email,
                                                                        }
                                                                    )}
                                                                />
                                                                {formik.touched.email && formik.errors.email && (
                                                                    <div className='fv-plugins-message-container mt-1'>
                                                                        <div className='fv-help-block'>
                                                                            <span role='alert' className="text-danger">{formik.errors.email}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Form.Group>
															</div>
															
															</div>
															<div className="row">
																<div className="col-md-6 pass-row">
                                                            <Form.Group className="mb-2 form_label">
                                                                <Form.Label> Your Password<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                <Form.Control
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    id="password"
                                                                    name="password"
                                                                    autoComplete="off"
                                                                    {...formik.getFieldProps('password')}
                                                                    placeholder="Enter Password..."
                                                                    className={clsx(
                                                                        'form-control bg-transparent',
                                                                        { 'is-invalid': formik.touched.password && formik.errors.password },
                                                                        {
                                                                            'is-valid': formik.touched.password && !formik.errors.password,
                                                                        }
                                                                    )}
                                                                />
                                                                <span onClick={toggleShowPassword} className="pass_icons">
                                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </span>
                                                                {formik.touched.password && formik.errors.password && (
                                                                    <div className='fv-plugins-message-container mt-1'>
                                                                        <div className='fv-help-block'>
                                                                            <span role='alert' className="text-danger">{formik.errors.password}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Form.Group>
															</div>
																<div className="col-md-6 cnfirmpass-row">
                                                            <Form.Group className="mb-2 form_label">
                                                                <Form.Label> Confirm Password<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                                <Form.Control
                                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                                    name="confirm Password"
                                                                    autoComplete="off"
                                                                    placeholder="Confirm Password"
                                                                    {...formik.getFieldProps('confirmPassword')}
                                                                    className={`${clsx(
                                                                        'form-control bg-transparent',
                                                                        { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                                                                        {
                                                                            'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                                                                        }
                                                                    )} rate_input form-control`}
                                                                />
                                                                <span onClick={toggleShowConfirmPassword} className="pass_icons">
                                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </span>
                                                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                                    <div className='fv-plugins-message-container mt-1'>
                                                                        <div className='fv-help-block'>
                                                                            <span role='alert' className="text-danger">{formik.errors.confirmPassword}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Form.Group>
															</div>
															</div>
                                                            {/*<Form.Check className="form_switch"
                                                                type="switch"
                                                                onClick={() => setShow(!show)}
                                                                id="custom-switch"
                                                                label="Referred by a friend? Use the referral code below."

                                                            />
                                                            {show && <div>
                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label>Your Referral Code</Form.Label>
                                                                    <input
                                                                        type="text"
                                                                        maxLength="6"
                                                                        name="referral_code"
                                                                        value={formik.values.referral_code}
                                                                        onChange={handleRef}
                                                                        className={show ? clsx(
                                                                            'form-control bg-transparent',
                                                                            { 'is-invalid': formik.touched.referral_code && formik.errors.referral_code },
                                                                            {
                                                                                'is-valid': formik.touched.referral_code && !formik.errors.referral_code,
                                                                            }
                                                                        ) : ""}
                                                                        placeholder="Enter Referral Code"
                                                                    />
                                                                    {formik.touched.referral_code && formik.errors.referral_code && (
                                                                        <div className='fv-plugins-message-container mt-1'>
                                                                            <div className='fv-help-block'>
                                                                                <span role='alert' className="text-danger">{formik.errors.referral_code}</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Form.Group>
                                                            </div>} */}
                                                            <Form.Group className="mb-3 form_checkbox">
                                                                <Form.Check className="form_label"
                                                                    type="checkbox"
                                                                    value="1"
                                                                    onChange={(e) => handlePromo_marketing(e)}
                                                                    defaultChecked={promo_marketing.Active}
                                                                    label="If you DO NOT wish to receive marketing information 
                                                                    about out products and special offers, please check this box"
                                                                />
                                                            </Form.Group>
                                                            <button variant="primary"
                                                                type="submit"
                                                                className="signup_button ">
                                                                Sign <b>up</b> <img src="assets/img/home/Union.png" className="vission_image" alt="alt_image"/>
                                                                {loading ? <>
                                                                    <div className="loader-overly">
                                                                        <div className="loader" >
                                                                        </div>
                                                                    </div>
                                                                </> : <></>}
                                                            </button>
                                                            <p className="already_content">Already have an account?
                                                                <NavLink to="/login">Sign In</NavLink>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                    </section>
                ) : (
                    <section className="why-us section-bgba verification_banner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-verification">
                                        <div className="card-body">
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
                                                        onChange={handleOtpChange}
                                                        numInputs={6}
                                                        isInputNum={true}
                                                        isSuccessed={true}
                                                        successStyle="success"
                                                        separator={<span></span>}
                                                        separateAfter={3}
                                                        className="verification_input"
                                                    />
                                                    <div className="text-center pt-3">
                                                        <button variant={count_invalid === 3 ? "secondary" : "primary"}
                                                            type="submit"
                                                            className="continue_button w-75"
                                                            disabled={count_invalid === 3 ? true : false}
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
                        <Modal show={open_modal} centered backdrop="static">
                            <Modal.Header><b style={{ color: "#6414E9" }}>Maximum limit reached</b></Modal.Header>
                            <ModalBody>
                                <h5>Please contact our <b style={{ color: "#6414E9" }}>Customer Service</b> to continue</h5>
                            </ModalBody>
                            <Modal.Footer className="pt-0">
                                <Button onClick={() => handleClose()} variant="primary" className="continue_button w-50 p-0">Visit Support</Button>
                            </Modal.Footer>
                        </Modal>
                    </section>
                )
            }
        </>
    )
}



export default Signup;