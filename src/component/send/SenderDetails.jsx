import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from "yup";
import { useState } from 'react';
import countryList from 'react-select-country-list';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Axios } from 'axios';

const SenderDetails = ({ handleStep, step }) => {
  const userd = JSON.parse(localStorage.getItem("remi-user-dt"))
  const tdata = localStorage.getItem("transfer_data")

  const [data, setData] = useState({
    f_name: tdata?.sender?.f_name || "", m_name: tdata?.sender?.m_name || "", l_name: tdata?.sender?.l_name || "",
    email: userd.email, mobile: userd.mobile, customer_id: userd.customer_id, gender: tdata?.sender?.gender || "Male",
    country_of_birth: tdata?.sender?.country_of_birth || "", dob: tdata?.sender?.dob || "", flat: tdata?.sender?.flat || "",
    build_no: tdata?.sender?.build_no || "", street: tdata?.sender?.street || "", city: tdata?.sender?.city || "", country: tdata?.sender?.country || "",
    post_code: tdata?.sender?.post_code || "", state: tdata?.sender?.state || ""
  })

  const initialValues = {
    f_name: tdata?.sender?.f_name || "", m_name: tdata?.sender?.m_name || "", l_name: tdata?.sender?.l_name || "",
    email: userd.email, mobile: userd.mobile, customer_id: userd.customer_id, gender: tdata?.sender?.gender || "Male",
    country_of_birth: tdata?.sender?.country_of_birth || "", dob: tdata?.sender?.dob || "", flat: tdata?.sender?.flat || "",
    build_no: tdata?.sender?.build_no || "", street: tdata?.sender?.street || "", city: tdata?.sender?.city || "", country: tdata?.sender?.country || "",
    post_code: tdata?.sender?.post_code || "", state: tdata?.sender?.state || ""
  }

  const navigate = useNavigate()


  const senderSchema = Yup.object().shape({
    f_name: Yup.string().min(2).max(25).required(),
    l_name: Yup.string().min(2).max(25).required(),
    email: Yup.string().email().max(50).required(),
    mobile: Yup.string().min(7).max(18).required(),
    flat: Yup.string().min(2).max(10).required(),
    build_no: Yup.string().min(2).max(10).required(),
    street: Yup.string().min(2).max(100).required(),
    city: Yup.string().min(2).max(30).required(),
    post_code: Yup.string().min(2).max(20).required(),
    state: Yup.string().min(2).max(30).required(),
    country: Yup.string().min(2).max(30).required(),
    dob: Yup.date().required(),
    customer_id: Yup.string().required(),
    gender: Yup.string().required(),
    country_of_birth: Yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: senderSchema,
    onSubmit: async (values) => {
      const local = JSON.parse(localStorage.getItem("transfer_data"))
      local.sender = values
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
    if (event.key === 'Backspace') {

    }
    else if (!pattern.test(event.key)) {
      event.preventDefault();
      event.stopPropagation()
    } else {
      setData({ ...data, mobile: event.target.value })
      formik.setFieldValue('mobile', event.target.value)
    }
  }

  const handlePostCode = (event) => {
    const pattern = /^[0-9.,]+$/;
    if (event.key === 'Backspace') {

    }
    else if (!pattern.test(event.key)) {
      event.preventDefault();
      event.stopPropagation()
    } else {
      setData({ ...data, post_code: event.target.value })
      formik.setFieldValue('post_code', event.target.value)
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const countryOptions = useMemo(() => countryList().getData(), [])
  const verificationValue = localStorage.getItem("DigitalCode")

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
          console.log(1, "log");
          console.log(step, "stepdmskdmklm")
        },
        onComplete: function (res, error, onComplete) {
          console.log(2, "log2");

          console.log(res, "codes")

          localStorage.setItem("DigitalCode", res.code)
          formik.handleSubmit()
        },
        onClick: function () {
          console.log(3, "log")
        },
        onKeepAlive: function () {
          console.log(4, "log")
        }
      });

    }

  }, []);

  const handleCancel = () => {
    localStorage.removeItem("send-step")
    localStorage.removeItem("transfer_data")
    navigate("/")
  }

  const handlePrev = () => {
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) - 1)
    handleStep(Number(step) - 1)
  }

  return (
    <div className="form_body">
      <div className="header">
        <h1>Sender Details </h1>
      </div>
      <form autoComplete='off'>
        <div className="row each-row">
          <div className="col-md-4">
            <div className="input_field">
              <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="f_name"
                value={data.f_name}
                onChange={(e) => handleChange(e)}
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
                value={data.m_name}
                onChange={(e) => handleChange(e)}
                {...formik.getFieldProps("m_name")}

                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.m_name && formik.errors.m_name },
                  {
                    'is-valid': formik.touched.m_name && !formik.errors.m_name,
                  }
                )}

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
                onChange={(e) => handleChange(e)}
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
                readOnly
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
              <p className="get-text">Date of birth<span style={{ color: 'red' }} >*</span></p>
              <input
                type="date"
                name="DateofBirth"
                value={data.dob}
                onChange={(e) => handleChange(e)}
                {...formik.getFieldProps("dob")}
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
                value={data.country}
                name="country_of_birth"
                onChange={(e) => handleChange(e)}
                {...formik.getFieldProps("country_of_birth")}
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
                readOnly
                onChange={(e) => handleChange(e)}
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
          <div className="col-md-6">
            <div className="input_field">
              <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                value={data.mobile}
                onKeyDown={(e) => handleMobile(e)}
                {...formik.getFieldProps("mobile")}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                {...formik.getFieldProps("country")}
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
          <button className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
        </div>
        <div className="col-md-10 new_buttons">
          <button className="form-button" onClick={() => handlePrev()}>Previous</button>
          {!verificationValue ? (
            <div id="digitalid-verify"></div>
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