import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Scrollbar from '../referralscrollbar/ReferralScrollbar';

import global from "../../utils/global";
import axios from "axios";
// import Scrollbar from "../scrollbar/Scrollbar";



// card carousel start
const Card = (props) => {
    return (
        <li className="card li_card ">
            <img src="assets/img/referral/Group.svg" alt="quote-up" className="Group_icons" />
            <div className="row">
                <div className="col-md-12">
                    <div class="testimonial-text">
                        <p className="material_heading_card">{props.paragraph}</p>
                        <img src={props.crad_icons} alt="group_card" className="group_card_icon" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-12 testimonial-client">
                    <div class="testimonial-inner">
                        <img src="assets/img/referral/girl.svg" alt="boy_icons" className="testimonial-icons" />
                        <h3 className="kevin_content">Kevin Rich</h3>
                        <p className="testimonial_icons_text">Lorem Ipsum is simply</p>
                    </div>
                </div>
            </div>
            {/* <img src="assets/img/home/quote-down.png" alt="quote-up" className="quotdown_icons" />    */}
        </li>
    )
}


const Referral = () => {

    const token = localStorage.getItem("token");
    // console.log("TOKEN", token);

    const signup_token = localStorage.getItem("signup_token")
    // console.log("signup_token", signup_token);

    const verification_otp = localStorage.getItem("verification_otp");
    // console.log("Verification Message", verification_otp)

    /**************************Recipient of state ************************ */
    const [dataRefferal, setDataRefferal] = useState([]);


    /**************************************************************************
   * ************** Start  Start Referral Code ********************
   * ***********************************************************************/

    useEffect(() => {
        axios.post(global.serverUrl + '/referral-link/', {}, {
            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,
            }
        })
            .then(function (response) {
                //   console.log("Recipients APIIIII", response.data);
                setDataRefferal(response.data);
            })
            .catch(function (error) {
            })
    }, [])

    // Social Function start
    function SocialArrayObjects() {
        const socialdata = [
            {
                id: 1,
                links: "https://twitter.com/remitassure",
                src: "assets/img/referral/twitter.svg"
            }, {
                id: 2,
                links: "https://www.facebook.com/remitassure",
                src: "assets/img/referral/facebook.svg"
            },
            {
                id: 3,
                links: "https://www.instagram.com/media.remitassure/",
                src: "assets/img/referral/instagram.svg"
            },
            {
                id: 4,
                links: "https://www.linkedin.com/company/remitassure/",
                src: "assets/img/referral/linkedin.svg"
            },

        ];

        const socialItems = socialdata.map((social) => {
            return (
                <li>
                    <div>
                        <a href={social.links} target="_blank" >
                            <img src={social.src} alt="can't show image" />
                        </a>
                    </div>
                </li>
            )
        });
        return (
            <div>
                {socialItems}
            </div>
        )
    }
    // Social Function End

    //    Why Function Start 
    function WhyIconsRenderingArrayOfObjects() {
        const whydata = [
            {
                id: "1",
                icon_src: "assets/img/referral/Vector01.svg",
                icon_title: "We're Secure",
                icon_content: "We use industry-leading technology to secure your money.",

            },
            {
                id: "2",
                icon_src: "assets/img/referral/Vector02.svg",
                icon_title: "We're Fast",
                icon_content: "95% of our transfers are completed in minutes…",

            },
            {
                id: "3",
                icon_src: "assets/img/referral/Vector04.svg",
                icon_title: "We’re Cost-effective",
                icon_content: "Our rates are competitive compared to banks and other remittance services.",

            },
            {
                id: "4",
                icon_src: "assets/img/referral/Vector03.svg",
                icon_title: "We’re Innovative",
                icon_content: "We're committed to researching new ideas and technology to serve you better.",

            },
        ];
        const ArrayIconsIttems = whydata.map((icon) => {
            return (

                <li>
                    <div className="circle-icons">
                        <img src={icon.icon_src} alt="circle-image" />
                    </div>
                    <div className="circle-content">
                        <p className="why_text">{icon.icon_title}</p>
                        <p className="why_texto1">{icon.icon_content}</p>
                    </div>

                </li>

            )
        })
        return (
            <div>
                {ArrayIconsIttems}
            </div>
        )
    }


    //    Why Function Start 

    const items = [

        {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }, {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }, {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }, {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }, {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }, {
            crad_icons: "assets/img/referral/Group_star.png",
            paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }
    ];
    const [moveClass, setMoveClass] = useState('');
    const [carouselItems, setCarouselItems] = useState(items);
    //console.log(items, "carouselItemscarouselItemscarouselItemscarouselItemscarouselItems")

    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])

    const handleAnimationEnd = () => {
        if (moveClass === 'prev') {
            shiftNext([...carouselItems]);
        } else if (moveClass === 'next') {
            shiftPrev([...carouselItems]);
        }
        setMoveClass('')
    }

    const shiftPrev = (paragraph) => {
        let lastcard = paragraph.pop();
        paragraph.splice(0, 0, lastcard);
        setCarouselItems(paragraph);
    }

    const shiftNext = (paragraph) => {
        let firstcard = paragraph.shift();
        paragraph.splice(paragraph.length, 0, firstcard);
        setCarouselItems(paragraph);
    }

    // End carousel End

    return (
        <>
            {/* <!-- ======= GBP for friends Remitassur -Section  start======= --> */}
            <section className="why-us section-bgba help_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="content_referral">
                                <h3 className="gbp_friends text-bold">50 AUD for You and<br /> 25 AUD for your Friends</h3>
                                <p className="gbp_paragraph">Once they’ve sent AUD 100 or more, <br />you’ll be emailed a AUD 50 RemitAssure Voucher</p>
                            </div>

                        </div>

                        <div className="col-lg-6">
                            <div className="support_image">
                                <img src="assets/img/referral/img01.svg" alt="support_images" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <!-- ======= GBP for friends Remitassur -Section  End======= --> */}


            {/* <!-- ======= How do I refer a friend? Remitassur -Section  start======= --> */}
            <section className="why-us section-bgba referal-section">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="vl04">
                                <h1 className="vl-heading">How do I refer a friend?</h1>
                            </div>
                            <p className="refer_content">Follow these 4 easy steps</p>
                        </div>
                    </div>


                    <div className="timeline desktop_timeline">

                        <div className="timeline-content col-lg-3">
                            <p className="timeline-text odd">Sign up</p>

                            <div className="popup_content odd-text">
                                <p className="signup_content">1</p>

                            </div>
                        </div>
                        <div className="timeline-content col-lg-3">
                            <div className="popup_content even-text">
                                <p className="signup_content">2</p>
                            </div>
                            <p class="timeline-text even">Transfer Funds</p>
                        </div>
                        <div className="timeline-content col-lg-3">
                            <p class="timeline-text odd"> Share your referral code with family and friends</p>
                            <div className="popup_content odd-text">
                                <p className="signup_content">3</p>
                            </div>
                        </div>
                        <div className="timeline-content col-lg-3">

                            <div className="popup_content even-text">
                                <p className="signup_content">4</p>
                            </div>
                            <p class="timeline-text even"> When they sign up and send funds through their account, you both receive a voucher</p>
                        </div>

                    </div>


                    <div className="timeline mobile_timeline">

                        <div className="timeline-content col-lg-3">
                            <p className="timeline-text odd">Sign up</p>

                            <div className="popup_content odd-text">
                                <p className="signup_content">1</p>

                            </div>
                        </div>
                        <div className="timeline-content col-lg-3">
                            <p class="timeline-text odd">Transfer Funds</p>
                            <div className="popup_content odd-text">
                                <p className="signup_content">2</p>
                            </div>

                        </div>
                        <div className="timeline-content col-lg-3">
                            <p class="timeline-text odd"> Share your referral code with family and friends</p>
                            <div className="popup_content odd-text">
                                <p className="signup_content">3</p>
                            </div>
                        </div>
                        <div className="timeline-content col-lg-3">
                            <p class="timeline-text odd"> When they sign up and send funds through their account, you both receive a voucher</p>
                            <div className="popup_content odd-text">
                                <p className="signup_content">4</p>
                            </div>
                        </div>
                    </div>
                    {
                        verification_otp || token != undefined || '' ? (
                            <div className="referal_code">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="share_referal_code">Share your unique referral code:</p>

                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                value={dataRefferal.referrallink}
                                                id="myInput" className="copy_input"
                                            />
                                            <button variant="outline-secondary" id="button-addon2" className="button_copy">
                                                Copy
                                            </button>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="social_links_change"></div>
                            </>
                        )
                    }

                    {/* <div className="referal_code">
                      <div className="row">
                          <div className="col-lg-12">
                              <p className="share_referal_code">Share your unique referral code:</p>
  
                              <InputGroup className="mb-3">
                                  <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" value="275878274565826758367" id="myInput" className="copy_input" />
  
                                  <button variant="outline-secondary" id="button-addon2" className="button_copy">
                                      Copy
                                  </button>
                              </InputGroup>
                          </div>
                      </div>
                  </div>
                             */}
                    <div className="row social_links_change" >
                        <div className="col-lg-12">
                            <p className="share_content ms-3">Find us on</p>
                            <div className="social_icons">
                                <ul className="social-media-icons">
                                    < SocialArrayObjects />
                                </ul>
                            </div>

                            {/* <div className="view-button">
                                <button className="btn btn find_button">Find out more</button>
                            </div> */}
                            <div className="terms_content">
                                <p>*T&Cs apply. <span> <Link to="/terms-and-condition"> See terms and conditions</Link></span> for details*</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ======= How do I refer a friend? Remitassur -Section  End======= --> */}

            {/* <!-- ======= Why RemitAssure Remitassur -Section  start======= --> */}
            <section className="why-us section-bgba why_banner">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-12">

                            <div className="vl05">
                                <h1 className="why-heading">Why RemitAssure ?</h1>
                            </div>
                            {/* <p className="why_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p> */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <ul className="why-ramit-assure">
                                < WhyIconsRenderingArrayOfObjects />
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ======= Why RemitAssure Remitassur -Section  End======= --> */}


            {/* <!-- ======= Testimonial-Section  start======= --> */}
            <section className="why-us section-bgba testimonials">
                <div className="container">
                    {/* main row start*/}
                    <div className="row">
                        <div className="testimonial_vl">
                            <h1 className="chose-heading">Testimonial</h1>
                            {/* <div className="button_icons_referral">
                        <button className="btn btn prev left_icon" onClick={() => setMoveClass('prev')}>
                        <i className="bx bx-chevron-left prev_button"></i>
                        </button>
                        <button className="btn btn next right_icon"   onClick={() => setMoveClass('next')}>
                        <i className="bx bx-chevron-right "></i>
                        </button>
                    </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <label className="review_content">Reviews 66,081 · Great
                                <span className="line_drow"></span>
                            </label>
                            <img src="assets/img/referral/Group_star.png" alt="group_image" className="group_image" />
                            <label className="button_rating" >4.1</label>
                        </div>
                        {/* <div className="col-lg-9">
                        <img src="assets/img/referral/Group_star.png" alt="group_image" className="group_image" />
                        <label className="button_rating" >4.1</label>
                    </div> */}
                    </div>
                    {/* carousel start  */}
                    <div className="row">
                        <div className="col-col-lg-12 referal_testimonial my-4">
                            {/* <div className="carouselwrapper module-wrapper">
                        <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
                            {carouselItems.map((t, index) => 
                            <Card key={t.paragraph + index} crad_icons={t.crad_icons} paragraph={t.paragraph} />
                            )}
                        </ul>
                        </div>      */}
                            <Scrollbar />
                        </div>
                    </div>
                    {/* carousel End  */}
                    {/* main row  End*/}
                </div>
            </section>
            {/* <!-- ======= Home Testimonial-Section End ======= --> */}


            {/* <!-- ======= Fast-security RemitAssure-Section start ======= --> */}
            <section className="why-us section-bg referal_apps" style={{ backgroundColor: "rgba(232, 240, 255, 1) !important" }}>
                <div className="container">
                    {/* -----======= first row End ====--- */} {/* -----======= second row start ====--- */}
                    <div className="row">
                        <div className="col-lg-6 right_sections01">
                            <img src="assets/img/home/img03.svg" alt="background-images" />
                        </div>

                        <div className="col-lg-6 better_sections">
                            {/* <div className="vl">
                                    <h1 className="vl-heading">A Better Way</h1>
                                    <h1 className="vl-heading01">To Send Money ?</h1>
                                </div> */}

                            {/* <div className="vl-content">
                                    <p className="vl-paragraph">
                                        Download our app for free to send money online in minutes to over 130 other countries. Track your payments and view your transfer history from anywhere.
                                    </p>
                                </div> */}

                            <div className="fw-semibold mt-4 display-3" style={{ color: "#6414E9" }}>
                                Coming Soon
                            </div>
                            <div className="link my-0">
                                <div className="left_link">
                                    <img src="assets/img/home/playstore.svg" alt="home_icons" className="home_icons" />
                                </div>
                                <div className="rihjt_link">
                                    <img src="assets/img/home/appstore.svg" alt="home_icons" className="home_icons" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* -----======= second row End ====--- */}
                </div>

            </section>
            {/* <!-- ======= Fast -security RemitAssure-Section End ======= --> */}





        </>

    )
}



export default Referral;