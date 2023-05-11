import React, { useEffect, useState, useRef, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';



import { toast } from 'react-toastify';
import validate from "../../pages/FormValidationRules";
import { userRegister } from "../../utils/Api";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import { Modal } from "react-bootstrap";
import { BsCheck, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";




const Signup = () => {

    const search = useLocation()
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState({ toggle: false, value: "", type: "", navigate: "" })

    const initialValues = {
        location: "",
        email: "",
        password: "",
        confirmPassword: "",
        referral_code: "",
        mobile: ""
    }

    const signSchema = Yup.object().shape({
        location: Yup.string().oneOf(['Australia', 'New Zealand']).required(),
        email: Yup.string().email().min(6).max(50).required("Email is required"),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/, 'Password must contain uppercase, lowercase, symbols, digits, minimum 6 characters').required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords did not match").required("Password confirmation is required"),
        referral_code: show ? Yup.string().length(7).required() : Yup.string().length(7).notRequired(),
        mobile: Yup.string().min(7).max(15).required()
    })

    const formik = useFormik({
        initialValues,
        validationSchema: signSchema,
        onSubmit: async (values) => {
            setLoading(true)
            let data = {}
            if (values.referral_code) {
                data = { location: values.location, email: values.email, mobile: values.mobile, password: values.password, confirmPassword: values.confirmPassword, referral_code: values.referral_code, promo_marketing: promo_marketing }
            } else {
                data = { location: values.location, email: values.email, mobile: values.mobile, password: values.password, confirmPassword: values.confirmPassword, promo_marketing: promo_marketing }
            }
            userRegister(data).then((res) => {
                // console.log('vija-----', res)
                if (res.code === "200") {
                    // setModalShow({ toggle: true, value: "Registration successful", type: "success", navigate:"/verification" })
                    localStorage.setItem("remi-user-dt", JSON.stringify(res?.data))
                    toast.success("Registration Successful", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    navigate("/verification", { state: { email: values.email } })

                } else if (res.code == '400') {
                    toast.error(res.message + ", please login", { position: "bottom-right", autoClose: 2000, hideProgressBar: true });

                }
                else if (res.code == '201') {
                    // setModalShow({ toggle: true, value: res.message + ", please login", type: "error", navigate:"/login" })
                    toast.error(res.message + ", please login", { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
                    navigate("/verification", { state: { email: values.email } })
                }

                setLoading(false)
            }).catch((error) => {
                console.log(error.response)
                if (error.response.code == "400") {
                    setModalShow({ toggle: true, value: error.response.message, type: "error" })
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
        // console.log('show=============>', show)
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
        // console.log(term, "termterm")
        if (term) {
            setrReferral_code(term)
            setShow(true)
            // console.log(referral_code, "referral_codereferral_codereferral_code");


        }

        // console.log(show)

    }, [referral_code, show]);
    const handlePromo_marketing = (e) => {
        const { checked } = e.target;
        if (checked) {
            setPromo_marketing("1")

        } else {
            setPromo_marketing("0")

        }
        // console.log("checked " + checked);
    };
    // const handleHide = () =>{
    //     setModalShow({...modalShow, toggle:false})
    //     if(modalShow.navigate){
    //         if(modalShow.navigate==="login"){
    //             navigate("/login")
    //         } else {
    //             navigate("/verification",{state:{email:formik.values.email}})
    //         }
    //     }
    // }

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
                            {/* start-- card */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-signup">
                                        <div className="card-body">


                                            <h5 className="Sign-heading">Sign Up</h5>
                                            <div className="form_signup">

                                                <form onSubmit={formik.handleSubmit}>

                                                    <Form.Label>Where are you sending money from?<span style={{ color: 'red' }} >*</span></Form.Label>

                                                    <Form.Group className="mb-3 form_label">
                                                        <Form.Label>Location<span style={{ color: 'red' }} >*</span> </Form.Label>
                                                        <Form.Select
                                                            name="location"
                                                            {...formik.getFieldProps('location')}
                                                            className={clsx(
                                                                'form-control bg-transparent',
                                                                { 'is-invalid': formik.touched.location && formik.errors.location },
                                                                {
                                                                    'is-valid': formik.touched.location && !formik.errors.location,
                                                                }
                                                            )}
                                                        >
                                                            <option value="">--- Select Location ---</option>
                                                            <option value="Australia">Australia</option>
                                                            <option value="New Zealand">New Zealand</option>

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
                                                            country={"au"}
                                                            name="mobile"
                                                            inputStyle={{ border: "none", margin: "none" }}
                                                            inputClass="phoneInp"
                                                            defaultCountry={"au"}
                                                            onChange={mno => { formik.setFieldValue('mobile', mno); formik.setFieldTouched('mobile', true) }}
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
                                                            defaultChecked={promo_marketing.Active} // <-- set the checked prop of input\

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
                                                        <NavLink to="/login">Sign in</NavLink>
                                                    </p>
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
                {/* <Modal show={modalShow.toggle} onHide={() => { handleHide() }}
                    centered
                >

                    <Modal.Body className="text-success text-center py-5">
                        <BsCheckCircleFill color="green" className="fs-1" />
                        <p className="fs-5 text-success text-center fw-bold mt-3">{modalShow.value}</p>
                    </Modal.Body>
                </Modal> */}
            </section>
            {/* </>
                )
            } */}

            {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}


        </>

    )
}



export default Signup;