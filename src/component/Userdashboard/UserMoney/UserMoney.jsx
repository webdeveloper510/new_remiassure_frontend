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
    const [seconds, setSeconds] = useState(60);
    const [minutes, setMinutes] = useState(29);

    const navigate = useNavigate()

    const handleStep = (data) => {
        setStep(Number(data))
    }

    useEffect(() => {
        if (authDashHelper('dashCheck') === false) {
            navigate("/send-money")
        }
        localStorage.removeItem("send-step")
        localStorage.removeItem("transfer_data")
        // setTimeout(() => {
        //     localStorage.removeItem("send-step");
        //     localStorage.removeItem("transfer_data");
        //     window.location.reload(true)
        // }, 30 * 60 * 1000);

    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })
        localStorage.setItem("send-step", step)
    }, [step])

    useEffect(() => {
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);

    }, [seconds]);

    useEffect(() => {
        minutes > 0 && setTimeout(() => setMinutes(minutes - 1), 60 * 1000);
        setSeconds(60)
    }, [minutes])

    return (
        <div className="content-body">
            {/* <div className='timer-row'>Form auto closes in ⇒  <label> <span> {minutes < 10 ? "0" + minutes : minutes}</span><p>Minutes</p> </label> <label className='timerdots'>:</label>  <label><span> {seconds < 10 ? "0" + seconds : seconds}</span> <p>Seconds</p> </label></div> */}
            <div className="col-md-10">
                {
                    step === 0 ? <AmountDetail handleStep={handleStep} step={step} />
                        :
                        step === 1 ? <BankDetails handleStep={handleStep} step={step} />
                            :
                            step === 2 ? <PaymentDetails handleStep={handleStep} step={step} />
                                : <></>

                }
            </div>
        </div>
    )
}

export default SendMoney