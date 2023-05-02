import React from "react";
import { NavLink } from 'react-router-dom';
import thankyou from "../../assets/img/home/bank.svg";
import Page404 from "../pageNotfound/Page404";

const Thankyou = () => {
    /************ Start-show hide condtion page ***************/
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
  
    const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
    console.log("LoginDigitalidVerified", LoginDigitalidVerified)
  
    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp)
  
    const RecipientUserName = localStorage.getItem("RecipientUserName");
    console.log("RecipientUserName", RecipientUserName);
  
    const signup_token = localStorage.getItem("signup_token")
    console.log("signup_token", signup_token);
  
  
    const DigitalCode = localStorage.getItem("DigitalCode");
    console.log("DigitalCode", DigitalCode);


  return (
    <>
         {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (
          <>

      {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
      <section className="why-us section-bgba thankyou_banner">
        <div className="container">

          <div className="outer">
            <div className="support_image">
              <img src={thankyou} alt="support_images" />

            </div>


            {/* start-- card */}
            <div className="row">
              <div className="col-lg-12">
                <div className="thankyou-content">
                  <h5 className="Support-heading">Thanks for choosing RemitAssure</h5>
                  <p className="Support-paragraph">We're honored to help you send money.</p>
                  <NavLink to="/dashboard">
                    <NavLink
                     to="/dashboard"
                      type="submit"
                      className="form-button thank_you"
                      style={{ "float": 'none', "width": '50%' }}
                      >
                       Go back to Dashboard
                      </NavLink>
                  </NavLink>

                </div>
              </div>
            </div>
            {/* End-- card */}
          </div>


        </div>
      </section>
      {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}
       </>
      ) : (
          <>
            <Page404 />
          </>

        )
      }

    </>
  )
}

export default Thankyou;