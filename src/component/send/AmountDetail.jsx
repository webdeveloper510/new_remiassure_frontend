import React, { useEffect } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import clsx from 'clsx';
import { useState } from 'react';
import { exchangeRate } from '../../utils/Api';
import { useNavigate , useLocation} from 'react-router';

const AmountDetail = ({ handleAmtDetail, handleStep, step }) => {

    const navigate = useNavigate()
    const data = useLocation()?.state
    const tdata = JSON.parse(localStorage.getItem("transfer_data"))

    const [exch_rate, setExchRate] = React.useState('1.0998');
    const [amt_detail, setAmtDetail] = useState({
        send_amt: tdata?.amt?.send_amt || data?.send_amt || "",
        exchange_amt: tdata?.amt?.exchange_amt || data?.exchange_amt || "",
        from_type: tdata?.amt?.from_type || data?.from_type || "AUD",
        to_type: tdata?.amt?.to_type || data?.to_type || "NZD",
        recieve_meth: tdata?.amt?.recieve_meth || data?.recieve_meth || "Bank Transfer",
        payout_part: tdata?.amt?.payout_part || data?.payout_part || "Bank"
    })



    const amtSchema = Yup.object().shape({
        send_amt: Yup.string()
            .min(2, 'Minimum 3 symbols')
            .max(6, 'Maximum 50 symbols')
            .required('Email is required'),
        from_type: Yup.string().oneOf(["AUD", "NZD"]),
        to_type: Yup.string().required()
    })

    const initialValues = {
        send_amt: tdata?.amt?.send_amt || data?.send_amt || "",
        exchange_amt: tdata?.amt?.exchange_amt || data?.exchange_amt || "",
        from_type: tdata?.amt?.from_type || data?.from_type || "AUD",
        to_type: tdata?.amt?.to_type || data?.to_type || "NZD",
        recieve_meth: tdata?.amt?.recieve_meth || data?.recieve_meth || "Bank Transfer",
        payout_part: tdata?.amt?.payout_part  || "Bank"
    }

    const formik = useFormik({
        initialValues,
        validationSchema: amtSchema,
        onSubmit: async (values) => {
            console.log("Amount Details---------------", values)
            handleAmtDetail({
                send_amt: values.send_amt,
                exchange_amt: values.exchange_amt,
                from_type: values.from_type,
                to_type: values.to_type,
                recieve_meth: values.recieve_meth,
                payout_part: values.payout_part
            })
            let local = {}
            if (localStorage.getItem("transfer_data")) {
                local = JSON.parse(localStorage.getItem("transfer_data"))
            }
            local.amount = values

            localStorage.setItem("transfer_data", JSON.stringify(local))
            if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
            }
            localStorage.setItem("send-step", Number(step) + 1)
            handleStep(Number(step) + 1)
        },
    })

    const inputvalidation = (event) => {
        console.log("dfjghfguh---------------", event.key)
        const pattern = /^[0-9.,]+$/;
        if (event.key === 'Backspace') {

        }
        else if (!pattern.test(event.key)) {
            event.preventDefault();
            event.stopPropagation()
        } else {
            console.log("----------------------------", event.target.value)
            setAmtDetail({ ...amt_detail, send_amt: event.target.value })
            formik.setFieldValue('send_amt', event.target.value)
            formik.setFieldTouched('send_amt', true)
        }
    }

    const myTotalAmount = (event) => {

        event.preventDefault();
        console.log("amout--------------", event.target.value, amt_detail.from_type, amt_detail.to_type)
        exchangeRate({ amount: event.target.value, from: amt_detail.from_type, to: amt_detail.to_type })
            .then(function (response) {
                console.log(response);
                setExchRate(response.rate)
                formik.setFieldValue("exchange_amt", response.amount)
                setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
            })
            .catch(function (error, message) {
                console.log(error.response)

            })
    }

    const myTotalAmountFrom = (e) => {
        console.log(e.target.value)

        setAmtDetail({ ...amt_detail, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        if (amt_detail.send_amt != 0) {
            exchangeRate({ amount: amt_detail.send_amt, from: e.target.value, to: amt_detail.to_type })
                .then(function (response) {
                    setExchRate(response.rate)
                    formik.setFieldValue("exchange_amt", response.amount)
                    setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                })
                .catch(function (error, message) {
                    console.log(error.response)

                })
        }

    }

    const handleCancel = () => {
        localStorage.removeItem("send-step")
        localStorage.removeItem("transfer_data")
        navigate("/")
    }

    const myTotalAmountTo = (e) => {
        console.log(e.target.value)
        setAmtDetail({ ...amt_detail, to_type: e.target.value })
        formik.setFieldValue("to_type", e.target.value)
        if (amt_detail.send_amt != 0) {
            exchangeRate({ amount: amt_detail.send_amt, from: amt_detail.from_type, to: e.target.value })
                .then(function (response) {
                    setExchRate(response.rate)
                    formik.setFieldValue("exchange_amt", response.amount)
                    setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                })
                .catch(function (error, message) {
                    console.log(error.response)
                })
        }


    }

    const handleRecieveMethod = (e) => {
        setAmtDetail({ ...amt_detail, recieve_meth: e.target.value })
        formik.setFieldValue("recieve_meth", e.target.value)
    }

    const handlePayoutPart = (e) => {
        setAmtDetail({ ...amt_detail, payout_part: e.target.value })
        formik.setFieldValue("payout_part", e.target.value)
    }

    useEffect(() => {
        console.log(amt_detail)
    }, [amt_detail])

    return (
        <form noValidate>
            <div className="form_body">
                <div className="header exchangemoney-header">
                    <h1>Amount & delivery</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="input_field rate-value">
                            <p className="get-text Exchange_rate">Exchange Rate</p>
                            <p className="exchange-rate exchange_value" >1 <span>{amt_detail.from_type}</span> = {exch_rate} <span>{amt_detail.to_type}</span> </p>
                            {/* <input type="text" className='rate_input form-control' /> */}
                        </div>
                    </div>
                </div>
                <div className="row  each-row">
                    <div className="col-md-6">
                        <div className="input_field">
                            <p className="get-text">From<span style={{ color: 'red' }} >*</span></p>
                            <select
                                aria-label="Select a reason"
                                onChange={(e) => { myTotalAmountFrom(e) }}
                                {...formik.getFieldProps('from_type')}
                                className={clsx(
                                    'mb-3 bg-transparent form-control form-select rate_input ',
                                    { 'is-invalid': formik.touched.from_type && formik.errors.from_type },
                                    {
                                        'is-valid': formik.touched.from_type && !formik.errors.from_type,
                                    }
                                )}
                            >
                                <option value="AUD">AUD</option>
                                <option value="NZD">NZD</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input_field">
                            <p className="get-text">To<span style={{ color: 'red' }} >*</span></p>
                            <select
                                aria-label="Select a reason"
                                onChange={(e) => { myTotalAmountTo(e) }}
                                {...formik.getFieldProps('to_type')}
                                className={clsx(
                                    'mb-3 bg-transparent form-control form-select rate_input ',
                                    { 'is-invalid': formik.touched.to_type && formik.errors.to_type },
                                    {
                                        'is-valid': formik.touched.to_type && !formik.errors.to_type,
                                    }
                                )}
                            >
                                <option value="NZD">NZD</option>
                                <option value="AUD">AUD</option>
                                <option value="EUR">EUR</option>
                                <option value="INR">INR</option>
                                <option value="BRL">BRL</option>
                                <option value="BGN">BGN</option>
                                <option value="XAF">XAF</option>
                                <option value="CAD">CAD</option>
                                <option value="EUR">EUR</option>
                                <option value="CZK">CZK</option>
                                <option value="DKK">DKK</option>
                                <option value="GHS">GHS</option>
                                <option value="ISK">ISK</option>
                                <option value="JOD">JPD</option>
                                <option value="KWD">KWD</option>
                                <option value="NZD">NZD</option>
                                <option value="PHP">PHP</option>
                                <option value="ZAR">ZAR</option>
                                <option value="CHF">CHF</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="row each-row">
                    <div className="col-md-6">
                        <div className="input_field">
                            <p className="get-text">Amount Send<span style={{ color: 'red' }} >*</span></p>
                            <input
                                type="text"
                                name="amountInput"
                                value={amt_detail?.send_amt}
                                onKeyDown={(e) => inputvalidation(e)}
                                {...formik.getFieldProps('send_amt')}
                                className={clsx(
                                    'mb-3 bg-transparent form-control rate_input',
                                    { 'is-invalid': formik.touched.send_amt && formik.errors.send_amt },
                                    {
                                        'is-valid': formik.touched.send_amt && !formik.errors.send_amt,
                                    }
                                )}
                                onBlurCapture={myTotalAmount}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input_field">
                            <p className="get-text">
                                Exchange Amount
                            </p>
                            <input
                                type="text"
                                value={amt_detail?.exchange_amt}
                                className='rate_input form-control'
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="row each-row">
                    <h5>Receive Method</h5>
                    <div className="col-md-12">
                        <label className="container-new">
                            <span className="radio-tick">Bank Transfer</span>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recivedMethod"
                                value="Bank Transfer"
                                defaultChecked={amt_detail.recieve_meth == "Bank Transfer"}
                                onChange={(e) => { handleRecieveMethod(e) }}
                            />
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <div className="col-md-12">

                        <label className="container-new">
                            <span className="radio-tick">Mobile Wallet</span>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recivedMethod"
                                value="Mobile Wallet"
                                checked={amt_detail.recieve_meth == "Mobile Wallet"}
                                onChange={(e) => { handleRecieveMethod(e) }}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="row each-row">
                    <h5>Payout Partners</h5>
                    <div className="col-md-12">

                        <label className="container-new">
                            <span className="radio-tick">Bank</span>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payOutPartner"
                                checked={amt_detail.payout_part == "Bank"}
                                value="Bank"
                                onChange={(e) => { handlePayoutPart(e) }}

                            />
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <div className="col-md-12">

                        <label className="container-new">
                            <span className="radio-tick">Services</span>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payOutPartner"
                                checked={amt_detail.payout_part == "Services"}
                                value="Services"
                                onChange={(e) => { handlePayoutPart(e) }}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <button
                            type='button'
                            className="start-form-button"
                            onClick={() => handleCancel()}
                        >Cancel</button>
                    </div>
                    <div className="col-md-8">
                        <button
                            type="button"
                            onClick={() => formik.handleSubmit()}
                            className="form-button"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AmountDetail