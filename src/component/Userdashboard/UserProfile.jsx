
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
        // const [bankName, setBankName] = useState('')
        const [firstName, setFirstName] = useState('');
        const [middleName, setMiddleName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [mobile, setMobile] = useState('');
        const [flat, setFlat] = useState('');
        const [gender, setGender] = useState('');
        const [building, setBuilding] = useState('');
        const [street, setStreet] = useState('');
        const [postcode, setPostcode] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [country_code, setCountry_code] = useState('');
        const [country, setcountry] = useState('');
        const [Date_of_birth, setDate_of_birth] = useState('');
        const [Countrybirth, setCountrybirth] = useState('');
        const [reasonMoney, setReasonMoney] = useState('');
        const [customer_id, setCustomer_id] = useState('');

      

        /************ Start -Recipient Bank Details function***************/
          // const  =(e,key) =>{
          //   console.log(e.target.value)
          //   console.log(key)
          //   let valueForm = formValue
          //   valueForm[key] = e.target.value
          //   setFormValue(valueForm)
          //   console.log(formValue)
          // }
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
                setFirstName(response.data.data.First_name);
                setMiddleName(response.data.data.Middle_name);
                setLastName(response.data.data.Last_name);
                setEmail(response.data.data.email);
                setMobile(response.data.data.mobile);
                setFlat(response.data.data.flate);
                setBuilding(response.data.data.building);
                setStreet(response.data.data.street);
                setPostcode(response.data.data.postcode);
                setCity(response.data.data.city);
                setState(response.data.data.state);
                setCountry_code(response.data.data.country_code);
                setcountry(response.data.data.country);
                setReasonMoney(response.data.data.reasonMoney);
                setCustomer_id(response.data.data.customer_id);

            
              
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
          // alert("hii")
          // console.log("============>token", token)
        
             event.preventDefault();
            setLoading(true); // Set loading before sending API requestssss
            axios.patch(API.BASE_URL + 'update-profile/', {
              First_name: firstName,
              Middle_name: middleName,
              Last_name: lastName,
              email: email,
              mobile: mobile,
              flat: flat,
              building: building,
              street: street,
              postcode: postcode,
              city: city,
              state: state,
              country_code: country_code,
              country: country,
            
             
              // Gender: gender,
              // Date_of_birth: Date_of_birth ,
             
            
              
            },{
                headers: {
                  "Authorization" : `Bearer ${token}`,
                }, 
            })
            .then(function(response) {
                console.log(response);
                setLoading(false); // Stop loading 
                navigate('/dashboard');  
            })
            .catch(function(error, message) {
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
                setBankNameText(error.response.data.error)
               
               
                 
            })
        }
      // }





      

      return(
        <>
          {  
           token != undefined || '' ? (
  

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
                <div className="row each-row">
                  <h5>Personal Details</h5>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">First Name<span style={{color: 'red'}} >*</span></p>
                      <input
                        type="text" 
                        className='rate_input form-control'
                        Value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        />
                          {/* {error&&formValue.firstName.length<=0?
                            <span style={myStyle}>Please Enter the First Name </span>:""} */}
                          <span style={myStyle}>{BankNameText? BankNameText: ''}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Middle Name</p>
                      <input
                        type="text"
                        // ref={input_recipientMiddleName}
                        className='rate_input form-control' 
                        Value={middleName}
                        onChange={(e)=>setMiddleName(e.target.value)}
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
                      Value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
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
                        Value={email}
                        onChange={(e)=>setEmail(e.target.value)}
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
                        Value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
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
                          Value={flat}
                          onChange={(e)=>setFlat(e.target.value)}
                           />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                            <p className="get-text">Building/Unit No.</p>              
                            <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            Value={building}
                            onChange={(e)=>setBuilding(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Street</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            Value={street}
                            onChange={(e)=>setStreet(e.target.value)}
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
                            Value={postcode}
                            onChange={(e)=>setPostcode(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
                        <p className="get-text">City/Town</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            Value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">State</p>
                          <Form.Control 
                            type="text" 
                            className='rate_input form-control' 
                            Value={state}
                            onChange={(e)=>setState(e.target.value)}
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
                            Value={country_code}
                            onChange={(e)=>setCountry_code(e.target.value)}
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
                         defaultValue={country}
                        onChange={(e)=> (e,'country')}
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
                        Value={reasonMoney}
                        onChange={(e)=>setReasonMoney(e.target.value)}
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