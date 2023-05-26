
import React, { useState, useEffect, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Sidebar from './Sidebar';
import "react-phone-input-2/lib/bootstrap.css";
import { useFormik } from "formik";
import birthCountryList from 'react-select-country-list';
import countryList from '../../utils/senderCountries.json';
import * as Yup from "yup"
import clsx from "clsx";
import { userProfile, updateProfile } from "../../utils/Api";
import authDashHelper from "../../utils/AuthDashHelper";
import { Modal } from "react-bootstrap";
import PopVerify from "../verification/PopVerify";



const Profile = () => {

  const navigate = useNavigate('')
  const [open_modal, setOpenModal] = useState(false)
  const [is_otp_verified, setIsOtpVerfied] = useState(false)
  const [loading, setLoading] = React.useState(false);
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])
  const [data, setData] = useState({
    First_name: "", Middle_name: "", Last_name: "",
    Gender: "Male", Country_of_birth: "",
    Date_of_birth: "", flat: "", building: "",
    street: "", city: "", country: "",
    postcode: "", state: "", email: "", mobile: "",
    customer_id: "", country_code: "AU"
  })

  const initialValues = {
    First_name: "", Middle_name: "", Last_name: "",
    Gender: "Male", Country_of_birth: "",
    Date_of_birth: "", flat: "", building: "",
    street: "", city: "", country: "",
    postcode: "", state: "", email: "", mobile: "",
    customer_id: ""
  }

  const profileSchema = Yup.object().shape({
    First_name: Yup.string().min(2).max(25).required(),
    Last_name: Yup.string().min(2).max(25).required(),
    flat: Yup.string().min(1).max(15).notRequired(),
    building: Yup.string().min(1).max(30).required(),
    street: Yup.string().min(1).max(30).required(),
    city: Yup.string().min(1).max(35).required(),
    postcode: Yup.string().length(4).required(),
    state: Yup.string().min(2).max(35).required(),
    country: Yup.string().min(2).max(30).required(),
    Date_of_birth: Yup.date().required(),
    Gender: Yup.string().required(),
    Country_of_birth: Yup.string().required()
  })


  const handleOtpVerification = (value) => {
    setIsOtpVerfied(value)
  }

  useEffect(() => {
    if (authDashHelper('dashCheck') === false) {
      navigate("/send-money")
    } else {
      setLoading(true)
      getUserData()
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

  const getUserData = () => {
    userProfile().then((res) => {
      if (res.code == "200") {
        setLoading(false)
        let num = res.data.mobile;
        let num_length = num.length;
        let phone = num.substring(0, 3) + "-" + num.substring(3, num_length);
        setData({ ...res.data, mobile: phone })
        formik.setValues({ ...res.data, mobile: phone })
      }
    }).catch((error) => {
      if (error.response.data.code == "400") {
        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
      }
      setLoading(false)
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      let d = values
      d.country_code = data.country_code
      d.location = values.country
      delete d['country']
      if (values.Middle_name === "" || values.Middle_name === undefined || values.Middle_name === " ") {
        delete d['Middle_name'];
      }
      if (values.flat === "" || values.flat === undefined || values.flat === " ") {
        delete d['flat'];
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
  })

  const countryOptions = useMemo(() => birthCountryList().getData(), [])

  useEffect(() => {
    const value = data.country !== "" ? data.country : countryList[0]?.name
    countryList?.map((item) => {
      if (item?.name === value) {
        setStateList(item?.states);
        setData({ ...data, state: item?.states[0].name, country_code: item?.iso2 })
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

  const handlePostCode = (event) => {
    const pattern = /^[0-9.,]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {

    } else {
      let value = event.target.value.toString()
      if (value.length > 3) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          setData({ ...data, postcode: event.target.value })
          formik.setFieldValue('postcode', event.target.value)
          formik.setFieldTouched('postcode', true)
        }
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then(res => {
      if (Object.keys(res).length == 0) {
        setOpenModal(true)

      } else {
        formik.setErrors(res)
      }
    })
  }

  useEffect(() => {
    if (is_otp_verified) {
      formik.handleSubmit()
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
              <form onSubmit={handleSubmit} noValidate className="single-recipient">
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
                            onKeyDown={(e) => { handleKeyDown(e, 25) }}
                            {...formik.getFieldProps("First_name")}
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
                            value={data.Middle_name}
                            onKeyDown={(e) => { handleKeyDown(e, 25) }}
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
                            onKeyDown={(e) => { handleKeyDown(e, 25) }}
                            {...formik.getFieldProps("Last_name")}

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
                            className='form-control'
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Email</p>
                          <input
                            type="email"
                            value={data.email}
                            className='form-control'
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="input_field">
                          <p className="get-text">Mobile</p>
                          <input
                            type="email"
                            value={data.mobile}
                            placeholder="Enter Mobile"
                            autoComplete='off'
                            readOnly
                            className='form-control bg-transparent'
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
                        <p className="get-text">Gender<span style={{ color: 'red' }} >*</span></p>
                        <div className="inline-flex">
                          <label className="container-new form-gender">
                            <span className="radio-tick">Male</span>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="Gender"
                              value="Male"
                              checked={data.Gender === "Male"}
                              onChange={(e) => {
                                handleChange(e)
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="container-new form-gender">
                            <span className="radio-tick">Female</span>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="Gender"
                              value="Female"
                              checked={data.Gender === "Female"}
                              onChange={(e) => {
                                handleChange(e)
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
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
                              'form-control w-75 form-select bg-transparent',
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
                    </div>
                    <div className="row each-row">
                      <h5>Address</h5>
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
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
                    <div className="row each-row">
                      <div className="col-md-4">
                        <Form.Group className="form_label" controlId="Firstname">
                          <p className="get-text">Postal Code<span style={{ color: 'red' }} >*</span></p>
                          <input
                            type="text"
                            name="postcode"
                            value={data.postcode}
                            onKeyDown={(e) => handlePostCode(e)}
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
        <PopVerify handler={handleOtpVerification} close={() => { setOpenModal(false) }} />
      </Modal>
    </>
  )
}



export default Profile;