
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


const EditCardUser = () => {
  /*************data get ************/
  let { id } = useParams();
//    alert(id)
    console.log("========================>",id) ;


        /************ Start -Recipient Bank Details state***************/
        const [error,setError]=useState(false);
        const [loading, setLoading] = React.useState(false);
    
        /************ Start -messageText state***************/
        const [BankNameText, setBankNameText] = React.useState('');
        // const [userRecipientData, setUserRecipientData] = useState('');
        const [RecepientsData, setRecepientsData] = React.useState('');
        
        /************ Start -Card Bank Details state***************/
        const [name, setName] = useState('');
        const [number, setNumber] = useState('');
        const [exp_month, setExp_month] = useState('');
        const [exp_year, setExp_year] = useState('');
    
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

          const DigitalCode = localStorage.getItem("DigitalCode");
          console.log("DigitalCode", DigitalCode);
            

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
                    "Authorization" : `Bearer ${token}`,
                  }, 
              })
              .then(function(response) {
                  console.log(response);
                  setName(response.data.data.name);
                  setNumber(response.data.data.card_number);
                  console.log(number," =========> number");
                  setExp_month(response.data.data.expiry_month);
                  setExp_year(response.data.data.expiry_year);
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
         const handleCardUpdateDetails =(value) =>{
          console.log("============>token", token)
        
            // event.preventDefault();
            setLoading(true); // Set loading before sending API requestssss
            axios.patch(API.BASE_URL + `payment/card/${value}`, {
                name:name,
                card_number:number,
                expiry_month:exp_month,
                expiry_year: exp_year,
              
              
            },{
                headers: {
                  "Authorization" : `Bearer ${token}`,
                }, 
            })
            .then(function(response) {
                console.log(response);
                setLoading(false); // Stop loading 
                navigate('/userCardLists');   
      
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
           token || DigitalCode != undefined || '' ? (
  

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
        <h2 class="text-black font-w600 mb-0"><b>Update Card Profile </b>
                          <NavLink to="/userCardLists">
                            <button className="start-form-button back-btn" >
                                <MdOutlineKeyboardBackspace/>
                                Back
                            </button>
                          </NavLink>
                            {/* <button className="form-button addsingle_recepient" ><NavLink to="/userrecipients"><BsFillPersonPlusFill /> Recipients Lists</NavLink></button>  */}
                     
        </h2></div>
        {/* <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span>
        <span style={myStyle}>{BankNameText.userrecipient? BankNameText.userrecipient: ''}</span> */}
        <form className="single-recipient">
            <div className="card">
            <div className="card-body">
            
              <div className="row">
              <h5>Bank Information</h5>
                  <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Card Name<span style={{color: 'red'}} >*</span></p>
                          <input
                          type="text" 
                          className="rate_input form-control"
                          name="name"
                          Value={name}
                          onChange={(e)=>setName(e.target.value)}
                        //  placeholder={RecepientsData.bank_name}
                         
                          />   
                          {/* <span style={myStyle}>{BankNameText.Enterbankname? BankNameText.Enterbankname: ''}</span> */}

                      </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Card Number<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text"
                      name="number"
                       Value={number}
                       onChange={(e)=>setNumber(e.target.value)}
                        className='rate_input form-control'
                        />
                          {/* {error&&formValue.accountName.length<=0?
                            <span style={myStyle}>Please Enter the Account Name </span>:""} */}
                        {/* <span style={myStyle}>{BankNameText.Enteraccountname? BankNameText.Enteraccountname: ''}</span> */}

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Card exp_month<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text"
                      name="exp_month"
                      // ref={input_recipientAccountNumber}
                      className='rate_input form-control'
                      defaultValue={exp_month}
                      onChange={(e)=>setExp_month(e.target.value)}
                      // placeholder={RecepientsData.account_number}
                        />
                        {/* {error&&formValue.accountNumber.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""} */}
                            <span style={myStyle}>{BankNameText.Enteraccountnumber? BankNameText.Enteraccountnumber: ''}</span>
                            <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_field">
                      <p className="get-text">Card exp_yaer<span style={{color: 'red'}} >*</span></p>
                      <input 
                      type="text"
                      name="exp_year"
                      // ref={input_recipientAccountNumber}
                      className='rate_input form-control'
                      defaultValue={exp_year}
                      onChange={(e)=>setExp_year(e.target.value)}
                      // placeholder={RecepientsData.account_number}
                        />
                        {/* {error&&formValue.accountNumber.length<=0?
                            <span style={myStyle}>Please Enter the Account number </span>:""} */}
                            {/* <span style={myStyle}>{BankNameText.Enteraccountnumber? BankNameText.Enteraccountnumber: ''}</span>
                            <span style={myStyle}>{BankNameText.Accountnumberexist? BankNameText.Accountnumberexist: ''}</span> */}
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
                     onClick={()=>handleCardUpdateDetails(id)}
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



export default EditCardUser;