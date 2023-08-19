import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import global from '../../../utils/global'
import { loadStripe } from '@stripe/stripe-js'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { NavLink } from 'react-bootstrap'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useEffect } from 'react'
import PopVerify from '../../verification/PopVerify'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import clsx from 'clsx'
import { ZaiDashPayId, ZaiDashPayTo, ZaiPayId, ZaiPayTo, createAgreement, createPayId, getAgreementList, updateAgreement, userProfile, verifyPayTo } from '../../../utils/Api'

const PaymentDetails = ({ handleStep, step }) => {

  const [data, setData] = useState({ payment_type: "Debit/Credit Card", reason: "none" })
  const [modal, setModal] = useState(false)
  const [pay_id_modal, setPayIdModal] = useState({ toggle: false, id: null })
  const [pay_to_modal, setPayToModal] = useState(false)
  const [pay_id_data, setPayIdData] = useState({ id: "" })
  const [pay_to_data, setPayToData] = useState({ agreement_uuid: "" })
  const [userData, setUserData] = useState({})
  const [open_modal, setOpenModal] = useState(false)
  const [is_otp_verified, setIsOtpVerfied] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const payRef = useRef(null)
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState({ id: "", status: "", amount: "", curr: "", pay_id: "" })
  const [modalView, setModalView] = useState(false)
  const [loader, setLoader] = useState(false)
  const [token, setToken] = useState({})

  useEffect(() => {
    if (transaction.id) {
      setModalView(true)
      // setTimeout(() => {
      //   navigate("/dashboard")

      // }, 10 * 1000)
    }
  }, [transaction])

  const handleChange = (e) => {
    if (e.target.name === "reason") {
      if (e.target.value === "none") {
        setError(true)
        setMessage("Please select a valid reason")
      } else {
        setError(false)
        setMessage("")
      }
      setData({ ...data, reason: e.target.value })
    } else {
      setData({ ...data, payment_type: e.target.value })
    }
  }

  const handlePayType = () => {
    if (data.reason !== "none") {
      if (data.payment_type === "Debit/Credit Card") {
        setModal(true)
      } else if (data.payment_type === "PayByID") {
        setLoader(true)
        createPayId().then((res) => {
          setLoader(false)
          console.log(res)
          if (res.code === "200") {
            setPayIdModal({ toggle: true, id: res.data.payid })
          } else if (res.code === "400") {
            toast.error(res.data.message, { autoClose: 2000, hideProgressBar: true, position: "bottom-right" })
          }
        })
      } else {
        setPayToModal(true)
      }
    } else {
      setError(true)
      setMessage("Please select a valid reason")
    }
  }

  const handleTransaction = (values) => {
    setTransaction(values)
  }

  const handleOtpVerification = (value) => {
    setIsOtpVerfied(value)
  }

  const local = JSON.parse(localStorage.getItem("transfer_data"))

  const stripePromise = loadStripe(`${global.stripe_p_key}`);

  const handleCancel = () => {
    localStorage.removeItem("send-step")
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("reason")
    window.location.reload()
  }

  const handlePrevious = () => {
    localStorage.removeItem("send-step")
    localStorage.setItem("send-step", Number(step) - 1)
    handleStep(Number(step) - 1);
  }

  const handleModals = () => {
    setModal(!modal)
    setOpenModal(true)
  }

  useEffect(() => {
    userProfile().then(res => {
      if (res.code === "200") {
        setUserData(res.data)
      }
    })
  }, [])

  useEffect(() => {
    if (is_otp_verified) {
      const local = JSON.parse(localStorage.getItem("transfer_data"))

      if (data.payment_type === "PayByID" || data.payment_type === "PayTo") {
        setLoader(true)
        let d = {
          recipient_id: local?.recipient?.id,
          sender: {
            First_name: userData?.First_name,
            Last_name: userData?.Last_name,
            Date_of_birth: userData?.Date_of_birth,
            Gender: userData?.Gender
          },
          sender_address: {
            flat: userData?.flat,
            building: userData?.building,
            street: userData?.street,
            postcode: userData?.postcode,
            city: userData?.city,
            state: userData?.state,
            country: userData?.country,
            country_code: userData?.country_code
          },
          amount: {
            send_amount: Number(local?.amount?.send_amt),
            receive_amount: local?.amount?.exchange_amt,
            send_currency: local?.amount?.from_type,
            receive_currency: local?.amount?.to_type,
            send_method: "stripe",
            receive_method: "Bank transfer",
            reason: data.reason ? data.reason : "Family Support",
            exchange_rate: local?.amount?.exchange_rate
          }
        }
        if (data.payment_type === "PayByID") {
          d.pay_id = pay_id_data.id
          ZaiPayId(d).then(res => {
            console.log("paybyid", res)
            if (res.code == "200") {
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setIsOtpVerfied(false)
              setLoader(false)
              setTransaction({ id: res.data.transaction_id, pay_id: res.data.payment_id, status: "Pending", amount: local?.amount?.send_amt, curr: local?.amount?.from_type })
            } else {
              setLoader(false)
              setIsOtpVerfied(false)
              toast.error(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setTimeout(() => {
                window.location.reload()
              }, 3 * 1000)
            }
          }).catch((err) => {
            console.log(err)
            setLoader(false)
            setIsOtpVerfied(false)
            toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
            localStorage.removeItem("transfer_data")
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          })
        } else {
          d.agreement_uuid = pay_to_data.agreement_uuid
          ZaiPayTo(d).then(res => {
            console.log(res)
            if (res.code == "200") {
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setIsOtpVerfied(false)
              setLoader(false)
              setTransaction({ id: res.data.transaction_id, pay_id: res.data.payment_id, status: "Pending", amount: local?.amount?.send_amt, curr: local?.amount?.from_type })
            } else {
              setLoader(false)
              setIsOtpVerfied(false)
              toast.error(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setTimeout(() => {
                window.location.reload()
              }, 3 * 1000)
            }
            setLoader(false)
          }).catch((err) => {
            console.log(err)

            setLoader(false)
            setIsOtpVerfied(false)
            toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
            localStorage.removeItem("transfer_data")
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          })
        }
      } else {
        const d = {
          send_currency: local?.amount?.from_type,
          receive_currency: local?.amount?.to_type,
          destination: local?.recipient?.country,
          recipient_id: local?.recipient?.id,
          send_amount: local?.amount?.send_amt,
          receive_amount: local?.amount?.exchange_amt,
          reason: data.reason ? data.reason : "Family Support",
          card_token: token?.id,
          exchange_rate: local?.amount?.exchange_rate
        }
        setLoader(true)
        axios.post(`${global.serverUrl}/payment/stripe-charge/`, d, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => {
          if (res.data.code == "200") {
            localStorage.removeItem("transfer_data")
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            setIsOtpVerfied(false)
            setLoader(false)
            setTransaction({ id: res.data.data.transaction_id, pay_id: res.data.data.payment_id, status: "Pending", amount: local?.amount?.send_amt, curr: local?.amount?.from_type })
            // setTimeout(() => {
            //   window.location.reload()
            // }, 2 * 1000)
          }
          setLoader(false)
        }).catch((err) => {
          setLoader(false)
          setIsOtpVerfied(false)
          localStorage.removeItem("transfer_data")
          if (localStorage.getItem("send-step")) {
            localStorage.removeItem("send-step")
          }
          toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
          setTimeout(() => {
            window.location.reload()
          }, 3 * 1000)
        })
      }
    }
  }, [is_otp_verified])

  return (
    <>
      {
        !loader ?
          (
            <section>
              <div class="form-head mb-4">
                <h2 class="text-black font-w600 mb-0"><b>Payment details</b>
                </h2>
              </div>
              <div className="form_body">
                <p className='float-end text-capitalize col-12 fw-bold' style={{ color: "#6414E9" }}> Sending ⇒  {local?.amount?.from_type}{local?.amount?.send_amt}</p>
                <p className='float-end text-capitalize col-12 fw-bold' style={{ color: "#6414E9" }}> To  ⇒ {local?.recipient?.first_name} {local?.recipient.last_name}</p>
                <br></br>
                <br></br>
                <div className="row each-row">
                  <h5>Payment type</h5>
                  <div className="col-md-12">
                    <label class="container-new">
                      <span className="radio-tick"><img src="/assets/img/zai/payid.svg" height={25} /></span>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Payment Type"
                        defaultChecked={data.payment_type == "PayByID"}
                        value="PayByID"
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label class="container-new">
                      <span className="radio-tick"><img src="/assets/img/zai/payto.svg" height={25} /></span>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Payment Type"
                        defaultChecked={data.payment_type == "PayTo"}
                        value="PayTo"
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label class="container-new">
                      <span className="radio-tick">Debit/Credit Card</span>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Payment Type"
                        defaultChecked={data.payment_type == "Debit/Credit Card"}
                        value="Debit/Credit Card"
                        onChange={handleChange}

                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="row each-row mb-3">
                  <div className="col-md-5">
                    <div className="input_field">
                      <h5>Reason For Sending Money<span style={{ color: 'red' }} >*</span></h5>
                      <select
                        aria-label="Select a reason"
                        name="reason"
                        value={data.reason}
                        onChange={(e) => handleChange(e)}
                        className={`${error && data.reason === "none" ? "is-invalid" : !error && data.reason !== "none" ? "is-valid" : ""} form-control form-select`}
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
                    <div className='fv-plugins-message-container mt-1'>
                      <div className='fv-help-block'>
                        <span role='alert' className="text-danger">{message}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <button type="button" className="start-form-button full-col" onClick={() => handleCancel()}>Cancel</button>
                  </div>
                  <div className="col-md-8 full-col">
                    <button className="form-button" onClick={() => handlePayType()}>Continue</button>
                    <button className="form-button" onClick={() => handlePrevious()}>Previous</button>
                  </div>
                </div>
              </div>

              <PayIDModal modal={pay_id_modal.toggle} handler={(value) => { setPayIdModal(value) }} otp={(value) => setOpenModal(value)} data={pay_id_modal} setData={(data) => setPayIdData(data)} />

              <PayToModal modal={pay_to_modal} handler={(value) => { setPayToModal(value) }} otp={(value) => setOpenModal(value)} setData={(data) => setPayToData(data)} handleLoader={(value) => { setLoader(value) }} reason={data.reason} />

              {/* ---------------STRIPE------------- */}
              <Modal className="modal-card" show={modal} onHide={() => setModal(false)} backdrop="static" centered>
                <Modal.Header>
                  <Modal.Title>Debit/Credit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body className='my-4'>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm payRef={payRef} handleModal={() => handleModals()} handleToken={(value) => setToken(value)} />
                  </Elements>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setModal(false)} >
                    Cancel
                  </Button>

                  <Button type="submit" variant="primary" onClick={() => payRef.current.click()}>
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* ----------------- transaction result----------------- */}
              <Modal show={modalView} backdrop="static" centered>
                <Modal.Body>
                  <div className="form_body">
                    <div className="header">
                      <h1 className='text-success'><BsCheckCircleFill />Transaction Being Processed</h1>
                    </div>
                    <Table>
                      <tbody>
                        <tr>
                          <th>Transaction Id:</th>
                          <td>{transaction?.pay_id}</td>
                        </tr>
                        <tr>
                          <th>Transacted Amount</th>
                          <td>{transaction.curr}&nbsp;{transaction.amount}</td>
                        </tr>
                        <tr>
                          <th>Transaction Status:</th>
                          <td>{transaction?.status}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='row text-center'>
                      <div className="col-md-6">
                        <NavLink target='_blank' href={`${global.serverUrl}/payment/receipt/${transaction.id}`}>
                          <button type="button" className="form-button" style={{ "width": '100%' }}>View Reciept</button>
                        </NavLink>
                      </div>
                      <div className="col-md-6">
                        <button type="button" className="form-button" style={{ "width": '100%' }} onClick={() => { navigate("/dashboard") }}>Go To Dashboard</button>
                      </div>
                    </div>

                  </div>
                </Modal.Body>
              </Modal>

              {/* -----------OTP verification */}
              <Modal show={open_modal} onHide={() => setOpenModal(false)} backdrop="static" centered>
                <PopVerify handler={handleOtpVerification} close={() => { setOpenModal(false) }} />
              </Modal>

            </section>
          ) : (
            <div className="loader-overly">
              <div className="loader" >
              </div>
            </div>
          )
      }
    </>
  )
}

