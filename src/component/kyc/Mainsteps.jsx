import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { updateProfile, userProfile } from '../../utils/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import * as Yup from "yup";

const MultiStepForm = ({ is_model, handleModel }) => {

  /* ---------------------------------------------- State declaration's -------------------------------------------- */
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected_area_code, setSelectedAreaCode] = useState("61")

  /* ---------------------------------------------- Formik declaration's --------------------------------------- */

  const firstSchema = Yup.object().shape({
    First_name: Yup.string().min(2).max(25).required().trim(),
    Middle_name: Yup.string().min(2).max(25).trim(),
    Last_name: Yup.string().min(2).max(25).required().trim(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(9).max(10).required(),
    Date_of_birth: Yup.date().min(new Date(Date.now() - 3721248000000)).max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required(),
    occupation: Yup.string().min(1).max(50).required().trim(),
    Country_of_birth: Yup.string().required().notOneOf(["none"]),
  })

  const secondSchema = Yup.object().shape({
    payment_per_annum: Yup.string().required().notOneOf(["none"]),
    value_per_annum: Yup.string().required().notOneOf(["none"]),
    country: Yup.string().min(2).max(30).required().notOneOf(["none"]),
    state: Yup.string().min(2).max(35).required().notOneOf(["none"]),
    city: Yup.string().min(1).max(35).required().trim().notOneOf(["none"]),
    postcode: Yup.string().length(4).required(),
    street: Yup.string().min(1).max(150).required(),
    flat: Yup.string().min(1).max(30).notRequired(),
    building: Yup.string().min(1).max(30).required().trim(),
  })

  const formik = useFormik({
    initialValues: {
      customer_id: "",
      mobile_verified: "",
      email: "",
      First_name: "",
      Middle_name: "",
      Last_name: "",
      Date_of_birth: "",
      Country_of_birth: "none",
      mobile: "",
      location: "",
      occupation: "",
      payment_per_annum: "Tier 1 - Less than 5 times",
      value_per_annum: "Tier 1 - Less than $30,000",
      city: "",
      state: "",
      postcode: "",
      street: "",
      flat: "",
      building: "",
      country_code: "AU",
      country: "Australia"
    },
    validationSchema: activeStep === 1 ? firstSchema : secondSchema,
    onSubmit: async (values) => {
      if (activeStep === 1) {
        nextStep()
      } else {
        updateData(values)
        nextStep()
      }
    }
  })

  /* ------------------------------------------------- Handler's and Hook's ------------------------------------------- */
  const nextStep = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const endHandler = () => {
    if (is_model) {
      handleModel()
    } else {
      navigate("/dashboard")
    }
  }

  const updateData = (values) => {
    let d = values
    d.location = values.country
    d.Gender = "NA"
    if (values.First_name === "" || values.First_name === undefined || values.First_name === " ") {
      delete d['First_name'];
    } if (values.Middle_name === "" || values.Middle_name === undefined || values.Middle_name === " ") {
      delete d['Middle_name'];
    } if (values.Last_name === "" || values.Last_name === undefined || values.Last_name === " ") {
      delete d['Last_name'];
    } if (values.Date_of_birth === "" || values.Date_of_birth === undefined || values.Date_of_birth === " ") {
      delete d['Date_of_birth'];
    } if (values.occupation === "" || values.occupation === undefined || values.occupation === " ") {
      delete d['occupation'];
    } if (values.Country_of_birth === "" || values.Country_of_birth === undefined || values.Country_of_birth === "none") {
      delete d['Country_of_birth'];
    } if (values.city === "" || values.city === undefined || values.city === " ") {
      delete d['city'];
    } if (values.flat === "" || values.flat === undefined || values.flat === " ") {
      delete d['flat'];
    } if (values.building === "" || values.building === undefined || values.building === " ") {
      delete d['building'];
    } if (values.street === "" || values.street === undefined || values.street === " ") {
      delete d['street'];
    } if (values.postcode === "" || values.postcode === undefined || values.postcode === " ") {
      delete d['postcode'];
    } if (values.state === "" || values.state === undefined || values.state === " ") {
      delete d['state'];
    }

    delete d["email"];
    delete d["mobile"];
    delete d["customer_id"];
    updateProfile(d).then(res => {
      if (res.code === "200") {
        let user = JSON.parse(sessionStorage.getItem("remi-user-dt"))
        let local = { ...res.data, is_digital_Id_verified: user?.is_digital_Id_verified }
        sessionStorage.removeItem("remi-user-dt")
        sessionStorage.setItem("remi-user-dt", JSON.stringify(local))
        userProfile().then((res) => {
        }).catch((error) => {
          if (error.response.data.code == "400") {
            toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
          }
        })
      } else if (res.code === "400") {
        toast.error(res.message, { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
      }
    }).catch((err) => {
      toast.error(err.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
    })
  }

  useEffect(() => {
    if (!sessionStorage.getItem("token") && !sessionStorage.getItem("remi-user-dt")) {
      navigate("/login")
    } else {
      let dt = JSON.parse(sessionStorage.getItem("remi-user-dt"))
      if (dt.is_digital_Id_verified?.toString()?.toLowerCase() === "true") {
        navigate("/dashboard")
      }
    }
    setLoading(true)
    userProfile().then((res) => {
      if (res.code == "200") {
        setLoading(false)
        let p = res.data.mobile
        let phone = p.substring(3);
        let countryValue = res?.data?.country || res?.data?.location;
        formik.setValues({ ...formik.values, ...res.data, mobile: phone, country: countryValue, occupation: res?.data?.occupation?.toLowerCase() !== "none" ? res?.data?.occupation : "", country_code: res?.data?.country_code || countryValue == "Australia" ? "AU" : "NZ" })
      }
    }).catch((error) => {
      if (error.response.data.code == "400") {
        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
      }
      setLoading(false)
    })
  }, [])

  const skip = (values) => {
    updateData(values)
    endHandler()
  }

  /* ------------------------------------------------------- Return ------------------------------------------------ */

  return (
    <>
      <section className="sigupsec" >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-7">
              <div style={{ marginBottom: '20px' }}>
                <ul id="progressbar">
                  {[1, 2, 3, 4].map((step) => (
                    <li
                      key={step}
                      className={`step ${step === activeStep ? 'active' : ''} ${completedSteps.includes(step) ? 'done' : ''}`}
                    >
                      {step === 1 && (
                        <>Step 1</>
                      )}
                      {step === 2 && (
                        <>Step 2</>
                      )}
                      {step === 3 && (
                        <>Step 3</>
                      )} {
                        step === 4 && (
                          <>Step 4</>
                        )
                      }
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row align-center1">
                <div className="col-lg-5">
                  <div className="kyc-img">
                    <img src="assets/img/home/kyc.webp" className="signup" alt="alt_image" />
                  </div>
                </div>
                <div className="col-lg-7 d-flex align-items-center">
                  <div>
                    <h2 className="Sign-heading my-3">KYC</h2>
                    <h3 className='sub-head'>Complete your KYC in 4 steps</h3>
                    <div>
                    </div>
                    <div>
                      <div className='steps-form'>
                        {activeStep === 1 && (
                          <Step1 prevStep={prevStep} nextStep={nextStep} formik={formik} selected_area_code={selected_area_code} setSelectedAreaCode={setSelectedAreaCode} skipHandler={() => skip(formik.values)} />
                        )}
                        {activeStep === 2 && (
                          <Step2 nextStep={nextStep} prevStep={prevStep} formik={formik} selected_area_code={selected_area_code} setSelectedAreaCode={setSelectedAreaCode} skipHandler={() => skip(formik.values)} />
                        )}
                        {activeStep === 3 && (
                          <Step3 values={formik.values} nextStep={nextStep} />
                        )}
                        {activeStep === 4 && (
                          <Step4 end_handler={endHandler} />
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
    </>
  );
};

export default MultiStepForm;