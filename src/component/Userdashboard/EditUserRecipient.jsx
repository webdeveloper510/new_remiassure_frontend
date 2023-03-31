
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
import { MdOutlineKeyboardBackspace } from "react-icons/md";


// start css
const myStyle ={
  color: "red",
}

const Editrecipientuser = () => {
  /*************data get ************/
  let { id } = useParams();
  // alert(id)
    console.log("========================>",id) ;


        /************ Start -Recipient Bank Details state***************/
        const [error,setError]=useState(false);
        const [loading, setLoading] = React.useState(false);
    
        /************ Start -messageText state***************/
        const [BankNameText, setBankNameText] = React.useState('');
        // const [userRecipientData, setUserRecipientData] = useState('');
        const [RecepientsData, setRecepientsData] = React.useState('');
        
        /************ Start -Recipient Bank Details state***************/
      
        const [formValue, setFormValue] = React.useState ({
          bankName:'',accountName:'', accountNumber:'',firstName:'', middleName:'',
        lastName:'',email:'',mobile:'',flat:'',building:'',sreet:'',postcode:'',
        city:'',state:'',country_code:'',country:'',reasonMoney:''});
      
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
                  setRecepientsData(response.data.data);
                 //  setLoading(false); // Stop loading   
              })
              .catch(function(error, message) {
                  console.log(error.response);
                 //  setLoading(false); // Stop loading in case of error
                  // setBankNameText(error.response.data); 
                   
              })
 
         }, [])
 
 
    
    

          
     /**************************************************************************
       * ************** Start  Recipient Bank Details ****************************
       * ***********************************************************************/
      
         /* start-- useRef is used for focusing on inputbox */
         const handleRecipientBankDetails =(value) =>{
          console.log("============>token", token)
        
            // event.preventDefault();
            setLoading(true); // Set loading before sending API requestssss
            axios.post(API.BASE_URL + `payment/recipient-update/${value}`, {
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
              reasonMoney: formValue.reasonMoney
              
            },{
                headers: {
                  "Authorization" : `Bearer ${token}`,
                }, 
            })
            .then(function(response) {
                console.log(response);
                setLoading(false); // Stop loading 
                navigate('/userrecipients');   
      
            })
            .catch(function(error, message) {
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
                setBankNameText(error.response.data); 
                 
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
        <h2 class="text-black font-w600 mb-0"><b>Update Recipient Profile </b>
                          <NavLink to="/userrecipients">
                            <button className="start-form-button back-btn" >
                                <MdOutlineKeyboardBackspace/>
                                Back
                            </button>
                          </NavLink>
                            {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}
                     
        </h2></div>
        <form className="single-recipient">
            <div className="card">
            <div className="card-body">
            
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
                         placeholder={RecepientsData.bank_name}
                         
                          />   
                          <span style={myStyle}>{BankNameText.Enterbankname? BankNameText.Enterbankname: ''}</span>

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
                        placeholder={RecepientsData.account_name}
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
                      placeholder={RecepientsData.account_number}
                        />
                        {/* {error&&formValue.accountNumber.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""} */}
                            <span style={myStyle}>{BankNameText.Enteraccountnumber? BankNameText.Enteraccountnumber: ''}</span>
                            <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span>
                    </div>
                  </div>
                  </div>
                <div className="row each-row">
                  <h5>Recipient Details</h5>
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
                        placeholder={RecepientsData.first_name}
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
                        placeholder={RecepientsData.middle_name}
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
                      placeholder={RecepientsData.last_name}
                        />
                        <span style={myStyle}>{BankNameText.last_name? BankNameText.last_name: ''}</span>
                    </div>
                  </div>
                </div>
                <div className="row each-row">
                  <div className="col-md-6">
                    <div className="input_field">
                      <p className="get-text">Email<span style={{color: 'red'}} >*</span></p>
                      <input
                        type="email" 
                        // ref={input_recipientEmail}
                        className='rate_input form-control'
                        name="email"
                        defaultValue={formValue.email}
                        onChange={(e)=> handleStep2InputChange(e,'email')}
                        placeholder={RecepientsData.email}
                        />
                          <span style={myStyle}>{BankNameText.email? BankNameText.email: ''}</span>
                        
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input_field">
                      <p className="get-text">Mobile<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text" 
                      // ref={input_recipientMobile}
                      className='rate_input form-control'
                      name="mobile"
                      defaultValue={formValue.mobile}
                      onChange={(e)=> handleStep2InputChange(e,'mobile')}
                      placeholder={RecepientsData.mobile}
                        />
                        <span style={myStyle}>{BankNameText.mobile? BankNameText.mobile: ''}</span>
                        <span style={myStyle}>{BankNameText.Entervalidmobile? BankNameText.Entervalidmobile: ''}</span>
                        <span style={myStyle}>{BankNameText.Mobileexist? BankNameText.Mobileexist: ''}</span>
                        <span style={myStyle}>{BankNameText.Invalidmobile? BankNameText.Invalidmobile: ''}</span>
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
                          placeholder={RecepientsData.flast}
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
                            placeholder={RecepientsData.building}
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
                            placeholder={RecepientsData.street}
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
                            placeholder={RecepientsData.postcode}
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
                            placeholder={RecepientsData.city}
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
                            placeholder={RecepientsData.state}
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
                            placeholder={RecepientsData.country_code}
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
                        placeholder={RecepientsData.country}
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
                     onClick={()=>handleRecipientBankDetails(id)}
                    >
                      Update Recipient
                      
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



export default Editrecipientuser;