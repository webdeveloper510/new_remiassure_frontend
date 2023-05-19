import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from "yup";
import { useState } from 'react';
import birthCountryList from 'react-select-country-list';
import { useEffect } from 'react';
import countryList from '../../utils/senderCountries.json';

const SenderDetails = ({ handleStep, step }) => {

  const userd = JSON.parse(localStorage.getItem("remi-user-dt"))
  const [display, setDisplay] = useState("none")
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])

  const [data, setData] = useState({
    f_name: "", m_name: "", l_name: "",
    gender: "Male", country_of_birth: "",
    dob: "", flat: "", build_no: "",
    street: "", city: "", country: "Australia",
    post_code: "", state: "", email: userd.email, mobile: userd.mobile,
    customer_id: userd.customer_id, country_code: "AU"
  })

  const initialValues = {
    f_name: "", m_name: "", l_name: "",
    gender: "Male", country_of_birth: "",
    dob: "", flat: "", build_no: "",
    street: "", city: "", country: "Australia",
    post_code: "", state: "", email: userd.email, mobile: userd.mobile,
    customer_id: userd.customer_id
  }


  const senderSchema = Yup.object().shape({
    f_name: Yup.string().min(1).max(25).required(),
    l_name: Yup.string().min(1).max(25).required(),
    flat: Yup.string().min(1).max(15).notRequired(),
    build_no: Yup.string().min(1).max(30).required(),
    street: Yup.string().min(1).max(30).required(),
    city: Yup.string().min(1).max(35).required(),
    post_code: Yup.string().length(4).required(),
    state: Yup.string().min(2).max(35).required(),
    country: Yup.string().min(2).max(30).notRequired(),
    dob: Yup.date().required(),
    gender: Yup.string().required(),
    country_of_birth: Yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: senderSchema,
    onSubmit: async (values) => {
      const local = JSON.parse(localStorage.getItem("transfer_data"))
      const user = JSON.parse(localStorage.getItem("remi-user-dt"))
      local.sender = { ...values, email: user.email, customer_id: user.customer_id, mobile: user.mobile, country_code: data.country_code }
      localStorage.removeItem("transfer_data")
      localStorage.setItem("transfer_data", JSON.stringify(local))
      if (localStorage.getItem("send-step")) {
        localStorage.removeItem("send-step")
      }
      localStorage.setItem("send-step", Number(step) + 1)
      handleStep(Number(step) + 1)
    }
  })


  const verificationValue = localStorage.getItem("DigitalCode")
  const { digital_id_verified } = JSON.parse(localStorage.getItem("remi-user-dt"))
  const countryOptions = useMemo(() => birthCountryList().getData(), [])

  useEffect(() => {
    if (localStorage.getItem("transfer_data")) {
      let tdata = JSON.parse(localStorage.getItem("transfer_data"))
      if (tdata?.sender) {
        setData(tdata?.sender)
        formik.setValues({ ...tdata?.sender })
      }
    }

  }, [step])

  useEffect(() => {
    const value = data.country !== "" ? data.country : countryList[0]?.name
    console.log(data.country,"--------------------")
    if (data.country == "") {
      setData({ ...data, country: countryList[0]?.name, country_code: countryList[0]?.iso2 })
      formik.setFieldValue("country", countryList[0]?.name)
    }
    countryList?.map((item) => {
      if (item?.name === value) {
        setStateList(item?.states);
        setData({ ...data, state: item?.states[0].name })
        formik.setFieldValue("state", item?.states[0].name)
      }
    })
  }, [data.country])

  useEffect(() => {
    const value = data.state !== "" ? data.state : state_list[0]?.name
    state_list?.map((item) => {
      if (item?.name === value) {
        setCityList(item?.cities);
        setData({ ...data, city: item?.cities[0].name })
        formik.setFieldValue("city", item?.cities[0].name)
        formik.setFieldTouched("city", true)

      }
    })
  }, [data.state])


  const handleChange = (e) => {
    if (e.target.name === 'country') {
      countryList.map((item) => {

        if (item.name === e.target.value) {
          setData({ ...data, country_code: item.iso2 })
        }
      })
    }
    setData({ ...data, [e.target.name]: e.target.value })
    formik.setFieldValue(e.target.name, e.target.value)
    formik.setFieldTouched(e.target.name, true)
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
        const pattern = /^[A-z]+$/;
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

  useEffect(() => {
    formik.validateForm().then(res => {
      console.log(res)
      if (Object.keys(res).length == 0 ) {
        setDisplay("block")
      } else {
        setDisplay("none")
      }
    })
  }, [data])

  useEffect(() => {

    const script = document.createElement('script');

    script.src = 'https://digitalid-sandbox.com/sdk/app.js';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      window.digitalId.init({
        clientId: 'ctid2poVwlVfjH2PAnWEAB2l4v',
        uxMode: 'popup',
        onLoadComplete: function () {
        },
        onComplete: function (res, error, onComplete) {
          localStorage.setItem("DigitalCode", res.code)
          formik.handleSubmit()
        },
        onClick: function () {
        },
        onKeepAlive: function () {
        }
      });
    }


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
  }, []);

  const handleOnlyAplha = (event) => {
    const result = event.target.value.replace(/[^a-z ]/gi,"");
        setData({...data , [event.target.name] : result})
        formik.setFieldValue(event.target.name , result)
        formik.setFieldTouched(event.target.name , true)
  }

  const handleNumericOnly = (event) => {
    const result = event.target.value.replace(/[^0-9]/,"");
    setData({...data , [event.target.name] : result})
    formik.setFieldValue(event.target.name , result)
    formik.setFieldTouched(event.target.name , true)
  }

  const handleAddress = (event) => {
    const result = event.target.value.replace(/[^0-9A-z- /#._]/,"");
    setData({...data , [event.target.name] : result})
    formik.setFieldValue(event.target.name , result)
    formik.setFieldTouched(event.target.name , true)
  }

  const handleClear = () => {
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("send-step")
    localStorage.removeItem("DigitalCode")
    window.location.reload(true)
  }


  return (
    <div className="form_body">
      <div className="header">
        <h1>Sender Details </h1>
      </div>
      <form autoComplete='mukul' >
        <div className="row each-row">
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="f_name"
                value={data.f_name}
                maxLength="25"
                onChange={handleOnlyAplha} 
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.f_name && formik.errors.f_name },
                  {
                    'is-valid': formik.touched.f_name && !formik.errors.f_name
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
                name="m_name"
                className='form-control'
                value={data.m_name}
                maxLength="25"
                onChange={handleOnlyAplha} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="l_name"
                value={data.l_name}
                maxLength="25"
                onChange={handleOnlyAplha} 
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.l_name && formik.errors.l_name },
                  {
                    'is-valid': formik.touched.l_name && !formik.errors.l_name,
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div className="row each-row">
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Customer ID<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                value={data.customer_id}
                className='form-control'
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Date of birth<span style={{ color: 'red' }} >*</span></p>
              <input
                type="date"
                name="dob"
                value={data.dob}
                id="dob"
                onChange={(e) => handleChange(e)}
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.dob && formik.errors.dob },
                  {
                    'is-valid': formik.touched.dob && !formik.errors.dob,
                  }
                )}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Gender<span style={{ color: 'red' }} >*</span></p>
              <div className="inline-flex">
                <label className="container-new form-gender">
                  <span className="radio-tick">Male</span>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={data.gender === "Male"}
                    onChange={(e) => { handleChange(e) }}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-new form-gender">
                  <span className="radio-tick">Female</span>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={data.gender === "Female"}
                    onChange={(e) => { handleChange(e) }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row each-row">
          <div className="col-md-6">
            <div className="input_field">
              <p className="get-text">Country of Birth<span style={{ color: 'red' }} >*</span></p>
              <select
                value={data.country_of_birth}
                name="country_of_birth"
                onChange={(e) => handleChange(e)}
                className={clsx(
                  'form-control w-75 form-select bg-transparent',
                  { 'is-invalid': formik.touched.country_of_birth && formik.errors.country_of_birth },
                  {
                    'is-valid': formik.touched.country_of_birth && !formik.errors.country_of_birth,
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
        </div>
        <div className="row each-row">
          <div className="col-md-6">
            <div className="input_field">
              <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
              <input
                type="email"
                value={data.email}
                className='form-control'
                readOnly
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_field">
              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                value={data.mobile}
                className='form-control'
                readOnly
              />

            </div>
          </div>
        </div>
        <div className="row each-row">
          <h5>Address</h5>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Flat/Unit No.</p>
              <input
                type="text"
                name="flat"
                value={data.flat}
                onChange={handleAddress}
                maxLength="10"
                className='form-control bg-transparent'
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Building No.<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="build_no"
                value={data.build_no}
                onChange={handleAddress}
                maxLength="30"
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.build_no && formik.errors.build_no },
                  {
                    'is-valid': formik.touched.build_no && !formik.errors.build_no,
                  }
                )}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Street<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="street"
                value={data.street}
                onChange={handleAddress}
                maxLength="30"
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.street && formik.errors.street },
                  {
                    'is-valid': formik.touched.street && !formik.errors.street,
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div className="row each-row">
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Postcode<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="post_code"
                value={data.post_code}
                maxLength="4"
                onChange={handleNumericOnly}
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.post_code && formik.errors.post_code },
                  {
                    'is-valid': formik.touched.post_code && !formik.errors.post_code,
                  }
                )}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">City/Town<span style={{ color: 'red' }} >*</span></p>
              {
                city_list && city_list.length > 0 ? (
                  <select
                    value={data.city}
                    name="city"
                    onChange={(e) => handleChange(e)}
                    className='form-control form-select bg-transparent'
                  >

                    {city_list?.map((opt) => {
                      return (
                        <option value={opt?.name} id={opt?.id}>{opt?.name}</option>
                      )
                    })
                    }
                  </select>
                ) : (
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    onKeyDown={(e) => { handleKeyDown(e, 35) }}
                    {...formik.getFieldProps("city")}
                    className={clsx(
                      'form-control bg-transparent',
                      { 'is-invalid': formik.touched.city && formik.errors.city },
                      {
                        'is-valid': formik.touched.city && !formik.errors.city,
                      }
                    )}
                  />
                )
              }
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
              {
                state_list && state_list.length > 0 ?
                  (<select
                    value={data.state}
                    name="state"
                    onChange={(e) => handleChange(e)}
                    className='form-control form-select bg-transparent'
                  >

                    {state_list?.map((opt) => {
                      return (
                        <option value={opt?.name} id={opt?.id}>{opt?.name}</option>
                      )
                    })
                    }
                  </select>) :
                  (<input
                    type="text"
                    name="state"
                    value={data.state}
                    onKeyDown={(e) => { handleKeyDown(e, 30) }}
                    {...formik.getFieldProps("state")}
                    className={clsx(
                      'form-control bg-transparent',
                      { 'is-invalid': formik.touched.state && formik.errors.state },
                      {
                        'is-valid': formik.touched.state && !formik.errors.state,
                      }
                    )}
                  />)
              }
            </div>
          </div>
        </div>
        <div className="row each-row">
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Country Name<span style={{ color: 'red' }} >*</span></p>
              <select
                value={data.country}
                name="country"
                onChange={(e) => handleChange(e)}
                className='form-control form-select bg-transparent'
              >
                {
                  countryList && countryList.length > 0 ?
                    countryList?.map((opt) => {
                      return (
                        <option value={opt?.name} id={opt?.id}>{opt?.name}</option>
                      )
                    }) : ""
                }
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className="row each-row">
        <div className="col-md-2 new_buttonss">
          <button className="start-form-button" onClick={() => handleClear()}>Cancel</button>
        </div>
        <div className="col-md-10 new_buttons">
          {!verificationValue && digital_id_verified === "false" ? (
            <>
              <div className='digital_verification ' style={{ display: `${display == "none" ? "none" : "block"}` }}>
                <div id="digitalid-verify"></div>
              </div>
              {/* <button onCLick={() => { valid() }} style={{ display: `${display == "block" ? "none" : "block"}`, border: "1px solid rgb(0, 53, 166)", backgroundColor: "rgb(0, 69, 216)", width: "280px", height: "50px", borderRadius: "5px", padding: "10px", boxShadow: "rgba(11, 11, 11, 0.49) 0px 2px 4px 0px", cursor: "pointer" }} >
                <img src="https://digitalid-sandbox.com/sdk/images/verify-with-digital-id.svg" alt="Verify with Digital ID" style={{ marginTop: "3px", height: "22px" }} />
              </button> */}
            </>
          ) : (
            <>
              <button type='button' className="form-button" onClick={() => formik.handleSubmit()}> Continue</button>
            </>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default SenderDetails