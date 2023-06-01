import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { exchangeRate, userRegister } from "../../utils/Api";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import countryList from "../../utils/senderCountries.json"
const Signup = () => {

    const search = useLocation()
    const [show, setShow] = useState(false);
    const [country_code, setCountryCode] = useState("AU")

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
        email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").min(6).max(50).required("Email is required"),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/, 'Password must contain uppercase, lowercase, symbols, digits, minimum 6 characters').required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords did not match").required("Password confirmation is required"),
        referral_code: show ? Yup.string().length(7).required() : Yup.string().length(7).notRequired(),
        mobile: Yup.string().min(10).max(18).required()
    })

    useEffect(() => {
        exchangeRate({ amount: "1", from: "AUD", to: "USD" }).then(res => {
            const data = { send_amt: "1", exchange_amt: res.amount, from_type: "AUD", to_type: "USD", exch_rate: res.rate }
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

    const formik = useFormik({
        initialValues,
        validationSchema: signSchema,
        onSubmit: async (values) => {
            setLoading(true)
            let data = { ...values, promo_marketing: promo_marketing, country_code: country_code, mobile: "+" + values.mobile }
            if (referral_code == "") {
                delete data["referral_code"]
            }
            userRegister(data).then((res) => {
                if (res.code === "200") {
                    navigate("/verification", { state: { mobile: "+" + values.mobile } })

                } else if (res.code == '400') {
                    toast.error(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                }
                else if (res.code == '201') {
                    toast.warn(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    navigate("/verification", { state: { mobile: values.mobile } })
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

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [referral_code, setrReferral_code] = useState('');
    const [promo_marketing, setPromo_marketing] = useState("0");

    useEffect(() => {
        if (show == false) {
            setrReferral_code("")
        }
    })

    const navigate = useNavigate();
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prevState => !prevState)


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
        formik.setFieldValue('mobile', e);
        formik.setFieldTouched('mobile', true);
        formik.setFieldValue('location', coun.name)
    }

    return (
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-signup">
                                        <div className="card-body">
                                            <h5 className="Sign-heading">Sign Up</h5>
                                            <div className="form_signup">
                                                <form onSubmit={formik.handleSubmit} autoComplete="on">
                                                    <Form.Label>Where are you sending money from?<span style={{ color: 'red' }} >*</span></Form.Label>
                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label>Location<span style={{ color: 'red' }} >*</span> </Form.Label>
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
                                                    <Form.Group className="mb-3 form_label" >
                                                        <Form.Label>Your Email<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
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
                                                    <Form.Group className="mb-3 form_label" >
                                                        <Form.Label>Your Phone<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                        <PhoneInput
                                                            onlyCountries={["au", "nz"]}
                                                            country={country_code ? country_code.toLowerCase() : "au"}
                                                            name="mobile"
                                                            inputStyle={{ border: "none", margin: "none" }}
                                                            inputClass="phoneInp"
                                                            defaultCountry={"au"}
                                                            onChange={(val, coun) => { handlePhone(val, coun) }}
                                                            className={clsx(
                                                                'form-control form-control-sm bg-transparent',
                                                                { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                                                {
                                                                    'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                                                }
                                                            )}

                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label> Your Password<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                        <Form.Control
                                                            type={showPassword ? 'text' : 'password'}
                                                            id="password"
                                                            name="password"
                                                            autoComplete="off"
                                                            {...formik.getFieldProps('password')}
                                                            placeholder="Password"
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
                                                    <Form.Group className="mb-3 form_label">
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
                                                    <Form.Check className="form_switch"
                                                        type="switch"
                                                        onClick={() => setShow(!show)}
                                                        id="custom-switch"
                                                        label="Referred by a friend? Use the referral code below."

                                                    />
                                                    {show && <div>
                                                        <Form.Group className="mb-3 form_label">
                                                            <Form.Label>Your Referral Code</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                {...formik.getFieldProps('referral_code')}
                                                                className={show ? clsx(
                                                                    'form-control bg-transparent',
                                                                    { 'is-invalid': formik.touched.referral_code && formik.errors.referral_code },
                                                                    {
                                                                        'is-valid': formik.values.referral_code.length == 7,
                                                                    }
                                                                ) : ""}
                                                                placeholder="Enter Referral Code"
                                                            />
                                                        </Form.Group>
                                                    </div>}
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
                                                        Signup
                                                        {loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >
                                                                </div>
                                                            </div>
                                                        </> : <></>}
                                                    </button>
                                                    <p className="already_content">Already have an account?
                                                        <NavLink to="/login">Log In</NavLink>
                                                    </p>
                                                </form>

                                            </div>
                                        </div>
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



export default Signup;