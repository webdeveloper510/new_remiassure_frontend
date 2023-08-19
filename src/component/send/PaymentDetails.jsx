import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import global from '../../utils/global'
import { loadStripe } from '@stripe/stripe-js'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import clsx from 'clsx'
import { createAgreement, createPayId, getAgreementList, updateAgreement, verifyPayId, verifyPayTo } from '../../utils/Api'

const PaymentDetails = ({ handleStep, step }) => {

  const [data, setData] = useState({ payment_type: "Debit/Credit Card" })
  const [modal, setModal] = useState(false)
  const [pay_id_modal, setPayIdModal] = useState({ toggle: false, id: null })
  const [pay_to_modal, setPayToModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const payRef = useRef(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    console.log(e.target.value)
    setData({ ...data, payment_type: e.target.value })
  }

  const handlePayType = () => {
    if (data.payment_type === "Debit/Credit Card") {
      setModal(true)
    } else if (data.payment_type === "PayByID") {
      setLoader(true)
      createPayId().then((res) => {
        setLoader(false)
        if (res.code === "200") {
          setPayIdModal({ toggle: true, id: res.data.payid })
        } else if (res.code === "400") {
          toast.error(res.data.message, { autoClose: 2000, hideProgressBar: true, position: "bottom-right" })
        }
      })
    } else {
      setPayToModal(true)
    }
  }

  const stripePromise = loadStripe(`${global.stripe_p_key}`);

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

  return (
    <div>
      <div className="form_body">
        <div className="header">
          <h1>Payment details</h1>
        </div>
        <div className="row each-row">
          <h5>Payment type</h5>

          <div className="col-md-12">
            <label className="container-new">
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
            <label className="container-new">
              <span className="radio-tick"><img src="/assets/img/zai/payto.svg" height={24} /></span>
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
            <label className="container-new">
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
        <div className="row">
          <div className="col-md-4">
            <button className="start-form-button full-col" onClick={() => handleCancel()}>Cancel</button>
          </div>
          <div className="col-md-8 full-col">
            <button className="form-button" onClick={() => handlePayType()}>Continue</button>
            <button className="form-button" onClick={() => handlePrevious()}>Previous</button>
          </div>
        </div>
      </div>
      {
        !loader ? <></> : <div className="loader-overly">
          <div className="loader" >
          </div>
        </div>
      }

      <Modal className="modal-card" show={modal} onHide={() => setModal(false)} centered backdrop="static">
        <Modal.Header>
          <Modal.Title className='fs-5'>Debit/Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body className='my-4'>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              payRef={payRef}
              method={data.payment_type}
              handleStep={handleStep}
              step={step}
              handleModal={() => setModal(false)}
            />
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
      <PayToModal modal={pay_to_modal} handler={(value) => { setPayToModal(value) }} method={data.payment_type} handleStep={handleStep} step={step} />

      <PayIDModal modal={pay_id_modal.toggle} handler={(value) => { setPayIdModal(value) }} method={data.payment_type} handleStep={handleStep} step={step} data={pay_id_modal} />
    </div>

  )
}

const CheckoutForm = ({ payRef, method, step, handleStep, handleModal }) => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const token = await stripe.createToken(elements.getElement(CardElement))
    if (token.token) {
      handleModal()
      const local = JSON.parse(localStorage.getItem("transfer_data"))
      local.payment = { ...token, payment_type: method }
      localStorage.removeItem("transfer_data")
      localStorage.setItem("transfer_data", JSON.stringify(local))
      if (localStorage.getItem("send-step")) {
        localStorage.removeItem("send-step")
      }
      localStorage.setItem("send-step", Number(step) + 1)
      handleStep(Number(step) + 1)
    } else if (token.error.code === "card_declined") {
      toast.error("Card Declined", { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error("Enter card details to continue", { position: "bottom-right", hideProgressBar: true, autoClose: 2000 })
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />

      <button type="submit" ref={payRef} style={{ display: "none" }} disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const PayIDModal = ({ modal, method, handler, handleStep, step, data }) => {


  const submit = () => {
    handler({ toggle: false, id: null })
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    local.payment = { pay_id: data?.id, payment_type: method }
    localStorage.removeItem("transfer_data")
    localStorage.setItem("transfer_data", JSON.stringify(local))
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) + 1)
    handleStep(Number(step) + 1)
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

const PayToModal = ({ modal, method, handler, handleStep, step }) => {

  const [disabled, setDisabled] = useState(null)
  const [stage, setStage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [agreement_list, setAgreementList] = useState({})

  const { handleSubmit, handleBlur, values, errors, touched, resetForm, setFieldValue, handleChange, setErrors, getFieldProps } = useFormik({
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
      agreement_amount: Yup.string().notOneOf(["none"]),
      start_date: Yup.string()
    }),
    onSubmit: async (values) => {
      if (Object.keys(agreement_list).length > 0) {
        if (Number(local?.amount?.send_amt) <= Number(values.agreement_amount)) {
          if (agreement_list?.max_amount !== values.agreement_amount) {
            setLoader(true)
            const d = {
              agreement_amount: values.agreement_amount,
              agreement_uuid: agreement_list.agreement_uuid
            }
            handler(false)
            updateAgreement(d).then(res => {
              setLoader(false)
              if (res.code === "200") {
                setLoader(false)
                const local = JSON.parse(localStorage.getItem("transfer_data"))
                local.payment = { agreement_uuid: res.data.agreement_uuid, payment_type: method }
                localStorage.removeItem("transfer_data")
                localStorage.setItem("transfer_data", JSON.stringify(local))
                if (localStorage.getItem("send-step")) {
                  localStorage.removeItem("send-step")
                }
                localStorage.setItem("send-step", Number(step) + 1)
                handleStep(Number(step) + 1)
                toast.success(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
              } else if (res.code === "400") {
                toast.error(res.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
              }
            })
          } else {
            setLoader(false)
            handler(false)
            const local = JSON.parse(localStorage.getItem("transfer_data"))
            local.payment = { agreement_uuid: agreement_list?.agreement_uuid, payment_type: method }
            localStorage.removeItem("transfer_data")
            localStorage.setItem("transfer_data", JSON.stringify(local))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.setItem("send-step", Number(step) + 1)
            handleStep(Number(step) + 1)
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
          setLoader(true)
          createAgreement(d).then(res => {
            if (res.code === "200") {
              setLoader(false)
              handler(false)
              const local = JSON.parse(localStorage.getItem("transfer_data"))
              local.payment = { agreement_uuid: res.data.agreement_uuid, payment_type: method }
              localStorage.removeItem("transfer_data")
              localStorage.setItem("transfer_data", JSON.stringify(local))
              if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
              }
              localStorage.setItem("send-step", Number(step) + 1)
              handleStep(Number(step) + 1)
              toast.success(res.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
            } else if (res.code === "400") {
              setLoader(false)
              toast.error(res.data.message, { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
            }
          })
        }
      }
    }
  })

  const payIdRef = useRef()
  let local = JSON.parse(localStorage.getItem("transfer_data"))

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
    var dtToday = new Date().toLocaleString("en-IN", { timeZone: "Australia/Sydney" }).replace(/\//g, "-").split(",")
    var date = dtToday[0].split("-")
    var month = date[1]
    var day = date[0];
    var year = date[2]
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString()
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
    setDisabled(null)
    handler(false)
  }

  return (
    <>
      {loader ? <>
        < div className="loader-overly" >
          <div className="loader" >
          </div>
        </div >
      </> : (
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
                    <p className='small mb-3'>Set up a PayTo agreement to pay directly from your bank account. Use PayID or BSB and account number.</p>
                    {stage === 1 || stage === 2 ? (
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
                                    'form-control mx-2 w-75',
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
              )
            }
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
              {stage !== 3 ? "Continue" : "Create agreement"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}
export default PaymentDetails