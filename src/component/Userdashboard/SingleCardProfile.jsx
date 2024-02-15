
import React, { useState, useContext, useEffect, useRef } from "react";
import Table from 'react-bootstrap/Table';
import { Links, NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import profileimage from '../../assets/img/userdashboard/card_bg.png';
import Sidebar from './Sidebar';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import global from "../../utils/global";
// start css
const myStyle = {
  color: "red",
  fontSize: "13px",
  textTransform: "capitalize"
}

const SingleCardProfile = () => {

  /*********************Start page show hide condtion page ****************************/
  const token = sessionStorage.getItem("token");

  const LoginDigitalidVerified = sessionStorage.getItem("LoginDigitalidVerified");

  const verification_otp = sessionStorage.getItem("verification_otp");

  const RecipientUserName = sessionStorage.getItem("RecipientUserName");
  const signup_token = sessionStorage.getItem("signup_token")

  const DigitalCode = sessionStorage.getItem("DigitalCode");




  /*************data get ************/
  let { id } = useParams();
  // alert(id)

  /************ Start -Recipient Bank Details state***************/
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(false);

  /************ Start -messageText state***************/
  const [senderDetailData, setSenderDetailData] = React.useState('');
  // const [userRecipientData, setUserRecipientData] = useState('');

  /************ Start -Recipient Bank Details state***************/

  const [formValue, setFormValue] = React.useState({
    bankName: '', accountName: '', accountNumber: '', firstName: '', middleName: '',
    lastName: '', email: '', mobile: '', address: '', reasonMoney: ''
  });

  /************ Start -Recipient Bank Details function***************/
  const handleStep2InputChange = (e, key) => {
    let valueForm = formValue
    valueForm[key] = e.target.value
    setFormValue(valueForm)
  }
  /************ Start - Cancel Recipient Bank Details function***************/
  const handlRecipientBankDetails = (e) => {
    e.preventDefault();
    window.location.reload(false);
  }




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
  useEffect(() => {

    // event.preventDefault();
    //  setLoading(true); // Set loading before sending API requestssss
    axios.post(global.serverUrl + `/payment/card/${id}`, {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      },
    })
      .then(function (response) {
        setSenderDetailData(response.data.data);
        //  setLoading(false); // Stop loading   
      })
      .catch(function (error, message) {
        //  setLoading(false); // Stop loading in case of error
        // setBankNameText(error.response.data); 

      })

  }, [])






  return (
    <>

      <section>
        <div className="margin-set">
          <div className="tabs-page">
            <Sidebar />
            <div className="content-body">
              <section className="edit_recipient_section">

                <div className="form-head mb-4">
                  <h2 className="text-black font-w600 mb-0"><b>Card Profile</b>
                    <NavLink to="/user-card-list">
                      <button className="start-form-button back-btn" >
                        <MdOutlineKeyboardBackspace />
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
                            <img src={profileimage} alt="images" />
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
      </section>
    </>
  )
}



export default SingleCardProfile;