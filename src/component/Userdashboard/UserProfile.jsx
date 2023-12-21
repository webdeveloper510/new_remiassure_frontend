
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



const Profile = () => {
  const user_data = JSON.parse(localStorage.getItem("remi-user-dt"))
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
    mobile: Yup.string().min(11).max(18).required(),
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
        let phone = p.split("+");
        setData({ ...data, ...res.data, mobile: phone[1], occupation: res?.data?.occupation?.toLowerCase() !== "none" ? res?.data?.occupation : "" })
        formik.setValues({ ...formik.values, ...res.data, mobile: phone[1], occupation: res?.data?.occupation?.toLowerCase() !== "none" ? res?.data?.occupation : "" })
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
    } else {
      d.mobile = "+" + d.mobile
    }
    setLoading(true)
    updateProfile(d).then(res => {
      setLoading(false)
      if (res.code === "200") {
        let user = JSON.parse(localStorage.getItem("remi-user-dt"))
        let local = { ...res.data, digital_id_verified: user?.digital_id_verified }
        localStorage.removeItem("remi-user-dt")
        localStorage.setItem("remi-user-dt", JSON.stringify(local))
        setLoading(false)
        toast.success("Profile Update Successful", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        formik.resetForm()
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

  return (
    <>
      <section className="edit_recipient_section">
        <div className="form-head mb-4">
          <span className="text-black font-w600 mb-0 h2"><b>Profile Information</b>
          </span>
          {
            user_data?.digital_id_verified?.toString().toLowerCase() === "true" ? (
              <span className="verified_text px-2 py-1 fs-5 mx-3">
                <i className="bi bi-check-circle-fill text-success">&nbsp;</i>
                Verified
              </span>
            ) : (
              <span className="unverified_text px-2 py-1 fs-5 mx-3">
                <i className="bi bi-x-circle-fill text-danger">&nbsp;</i>
                Not Verified
              </span>
            )
          }

        </div>
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
                      maxLength="25"
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
                      maxLength="25"
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
                      maxLength="25"
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
                      // onkeydown={(e) => { e.stopPropagation() }}
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
              <div className="row each-row">
                <p className="mb-3"><span className="h5">Account Usage</span><span className='small'>&nbsp;(Utilization above tier 1 requires additional verification documents.)</span></p>
                <div className="col-md-6">
                  <div className="input_field">
                    <p className="get-text">Projected frequency of payments per annum<span style={{ color: 'red' }} >*</span></p>
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
                      <option value="Tier 1 - Less than 5 times" key="Less than 5 times">Tier 1 - Less than 5 times</option>
                      <option value="Tier 2 - 5 to 10 times" key="5-10 times">Tier 2 - 5 to 10 times</option>
                      <option value="Tier 3 - Greater than 10 times" key="Greater than 10 times">Tier 3 - Greater than 10 times</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input_field">
                    <p className="get-text">Projected value of payments per annum<span style={{ color: 'red' }} >*</span></p>
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
                      <option value="Tier 1 - Less than $30,000" key="Less than $30,000">Tier 1 - Less than $30,000</option>
                      <option value="Tier 2 - $30,000 to $100,000" key="$30,000-$100,000">Tier 2 - $30,000 to $100,000</option>
                      <option value="Tier 3 - Greater than $100,000" key="Greater than $100,000">Tier 3 - Greater than $100,000</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row each-row">
                <h5>Address</h5>
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
                  <Form.Group className="form_label" controlId="street">
                    <p className="get-text">Street Name<span style={{ color: 'red' }} >*</span></p>
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
                <div className="col-md-4 mb-3">
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

              </div>
              <div className="row each-row">
                <div className="col-md-4 mb-3">
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
              <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-8 full-col">
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

      <Modal show={open_modal} onHide={() => setOpenModal(false)} backdrop="static" centered>
        <PopVerify handler={handleOtpVerification} close={() => { setOpenModal(false) }} phone={"+" + is_update.mobile} new_mobile={is_update.mobile != data.mobile ? "+" + data.mobile : null} />
      </Modal>
    </>
  )
}



export default Profile;