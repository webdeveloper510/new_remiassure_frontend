import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import global from '../../utils/global'
import Axios from "axios"
import axios from 'axios'
import verified from '../../assets/img/userdashboard/3.png';


const PaymentSummary = ({ handleStep, step }) => {

  const [data, setData] = useState({
    send_amount: "", to: "", recieve_amount: "", account_number: "", account_name: "", bank_name: "",
    total_amount: "", from: "", send_method: ""
  })

  const navigate = useNavigate()
  const [modalView, setModalView] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("transfer_data"));
    // console.log(local)
    setData({
      send_amount: local?.amount?.send_amt,
      to: local?.amount?.to_type,
      from: local?.amount?.from_type,
      rates: local?.amount?.rates,
      recieve_amount: local?.amount?.exchange_amt,
      account_name: local?.recipient?.acc_name,
      account_number: local?.recipient?.acc_no,
      bank_name: local?.recipient?.bank,
      send_method: local?.payment?.payment_type
    })

    axios.post("http://54.193.130.43:8000/digital-verification/", { code: localStorage.getItem("DigitalCode") }, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      return true
    })

  }, [])

  const handleFinalStep = () => {
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    // console.log(local)
    const data = {
      sender: {
        first_name: local?.sender?.f_name,
        middle_name: local?.sender?.m_name,
        last_name: local?.sender?.l_name,
        date_of_birth: local?.sender?.dob,
        gender: local?.sender?.gender,
        flat: local?.sender?.flat,
        building: local?.sender?.build_no,
        street: local?.sender?.street,
        postcode: local?.sender?.post_code,
        city: local?.sender?.city,
        state: local?.sender?.state,
        country: local?.sender?.country
      },
      recipient: {
        first_name: local?.recipient?.f_name,
        middle_name: local?.recipient?.m_name,
        last_name: local?.recipient?.l_name,
        email: local?.recipient?.email,
        mobile: local?.recipient?.mobile,
        flat: local?.recipient?.flat,
        building: local?.recipient?.build_no,
        street: local?.recipient?.street,
        postcode: local?.recipient?.post_code,
        city: local?.recipient?.city,
        state: local?.recipient?.state,
        country: local?.recipient?.country
      },
      bank_details: {
        bank_name: local?.recipient?.bank,
        account_name: local?.recipient?.acc_name,
        account_number: local?.recipient?.acc_no
      },
      amount: {
        send_amount: local?.amount?.send_amt,
        recieve_amount: local?.amount?.exchange_amt,
        send_currency: local?.amount?.from_type,
        recieve_currency: local?.amount?.to_type,
        send_method: local?.payment?.payment_type == "Debit/Credit Card" ? "stripe" : "",
        recieve_method: local?.amount?.recieve_meth,
        reason: local?.recipient?.reason,
        card_token: local?.payment?.token?.id
      }
    }
    setLoader(true)
    Axios.post(`${global.serverUrl}/payment/stripe/user-charge/`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      console.log(res)
      if (res.data.code == "200") {
        setLoader(false)
        localStorage.setItem("transaction_id", res?.data?.transaction_id)
        const user = JSON.parse(localStorage.getItem("remi-user-dt"))
        // localStorage.removeItem("remi-user-dt")
        user.digital_id_verified = true
        localStorage.setItem("remi-user-dt", user)
        if (localStorage.getItem("send-step")) {
          localStorage.removeItem("send-step")
        }
        localStorage.removeItem("transfer_data")
        localStorage.removeItem("DigitalCode")
        setModalView(true)
      }
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }

  const handleCancel = () => {
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("send-step")
    window.location.reload(true)
  }

  return (
    <>
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
                <td>Amount Sending</td>
                <td>
                  <span>{data?.from}</span>
                  {data?.send_amount}
                </td>
              </tr>
              <tr>
                <td>Exchange Rate</td>
                <td>{data?.rates}</td>
              </tr>
              <tr>
                <td>Amount Exchanged</td>
                <td>{data?.recieve_amount}</td>
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
                <td>{data?.account_number}</td>
              </tr>
              <tr>
                <td>Account Name</td>
                <td>{data?.account_name}</td>
              </tr>
              <tr>
                <td>Bank Name</td>
                <td>{data?.bank_name}</td>
              </tr>
              <tr>
                <td>Amount Receiving</td>
                <td>
                  <span>{data?.to}</span>
                  {data?.recieve_amount}
                </td>
              </tr>
              <tr>
                <td>Receiving By</td>
                <td>{data?.send_method}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="row">
          <div className="col-md-4">
            <button className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
          </div>
          <div className="col-md-8">
            <div>
              <button className="form-button" onClick={() => handleFinalStep()}>Continue</button>
            </div>
          </div>
        </div>
        {loader ? <>
          <div class="loader-overly">
            <div class="loader" >
            </div>
          </div>
        </> : ""}
      </div>
      <Modal show={modalView} onHide={() => navigate("/dashboard")}>
        <Modal.Body>
          <div className="form_body">
            <div className="header">
              <h1>First Transaction Successful</h1>
            </div>
            <div className="col-md-12 align-center">
              <img className="verifies-img" src={verified} alt="verified" />
              <p>Thanks for choosing RemitAssure</p>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PaymentSummary