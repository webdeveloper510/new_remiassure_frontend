import React,{useEffect, useState} from "react";
import Img from "react-image";
import Accordion from 'react-bootstrap/Accordion';

const Help = () => {

  const [input_content, setInput_content] = useState('Search')


  // start objects RenderingArrayOfObjects
    function RenderingArrayOfObjects() {
      const data = [
        {
          id: 1,
          name: "How it works",
          src: "assets/img/help/icon01.svg"
        },

        {
          id: 2,
          name: "Faq",
          src: "assets/img/help/Shape.svg"
        },
        {
          id: 3,
          name: "My Account",
          src: "assets/img/help/contact01.svg"
        }
      ];
    
      const listItems = data.map(
        (element) => {
            return(

              <ul className="list-">
              <li className="">
                  <div className="support-image">
                  <img src={element.src} alt="can't show image" />
                    </div>
                    <div className="circle-content">
                    <p className="">{element.name}</p>
                  </div>
              </li>
              </ul>

            )
        }
      )
      return(
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
      title:"Common Problems",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      title:"Cancellations & Refunds",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      title:"Where's my money?",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      title:"Send money to over 130 countries with remitassure",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      title:"Getting started with remitassure ",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      title:"How to stay safe online - our security guide ",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 7,
      title:"Refer a friend ",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 8,
      title:"Money Not Received ",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 9,
      title:"Payments",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 10,
      title:"Troubleshooting",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
 
    {
      id: 11,
      title:"Identity Verification",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 12,
      title:"New Remitassure mobile app",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
 
  ];
  const accordionItems = dataarray.map((value) => {
    return(
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{value.title}</Accordion.Header>
          <Accordion.Body>
          {value.content}
          </Accordion.Body>
      </Accordion.Item> 
    </Accordion>

    )
  })
  return(
    <div>
      {accordionItems}
    </div>
  )
}
// End Accordion functionality section 


  return (
    <>
    
    {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
    <section className="why-us section-bgba help_banner">
      <div className="container">

        <div className="support_image">
            <img src="assets/img/help/suport.svg" alt="support_images" />
        </div>

        <div className="row">
          <div className="col-lg-12">
               {/* start-- card */}
               <div className="row">
                  <div className="col-lg-12">
                        <div className="card card-support">
                            <div className="card-body">
                                <h5 className="Support-heading">Remitassure Support Center</h5>
                                <p className="Support-paragraph">Hi, How can we help you?</p>
                               
                                <div className="search-div">
                                  <input type="text" className="search_input"/>
                                    {/* <img src="assets/img/help/search.svg" alt="serch_img" className="serch_img" />
                                    <span className="serch_content"> {input_content}</span> */}
                                  </div>

                                <div className="row">
                                    <div className="col-md-12" id="align_list">
                                     <RenderingArrayOfObjects />
                                    </div>
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
    {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}

  {/* <!-- ======= Frequently asked questions FAQs  start======= --> */}
  <section className="why-us section-bgba">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="support-vl02">
              <h1 className="vl-support">Frequently asked questions FAQs</h1>
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
              <p className="answer-paragraph">We're here for (day) -(day) 9:00-12:00 (country time).</p>
              <p className="answer-paragraph">We speak english (languages)</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
               <div className="view-button">
                   <a href="tel:+66 2399 1145">
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
