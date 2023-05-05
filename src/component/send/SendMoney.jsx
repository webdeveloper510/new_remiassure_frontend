import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { BsCheckCircleFill } from 'react-icons/bs'
import AmountDetail from './AmountDetail'
import BankDetails from './BankDetails'
import PaymentDetails from './PaymentDetails'
import SenderDetails from './SenderDetails'
import PaymentSummary from './PaymentSummary'

const SendMoney = () => {

  const [step, setStep] = useState(0)
  const [titles, setTitles] = useState(["Amount & Delivery", "Recipient Bank Details", "Payment Details", "Sender Details", "Payment Summary", "Thank you"])

  const [amt_detail, setAmtDetail] = useState({
    send_amt: "", exchange_amt: "", from_type: "", to_type: "", recieve_meth: "", payout_part: ""
  })


  const [bank_detail, setBankDetail] = useState({
    bank: "", acc_name: "", acc_no: "", f_name: "", l_name: "", m_name: "", email: "", mobile: "",
    flat: "", build_no: "", street: "", city: "", post: "", state: "", country: "", reason: ""
  })

  const [pay_detail, setPayDetail] = useState({
    pay_type: ""
  })


  const handleAmtDetail = (data) => {
    setAmtDetail(data)
  }

  const handleBankDetail = (data) => {
    setBankDetail(data)
  }

  const handleStep = (data) => {
    setStep(Number(data))
  }

  useEffect(() => {
    if (localStorage.getItem("send-step")) {
      localStorage.removeItem("send-step")
    }
    localStorage.setItem("send-step", step)
  }, [step])

  return (
    <>
      <div>
        {
          1 ? (
            <div className="form">
              <>
                <section className="why-us section-bgba user_dashboard_banner">
                  <div className="container">
                    <div className="row">

                      <div className="col-md-8">
                        <section>
                          {/* <div className="progressBar">
                           
                              {
                                titles?.map((item, index) => {
                                  console.log(index, step)
                                  return (
                                    <>
                                   <div className={`progress step${index+1}`}>
                                    <div className='steps-description'>
                                    {item}
                                    </div>
                                    </div>
                                    </>
                                  )
                                })
                              }
                           
                          </div> */}
                          {
                            step == 0 ? <AmountDetail handleAmtDetail={handleAmtDetail} handleStep={handleStep} step={step} />
                              :
                              step == 1 ? <BankDetails handleBankDetail={handleBankDetail} handleStep={handleStep} step={step} />
                                :
                                step == 2 ? <PaymentDetails />
                                  :
                                  step == 3 ? <SenderDetails />
                                    :
                                    step == 4 ? <PaymentSummary />
                                      :
                                      step == 5 ? <></>
                                        : ""
                          }
                        </section>
                      </div>
                      <div className="col-md-4">
                        <Table>
                          {
                            step > 0 && amt_detail?.exchange_amt != '' ? (
                              <div className="summary">
                                <BsCheckCircleFill />
                                <h5>Summary</h5>
                                <tbody>
                                  <tr>
                                    <th>Amount</th>
                                    <td>{amt_detail?.send_amt + " " + amt_detail?.from_type + " ⇒ " + amt_detail?.exchange_amt + " " + amt_detail?.to_type}</td>
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
                            step > 0 && bank_detail?.bank != '' ? (
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
                                    <th>Reason For Sending Money</th>
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
            <></>
          )
        }
      </div>
    </>
  )
}

export default SendMoney