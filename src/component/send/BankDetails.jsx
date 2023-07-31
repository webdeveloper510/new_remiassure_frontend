import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from 'clsx';
import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import countryList from "../../utils/recipientCountries.json"
import { useEffect } from 'react';

import PhoneInput from "react-phone-input-2";

const BankDetails = ({ handleBankDetail, handleStep, step }) => {
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])

  const [data, setData] = useState({
    bank: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "",
    reason: "", country_code: "GH"
  })

  const initialValues = {
    bank: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "",
    reason: ""
  }

  const [show, setShow] = useState(false)

  const [isAfrican, setIsAfrican] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("transfer_data")) {
      let tdata = JSON.parse(localStorage.getItem("transfer_data"))
      if (tdata?.recipient) {
        // console.log("tdata", tdata?.recipient)
        setData(tdata?.recipient)
        formik.setValues({ ...tdata?.recipient })
      }
    }

  }, [])

  useEffect(() => {
    const value = data.country !== "" ? data.country : countryList[0]?.name
    if (data.country == "") {
      setData({ ...data, country: countryList[0]?.name, country_code: countryList[0]?.iso2 })
      formik.setFieldValue("country", countryList[0]?.name)
    }
    countryList?.map((item) => {
      if (item?.name === value) {
        setStateList(item?.states);
        if (item.states.length > 0) {
          setData({ ...data, state: item?.states[0].name })
          formik.setFieldValue("state", item?.states[0].name)
        } else {
          setData({ ...data, state: "" })
          formik.setFieldValue("state", "")
        }
      }
    })
  }, [data.country])

  useEffect(() => {
    const value = data.state !== "" ? data.state : state_list[0]?.name
    state_list?.map((item) => {
      if (item?.name === value) {
        setCityList(item?.cities);
        if (item.cities.length > 0) {
          setData({ ...data, city: item?.cities[0].name })
          formik.setFieldValue("city", item?.cities[0].name)
        } else {
          setData({ ...data, city: "" })
          formik.setFieldValue("city", "")
        }
      }
    })
  }, [data.state])


  const bankSchema = Yup.object().shape({
    bank: Yup.string()
      .min(5, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required').trim(),
    acc_name: Yup.string().min(1).max(50).required().trim(),
    acc_no: Yup.string().min(5).max(18).required(),
    f_name: Yup.string().min(1).max(25).required().trim(),
    l_name: Yup.string().min(1).max(25).required().trim(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(11).max(18).required(),
    flat: Yup.string().min(1).max(30).notRequired(),
    build_no: Yup.string().min(1).max(30).required().trim(),
    street: Yup.string().min(1).max(30).required().trim(),
    city: Yup.string().min(1).max(35).required(),
    post_code: Yup.string().max(5).notRequired(),
    state: Yup.string().min(1).max(35).required(),
    country: Yup.string().min(2).max(30).required(),
    reason: Yup.string().min(2).max(30).oneOf(["Family Support", "Utility Payment", "Travel Payment", "Loan Payment", "Tax Payment", "Education"]).required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: bankSchema,
    onSubmit: async (values) => {
      setData({ ...values, country_code: data.country_code })
      handleBankDetail(data)
      setShow(true)

    }
  })

  const handlePhone = (e, coun) => {
    formik.setFieldValue('mobile', e);
    formik.setFieldTouched('mobile', true);
    formik.setFieldValue('country', coun.name)
    setData({ ...data, country: coun.name, mobile: e })
  }

  const handleReciept = (e) => {
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    local.recipient = data
    localStorage.removeItem("transfer_data")
    localStorage.setItem("transfer_data", JSON.stringify(local))
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) + 1)
    handleStep(Number(step) + 1)
  }

  const handlePrevious = () => {
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) - 1)
    handleStep(Number(step) - 1)
  }


  const handleCancel = () => {
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("send-step")
    window.location.reload(true)
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

  const handlePostCode = (event, max) => {
    const pattern = /^[0-9]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {
      setData({ ...data, [event.target.name]: event.target.value })
      formik.setFieldValue(event.target.name, event.target.value)
      formik.setFieldTouched(event.target.name, true)
    } else {

      let value = event.target.value.toString()
      if (value.length > max) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          setData({ ...data, [event.target.name]: event.target.value })
          formik.setFieldValue(event.target.name, event.target.value)
          formik.setFieldTouched(event.target.name, true)
        }
      }
    }
  }

  function validateInput(event) {
    const regex = event.target.name === "bank" ? /^[A-Za-z\s]*$/ : /^[A-Za-z\s\W]*$/;
    let userInput = event.target.value;
    if (!regex.test(userInput)) {
      if (event.target.name === "bank") {
        const filteredInput = userInput.replace(/[^A-Za-z\s]/g, '');
        userInput = filteredInput
      } else {
        const filteredInput = userInput.replace(/[^A-Za-z\s\W]/g, '');
        userInput = filteredInput
      }
    }
    setData({ ...data, [event.target.name]: userInput })
    formik.setFieldValue(event.target.name, userInput)
    formik.setFieldTouched(event.target.name, true)
  }

  function validateNumber(event) {
    const regex = /^[0-9]*$/;
    let userInput = event.target.value;
    if (!regex.test(userInput)) {
      const filteredInput = userInput.replace(/[^0-9]/g, '');
      userInput = filteredInput
    }
    setData({ ...data, [event.target.name]: userInput })
    formik.setFieldValue(event.target.name, userInput)
    formik.setFieldTouched(event.target.name, true)
  }

  function validateAddress(event) {
    const regex = /^[0-9A-z#-/]*$/;
    let userInput = event.target.value;
    if (!regex.test(userInput)) {
      const filteredInput = userInput.replace(/[^0-9A-z#-/]/g, '');
      userInput = filteredInput
    }
    setData({ ...data, [event.target.name]: userInput })
    formik.setFieldValue(event.target.name, userInput)
    formik.setFieldTouched(event.target.name, true)
  }

  function validateEmail(event) {
    const regex = /^[A-Za-z0-9._%+-@]*$/;
    let userInput = event.target.value;
    if (!regex.test(userInput)) {
      const filteredInput = userInput.replace(/[^A-Za-z0-9._%+-@]/g, '');
      userInput = filteredInput;
    } else {
      // Remove spaces from the input
      userInput = userInput.replace(/^[\s]/g, '');
    }
    setData({ ...data, [event.target.name]: userInput });
    formik.setFieldValue(event.target.name, userInput);
    formik.setFieldTouched(event.target.name, true);
  }


  return (
    <div>

      <form onSubmit={formik.handleSubmit}>

        <div className="form_body">
          <div className="header">
            <h1>Recipient Bank Details</h1>
          </div>
          <div className="col-md-12">
            <div className="input_field">
              <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                name="bank"
                value={formik.values?.bank}
                onChange={validateInput}
                maxLength={50}
                // onKeyDown={(e) => { handleKeyDown(e, 50) }}
                // {...formik.getFieldProps("bank")}
                className={clsx(
                  'form-control bg-transparent',
                  { 'is-invalid': formik.touched.bank && formik.errors.bank },
                  {
                    'is-valid': formik.touched.bank && !formik.errors.bank,
                  }
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input_field">
                <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="acc_name"
                  value={formik.values?.acc_name}
                  onChange={validateInput}
                  maxLength={50}
                  // onKeyDown={(e) => { handleKeyDown(e, 50) }}
                  // {...formik.getFieldProps("acc_name")}

                  className={clsx(
                    'form-control bg-transparent',
                    { 'is-invalid': formik.touched.acc_name && formik.errors.acc_name },
                    {
                      'is-valid': formik.touched.acc_name && !formik.errors.acc_name,
                    }
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input_field">
                <p className="get-text">Account Number<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="acc_no"
                  value={formik.values?.acc_no}
                  onChange={validateNumber}
                  maxLength={18}
                  // onKeyDown={(e) => { handlePostCode(e, 17) }}
                  // {...formik.getFieldProps("acc_no")}
                  className={clsx(
                    'form-control bg-transparent',
                    { 'is-invalid': formik.touched.acc_no && formik.errors.acc_no },
                    {
                      'is-valid': formik.touched.acc_no && !formik.errors.acc_no,
                    }
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row each-row">
            <h5>Recipient Details</h5>
            <div className="col-md-4 need_space">
              <div className="input_field">
                <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="f_name"
                  value={formik.values?.f_name}
                  onChange={validateInput}
                  maxLength={25}
                  // onKeyDown={(e) => { handleKeyDown(e, 25) }}
                  // {...formik.getFieldProps("f_name")}
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
            <div className="col-md-4 need_space">
              <div className="input_field">
                <p className="get-text">Middle Name</p>
                <input
                  type="text"
                  name="m_name"
                  className='form-control'
                  value={formik.values?.m_name}
                  onChange={validateInput}
                  maxLength={25}

                // onKeyDown={(e) => { handleKeyDown(e, 25) }}
                // {...formik.getFieldProps("m_name")}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input_field">
                <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="l_name"
                  value={formik.values?.l_name}
                  onChange={validateInput}
                  maxLength={25}

                  // onKeyDown={(e) => { handleKeyDown(e, 25) }}

                  // {...formik.getFieldProps("l_name")}

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
          <div className="row each-row remove_mb">
            <div className="col-md-6 need_space">
              <div className="input_field">
                <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="email"
                  name="email"
                  value={formik.values?.email}
                  // onKeyDown={(e) => { handleEmail(e, 50) }}
                  onChange={validateEmail}
                  maxLength={50}
                  // {...formik.getFieldProps("email")}

                  className={clsx(
                    'form-control bg-transparent',
                    { 'is-invalid': formik.touched.email && formik.errors.email },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container mt-1'>
                    <div className='fv-help-block'>
                      <span role='alert' className="text-danger" style={{ fontSize: "13px" }}>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 need_space">
              <div className="input_field">
                <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                <PhoneInput
                  onlyCountries={["gh", "ke", "ng", "ph", "th", "vn"]}
                  country={data.country_code ? data.country_code.toLowerCase() : "gh"}
                  name="mobile"
                  value={formik.values.mobile}
                  inputStyle={{ border: "none", margin: "none" }}
                  inputClass="userPhone w-100"
                  defaultCountry={"gh"}
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
            <h5>Address</h5>
            <div className="col-md-4 need_space" id="country">
              <div className="input_field">
                <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                <select
                  value={formik.values?.country}
                  name="country"
                  onChange={(e) => handleChange(e)}
                  className='form-control form-select bg-transparent'
                >
                  {
                    countryList && countryList.length > 0 ?
                      countryList?.map((opt) => {
                        return (
                          <option value={opt?.name} key={opt?.id} id={opt?.id}>{opt?.name}</option>
                        )
                      }) : ""
                  }
                </select>
              </div>
            </div>
            <div className="col-md-4 need_space" id="state">
              <div className="input_field">
                <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
                {
                  state_list && state_list.length > 0 ?
                    (<select
                      value={formik.values?.state}
                      name="state"
                      onChange={(e) => handleChange(e)}
                      className='form-control form-select bg-transparent'
                    >
                      {state_list?.map((opt) => {
                        return (
                          <option value={opt?.name} key={opt?.id} id={opt?.id}>{opt?.name}</option>
                        )
                      })
                      }
                    </select>) :
                    (<input
                      type="text"
                      name="state"
                      value={formik.values?.state}
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
            <div className="col-md-4" id="city">
              <div className="input_field">
                <p className="get-text">City/Suburb<span style={{ color: 'red' }} >*</span></p>
                {
                  city_list && city_list.length > 0 ? (
                    <select
                      value={formik.values?.city}
                      name="city"
                      onChange={(e) => handleChange(e)}
                      className='form-control form-select bg-transparent'
                    >

                      {city_list?.map((opt) => {
                        return (
                          <option value={opt?.name} id={opt?.id} key={opt?.id}>{opt?.name}</option>
                        )
                      })
                      }
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="city"
                      value={formik.values?.city}
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
          </div>
          <div className="row each-row remove_mb">
            <div className="col-md-4 need_space" id="street">
              <div className="input_field">
                <p className="get-text">Street Name<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="street"
                  value={formik.values?.street}
                  // onKeyDown={(e) => { handleEmail(e, 50) }}
                  {...formik.getFieldProps("street")}
                  maxLength={30}

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
            <div className="col-md-4 need_space" id="post">
              <div className="input_field">
                <p className="get-text">
                  Zip/Postal Code
                  {
                    isAfrican === true ? (
                      <></>
                    ) : (
                      <span style={{ color: 'red' }} >*</span>
                    )
                  }
                </p>
                <input
                  type="text"
                  name="post_code"
                  value={formik.values?.post_code}
                  onChange={validateNumber}
                  maxLength={5}

                  // onKeyDown={(e) => handlePostCode(e, 3)}
                  // {...formik.getFieldProps("post_code")}
                  className={clsx(
                    'form-control bg-transparent'
                  )}
                />

              </div>
            </div>
            <div className="col-md-4" id="build">
              <div className="input_field">
                <p className="get-text">Building No.<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  name="build_no"
                  value={formik.values?.build_no}
                  maxLength={30}
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
          </div>
          <div className="row each-row remove_mb">
            <div className="col-md-4 need_space" id='flat'>
              <div className="input_field">
                <p className="get-text">Flat/Unit No.</p>
                <input
                  type="text"
                  name="flat"
                  value={formik.values?.flat}
                  onChange={validateAddress}
                  maxLength={15}
                  // onKeyDown={(e) => { handleEmail(e, 15) }}
                  // {...formik.getFieldProps("flat")}
                  className='form-control bg-transparent'
                />
              </div>
            </div>
            <div className="col-md-4 need_space" id="reason">
              <div className="input_field">
                <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
                <select
                  aria-label="Select a reason"
                  name="reason"
                  value={formik.values?.reason}
                  onChange={(e) => handleChange(e)}
                  {...formik.getFieldProps("reason")}
                  className={clsx(
                    'form-control form-select bg-transparent',
                    { 'is-invalid': formik.touched.reason && formik.errors.reason },
                    {
                      'is-valid': formik.touched.reason && !formik.errors.reason,
                    }
                  )}
                >
                  <option value="none">Select a reason</option>
                  <option value="Family Support">Family Support</option>
                  <option value="Education">Education</option>
                  <option value="Tax Payment">Tax Payment</option>
                  <option value="Loan Payment">Loan Payment</option>
                  <option value="Travel Payment">Travel Payment</option>
                  <option value="Utility Payment">Utility Payment</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 need_space">
              <button type="button" className="start-form-button full-col" onClick={() => handleCancel()}>Cancel</button>
            </div>
            <div className="col-md-8 full-col">
              <button type="submit" className="form-button">Continue</button>
              <button type="button" className="form-button" onClick={() => { handlePrevious() }}>Previous</button>
            </div>
          </div>
        </div>
      </form>


      <Modal show={show} onHide={() => setShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Recipient details Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table className='recipint-details-popup'>
            <thead>
              <tr>
                <th colSpan={2} className="popup-heading">Bank Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Bank Name</th>
                <td>{data.bank}</td>
              </tr>
              <tr>
                <th>Account Name</th>
                <td>{data.acc_name}</td>
              </tr>
              <tr>
                <th>Account number</th>
                <td>{data.acc_no}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={2} className="popup-heading">Recipient Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{data.f_name}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{data.l_name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{data.email}</td>
              </tr>
              <tr>
                <th>Mobile</th>
                <td>{data.mobile}</td>
              </tr>
              <tr>
                <>
                </>
                <th>Reason</th>
                <td>{data.reason}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className='full-col'>
          <button className="start-form-button" variant="secondary" onClick={() => setShow(false)}>
            Go back to Edit
          </button>
          <button className="form-button detail_buttoon" type="button" variant="primary" onClick={(e) => handleReciept(e)}>Continue</button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default BankDetails
