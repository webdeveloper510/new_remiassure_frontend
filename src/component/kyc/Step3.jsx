// Step3.js
import React from 'react';

const Step3 = ({ prevStep, values }) => (
  <div>
    <section className="kyc">
    <div className="">
                <div className="">


                <div className="row each-row">
                    <div className='col-md-12'>
                        <div className='width_80_per'>
                        <img src="assets/img/home/kyc-suc.webp">

                        </img>
                        </div>
<p className='kyc-sucful'><span className='kyc-text'>KYC</span> <br></br>Successfull</p>
                    </div>
                    </div>
                    <div className="next-step dashbord">
              <button  className="login_button dashbord-go">Go To Dashboard  <img src="assets/img/home/Union.png" className="vission_image" alt="alt_image" /></button>
            <p>You will be redirected in <span><b>10</b> Seconds </span></p>
              </div>
</div> 
</div>          
           </section>
  </div>
);

export default Step3;
