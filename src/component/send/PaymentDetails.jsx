import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import global from '../../utils/global'
import { loadStripe } from '@stripe/stripe-js'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

const PaymentDetails = ({ handleStep, step }) => {

  const [data, setData] = useState({ payment_type: "Debit/Credit Card" })
  const [modal, setModal] = useState(false)
  const payRef = useRef(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, payment_type: e.target.value })
  }

  const handlePayType = () => {
    if (data.payment_type !== "Debit/Credit Card") {
      toast.warn("Only debit/credit card option available at the momment")
    } else {
      setModal(true)
    }
  }

  const stripePromise = loadStripe(`${global.stripe_p_key}`);

  const handleCancel = () => {
    localStorage.removeItem("send-step")
    localStorage.removeItem("transfer_data")
    navigate("/")
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
              <span className="radio-tick">Osko</span>
              <input
                className="form-check-input"
                type="radio"
                name="Payment Type"
                defaultChecked={data.payment_type == "Oslo"}
                value="Oslo"
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

          <div className="col-md-12">
            <label className="container-new">
              <span className="radio-tick">PoLI Internet Banking</span>
              <input
                className="form-check-input"
                type="radio"
                name="Payment Type"
                defaultChecked={data.payment_type == "PoLI Internet Banking"}
                value="PoLI Internet Banking"
                onChange={handleChange}
              />
              <span className="checkmark"></span>
            </label>
          </div>

        </div>
        <div className="row">
          <div className="col-md-4">
            <button className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
          </div>
          <div className="col-md-8">
            <div>
              <button className="form-button" onClick={() => handlePayType()}>Continue</button>
            </div>
          </div>
        </div>
      </div>

      <Modal className="modal-card" show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title><i className='bi bi-stripe'></i> Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className='my-4'>
          <Elements stripe={stripePromise}>
            <CheckoutForm payRef={payRef} method={data.payment_type} handleStep={handleStep} step={step} handleModal={() => setModal(false)} />
          </Elements>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)} >
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={() => payRef.current.click()}>
            Continue
            {/* {loading ? <>
              <div className="loader-overly">
                <div className="loader" >

                </div>

              </div>
            </> : <></>} */}
          </Button>
        </Modal.Footer>
      </Modal>
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <button type="submit" ref={payRef} style={{ display: "none" }} disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

export default PaymentDetails