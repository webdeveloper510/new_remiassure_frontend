import React, { useEffect, useState } from "react";

import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";

import clsx from "clsx";
import * as Yup from "yup";
import { resendOtp, resetEmail } from "../../utils/Api";

import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";



const ForgotPassword = () => {


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate('');
    const initialValues = { mobile: "" }



    const handlePhone = (val, coun) => {
        let mno = val.substring(2);
        const mobileNumber = parseInt(mno, 10)
        formik.setFieldValue('mobile', coun.dialCode + mobileNumber);
        formik.setFieldTouched('mobile', true);
    }

    const forgetSchema = Yup.object().shape({
        mobile: Yup.string().min(11).max(18).required()
    })

    let sessionID;
    setTimeout(
        function () {
            sessionID = localStorage.getItem("SessionID");
        }, 3000
    );

    useEffect(() => {
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
        validationSchema: forgetSchema,
        onSubmit: async (values) => {
            setLoading(true);
            resetEmail({ mobile: "+" + values.mobile }).then((res) => {
                setLoading(false);
                localStorage.setItem("token_forgot", res.data.token)
                if (res.data.code == "200") {
                    toast.success(res.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    navigate('/reset-password', { state: { customer_id: res.data.data.customer_id } })
                } else if (res.data.code === "400") {
                    toast.error(res.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                }
            }).catch((err) => {
                setLoading(false)
            })
        }
    })


    return (
        <>
            <section className="why-us section-bgba forgot_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-forgot-password">
                                        <div className="card-body">

                                            <h5 className="Sign-heading">Forgot Password ?</h5>

                                            <div className="form_login">
                                                <form onSubmit={formik.handleSubmit} noValidate>
                                                    <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                                        <Form.Label>Your Mobile Number<span style={{ color: 'red' }} >*</span></Form.Label>
                                                        <PhoneInput
                                                            onlyCountries={["au", "nz"]}
                                                            country={"au"}
                                                            name="mobile"
                                                            inputStyle={{ border: "none", margin: "none" }}
                                                            inputClass="userPhone w-100"
                                                            defaultCountry={"au"}
                                                            countryCodeEditable={false}
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
                                                    <button variant="primary"
                                                        type="submit"
                                                        className="login_button"
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