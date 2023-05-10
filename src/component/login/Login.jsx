import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from "../../utils/Api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";

const Login = () => {

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Wrong email format')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Password is required'),
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
            userLogin({ email: values.email, password: values.password }).then((res) => {
                if (res.code == 200) {
                    toast.success('Login Successfully', { position: "top-right", autoClose: 2000, theme: "colored" });
                    localStorage.setItem("token", res?.access_token)
                    localStorage.setItem("remi-user-dt", JSON.stringify(res?.data))
                    if (res?.data?.digital_id_verified) {
                        navigate("/dashboard")
                    } else {
                        navigate('/send-money')
                    }
                } else if (res.code == 201) {
                    toast.warn("Please check your mail for otp", { position: "top-right", autoClose: 2000, theme: "colored" })
                    localStorage.setItem("remi-user-dt", res?.data)
                    navigate('/verification', { state: { email: values.email } })
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                // console.log('catch-errr', err.response)
                // console.log('catch-errr', err.response.data.code)
                if (err.response.data.code === '400') {
                    toast.error('Credetionals Does not match', { position: "top-right", autoClose: 2000, theme: "colored" });
                }
            })
        },
    })


    const [promo_marketing, setPromo_marketing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);

    const navigate = useNavigate();

    const handlePromo_marketing = (e) => {
        const { checked } = e.target;

        setPromo_marketing((promo_marketing) => ({
            ...promo_marketing,
            Active: checked
        }));
    };

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
                                        <div className="card-body">
                                            <h5 className="Sign-heading">Login</h5>

                                            <div className="form_login">
                                                <form onSubmit={formik.handleSubmit} noValidate>
                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label>Your Email<span style={{ color: 'red' }} >*</span></Form.Label>
                                                        <Form.Control type="email"
                                                            {...formik.getFieldProps('email')}
                                                            maxLength="50"
                                                            className={clsx(
                                                                'form-control bg-transparent',
                                                                { 'is-invalid': formik.touched.email && formik.errors.email },
                                                                {
                                                                    'is-valid': formik.touched.email && !formik.errors.email,
                                                                }
                                                            )}
                                                            name='email'
                                                            autoComplete='off'
                                                            placeholder="Enter email"
                                                        />

                                                    </Form.Group>

                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label> Your Password<span style={{ color: 'red' }} >*</span></Form.Label>
                                                        <Form.Control
                                                            type={showPassword ? 'text' : 'password'}
                                                            autoComplete='off'
                                                            {...formik.getFieldProps('password')}
                                                            className={clsx(
                                                                'form-control bg-transparent',
                                                                {
                                                                    'is-invalid': formik.touched.password && formik.errors.password,
                                                                },
                                                                {
                                                                    'is-valid': formik.touched.password && !formik.errors.password,
                                                                }
                                                            )}
                                                            placeholder="Password"
                                                        />
                                                        <span className="pass_icons" type="button" onClick={toggleShowPassword}>
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </span>


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