import React from "react";
import { NavLink } from 'react-router-dom';
import thankyou from "../../assets/img/userdashboard/thankyou4.webp";
const Thankyou = () => {


  return (
    <>
    
    {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
    <section className="why-us section-bgba thankyou_banner">
      <div className="container">
         
         <div className="outer">
        <div className="support_image">
            <img src={thankyou}  alt="support_images"/>
            
        </div>

       
               {/* start-- card */}
               <div className="row">
                  <div className="col-lg-12">
                        <div className="thankyou-content">
                                <h5 className="Support-heading">Thanks for choosing RemitAssure</h5>
                                <p className="Support-paragraph">We're honored to help you send money.</p>
                                <NavLink to="/dashboard">
                <button type="submit" class="form-button" style={{"float": 'none' }}>Go back to Home</button>
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
  )
}

export default Thankyou; 
