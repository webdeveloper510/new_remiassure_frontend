import Sidebar from '../Sidebar';
import React, { useEffect, useState } from 'react'
import AmountDetail from './AmountDetail'
import BankDetails from './BankDetails'
import PaymentDetails from './PaymentDetails'
import { useNavigate } from 'react-router-dom'
import authDashHelper from '../../../utils/AuthDashHelper';
import { pendingTransactions } from '../../../utils/Api';

const SendMoney = () => {

    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    const handleStep = (data) => {
        setStep(Number(data))
    }

    useEffect(() => {
        if (authDashHelper('dashCheck') === false) {
            navigate("/send-money")
        }
        pendingTransactions().then(res => {
            if (res.code === "200") {
                localStorage.setItem("transaction_id", res.data[0].transaction_id)
                if (res?.data[0]?.recipient) {
                    localStorage.setItem("rid", res?.data[0]?.recipient)
                }
            }
        })
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })
        localStorage.setItem("send-step", step)
    }, [step])



    return (
        <div className="margin-set">
            <div className="tabs-page">
                <Sidebar />
                <div className="content-body">
                    <div className="col-md-12">
                        {
                            step === 0 ? <AmountDetail handleStep={handleStep} step={step} />
                                :
                                step === 1 ? <BankDetails handleStep={handleStep} step={step} />
                                    :
                                    step === 2 ? <PaymentDetails handleStep={handleStep} step={step} />
                                        :
                                        <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney