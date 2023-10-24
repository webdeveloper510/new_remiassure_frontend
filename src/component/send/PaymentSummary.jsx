import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal, NavLink, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BsCheckCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import PopVerify from '../verification/PopVerify'
import { ZaiPayId, ZaiPayTo, userCharge } from '../../utils/Api'
import { commaSeperator } from '../../utils/hook'


const PaymentSummary = ({ handleStep, step }) => {

  const [data, setData] = useState({
    send_amount: "", to: "", recieve_amount: "", account_number: "", account_name: "", bank_name: "",
    total_amount: "", from: "", send_method: "", beneficiary_name: "", pay_id: "", bsb_code: "", sender_accno: ""
  })

  const [open_modal, setOpenModal] = useState(false)
  const [error_modal, setErrorModal] = useState({ trigger: false, data: {} })
  const navigate = useNavigate()
  const [modalView, setModalView] = useState(false)
  const [loader, setLoader] = useState(false)
  const [transaction, setTransaction] = useState({ id: "", status: "", pay_id: "" })
  const [is_otp_verified, setIsOtpVerfied] = useState(null)

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("transfer_data"));
    setData({
      send_amount: local?.amount?.send_amt,
      to: local?.amount?.to_type,
      from: local?.amount?.from_type,
      rates: local?.amount?.exchange_rate,
      recieve_amount: local?.amount?.exchange_amt,
      account_name: local?.recipient?.acc_name,
      account_number: local?.recipient?.acc_no,
      bank_name: local?.recipient?.bank,
      send_method: local?.payment?.payment_type,
      beneficiary_name: local?.recipient?.f_name + " " + local?.recipient?.l_name,
      pay_id: local?.payment?.pay_id ? local?.payment?.pay_id : "",
      pay_id: local?.payment?.bsb ? local?.payment?.bsb : "",
      pay_id: local?.payment?.acc_no ? local?.payment?.acc_no : "",
    })

  }, [])

  const handleFinalStep = () => {
    const local = JSON.parse(localStorage.getItem("transfer_data"))
    setLoader(true)
    if (local?.payment.hasOwnProperty("pay_id") || local?.payment.hasOwnProperty("agreement_uuid")) {

      if (local?.payment?.payment_type === "PayTo") {
        let agreement_uuid = local?.payment?.agreement_uuid

        ZaiPayTo({ agreement_uuid: agreement_uuid, transaction_id: localStorage.getItem("transaction_id") }).then((res) => {
          setLoader(false)
          if (res.code === "200") {
            setTransaction({ status: res?.message, id: res?.data?.id, pay_id: res?.data?.transaction_id })
            localStorage.setItem("transaction_id", res?.data?.payment_id)
            const user = JSON.parse(localStorage.getItem("remi-user-dt"))
            user.digital_id_verified = "true"
            localStorage.setItem("remi-user-dt", JSON.stringify(user))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.removeItem("transfer_data")
            localStorage.removeItem("conversion_data")
            localStorage.removeItem('rid')
            localStorage.removeItem("transaction_id")
            setModalView(true)
          } else if (res.code == "400") {
            setTransaction({ status: res?.message, id: res?.data?.id, pay_id: res?.data?.transaction_id })
            // toast.error(res.message, { position: "bottom-right", hideProgressBar: true, autoClose: 3000 })

            localStorage.setItem("transaction_id", res?.data?.payment_id)
            const user = JSON.parse(localStorage.getItem("remi-user-dt"))
            user.digital_id_verified = "true"
            localStorage.setItem("remi-user-dt", JSON.stringify(user))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.removeItem("transfer_data")
            localStorage.removeItem("conversion_data")
            localStorage.removeItem('rid')
            localStorage.removeItem("transaction_id")
            setModalView(true)
          } else {
            toast.error("We are looking into the issue , please try later", { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          }
        }).catch(error => {
          setLoader(false)
          toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
        })
      } else if (local?.payment?.payment_type === "PayByID") {
        let payment_id = local?.payment?.payment_id
        ZaiPayId({ transaction_id: payment_id }).then((res) => {
          setLoader(false)
          if (res.code === "200") {
            setTransaction({ status: res?.message, id: res?.data?.id, pay_id: res?.data?.transaction_id })
            localStorage.setItem("transaction_id", res?.data?.payment_id)
            const user = JSON.parse(localStorage.getItem("remi-user-dt"))
            // localStorage.removeItem("remi-user-dt")
            user.digital_id_verified = "true"
            localStorage.setItem("remi-user-dt", JSON.stringify(user))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.removeItem("transfer_data")
            localStorage.removeItem("conversion_data")
            localStorage.removeItem("rid")
            localStorage.removeItem("transaction_id")
            setModalView(true)
          } else if (res.code == "400") {
            toast.error(res.message, { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
          } else {
            toast.error("We are looking into the issue , please try later", { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
          }

        }).catch(error => {
          setLoader(false)
          toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
        })
      }
    } else if (local?.payment.hasOwnProperty("token")) {
      userCharge({ transaction_id: localStorage.getItem("transaction_id"), card_token: local?.payment?.token?.id }).then((res) => {
        setLoader(false)
        if (res.code == "200") {
          setTransaction({ status: res?.message, id: res?.data?.id, pay_id: res?.data?.transaction_id })
          const user = JSON.parse(localStorage.getItem("remi-user-dt"))
          user.digital_id_verified = "true"
          localStorage.setItem("remi-user-dt", JSON.stringify(user))
          if (localStorage.getItem("send-step")) {
            localStorage.removeItem("send-step")
          }
          localStorage.removeItem("transfer_data")
          localStorage.removeItem("conversion_data")
          localStorage.removeItem('rid')
          localStorage.removeItem("transaction_id")
          setModalView(true)
        } else if (res.code === "400") {
          toast.error(res.message, { position: "bottom-right", autoClose: 5000, hideProgressBar: true })

        } else {
          toast.error("We are looking into the issue , please try later", { position: "bottom-right", autoClose: 3000, hideProgressBar: true })
        }
      }).catch((err) => {
        setLoader(false)
        toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
      })
    }

  }

  useEffect(() => {
    if (is_otp_verified) {
      handleFinalStep()
    }
  }, [is_otp_verified])

  const handleCancel = () => {
    localStorage.removeItem("transfer_data")
    localStorage.removeItem("send-step")
    window.location.reload(true)
  }

  const handleOtpVerified = (value) => {
    setIsOtpVerfied(value)
  }

  const serverUrl = process.env.REACT_APP_API_URL

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
                  <span>{data?.from}</span>&nbsp;
                  {commaSeperator(data?.send_amount)}
                </td>
              </tr>
              <tr>
                <td>Exchange Rate</td>
                <td>{commaSeperator(data?.rates)}</td>
              </tr>
              <tr>
                <td>Amount Exchanged</td>
                <td><span>{data?.to}</span>&nbsp;
                  {commaSeperator(data?.recieve_amount)}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={2} className="popup-heading">Transfer to </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Beneficiary Name:</td>
                <td>{data?.beneficiary_name}</td>
              </tr>
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
                  <span>{data?.to}</span>&nbsp;
                  {commaSeperator(data?.recieve_amount)}
                </td>
              </tr>
              <tr>
                <td>Receiving By</td>
                <td>{data?.send_method === "PayByID" ? "PayID" : data?.send_method}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="row">
          <div className="col-md-4 half-col">
            <button className="start-form-button" onClick={() => handleCancel()}>Cancel</button>
          </div>
          <div className="col-md-8 half-col">

            <button className="form-button" onClick={() => setOpenModal(true)}>Continue</button>

          </div>
        </div>
        {loader ? <>
          <div className="loader-overly">
            <div className="loader" >
            </div>
          </div>
        </> : ""}
      </div>
      {/* -------------------- PAYMENT RECIEPT----------------- */}
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
                  <th>Transaction Amount</th>
                  <td>{data.from}&nbsp;{commaSeperator(data.send_amount)}</td>
                </tr>
                <tr>
                  <th>Transaction Status:</th>
                  <td>{transaction?.status}</td>
                </tr>
              </tbody>
            </Table>
            <div className="col-md-12 align-center">
              {/* <img className="verifies-img" src={verified} alt="verified" /> */}
              <p>Thanks for choosing RemitAssure</p>
              <div className='row text-center'>
                <div className="col-md-6">
                  <NavLink target='_blank' href={`${serverUrl}/payment/receipt/${transaction.id}`}>
                    <button type="button" className="form-button" style={{ "width": '100%' }}>View Reciept</button>
                  </NavLink>
                </div>
                <div className="col-md-6">
                  <button type="button" className="form-button" style={{ "width": '100%' }} onClick={() => { navigate("/dashboard") }}>Go To Dashboard</button>
                </div>
              </div>

            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* -------------------- OTP CONFIRMATION---------------- */}
      <Modal show={open_modal} onHide={() => setOpenModal(false)} backdrop="static" centered>
        <PopVerify handler={handleOtpVerified} close={() => setOpenModal(false)} />
      </Modal>
    </>
  )
}




export default PaymentSummary