import React, { useEffect } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import clsx from 'clsx';
import { useState } from 'react';
import { exchangeRate } from '../../utils/Api';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

const AmountDetail = ({ handleStep, step }) => {

    const [loader, setLoader] = useState(false)
    const locationState = useLocation().state
    const [exch_rate, setExchRate] = React.useState("");
    const [amt_detail, setAmtDetail] = useState({
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "USD",
        recieve_meth: "Bank Transfer",
        payout_part: "Bank"
    })

    const curr_out = ["USD", "NGN", "GHC", "KHS", "PHP", "THB", "VND"]


    const amtSchema = Yup.object().shape({
        send_amt: Yup.string()
            .min(1, 'Minimum 3 symbols')
            .max(10, 'Maximum 50 symbols')
            .required('Email is required').notOneOf(["."], " "),
        from_type: Yup.string().oneOf(["AUD", "NZD"]),
        to_type: Yup.string().required()
    })

    const initialValues = {
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "USD",
        recieve_meth: "Bank Transfer",
        payout_part: "Bank"
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: amtSchema,
        onSubmit: async (values) => {
            if (amt_detail.payout_part === "Services" || amt_detail.recieve_meth === "Mobile Wallet") {
                toast.warn("THIS SERVICE OPTION IS CURRENTLY UNAVAILABLE", { hideProgressBar: true, autoClose: 2000, position: "bottom-right" })
            } else {
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
            }
        },
    })

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
                setLoader(false)

            })
    }

    const inputvalidation = (event) => {
        // const pattern = /^[0-9.]+$/;
        // if (event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight" || event.key === "Escape") {
        //     setAmtDetail({ ...amt_detail, send_amt: event.target.value })
        //     formik.setFieldValue('send_amt', event.target.value)
        //     formik.setFieldTouched('send_amt', true)
        // } else if (event.key === 'Backspace' || event.key === "Delete") {
        //     formik.setFieldValue("exchange_amt", "")
        //     formik.setFieldTouched("exchange_amt", false)
        //     setAmtDetail({ ...amt_detail, exchange_amt: "" })
        // } else if (event.key === 'Enter') {
        //     myTotalAmount(event)
        // } else {
        //     let value = event.target.value.toString()
        //     if (value.length < 7) {
        //         if (!pattern.test(event.key)) {
        //             event.preventDefault();
        //             event.stopPropagation()
        //         } else {
        //             setAmtDetail({ ...amt_detail, send_amt: event.target.value })
        //             formik.setFieldValue('send_amt', event.target.value)
        //             formik.setFieldTouched('send_amt', true)
        //         }
        //     } else {
        //         event.preventDefault();
        //         event.stopPropagation()
        //     }
        // }
        var data = event.target.value;
        var decimalIndex = data.indexOf('.');

        if ((event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 0) {
            if (decimalIndex > -1) {
                // Check if the user is trying to enter more than 2 digits after the decimal point
                if (data.length - decimalIndex > 2) { // +1 to account for the decimal point itself
                    event.preventDefault();
                } else if (event.charCode === 46) {
                    event.preventDefault();
                } else {
                    formik.setFieldValue('send_amt', event.target.value);
                    formik.setFieldTouched('send_amt', true);
                    setAmtDetail({ ...amt_detail, send_amt: event.target.value })
                }
            } else {
                // If there is no decimal point yet, allow input
                formik.setFieldValue('send_amt', event.target.value);
                formik.setFieldTouched('send_amt', true);
                setAmtDetail({ ...amt_detail, send_amt: event.target.value })
            }
        } else {
            event.preventDefault();
        }
    }

    const amountDown = (e) => {
        if ((e.key === "Enter" || e.key === "Tab" || e.key === 'Shift') && e.target.value !== ".") {
            myTotalAmount(e)
        }
    }
    const amountBlur = (e) => {
        if (e.target.value !== ".") {
            myTotalAmount(e)
        }
    }


    const myTotalAmountFrom = (e) => {
        setAmtDetail({ ...amt_detail, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoader(true)
        const amt = formik.values.send_amt != undefined && formik.values.send_amt != 0 && formik.values.send_amt != "" ? formik.values.send_amt : "1"
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
                setLoader(false)
            })
    }

    const myTotalAmountTo = (e) => {
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
                setLoader(false)
            })
    }
    const handleClear = () => {
        localStorage.removeItem("transfer_data")
        localStorage.removeItem("send-step")
        window.location.reload(true)
    }

    const handleRecieveMethod = (e) => {
        if (e.target.value === "Mobile Wallet") {
            toast.warn("THIS SERVICE OPTION IS CURRENTLY UNAVAILABLE", { hideProgressBar: true, autoClose: 500, position: "bottom-right" })
            setAmtDetail({ ...amt_detail, recieve_meth: "Bank Transfer" })
            formik.setFieldValue("recieve_meth", "Bank Transfer")
        } else {
            setAmtDetail({ ...amt_detail, recieve_meth: e.target.value })
            formik.setFieldValue("recieve_meth", e.target.value)
        }

    }

    const handlePayoutPart = (e) => {
        if (e.target.value === "Services") {
            toast.warn("THIS SERVICE OPTION IS CURRENTLY UNAVAILABLE", { hideProgressBar: true, autoClose: 1000, position: "bottom-right" })
            setAmtDetail({ ...amt_detail, payout_part: "Bank" })
            formik.setFieldValue("payout_part", "Bank")
        } else {
            setAmtDetail({ ...amt_detail, payout_part: e.target.value })
            formik.setFieldValue("payout_part", e.target.value)
        }

    }

    useEffect(() => {
        if (localStorage.getItem("transfer_data")) {
            let tdata = JSON.parse(localStorage.getItem("transfer_data"))
            if (tdata?.amount) {
                setAmtDetail(tdata?.amount)
                formik.setValues({ ...tdata?.amount })
                setExchRate(tdata?.amount?.rates)
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
                                    curr_out.map((item) => {
                                        return (
                                            <option key={item} value={item}>{item}</option>
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
                                onKeyPress={(e) => inputvalidation(e)}
                                onKeyDown={(e) => amountDown(e)}
                                maxLength={10}
                                {...formik.getFieldProps('send_amt')}
                                className={clsx(
                                    'mb-3 bg-transparent form-control rate_input',
                                    { 'is-invalid': formik.touched.send_amt && formik.errors.send_amt },
                                    {
                                        'is-valid': formik.touched.send_amt && !formik.errors.send_amt,
                                    }
                                )}
                                onBlurCapture={amountBlur}
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
                                checked={amt_detail.recieve_meth == "Bank Transfer"}
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
                        <div className="loader-overly">
                            <div className="loader" >
                            </div>
                        </div>
                    </> : ""}
                </div>
            </div>
        </form>
    );
}

export default AmountDetail