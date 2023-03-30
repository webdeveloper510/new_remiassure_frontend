import React, { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import {Links, NavLink, useNavigate} from 'react-router-dom';

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";


const Profile = () => {
    

  const initialProfileValue = {
    firstName: '',
    middleName: '',
    lastName: '',
    customerID: '',
    date: '',
    gender: '',
    countryofBirth: '',
    IDType: '',
    email: '',
    mobile: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    flatNo: '',
    buildingNo: '',
    street: '',
    postCode: '',
    city: '',
    state: '',
    countryCode: '',
    countryName: '',
  }

  const [profileDetaills, setProfileDetaills] = useState(initialProfileValue);
  const {
    firstName,
    middleName,
    lastName,
    customerID,
    date,
    gender,
    countryofBirth,
    IDType,
    email,
    mobile,
    currentPassword,
    newPassword,
    confirmPassword,
    flatNo,
    buildingNo,
    street,
    postCode,
    city,
    state,
    countryCode,
    countryName,

  } = profileDetaills;

  const handlePtrofileDetails = (e) => {
    console.log(e.target.name)
    console.log(e.target.defaultValue)

    setProfileDetaills(profileItem => ({...profileItem, [e.target.name]: e.target.defaultValue}));
  }

 // Start page show hide condtion page 
 const token = localStorage.getItem("token");
 console.log("TOKEN", token);

 const verification_otp = localStorage.getItem("verification_otp");
 console.log("Verification Message", verification_otp)

  

  /**************************************************************************
 * ************** Start -Profile Api CAll ***********************************
 * *************************************************************************/
    // const handleProfileDetaills =(event) =>{
    //   event.preventDefault();
    useEffect(() =>{
      axios.post(API.BASE_URL + 'user-profile/', {

      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then(function(response){
        console.log(response);
      })
      .catch(function(error, response){
        console.log(error.response);

      })

    }, [])
    
    // }

    return(
        <>

          {/* <!-- ======= help Remitassure Support-Section  start======= --> */}

          {  
          verification_otp || token != undefined || '' ? (

            <section className="profile-page">
            <div className="container">
              <div className="row">
                <div className="header">
                  <h1>User Profile</h1>
                </div>
                <div className="update-profile">
                  <form>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Your Name </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter First Name" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Middle Name </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Middle Name" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Last Name </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Last Name" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Customer ID </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Customer ID" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Date </p>
                          <Form.Control type="date" className='rate_input form-control' placeholder="Enter Date" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Gender </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Gender" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Country of Birth </p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Country of Birth" />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">ID Type</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter ID Type" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Email</p>
                          <Form.Control type="email" className='rate_input form-control' placeholder="Enter Email" />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Mobile</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Mobile" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Change Password</h5>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Current Password</p>
                          <Form.Control type="password" className='rate_input form-control' placeholder="Enter Current Password" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">New Password</p>
                          <Form.Control type="password" className='rate_input form-control' placeholder="Enter New Password" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Confirm Password</p>
                          <Form.Control type="password" className='rate_input form-control' placeholder="Enter Confirm Password" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Address</h5>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Flat/Unit No.</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Flat/Unit No." />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Building/Unit No.</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Building/Unit No." />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Street</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Street" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Postcode</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Postcode" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">City/Town</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter City/Town" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">State</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter State" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Country Code</p>
                          <Form.Control type="text" className='rate_input form-control' placeholder="Enter Country Code" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="mb-3 form_label" controlId="Firstname">
                        <p className="get-text">Country</p>
                          <CountryDropdown id="UNIQUE_ID" className='YOUR_CSS_CLASS rate_input form-control' preferredCountries={['gb', 'us' ]} value="" handleChange={e=> console.log(e.target.value)}></CountryDropdown>
                        </Form.Group>
                      </div>
                    </div>
                    <div class="row each-row">
                      <div className="col-md-6">
                        <button className="start-form-button">Cancel</button>
                      </div>
                      <div className="col-md-6">
                        <button className="profile-form-button">Save</button>
                        <button className="profile-form-button">Edit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>


         ) : (
            <>
            
            </>
        )
        }


        {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}
          
        </>
    )
}



export default Profile;