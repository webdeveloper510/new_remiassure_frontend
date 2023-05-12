import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from "yup";
import { useState } from 'react';
import countryList from 'react-select-country-list';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Axios } from 'axios';
import { useRef } from 'react';

const SenderDetails = ({ handleStep, step }) => {

  const userd = JSON.parse(localStorage.getItem("remi-user-dt"))
  const tdata = JSON.parse(localStorage.getItem("transfer_data"))
  const [display, setDisplay] = useState("none")
  const digitalRef = useRef(null)

  const [data, setData] = useState({
    f_name: "", m_name: "", l_name: "",
    gender: "Male", country_of_birth: "",
    dob: "", flat: "", build_no: "",
    street: "", city: "", country: "",
    post_code: "", state: "", email: userd.email, mobile: userd.mobile,
    customer_id: userd.customer_id
  })

  const initialValues = {
    f_name: "", m_name: " ", l_name: "",
    gender: "Male", country_of_birth: "",
    dob: "", flat: "", build_no: "",
    street: "", city: "", country: "",
    post_code: "", state: "", email: userd.email, mobile: userd.mobile,
    customer_id: userd.customer_id
  }

  const navigate = useNavigate()

  const senderSchema = Yup.object().shape({
    f_name: Yup.string().min(2).max(25).required(),
    l_name: Yup.string().min(2).max(25).required(),
    flat: Yup.string().min(2).max(15).required(),
    build_no: Yup.string().min(2).max(30).required(),
    street: Yup.string().min(2).max(30).required(),
    city: Yup.string().min(2).max(35).required(),
    post_code: Yup.string().min(2).max(20).required(),
    state: Yup.string().min(2).max(35).required(),
    country: Yup.string().min(2).max(30).required(),
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
      local.sender = { ...values, email: user.email, customer_id: user.customer_id, mobile: user.mobile }
      localStorage.removeItem("transfer_data")
      localStorage.setItem("transfer_data", JSON.stringify(local))
      if (localStorage.getItem("send-step")) {
        localStorage.removeItem("send-step")
      }
      localStorage.setItem("send-step", Number(step) + 1)
      handleStep(Number(step) + 1)
    }
  })

  const handleMobile = (event) => {
    const pattern = /^[0-9.,]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {

    } else {
      let value = event.target.value.toString()
      if (value.length >= 18) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          setData({ ...data, mobile: event.target.value })
          formik.setFieldValue('mobile', event.target.value)
        }
      }
    }
  }

  const handlePostCode = (event) => {
    const pattern = /^[0-9.,]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {

    } else {
      let value = event.target.value.toString()
      if (value.length >= 18) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          setData({ ...data, post_code: event.target.value })
          formik.setFieldValue('post_code', event.target.value)
          formik.setFieldTouched('post_code', true)
        }
      }
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name + "=" + e.target.value)
    setData({ ...data, [e.target.name]: e.target.value })
    formik.setFieldValue(`${[e.target.name]}`, e.target.value)
    formik.setFieldTouched(`${[e.target.name]}`, true)
    // console.log("---------------------------", formik.isValidating)
  }
  const countryOptions = useMemo(() => countryList().getData(), [])
  const verificationValue = localStorage.getItem("DigitalCode")

  const handleKeyDown = (e, max) => {
    if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === "ArrowRight") {
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
  const handleEmail = (e, max) => {
    if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === "ArrowRight") {
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

  useEffect(() => {
    formik.validateForm().then(res => {
      if (Object.keys(res).length == 0) {
        console.log(Object.keys(res).length || Object.keys(res).length == 1 && res.m_name)
        setDisplay("block")
        console.log("form valid")
      } else {
        console.log("else------------------------------")
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
          // console.log(2, "log2");

          // console.log(res, "codes")

          localStorage.setItem("DigitalCode", res.code)
          formik.handleSubmit()
        },
        onClick: function () {
        },
        onKeepAlive: function () {
          // console.log(4, "log")
        }
      });
    }

  }, []);

  useEffect(() => {
    if (localStorage.getItem("transfer_data")) {
      let tdata = JSON.parse(localStorage.getItem("transfer_data"))
      if (tdata?.sender) {
        setData(tdata?.sender)
        formik.setValues({ ...tdata?.sender })
      }
    }

  }, [step])


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
                onKeyDown={(e) => { handleKeyDown(e, 25) }}
                {...formik.getFieldProps("f_name")}
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.f_name && formik.errors.f_name },
                  {
                    'is-valid': formik.touched.f_name && !formik.errors.f_name,
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
                onKeyDown={(e) => { handleKeyDown(e, 25) }}
                {...formik.getFieldProps("m_name")}
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
                onKeyDown={(e) => { handleKeyDown(e, 25) }}
                {...formik.getFieldProps("l_name")}

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
                    defaultChecked={data.gender === "Male"}
                    {...formik.getFieldProps("gender")}
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
                    defaultChecked={data.gender === "Female"}
                    {...formik.getFieldProps("gender")}
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
                onKeyDown={(e) => { handleKeyDown(e, 50) }}
                {...formik.getFieldProps("email")}
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
                onKeyDown={(e) => handleMobile(e)}
                {...formik.getFieldProps("mobile")}
              />

            </div>
          </div>
        </div>
        <div className="row each-row">
          <h5>Address</h5>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Flat/Unit No.<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="flat"
                value={data.flat}
                onKeyDown={(e) => { handleEmail(e, 15) }}
                {...formik.getFieldProps("flat")}
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.flat && formik.errors.flat },
                  {
                    'is-valid': formik.touched.flat && !formik.errors.flat,
                  }
                )}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">Building No./Name<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="build_no"
                value={data.build_no}
                onKeyDown={(e) => { handleEmail(e, 30) }}
                {...formik.getFieldProps("build_no")}

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
                onKeyDown={(e) => { handleKeyDown(e, 30) }}
                {...formik.getFieldProps("street")}

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
                onKeyDown={(e) => handlePostCode(e)}
                {...formik.getFieldProps("post_code")}

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
            </div>
          </div>
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="state"
                value={data.state}
                onKeyDown={(e) => { handleKeyDown(e, 35) }}
                {...formik.getFieldProps("state")}

                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.state && formik.errors.state },
                  {
                    'is-valid': formik.touched.state && !formik.errors.state,
                  }
                )}
              />
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
                className={clsx(
                  'form-control form-select bg-transparent',
                  { 'is-invalid': formik.touched.country && formik.errors.country },
                  {
                    'is-valid': formik.touched.country && !formik.errors.country,
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
      </form>
      <div className="row each-row">
        <div className="col-md-2 new_buttonss">
          <button className="start-form-button" onClick={() => handleClear()}>Cancel</button>
        </div>
        <div className="col-md-10 new_buttons">
          {!verificationValue ? (
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