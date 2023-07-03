import React from "react";
import { NavLink } from 'react-router-dom';


const Footer = () => {

    return (
        <>
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-1 col-md-6 footer-links">
                                <img src="assets/img/home/footer-logo.svg" alt="imge_footer_icons" className="footer_icon" />
                            </div>


                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Quick Links</h4>

                                <ul>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li> <NavLink to="/sign-up">Signup</NavLink></li>
                                    <li><NavLink to="/">Check Exchange Rates</NavLink></li>
                                    <li><NavLink to="/send-money">Send Money Overseas</NavLink></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Company</h4>
                                <ul>
                                    <li><NavLink to="/about-us">About Us</NavLink></li>
                                    <li> <NavLink to="/working">How It Works </NavLink></li>
                                    <li> <NavLink to="/apps">Mobile Apps</NavLink></li>
                                    <li> <NavLink to="/news">News</NavLink></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Legal</h4>
                                <ul>
                                    <li><NavLink to="/terms-and-condition">Terms And Conditions</NavLink></li>
                                    <li> <NavLink to="/aml-policy">AML Policy </NavLink></li>
                                    <li> <NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                                </ul>

                            </div>

                            <div className="col-lg-3 col-md-6 footer-info">

                                <h4>Contact Us</h4>
                                <li className="suppot_footer">
                                    <img src="assets/img/footer/email.svg" alt="emai_icons" className="email_icons" />
                                    <a href="mailto:service@gemitassure.com" target="_blank">
                                        <p>service@remitassure.com </p>
                                    </a>
                                </li>

                                <li className="suppot_footer">
                                    <img src="assets/img/footer/phone.svg" alt="phone_icons" className="phone_icons" />
                                    <a href="tel:+61 1300 284 228">
                                        <p>+61 1300 284 228</p>
                                    </a>
                                </li>
                                <div className="social-links mt-3">
                                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="Smartitude_content">
                                Smartitude
                            </div>
                        </div>

                        <div className="col-lg-10  reserved_content">

                            <div className="copyright">
                                &copy; Copyright <strong><span>Remit-Assure</span></strong>. All Rights Reserved
                            </div>
                        </div>
                    </div>


                    <div className="credits">

                    </div>
                </div>
            </footer>
        </>
    )
}


export default Footer;