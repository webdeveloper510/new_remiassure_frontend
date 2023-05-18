import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from 'clsx';
import { useState } from 'react';
import countryList from '../../../utils/recipientCountries.json';
import { useNavigate } from 'react-router';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import norecipients from '../../../assets/img/userdashboard/hidden.avif';
import { useEffect } from 'react';
import global from '../../../utils/global';
import axios from "axios"
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';

const BankDetails = ({ handleStep, step }) => {
  const [isActive, setActive] = useState("false");
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])

  const handleToggle = () => {
    setActive(!isActive);
  };
  const HandleRecipientlist = () => {
    setActive(!isActive);
  };

  const [data, setData] = useState({
    bank: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "",
    reason: "", country_code: "GH"
  })

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const initialValues = {
    bank: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "",
    reason: ""
  }

  const [show, setShow] = useState(false)

  const bankSchema = Yup.object().shape({
    bank: Yup.string()
      .min(5, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    acc_name: Yup.string().min(3).max(50).required(),
    acc_no: Yup.string().min(9).max(20).required(),
    f_name: Yup.string().min(2).max(25).required(),
    l_name: Yup.string().min(2).max(25).required(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(9).max(18).required(),
    flat: Yup.string().min(1).max(15).notRequired(),
    build_no: Yup.string().min(1).max(30).required(),
    street: Yup.string().min(1).max(30).required(),
    city: Yup.string().min(1).max(35).required(),
    post_code: Yup.string().length(4).required(),
    state: Yup.string().min(2).max(35).required(),
    country: Yup.string().min(2).max(30).required(),
    reason: Yup.string().min(2).max(30).oneOf(["Family Support", "Utility Payment", "Travel Payment", "Loan Payment", "Tax Payment", "Education"]).required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: bankSchema,
    onSubmit: async (values) => {
      console.log(values, data.label)
      setLoading(true)
      const d = {
        bank_name: values.bank,
        account_name: values.acc_name,
        account_number: values.acc_no,
        first_name: values.f_name,
        middle_name: values.m_name,
        last_name: values.l_name,
        email: values.email,
        mobile: values.mobile,
        flat: values.flat,
        building: values.build_no,
        street: values.street,
        postcode: values.post_code,
        city: values.city,
        state: values.state,
        country_code: data.country_code,
        country: values.country,
        reason: values.reason
      }
      if (d.flat === "" || d.flat === undefined || d.flat === " ") {
        delete d['flat'];
      }

      axios.post(`${global.serverUrl}/payment/recipient-create/`, d, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },

      })
        .then(function (response) {
          console.log(response)
          if (response.data.code == "200") {
            setData({
              bank: "", acc_name: "", acc_no: "",
              f_name: "", l_name: "", m_name: "",
              email: "", mobile: "", flat: "",
              build_no: "", street: "", city: "",
              post_code: "", state: "", country: "",
              reason: ""
            })
            formik.resetForm()
            HandleRecipientlist()
            setLoading(false)
          } else if (response.data.code == "400") {
            setLoading(false)
            toast.error(response.data.message, { autoClose: 2000, hideProgressBar: true })
          }
        })
        .catch(function (error, message) {
          console.log(error.response);
          setLoading(false);
        })

    }
  })


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
    console.log(e.key)
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
    console.log("------------------------------------------------------++++", event.key)
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


  const handlePrevious = () => {
    localStorage.removeItem("send-step")
    localStorage.setItem("send-step", Number(step) - 1)
    handleStep(Number(step) - 1);
  }

  const handleClear = () => {
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("send-step")
    window.location.reload()
  }
  const handleCancel = () => {
    setData({
      bank: "", acc_name: "", acc_no: "",
      f_name: "", l_name: "", m_name: "",
      email: "", mobile: "", flat: "",
      build_no: "", street: "", city: "",
      post_code: "", state: "", country: "",
      reason: ""
    })
    formik.resetForm()
    setActive(!isActive)
  }

  const selectRecipient = (value) => {
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    localStorage.removeItem("transfer_data")
    local.recipient = value
    localStorage.setItem("transfer_data", JSON.stringify(local))

    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) + 1)
    handleStep(Number(step) + 1);
  }

  useEffect(() => {
    setLoading(true); // Set loading before sending API request	
    axios.post(`${global.serverUrl}/payment/recipient-list/`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        console.log("Recipients APIIIII=-----------------------------------", res);
        if (res.data.code == 200) {
          setList(res.data.data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false);
      })
  }, [isActive])

  useEffect(() => {
    const value = data.country !== "" ? data.country : countryList[0]?.name
    if (data.country == "") {
      setData({ ...data, country: countryList[0]?.name, country_code: countryList[0]?.iso2 })
      formik.setFieldValue("country", countryList[0]?.name)
    }
    countryList?.map((item) => {
      if (item?.name === value) {
        setStateList(item?.states);
        console.log("--------------------------------", item.states)
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
      }
    })
  }, [data.state])


  return (
    <section>
      <div className={isActive ? "col-md-12 add-recipent-section" : "col-md-12 remove-add-recipent-section"}>

        {loading ? <>
          <div class="loader-overly">
            <div class="loader" >
            </div>
          </div></> :
          <>
            <div class="form-head mb-4">
              <h2 class="text-black font-w600 mb-0"><b>Select a recipient to send money</b>
              </h2>
            </div>
            <div className="card">
              <div className="card-body">
                {list?.length != 0 ? (
                  <div>
                    {
                      list?.map((item, index) => {
                        return (
                          <ul key={item.id}>
                            <a onClick={() => { selectRecipient(item) }}>
                              <li><a>{item?.first_name} {item?.last_name}<BsChevronDoubleRight /></a></li>
                            </a>
                          </ul>
                        )
                      })}
                  </div>
                ) : (
                  <>
                    <h4 className='text-center py-5'>No Recipients Found</h4>
                  </>
                )
                }
                {data?.length == 0 ? (
                  <>
                    <div class="no-recipt">
                      <h5>No Recipient</h5>
                      <img src={norecipients} alt="no-recipeint" />
                    </div>
                  </>
                ) : (
                  <>
                  </>
                )
                }
                <div className="add- row">
                  <div className='col-md-4'>
                    <button type="button" className="start-form-button" onClick={() => { handleClear() }} style={{ "float": "left" }}>Cancel</button>
                  </div>
                  <div className='col-md-8'>
                    <button type="button" className="form-button" onClick={() => handleToggle()} style={{ "float": "right" }}><BsFillPersonPlusFill /> Add Recepients
                    </button>
                    <button type="button" className="form-button" onClick={() => { handlePrevious() }} style={{ "float": "right" }}>Previous</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      <div className={isActive ? "removerecepient" : "showrecepient"} >
        <div class="form-head mb-4">
          <h2 class="text-black font-w600 mb-0"><b>Recipient Bank Details</b>
          </h2>
        </div>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Bank Information</h5>
                <div className="col-md-4">
                  <div className="input_field">
                    <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="text"
                      name="bank"
                      onKeyDown={(e) => { handleKeyDown(e, 50) }}
                      {...formik.getFieldProps("bank")}
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
                <div className="col-md-4">
                  <div className="input_field">
                    <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="text"
                      name="acc_name"
                      value={data?.acc_name}
                      onKeyDown={(e) => { handleKeyDown(e, 50) }}
                      {...formik.getFieldProps("acc_name")}

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
                <div className="col-md-4">
                  <div className="input_field">
                    <p className="get-text">Account Number<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="text"
                      name="acc_no"
                      value={data?.acc_no}
                      onKeyDown={(e) => { handlePostCode(e, 19) }}
                      {...formik.getFieldProps("acc_no")}
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
                <div className="col-md-6">
                  <div className="input_field">
                    <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
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
                <div className="col-md-6">
                  <div className="input_field">
                    <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                    <PhoneInput
                      onlyCountries={["gh", "ke", "ng", "ph", "th", "vn"]}
                      country={data.country_code ? data.country_code.toLowerCase() : "gh"}
                      name="mobile"
                      value={formik.values.mobile}
                      inputStyle={{ border: "none", margin: "none" }}
                      inputClass="phoneInp"
                      defaultCountry={"gh"}
                      onChange={(val, coun) => { handlePhone(val, coun) }}
                      className={clsx(
                        'form-control form-control-sm bg-transparent',
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
                    <p className="get-text">Flat/Unit No.</p>
                    <input
                      type="text"
                      name="flat"
                      value={data.flat}
                      onKeyDown={(e) => { handleEmail(e, 15) }}
                      {...formik.getFieldProps("flat")}
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
                      onKeyDown={(e) => { handleEmail(e, 50) }}
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
                      onKeyDown={(e) => handlePostCode(e, 3)}
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
                    <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
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
                <div className="col-md-4">
                  <div className="input_field">
                    <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
                    <select
                      aria-label="Select a reason"
                      name="reason"
                      value={data.reason}
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
                      <option>Select a reason</option>
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
                <div className="col-md-4">
                  <button type="button" className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
                </div>
                <div className="col-md-8">
                  <button type="submit" className="form-button">Continue  {loading ? <>
                    <div class="loader-overly">
                      <div class="loader" >
                      </div>
                    </div></> : ""}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BankDetails