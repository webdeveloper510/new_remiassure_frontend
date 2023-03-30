
import React, { useState, useContext, useEffect,useRef } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate,useParams} from 'react-router-dom';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import UserRecipient from "../Userdashboard/UserRecipient";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Sidebar from './Sidebar';

// start css
const myStyle ={
  color: "red",
}

const SingleRecipientProfile = () => {
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
             axios.get(API.BASE_URL + `payment/recipient-update/${id}`,{
                 headers: {
                   "Authorization" : `Bearer ${token}`,
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
              <h2 className="text-black font-w600 mb-0"><b>Profile</b>
              </h2>
            </div>
         <div className="row">
         <NavLink to="/userrecipients">
                  <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
              </NavLink>
         </div>

            <div className="row">
            <div className="col-lg-8">
                <div className="profile card card-body px-3 pt-3 pb-0">
                    <div className="profile-head">
                        <div className="photo-content">
                          {/* <h1>{senderDetailData.first_name}</h1> */}
                        </div>
                        <div className="profile-info">
                            <div className="profile-photo">
                            <BsFillPersonPlusFill />
                            </div>
                            <div className="profile-details">
                                <div className="profile-name">
                                    <h4 className="text-primary mb-0">{senderDetailData.first_name}</h4>
                                </div>
                            </div>
                        </div>

                 <form className="single-recipient">
                 <div className="view-profile-section">
                 <ul>
                    <li><b>Bank Name: </b>{senderDetailData.bank_name}</li>
                    <li><b>Account Name: </b>{senderDetailData.account_name}</li>
                    <li><b>Account Number: </b>{senderDetailData.account_number}</li>
                    <li><b>First Name : </b>{senderDetailData.first_name}</li>
                    <li><b>Middle Name : </b>{senderDetailData.middle_name}</li>
                    <li><b>Last Name : </b>{senderDetailData.last_name}</li>
                    <li><b>Email: </b>{senderDetailData.email}</li>
                    <li><b>Mobile Number : </b>{senderDetailData.mobile}</li>
                    <li><b>Flat : </b>{senderDetailData.flast}</li>
                    <li><b>Building : </b>{senderDetailData.building}</li>
                    <li><b>Street : </b>{senderDetailData.street}</li>
                    <li><b>Postcode: </b>{senderDetailData.postcode}</li>
                    <li><b>City : </b>{senderDetailData.city}</li>
                    <li><b>State: </b>{senderDetailData.state}</li>
                    <li><b>Country code : </b>{senderDetailData.country_code}</li>
                    <li><b>Country : </b>{senderDetailData.country}</li>
                    <li><b>Country code : </b>{senderDetailData.reasonMoney}</li>
                    </ul>
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
                    <button
                    type="button" 
                    className="form-button single_button"
                    disabled
                    >
                    Save
                      
                    {/* {loading ? <>
                        <div class="loader-overly"> 
                          <div class="loader" > 
                                                    
                        </div>
                                                    
                      </div>
                    </> : <></>} */}
                     
                    </button>
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



export default SingleRecipientProfile;