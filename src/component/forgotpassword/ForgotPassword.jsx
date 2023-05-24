import React, {  useState } from "react";

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
    const initialValues = {mobile:""}

  

    const handlePhone = (val) => {
        formik.setFieldValue('mobile', val);
        formik.setFieldTouched('mobile', true);
    }

    const forgetSchema = Yup.object().shape({
        mobile: Yup.string().min(10).max(18).required()
    })

    let sessionID;
    setTimeout(
        function () {
            sessionID = localStorage.getItem("SessionID");
        }, 3000
    );

    const formik = useFormik({
        initialValues,
        validationSchema: forgetSchema,
        onSubmit: async (values) => {
            setLoading(true);
            resetEmail({ mobile: "+"+values.mobile}).then((res) => {
                setLoading(false);
                localStorage.setItem("token_forgot", res.token)
                localStorage.setItem("customerId_forgot", res.customer_id);
                navigate('/reset-passwords', { state: { customer_id: res.data.customer_id } })
                if (res.code == "200") {
                    toast.success("Please Check For Otp", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                }
                else if( res.code=="400"){
                    console.timeLog(res)
                }
            }).catch((err) => {
                console.log(err)
                // if (error.response.code == 400) {
                //     toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                // }
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
                                                            inputClass="phoneInp"
                                                            defaultCountry={"au"}
                                                            onChange={(val) => { handlePhone(val) }}
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