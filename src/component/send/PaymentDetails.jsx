import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import global from '../../utils/global'
import { loadStripe } from '@stripe/stripe-js'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import clsx from 'clsx'

const PaymentDetails = ({ handleStep, step }) => {

  const [data, setData] = useState({ payment_type: "Debit/Credit Card" })
  const [modal, setModal] = useState(false)
  const [pay_id_modal, setPayIdModal] = useState(false)
  const payRef = useRef(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    console.log(e.target.value)
    setData({ ...data, payment_type: e.target.value })
  }

  const handlePayType = () => {
    if (data.payment_type === "Debit/Credit Card") {
      setModal(true)
    } else {
      console.log(data.payment_type)
      setPayIdModal(true)
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
            <label className="container-new">
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

      <PayIDModal modal={pay_id_modal} handler={(value) => { setPayIdModal(value) }} method={data.payment_type} handleStep={handleStep} step={step} />
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

const PayIDModal = ({ modal, method, handler, handleStep, step }) => {
  const payForm = useFormik({
    initialValues: {
      pay_id: ""
    },
    validationSchema: Yup.object().shape({
      pay_id: Yup.string().required("Pay Id is required")
    }),
    onSubmit: async (values) => {
      handler(false)
      const local = JSON.parse(localStorage.getItem("transfer_data"))
      local.payment = { pay_id: values.pay_id, payment_type: method }
      localStorage.removeItem("transfer_data")
      localStorage.setItem("transfer_data", JSON.stringify(local))
      if (localStorage.getItem("send-step")) {
        localStorage.removeItem("send-step")
      }
      localStorage.setItem("send-step", Number(step) + 1)
      handleStep(Number(step) + 1)
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

export default PaymentDetails