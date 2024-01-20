// MultiStepForm.js
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [values, setValues] = useState({
      name: '',
      email: '',
    });
  
    const handleChange = (field) => (e) => {
      setValues({ ...values, [field]: e.target.value });
    };
  
    const goToStep = (step) => {
      setActiveStep(step);
    };
  
    const nextStep = () => {
      setCompletedSteps([...completedSteps, activeStep]);
      setActiveStep(activeStep + 1);
    };
  
    const prevStep = () => {
      setActiveStep(activeStep - 1);
    };
  
  
    return (
        <section className="sigupsec" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-7">
                        <div style={{ marginBottom: '20px' }}>
                        <ul id="progressbar">
        {[1, 2, 3].map((step) => (
         

         
       <li
      key={step}
      className={`step ${step === activeStep ? 'active' : ''} ${
        completedSteps.includes(step) ? 'done' : ''
      }`}
     
    >
      {step === 1 && (
        <>
       Step 1
          
        </>
      )}
      {step === 2 && (
        <>
         Step 2
        </>
      )}
      {step === 3 && (
        <>
     Step 3
        
        </>
      )}
    </li>
 
        ))}
           </ul>
      </div>

                        </div>
                        <div className="col-lg-12">
                            {/* start-- card */}
                            <div className="row align-center1">
                                <div className="col-lg-5">
                                    <div className="kyc-img">
                                        <img src="assets/img/home/kyc.webp" className="signup" alt="alt_image" />
                                    </div>
                                </div>
                                <div className="col-lg-7 d-flex align-items-center">
								<div>
                                <h2 className="Sign-heading my-3">KYC</h2>
                                <h3 className='sub-head'>Complete your KYC in 3 steps</h3>
        <div>

    
       
        </div>
        <div>
     
<div className='steps-form'>
     {activeStep === 1 && (
       <Step1 nextStep={nextStep} handleChange={handleChange} values={values} />
     )}

     {activeStep === 2 && (
       <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
     )}

     {activeStep === 3 && (
       <Step3 prevStep={prevStep} values={values} />
     )}
     </div>
   </div>
      </div>
								</div>
								</div>
								</div>
								</div>
								</div>
								 </section>
    );
  };
  
  export default MultiStepForm;