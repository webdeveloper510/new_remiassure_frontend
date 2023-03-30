import { faL, faSlash, faUnsorted } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Links, NavLink, useNavigate} from 'react-router-dom';

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";


const Profile = () => {
    
 // Start page show hide condtion page 
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);

    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp)

// Start page show hide condtion page

    // const token = localStorage.getItem("token");
    // console.log("TOKEN", token);


    const name = localStorage.getItem("firstname");
    // alert(name)
    console.log("firstname", name);


    const [First_name, setFirst_name] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
 
    const navigate = useNavigate();

    const notify = () => toast.success("Profile Updated Successfully!");
 
  
    const handleFirstName =(e) => {
        setFirst_name(e.target.value);
    }
    const handleLastName =(e) => {
        setLast_name(e.target.value);

    }
    const handeleMobile =(e) => {
        setMobile(e.target.value);www
    } 

    
    const handleProfileApi = (event) => {
        event.preventDefault();
        setLoading(true) // Set loading before sending API request
        axios.post(API.BASE_URL + 'update-profile/', {
            First_name: First_name,
            Last_name: Last_name,
            mobile: mobile
        }, {
            headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
          
        })
        .then(function(response) {
            console.log(response);
            setLoading(false) //stop loading
            if (response.status)
                notify();
                navigate('/');   
        })
        .catch(function(error, message) {
            console.log(error.response)
            setLoading(false) //stop loading in case with error 
            if(error.response.status){
                toast.error(error.response.data.message);
            } 
            console.log(error, "klnklnklnknnnnnnnnnnnn");   
        })
    }


    return(
        <>

          {/* <!-- ======= help Remitassure Support-Section  start======= --> */}

          {  
          verification_otp || token != undefined || '' ? (

          <section className="why-us section-bgba profile_banner">
    <div className="container">
        <div className="row">
            {/* <div className="col-lg-6">
                <div className="support_image">
                    <img src="assets/img/help/help_img02.png" alt="support_images" />
                </div>
            </div> */}

            <div className="col-lg-12">
                {/* start-- card */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-profile">
                            <div className="card-body">
                                <h5 className="profile-heading">User Profile</h5>

                                <div className="profile_login">
                                    <form>
                                        <Form.Group className="mb-3 form_label" controlId="formBasicEmail">
                                            <Form.Label>First Name</Form.Label>
                                            {/* <Form.Control type="text"
                                                value={First_name}
                                                onChange={handleFirstName}
                                                placeholder="First Name"
                                            /> */}       
                                            {
                                            name != undefined || '' ? (
                                            
                                                <Form.Control type="text"
                                                value={First_name}
                                                onChange={handleFirstName}
                                            placeholder="First Name"
                                            />
                                            
                                            ) : (
                                            
                                            
                                                <Form.Control type="text"
                                                value={First_name}
                                                onChange={handleFirstName}
                                                placeholder="First Name"
                                            />

                                            )
                                        }
                                     </Form.Group>

                                        <Form.Group className="mb-3 form_label" controlId="formBasicPassword">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text"
                                               value={Last_name}
                                               onChange={handleLastName} 
                                            placeholder="Last Name"
                                             />
                                        </Form.Group>

                                        <Form.Group className="mb-3 form_label" controlId="formBasicPassword">
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control type="number"
                                             value={mobile} 
                                             onChange ={handeleMobile}
                                            placeholder="Mobile No"
                                             />
                                        </Form.Group>
                            
                                        <button variant="primary" 
                                        type="submit"
                                        onClick={handleProfileApi}
                                         className="profile_button"
                                         >
                                          Update Profile

                                          {
                                            loading ? <>
                                              <div class="loader-overly"> 
                                                <div class="loader" > 
                                                
                                                </div>
                                                
                                                </div>
                                            </>:<></>
                                          }
                                        </button>
                                        {/* <p className="already_content">Don't have account? 
                                          <NavLink to="/signup"> Sign-up</NavLink>
                                        </p> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End-- card */}
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