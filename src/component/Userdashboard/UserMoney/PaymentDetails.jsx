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
import { ZaiDashPayId, ZaiDashPayTo, userProfile } from '../../../utils/Api'

const PaymentDetails = ({ handleStep, step }) => {

  const [data, setData] = useState({ payment_type: "Debit/Credit Card", reason: localStorage.getItem("reason") ? localStorage.getItem("reason") : "none" })
  const [modal, setModal] = useState(false)
  const [pay_id_modal, setPayIdModal] = useState(false)
  const [pay_to_modal, setPayToModal] = useState(false)
  const [pay_id_data, setPayIdData] = useState({ id: "" })
  const [pay_to_data, setPayToData] = useState({ id: "" })
  const [userData, setUserData] = useState({})
  const [open_modal, setOpenModal] = useState(false)
  const [is_otp_verified, setIsOtpVerfied] = useState(false)
  const [error, setError] = useState(false)
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
      } else {
        setError(false)
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
        setPayIdModal(true)
      } else {
        setPayToModal(true)
      }
    } else {
      toast.error("please provide a reason for transfer", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
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
          pay_id: pay_id_data.id,
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
          ZaiDashPayId(d).then(res => {
            if (res.code == "200") {
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setIsOtpVerfied(false)
              setLoader(false)
              setTransaction({ id: res.data.transaction_id, pay_id: res.data.payment_id, status: "Pending", amount: local?.amount?.send_amt, curr: local?.amount?.from_type })
            }
            setLoader(false)
          }).catch((err) => {
            setLoader(false)
            setIsOtpVerfied(false)
            localStorage.removeItem("transfer_data")
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          })
        } else {
          d.pay_id = pay_to_data.id
          ZaiDashPayTo(d).then(res => {
            if (res.code == "200") {
              localStorage.removeItem("transfer_data")
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              setIsOtpVerfied(false)
              setLoader(false)
              setTransaction({ id: res.data.transaction_id, pay_id: res.data.payment_id, status: "Pending", amount: local?.amount?.send_amt, curr: local?.amount?.from_type })
            }
            setLoader(false)
          }).catch((err) => {
            setLoader(false)
            setIsOtpVerfied(false)
            localStorage.removeItem("transfer_data")
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
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
          toast.error("Transaction failed, please try again", { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
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
                      <span className="radio-tick">Pay ID</span>
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
                      <span className="radio-tick">Pay To</span>
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

              <PayIDModal modal={pay_id_modal} handler={(value) => { setPayIdModal(value) }} otp={(value) => setOpenModal(value)} setData={(data) => setPayIdData({ id: data })} />

              <PayToModal modal={pay_to_modal} handler={(value) => { setPayToModal(value) }} otp={(value) => setOpenModal(value)} setData={(data) => setPayToData({ id: data })} />

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

const PayIDModal = ({ modal, handler, setData, otp }) => {
  const payForm = useFormik({
    initialValues: {
      pay_id: ""
    },
    validationSchema: Yup.object().shape({
      pay_id: Yup.string().required("Pay Id is required")
    }),
    onSubmit: async (values) => {
      handler(false)
      setData(values.pay_id)
      otp(true)
    }
  })

  const payIdRef = useRef()
  return (
    <Modal className="modal-card" show={modal} onHide={() => handler(false)} centered backdrop="static">
      <Modal.Header>
        <Modal.Title className='fs-5'>Pay ID</Modal.Title>
      </Modal.Header>
      <Modal.Body className='my-4'>
        <form onSubmit={payForm.handleSubmit} noValidate>
          <div>
            <div className="input_field">
              <p className="get-text fs-6 mb-1">Pay ID<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                maxLength="25"
                {...payForm.getFieldProps("pay_id")}
                placeholder='Enter Your Pay ID'
                className={clsx(
                  'form-control mx-2 w-75',
                  { 'is-invalid': payForm.touched.pay_id && payForm.errors.pay_id },
                  {
                    'is-valid': payForm.touched.pay_id && !payForm.errors.pay_id
                  }
                )}
              />
              {payForm.touched.pay_id && payForm.errors.pay_id && (
                <div className='fv-plugins-message-container small mx-2 mt-1'>
                  <div className='fv-help-block'>
                    <span role='alert' className="text-danger">{payForm.errors.pay_id}</span>
                  </div>
                </div>
              )}
            </div>
            <button type="submit" ref={payIdRef} style={{ display: "none" }}>submit</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handler(false)} >
          Cancel
        </Button>
        <Button type="click" variant="primary" onClick={() => payIdRef.current.click()}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const PayToModal = ({ modal, handler, setData, otp }) => {
  const payForm = useFormik({
    initialValues: {
      pay_id: ""
    },
    validationSchema: Yup.object().shape({
      pay_id: Yup.string().required("Pay Id is required")
    }),
    onSubmit: async (values) => {
      handler(false)
      otp(true)
      setData(values.pay_id)
    }
  })

  const payIdRef = useRef()
  return (
    <Modal className="modal-card" show={modal} onHide={() => handler(false)} centered backdrop="static">
      <Modal.Header>
        <Modal.Title className='fs-5'>Pay To</Modal.Title>
      </Modal.Header>
      <Modal.Body className='my-4'>
        <form onSubmit={payForm.handleSubmit} noValidate>
          <div>
            <div className="input_field">
              <p className="get-text fs-6 mb-1">Pay ID<span style={{ color: 'red' }} >*</span></p>
              <input
                type="text"
                maxLength="25"
                {...payForm.getFieldProps("pay_id")}
                placeholder='Enter Your Pay ID'
                className={clsx(
                  'form-control mx-2 w-75',
                  { 'is-invalid': payForm.touched.pay_id && payForm.errors.pay_id },
                  {
                    'is-valid': payForm.touched.pay_id && !payForm.errors.pay_id
                  }
                )}
              />
              {payForm.touched.pay_id && payForm.errors.pay_id && (
                <div className='fv-plugins-message-container small mx-2 mt-1'>
                  <div className='fv-help-block'>
                    <span role='alert' className="text-danger">{payForm.errors.pay_id}</span>
                  </div>
                </div>
              )}
            </div>
            <button type="submit" ref={payIdRef} style={{ display: "none" }}>submit</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handler(false)} >
          Cancel
        </Button>
        <Button type="click" variant="primary" onClick={() => payIdRef.current.click()}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentDetails