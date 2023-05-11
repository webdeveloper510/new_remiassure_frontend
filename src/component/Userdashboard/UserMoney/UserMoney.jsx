import Sidebar from '../Sidebar';
import React, { useEffect, useState } from 'react'
import AmountDetail from './AmountDetail'
import BankDetails from './BankDetails'
import PaymentDetails from './PaymentDetails'
import { useLocation, useNavigate } from 'react-router-dom'
import authDashHelper from '../../../utils/AuthDashHelper';

const SendMoney = () => {

    const data = useLocation()?.state
    const [step, setStep] = useState(0)
    const [titles, setTitles] = useState(["Amount & Delivery", "Recipient Bank Details", "Payment Details", "Sender Details", "Payment Summary", "Thank you"])
    const [amt_detail, setAmtDetail] = useState({
        send_amt: data?.send_amt || "", exchange_amt: data?.exchange_amt || "", from_type: data?.from_type || "", to_type: data?.to_type || "", recieve_meth: data?.recieve_meth || "", payout_part: ""
    })

    const [bank_detail, setBankDetail] = useState({
        bank: "", acc_name: "", acc_no: "", f_name: "", l_name: "", m_name: "", email: "", mobile: "",
        flat: "", build_no: "", street: "", city: "", post: "", state: "", country: "", reason: ""
    })

    const [pay_detail, setPayDetail] = useState({
        payment_type: ""
    })

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
        if (!authDashHelper('dashCheck')) {
            navigate("/send-money")
        }
        else {
          localStorage.removeItem("send-step")
          localStorage.removeItem("transfer_data")
        }
        setInterval(() => {
            localStorage.removeItem("send-step");
            localStorage.removeItem("transfer_data");
            window.location.reload(true)
        }, 15 * 60 * 1000);

    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })
        localStorage.setItem("send-step", step)
        console.log("step---------------------------", step)
    }, [step])


    return (
        <div className="margin-set">
            <div className="tabs-page">
                <Sidebar />

                <div className="content-body">

                    <div className="col-md-10">
                        {
                            step === 0 ? <AmountDetail handleAmtDetail={handleAmtDetail} handleStep={handleStep} step={step} />
                                :
                                step === 1 ? <BankDetails handleBankDetail={handleBankDetail} handleStep={handleStep} step={step} />
                                    :
                                    step === 2 ? <PaymentDetails handleStep={handleStep} step={step} />
                                        : <></>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney