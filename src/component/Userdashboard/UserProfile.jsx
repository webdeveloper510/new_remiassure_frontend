
import React, { useState, useEffect, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Sidebar from './Sidebar';
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import birthCountryList from 'react-select-country-list';
import countryList from '../../utils/AuNz.json';
import * as Yup from "yup"
import clsx from "clsx";
import PhoneInput from "react-phone-input-2";
import { userProfile, updateProfile } from "../../utils/Api";
import authDashHelper from "../../utils/AuthDashHelper";
import { Modal } from "react-bootstrap";
import PopVerify from "../verification/PopVerify";



const Profile = () => {

  const navigate = useNavigate()
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
    customer_id: "", country_code: "AU", payment_per_annum: "none", value_per_annum: "none"
  })

  const initialValues = {
    First_name: "", Middle_name: "", Last_name: "",
    Gender: "Male", Country_of_birth: "",
    Date_of_birth: "", flat: "", building: "",
    street: "", city: "none", country: "none",
    postcode: "", state: "none", email: "", mobile: "", occupation: "",
    customer_id: "", payment_per_annum: "none", value_per_annum: "none"
  }

  const profileSchema = Yup.object().shape({
    First_name: Yup.string().min(2).max(25).required().trim(),
    Last_name: Yup.string().min(2).max(25).required().trim(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(11).max(18).required(),
    flat: Yup.string().min(1).max(15).notRequired().trim(),
    building: Yup.string().min(1).max(30).required().trim(),
    street: Yup.string().min(1).max(30).required().trim(),
    city: Yup.string().min(1).max(35).required().trim().notOneOf(["none"]),
    postcode: Yup.string().length(4).required(),
    state: Yup.string().min(2).max(35).required().notOneOf(["none"]),
    country: Yup.string().min(2).max(30).required().notOneOf(["none"]),
    Date_of_birth: Yup.date().required(),
    occupation: Yup.string().min(1).max(25).required().trim(),
    Country_of_birth: Yup.string().required().notOneOf(["none"]),
    payment_per_annum: Yup.string().required().notOneOf(["none"]),
    value_per_annum: Yup.string().required().notOneOf(["none"]),
  })


  const handleOtpVerification = (value) => {
    setIsOtpVerfied(value)
  }

  useEffect(() => {
    if (authDashHelper('dashCheck') === false) {
      navigate("/send-money")
    } else {
      setLoading(true)
      userProfile().then((res) => {
        if (res.code == "200") {
          setLoading(false)
          let p = res.data.mobile
          let phone = p.split("+");
          setData({ ...res.data, mobile: phone[1] })
          formik.setValues({ ...res.data, mobile: phone[1] })
          setIsUpdate({ email: res.data.email, mobile: phone[1] })
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
      var year = dtToday.getFullYear();
      if (month < 10)
        month = '0' + month.toString();
      if (day < 10)
        day = '0' + day.toString();
      var maxDate = year + '-' + month + '-' + day;
      var minDate = year - 100 - (year % 10) + '-' + month + "-" + day
      document.getElementById("dob").setAttribute('max', maxDate);
      document.getElementById("dob").setAttribute('min', minDate);
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setOpenModal(true)
    }
  })

  const countryOptions = useMemo(() => birthCountryList().getData(), [])

  // useEffect(() => {
  //   const value = data.country !== "" ? data.country : countryList[0]?.name
  //   if (data.country == "") {
  //     setData({ ...data, country: countryList[0]?.name, country_code: countryList[0]?.iso2 })
  //     formik.setFieldValue("country", countryList[0]?.name)
  //   }
  //   countryList?.map((item) => {
  //     if (item?.name === value) {
  //       setStateList(item?.states);
  //       setData({ ...data, state: item?.states[0].name })
  //       formik.setFieldValue("state", item?.states[0].name)
  //     }
  //   })
  // }, [data.country])

  // useEffect(() => {
  //   const value = data.state !== "" ? data.state : state_list[0]?.name
  //   state_list?.map((item) => {
  //     if (item?.name === value) {
  //       setCityList(item?.cities);
  //       setData({ ...data, city: item?.cities[0].name })
  //       formik.setFieldValue("city", item?.cities[0].name)
  //     }
  //   })
  // }, [data.state])

  useEffect(() => {
    if (data.country !== "none") {
      let array_1 = countryList?.filter((item) => {
        return item?.name === data.country
      })
      let array = array_1[0]?.states;
      setData({ ...data, country_code: array_1[0]?.iso2, state: "none", city: "none", postcode: "" })
      array.sort((a, b) => (a.state > b.state) ? 1 : -1);
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
    if (data.state !== "none" && state_list.length > 0) {
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

  // useEffect(() => {
  //   if (data.postcode !== "") {
  //     console
  //     if (data.postcode.length === 4) {
  //       let array = state_list.filter((item) => {
  //         return item.post_code === data?.postcode
  //       })
  //       array.sort((a, b) => (a.city > b.city) ? 1 : -1);
  //       setCityList(array)
  //       setData({ ...data, city: array[0]?.city, state: array[0]?.state })
  //       formik.setValues({ ...formik.values, city: array[0]?.city, state: array[0]?.state })
  //     }
  //   }
  // }, [data.postcode])


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
    setData({ ...data, country: coun.name, mobile: "+" + e })
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
    d.country_code = data.country_code
    d.location = formik.values.country
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
    } else {
      d.mobile = "+" + d.mobile
    }
    setLoading(true)
    updateProfile(d).then(res => {
      if (res.code === "200") {
        localStorage.removeItem("remi-user-dt")
        let local = { ...res.data, digital_id_verified: "true" }
        localStorage.setItem("remi-user-dt", JSON.stringify(local))
        setLoading(false)
        toast.success("Profile Update Successful", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
      } else {
        setLoading(false)
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

  return (
    <>
      <div className="margin-set">
        <div className="tabs-page">
          <Sidebar />
          <div className="content-body">
            <section className="edit_recipient_section">
              <div className="form-head mb-4">
                <h2 className="text-black font-w600 mb-0"><b>Profile Update</b></h2></div>
              <form onSubmit={formik.handleSubmit} noValidate className="single-recipient">
                <div className="card">
                  <div className="card-body">
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
                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.First_name && formik.errors.First_name },
                              {
                                'is-valid': formik.touched.First_name && !formik.errors.First_name
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
                            onChange={handleOnlyAplha}
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
                            onChange={handleOnlyAplha}
                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.Last_name && formik.errors.Last_name },
                              {
                                'is-valid': formik.touched.Last_name && !formik.errors.Last_name,
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
                          <PhoneInput
                            onlyCountries={["au", "nz"]}
                            country={data?.country_code ? data?.country_code?.toLowerCase() : "au"}
                            name="mobile"
                            value={data.mobile}
                            inputStyle={{ border: "none", margin: "none" }}
                            inputClass="userPhone w-100"
                            defaultCountry={"au"}
                            countryCodeEditable={false}
                            onChange={(val, coun) => { handlePhone(val, coun) }}
                            className={clsx(
                              'form-control form-control-sm bg-transparent py-0',
                              { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                              {
                                'is-valid': formik.touched.mobile && !formik.errors.mobile,
                              }
                            )}
                          />
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
                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.Date_of_birth && formik.errors.Date_of_birth },
                              {
                                'is-valid': formik.touched.Date_of_birth && !formik.errors.Date_of_birth,
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
                            className={clsx(
                              'form-control form-select bg-transparent',
                              { 'is-invalid': formik.touched.Country_of_birth && formik.errors.Country_of_birth },
                              {
                                'is-valid': formik.touched.Country_of_birth && !formik.errors.Country_of_birth,
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
                    <div className="row each-row">
                      <h5>Account Usage</h5>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Projected frequency of the payments per annum<span style={{ color: 'red' }} >*</span></p>
                          <select
                            value={data.payment_per_annum}
                            name="payment_per_annum"
                            onChange={(e) => handleChange(e)}
                            className={clsx(
                              'form-control form-select bg-transparent',
                              { 'is-invalid': formik.touched.payment_per_annum && formik.errors.payment_per_annum },
                              {
                                'is-valid': formik.touched.payment_per_annum && !formik.errors.payment_per_annum,
                              }
                            )}
                          >
                            <option value="none" key="none">Select a frequency</option>
                            <option value="Less than 5 times" key="Less than 5 times">Less than 5 times</option>
                            <option value="5-10 times" key="5-10 times">5-10 times</option>
                            <option value="Greater then 10 times" key="Greater then 10 times">Greater then 10 times</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Projected frequency of the value per annum<span style={{ color: 'red' }} >*</span></p>
                          <select
                            value={data.value_per_annum}
                            name="value_per_annum"
                            onChange={(e) => handleChange(e)}
                            className={clsx(
                              'form-control form-select bg-transparent',
                              { 'is-invalid': formik.touched.value_per_annum && formik.errors.value_per_annum },
                              {
                                'is-valid': formik.touched.value_per_annum && !formik.errors.value_per_annum,
                              }
                            )}
                          >
                            <option value="none" key="none">Select a frequency</option>
                            <option value="Less than $30,000" key="Less than $30,000">Less than $30,000</option>
                            <option value="$30,000-$100,000" key="$30,000-$100,000">$30,000-$100,000</option>
                            <option value="Greater than $100,000" key="Greater than $100,000">Greater than $100,000</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row each-row">
                      <h5>Address</h5>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="country">
                          <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                          <select
                            value={data.country}
                            name="country"
                            onChange={(e) => handleChange(e)}
                            className={clsx(
                              'form-control form-select bg-transparent',
                              { 'is-invalid': formik.touched.country && formik.errors.country },
                              {
                                'is-valid': formik.touched.country && !formik.errors.country,
                              }
                            )}
                          >
                            <option value={"none"} >Select a country</option>
                            <option value={"Australia"} >Australia</option>
                            <option value={"New Zealand"} >New Zealand</option>
                          </select>
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="state">
                          <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
                          {
                            state_list && state_list.length > 0 ?
                              (<select
                                value={data.state}
                                name="state"
                                onChange={(e) => handleChange(e)}
                                className={clsx(
                                  'form-control form-select bg-transparent',
                                  { 'is-invalid': formik.touched.state && formik.errors.state },
                                  {
                                    'is-valid': formik.touched.state && !formik.errors.state,
                                  }
                                )}
                              >
                                <option value={"none"} key={"none"}>Select a state</option>
                                {state_list?.map((opt, index) => {
                                  if (opt?.state !== state_list[index - 1]?.state) {
                                    return (
                                      <option value={opt?.state} key={index}>{opt?.state}</option>
                                    )
                                  }
                                })
                                }
                              </select>) :
                              (<input
                                type="text"
                                placeholder='No country selected'
                                className={clsx(
                                  'form-control form-select bg-transparent',
                                  { 'is-invalid': formik.touched.state && formik.errors.state },
                                  {
                                    'is-valid': formik.touched.state && !formik.errors.state,
                                  }
                                )}
                                readOnly
                              />)
                          }
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="city">
                          <p className="get-text">City/Suburb<span style={{ color: 'red' }} >*</span></p>
                          {
                            city_list && city_list.length > 0 ? (
                              <select
                                value={data.city}
                                name="city"
                                onChange={(e) => handleChange(e)}
                                className={clsx(
                                  'form-control form-select bg-transparent',
                                  { 'is-invalid': formik.touched.city && formik.errors.city },
                                  {
                                    'is-valid': formik.touched.city && !formik.errors.city,
                                  }
                                )}
                              >
                                <option value="none" key="none">Select a city</option>
                                {city_list?.map((opt, index) => {
                                  if (city_list[index]?.city !== city_list[index - 1]?.city && opt?.city !== "") {
                                    return (
                                      <option value={opt?.city} key={index}>{opt?.city}</option>
                                    )
                                  }
                                })
                                }
                              </select>
                            ) : (
                              <input
                                type="text"
                                name="city"
                                placeholder='No state selected'
                                className={clsx(
                                  'form-control form-select bg-transparent',
                                  { 'is-invalid': formik.touched.city && formik.errors.city },
                                  {
                                    'is-valid': formik.touched.city && !formik.errors.city,
                                  }
                                )}
                                readOnly
                              />
                            )
                          }
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="postal">
                          <p className="get-text">Zip/Postal Code<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            name="postcode"
                            value={data.postcode}
                            maxLength="4"
                            list='postal_list'
                            onChange={handleNumericOnly}
                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.postcode && formik.errors.postcode },
                              {
                                'is-valid': formik.touched.postcode && !formik.errors.postcode,
                              }
                            )}
                          />
                          <datalist id="postal_list">
                            {
                              postal_list.length > 0 && postal_list?.map((opt, index) => {
                                return <option value={opt.post_code} key={index} />
                              })
                            }
                          </datalist>
                        </Form.Group>
                        {/* <p>{formik.errors.postcode}</p> */}
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="flat">
                          <p className="get-text">Flat/Unit No.</p>
                          <input
                            type="text"
                            name="flat"
                            value={data.flat}
                            onKeyDown={(e) => { handleEmail(e, 15) }}
                            {...formik.getFieldProps("flat")}
                            className='form-control bg-transparent'
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="building">
                          <p className="get-text">Building No.<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            name="building"
                            value={data.building}
                            onKeyDown={(e) => { handleEmail(e, 30) }}
                            {...formik.getFieldProps("building")}

                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.building && formik.errors.building },
                              {
                                'is-valid': formik.touched.building && !formik.errors.building,
                              }
                            )}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="street">
                          <p className="get-text">Street<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            name="street"
                            value={data.street}
                            onKeyDown={(e) => { handleEmail(e, 30) }}
                            {...formik.getFieldProps("street")}
                            className={clsx(
                              'form-control bg-transparent',
                              { 'is-invalid': formik.touched.street && formik.errors.street },
                              {
                                'is-valid': formik.touched.street && !formik.errors.street,
                              }
                            )}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                      </div>
                      <div className="col-md-8">
                        <button
                          type="submit"
                          className="form-button"
                        >
                          Update
                          {loading ? <>
                            <div className="loader-overly">
                              <div className="loader" >
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
      <Modal show={open_modal} onHide={() => setOpenModal(false)} backdrop="static" centered>
        <PopVerify handler={handleOtpVerification} close={() => { setOpenModal(false) }} phone={"+" + is_update.mobile} new_mobile={is_update.mobile != data.mobile ? "+" + data.mobile : null} />
      </Modal>
    </>
  )
}



export default Profile;