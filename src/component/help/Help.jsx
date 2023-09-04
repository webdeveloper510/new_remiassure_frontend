import React, { useEffect, useState } from "react";
import Img from "react-image";
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink } from "react-router-dom";
import { RxLinkedinLogo } from "react-icons/rx";

const Help = () => {

  const [input_content, setInput_content] = useState('Search')


  // start objects RenderingArrayOfObjects
  function RenderingArrayOfObjects() {
    const data = [
      {
        id: 1,
        name: "How it works",
        src: "assets/img/help/icon01.svg",
        link: "/working"
      },

      {
        id: 2,
        name: "FAQ",
        src: "assets/img/help/Shape.svg",
        link: "#faq"
      },
      {
        id: 3,
        name: "My Account",
        src: "assets/img/help/contact01.svg",
        link: "/dashboard"
      }
    ];

    const listItems = data.map(
      (element) => {
        return (

          <ul className="list- help_ul">
            <NavLink to={`${element?.link}`} style={{ color: "#0b0e2e" }}>
              <li className="">
                <div className="support-image">
                  <img src={element.src} alt="can't show image" />
                </div>
                <div className="circle-content">
                  <p style={{ color: "#0b0e2e" }}>{element.name}</p>
                </div>
              </li>
            </NavLink>
          </ul >

        )
      }
    )
    return (
      <div>
        {listItems}
      </div>
    )
  }
  // start objects RenderingArrayOfObjects

  // start Accordion functionality section 
  function AccordionArrayOfObjects() {
    const dataarray = [
      {
        id: 1,
        title: "Common Problems",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 2,
        title: "Cancellations & Refunds",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 3,
        title: "Where's my money?",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 4,
        title: "Send money to over 130 countries with remitassure",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 5,
        title: "Getting started with remitassure ",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 6,
        title: "How to stay safe online - our security guide ",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 7,
        title: "Refer a friend ",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 8,
        title: "Money Not Received ",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 9,
        title: "Payments",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 10,
        title: "Troubleshooting",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },

      {
        id: 11,
        title: "Identity Verification",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 12,
        title: "New Remitassure mobile app",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },

    ];
    const accordionItems = dataarray.map((value) => {
      return (
        <Accordion className="help-accordian">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{value.title}</Accordion.Header>
            <Accordion.Body>
              {value.content}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      )
    })
    return (
      <div>
        {accordionItems}
      </div>
    )
  }
  // End Accordion functionality section 
  const linking = () => {
    let user = JSON.parse(localStorage.getItem('remi-user-dt'))
    let token = localStorage.getItem('token')
    if (token && (user?.digital_id_verified === "True" || user?.digital_id_verified === "true")) {
      return "/dashboard"
    } else if (token && (user?.digital_id_verified === "False" || user?.digital_id_verified === "false")) {
      return "/send-money"
    } else {
      return "/login"
    }
  }

  return (
    <>

      {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
      <section className="why-us section-bgba help_banner">
        <div className="container">

          <div className="support_image help_support">
            <img src="assets/img/help/suport.svg" alt="support_images" />
          </div>


          {/* start-- card */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-support">
                <div className="card-body">
                  <h5 className="Support-heading">Remitassure Support Center</h5>
                  {/* <p className="Support-paragraph">Hi, How can we help you?</p>

                  <div className="search-div">
                    <input type="text" className="search_input" />
                  <img src="assets/img/help/search.svg" alt="serch_img" className="serch_img" />
                                    <span className="serch_content"> {input_content}</span> 
                  </div> */}

                  <div className="row justify-content-center my-4 py-4">
                    <div className="col-md-3 col-lg-3">
                      <NavLink to={`/working`} style={{ color: "#0b0e2e" }}>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="support-image">
                            <img src={"assets/img/help/icon01.svg"} alt="can't show image" />
                          </div>
                          <div className="circle-content">
                            <p style={{ color: "#0b0e2e" }}>How it works</p>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <a href="#faq">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="support-image">
                            <img src={"assets/img/help/Shape.svg"} alt="can't show image" />
                          </div>
                          <div className="circle-content">
                            <p style={{ color: "#0b0e2e" }}>FAQ's</p>
                          </div>
                        </div>
                      </a>
                    </div >
                    <div className="col-md-3 col-lg-3">
                      <NavLink to={linking()} style={{ color: "#0b0e2e" }}>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="support-image">
                            <img src={"assets/img/help/contact01.svg"} alt="can't show image" />
                          </div>
                          <div className="circle-content">
                            <p style={{ color: "#0b0e2e" }}>My Account</p>
                          </div>
                        </div>
                      </NavLink>
                    </div >
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* End-- card */}



        </div>
      </section >
      {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}

      {/* <!-- ======= Frequently asked questions FAQs  start======= --> */}
      <section id="faq" className="why-us section-bgba">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="support-vl02">
                <h1 className="vl-support" >Frequently asked questions FAQs</h1>
              </div>
              <div className="accrodion_contents">
                <AccordionArrayOfObjects />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="help_image">
                <img src="assets/img/help/help_img01.svg" alt="help_img01" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h3 className="answer-heading">Can't find your answers?</h3>
              <p className="answer-paragraph">We're here 24 hours a day, 7 days a week to support you.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="view-button">
                <a href="tel:1300284228">
                  <button className="btn btn call_button">Contact Us</button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* <!-- ======= Help Frequently asked questions FAQs End-Section ======= --> */}


    </>
  )
}

export default Help; 
