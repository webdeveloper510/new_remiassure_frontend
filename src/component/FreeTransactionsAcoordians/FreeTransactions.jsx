import React, { useEffect, useState } from "react";
import { RxLinkedinLogo } from "react-icons/rx";
import { generateRandomKey } from "../../utils/hook";
import { object } from "yup";
import Img from "react-image";
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink, useNavigate } from "react-router-dom";
const FreeTransctions = () => {
    function AccordionArrayOfObjects() {
        const [activeIndex, setActiveIndex] = useState(0); // Set initial state to 0
    
        const handleAccordionToggle = (index) => {
          setActiveIndex(activeIndex === index ? null : index);
        }
        const dataarray = [
          {
            id: 1,
            title: "Online and Mobile Banking",
            content: "Our online and mobile banking platforms empower you to manage your finances anytime, anywhere. Enjoy secure access to your accounts, effortless money transfers, and real-time transaction tracking. Experience the freedom of modern banking, tailored to your lifestyle.",
          },
          {
            id: 2,
            title: <>Free Account Transfers</>,
            content: "RemitAssure offers the convenience of free account transfers, allowing you to send money globally without incurring additional fees. Enjoy a cost-effective and efficient way to move funds securely across borders with our user-friendly platform.",
          },
          {
            id: 3,
            title: "No Hidden Fee",
            content: "At RemitAssure, we believe in transparency. Enjoy peace of mind with our no hidden fee policy – your transactions are straightforward, and you'll only pay what you see, ensuring a clear and honest money transfer experience.",
          },
         
    
   
          
        
        ];
        const accordionItems = dataarray.map((value, index) => {
          return (
            <Accordion.Item eventKey={index} className={`my-3 free-accordian`}>
    
            <Accordion.Header onClick={() => handleAccordionToggle(index)}>   <div className="title-acc"> <h2>{value.title}</h2></div></Accordion.Header>
    
              <Accordion.Body>
              <p class="mar-t">{value.content}</p>
              </Accordion.Body>
              <div className="border-div"></div>
            </Accordion.Item>
          )
        })
        return (
          <Accordion activeKey={activeIndex}>
            {accordionItems}
          </Accordion>
        )
      }
    
  return (
    <> <div className="accrodion_contents-f">
    <AccordionArrayOfObjects />
  </div></>
  )
  }
  
  export default FreeTransctions;