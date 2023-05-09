import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from 'clsx';
import { useState } from 'react';
import Select from "react-select";
import { Modal, Table } from 'react-bootstrap';
import { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import norecipients from '../../../assets/img/userdashboard/hidden.avif';
import { useEffect } from 'react';
import global from '../../../utils/global';
import axios from "axios"

const BankDetails = ({ handleBankDetail, handleStep, step }) => {

  const navigate = useNavigate();
  const tdata = localStorage.getItem("transfer_data")
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  const HandleRecipientlist = () => {
    setActive(!isActive);
  };

  const [data, setData] = useState({
    bank: tdata?.recipient?.bank || "", acc_name: tdata?.recipient?.acc_name || "", acc_no: tdata?.recipient?.acc_no || "",
    f_name: tdata?.recipient?.f_name || "", l_name: tdata?.recipient?.l_name || "", m_name: tdata?.recipient?.m_name || "",
    email: tdata?.recipient?.email || "", mobile: tdata?.recipient?.mobile || "", flat: tdata?.recipient?.flat || "",
    build_no: tdata?.recipient?.build_no || "", street: tdata?.recipient?.street || "", city: tdata?.recipient?.city || "",
    post_code: tdata?.recipient?.post_code || "", state: tdata?.recipient?.state || "", country: tdata?.recipient?.country || "",
    reason: tdata?.recipient?.reason || "", label: ""
  })

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const initialValues = {
    bank: tdata?.recipient?.bank || "", acc_name: tdata?.recipient?.acc_name || "", acc_no: tdata?.recipient?.acc_no || "",
    f_name: tdata?.recipient?.f_name || "", l_name: tdata?.recipient?.l_name || "", m_name: tdata?.recipient?.m_name || "",
    email: tdata?.recipient?.email || "", mobile: tdata?.recipient?.mobile || "", flat: tdata?.recipient?.flat || "",
    build_no: tdata?.recipient?.build_no || "", street: tdata?.recipient?.street || "", city: tdata?.recipient?.city || "",
    post_code: tdata?.recipient?.post_code || "", state: tdata?.recipient?.state || "", country: tdata?.recipient?.country || "",
    reason: tdata?.recipient?.reason || ""
  }

  const [show, setShow] = useState(false)

  const bankSchema = Yup.object().shape({
    bank: Yup.string()
      .min(5, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    acc_name: Yup.string().min(3).max(25).required(),
    acc_no: Yup.string().min(9).max(20).required(),
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
    reason: Yup.string().min(2).max(30).oneOf(["Family Support", "Utility Payment", "Travel Payment", "Loan Payment", "Tax Payment", "Education"]).required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: bankSchema,
    onSubmit: async (values) => {
      console.log(values, data.label)
      setLoading(true)
      axios.post(`${global.serverUrl}/payment/recipient-create/`, {
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
        country_code: "code",
        country: values.country,
        reason: values.reason,

      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },

      })
        .then(function (response) {
          HandleRecipientlist()
          setLoading(false)
        })
        .catch(function (error, message) {
          console.log(error.response);
          setLoading(false); // Stop loading in case of error	
        })

    }
  })

  const handleAccNo = (event) => {
    const pattern = /^[0-9.,]+$/;
    if (event.key === 'Backspace') {

    }
    else if (!pattern.test(event.key)) {
      event.preventDefault();
      event.stopPropagation()
    } else {
      setData({ ...data, acc_no: event.target.value })
      formik.setFieldValue('acc_no', event.target.value)
    }
  }

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
    if ([e.target.name] == "country") {
      console.log(e.target.value)
      setData({ ...data, [e.target.name]: e.target.value })
      formik.setFieldValue("country", e.target.value)
      formik.setFieldTouched("country", true)

    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }
  const countryOptions = useMemo(() => countryList().getData(), [])

  // const handleReciept = (e) => {
  //   const local = JSON.parse(localStorage.getItem("transfer_data"))
  //   local.recipient = data
  //   localStorage.removeItem("transfer_data")
  //   localStorage.setItem("transfer_data", JSON.stringify(local))
  //   if (localStorage.getItem("send-step")) {
  //     localStorage.removeItem("send-step")
  //   }
  //   localStorage.setItem("send-step", 2)
  //   handleStep(2)
  // }


  const handlePrevious = () => {
    localStorage.removeItem("send-step")
    localStorage.setItem("send-step", 0)
    handleStep(0);
  }

  const handleCancel = () => {
    localStorage.removeItem("send-step")
    localStorage.removeItem("transfer_data")
    navigate("/")
  }
  const selectRecipient = (value) => {
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    localStorage.removeItem("transfer_data")
    local.recipient = value
    localStorage.setItem("transfer_data", JSON.stringify(local))

    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    handleStep(2);
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
        setLoading(false); // Stop loading in case of error 	
      })
  }, [isActive])
  return (
    // <div>
    //   <section>
    //     <form onSubmit={formik.handleSubmit}>

    //       <div className="form_body">
    //         <div className="header">
    //           <h1>Recipient Bank Details</h1>
    //         </div>
    //         <div className="col-md-12">
    //           <div className="input_field">
    //             <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="bank"
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("bank")}
    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.bank && formik.errors.bank },
    //     {
    //       'is-valid': formik.touched.bank && !formik.errors.bank,
    //     }
    //   )}
    // />
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <div className="col-md-12">
    //             <div className="input_field">
    //               <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="acc_name"
    //   value={data?.acc_name}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("acc_name")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.acc_name && formik.errors.acc_name },
    //     {
    //       'is-valid': formik.touched.acc_name && !formik.errors.acc_name,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <div className="col-md-12">
    //             <div className="input_field">
    //               <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="acc_no"
    //   value={data?.acc_no}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("acc_no")}
    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.acc_no && formik.errors.acc_no },
    //     {
    //       'is-valid': formik.touched.acc_no && !formik.errors.acc_no,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <h5>Recipient Details</h5>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="f_name"
    //   value={data.f_name}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("f_name")}
    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.f_name && formik.errors.f_name },
    //     {
    //       'is-valid': formik.touched.f_name && !formik.errors.f_name,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Middle Name</p>
    // <input
    //   type="text"
    //   name="m_name"
    //   value={data.m_name}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("m_name")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.m_name && formik.errors.m_name },
    //     {
    //       'is-valid': formik.touched.m_name && !formik.errors.m_name,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="l_name"
    //   value={data.l_name}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("l_name")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.l_name && formik.errors.l_name },
    //     {
    //       'is-valid': formik.touched.l_name && !formik.errors.l_name,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <div className="col-md-6">
    //             <div className="input_field">
    //               <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="email"
    //   name="email"
    //   value={data.email}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("email")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.email && formik.errors.email },
    //     {
    //       'is-valid': formik.touched.email && !formik.errors.email,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //           <div className="col-md-6">
    //             <div className="input_field">
    //               <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="mobile"
    //   value={data.mobile}
    //   onKeyDown={(e) => handleMobile(e)}
    //   {...formik.getFieldProps("mobile")}
    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
    //     {
    //       'is-valid': formik.touched.mobile && !formik.errors.mobile,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <h5>Address</h5>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Flat/Unit No.<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="flat"
    //   value={data.flat}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("flat")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.flat && formik.errors.flat },
    //     {
    //       'is-valid': formik.touched.flat && !formik.errors.flat,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Building/Unit No.<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="build_no"
    //   value={data.build_no}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("build_no")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.build_no && formik.errors.build_no },
    //     {
    //       'is-valid': formik.touched.build_no && !formik.errors.build_no,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Street<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="street"
    //   value={data.street}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("street")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.street && formik.errors.street },
    //     {
    //       'is-valid': formik.touched.street && !formik.errors.street,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Postcode<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="post_code"
    //   value={data.post_code}
    //   onKeyDown={(e) => handlePostCode(e)}
    //   {...formik.getFieldProps("post_code")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.post_code && formik.errors.post_code },
    //     {
    //       'is-valid': formik.touched.post_code && !formik.errors.post_code,
    //     }
    //   )}
    // />

    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">City/Town<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="city"
    //   value={data.city}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("city")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.city && formik.errors.city },
    //     {
    //       'is-valid': formik.touched.city && !formik.errors.city,
    //     }
    //   )}
    // />

    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">State<span style={{ color: 'red' }} >*</span></p>
    // <input
    //   type="text"
    //   name="state"
    //   value={data.state}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("state")}

    //   className={clsx(
    //     'form-control bg-transparent',
    //     { 'is-invalid': formik.touched.state && formik.errors.state },
    //     {
    //       'is-valid': formik.touched.state && !formik.errors.state,
    //     }
    //   )}
    // />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row each-row">
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
    // <select
    //   value={data.country}
    //   name="country"
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("country")}
    //   className={clsx(
    //     'form-control form-select bg-transparent',
    //     { 'is-invalid': formik.touched.country && formik.errors.country },
    //     {
    //       'is-valid': formik.touched.country && !formik.errors.country,
    //     }
    //   )}
    // >
    //   <option>Select a country</option>
    //   {
    //     countryOptions && countryOptions.length > 0 ?
    //       countryOptions?.map((opt) => {
    //         return (
    //           <option value={opt.label}>{opt.label}</option>
    //         )
    //       }) : ""
    //   }
    // </select>
    //             </div>
    //           </div>
    //           <div className="col-md-4">
    //             <div className="input_field">
    //               <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
    // <select
    //   aria-label="Select a reason"
    //   name="reason"
    //   value={data.reason}
    //   onChange={(e) => handleChange(e)}
    //   {...formik.getFieldProps("reason")}

    //   className={clsx(
    //     'form-control form-select bg-transparent',
    //     { 'is-invalid': formik.touched.reason && formik.errors.reason },
    //     {
    //       'is-valid': formik.touched.reason && !formik.errors.reason,
    //     }
    //   )}
    // >
    //   <option>Select a reason</option>
    //   <option value="Family Support">Family Support</option>
    //   <option value="Education">Education</option>
    //   <option value="Tax Payment">Tax Payment</option>
    //   <option value="Loan Payment">Loan Payment</option>
    //   <option value="Travel Payment">Travel Payment</option>
    //   <option value="Utility Payment">Utility Payment</option>
    // </select>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="col-md-4">
    //             <button type="button" className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
    //           </div>
    //           <div className="col-md-8">
    //             <button type="submit" className="form-button">Continue</button>
    //           </div>
    //         </div>
    //       </div>
    //     </form>


    //     <Modal show={show} onHide={() => setShow(false)}
    //       centereds
    //     >
    //       <Modal.Header closeButton>
    //         <Modal.Title>Recipient details Summary</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>

    //         <Table>
    //           <thead>
    //             <tr>
    //               <th colSpan={2} className="popup-heading">Bank Details</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <th>Bank Name</th>
    //               <td>{data.bank}</td>
    //             </tr>
    //             <tr>
    //               <th>Account Name</th>
    //               <td>{data.acc_name}</td>
    //             </tr>
    //             <tr>
    //               <th>Account number</th>
    //               <td>{data.acc_no}</td>
    //             </tr>
    //           </tbody>
    //           <thead>
    //             <tr>
    //               <th colSpan={2} className="popup-heading">Recipient Details</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <th>First Name</th>
    //               <td>{data.f_name}</td>
    //             </tr>
    //             <tr>
    //               <th>Last Name</th>
    //               <td>{data.l_name}</td>
    //             </tr>
    //             <tr>
    //               <th>Email</th>
    //               <td>{data.email}</td>
    //             </tr>
    //             <tr>
    //               <th>Mobile</th>
    //               <td>{data.mobile}</td>
    //             </tr>
    //             <tr>
    //               <>
    //               </>
    //               <th>Reason For Sending Money</th>
    //               <td>{data.reason}</td>
    //             </tr>
    //           </tbody>
    //         </Table>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <button className="start-form-button" variant="secondary" onClick={() => setShow(false)}>
    //           Go back to Edit
    //         </button>
    //         <button className="form-button" type="button" variant="primary" onClick={(e) => handleReciept(e)}>Continue</button>
    //       </Modal.Footer>
    //     </Modal>
    //   </section>
    // </div>
    <section>
      <div className={isActive ? "col-md-12 add-recipent-section" : "col-md-12 remove-add-recipent-section"}>
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
            <div className="add-rec">
              <button type="button" className="form-button" onClick={() => { handlePrevious() }} style={{ "float": "left" }}>Previous</button>
              <button type="button" className="form-button" onClick={() => handleToggle()} style={{ "float": "right" }}><BsFillPersonPlusFill /> Add Recepients
                {loading ? <>
                  <div class="loader-overly">
                    <div class="loader" >
                    </div>
                  </div></> : ""}
              </button>
            </div>
          </div>
        </div>
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
                      onChange={(e) => handleChange(e)}
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
                      onChange={(e) => handleChange(e)}
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
                    <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="text"
                      name="acc_no"
                      value={data?.acc_no}
                      onChange={(e) => handleChange(e)}
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
                <div className="col-md-6">
                  <div className="input_field">
                    <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
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
                      name="mobile"
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
                    <p className="get-text">Flat/Unit No.</p>
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
                    <p className="get-text">Building/Unit No.</p>
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
                    <p className="get-text">Street</p>
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
                    <p className="get-text">Postcode</p>
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
                    <p className="get-text">City/Town</p>
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
                    <p className="get-text">State</p>
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
                      <option>Select a country</option>
                      {
                        countryOptions && countryOptions.length > 0 ?
                          countryOptions?.map((opt) => {
                            return (
                              <option id={opt.value} value={opt.label}>{opt.label}</option>
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
                  {/* <button className="form-button" onClick={handleShow}>Continue</button> */}
                  {/* <button className="form-button" onClick={someFunc}>Continue</button> */}
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