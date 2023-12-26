import React, { useEffect, useState } from "react";

import Img from "react-image";
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink } from "react-router-dom";
import { RxLinkedinLogo } from "react-icons/rx";
import { generateRandomKey } from "../../utils/hook";

const Help = () => {

  const [input_content, setInput_content] = useState('Search')

  const transferLinks = () => {
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

  // start objects RenderingArrayOfObjects
  function RenderingArrayOfObjects() {
    const data = [
      {
        id: 1,
        name: "How it works",
        src: "assets/img/help/icon01.svg",
        link: "/working",
        icon: ""
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
    const [activeIndex, setActiveIndex] = useState(0); // Set initial state to 0

    const handleAccordionToggle = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    }
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
        content: <>To initiate a transfer with RemitAssure, simply <Link to="/sign-up">sign up</Link> on our user-friendly platform, <Link to="/login">log in</Link> to your account, select your recipient, enter the desired amount, and confirm the transfer.Our intuitive interface ensures a seamless process, making cross-border money transfers a breeze. </>,
      },

      {
        id: 11,
        title: "How do I make payment for my transfer?",
        content: <>To make a payment for your transfer with RemitAssure, simply select your preferred payment method from the available options, such as bank transfers or debit/credit cards, after entering the recipient and transfer amount. Our user-friendly platform guides you through the payment process, ensuring a secure and seamless transaction experience, so you can send money globally with ease.
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
        content: <>Transfer failures can occur for various reasons, including incorrect recipient details, insufficient funds in your account, or technical issues. To pinpoint the exact cause, please review your transfer details carefully, ensure you have adequate funds, and verify that recipient information is accurate. If issues persist, contact our customer support team for prompt assistance in resolving the matter and ensuring a successful transfer. Your satisfaction is our priority, and we're here to help you navigate any challenges that may arise.
        </>,
      },
      {
        id: 14,
        title: "What information do I need to transfer funds?",
        content: <>
          To initiate a funds transfer with RemitAssure, you'll typically need the following information: the recipient's full name as it appears on their identification, their contact details,  such as a phone number or email address, the recipient's bank account details or a mobile wallet ID, the transfer amount, and your preferred payment method, which could include a bank account or debit/credit card information. Ensuring the accuracy of these details is essential for a smooth and successful money transfer experience with RemitAssure.
        </>,
      },
      {
        id: 15,
        title: "Why do we verify your identity before transactions?",
        content: "We verify your identity before transactions to ensure the security and compliance of your financial transactions. This verification process helps us protect both you and our platform from potential fraud and unauthorized use. By confirming your identity, we can confidently facilitate your transactions while adhering to legal and regulatory requirements, providing you with a safe and trustworthy environment for your financial activities. Your privacy and security are paramount to us, and identity verification is a crucial step in upholding these principles.",
      }
    ];
    const accordionItems = dataarray.map((value, index) => {
      return (
        <Accordion.Item eventKey={index} className={`my-3 help-accordian`}>

          <Accordion.Header onClick={() => handleAccordionToggle(index)}> <p className="icon-acc"></p> {value.title}</Accordion.Header>

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
      <div className="site-content">
        <section className="section-img">
          <div className="container">

            <div className="row">

              <div className=" headabout">
                <h1 className="about-heading"><span className="grading-color">RemitAssure</span><br></br>Support Center</h1>

              </div>
              <div className="help-content-bottom">
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    <div className="help-li">
                      <img src="assets/img/help/icon1.svg" className="vission_image" alt="alt_image" />
                      <img src="assets/img/help/faq-c-svg.png" className="vission_hover" alt="alt_image" />
                      <h3 className="title-help"><NavLink to={`/working`} >How it works</NavLink></h3>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="help-li ">
                      <img src="assets/img/help/faq-icon-svg.png" className="vission_image" alt="alt_image" />
                      <img src="assets/img/help/faq-icon-hover.png" className="vission_hover" alt="alt_image" />
                      <h3 className="title-help"> <a href="#faq">FAQ’s</a></h3>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="help-li">
                      <img src="assets/img/help/new-account.png" className="vission_image" alt="alt_image" />
                      <img src="assets/img/help/new-account-white.png" className="vission_hover" alt="alt_image" />
                      <h3 className="title-help"> <NavLink to={`/user-profile`} >My Account </NavLink></h3>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <section id="faq">
            <div className="container">
              <div className="row">
                <h2 className="sec-title">
                  Frequently asked questions
                </h2>
                <p className="title-con">Please find detailed information on our services, fees, and <br></br>security measures, and ensure a smooth and informed money transfer experience.</p>
                <div className="accrodions_contents">
                  <div className="accrodion_contents">
                    <AccordionArrayOfObjects />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="contct-info">
          <div className="container">
            <div className="darkpink">
              <div className="">
                <div class="row align-center">

                  <div class="col-md-8">

                    <h2 className="sec-title">
                      Can't Find Your Answers?
                    </h2>

                    <p>We're here 24 hours a day, 7 days a week to support you.</p></div>
                  <div class="col-md-4"><div class="btn-contact">
                    <a href="tel:1300284228" target="_blank" class="skybtn">Contact</a></div>
                    <div class="btn-contact "><a href="https://wa.me/1300284228" target="_blank" class="appbtn">WhatsApp</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </section>
      </div>

      {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}

      {/* <!-- ======= Frequently asked questions FAQs  start======= --> */}

      {/* <!-- ======= Help Frequently asked questions FAQs End-Section ======= --> */}


    </>
  )
}

export default Help; 
