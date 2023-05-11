import React, { useEffect, useState, useRef } from 'react'
import { Table } from 'react-bootstrap'
import { BsCheckCircleFill } from 'react-icons/bs'
import AmountDetail from './AmountDetail'
import BankDetails from './BankDetails'
import PaymentDetails from './PaymentDetails'
import SenderDetails from './SenderDetails'
import PaymentSummary from './PaymentSummary'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import verified from '../../assets/img/userdashboard/3.png';
import authDashHelper from '../../utils/AuthDashHelper'

const SendMoney = () => {

  const [activeStep, setActiveStep] = useState(1);
  const progressBarRefs = useRef([]);

  const data = useLocation()?.state

  const [step, setStep] = useState(0)

  const [amt_detail, setAmtDetail] = useState({
    send_amt: data?.send_amt || "", exchange_amt: data?.exchange_amt || "", from_type: data?.from_type || "", to_type: data?.to_type || "", recieve_meth: data?.recieve_meth || "", payout_part: ""
  })

  const [bank_detail, setBankDetail] = useState({
    bank: "", acc_name: "", acc_no: "", f_name: "", l_name: "", m_name: "", email: "", mobile: "",
    flat: "", build_no: "", street: "", city: "", post: "", state: "", country: "", reason: ""
  })

  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(14);

  const handleAmtDetail = (data) => {
    setAmtDetail(data)
  }
  const navigate = useNavigate()

  const handleBankDetail = (data) => {
    setBankDetail(data)
  }

  const handleStep = (data) => {
    setStep(Number(data))
  }

  useEffect(() => {

    if (authDashHelper('dashCheck')) {
      console.log("if---------------------------------------------------")
      navigate("/user-send-money")
    } else if (!authDashHelper('authCheck')) {
      console.log("elseif----------------------------------------")
      navigate("/login")
    } else {
      
      console.log("else---------------------------------",authDashHelper('authCheck'))
      localStorage.removeItem("send-step")
      localStorage.removeItem("transfer_data")
      // setInterval(() => {
      //   // console.log("time")
      //   localStorage.removeItem("send-step");
      //   localStorage.removeItem("transfer_data");
      //   window.location.reload(true)
      // }, 15 * 60 * 1000);
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })
    if (localStorage.getItem("transfer_data")) {
      const local = JSON.parse(localStorage.getItem("transfer_data"))
      if (local?.amount) {
        setAmtDetail(local.amount)
      }
      if (local?.recipient) {
        setBankDetail(local.recipient)
      }
    }
    const s = step;
    if (s > 0) {
      let n = s;
      while (n != 0) {
        console.log(n)
        progressBarRefs.current[n - 1].style.transform = "translateX(100%)";
        n--
      }
    }
    setActiveStep(Number(s) + 1)
  }, [step])

  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);

  }, [seconds]);

  useEffect(() => {
    minutes > 0 && setTimeout(() => setMinutes(minutes - 1), 60 * 1000);
    setSeconds(60)
  }, [minutes])



  return (
    <>
      <div>
        {
          1 ? (
            <div className="form send_money_section">
              <>
                <section className="why-us section-bgba user_dashboard_banner">
                  <div className="container">
                    <div className="row">
                      <ul className="multi-steps">
                        <li className={`step ${activeStep === 1 ? "is-active" : ""}`}>
                          <div className="step-label text-light">
                            Amount & Delivery
                            <div className="progress-bar progress-bar--success">
                              <div
                                className="progress-bar__bar"
                                ref={(ref) => (progressBarRefs.current[0] = ref)}
                              ></div>
                            </div>
                          </div>
                        </li>
                        <li className={`step ${activeStep === 2 ? "is-active" : ""}`}>
                          <div className="step-label text-light">
                            Recipient Details
                            <div className="progress-bar progress-bar--success">
                              <div
                                className="progress-bar__bar"
                                ref={(ref) => (progressBarRefs.current[1] = ref)}
                              ></div>
                            </div>
                          </div>
                        </li>
                        <li className={`step ${activeStep === 3 ? "is-active" : ""}`}>
                          <div className="step-label text-light">
                            Payment Method
                            <div className="progress-bar progress-bar--success">
                              <div
                                className="progress-bar__bar"
                                ref={(ref) => (progressBarRefs.current[2] = ref)}
                              ></div>
                            </div>
                          </div>
                        </li>
                        <li className={`step ${activeStep === 4 ? "is-active" : ""}`}>
                          <div className="step-label text-light">
                            Sender Details
                            <div className="progress-bar progress-bar--success">
                              <div
                                className="progress-bar__bar"
                                ref={(ref) => (progressBarRefs.current[3] = ref)}
                              ></div>
                            </div>
                          </div>
                        </li>
                        <li className={`step ${activeStep === 5 ? "is-active" : ""}`}>
                          <div className="step-label text-light">
                            Summary
                          </div>
                        </li>
                      </ul>

                      <div className="col-md-8">
                        {
                          step === 0 ? <AmountDetail handleAmtDetail={handleAmtDetail} handleStep={handleStep} step={step} />
                            :
                            step === 1 ? <BankDetails handleBankDetail={handleBankDetail} handleStep={handleStep} step={step} />
                              :
                              step === 2 ? <PaymentDetails handleStep={handleStep} step={step} />
                                :
                                step === 3 ? <SenderDetails handleStep={handleStep} step={step} />
                                  :
                                  step === 4 ? <PaymentSummary handleStep={handleStep} step={step} />
                                    : <></>
                          // step === 5 ? <>
                          // <div className="form_body">
                          //   <div className="header">
                          //     <h1>Thank you</h1>
                          //   </div>
                          //   <div className="col-md-12 align-center">
                          //     <img className="verifies-img" src={verified} alt="verified" />
                          //     <p>Thanks for choosing RemitAssure</p>
                          //     <NavLink to="/dashboard">
                          //       <button type="submit" className="form-button" style={{ "width": '100%' }}>Go back to Dashboard</button></NavLink>
                          //   </div>

                          // </div>
                          // </>
                          //   : ""
                        }
                      </div>
                      <div className="col-md-4">
                        <div>Form auto closes in ⇒ {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds}</div>

                        <Table>
                          {
                            step > 0 && step < 4 ? (
                              <div className="summary">
                                <BsCheckCircleFill />
                                <h5>Summary</h5>
                                <tbody>
                                  <tr>
                                    <th>Amount</th>
                                    <td>{amt_detail?.from_type + amt_detail?.send_amt + " ⇒ " + amt_detail?.to_type + amt_detail?.exchange_amt}</td>
                                  </tr>
                                  <tr>
                                    <th>Received Method</th>
                                    <td>{amt_detail?.recieve_meth}</td>
                                  </tr>
                                  <tr>
                                    <th>Payout Partners</th>
                                    <td>{amt_detail?.payout_part}</td>
                                  </tr>
                                </tbody>
                              </div>
                            ) : (
                              <>
                              </>
                            )
                          }
                          {
                            step > 1 && step < 4 && bank_detail?.bank != '' ? (
                              <div className="summary1">
                                <BsCheckCircleFill />
                                <h5>Recipient details Summary</h5>
                                <tbody>
                                  <tr>
                                    <th>Full Name</th>
                                    <td>{bank_detail?.f_name} <span>{bank_detail?.l_name}</span></td>
                                  </tr>
                                  <tr>
                                    <th>Mobile</th>
                                    <td>{bank_detail?.mobile}</td>
                                  </tr>
                                  <tr>
                                    <th>Reason</th>
                                    <td>{bank_detail?.reason}</td>
                                  </tr>
                                </tbody>
                              </div>
                            ) : (
                              <>
                              </>
                            )
                          }
                        </Table>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            </div>
          ) : (
            <>
            </>
          )
        }
      </div>
    </>
  )
}

export default SendMoney