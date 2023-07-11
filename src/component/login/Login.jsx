import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { exchangeRate, userLogin } from "../../utils/Api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import * as CountryData from "country-codes-list";

const Login = () => {


    const [isMobile, setIsMobile] = useState(true)
    const [promo_marketing, setPromo_marketing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);
    const [countryCode, setCountryCode] = useState("+61")


    const loginSchema = Yup.object().shape({
        email: Yup.string().trim("no spaces allowed").required('required'),
        password: Yup.string().required('Password is required'),
    })

    const initialValues = {
        email: '',
        password: '',
    }

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setLoading(true);
            let data = {}
            if (isMobile === true) {
                const mobileNumber = parseInt(values.email, 10)
                data.mobile = countryCode + mobileNumber
            } else {
                data.email = values.email
            }
            userLogin({ ...data, password: values.password }).then((res) => {
                if (res.code == "200") {
                    toast.success(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    navigate("/verification", { state: data })
                } else if (res.code == "201") {
                    if (res.data.is_verified != "False") {
                        toast.warn(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                        navigate('/verification', { state: { mobile: values.email } })
                    } else {
                        toast.error("Please check your inbox to verify email.", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                } else if (res.code == "400") {
                    toast.error(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                if (err.response.data.code === '400') {
                    toast.error('Credetionals Does not match', { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                }
            })
        },
    })



    const navigate = useNavigate();

    const handlePromo_marketing = (e) => {
        const { checked } = e.target;

        setPromo_marketing((promo_marketing) => ({
            ...promo_marketing,
            Active: checked
        }));
    };



    const myCountryList = CountryData.customArray({ name: '{countryCallingCode} ({countryCode})', value: '{countryCode}' })

    const handleChange = (e) => {
        let element = e.target.value
        if (element.length > 0) {
            let pattern = /^[0-9+ ]+$/
            let result = pattern.test(element)
            if (result) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        } else {
            setIsMobile(true)
        }
        formik.setFieldValue("email", element)
        formik.setFieldTouched("email", true)

    }

    return (
        <>
            <section className="why-us section-bgba login_banner">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            {/* start-- card */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-login">
                                        <div className="card-body login-card-body">
                                            <h5 className="login-heading">Login</h5>

                                            <div className="form_login">
                                                <form onSubmit={formik.handleSubmit} noValidate>
                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label>Email/Mobile Number<span style={{ color: 'red' }} >*</span></Form.Label>
                                                        <div className="row">
                                                            {
                                                                isMobile ? (
                                                                    <div className="col-md-4 pe-1">
                                                                        <Form.Select className="login-code-select form-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                                                            {/* {
                                                                                myCountryList && myCountryList.length > 0 ?
                                                                                    myCountryList.map((item) => {
                                                                                        return (
                                                                                            <option value={item?.value}>+{item?.name}</option>
                                                                                        )
                                                                                    }) : <option>N/A</option>
                                                                            } */}
                                                                            <option value="+61">+61 (AU)</option>
                                                                            <option value="+64">+64 (NZ)</option>
                                                                            {/* <option value="+91">+91 (IN)</option> */}
                                                                        </Form.Select>
                                                                    </div>
                                                                ) : ""
                                                            }
                                                            <div className={`${isMobile ? "col-md-8" : "col-md-12"} ps-1`}>
                                                                <Form.Control
                                                                    type={'text'}
                                                                    autoComplete="off"
                                                                    name="id"
                                                                    size="lg"
                                                                    onChange={handleChange}
                                                                    onBlurCapture={(e) => { formik.setFieldTouched("email", true); formik.setFieldValue("email", e.target.value) }}
                                                                    className={clsx(
                                                                        'form-control email-mobile-input',
                                                                        {
                                                                            'is-invalid': formik.touched.email && formik.errors.email
                                                                        }
                                                                    )}
                                                                    placeholder="Email/Mobile"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label> Your Password<span style={{ color: 'red' }} >*</span></Form.Label>
                                                        <Form.Control
                                                            type={showPassword ? 'text' : 'password'}
                                                            autoComplete='off'
                                                            {...formik.getFieldProps('password')}
                                                            className={clsx(
                                                                'form-control email-mobile-input',
                                                                {
                                                                    'is-invalid': formik.touched.password && formik.errors.password,
                                                                }
                                                            )}
                                                            placeholder="Password"
                                                        />

                                                        <span className="login_pass_icons" type="button" onClick={() => toggleShowPassword()}>
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

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <Form.Group className="mb-3">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    value={promo_marketing}
                                                                    onChange={handlePromo_marketing}
                                                                    checked={promo_marketing.Active} // <-- set the checked prop of input    
                                                                    label="Remember me " />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <NavLink className="forgot_pass" to="/forgot-password"> Forgot password?</NavLink>
                                                        </div>
                                                    </div>

                                                    <button variant="primary"
                                                        type="submit"
                                                        className="login_button"
                                                    >
                                                        Login

                                                        {loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >

                                                                </div>

                                                            </div>
                                                        </> : <></>}
                                                    </button>

                                                    <p className="already_content">Don't have account?
                                                        <NavLink to="/sign-up">Sign up</NavLink>
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



export default Login;