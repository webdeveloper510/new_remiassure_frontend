import React, { useEffect } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import clsx from 'clsx';
import { useState } from 'react';
import { createTransaction, exchangeRate, getPreferredCurrency, setPreferredCurrency } from '../../../utils/Api';
import { toast } from 'react-toastify';
import Bank_list from '../../../utils/Bank_list';
import { commaRemover, commaSeperator } from '../../../utils/hook';
import Select, { components } from "react-select"


const AmountDetail = ({ handleStep, step }) => {

    const [loader, setLoader] = useState(false)

    const [exch_rate, setExchRate] = React.useState('1.0998');
    const [amt_detail, setAmtDetail] = useState({
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "NGN",
        recieve_meth: "Bank Transfer",
        part_type: null,
        payout_part: ""
    })

    const curr_in = ["AUD", "NZD"]
    const curr_out = ["USD", "NGN", "GHS", "KES", "PHP", "THB", "VND"]
    const [defaultExchange, setDefaultExchange] = useState("")
    const [blur_off, setBlurOff] = useState(false)

    const amtSchema = Yup.object().shape({
        send_amt: Yup.string("Please enter a valid amount").notOneOf([".", ""]).test("value-test", (value, validationcontext) => {
            const {
                createError,
            } = validationcontext;
            if (Number(value) < 100) {
                return createError({ message: "Minimum $100 required" })
            } else {
                return true
            }
        }).required(),
        exchange_amt: Yup.string("Please enter a valid amount").notOneOf([".", ""]).required(),
        from_type: Yup.string().required(),
        to_type: Yup.string().required(),
        exchange_amt: Yup.string(),
        part_type: Yup.string().required().notOneOf([null]),
        payout_part: Yup.string().min(3).max(50).test("value-test", (value, validationcontext) => {
            const {
                createError,
                parent: {
                    part_type,
                },
            } = validationcontext;
            if (part_type === "other" && (value?.length < 3 || value === undefined || value === null || value === " ")) {
                return createError({ message: "Please enter bank name" })
            } else {
                return true
            }
        }).trim(),
    })

    const initialValues = {
        send_amt: "",
        exchange_amt: "",
        from_type: "AUD",
        to_type: "NGN",
        recieve_meth: "Bank Transfer",
        part_type: null,
        payout_part: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema: amtSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            let local = {}
            var transaction_id = localStorage.getItem("transaction_id")
            let payload = {
                transaction_id: transaction_id,
                amount: {
                    send_amount: commaRemover(values.send_amt),
                    receive_amount: commaRemover(values.exchange_amt),
                    send_currency: values.from_type,
                    receive_currency: values.to_type,
                    receive_method: "Bank transfer",
                    payout_partner: values.part_type !== "other" ? values.part_type : values.payout_part,
                    reason: "none",
                    exchange_rate: exch_rate
                }
            }
            if (transaction_id === null || transaction_id === "undefined" || transaction_id === "") {
                delete payload["transaction_id"]
            }
            createTransaction(payload).then(res => {
                if (res.code === "200") {
                    localStorage.setItem("transaction_id", res.data.transaction_id)
                    if (localStorage.getItem("transfer_data")) {
                        local = JSON.parse(localStorage.getItem("transfer_data"))
                    }
                    local.amount = { ...values, send_amt: commaRemover(values.send_amt), exchange_amt: commaRemover(values.exchange_amt), exchange_rate: exch_rate, defaultExchange: defaultExchange }
                    localStorage.setItem("transfer_data", JSON.stringify(local))
                }
            })
            if (localStorage.getItem("transfer_data")) {
                local = JSON.parse(localStorage.getItem("transfer_data"))
            }
            local.amount = { ...values, exchange_rate: exch_rate, defaultExchange: defaultExchange }

            localStorage.setItem("transfer_data", JSON.stringify(local))
            if (localStorage.getItem("send-step")) {
                localStorage.removeItem("send-step")
            }
            localStorage.setItem("send-step", Number(step) + 1)
            handleStep(Number(step) + 1)

        },
    })

    const myTotalAmount = (event, direction) => {
        event.preventDefault();
        if (event.target.value.length > 0) {
            setLoader(true)
            let value = commaRemover(event.target.value)
            exchangeRate({ amount: value, from: formik.values.from_type, to: formik.values.to_type, direction: direction })
                .then(function (response) {
                    let data = commaSeperator(response.amount)
                    if (direction === "From") {
                        formik.setFieldValue("exchange_amt", data)
                        setAmtDetail({ ...amt_detail, exchange_amt: data })
                        setDefaultExchange(response?.default_exchange)
                    } else {
                        formik.setFieldValue("send_amt", data)
                        setAmtDetail({ ...amt_detail, send_amt: data })
                    }
                    setLoader(false)
                    setExchRate(response.rate)
                    setBlurOff(true)
                })
                .catch(function (error, message) {
                    setLoader(false)
                    setBlurOff(true)
                })
        } else {
            formik.setFieldValue("exchange_amt", "")
            setAmtDetail({ ...amt_detail, exchange_amt: "" })
            setBlurOff(true)
        }
    }

    const inputvalidation = (event) => {
        var data = event.target.value;
        if (data.length > 0) {
            if (data.includes(',')) {
                let value = data.split(",")
                data = value.join("")
            }
            if (/^\d*\.?\d{0,2}$/.test(data)) {
                const [integerPart, decimalPart] = data.split('.')
                const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                if (decimalPart !== undefined) {
                    data = formattedIntegerPart + "." + decimalPart
                } else {
                    data = formattedIntegerPart
                }
                formik.setFieldValue(event.target.name, data);
                formik.setFieldTouched(event.target.name, true);
                setAmtDetail({ ...amt_detail, [event.target.name]: data });
                setBlurOff(false)
            } else {
                event.preventDefault();
            }
        } else {
            setAmtDetail({ ...amt_detail, send_amt: "", exchange_amt: "" })
            formik.setValues({ ...formik.values, send_amt: "", exchange_amt: "" })
        }
    };

    const amountDown = (e, direction) => {
        if (e.key === "Enter") {
            amountBlur(e, direction)
        }
    }
    const amountBlur = (e, direction) => {
        if (e.target.value !== "." && blur_off === false) {
            myTotalAmount(e, direction)
        }
    }

    const myTotalAmountFrom = (e) => {
        setAmtDetail({ ...amt_detail, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoader(true)
        const amt = commaRemover(formik.values.send_amt != undefined && formik.values.send_amt != 0 && formik.values.send_amt != "" ? formik.values.send_amt : "1")
        exchangeRate({ amount: amt, from: e.target.value, to: formik.values.to_type })
            .then(function (response) {
                setExchRate(response.rate)
                setDefaultExchange(response?.default_exchange)
                if (formik.values.send_amt != 0 && formik.values.send_amt != "" && formik.values.send_amt != undefined) {
                    formik.setFieldValue("exchange_amt", commaSeperator(response.amount))
                    setAmtDetail({ ...amt_detail, exchange_amt: commaSeperator(response.amount) })
                }
                setLoader(false)
                setBlurOff(true)

            })
            .catch(function (error, message) {
                setLoader(false)
                setBlurOff(true)

            })
    }

    const myTotalAmountTo = (e) => {
        setAmtDetail({ ...amt_detail, to_type: e.target.value })
        formik.setFieldValue("to_type", e.target.value)
        formik.setFieldTouched("to_type", true)
        setLoader(true)
        const amt = commaRemover(formik.values.send_amt != undefined && formik.values.send_amt != 0 && formik.values.send_amt != "" ? formik.values.send_amt : "1")

        exchangeRate({ amount: amt, from: formik.values.from_type, to: e.target.value })
            .then(function (response) {
                setExchRate(response.rate)
                setDefaultExchange(response?.default_exchange)
                if (formik.values.send_amt != 0 && formik.values.send_amt != undefined && formik.values.send_amt != "") {
                    formik.setFieldValue("exchange_amt", commaSeperator(response.amount))
                    setAmtDetail({ ...amt_detail, exchange_amt: commaSeperator(response.amount) })
                }
                setLoader(false)
                setBlurOff(true)

            })
            .catch(function (error, message) {
                setLoader(false)
                setBlurOff(true)

            })
    }
    const handleCancel = () => {
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

    const handlePayoutPart = (e, name) => {
        if (name === "services") {
            toast.warn("THIS SERVICE OPTION IS CURRENTLY UNAVAILABLE", { hideProgressBar: true, autoClose: 1000, position: "bottom-right" })
        } else {
            setAmtDetail({ ...amt_detail, part_type: e.value })
            formik.setValues({ ...formik.values, part_type: e.value, payout_part: "" })
        }
    }

    useEffect(() => {
        if (localStorage.getItem("transfer_data")) {
            let tdata = JSON.parse(localStorage.getItem("transfer_data"))
            if (tdata?.amount) {
                setAmtDetail({ ...tdata?.amount, send_amt: commaSeperator(tdata.amount.send_amt), exchange_amt: commaSeperator(tdata.amount.exchange_amt), recieve_meth: tdata?.amount?.recieve_meth || "Bank Transfer", part_type: tdata?.amount?.part_type || null })
                formik.setValues({ ...tdata?.amount, send_amt: commaSeperator(tdata.amount.send_amt), exchange_amt: commaSeperator(tdata.amount.exchange_amt), recieve_meth: tdata?.amount?.recieve_meth || "Bank Transfer", part_type: tdata?.amount?.part_type || null })
                setExchRate(tdata?.amount?.exchange_rate)
                setDefaultExchange(tdata?.amount?.defaultExchange)
            }
        }
        else {
            let data = JSON.parse(localStorage.getItem("exchange_curr"))
            setAmtDetail({ ...amt_detail, send_amt: "", exchange_amt: "", from_type: data?.from_type, to_type: data?.to_type })
            setExchRate(data?.exch_rate)
            formik.setValues({ ...formik.values, send_amt: "", exchange_amt: "", from_type: data?.from_type, to_type: data?.to_type })
            setDefaultExchange(data?.defaultExchange)
        }

    }, [])

    const customBank = (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            if (/^[A-z '-.]+$/.test(value)) {
                formik.setValues({ ...formik.values, payout_part: value })
            } else {
                e.preventDefault();
            }
        } else {
            formik.setValues({ ...formik.values, payout_part: value })
        }
    }

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: formik.errors.part_type && formik.touched.part_type ? 'red' : base.borderColor, // Change the border color when it's invalid
        }),
    };

    const Placeholder = (props) => {
        return <components.Placeholder {...props} />;
    };

    return (
        <section>
            <div class="form-head mb-4">
                <h2 class="text-black font-w600 mb-0"><b>Amount & Delivery</b>
                </h2>
            </div>
            <form noValidate autoComplete='off' className='pb-5'>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input_field rate-value">
                                    <p className="get-text Exchange_rate">Exchange Rate</p>
                                    <p className="exchange-rate exchange_value" >1 <span>{formik.values.from_type}</span> = {commaSeperator(exch_rate)} <span>{formik.values.to_type}</span> </p>
                                    {/* <input type="text" className='rate_input form-control' /> */}
                                </div>
                            </div>
                        </div>
                        <div className="row each-row">
                            <div className="col-md-6">
                                <div className="input_field">
                                    <p className="get-text">From<span style={{ color: 'red' }} >*</span></p>
                                    <select
                                        aria-label="Select a reason"
                                        onChange={(e) => { myTotalAmountFrom(e) }}
                                        value={formik.values.from_type}
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
                                        value={formik.values.to_type}
                                    >
                                        {
                                            curr_out.map((item) => {
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
                                        name="send_amt"
                                        value={formik.values?.send_amt}
                                        onKeyDown={(e) => amountDown(e, "From")}
                                        onChange={(e) => inputvalidation(e)}
                                        className={clsx(
                                            `mb-3 bg-transparent form-control rate-input ${formik.values.send_amt === "1" ? 'text-secondary lead' : ""}`,
                                            { 'is-invalid': formik.touched.send_amt && formik.errors.send_amt },
                                            {
                                                'is-valid': formik.touched.send_amt && !formik.errors.send_amt,
                                            }
                                        )}
                                        onBlurCapture={(e) => amountBlur(e, "From")}
                                        placeholder='100'
                                    />
                                    {formik.touched.send_amt && formik.errors.send_amt === "Minimum $100 required" && (
                                        <div className='fv-plugins-message-container mt-1'>
                                            <div className='fv-help-block'>
                                                <span role='alert' className="text-danger" style={{ fontSize: "13px" }}>{formik.errors.send_amt}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input_field">
                                    <p className="get-text">
                                        Exchange Amount
                                    </p>
                                    <input
                                        type="text"
                                        name="exchange_amt"
                                        value={formik.values?.exchange_amt}
                                        onKeyDown={(e) => amountDown(e, "To")}
                                        onChange={(e) => inputvalidation(e)}
                                        className={clsx(
                                            `mb-3 bg-transparent form-control rate-input ${formik.values.send_amt === "1" ? 'text-secondary lead' : ""}`,
                                            { 'is-invalid': formik.touched.exchange_amt && formik.errors.exchange_amt },
                                            {
                                                'is-valid': formik.touched.exchange_amt && !formik.errors.exchange_amt,
                                            }
                                        )}
                                        onBlurCapture={(e) => amountBlur(e, "To")}
                                        placeholder={defaultExchange !== "" && undefined ? commaSeperator(defaultExchange) : defaultExchange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row each-row">
                            <div className="col-md-6">
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
                            <div className="col-md-6">
                                <h5>Payout Partners</h5>

                                <div className="col-md-12">

                                    <label className="container-new">
                                        <span className="radio-tick">Services</span>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="payOutPartner"
                                            checked={amt_detail.part_type == "Services"}
                                            value="Services"
                                            onChange={(e) => { handlePayoutPart(e, "services") }}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="col-md-12">
                                    <Select
                                        options={Bank_list}
                                        onChange={handlePayoutPart}
                                        value={formik.values.part_type !== null ? { label: formik.values.part_type, value: formik.values.part_type } : ""}
                                        name='part_type'
                                        styles={customStyles}
                                        components={{ Placeholder }}
                                        placeholder="Select a bank...."

                                        className='payout_part'
                                    />
                                    {/* <select
                                        className={clsx(
                                            'bg-transparent payout_select form-select form-control rate_input',
                                            { 'is-invalid': formik.touched.part_type && formik.errors.part_type }
                                        )}
                                        value={formik.values.part_type}
                                        onChange={(e) => { handlePayoutPart(e) }}
                                    >
                                        <option value="none"></option>
                                        {
                                            Bank_list?.map((item, key) => (
                                                <option key={key} value={item}>{item}</option>
                                            ))
                                        }
                                        <option value="other">Other</option>
                                    </select> */}

                                </div>
                                <div className='col-md-12'>
                                    {
                                        formik.values.part_type === "other" ? (
                                            <input
                                                type="text"
                                                name="payout_part"
                                                value={formik.values?.payout_part}
                                                placeholder='Enter the bank name'
                                                onChange={(e) => customBank(e)}
                                                maxLength={50}
                                                className={clsx(
                                                    'my-3 bg-transparent form-control rate_input',
                                                    { 'is-invalid': formik.touched.payout_part && formik.errors.payout_part },
                                                    {
                                                        'is-valid': formik.touched.payout_part && !formik.errors.payout_part,
                                                    }
                                                )}
                                            />
                                        ) : <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button
                                    type='button'
                                    className="start-form-button full-col"
                                    onClick={() => handleCancel()}
                                >Cancel</button>
                            </div>
                            <div className="col-md-8 full-col">
                                <button
                                    type="button"
                                    onClick={() => formik.handleSubmit()}
                                    className="form-button full-col"
                                >
                                    Continue
                                    {loader ? <>
                                        <div className="loader-overly">
                                            <div className="loader" >
                                            </div>
                                        </div>
                                    </> : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form >

        </section >
    );
}

export default AmountDetail