import React, { useEffect, useState } from "react";
import Img from "react-image";
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink } from "react-router-dom";
import { RxLinkedinLogo } from "react-icons/rx";

const Help = () => {

  const [input_content, setInput_content] = useState('Search')

  const transferLinks = () => {
    let user = JSON.parse(localStorage.getItem('remi-user-dt'))
    let token = localStorage.getItem('token')
    if (token && (user?.digital_id_verified === "True" || user?.digital_id_verified === "true")) {
      return "/user-send-money"
    } else if (token && (user?.digital_id_verified === "False" || user?.digital_id_verified === "false")) {
      return "/send-money"
    } else {
      return "/login"
    }
  }
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
        title: "Why RemitAssure?",
        content: "RemitAssure leverages cutting edge digital technologies and an ecosystem of proven global partners to provide seamless, secure, cost-effective and speedy global payments.",
      },
      {
        id: 2,
        title: <>Is RemitAssure a safe platform to transfer money overseas?</>,
        content: "Absolutely! We conform to the highest standards of cyber security to safeguard your transactions, including encryption, ID verification, fraud detection, etc. The security of your transactions and personal information is our top priority.",
      },
      {
        id: 3,
        title: "How long does money transfer take on our platform?",
        content: "We’re committed to offering our customers reliable and efficient services. Depending on the destination, our transactions are concluded in a matter of minutes.",
      },
      {
        id: 4,
        title: "What currencies and countries does RemitAssure support for money transfers?",
        content: <>RemitAssure supports a wide range of currencies and an extensive set of countries. Check our supported countries:<br />
          Nigeria, Ghana, Kenya, Phillipines, Thiland, Vietnam</>,
      },
      {
        id: 5,
        title: "How much does it cost to send money through RemitAssure?",
        content: "RemitAssure’s lean digital business model affords competitive margin that we pass on to our customers. Our exchange rates are substantially cheaper than our competition’s and offer free payment options to our customers.",
      },
      {
        id: 6,
        title: "Can I track the status of my money transfer through RemitAssure?",
        content: "Yes, our tracking feature allows you to monitor your transfer's progress and receive notifications at every stage, providing peace of mind throughout the process.",
      },
      {
        id: 7,
        title: "Are there any transfer limits? ",
        content: "Yes, RemitAssure has daily transfer limits for security and compliance. Limits vary based on factors such as user profile and destination. Contact us for specific limits or exceptions.",
      },
      {
        id: 8,
        title: "What should I do if the money I sent through RemitAssure is not received by the recipient?",
        content: <>RemitAssure fully guarantees safely transferring funds to your beneficiary.We are committed to providing a reliable money transfer process.If for some exigency, your recipient has not received their funds within our operational timeframe, please contact our <a href="#support-centre">Support Centre</a> for help.We will diligently track and update you on the status of your transfer..</>,
      },
      {
        id: 9,
        title: "How can I get in touch with RemitAssure's customer support if I have questions or issues?",
        content: <>We are available support you 24/7 online through our digital Channels.Please contact us through our <a href="#support-centre">Support Centre</a>.We can also be contacted during office hours on 1300 284 228.</>,
      },
      {
        id: 10,
        title: "How do I make a transfer?",
        content: <>To make a transfer , you need to <Link to="/sign-up">create an account</Link> and you will be redirected to make your first transaction page. Select a method to send money , fill in the relevant details and verify your identity then finalize your transaction.</>,
      },

      {
        id: 11,
        title: "How do I make payment for my transfer?",
        content: <>RemitAssure provides its user with 3 different methods to make payment:
          <ul>
            <li>Debit/Credit card ,</li>
            <li>PayID per user(only for Australian users) </li>
            <li> PayTo agreements(only for Australian users) </li>
          </ul>
          Go to <Link to={transferLinks()} >New Transfer</Link> enter the relevant details and select one of the above method on Choose a payment method page.
        </>,
      },
      // {
      //   id: 12,
      //   title: "How do I refer family and friends?",
      //   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // },
      {
        id: 13,
        title: "Why did my transfer fail?",
        content: <>Although RemitAssure provides best services to make a secure and successful transfer. But sometimes user may encounter transaction failure and there could be serval reasons for it:
          <ul>
            <li>Invalid Card information.</li>
            <li>Insufficient balance.</li>
            <li>Agreement not approved or cancelled on banking portal.(for Austrailian users only)</li>
            <li>Transfer rejected by respective bank</li>
          </ul>
        </>,
      },
      {
        id: 14,
        title: "What information do I need to transfer funds?",
        content: <>
          To make a transfer on RemitAssure ,user need to fill the following information:
          <ul>
            <li>Recipient bank details - bank name , account holder name and account number.</li>
            <li>Recipient personal information - name , mobile number and email. </li>
            <li>Recipient address details - state , city , country , zip/postal code , street and building number, etc.</li>
            <li>Sender personal information - name , country of birth , date of birth , occupation ,email and mobile</li>
            <li>Sender address detals - city , state , zip/postal code , street , country , building number.</li>
            <li>Sender payment method details:
              <ul>
                <li>Debit/credit card - card details</li>
                <li>PayTo agreement: payID or bsb code and account number.(only for Australian users)</li>
              </ul>
            </li>
          </ul>
        </>,
      },
      {
        id: 15,
        title: "Why do we verify your identity before transactions?",
        content: "RemitAssure as a financially-regulated company, need to verify all of our customers accoording to country laws.As per every country rules verifcation is required to check from where you are sending the funds and sometimes the source of your funds.All we need to check your name, address and date of birth.",
      }
    ];
    const accordionItems = dataarray.map((value, index) => {
      return (
        <Accordion.Item eventKey={index} className="my-3 help-accordian">
          <Accordion.Header>{value.title}</Accordion.Header>
          <Accordion.Body>
            {value.content}
          </Accordion.Body>
        </Accordion.Item>
      )
    })
    return (
      <Accordion className="">
        {accordionItems}
      </Accordion>
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

                  <div className="row justify-content-center w-100 mx-auto my-4 py-4">
                    <div className="col-md-3 col-lg-3 mt-2">
                      <NavLink to={`/working`} style={{ color: "#0b0e2e" }}>
                        <div className="d-flex justify-content-start align-items-center">
                          <div className="support-image">
                            <img src={"assets/img/help/icon01.svg"} alt="can't show image" />
                          </div>
                          <div className="circle-content">
                            <p style={{ color: "#0b0e2e" }}>How it works</p>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                    <div className="col-md-3 col-lg-3 mt-2">
                      <a href="#faq">
                        <div className="d-flex justify-content-start align-items-center">
                          <div className="support-image">
                            <img src={"assets/img/help/Shape.svg"} alt="can't show image" />
                          </div>
                          <div className="circle-content">
                            <p style={{ color: "#0b0e2e" }}>FAQ's</p>
                          </div>
                        </div>
                      </a>
                    </div >
                    <div className="col-md-3 col-lg-3 mt-2">
                      <NavLink to={linking()} style={{ color: "#0b0e2e" }}>
                        <div className="d-flex justify-content-start align-items-center">
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
        <div className="container my-5">
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
              <div className="help_image" >
                <img src="assets/img/help/help_img01.svg" alt="help_img01" />
              </div>
            </div>
          </div>

          <div className="row" id="support-centre">
            <div className="col-lg-12 mt-5">
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
