import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from "../../utils/Api";
import { toast } from "react-toastify";
import UserContext from '../context/UserContext';
import Page404 from "../pageNotfound/Page404";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import validate from "../../pages/FormValidationRules";
{/* start -- css*/ }
const myStyle = {
    color: "red",
    fontSize: "13px",
    textTransform: "capitalize",
    marginTop: "4px",
    display: "block",
    textAlign: "left"
}
{/* End -- css*/ }

const Login = () => {

    

    const token = localStorage.getItem("token");
    // console.log("TOKEN", token);

    const signup_token = localStorage.getItem("signup_token")
    // console.log("signup_token", signup_token);

    const verification_otp = localStorage.getItem("verification_otp");
    // console.log("Verification Message", verification_otp);

    const DigitalCode = localStorage.getItem("DigitalCode");
    // console.log("DigitalCode", DigitalCode);

    const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
    // console.log("LoginDigitalidVerified", LoginDigitalidVerified)

    /**************************State ************************ */
    const [data, setData] = useState({email:'', password:''})
    const [error, setError] = useState({emailErr:"", passwordErr:""})
    const [promo_marketing, setPromo_marketing] = useState(false);
    const [loading, setLoading] = useState(false);

    /****************Show hide password state********************** */
    const [showPassword, setShowPassword] = useState(false);

    /****************Show hide password functionality********************** */
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);

    const navigate = useNavigate();
    const notify = () => toast.success("Logged In Successfully!");
    const wrongData = () => toast.warn("Login or Password is Wrong!");
    const emailExits = () => toast.error("Please fill out all the fields");



    const handlePromo_marketing = (e) => {
        const { checked } = e.target;

        console.log("checked " + checked);

        setPromo_marketing((promo_marketing) => ({
            ...promo_marketing, // <-- shallow copy previous state
            Active: checked // <-- set new Active checked value
        }));
    };

    const handleEmail =(e)=>{
        let value = e.target.value
        setData({...data, email:e.target.value})
        let validateErr = validate({
         email:value
        })
         if(value == ""){
             setError({...error,emailErr:validateErr})
         }else{
             setError({...error,emailErr:""})
         } 
    }

    const handlePassword =(e)=>{
        setData({...data, password:e.target.value})
        let value = e.target.value
        let validateErr = validate({
        login_password:value
        })
         if(value == ""){
             setError({...error,passwordErr:validateErr})
         }else{
             setError({...error,passwordErr:""})
         }  
    }


    const handleLogin = () => {

        console.log('handleLogin++++')
        setLoading(true);

        var validateErr = validate({
            email: data.email,
            login_password: data.password,
        });
        setError({emailErr:validateErr , passwordErr:validateErr})

        if (Object.keys(validateErr).length == 0) {
            userLogin(data).then((res)=>{
                if(res.code == 200){
                    toast.success('Login Successfully', { position: "top-right", autoClose: 2000, theme: "colored" });

                    localStorage.setItem("token", res.token.access);
        //         localStorage.setItem("LoginDigitalidVerified", response.data.is_digitalid_verified)
                    navigate('/send-money');
                }
                setLoading(false);
        }).catch((err)=>{
                setLoading(false);
                console.log('catch-errr', err.response)
                console.log('catch-errr', err.response.data.code)
                if(err.response.data.code === '400'){
                    toast.error('Credetionals Does not match', { position: "top-right", autoClose: 2000, theme: "colored" });
                }
            })
                
        }else{
            console.log('valid', error)
            setLoading(false);
        }

    }


    return (
        <>
            {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
            {/* {
                token || DigitalCode != undefined || '' ? (
                    <>
                        <Page404 />
                    </>
                ) : (
                    <> */}
                        <section className="why-us section-bgba login_banner">
                            <div className="container">
                                <div className="row">
                                    {/* <div className="col-lg-6">
                                <div className="support_image">
                                    <img src="assets/img/help/help_img02.png" alt="support_images" />
                                </div>
                            </div> */}

                                    <div className="col-lg-12">
                                        {/* start-- card */}
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card card-login">
                                                    <div className="card-body">
                                                        {/* <span style={myStyle}>{VerifydigtalidText? VerifydigtalidText: ''}</span> */}
                                                        <h5 className="Sign-heading">Login</h5>

                                                        <div className="form_login">
                                                            <form>
                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label>Your Email<span style={{ color: 'red' }} >*</span></Form.Label>
                                                                    <Form.Control type="email"
                                                                        // value={email}
                                                                        // onChange={handleEmail}
                                                                        onChange={(e)=> handleEmail(e)}
                                                                        placeholder="Enter email"
                                                                    />
                                                                    <span style={myStyle}>{error.emailErr?.email ? error.emailErr.email : ""}</span>
                                                                </Form.Group>

                                                                <Form.Group className="mb-3 form_label">
                                                                    <Form.Label> Your Password<span style={{ color: 'red' }} >*</span></Form.Label>
                                                                    <Form.Control
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        id="password"
                                                                        name="password"
                                                                        // value={password}
                                                                        onChange={(e)=> handlePassword(e)}
                                                                        placeholder="Password"
                                                                    />
                                                                    <span className="pass_icons" type="button" onClick={toggleShowPassword}>
                                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                                    </span>
                                                                    <span style={myStyle}>{error.passwordErr?.login_password ? error.passwordErr.login_password : ""}</span>

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
                                                                        <NavLink className="forgot_pass" to="/forgotpassword"> Forgot password?</NavLink>
                                                                    </div>
                                                                </div>

                                                                <button variant="primary"
                                                                    type="button"
                                                                    className="login_button"
                                                                    onClick={handleLogin}
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
                                                                    <NavLink to="/signup">Sign up</NavLink>
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
                        </section>
                    </>
        //         )
        //     }

        //     {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}


        // </>

    )
}



export default Login;