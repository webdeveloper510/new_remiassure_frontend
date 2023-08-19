import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal, NavLink, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import global from '../../utils/global'
import verified from '../../assets/img/userdashboard/3.png';
import { BsCheckCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import PopVerify from '../verification/PopVerify'
import { ZaiPayId, ZaiPayTo, getAgreementList, userCharge } from '../../utils/Api'
import { dataIcon } from '@progress/kendo-svg-icons'
import { Line } from 'rc-progress';


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
    // console.log(local)
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
      let data = {

        sender: {
          First_name: local?.sender?.f_name,
          Middle_name: local?.sender?.m_name,
          Last_name: local?.sender?.l_name,
          Date_of_birth: local?.sender?.dob,
          Gender: "M",
          Country_of_birth: local?.sender?.country_of_birth,
          occupation: local?.sender?.occupation,
          payment_per_annum: local?.sender?.payment_per_annum,
          value_per_annum: local?.sender?.value_per_annum,
        },
        sender_address: {
          flat: local?.sender?.flat,
          building: local?.sender?.build_no,
          street: local?.sender?.street,
          postcode: local?.sender?.post_code,
          city: local?.sender?.city,
          state: local?.sender?.state,
          country: local?.sender?.country,
          country_code: local?.sender?.country_code

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
          country: local?.recipient?.country,
          country_code: local?.recipient?.country_code
        },
        bank_details: {
          bank_name: local?.recipient?.bank,
          account_name: local?.recipient?.acc_name,
          account_number: local?.recipient?.acc_no
        },
        amount: {
          send_amount: Number(local?.amount?.send_amt),
          receive_amount: local?.amount?.exchange_amt,
          send_currency: local?.amount?.from_type,
          receive_currency: local?.amount?.to_type,
          send_method: "zai",
          receive_method: local?.amount?.recieve_meth,
          reason: local?.recipient?.reason,
          exchange_rate: local?.amount?.exchange_rate
        }
      }
      if (data.sender.Middle_name === "" || data.sender.Middle_name === undefined || data.sender.Middle_name === null) {
        delete data.sender.Middle_name
      }
      if (data.sender_address.flat === "" || data.sender_address.flat === null || data.sender_address.flat === undefined) {
        delete data.sender_address.flat
      }
      if (data.recipient.middle_name === null || data.recipient.middle_name === "" || data.recipient.middle_name === undefined) {
        delete data.recipient.middle_name
      }
      if (data.recipient.flat === "" || data.recipient.flat === null || data.recipient.flat === undefined) {
        delete data.recipient.flat
      }
      if (data.recipient.postcode == null || data.recipient.postcode == undefined || data.recipient.postcode === "") {
        delete data.recipient.postcode
      }
      console.log(data)
      if (local?.payment?.payment_type === "PayTo") {
        data.agreement_uuid = local?.payment?.agreement_uuid
        ZaiPayTo(data).then((res) => {
          console.log(res)
          if (res.code === "200") {
            setLoader(false)
            setTransaction({ status: "Pending", id: res?.data?.transaction_id, pay_id: res?.data?.payment_id })
            localStorage.setItem("transaction_id", res?.data?.payment_id)
            const user = JSON.parse(localStorage.getItem("remi-user-dt"))
            // localStorage.removeItem("remi-user-dt")
            user.digital_id_verified = "true"
            localStorage.setItem("remi-user-dt", JSON.stringify(user))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.removeItem("transfer_data")
            setModalView(true)
          } else if (res.code == "400") {
            setLoader(false)
            setErrorModal({ trigger: true, data: data })
          } else {
            toast.error("We are looking into the issue , please try later", { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
            setLoader(false)
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          }
          setLoader(false)

        }).catch(error => {
          console.log("error", error)
          toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
          setLoader(false)
        })
      } else if (local?.payment?.payment_type === "PayByID") {
        data.pay_id = local?.payment?.pay_id
        ZaiPayId(data).then((res) => {
          console.log(res)
          if (res.code === "200") {
            setLoader(false)
            setTransaction({ status: "Pending", id: res?.data?.transaction_id, pay_id: res?.data?.payment_id })
            localStorage.setItem("transaction_id", res?.data?.payment_id)
            const user = JSON.parse(localStorage.getItem("remi-user-dt"))
            // localStorage.removeItem("remi-user-dt")
            user.digital_id_verified = "true"
            localStorage.setItem("remi-user-dt", JSON.stringify(user))
            if (localStorage.getItem("send-step")) {
              localStorage.removeItem("send-step")
            }
            localStorage.removeItem("transfer_data")
            setModalView(true)
          } else if (res.code == "400") {
            toast.error(res.message, { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
            setLoader(false)
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          } else {
            toast.error("We are looking into the issue , please try later", { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
            setLoader(false)
            setTimeout(() => {
              window.location.reload()
            }, 3 * 1000)
          }
          setLoader(false)

        }).catch(error => {
          console.log("error", error)
          toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
          setLoader(false)
        })
      }
    } else if (local?.payment.hasOwnProperty("token")) {
      let data = {
        sender: {
          First_name: local?.sender?.f_name,
          Middle_name: local?.sender?.m_name,
          Last_name: local?.sender?.l_name,
          Date_of_birth: local?.sender?.dob,
          Gender: "m",
          Country_of_birth: local?.sender?.country_of_birth,
          occupation: local?.sender?.occupation,
          payment_per_annum: local?.sender?.payment_per_annum,
          value_per_annum: local?.sender?.value_per_annum,
        },
        sender_address: {
          flat: local?.sender?.flat,
          building: local?.sender?.build_no,
          street: local?.sender?.street,
          postcode: local?.sender?.post_code,
          city: local?.sender?.city,
          state: local?.sender?.state,
          country: local?.sender?.country,
          country_code: local?.sender?.country_code

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
          country: local?.recipient?.country,
          country_code: local?.recipient?.country_code
        },
        bank_details: {
          bank_name: local?.recipient?.bank,
          account_name: local?.recipient?.acc_name,
          account_number: local?.recipient?.acc_no
        },
        amount: {
          send_amount: local?.amount?.send_amt,
          receive_amount: local?.amount?.exchange_amt,
          send_currency: local?.amount?.from_type,
          receive_currency: local?.amount?.to_type,
          send_method: "stripe",
          receive_method: local?.amount?.recieve_meth,
          reason: local?.recipient?.reason,
          card_token: local?.payment?.token?.id,
          exchange_rate: local?.amount?.exchange_rate
        }
      }
      userCharge(data).then((res) => {
        if (res.code == "200") {
          setLoader(false)
          setTransaction({ status: "Pending", id: res?.data?.transaction_id, pay_id: res?.data?.payment_id })
          localStorage.setItem("transaction_id", res?.data?.payment_id)
          const user = JSON.parse(localStorage.getItem("remi-user-dt"))
          // localStorage.removeItem("remi-user-dt")
          user.digital_id_verified = "true"
          localStorage.setItem("remi-user-dt", JSON.stringify(user))
          if (localStorage.getItem("send-step")) {
            localStorage.removeItem("send-step")
          }
          localStorage.removeItem("transfer_data")
          setModalView(true)
          // setTimeout(() => {
          //   navigate("/dashboard")
          // }, 10 * 1000)
        }
        setLoader(false)
      }).catch((err) => {
        toast.error("We are looking into the issue , please try later", { position: "bottom-right", hideProgressBar: true })
        setLoader(false)
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
                  {data?.send_amount}
                </td>
              </tr>
              <tr>
                <td>Exchange Rate</td>
                <td>{data?.rates}</td>
              </tr>
              <tr>
                <td>Amount Exchanged</td>
                <td><span>{data?.to}</span>&nbsp;
                  {data?.recieve_amount}</td>
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
                  {data?.recieve_amount}
                </td>
              </tr>
              <tr>
                <td>Receiving By</td>
                <td>{data?.send_method === "PayByID" ? "PayID per user" : data?.send_method}</td>
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
                  <th>Transacted Amount</th>
                  <td>{data.from}&nbsp;{data.send_amount}</td>
                </tr>
                <tr>
                  <th>Transaction Status:</th>
                  <td>{transaction?.status}</td>
                </tr>
              </tbody>
            </Table>
            <div className="col-md-12 align-center">
              {/* <img className="verifies-img" src={verified} alt="verified" /> */}
              <p>Thanks for choosing Remit Assure</p>
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

          </div>
        </Modal.Body>
      </Modal>
      {/* -------------------- OTP CONFIRMATION---------------- */}
      <Modal show={open_modal} onHide={() => setOpenModal(false)} backdrop="static" centered>
        <PopVerify handler={handleOtpVerified} close={() => setOpenModal(false)} />
      </Modal>
      <ErrorModal show={error_modal.trigger} data={error_modal.data} handler={(value) => setErrorModal(value)} setModalView={(value) => { setModalView(value) }} setTransaction={(value) => setTransaction(value)} />
    </>
  )
}

const ErrorModal = ({ show, data, handler, setModalView, setTransaction }) => {

  const [bar_fill, setBarFill] = useState(0)
  const [loader, setLoader] = useState(false)
  var timer;

  useEffect(() => {
    console.log("hhhhh")
    console.log("hello", bar_fill)
    if (bar_fill <= 100 && show === true) {

      setTimeout(() => {
        setBarFill(bar_fill + 1);
      }, 1200)
    } else if (show === true) {
      clearInterval(timer)
      // handler({ trigger: false, data: {} })
      // window.location.reload()
    }
  }, [bar_fill, show])

  useEffect(() => {
    let details = data
    let timer;
    if (show === true) {
      timer = setInterval(() => {
        getAgreementList().then(res => {
          console.log(res)
          if (res.code === "200") {
            if (res.data.status === "active") {
              clearInterval(timer)
              handler({ trigger: false, data: {} })
              setLoader(true)
              ZaiPayTo(details).then(res => {
                console.log(res)
                if (res.code === "200") {
                  setTransaction({ status: "Pending", id: res?.data?.transaction_id, pay_id: res?.data?.payment_id })
                  localStorage.setItem("transaction_id", res?.data?.payment_id)
                  const user = JSON.parse(localStorage.getItem("remi-user-dt"))
                  user.digital_id_verified = "true"
                  localStorage.setItem("remi-user-dt", JSON.stringify(user))
                  if (localStorage.getItem("send-step")) {
                    localStorage.removeItem("send-step")
                  }
                  localStorage.removeItem("transfer_data")
                  setModalView(true)
                } else if (res.code === "400") {
                  toast.error(res.message, { position: "bottom-right", hideProgressBar: true })
                  // setTimeout(() => {
                  //   window.location.reload()
                  // }, 3000)

                } else {
                  toast.error("We are looking into the issue , please try later", { autoClose: 3000, position: "bottom-right", hideProgressBar: true })
                  setLoader(false)
                  setTimeout(() => {
                    window.location.reload()
                  }, 3 * 1000)
                }
              })
            }
          }
        })
      }, 5000)
    } else {
      clearInterval(timer)
    }
  }, [show])

  return (
    <>
      {
        !loader ? (
          <Modal show={show} backdrop="static" centered>
            <Modal.Body className='text-center ' >
              <div className='py-5 border'>
                <h4 style={{ color: "#6414e9" }} className='fw-bold'>Authorization pending</h4>
                <p className='my-3'>Please authorize your PayTo agreement on your respective banking portal.</p>
                <div className='my-2 px-2'>
                  <Line percent={bar_fill} strokeWidth={2} trailWidth={2} strokeColor={"#6414E9"} />
                </div>
                <p>Waiting time : <b>2 minutes.</b></p>
              </div>
            </Modal.Body>
          </Modal>
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



export default PaymentSummary