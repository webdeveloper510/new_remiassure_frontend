// Step1.js
import React, { useState, useEffect, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import birthCountryList from 'react-select-country-list';
import countryList from '../../utils/AuNz.json';
import * as Yup from "yup"
import clsx from "clsx";
import PhoneInput from "react-phone-input-2";
import { userProfile, updateProfile } from "../../utils/Api";
import { Modal } from "react-bootstrap";
import PopVerify from "../verification/PopVerify";
import { senderAreaList as areaList } from "../../utils/ArealList";

const Step1 = ({ nextStep, values }) => {
    const user_data = JSON.parse(sessionStorage.getItem("remi-user-dt"))
  const [open_modal, setOpenModal] = useState(false)
  const [is_otp_verified, setIsOtpVerfied] = useState(false)
  const [loading, setLoading] = React.useState(false);
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])
  const [is_update, setIsUpdate] = useState({ email: "", mobile: "" })
  const [postal_list, setPostalList] = useState([])
  const [data, setData] = useState({
    First_name: "", Middle_name: "", Last_name: "",
    Gender: "Male", Country_of_birth: "",
    Date_of_birth: "", flat: "", building: "",
    street: "", city: "none", country: "none",
    postcode: "", state: "none", email: "", mobile: "", occupation: "",
    customer_id: "", country_code: "AU", payment_per_annum: "Tier 1 - Less than 5 times", value_per_annum: "Tier 1 - Less than $30,000"
  })
  const handleNextStep = () => {
    // Validate required fields before proceeding
    const requiredFields = ["First_name", "Last_name", "email", "mobile", "Date_of_birth", "Country_of_birth", "occupation"];
    const missingFields = requiredFields.filter(field => !formik.values[field]);

    if (missingFields.length > 0) {
      // Optionally, you can log a message or take another action here
      console.log(`Required fields are missing: ${missingFields.join(", ")}`);
      return;
    }

    // Proceed to the next step if all required fields are filled
    nextStep();
  };
  const [selected_area_code, setSelectedAreaCode] = useState("61");


  const initialValues = {
    First_name: "", Middle_name: "", Last_name: "",
    Gender: "Male", Country_of_birth: "",
    Date_of_birth: "", flat: "", building: "",
    street: "", city: "none", country: "none",
    postcode: "", state: "none", email: "", mobile: "", occupation: "",
    customer_id: "", payment_per_annum: "Tier 1 - Less than 5 times", value_per_annum: "Tier 1 - Less than $30,000"
  }

  const profileSchema = Yup.object().shape({
    First_name: Yup.string().min(2).max(25).required().trim(),
    Last_name: Yup.string().min(2).max(25).required().trim(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(9).max(10).required(),
    flat: Yup.string().min(1).max(30).notRequired(),
    building: Yup.string().min(1).max(30).required().trim(),
    street: Yup.string().min(1).max(30).required().trim(),
    city: Yup.string().min(1).max(35).required().trim().notOneOf(["none"]),
    postcode: Yup.string().length(4).required(),
    state: Yup.string().min(2).max(35).required().notOneOf(["none"]),
    country: Yup.string().min(2).max(30).required().notOneOf(["none"]),
    Date_of_birth: Yup.date().min(new Date(Date.now() - 3721248000000))
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required(),
    occupation: Yup.string().min(1).max(50).required().trim(),
    Country_of_birth: Yup.string().required().notOneOf(["none"]),
    payment_per_annum: Yup.string().required().notOneOf(["none"]),
    value_per_annum: Yup.string().required().notOneOf(["none"]),
  })


  const handleOtpVerification = (value) => {
    setIsOtpVerfied(value)
  }

  useEffect(() => {
    setLoading(true)
    userProfile().then((res) => {
      if (res.code == "200") {
        setLoading(false)
        console.log(res.data)
        let p = res.data.mobile
        let phone = p.substring(3);
        setSelectedAreaCode(p.substring(1, 3))
        setData({ ...data, ...res.data, mobile: phone, occupation: res?.data?.occupation?.toLowerCase() !== "none" ? res?.data?.occupation : "" })
        formik.setValues({ ...formik.values, ...res.data, mobile: phone, occupation: res?.data?.occupation?.toLowerCase() !== "none" ? res?.data?.occupation : "" })
        setIsUpdate({ email: res.data.email, mobile: p })
      }
    }).catch((error) => {
      if (error.response.data.code == "400") {
        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
      }
      setLoading(false)
    })
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    var minDate = year - 100 + '-' + month + "-" + day
    document.getElementById("dob").setAttribute('max', maxDate);
    document.getElementById("dob").setAttribute('min', minDate);
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setOpenModal(true)
    }
  })

  const countryOptions = useMemo(() => birthCountryList().getData(), [])



  useEffect(() => {
    if (data.country !== "none") {
      let array_1 = countryList?.filter((item) => {
        return item?.name === data.country
      })
      let array = array_1[0]?.states;
      setData({ ...data, state: "none", city: "none", postcode: "" })
      formik.setValues({ ...formik.values, city: "none", postcode: "", state: "none" })
      if (array) {
        array.sort((a, b) => (a.state > b.state) ? 1 : -1);
      }
      setStateList(array);
    } else if (data.country === "none") {
      setData({ ...data, city: "none", postcode: "", state: "none" })
      formik.setValues({ ...formik.values, city: "none", postcode: "", state: "none" })
      setCityList([])
      setStateList([])
      setPostalList([])
    }
  }, [data.country])

  useEffect(() => {
    if (data.state !== "none" && state_list && state_list.length > 0) {
      let array = state_list.filter((item) => {
        return item?.state === data?.state
      })
      array.sort((a, b) => (a.city > b.city) ? 1 : -1);

      setCityList(array);
    } else if (data.state === "none") {
      setData({ ...data, city: "none", postcode: "" })
      formik.setValues({ ...formik.values, city: "none", postcode: "" })
      setCityList([])
    }

  }, [data.state, state_list])

  useEffect(() => {
    if (data.city !== "none") {
      let postals = city_list.filter((item) => {
        return item?.city === data?.city && item?.state === data?.state
      })
      setPostalList(postals)
      setData({ ...data, postcode: postals[0]?.post_code })
      formik.setValues({ ...formik.values, postcode: postals[0]?.post_code })
    } else if (data.city === "none") {
      setData({ ...data, postcode: "" })
      formik.setValues({ ...formik.values, postcode: "" })
      setPostalList([])
    }

  }, [data.city, city_list])



  const handleNumericOnly = (event) => {
    const result = event.target.value.replace(/[^0-9]/, "");
    setData({ ...data, [event.target.name]: result })
    formik.setFieldValue(event.target.name, result)
  }

  const handleChange = (e) => {
    if (e.target.name === 'country') {
      countryList.map((item) => {
        if (item.name === e.target.value) {
          setData({ ...data, country_code: item.iso2 })
          setSelectedAreaCode(item.phone_code)
        }
      })
    }
    setData({ ...data, [e.target.name]: e.target.value })
    formik.setFieldValue(`${[e.target.name]}`, e.target.value)
    formik.setFieldTouched(`${[e.target.name]}`, true)
  }

  const handlePhone = (e, coun) => {
    formik.setFieldValue('mobile', e);
    formik.setFieldTouched('mobile', true);
    formik.setFieldValue('country', coun.name)
    setData({ ...data, country: coun.name, mobile: e })
  }

  const handleKeyDown = (e, max) => {
    if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === "ArrowRight" || e.key === "Escape" || e.key === "Delete" || e.key === " ") {
      setData({ ...data, [e.target.name]: e.target.value })
      formik.setFieldValue(`${[e.target.name]}`, e.target.value)
      formik.setFieldTouched(`${[e.target.name]}`, true)
    } else {
      const value = e.target.value.toString()

      if (value.length >= max) {

        e.stopPropagation()
        e.preventDefault()

      } else {
        const pattern = /^[A-Za-z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
        if (!pattern.test(e.key)) {
          e.preventDefault();
          e.stopPropagation()
        } else {
          setData({ ...data, [e.target.name]: e.target.value })
          formik.setFieldValue(`${[e.target.name]}`, e.target.value)
          formik.setFieldTouched(`${[e.target.name]}`, true)
        }
      }
    }
  }
  const handleEmail = (e, max) => {
    if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === "ArrowRight" || e.key === "Escape" || e.key === "Delete") {
      setData({ ...data, [e.target.name]: e.target.value })
      formik.setFieldValue(`${[e.target.name]}`, e.target.value)
      formik.setFieldTouched(`${[e.target.name]}`, true)
    } else {
      const value = e.target.value.toString()
      if (value.length >= max) {
        e.stopPropagation()
        e.preventDefault()

      } else {
        setData({ ...data, [e.target.name]: e.target.value })
        formik.setFieldValue(`${[e.target.name]}`, e.target.value)
        formik.setFieldTouched(`${[e.target.name]}`, true)
      }
    }
  }

  const handleOnlyAplha = (event) => {
    const result = event.target.value.replace(/[^A-Za-z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]/gi, "");
    setData({ ...data, [event.target.name]: result })
    formik.setFieldValue(event.target.name, result)
    formik.setFieldTouched(event.target.name, true)
  }

  const handleSubmit = () => {
    let d = formik.values
    d.mobile = "+" + selected_area_code + data.mobile
    d.country_code = data.country_code
    d.location = formik.values.country
    d.Gender = "NA"
    delete d['country']
    if (formik.values.Middle_name === "" || formik.values.Middle_name === undefined || formik.values.Middle_name === " ") {
      delete d['Middle_name'];
    }
    if (formik.values.flat === "" || formik.values.flat === undefined || formik.values.flat === " ") {
      delete d['flat'];
    }
    if (is_update.email === d.email) {
      delete d['email']
    }
    if (is_update.mobile === d.mobile) {
      delete d['mobile']
    }
    setLoading(true)
    updateProfile(d).then(res => {
      setLoading(false)
      if (res.code === "200") {
        let user = JSON.parse(sessionStorage.getItem("remi-user-dt"))
        let local = { ...res.data, digital_id_verified: user?.digital_id_verified }
        localStorage.removeItem("remi-user-dt")
        sessionStorage.setItem("remi-user-dt", JSON.stringify(local))
        setLoading(false)
        toast.success("Profile Update Successful", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        formik.resetForm()
        setLoading(true)
        userProfile().then((res) => {
          if (res.code == "200") {
            setLoading(false)
            let p = res.data.mobile
            let phone = p.substring(3)
            setData({ ...res.data, mobile: phone })
            formik.setValues({ ...res.data, mobile: phone })
            setIsUpdate({ email: res.data.email, mobile: p })
          }
        }).catch((error) => {
          if (error.response.data.code == "400") {
            toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
          }
          setLoading(false)
        })
      } else if (res.code === "400") {
        toast.error(res.message, { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
      }
    }).catch((err) => {
      setLoading(false)
      toast.error(err.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
    })

  }

  useEffect(() => {
    if (is_otp_verified === true) {
      handleSubmit()
      setIsOtpVerfied(false)
    }
  }, [is_otp_verified])

  const onKeyBirth = (event) => {
    if (data.Date_of_birth !== "" || null || undefined) {
      if (event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  useEffect(() => {
    console.log(data)
    console.log("formik", formik.values)
  }, [data])

  useEffect(() => {
    countryList.map((item) => {
      if (item.phone_code === selected_area_code) {
        setData({ ...data, country_code: item.iso2, country: item.name })
        formik.setFieldValue("country", item.name)
      }
    })
  }, [selected_area_code])

    return (
        <>
       
       <section className="kyc">
           
            <form onSubmit={formik.handleSubmit} noValidate className="single-recipient">
              <div className="">
                <div className="">
                  <div className="row each-row">
                    <h5>Personal Details</h5>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="First_name"
                          value={formik.values.First_name}
                          onChange={handleOnlyAplha}
                          readOnly={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          disabled={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          maxLength="25"
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid':formik.touched.First_name && formik.errors.First_name },
                            {
                              'is-valid': user_data?.digital_id_verified?.toString().toLowerCase() === "false" && formik.touched.First_name && !formik.errors.First_name
                            }
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Middle Name</p>
                        <input
                          type="text"
                          name="Middle_name"
                          className='form-control'
                          maxLength="25"
                          onChange={handleOnlyAplha}
                          readOnly={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          disabled={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          {...formik.getFieldProps("Middle_name")}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="Last_name"
                          value={data.Last_name}
                          maxLength="25"
                          onChange={handleOnlyAplha}
                          readOnly={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          disabled={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid':  formik.touched.Last_name && formik.errors.Last_name },
                            {
                              'is-valid': user_data?.digital_id_verified?.toString().toLowerCase() === "false" && formik.touched.Last_name && !formik.errors.Last_name,
                            }
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row each-row">
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Customer Id</p>
                        <input
                          type="text"
                          value={data.customer_id}
                          style={{ backgroundColor: "rgba(252, 253, 255, 0.81)" }}
                          className='form-control'
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="email"
                          value={data.email}
                          style={{ backgroundColor: "rgba(252, 253, 255, 0.81)" }}
                          onKeyDown={(e) => { handleEmail(e, 50) }}
                          {...formik.getFieldProps("email")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.email && formik.errors.email },
                            {
                              'is-valid': formik.touched.email && !formik.errors.email,
                            }
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                        <div className="row kustom_mobile">
                          <div className="col-md-6 px-0">
                            <select className="form-control form-select bg-transparent" value={selected_area_code} onChange={(e) =>
                              setSelectedAreaCode(e.target.value)}>
                              {
                                areaList?.map((area, index) => {
                                  return (
                                    <option key={index} value={area?.code}>+{area?.code}&nbsp;{area?.name}</option>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <div className={`col-md-6 px-0`}>
                            <input
                              type="text"
                              name="mobile"
                              value={data.mobile}
                              id="mobile"
                              maxLength="10"
                              onChange={(e) => handleNumericOnly(e)}
                              className={clsx(
                                'form-control bg-transparent',
                                { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                                {
                                  'is-valid': formik.touched.mobile && !formik.errors.mobile,
                                }
                              )}
                            />
                          </div>
                        </div>
                        {/* <PhoneInput
                          onlyCountries={["au", "nz"]}
                          name="mobile"
                          value={data.mobile}
                          inputStyle={{ border: "none", margin: "none" }}
                          inputClass="userPhone w-100"
                          defaultCountry={"au"}
                          placeholder=""
                          countryCodeEditable={false}
                          onChange={(val, coun) => { handlePhone(val, coun) }}
                          className={clsx(
                            'form-control form-control-sm bg-transparent py-0',
                            { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                            {
                              'is-valid': formik.touched.mobile && !formik.errors.mobile,
                            }
                          )}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="row each-row">
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Date of Birth<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="date"
                          name="Date_of_birth"
                          value={data.Date_of_birth}
                          id="dob"
                          onChange={(e) => handleChange(e)}
                          onKeyDown={(event) => { onKeyBirth(event) }}
                          readOnly={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          disabled={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          // onkeydown={(e) => { e.stopPropagation() }}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.Date_of_birth && formik.errors.Date_of_birth },
                            {
                              'is-valid': user_data?.digital_id_verified?.toString().toLowerCase() === "false" && formik.touched.Date_of_birth && !formik.errors.Date_of_birth,
                            }
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Country Of Birth<span style={{ color: 'red' }} >*</span></p>
                        <select
                          value={data.Country_of_birth}
                          name="Country_of_birth"
                          onChange={(e) => handleChange(e)}
                          readOnly={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          disabled={user_data?.digital_id_verified?.toString().toLowerCase() === "true"}
                          className={clsx(
                            'form-control form-select bg-transparent',
                            { 'is-invalid':  formik.touched.Country_of_birth && formik.errors.Country_of_birth },
                            {
                              'is-valid': user_data?.digital_id_verified?.toString().toLowerCase() === "false" && formik.touched.Country_of_birth && !formik.errors.Country_of_birth,
                            }
                          )}
                        >
                          <option>Select a country</option>
                          {
                            countryOptions && countryOptions.length > 0 ?
                              countryOptions?.map((opt) => {
                                return (
                                  <option value={opt.label}>{opt.label}</option>
                                )
                              }) : ""
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Occupation<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="occupation"
                          value={data.occupation}
                          id="occupation"
                          maxLength="50"
                          onChange={(e) => handleOnlyAplha(e)}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.occupation && formik.errors.occupation },
                            {
                              'is-valid': formik.touched.occupation && !formik.errors.occupation,
                            }
                          )}
                        />
                      </div>
                    </div>
                  </div>
               
             
               
               
                </div>
              </div>
              <div className="next-step">
              <button onClick={handleNextStep}  className="login_button">Next <b>Step</b>  <img src="assets/img/home/Union.png" className="vission_image" alt="alt_image" /></button>
              <button onClick={nextStep} className="SKip">Skip</button>
              </div>
            </form>
          </section>
         
        </>
          
          )
        }

export default Step1;
