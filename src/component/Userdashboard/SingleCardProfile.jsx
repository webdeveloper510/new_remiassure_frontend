
import React, { useState, useContext, useEffect,useRef } from "react";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate,useParams} from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import UserRecipient from "../Userdashboard/UserRecipient";
import profileimage from '../../assets/img/userdashboard/images.png';

import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Page404 from "../pageNotfound/Page404";
// start css
const myStyle ={
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const SingleCardProfile = () => {
 /*************data get ************/
 let { id } = useParams();
 // alert(id)
   console.log("========================>",id) ;


       /************ Start -Recipient Bank Details state***************/
       const [error,setError]=useState(false);
       const [loading, setLoading] = React.useState(false);
   
       /************ Start -messageText state***************/
       const [senderDetailData, setSenderDetailData] = React.useState('');
       // const [userRecipientData, setUserRecipientData] = useState('');
       
       /************ Start -Recipient Bank Details state***************/
     
       const [formValue, setFormValue] = React.useState ({
         bankName:'',accountName:'', accountNumber:'',firstName:'', middleName:'',
       lastName:'',email:'',mobile:'',address:'',reasonMoney:''});
     
       /************ Start -Recipient Bank Details function***************/
         const handleStep2InputChange =(e,key) =>{
           console.log(e.target.value)
           console.log(key)
           let valueForm = formValue
           valueForm[key] = e.target.value
           setFormValue(valueForm)
           console.log(formValue)
         }
       /************ Start - Cancel Recipient Bank Details function***************/
         const handlRecipientBankDetails =(e) => {
           e.preventDefault();
           window.location.reload(false);
         
           console.log("handle request ");
         }
     
         // Start page show hide condtion page 
         const token = localStorage.getItem("token");
         console.log("TOKEN", token);
     
         const verification_otp = localStorage.getItem("verification_otp");
         console.log("Verification Message", verification_otp)
   
         const RecipientUserName = localStorage.getItem("RecipientUserName");
         console.log("RecipientUserName", RecipientUserName);

         const signup_token = localStorage.getItem("signup_token")
        console.log("signup_token", signup_token);

         const DigitalCode = localStorage.getItem("DigitalCode");
         console.log("DigitalCode", DigitalCode);

       
     
     // Start page show hide condtion page
      
     const navigate = useNavigate('');


     // const search = useLocation()
     
     
       /**********************Design function************ */
         const [isActive, setActive] = useState("false");
     
         const handleToggle = () => {
           setActive(!isActive);
         };

         
    /**************************************************************************
      * ************** Start  Recipient Bank Details ****************************
      * ***********************************************************************/
     
        /* start-- useRef is used for focusing on inputbox */
        useEffect(()=>{
         console.log("Data=========>",id)

             // event.preventDefault();
            //  setLoading(true); // Set loading before sending API requestssss
             axios.post(API.BASE_URL + `payment/card/${id}`,{},{
                 headers: {
                   "Authorization" : `Bearer ${signup_token ? signup_token : token}`,
                 }, 
             })
             .then(function(response) {
                 console.log(response);
                 setSenderDetailData(response.data.data);
                //  setLoading(false); // Stop loading   
             })
             .catch(function(error, message) {
                 console.log(error.response);
                //  setLoading(false); // Stop loading in case of error
                 // setBankNameText(error.response.data); 
                  
             })

        }, [])



          
    

    return(
        <>
  <div  className="margin-set">
            <div  className="tabs-page">
                    <Sidebar/>
                    <div className="content-body">
                    <section className="edit_recipient_section">

            <div className="form-head mb-4">
              <h2 className="text-black font-w600 mb-0"><b>Card Profile</b>
              <NavLink to="/userCardLists">
                            <button className="start-form-button back-btn" >
                                <MdOutlineKeyboardBackspace/>
                                Back
                            </button>
                          </NavLink>
              </h2>
            </div>
         {/* <div className="row">
         <NavLink to="/userrecipients">
                  <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
              </NavLink>
         </div> */}

            <div className="row">
            <div className="col-lg-12">
                <div className="profile card card-body px-3 pt-3 pb-0">
                         
                            {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}
                     
                    <div className="profile-head">
                        <div className="photo-content">
                          {/* <h1>{senderDetailData.first_name}</h1> */}
                        </div>
                        <div className="profile-info">
                            <div className="profile-photo">
                             <img src={profileimage} alt="images"/>
                            </div>
                            <div className="profile-details">
                                <div className="profile-name">
                                    <h4 className="text-primary mb-0">{senderDetailData.first_name}</h4>
                                </div>
                            </div>
                        </div>

                 <form className="single-recipient">
                 <div className="view-profile-section">
                  <Table stripped bordered hover size="sm" className="profile-table">
                    <tr><th colspan={2}>Card information</th></tr>
                    <tr>
                      <td>Card Name: </td>
                      <td>{senderDetailData.name}</td>
                    </tr>
                    <tr>
                      <td>Card Number: </td>
                      <td>{senderDetailData.card_number}</td>
                    </tr>
                    <tr>
                      <td>Card Expiry Month: </td>
                      <td>{senderDetailData.expiry_month}</td>
                    </tr>
                    <tr>
                      <td>Card Expiry Year: </td>
                      <td>{senderDetailData.expiry_year}</td>
                    </tr>
                   
                  </Table>
               
                       </div>
             
            
           
                
               
              
              
       
                <div className="row">
                  <div className="col-md-4">
                    {/* <button 
                    type="submit" 
                    className="start-form-button"
                    onClick={handlRecipientBankDetails}
                    >
                      Clear
                    </button> */}
                  </div>
                  <div className="col-md-8">
                    {/* <button
                    type="button" 
                    className="form-button single_button"
                    disabled
                    >
                    Save
                    </button> */}
                  </div>
                
                </div>
            </form>
                    </div>
                </div>
            </div>
        </div>

        
            </section>
            </div>
            </div>
            </div>
        </>
    )
}



export default SingleCardProfile;