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
import axios from "axios"
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import { createTransaction, getDiscountedPrice } from '../../../utils/Api';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TransactionConfirm from '../../modals/TransactionConfirm';
import Bank_list from '../../../utils/Bank_list';
import Select, { components } from "react-select"


const BankDetails = ({ handleStep, step }) => {
  const [isActive, setActive] = useState("false");
  const [city_list, setCityList] = useState([])
  const [state_list, setStateList] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAfrican, setIsAfrican] = useState(true)
  const [display_confirm, setDisplayConfirm] = useState({ toggle: false, data: null })
  const [discounts, setDiscounts] = useState({})

  const serverUrl = process.env.REACT_APP_API_URL

  const [data, setData] = useState({
    bank: null, other_name: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "", country_code: "AU"
  })

  const initialValues = {
    bank: null, other_name: "", acc_name: "", acc_no: "",
    f_name: "", l_name: "", m_name: "",
    email: "", mobile: "", flat: "",
    build_no: "", street: "", city: "",
    post_code: "", state: "", country: "", country_code: "AU"
  }

  const [phone_code, setPhoneCode] = useState("")

  const handleToggle = () => {
    setActive(!isActive);
  };



  const bankSchema = Yup.object().shape({
    bank: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required').trim().notOneOf([null]),
    other_name: Yup.string().min(3).max(50).test("value-test", (value, validationcontext) => {
      const {
        createError,
        parent: {
          bank,
        },
      } = validationcontext;
      if (bank === "other" && (value?.length < 3 || value === undefined || value === null || value === " ")) {
        return createError({ message: "Please enter bank name" })
      } else {
        return true
      }
    }).trim(),
    acc_name: Yup.string().min(3).max(50).required().trim(),
    acc_no: Yup.string().min(5).max(18).required(),
    f_name: Yup.string().min(2).max(25).required().trim(),
    l_name: Yup.string().min(2).max(25).required().trim(),
    email: Yup.string().matches(/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,5}$/, "Invalid email format").max(50),
    mobile: Yup.string().min(11).max(18).required(),
    flat: Yup.string().min(1).max(30).notRequired(),
    build_no: Yup.string().min(1).max(30).required().trim(),
    street: Yup.string().min(1).max(30).required().trim(),
    city: Yup.string().min(1).max(35).required().trim(),
    post_code: Yup.string().max(5).notRequired(),
    state: Yup.string().min(2).max(35).required(),
    country: Yup.string().min(2).max(30).required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: bankSchema,
    onSubmit: async (values) => {
      let storage = JSON.parse(localStorage.getItem("transfer_data"))
      storage.amount.part_type = values?.bank;
      storage.amount.payout_part = values?.other_name
      localStorage.setItem("transfer_data", JSON.stringify(storage))
      setLoading(true)
      const d = {
        bank_name: values.bank === "other" ? values?.other_name : values.bank,
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
        country: values.country
      }
      if (d.flat === "" || d.flat === undefined || d.flat === " ") {
        delete d['flat'];
      }
      if (d.postcode === "" || d.postcode === undefined || d.postcode === " ") {
        delete d['postcode'];
      }
      if (d.email === "" || d.email === undefined) {
        delete d['email'];
      }
      // console.log("PHONE CODE", phone_code)
      // console.log("dasdasvd")
      if (phone_code !== "") {
        let mno;
        if (phone_code.toString().length > 2) mno = d.mobile.substring(3)
        else mno = d.mobile.substring(2)
        d.mobile = phone_code + parseInt(mno, 10)
      }

      axios.post(`${serverUrl}/payment/recipient-create/`, d, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },

      })
        .then(function (response) {
          if (response.data.code == "200") {
            setLoading(false)
            selectRecipient({ ...response.data.data })
          } else if (response.data.code == "400") {
            setLoading(false)
            toast.error(response.data.message, { autoClose: 2000, hideProgressBar: true })
          }
        })
        .catch(function (error, message) {
          setLoading(false);
        })

    }
  })

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("transfer_data"))
    if (storage?.amount) {
      setData({ ...data, bank: storage?.amount?.part_type, other_name: storage?.amount?.payout_part })
      formik.setValues({ ...formik.values, bank: storage?.amount?.part_type, other_name: storage?.amount?.payout_part })
    }

  }, [])


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
    setPhoneCode(coun.dialCode)
    // console.log(coun.dialCode)
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
      ...data, acc_name: "", acc_no: "",
      f_name: "", l_name: "", m_name: "",
      email: "", mobile: "", flat: "",
      build_no: "", street: "", city: "",
      post_code: "", state: "", country: ""
    })
    formik.resetForm({
      values: { ...initialValues, bank: formik.values.bank }
    })
    setActive(!isActive)
  }

  const nextStep = () => {
    const value = display_confirm?.data?.recipient
    let storage = JSON.parse(localStorage.getItem('transfer_data'))
    let payload = {
      transaction_id: localStorage.getItem("transaction_id"),
      amount: {
        send_amount: storage?.amount?.send_amt,
        receive_amount: storage?.amount?.exchange_amt,
        send_currency: storage?.amount?.from_type,
        receive_currency: storage?.amount?.to_type,
        receive_method: "Bank transfer",
        reason: "none",
        payout_partner: storage?.amount?.part_type === "other" ? storage?.amount?.payout_part : storage?.amount?.part_type,
        exchange_rate: storage?.amount?.exchange_rate
      },
      recipient_id: value.id
    }
    createTransaction(payload).then(res => {
      if (res.code === "200") {
        localStorage.setItem("transaction_id", res.data.transaction_id)
        localStorage.setItem("rid", value.id)
        const local = JSON.parse(localStorage.getItem("transfer_data"))
        localStorage.removeItem("transfer_data")
        local.recipient = { ...value, bank_name: storage?.amount?.part_type === "other" ? storage?.amount?.payout_part : storage?.amount?.part_type }
        localStorage.setItem("transfer_data", JSON.stringify(local))

        if (localStorage.getItem("send-step")) {
          localStorage.removeItem("send-step")
        }
        localStorage.setItem("send-step", Number(step) + 1)
        handleStep(Number(step) + 1);
      }
    })
  }

  const selectRecipient = (value) => {
    let storage = JSON.parse(localStorage.getItem("transfer_data"))
    let transaction_id = localStorage.getItem("transaction_id")
    getDiscountedPrice(transaction_id).then(res => {
      setDiscounts(res.data)
      setDisplayConfirm({ toggle: true, data: { amount: storage?.amount, recipient: value } })
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    setLoading(true); // Set loading before sending API request	
    axios.post(`${serverUrl}/payment/recipient-list/`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (res.data.code == 200) {
          setList(res.data.data);
        }
        setLoading(false);
      })
      .catch(function (error) {
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

  const handleBank = (val, event) => {
    formik.setFieldValue("bank", val?.value)
    formik.handleChange(val.value)
    setData({ ...data, bank: val?.value })
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: formik.errors.bank && formik.touched.bank ? 'red' : base.borderColor,
    }),
  };

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };


  return (
    <section>
      {
        display_confirm.toggle === false ? (
          <>
            <div className={isActive ? "col-md-12 add-recipent-section" : "col-md-12 remove-add-recipent-section"}>

              {loading ? <>
                <div className="loader-overly">
                  <div className="loader" >
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
                      <div className="add- row">
                        <div className='col-md-4'>
                          <button type="button" className="start-form-button full-col" onClick={() => { handleClear() }} style={{ "float": "left" }}>Cancel</button>
                        </div>
                        <div className='col-md-8'>
                          <button type="button" className="form-button col-md-12 full-col" onClick={() => handleToggle()} style={{ "float": "right" }}><BsFillPersonPlusFill /> Add Recipient
                          </button>
                          <button type="button" className="form-button col-md-12 full-col" onClick={() => { handlePrevious() }} style={{ "float": "right" }}>Previous</button>
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
                          <p className="get-text">
                            Bank Name<span className='text-danger'>*</span>
                          </p>
                          <Select
                            options={Bank_list}
                            onChange={handleBank}
                            value={formik.values.bank !== null ? { label: formik.values.bank, value: formik.values.bank } : ""}
                            name='bank'
                            styles={customStyles}
                            components={{ Placeholder }}
                            placeholder="Select a bank...."
                          />
                        </div>
                      </div>
                      {
                        formik.values.bank === "other" ? (
                          <div className="col-md-4">
                            <div className="input_field">
                              <p className="get-text">Other Bank Name<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                name="other_name"
                                value={data?.other_name}
                                onKeyDown={(e) => { handleKeyDown(e, 50) }}
                                {...formik.getFieldProps("other_name")}

                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.other_name && formik.errors.other_name },
                                  {
                                    'is-valid': formik.touched.other_name && !formik.errors.other_name,
                                  }
                                )}
                              />
                            </div>
                          </div>
                        ) : <></>
                      }
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
                            onKeyDown={(e) => { handlePostCode(e, 17) }}
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
                    <div className="row each-row remove_mb">
                      <div className="col-md-6">
                        <div className="input_field">
                          <p className="get-text">Email</p>
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
                            onlyCountries={["au", "gh", "ke", "ng", "nz", "ph", "th", "vn"]}
                            country={"au"}
                            name="mobile"
                            value={formik.values.mobile}
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
                      <h5>Address</h5>
                      <div className="col-md-4" id="country">
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
                      <div className="col-md-4" id="state">
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
                      <div className="col-md-4" id="city">
                        <div className="input_field">
                          <p className="get-text">City/Suburb<span style={{ color: 'red' }} >*</span></p>
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
                    </div>
                    <div className="row each-row remove_mb">
                      <div className="col-md-4" id="post">
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
                            value={data.post_code}
                            onKeyDown={(e) => handlePostCode(e, 4)}
                            {...formik.getFieldProps("post_code")}
                            className={clsx(
                              'form-control'
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-md-4" id="street">
                        <div className="input_field">
                          <p className="get-text">Street Name<span style={{ color: 'red' }} >*</span></p>
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
                      <div className="col-md-4" id="build">
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
                    </div>
                    <div className="row each-row remove_mb">
                      <div className="col-md-4" id="flat">
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
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <button type="button" className="start-form-button full-col" onClick={() => handleCancel()}>Back</button>
                      </div>
                      <div className="col-md-8 full-col">
                        <button type="submit" className="form-button">Continue  {loading ? <>
                          <div className="loader-overly">
                            <div className="loader" >
                            </div>
                          </div></> : ""}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <TransactionConfirm data={display_confirm} discount={discounts} handleCancel={() => { setDisplayConfirm({ toggle: false, data: null }) }} handleContinue={() => nextStep()} />
        )
      }

    </section>
  )
}

export default BankDetails