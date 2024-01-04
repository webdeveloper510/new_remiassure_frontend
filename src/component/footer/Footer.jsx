import React, { Component, useState } from "react";
import { links, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { generateRandomKey } from "../../utils/hook";
import { debounce } from 'lodash';

const Footer = () => {
    const [accordionOpen, setAccordionOpen] = useState(null);

    const toggleAccordion = (index) => {
        if (accordionOpen === index) {
            setAccordionOpen(null);
        } else {
            setAccordionOpen(index);
        }
    };

    const renderAccordionContent = (data) => {
        return data.map((item, index) => (
            <div key={item.id}>
                <div onClick={() => toggleAccordion(index)}>
                    <NavLink to="#">{item.content}</NavLink>
                </div>
                {accordionOpen === index && (

                    <div>
                        {/* Additional content for the accordion item */}
                    </div>
                )}
            </div>
        ));
    };




    // Navigator Footer Content Start 
    function NavigationFooterArrayObjects() {
        const navigationData = [
            // {
            //     id: 1,
            //     content: "Home",

            // },
            // {
            //     id: 2,
            //     content: "About Us",

            // },
            {
                id: 3,
                content: "What We Do",
            },
            {
                id: 4,
                content: "To The Power of 10",
            },
            {
                id: 5,
                content: "Donate",
            },

        ];

        const NavigationItems = navigationData.map((value) => {
            // console.log(navigationData, "ooook")
            return (
                <li key={value.id}>
                    <NavLink to="#">{value.content}</NavLink>
                </li>
            )
        })

        return (
            <div>
                {NavigationItems}
            </div>
        )
    }
    // Navigator Footer Content End 

    //What We Do Footer content Start
    function WeDoArrayObjects() {
        const data = [
            {
                id: '1',
                title: "Encouraging Testing",
            },
            {
                id: '2',
                title: "Strengthening Advocacy",
            },
            {
                id: '3',
                title: "Sharing Information",
            },
            {
                id: '4',
                title: "Building Leadership",
            },
            {
                id: '5',
                title: "Engaging With Global Fund",
            },
            {
                id: '6',
                title: "Shining a Light",
            },
        ];

        const wedoItems = data.map((element) => {
            return (
                <li key={element.id}>
                    <a href="#">{element.title}</a>
                </li>
            )
        })
        return (
            <div>
                {wedoItems}
            </div>
        )
    }
    //What We Do Footer content End

    //Legal Footer content Start
    function LegalArrayObjects() {
        const legalData = [
            {
                id: 1,
                content: "General Info",
            },
            {
                id: 2,
                content: "Privacy Policy",
            },
            {
                id: 3,
                content: "Terms of Service",
            },
        ];

        const lagalItems = legalData.map((legal) => {
            return (
                <li key={legal.id}>
                    <a href="#">{legal.content}</a>
                </li>

            )
        })
        return (
            <div>
                {lagalItems}
            </div>
        )
    }
    //Legal Footer content End
    const links = () => {
        let user = JSON.parse(localStorage.getItem('remi-user-dt'))
        let token = localStorage.getItem('token')
        if (token && (user?.digital_id_verified === "True" || user?.digital_id_verified === "true")) {
            return `/user-send-money`
        } else if (token && (user?.digital_id_verified === "False" || user?.digital_id_verified === "false")) {
            return "/send-money"
        } else {
            return "/login"
        }
    }
    let location = useLocation()
    let navigate = useNavigate()

    const checkExchangeRate = debounce(() => {

        // Get the target element using document.getElementById
        if (location.pathname !== "/") {
            console.log("helloooo ", location)
            navigate("/");
        }

        setTimeout(() => {
            const targetSectionId = "pay-box";
            const targetElement = document.getElementById(targetSectionId);
            console.log("trannnnn", targetElement)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else {
                console.error(`Element with id "${targetSectionId}" not found.`);
            }
        }, 500)
    }, 200);

    return (
        <>
            {/* <!-- ======= Footer ======= --> */}
            <div className="container-foter">
                <footer id="footer">
                    <div className="footer-top1 desktop-only">

                        <div className="row">




                            <div className="col-lg-3 col-md-3">
                                <h4>Quick Links</h4>

                                <ul>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li> <NavLink to="/sign-up">Signup</NavLink></li>
                                    <li className="exchange-rate-link" style={{ cursor: "pointer" }} onClick={() => checkExchangeRate()}>Check Exchange Rates</li>
                                    <li><NavLink className="exchange-rate-link" to={links()}>Send Money Overseas</NavLink></li>
                                    {/* <NavigationFooterArrayObjects  /> */}
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-3">
                                <h4>Company</h4>
                                <ul>
                                    <li><NavLink to="/about-us">About Us</NavLink></li>
                                    <li> <NavLink to="/working">How It Works </NavLink></li>
                                    <li> <NavLink to="/apps">Mobile Apps</NavLink></li>
                                    {/* <li> <NavLink to="/news">News</NavLink></li> */}
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-3">
                                <h4>Legal</h4>
                                <ul>
                                    <li><NavLink to="/terms-and-condition">Terms And Conditions</NavLink></li>
                                    <li> <NavLink to="/aml-policy">AML Policy </NavLink></li>
                                    <li> <NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                                </ul>

                            </div>

                            <div className="col-lg-3 col-md-3">

                                <h4>Join our newsletter</h4>

                                <div className="newsletterform">
                                    <div className="form-ffoter">
                                        <div class="input-news">
                                            <input type="text" name="name" placeholder="Email address" />
                                        </div>
                                        <div class="button-new">
                                            <div class="btn-con "><button><img src="assets/img/home/nextsli.png" alt="logo" /></button></div>
                                        </div>
                                    </div>
                                    {/* <p className="content-news">In publishing and graphic design, Lorem ipsum is a placeholder text commonly.</p> */}
                                </div>


                            </div>

                        </div>
                    </div>
                    <div className=" footer-top1  mobile-footer">

                        <div className="footer-info1 footer-last-logo mobile--logo">
                            <div className="icon-ffoter">
                                <img src="assets/img/home/footer-logo.webp" className="logo-foo" alt="logo" />


                            </div>
                        </div>
                        <div onClick={() => toggleAccordion(0)}>
                            <h4>Quick Links  {accordionOpen === 0 ? <img src="assets/img/home/up.png"  alt="logo"/> : <img src="assets/img/home/down.png"  alt="logo"/>} </h4>
                        </div>
                        {accordionOpen === 0 && (
                            <ul>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li> <NavLink to="/sign-up">Signup</NavLink></li>
                                <li className="exchange-rate-link" style={{ cursor: "pointer" }} onClick={() => checkExchangeRate()}>Check Exchange Rates</li>
                                <li><NavLink className="exchange-rate-link" to={links()}>Send Money Overseas</NavLink></li>
                                {/* <NavigationFooterArrayObjects  /> */}
                            </ul>
                        )}

                        <div onClick={() => toggleAccordion(1)}>
                            <h4>Company {accordionOpen === 1 ? <img src="assets/img/home/up.png" alt="logo"/> : <img src="assets/img/home/down.png" alt="logo"/>}</h4>
                        </div>
                        {accordionOpen === 1 && (
                            <ul>
                                <li><NavLink to="/about-us">About Us</NavLink></li>
                                <li> <NavLink to="/working">How It Works </NavLink></li>
                                <li> <NavLink to="/apps">Mobile Apps</NavLink></li>
                                {/* <li> <NavLink to="/news">News</NavLink></li> */}
                            </ul>
                        )}







                        <div onClick={() => toggleAccordion(2)}>
                            <h4>Legal {accordionOpen === 2 ? <img src="assets/img/home/up.png" /> : <img src="assets/img/home/down.png" alt="logo"/>}</h4>
                        </div>
                        {accordionOpen === 2 && (
                            <ul>
                                <li><NavLink to="/terms-and-condition">Terms And Conditions</NavLink></li>
                                <li> <NavLink to="/aml-policy">AML Policy </NavLink></li>
                                <li> <NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                            </ul>
                        )}


                        <div onClick={() => toggleAccordion(3)}>
                            <h4>Join our newsletter {accordionOpen === 2 ? <img src="assets/img/home/up.png" alt="logo"/> : <img src="assets/img/home/down.png" alt="logo"/>}</h4>
                        </div>
                        {accordionOpen === 3 && (
                            <div className="newsletterform">
                                <div className="form-ffoter">
                                    <div class="input-news">
                                        <input type="text" name="name" placeholder="Email address" />
                                    </div>
                                    <div class="button-new">
                                        <div class="btn-con "><button><img src="assets/img/home/nextsli.png" alt="logo" /></button></div>
                                    </div>
                                </div>
                                {/* <p className="content-news">In publishing and graphic design, Lorem ipsum is a placeholder text commonly.</p> */}
                            </div>
                        )}
                    </div>

                    <div className="bottom-footer">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="footer-info1 footer-logo">
                                    <div className="icon-ffoter ">
                                        <img src="assets/img/home/mail.png" />

                                    </div>
                                    <div className="infor-content">
                                        <a href="mailto:crm@remitassure.com">crm@remitassure.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="footer-info1 center-content">
                                    <div className="icon-ffoter">
                                        <img src="assets/img/home/footer2.png" alt="logo"/>


                                    </div>
                                    <div className="infor-content">
                                        <a href="https://api.whatsapp.com/send?phone=1300284228" target="_blank">1300 284 228</a>
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-info1 right-content">
                                    <div className="icon-ffoter">
                                        <img src="assets/img/home/footer3.png" alt="logo"/>


                                    </div>
                                    <div className="infor-content">
                                        <a href="tel:1300284228" target="_blank">1300 284 228 (toll free)</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-divder">
                        <div className="borderdevider"></div>
                    </div>


                    <div className="bottom-footer bottom-none">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="footer-info1 footer-last-logo desktop-onlyy">
                                    <div className="icon-ffoter">
                                        <img src="assets/img/home/footer-logo.webp" className="logo-foo" alt="logo" />


                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 footer-linksss">

                                <div className="footer-info1 center-content">
                                    <div className="icon-ffoter">

                                        <ul className="footer-bottom-links">
                                            <li><NavLink to="/terms-and-condition">Terms </NavLink></li>

                                            <li> <NavLink to="/privacy-policy">Privacy</NavLink></li>
                                            <li> <NavLink to="/aml-policy">Aml </NavLink></li>
                                        </ul>



                                    </div>



                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-info1 right-content">
                                    <div className="icon-ffoter">
                                        <div className="social-links ">
                                            <a className="twitter" target="_blank" href="https://twitter.com/remitassure">  <img src="assets/img/home/twiter.svg" alt="logo"/></a>
                                            <a className="facebook" target="_blank" href="https://www.facebook.com/remitassure"><img src="assets/img/home/facebook.svg" alt="logo"/></a>
                                            <a class="instagram" target="_blank" href="https://www.instagram.com/media.remitassure/"><img src="assets/img/home/ig.svg" alt="logo"/></a>
                                            <a className="instagram" target="_blank" href="https://www.linkedin.com/company/remitassure/"><img src="assets/img/home/Linkedin Logo.svg" alt="logo"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container pt-4">
                                <div class="row reserved_content">
                                    <div class="copyright">&copy; Copyright &nbsp;
                                        <strong>
                                            <span>Remit-Assure</span>
                                        </strong>. All Rights Reserved
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                </footer>
            </div>
            {/* <!-- ======= End-footer ======= --> */}
        </>
    )
}


export default Footer;