const CheckoutForm = ({ payRef, handleModal, handleToken }) => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const token = await stripe.createToken(elements.getElement(CardElement))
    if (token.token) {
      handleToken(token.token)
      handleModal()

    } else if (token.error.code === "card_declined") {
      toast.error("Card Declined", { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error("Enter card details to continue", { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />

        <button type="submit" ref={payRef} style={{ display: "none" }} disabled={!stripe || !elements}>
          Pay
        </button>
      </form>

    </>
  );
};

const PayIDModal = ({ modal, handler, otp, data, setData }) => {

  const submit = () => {
    setData({ id: data.id })
    handler({ toggle: false, id: null })
    otp(true)
  }
  return (
    <Modal className="modal-card" show={modal} onHide={() => handler({ toggle: false, id: null })} centered backdrop="static">
      <Modal.Header>
        <Modal.Title className='fs-5'><img src="/assets/img/zai/payid.svg" height={30} /></Modal.Title>
      </Modal.Header>
      <Modal.Body className='my-4'>
        <div>
          <Table borderless>
            <tbody className='text-start'>
              <tr>
                <th>Pay ID:</th>
                <td className='text-lowercase text-start'>{data.id}</td>
              </tr>
            </tbody>
          </Table>
          <p>Please use this PayID to transfer the money</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handler({ toggle: false, id: null })} >
          Cancel
        </Button>
        <Button type="click" variant="primary" onClick={() => submit()}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const PayToModal = ({ modal, handler, setData, otp, handleLoader, reason }) => {

  const [agreement_list, setAgreementList] = useState({})
  const [disabled, setDisabled] = useState(null)
  const [stage, setStage] = useState(1)

  const { handleSubmit, handleBlur, handleChange, values, errors, touched, resetForm, setFieldValue, setErrors } = useFormik({
    initialValues: {
      pay_id: "",
      bsb: "",
      account_number: "",
      agreement_amount: "1000",
      start_date: "",
    },
    validationSchema: Yup.object().shape({
      pay_id: Yup.string(),
      bsb: Yup.string().length(6, "BSB must be of 6 digits"),
      account_number: Yup.string().min(5).max(18),
      agreement_amount: Yup.string(),
      start_date: Yup.string()
    }),
    onSubmit: async (values) => {
      if (Object.keys(agreement_list).length > 0) {
        if (Number(local?.amount?.send_amt) <= Number(values.agreement_amount)) {
          if (agreement_list?.max_amount !== values.agreement_amount) {
            handleLoader(true)
            const d = {
              agreement_amount: values.agreement_amount,
              agreement_uuid: agreement_list.agreement_uuid
            }
            handler(false)
            updateAgreement(d).then(res => {
              handleLoader(false)
              if (res.code === "200") {
                toast.success(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
                setData({ agreement_uuid: res.data.agreement_uuid })
                otp(true)
              } else if (res.code === "400") {
                toast.error(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
              }
            })
          } else {
            handler(false)
            setData({ agreement_uuid: agreement_list?.agreement_uuid })
            otp(true)
          }
        } else {
          setErrors({ agreement_amount: "Transfer amount seems to be more than the limit. Please increase the limit" })
        }
      } else {
        if (stage === 1) {
          if ((values.pay_id.length === 0 && values.bsb.length === 0 && values.account_number.length === 0) || (values.bsb.length !== 0 && values.account_number.length === 0) || (values.bsb.length === 0 && values.account_number.length !== 0)) {
            setErrors({ pay_id: "PayID or BSB and Account number is required", bsb: "BSB is required", account_number: "Account number is required" });
          } else if (disabled === "payid" && values.bsb.length < 6) {
            setErrors({ pay_id: "BSB code must be of 6 digits" })
          } else if (disabled === "payid" && values.account_number.length < 5) {
            setErrors({ pay_id: "Account number should be atleast 5 digits" })

          } else {
            setStage(2)
          }
        } else if (stage === 2) {
          if (Number(local?.amount?.send_amt) <= Number(values.agreement_amount)) {
            setStage(3)
          } else {
            setErrors({ agreement_amount: "Transfer amount seems to be more than the limit. Please increase the limit" })
          }
        } else {
          let d = values
          if (disabled === "payid") {
            delete d["pay_id"]
          } else {
            delete d["bsb"]
            delete d["account_number"]
          }
          let local = JSON.parse(localStorage.getItem("transfer_data"));
          handleLoader(true)
          createAgreement(d).then(res => {
            if (res.code === "200") {
              handler(false)
              handleLoader(false)
              toast.success(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
              setData({ agreement_uuid: res.data.agreement_uuid })
              otp(true)
            } else if (res.code === "400") {
              handleLoader(false)
              toast.error(res.data.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
            }
          })
        }
      }
    }
  })

  const payIdRef = useRef()

  const local = JSON.parse(localStorage.getItem('transfer_data'));

  const displayStart = () => {
    if (agreement_list?.agreement_start_date) {
      let date = agreement_list.agreement_start_date.split("-");
      return date[2] + "-" + date[1] + "-" + date[0]
    } else {
      let date = values.start_date.split("-");
      return date[2] + "-" + date[1] + "-" + date[0]
    }
  }

  const handleCancel = () => {
    resetForm()
    setStage(1)
    handler(false)
  }

  useEffect(() => {
    getAgreementList().then(res => {
      if (res.code === "200") {
        setAgreementList(res.data)
        setFieldValue("agreement_amount", res?.data?.max_amount)
      } else {
        setAgreementList({})
      }
    })
    console.log("Agreement")
  }, [])

  useEffect(() => {
    if (values.pay_id === "" && values.account_number === "" && values.bsb === "") {
      setDisabled(null)
    } else if (values.pay_id === "" && (values.account_number !== "" || values.bsb !== "")) {
      setDisabled("payid")
    } else if (values.pay_id !== "" && (values.account_number === "" || values.bsb === "")) {
      setDisabled("bsb")
    }
  }, [values])

  useEffect(() => {
    var dtToday = new Date().toLocaleString("en-IN", { timeZone: "Australia/Sydney" }).replace(/\//g, "-").split(",")
    var date = dtToday[0].split("-")
    var month = date[1]
    var day = date[0];
    var year = date[2]
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    setFieldValue("start_date", maxDate)
  }, [modal])

  const handleBSB = (event) => {
    const regex = /^[0-9]*$/;
    let userInput = event.target.value;
    if (!regex.test(userInput)) {
      const filteredInput = userInput.replace(/[^0-9]/g, '');
      userInput = filteredInput
    }
    setFieldValue(event.target.name, userInput)
  }

  return (
    <Modal className="modal-card" show={modal} onHide={() => handleCancel()} centered backdrop="static">
      <Modal.Header>
        <Modal.Title className='fs-5'><img src="/assets/img/zai/payto.svg" height={30} /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          Object.keys(agreement_list).length > 0 ? (
            <>
              <h5 style={{ color: "#6414E9" }} className='my-3'>PayTo Agreement Details</h5>
              <Table>
                <tbody>
                  {
                    agreement_list?.account_id_type === "PAYID" ? (
                      <tr>
                        <th>
                          Pay ID
                        </th>
                        <td className='text-start'>{agreement_list?.payid}</td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <th>
                            BSB Code
                          </th>
                          <td className='text-start'>{agreement_list?.bsb_code}</td>
                        </tr>
                        <tr>
                          <th>Account Number</th>
                          <td className='text-start'>{agreement_list?.account_number}</td>
                        </tr>
                      </>
                    )
                  }
                  <tr>
                    <th>Transfer Amount</th>
                    <td className='text-start'>{local?.amount?.from_type} {local?.amount?.send_amt}</td>
                  </tr>
                  <tr>
                    <th>Amount Limit</th>
                    <td className='text-start'>
                      <form onSubmit={handleSubmit}>
                        <select
                          name='agreement_amount'
                          value={values.agreement_amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            'form-control w-100',
                            { 'is-invalid': touched.agreement_amount && errors.agreement_amount }
                          )}
                        >
                          <option value="1000">Upto AUD 1k per transaction</option>
                          <option value="5000">Upto AUD 5k per transaction</option>
                          <option value="10000">Upto AUD 10k per transaction</option>
                          <option value="30000">Upto AUD 30k per transaction</option>
                        </select>
                        <button type="submit" ref={payIdRef} style={{ display: "none" }}>submit</button>
                      </form>
                    </td>
                  </tr>
                  <tr>
                    <th>Start Date</th>
                    <td className='text-start'>{displayStart()}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          ) : (
            <>
              <div className='my-2'>
                {stage === 1 || stage === 2 ? (
                  <>
                    <p className='small my-3'>Set up a PayTo agreement to pay directly from your bank account. Use PayID or BSB and account number.</p>
                    <form onSubmit={handleSubmit} noValidate>
                      {
                        stage === 1 ? (
                          <>
                            <div className="input_field">
                              <p className="get-text fs-6 mb-1">PayID<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                maxLength="40"
                                name='pay_id'
                                value={values.pay_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={disabled === "payid"}
                                placeholder='Enter Your Pay ID'
                                className={clsx(
                                  'form-control mx-2 w-75',
                                  { 'is-invalid': touched.pay_id && errors.pay_id && disabled !== "payid" }
                                )}
                              />

                            </div>
                            <p className='text-center'>OR</p>
                            <div className="input_field">
                              <p className="get-text fs-6 mb-1">BSB<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                maxLength="6"
                                name='bsb'
                                value={values.bsb}
                                onChange={handleBSB}
                                onBlur={handleBlur}
                                readOnly={disabled === "bsb"}
                                placeholder='Enter Your BSB number'
                                className={clsx(
                                  'form-control mx-2 w-75',
                                  { 'is-invalid': touched.bsb && errors.bsb && disabled !== "bsb" }
                                )}
                              />
                            </div>
                            <div className="input_field">
                              <p className="get-text fs-6 mb-1">Account No.<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="text"
                                maxLength="18"
                                name='account_number'
                                value={values.account_number}
                                onChange={handleBSB}
                                onBlur={handleBlur}
                                readOnly={disabled === "bsb"}
                                placeholder='Enter Your account number'
                                className={clsx(
                                  'form-control mx-2 w-75',
                                  { 'is-invalid': touched.account_number && errors.account_number && disabled !== "bsb" }
                                )}
                              />
                            </div>
                            {errors.pay_id && (
                              <div className='fv-plugins-message-container small mx-3 mt-1'>
                                <div className='fv-help-block'>
                                  <span role='alert' className="text-danger">{errors.pay_id}</span>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {
                              disabled === "payid" ? (
                                <> <div className="input_field">
                                  <p className="get-text fs-6 mb-1">BSB<span style={{ color: 'red' }} >*</span></p>
                                  <input
                                    type="text"
                                    maxLength="6"
                                    name='bsb'
                                    value={values.bsb}
                                    onChange={handleBSB}
                                    onBlur={handleBlur}
                                    readOnly
                                    placeholder='Enter Your BSB number'
                                    className={clsx(
                                      'form-control mx-2 w-75',
                                      { 'is-invalid': touched.bsb && errors.bsb && disabled !== "bsb" }
                                    )}
                                  />
                                </div>
                                  <div className="input_field">
                                    <p className="get-text fs-6 mb-1">Account No.<span style={{ color: 'red' }} >*</span></p>
                                    <input
                                      type="text"
                                      maxLength="40"
                                      name='account_number'
                                      value={values.account_number}
                                      onChange={handleBSB}
                                      onBlur={handleBlur}
                                      readOnly
                                      placeholder='Enter Your account number'
                                      className={clsx(
                                        'form-control mx-2 w-75',
                                        { 'is-invalid': touched.account_number && errors.account_number && disabled !== "bsb" }
                                      )}
                                    />
                                  </div> </>
                              ) : (
                                <>
                                  <div className="input_field">
                                    <p className="get-text fs-6 mb-1">PayID<span style={{ color: 'red' }} >*</span></p>
                                    <input
                                      type="text"
                                      maxLength="40"
                                      name='pay_id'
                                      value={values.pay_id}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      readOnly
                                      placeholder='Enter Your Pay ID'
                                      className={clsx(
                                        'form-control mx-2 w-75',
                                        { 'is-invalid': touched.pay_id && errors.pay_id && disabled !== "payid" }

                                      )}
                                    />
                                  </div>
                                </>
                              )
                            }
                            <div className="input_field">
                              <p className="get-text fs-6 mb-1">Amount Limit<span style={{ color: 'red' }} >*</span></p>
                              <select
                                name='agreement_amount'
                                value={values.agreement_amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={clsx(
                                  'form-control mx-2 w-100',
                                  { 'is-invalid': touched.agreement_amount && errors.agreement_amount }
                                )}
                              >
                                <option value="1000">Upto AUD 1k per transaction</option>
                                <option value="5000">Upto AUD 5k per transaction</option>
                                <option value="10000">Upto AUD 10k per transaction</option>
                                <option value="30000">Upto AUD 30k per transaction</option>
                              </select>
                            </div>
                            <div className="input_field">
                              <p className="get-text fs-6 mb-1">Start Date<span style={{ color: 'red' }} >*</span></p>
                              <input
                                type="date"
                                value={values.start_date}
                                readOnly
                                className={clsx(
                                  'form-control mx-2 w-75'
                                )}
                              />
                            </div>
                          </>
                        )
                      }
                      <button type="submit" ref={payIdRef} style={{ display: "none" }}>submit</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h5 style={{ color: "#6414E9" }} className='my-3'>PayTo Agreement Details</h5>
                    <p className='small my-3'>Please check the PayTo agreement details below before submitting.</p>
                    <form onSubmit={handleSubmit}>
                      <Table>
                        <tbody>
                          {
                            disabled === "payid" ? (
                              <>
                                <tr>
                                  <th>BSB</th>
                                  <td className='text-start'>{values.bsb}</td>
                                </tr>
                                <tr>
                                  <th>Account No.</th>
                                  <td className='text-start'>{values.account_number}</td>
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr>
                                  <th>PayID</th>
                                  <td className='text-start'>{values.pay_id}</td>
                                </tr>
                              </>
                            )
                          }
                          <tr>
                            <th>Amount Limit</th>
                            <td className='text-start'>Upto AUD {
                              values.agreement_amount === '1000' ? '1k' :
                                values.agreement_amount === '5000' ? '5k' :
                                  values.agreement_amount === '10000' ? '10k' :
                                    '30k'
                            } per transaction</td>
                          </tr>
                          <tr>
                            <th>Agreement Type</th>
                            <td className='text-start'>Variable</td>
                          </tr>
                          <tr>
                            <th>Frequency</th>
                            <td className='text-start'>Ad-hoc</td>
                          </tr>
                          <tr>
                            <th>Start Date</th>
                            <td className='text-start'>{displayStart()}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <button type="submit" ref={payIdRef} style={{ display: "none" }}>submit</button>
                    </form>
                  </>
                )
                }

              </div>
            </>
          )}
        {errors.agreement_amount && (
          <div className='fv-plugins-message-container small mx-3 mt-1'>
            <div className='fv-help-block'>
              <span role='alert' className="text-danger">{errors.agreement_amount}</span>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCancel()} >
          Cancel
        </Button>
        <Button type="click" variant="primary" onClick={() => payIdRef.current.click()}>
          {Object.keys(agreement_list).length > 0 && Number(agreement_list?.max_amount) !== Number(values.agreement_amount) ? "Update Agreement" : stage === 3 ? "Create Agreement" : "Continue"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentDetails