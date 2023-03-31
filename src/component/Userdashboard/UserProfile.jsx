
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

const Profile = () => {
  /*************data get ************/
  let { id } = useParams();
  // alert(id)
    console.log("========================>",id) ;


        /************ Start -Recipient Bank Details state***************/
        const [error,setError]=useState(false);
        const [loading, setLoading] = React.useState(false);
    
        /************ Start -messageText state***************/
        const [profileText, setProfileText] = React.useState('');
        const [BankNameText, setBankNameText] = React.useState('');
        // const [userRecipientData, setUserRecipientData] = useState('');
        const [RecepientsData, setRecepientsData] = React.useState('');
        /**************************** get profile data *******************/
         const [senderDetailData, setSenderDetailData] = React.useState('');
        
        /************ Start -Recipient Bank Details state***************/
      
        const [formValue, setFormValue] = React.useState ({
          bankName:'',accountName:'', accountNumber:'',firstName:'', middleName:'',
        lastName:'',email:'',mobile:'',flat:'',building:'',sreet:'',postcode:'',
        city:'',state:'',country_code:'',country:'',reasonMoney:'', customer_id:'',});
      
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

          const signup_token = localStorage.getItem("signup_token")
          console.log("signup_token" ,signup_token);
      
          const verification_otp = localStorage.getItem("verification_otp");
          console.log("Verification Message", verification_otp)
    
          const RecipientUserName = localStorage.getItem("RecipientUserName");
          console.log("RecipientUserName", RecipientUserName);

          //Get data of update value 
       


      // Start page show hide condtion page
       
      const navigate = useNavigate('');


      // const search = useLocation()
      
      
        /**********************Design function************ */
          const [isActive, setActive] = useState("false");
      
          const handleToggle = () => {
            setActive(!isActive);
          };

    /**********************Localstorage getting data*********** */

    // function handleDataStore(){

    //   var courses =JSON.parse(localStorage.getItem('RecepientsData') || "[]")
    //   var course ={
    //     account_name:formValue.account_name,
    //     // account_name:account_name
    //   }
    //   courses.push(course)
    
    //   localStorage.setItem('courses', JSON.stringify(courses))
    // }

    /**************************************************************************
      * ************** Start-- get data Profile ****************************
      * ***********************************************************************/
     
        /* start-- useRef is used for focusing on inputbox */
        useEffect(() => {
          setLoading(true); // Set loading before sending API request
          axios.post(API.BASE_URL + 'user-profile/',{}, {
              headers: {
                  "Authorization" : `Bearer ${token}`,
                
              }
            })
            .then(function(response) {
                console.log("Recipients APIIIII", response.data);
                setSenderDetailData(response.data.data);
                console.log(senderDetailData, "senderDetailData")
                setLoading(false); // Stop loading
          
          
              //   if (response.status)
              // // notify();
            })
            .catch(function(error) {
                console.log(error);
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
              
            })
        }, [])
  
 
    
    

          
     /**************************************************************************
       * ************** Start  Recipient Bank Details ****************************
       * ***********************************************************************/
      
         /* start-- useRef is used for focusing on inputbox */
         const handleUserProfileUpdate =(event) =>{
          // console.log("============>token", token)
        
             event.preventDefault();
            setLoading(true); // Set loading before sending API requestssss
            axios.patch(API.BASE_URL + 'update-profile/', {
              bank_name: formValue.bankName,
              account_name: formValue.accountName,
              account_number: formValue.accountNumber,
              first_name: formValue.firstName,
              middle_name: formValue.middleName,
              last_name: formValue.lastName,
              email: formValue.email,
              mobile:formValue.mobile,
              flat: formValue.flat,
              building: formValue.building,
              sreet: formValue.sreet,
              postcode: formValue.postcode,
              city: formValue.city,  
              state: formValue.state,  
              country_code: formValue.country_code,
              country: formValue.country,
              reasonMoney: formValue.reasonMoney,
              customer_id: formValue.customer_id
              
            },{
                headers: {
                  "Authorization" : `Bearer ${token}`,
                }, 
            })
            .then(function(response) {
                console.log(response);
                setLoading(false); // Stop loading 
                setProfileText(error.response.data.error)
                navigate('/dashboard');   
      
            })
            .catch(function(error, message) {
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
                // setBankNameText(error.response.data); 
               
                 
            })
        }
      // }





      

    return(
        <>
          {  
           token || verification_otp != undefined || '' ? (
  

        <div  className="margin-set">
          <div  className="tabs-page">
              <Sidebar/>

            {/* <div class="form-head mb-4">
              <h2 ><b>Profile</b>
              </h2>
              <NavLink to="/userrecipients">
                  <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
              </NavLink>
            </div> */}
          

          <div className="content-body">
       <section className="edit_recipient_section">
       <div class="form-head mb-4">
        <h2 class="text-black font-w600 mb-0"><b>Profile Update</b></h2></div>
        <form className="single-recipient">
            <div className="card">
            <div className="card-body">
            {/* <div className="row">
            <NavLink to="/userrecipients">
                  <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Recipients Lists</button>
              </NavLink></div> */}
              <div className="row">
              <h5>Bank Information</h5>
                  <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Bank Name<span style={{color: 'red'}} >*</span></p>
                          <input
                          type="text" 
                          className="rate_input form-control"
                          name="bankName"
                          Value={formValue.bankName}
                          onChange={(e)=>handleStep2InputChange(e,'bankName')}
                         placeholder={senderDetailData.bank_name}
                         
                          />   
                          <span style={myStyle}>{profileText.email? profileText.email: ''}</span>

                      </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Account Name<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text"
                      // ref={input_recipientAccountName}
                      defaultValue={formValue.accountName}
                      onChange={(e)=>handleStep2InputChange(e,'accountName')}
                        className='rate_input form-control'
                        placeholder={senderDetailData.account_name}
                        />
                          {/* {error&&formValue.accountName.length<=0?
                            <span style={myStyle}>Please Enter the Account Name </span>:""} */}
                        <span style={myStyle}>{BankNameText.Enteraccountname? BankNameText.Enteraccountname: ''}</span>

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Account number<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text"
                      name="accountNumber"
                      // ref={input_recipientAccountNumber}
                      className='rate_input form-control'
                      defaultValue={formValue.accountNumber}
                      onChange={(e)=> handleStep2InputChange(e,'accountNumber')}
                      placeholder={senderDetailData.account_number}
                        />
                        {/* {error&&formValue.accountNumber.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""} */}
                            <span style={myStyle}>{BankNameText.Enteraccountnumber? BankNameText.Enteraccountnumber: ''}</span>
                            <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span>
                    </div>
                  </div>
                  </div>
                <div className="row each-row">
                  <h5>Personal Details</h5>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">First Name<span style={{color: 'red'}} >*</span></p>
                      <input
                        type="text" 
                        // ref={input_recipientFirstName}
                        className='rate_input form-control'
                        name="firstName"
                        defaultValue={formValue.firstName}
                        onChange={(e)=> handleStep2InputChange(e,'firstName')}
                        placeholder={senderDetailData.First_name}
                        />
                          {/* {error&&formValue.firstName.length<=0?
                            <span style={myStyle}>Please Enter the First Name </span>:""} */}
                          <span style={myStyle}>{BankNameText.first_name? BankNameText.first_name: ''}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Middle Name</p>
                      <input
                        type="text"
                        // ref={input_recipientMiddleName}
                        className='rate_input form-control' 
                        name="middleName"
                        defaultValue={formValue.middleName}
                        onChange={(e)=> handleStep2InputChange(e,'middleName')}
                        placeholder={senderDetailData.middle_name}
                        />
                          <span style={myStyle}>{BankNameText.middle_name? BankNameText.middle_name: ''}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Last Name<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text" 
                      // ref={input_recipientLastName}
                      className='rate_input form-control'
                      name="lastName"
                      defaultValue={formValue.lastName}
                      onChange={(e)=> handleStep2InputChange(e,'lastName')}
                      placeholder={senderDetailData.Last_name}
                        />
                        <span style={myStyle}>{BankNameText.last_name? BankNameText.last_name: ''}</span>
                    </div>
                  </div>
                </div>
                <div className="row each-row">
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Email<span style={{color: 'red'}} >*</span></p>
                      <input
                        type="email" 
                        // ref={input_recipientEmail}
                        className='rate_input form-control'
                        name="email"
                        defaultValue={formValue.email}
                        onChange={(e)=> handleStep2InputChange(e,'email')}
                        placeholder={senderDetailData.email}
                        />
                          <span style={myStyle}>{BankNameText.email? BankNameText.email: ''}</span>
                        
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Mobile<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text" 
                      // ref={input_recipientMobile}
                      className='rate_input form-control'
                      name="mobile"
                      defaultValue={formValue.mobile}
                      onChange={(e)=> handleStep2InputChange(e,'mobile')}
                      placeholder={senderDetailData.mobile}
                        />
                        <span style={myStyle}>{BankNameText.mobile? BankNameText.mobile: ''}</span>
                        <span style={myStyle}>{BankNameText.Entervalidmobile? BankNameText.Entervalidmobile: ''}</span>
                        <span style={myStyle}>{BankNameText.Mobileexist? BankNameText.Mobileexist: ''}</span>
                        <span style={myStyle}>{BankNameText.Invalidmobile? BankNameText.Invalidmobile: ''}</span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">customer id<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text" 
                      // ref={input_recipientMobile}
                      className='rate_input form-control'
                      name="customer_id"
                      defaultValue={formValue.customer_id}
                      onChange={(e)=> handleStep2InputChange(e,'customer_id')}
                      placeholder={senderDetailData.customer_id}
                        />
                        
                    </div>
                  </div>
                </div>
                
                <div className="row each-row">
                    <h5>Address</h5>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Flat/Unit No.</p>
                          <Form.Control 
                          type="text" 
                          className='rate_input form-control' 
                          name="flat"
                          defaultValue={formValue.flat}
                          onChange={(e)=> handleStep2InputChange(e,'flat')}
                          placeholder={senderDetailData.flast}
                           />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                            <p className="get-text">Building/Unit No.</p>              
                            <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="Building"
                            defaultValue={formValue.Building}
                            onChange={(e)=> handleStep2InputChange(e,'Building')}
                            placeholder={senderDetailData.building}
                            />
                        </Form.Group>
                    </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Street</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="flat"
                            defaultValue={formValue.flat}
                            onChange={(e)=> handleStep2InputChange(e,'flat')}
                            placeholder={senderDetailData.street}
                            />
                        </Form.Group>
                      </div>
                </div>
                <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Postcode</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="postcode"
                            defaultValue={formValue.postcode}
                            onChange={(e)=> handleStep2InputChange(e,'postcode')}
                            placeholder={senderDetailData.postcode}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
                        <p className="get-text">City/Town</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="city"
                            defaultValue={formValue.city}
                            onChange={(e)=> handleStep2InputChange(e,'city')}
                            placeholder={senderDetailData.city}
                            />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">State</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="state"
                            defaultValue={formValue.state}
                            onChange={(e)=> handleStep2InputChange(e,'state')}
                            placeholder={senderDetailData.state}
                            />
                          </Form.Group>
                      </div>
                </div>
                <div className="row each-row">
                 
                  
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Country Code</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            name="country_code"
                            defaultValue={formValue.country_code}
                            onChange={(e)=> handleStep2InputChange(e,'country_code')}
                            placeholder={senderDetailData.country_code}
                            />
                      </Form.Group>
                    </div>
                  <div className="col-md-4">
                    <Form.Group className="form_label" controlId="Firstname">
                    <p className="get-text">Country</p>
                      <CountryDropdown
                       id="UNIQUE_ID" 
                       className='YOUR_CSS_CLASS rate_input form-control'
                        preferredCountries={['gb', 'us' ]} 
                        value="" handleChange={e=> console.log(e.target.value)}
                        name="country"
                        defaultValue={formValue.country}
                        onChange={(e)=> handleStep2InputChange(e,'country')}
                        placeholder={senderDetailData.location}
                        ></CountryDropdown>
                    </Form.Group>
                  </div>
              </div>
                 <div className="row each-row">
                  <div className="col-md-12">
                    <div className="input_field">
                      <p className="get-text">Reason For Sending Money</p>
                      <select
                        className="form-select rate_input form-control"
                        aria-label="Select a reason"
                        // ref={input_recipientReasoMoney}
                        name="reasonMoney"
                        defaultValue={formValue.reasonMoney}
                        onChange={(e)=> handleStep2InputChange(e,'reasonMoney')}
                        > 
                        <option selected>Select a reason</option>
                        <option value="Family Support">Family Support</option>
                        <option value="Education">Education</option>
                        <option value="Tax Payment">Tax Payment</option>
                        <option value="Loan Payment">Loan Payment</option>
                        <option value="Travel Payment">Travel Payment</option>
                        <option value="Utility Payment">Utility Payment</option>
                      </select>
                      {/* {error&&formValue.reasonMoney.length<=0?
                            <span style={myStyle}>Please Select the Reason For Sending Money </span>:""} */}
                     </div>
                  </div>
                </div> 
                <div className="row">
                  <div className="col-md-4">
                    <button 
                    type="submit" 
                    className="start-form-button"
                    onClick={handlRecipientBankDetails}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="col-md-8">
                    <button
                    type="button" 
                    className="form-button"
                     onClick={handleUserProfileUpdate}
                    >
                      Update
                      
                    {loading ? <>
                        <div class="loader-overly"> 
                          <div class="loader" > 
                                                    
                        </div>
                                                    
                      </div>
                    </> : <></>}
                     
                    </button>
                  </div>
                </div>
                </div>
                </div>
            </form>
            </section>
            </div>
            </div>
            </div>

          ):(
            <></>

          )
          }
        </>
    )
}



export default Profile;