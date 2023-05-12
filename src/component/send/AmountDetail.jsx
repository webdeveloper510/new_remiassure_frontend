import React, { useEffect } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import clsx from 'clsx';
import { useState } from 'react';
import { exchangeRate } from '../../utils/Api';
import { useLocation } from 'react-router';

const AmountDetail = ({ handleStep, step }) => {

    const [loader, setLoader] = useState(false)
    const locationState = useLocation().state
    const [exch_rate, setExchRate] = React.useState("");
    const [amt_detail, setAmtDetail] = useState({
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "NZD",
        recieve_meth: "Bank Transfer",
        payout_part: "Bank"
    })

    const nzd_opt = ["AUD", "USD", "EUR", "CAD"]
    const aud_opt = ["NZD", "USD", "EUR", "CAD"]

    const amtSchema = Yup.object().shape({
        send_amt: Yup.string()
            .min(1, 'Minimum 3 symbols')
            .max(7, 'Maximum 50 symbols')
            .required('Email is required'),
        from_type: Yup.string().oneOf(["AUD", "NZD"]),
        to_type: Yup.string().required()
    })

    const initialValues = {
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "NZD",
        recieve_meth: "Bank Transfer",
        payout_part: "Bank"
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: amtSchema,
        onSubmit: async (values) => {
            console.log("Amount Details---------------", values)
            let local = {}
            if (localStorage.getItem("transfer_data")) {
                local = JSON.parse(localStorage.getItem("transfer_data"))
            }
            local.amount = { ...values, rates: exch_rate }

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
        if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight" || event.key === "Escape" || event.key === "Escape") {
            setAmtDetail({ ...amt_detail, send_amt: event.target.value })
            formik.setFieldValue('send_amt', event.target.value)
            formik.setFieldTouched('send_amt', true)
        } else {
            let value = event.target.value.toString()
            if (value.length < 7) {
                if (!pattern.test(event.key)) {
                    event.preventDefault();
                    event.stopPropagation()
                } else {
                    console.log("----------------------------", event.target.value)
                    setAmtDetail({ ...amt_detail, send_amt: event.target.value })
                    formik.setFieldValue('send_amt', event.target.value)
                    formik.setFieldTouched('send_amt', true)
                }
            } else {
                event.preventDefault();
                event.stopPropagation()
            }
        }
    }

    const myTotalAmount = (event) => {

        event.preventDefault();
        if (event.target.value > 0)
            setLoader(true)
        exchangeRate({ amount: event.target.value, from: formik.values.from_type, to: formik.values.to_type })
            .then(function (response) {
                setLoader(false)
                setExchRate(response.rate)
                formik.setFieldValue("exchange_amt", response.amount)
                setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
            })
            .catch(function (error, message) {
                console.log(error.response)
                setLoader(false)

            })
    }

    const myTotalAmountFrom = (e) => {
        console.log(e.target.value)
        setAmtDetail({ ...amt_detail, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoader(true)
        const amt = formik.values.send_amt != undefined && formik.values.send_amt != 0 && formik.values.send_amt != "" ? formik.values.send_amt : "1"

        if (e.target.value == "AUD" && formik.values.to_type == "AUD") {
            formik.setFieldValue("to_type", "NZD")
            exchangeRate({ amount: amt, from: e.target.value, to: "NZD" })
                .then(function (response) {
                    setExchRate(response.rate)
                    if (formik.values.send_amt != 0 && formik.values.send_amt != "" && formik.values.send_amt != undefined) {
                        formik.setFieldValue("exchange_amt", response.amount)
                        setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                    }
                    setLoader(false)
                })
                .catch(function (error, message) {
                    console.log(error.response)
                    setLoader(false)
                })
        } else if (e.target.value == "NZD" && formik.values.to_type == "NZD") {
            formik.setFieldValue("to_type", "AUD")
            exchangeRate({ amount: amt, from: e.target.value, to: "AUD" })
                .then(function (response) {
                    setExchRate(response.rate)
                    if (formik.values.send_amt != 0 && formik.values.send_amt != "" && formik.values.send_amt != undefined) {
                        formik.setFieldValue("exchange_amt", response.amount)
                        setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                    }
                    setLoader(false)
                })
                .catch(function (error, message) {
                    console.log(error.response)
                    setLoader(false)
                })
        } else {
            exchangeRate({ amount: amt, from: e.target.value, to: formik.values.to_type })
                .then(function (response) {
                    setExchRate(response.rate)
                    if (formik.values.send_amt != 0 && formik.values.send_amt != "" && formik.values.send_amt != undefined) {
                        formik.setFieldValue("exchange_amt", response.amount)
                        setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                    }
                    setLoader(false)
                })
                .catch(function (error, message) {
                    console.log(error.response)
                    setLoader(false)
                })
        }
    }

    const myTotalAmountTo = (e) => {
        console.log(e.target.value, formik.values.send_amt)
        setAmtDetail({ ...amt_detail, to_type: e.target.value })
        formik.setFieldValue("to_type", e.target.value)
        formik.setFieldTouched("to_type", true)
        setLoader(true)
        const amt = formik.values.send_amt != undefined && formik.values.send_amt != 0 && formik.values.send_amt != "" ? formik.values.send_amt : "1"

        exchangeRate({ amount: amt, from: formik.values.from_type, to: e.target.value })
            .then(function (response) {
                setExchRate(response.rate)
                if (formik.values.send_amt != 0 && formik.values.send_amt != undefined && formik.values.send_amt != "") {
                    formik.setFieldValue("exchange_amt", response.amount)
                    setAmtDetail({ ...amt_detail, exchange_amt: response.amount })
                }
                setLoader(false)
            })
            .catch(function (error, message) {
                console.log(error.response)
                setLoader(false)
            })
    }
    const handleClear = () => {
        localStorage.removeItem("transfer_data")
        localStorage.removeItem("send-step")
        window.location.reload(true)
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
        if (localStorage.getItem("transfer_data")) {
            let tdata = JSON.parse(localStorage.getItem("transfer_data"))
            if (tdata?.amount) {
                setAmtDetail(tdata?.amount)
                formik.setValues({ ...tdata?.amount })
            }
        } else if (locationState) {
            let data = locationState
            setAmtDetail({ ...amt_detail, from_type: data.from_type, to_type: data.to_type, send_amt: data.send_amt, exchange_amt: data.exchange_amt })
            setExchRate(data.exch_rate)
            formik.setValues({ ...formik.values, from_type: data.from_type, to_type: data.to_type, send_amt: data.send_amt, exchange_amt: data.exchange_amt })
        }
        else {
            let data = JSON.parse(localStorage.getItem("exchange_curr"))
            setAmtDetail({ ...amt_detail, from_type: data.from_type, to_type: data.to_type })
            setExchRate(data.exch_rate)
            formik.setValues({ ...formik.values, from_type: data.from_type, to_type: data.to_type })
        }

    }, [])


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
                            <p className="exchange-rate exchange_value" >1 <span>{formik.values.from_type}</span> = {exch_rate} <span>{formik.values.to_type}</span> </p>
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
                                // {...formik.getFieldProps('from_type')}
                                className='mb-3 bg-transparent form-control form-select rate_input '
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
                                className="mb-3 bg-transparent form-control form-select rate_input"
                                onChange={(e) => { myTotalAmountTo(e) }}
                            // {...formik.getFieldProps('to_type')}
                            >
                                {
                                    formik.values.from_type === "AUD" ?
                                        aud_opt.map((item, index) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        }) :
                                        nzd_opt.map((item) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })
                                }
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
                            onClick={() => handleClear()}
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
                    {loader ? <>
                        <div class="loader-overly">
                            <div class="loader" >
                            </div>
                        </div>
                    </> : ""}
                </div>
            </div>
        </form>
    );
}

export default AmountDetail