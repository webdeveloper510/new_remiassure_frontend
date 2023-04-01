
import React, { useState, useContext, useEffect,useRef,useMemo } from "react";
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
import Select from "react-select";
import countryList from 'react-select-country-list'
// start css
const myStyle ={
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
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
        const [bank_name, setBank_name] = useState('');
        const [account_name, setAccount_name] = useState('');
        const [account_number, setAccount_number] = useState('');
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
        const [country, setCountry] = useState('');
        const [Date_of_birth, setDate_of_birth] = useState('');
        const [Countrybirth, setCountrybirth] = useState('');
        const [reasonMoney, setReasonMoney] = useState('');
        const [customer_id, setCustomer_id] = useState('');
      
        /************ Start -Recipient Bank Details function***************/
          // const handleStep2InputChange =(e,key) =>{
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
       

/****************** select country *******************/

const [countryValue, setcountryValue] = React.useState('')
    const countryoptions = useMemo(() => countryList().getData(), [])

    const changeHandler = countryValue => {
        setcountryValue(countryValue)
    }

   /* start-- useRef is used for focusing on inputbox */
   const input_location = useRef(null);


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
                  setBank_name(response.data.data.bank_name);
                  setAccount_name(response.data.data.account_name);
                  setAccount_number(response.data.data.account_number);
                  setFirstName(response.data.data.first_name);
                  setMiddleName(response.data.data.middle_name);
                  setLastName(response.data.data.last_name);
                  setEmail(response.data.data.email);
                  setMobile(response.data.data.mobile);
                  setFlat(response.data.data.flate);
                  setBuilding(response.data.data.building);
                  setStreet(response.data.data.street);
                  setPostcode(response.data.data.postcode);
                  setCity(response.data.data.city);
                  setState(response.data.data.state);
                  setCountry_code(response.data.data.country_code);
                  setCountry(response.data.data.country);
                  setReasonMoney(response.data.data.reasonMoney);
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
              bank_name:bank_name,
              account_name:account_name,
              account_number:account_number,
              first_name: firstName,
              middle_name: middleName,
              last_name: lastName,
              email: email,
              mobile:mobile,
              flat: flat,
              building: building,
              sreet: street,
              postcode: postcode,
              city: city,  
              state: state,  
              country_code: country_code,
              country: country,
              reasonMoney: reasonMoney
              
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
                          Value={bank_name}
                          onChange={(e)=>setBank_name(e.target.value)}
                        //  placeholder={RecepientsData.bank_name}
                         
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
                      defaultValue={account_name}
                       onChange={(e)=>setAccount_name(e.target.value)}
                        className='rate_input form-control'
                        // placeholder={RecepientsData.account_name}
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
                      defaultValue={account_number}
                      onChange={(e)=>setAccount_number(e.target.value)}
                      // placeholder={RecepientsData.account_number}
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
                        defaultValue={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        // placeholder={RecepientsData.first_name}
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
                        defaultValue={middleName}
                        onChange={(e)=>setMiddleName(e.target.value)}
                        // placeholder={RecepientsData.middle_name}
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
                      defaultValue={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      // placeholder={RecepientsData.last_name}
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
                        defaultValue={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        // placeholder={RecepientsData.email}
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
                      defaultValue={mobile}
                      onChange={(e)=>setMobile(e.target.value)}
                      // placeholder={RecepientsData.mobile}
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
                          defaultValue={flat}
                          onChange={(e)=>setFlat(e.target.value)}
                          // placeholder={RecepientsData.flast}
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
                            defaultValue={building}
                            onChange={(e)=>setBuilding(e.target.value)}
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
                            defaultValue={street}
                            onChange={(e)=>setStreet(e.target.value)}
                            // placeholder={RecepientsData.street}
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
                            defaultValue={postcode}
                            onChange={(e)=>setPostcode(e.target.value)}
                            // placeholder={RecepientsData.postcode}
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
                            defaultValue={city}
                            onChange={(e)=>setCity(e.target.value)}
                            // placeholder={RecepientsData.city}
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
                            defaultValue={state}
                            onChange={(e)=>setState(e.target.value)}
                            // placeholder={RecepientsData.state}
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
                            defaultValue={country_code}
                            onChange={(e)=>setCountry_code(e.target.value)}
                            // placeholder={RecepientsData.country_code}
                            />
                      </Form.Group>
                    </div>
                  <div className="col-md-4">
                    <Form.Group className="form_label" controlId="Firstname">
                    <p className="get-text">Country</p>
                    <Select
                                     ref={input_location}
                                     options={countryoptions} 
                                     value={countryValue} 
                                     onChange={changeHandler}
                                      />
                      {/* <CountryDropdown
                       id="UNIQUE_ID" 
                       className='YOUR_CSS_CLASS rate_input form-control'
                        preferredCountries={['gb', 'us' ]} 
                        value="" handleChange={e=> console.log(e.target.value)}
                        name="country"
                        defaultValue={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        // placeholder={RecepientsData.country}
                        ></CountryDropdown> */}
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Reason For Sending Money</p>
                      <select
                        className="form-select rate_input form-control"
                        aria-label="Select a reason"
                        // ref={input_recipientReasoMoney}
                        name="reasonMoney"
                        defaultValue={reasonMoney}
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