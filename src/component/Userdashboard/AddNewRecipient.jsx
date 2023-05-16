
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Sidebar from './Sidebar';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import countryList from '../../utils/recipientCountries.json'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import { createRecipient } from "../../utils/Api";
import authDashHelper from "../../utils/AuthDashHelper";


const Addnewrecipient = () => {

  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])
  const navigate = useNavigate()


  const [data, setData] = useState({
    bank_name: "", account_name: "", account_number: "",
    first_name: "", last_name: "", middle_name: "",
    email: "", mobile: "", flat: "",
    building: "", street: "", city: "",
    postcode: "", state: "", country: "",
    reason: "", country_code: "GH"
  })

  const initialValues = {
    bank_name: "", account_name: "", account_number: "",
    first_name: "", last_name: "", middle_name: "",
    email: "", mobile: "", flat: "",
    building: "", street: "", city: "",
    postcode: "", state: "", country: "",
    reason: ""
  }

  useEffect(() => {
    if (authDashHelper('dashCheck') === false) {
      navigate("/send-money")
    }
  },[])

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

  const recipientSchema = Yup.object().shape({
    bank_name: Yup.string()
      .min(5, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    account_name: Yup.string().min(3).max(50).required(),
    account_number: Yup.string().min(9).max(20).required(),
    first_name: Yup.string().min(1).max(25).required(),
    last_name: Yup.string().min(1).max(25).required(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50).required(),
    mobile: Yup.string().min(9).max(18).required(),
    flat: Yup.string().min(1).max(15).required(),
    building: Yup.string().min(1).max(30).required(),
    street: Yup.string().min(1).max(30).required(),
    city: Yup.string().min(1).max(35).required(),
    postcode: Yup.string().length(4).required(),
    state: Yup.string().min(1).max(35).required(),
    country: Yup.string().min(2).max(30).required(),
    reason: Yup.string().min(2).max(30).oneOf(["Family Support", "Utility Payment", "Travel Payment", "Loan Payment", "Tax Payment", "Education"]).required()
  })

  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    navigate("/user-recipients")
  }

  const formik = useFormik({
    initialValues,
    validationSchema: recipientSchema,
    onSubmit: async (values) => {
      setLoading(true)
      createRecipient({...values, country_code:data.country_code}).then((res) => {
        console.log("rescipient+++++++++++++++", res)
        setLoading(false)
      }).catch((error) => {
        console.log(error.response)
        if (error.response.data.code == "400") {
          toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
        }
        setLoading(false)
      })

    }
  })

  const handlePhone = (e, coun) => {
    formik.setFieldValue('mobile', e);
    formik.setFieldTouched('mobile', true);
    formik.setFieldValue('country', coun.name)
    setData({ ...data, country: coun.name, mobile: e })
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
    const pattern = /^[0-9.,]+$/;
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

  return (
    <div className="margin-set">
      <div className="tabs-page">
        <Sidebar />
        <div className="content-body">
          <section className="showrecepient">
            <div class="form-head mb-4">
              <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b>
                <NavLink to="/user-recipients">
                  <button className="start-form-button back-btn" >
                    <MdOutlineKeyboardBackspace />
                    Back
                  </button>
                </NavLink>
              </h2>
            </div>
            <form noValidate className="single-recipient">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5>Bank Information</h5>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="bank_name"
                          value={data.bank_name}
                          onKeyDown={(e) => { handleKeyDown(e, 50) }}
                          {...formik.getFieldProps("bank_name")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.bank_name && formik.errors.bank_name },
                            {
                              'is-valid': formik.touched.bank_name && !formik.errors.bank_name,
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
                          name="account_name"
                          value={data?.account_name}
                          onKeyDown={(e) => { handleKeyDown(e, 50) }}
                          {...formik.getFieldProps("account_name")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.account_name && formik.errors.account_name },
                            {
                              'is-valid': formik.touched.account_name && !formik.errors.account_name,
                            }
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="account_number"
                          value={data?.account_number}
                          onKeyDown={(e) => { handlePostCode(e, 19) }}
                          {...formik.getFieldProps("account_number")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.account_number && formik.errors.account_number },
                            {
                              'is-valid': formik.touched.account_number && !formik.errors.account_number,
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
                          name="first_name"
                          value={data.first_name}
                          onKeyDown={(e) => { handleKeyDown(e, 25) }}
                          {...formik.getFieldProps("first_name")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.first_name && formik.errors.first_name },
                            {
                              'is-valid': formik.touched.first_name && !formik.errors.first_name,
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
                          name="middle_name"
                          className='form-control'
                          value={data.middle_name}
                          onKeyDown={(e) => { handleKeyDown(e, 25) }}
                          {...formik.getFieldProps("middle_name")}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="last_name"
                          value={data.last_name}
                          onKeyDown={(e) => { handleKeyDown(e, 25) }}
                          {...formik.getFieldProps("last_name")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.last_name && formik.errors.last_name },
                            {
                              'is-valid': formik.touched.last_name && !formik.errors.last_name,
                            }
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row each-row">
                    <div className="col-md-4">
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
                        {formik.touched.email && formik.errors.email && (
                          <div className='fv-plugins-message-container mt-1'>
                            <div className='fv-help-block'>
                              <span role='alert' className="text-danger">{formik.errors.email}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
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
                      <Form.Group className="form_label" controlId="Firstname">
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
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
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
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
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
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row each-row">
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
                        <p className="get-text">Postal Code<span style={{ color: 'red' }} >*</span></p>
                        <input
                          type="text"
                          name="postcode"
                          value={data.postcode}
                          onKeyDown={(e) => handlePostCode(e, 3)}
                          {...formik.getFieldProps("postcode")}
                          className={clsx(
                            'form-control bg-transparent',
                            { 'is-invalid': formik.touched.postcode && formik.errors.postcode },
                            {
                              'is-valid': formik.touched.postcode && !formik.errors.postcode,
                            }
                          )}
                        />

                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
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
                                  <option value={opt?.name} key={opt?.id}>{opt?.name}</option>
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
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
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
                                  <option value={opt?.name} key={opt?.id}>{opt?.name}</option>
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
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row each-row">
                    <div className="col-md-4">
                      <Form.Group className="form_label" controlId="Firstname">
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
                                  <option value={opt?.name} key={opt?.id}>{opt?.name}</option>
                                )
                              }) : ""
                          }
                        </select>
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <div className="input_field">
                        <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
                        <select
                          aria-label="Select a reason"
                          name="reason"
                          value={data.reason}
                          onChange={(e) => handleChange(e)}
                          className={clsx(
                            'form-control form-select bg-transparent',
                            { 'is-invalid': formik.touched.reason && formik.errors.reason },
                            {
                              'is-valid': formik.touched.reason && !formik.errors.reason,
                            }
                          )}
                        >
                          <option value="null">Select a reason</option>
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
                      <button
                        type="button"
                        className="start-form-button"
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-8">
                      <button
                        type="button"
                        className="form-button"
                        onClick={() => { formik.handleSubmit() }}
                      >
                        Create Recipient
                        {loading ? <>
                          <div class="loader-overly">
                            <div class="loader" >
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
  )
}



export default Addnewrecipient;