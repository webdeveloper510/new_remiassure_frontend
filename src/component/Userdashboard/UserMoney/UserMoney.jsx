import Sidebar from '../Sidebar';
import React, { useEffect, useState } from 'react'
import AmountDetail from './AmountDetail'
import BankDetails from './BankDetails'
import PaymentDetails from './PaymentDetails'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import authDashHelper from '../../../utils/AuthDashHelper';
import { pendingTransactions } from '../../../utils/Api';

const SendMoney = () => {

    const [step, setStep] = useState(0)
    const navigate = useNavigate()

    const handleStep = (data) => {
        setStep(Number(data))
    }

    useEffect(() => {
        pendingTransactions().then(res => {
            if (res.code === "200") {
                sessionStorage.setItem("transaction_id", res.data[0].transaction_id)
                if (res?.data[0]?.recipient) {
                    sessionStorage.setItem("rid", res?.data[0]?.recipient)
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
        sessionStorage.setItem("send-step", step)
    }, [step])

    useEffect(() => {
        if (authDashHelper('dashCheck') === false) {
            navigate("/dashboard")
        }
    }, [])

    return (
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
    )
}

export default SendMoney