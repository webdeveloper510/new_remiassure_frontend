import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const PaymentSummary = ({ handleStep, step }) => {

  const [data, setData] = useState({
    send_amount: "", to: "", recieve_amount: "", account_number: "", account_name: "", bank_name: "",
    total_amount: "", from: "", send_method: ""
  })
const navigate = useNavigate()
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("transfer_data"));
    console.log(local)
    setData({
      send_amount: local?.amount?.send_amt,
      to: local?.amount?.to_type,
      from: local?.amount?.from_type,
      recieve_amount: local?.amount?.exchange_amt,
      total_amount: local?.amount?.exchange_amt,
      account_name: local?.recipient?.acc_name,
      account_number: local?.recipient?.acc_no,
      bank_name: local?.recipient?.bank,
      send_method:local?.payment?.payment_type
    })

  }, [])

  const handleFinalStep = () => {
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", Number(step) + 1)
    handleStep(Number(step) + 1)
  }

  const handlePrev = () => {
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step",( Number(step) - 1))
    handleStep(Number(step) - 1)
  }
  const handleCancel = () => {
    localStorage.removeItem("send-step")
    localStorage.removeItem("transfer_data")
    navigate("/")
  }

  return (
    <div className="form_body">
      <div className="header">
        <h1>Payment Summary</h1>
      </div>
      <div className="row">
        <Table className="final-summary">
          <thead>
            <tr>
              <th colSpan={2} className="popup-heading">Transaction Details </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amount to Send</td>
              <td>{data.send_amount}&nbsp;
                <span>{data.from}</span>
              </td>
            </tr>
            <tr>
              <td>Fees</td>
              <td>{data.recieve_amount}</td>
            </tr>
            <tr>
              <td>Total Cost</td>
              <td>{data.send_amount}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={2} className="popup-heading">Transfer to </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account No.</td>
              <td>{data.account_number}</td>
            </tr>
            <tr>
              <td>Account Name</td>
              <td>{data.account_name}</td>
            </tr>
            <tr>
              <td>Bank Name</td>
              <td>{data.bank_name}</td>
            </tr>
            <tr>
              <td>Total Recipient Received</td>
              <td>{data.total_amount}&nbsp;
                <span>{data.to}</span>
              </td>
            </tr>
            <tr>
              <td>Received Method</td>
              <td>{data.send_method}</td>
            </tr>
          </tbody>

        </Table>
      </div>


      <div className="row">
        {/* <div className="col-md-4">
        <button className="start-form-button">Cancel</button>
      </div> */}
        <div className="col-md-12 verified-section">
          {/* 
              <button className="form-button" onClick={handlePay}>Pay</button> */}
          {/* <button className="form-button" onClick={()=>{setStep(step+1)}}>Continue</button> */}
          <button
            className="start-form-button"
            onClick={() => handleCancel()}
          >Cancel</button>

          <button className="form-button" onClick={() => handleFinalStep()}>Continue</button>

          <button className="form-button" onClick={() => { handlePrev() }}>Previous</button>
          {/* <button className="form-button" onClick={handleVerifiedPaymentDigitalIdPrevious}>Previous</button> */}
        </div>
      </div>
    </div>
  )
}

export default PaymentSummary