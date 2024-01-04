import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import clsx from "clsx";
import { useRef } from "react";
import { exchangeRate, getPreferredCurrency } from "../../utils/Api";
import { commaRemover, commaSeperator, generateRandomKey } from "../../utils/hook";
import QRCode from "react-qr-code";
import Scrollbar from '../countriesSlider/Scrollbar';
import Scrollbar1 from '../scrollbar/Scrollbar';
import Blogs from '../blogs/Blogs';
import RemitAssure from "../WhyRemitAssure/RemitAssure";
import FreeTransctions from "../FreeTransactionsAcoordians/FreeTransactions";
import Partners from "../Partners/Partners";
function HowRenderingArrayOfObjects() {
    const dataItems = [
        {
            id: 1,
            src: "assets/img/home/add-user.png",
            circle_heading: "Create a RemitAssure account",
            circle_content: "Provide some personal information and sign up online or via the RemitAssure app.",
        },
        {
            id: 2,
            src: "assets/img/home/user.png",
            circle_heading: "Verify your Identity",
            circle_content: "We verify your identity as part of our AML/CTF obligation. Verifying your identity also helps safeguard your account against potential fraudulent activities.",
        },
        {
            id: 3,
            src: "assets/img/home/transaction.png",
            circle_heading: "Enter your transaction details",
            circle_content: "Provide some personal information and sign up online or via the RemitAssure app.",
        },
        {
            id: 4,
            src: "assets/img/zai/transfer1.png",
            circle_heading: "Pay for your transaction",
            circle_content: "We offer different payment rails for our customers. You can pay through: PayID , PayTo Agreements."

        }
    ];

    const circlItems = dataItems.map((value) => {
        return (
            <li className="" key={value.id}>
                <div className="circle-image">
                    <img src={value.src} alt="circle-image" />
                </div>
                <div className="circle-content">
                    <p className="fast_text">{value.circle_heading}</p>
                    <p className="fast_texto1">{value.circle_content}</p>
                </div>
            </li>
        )

    })
    return (
        <div>
            {circlItems}
        </div>
    )
}


const Home = () => {
    const backgroundImageUrl = 'assets/img/home/top-banner (1).webp';
    const backgroundImageUrlmobile = 'assets/img/home/home-page-mobil.webp';
    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: '94% 100%', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        /* Additional background styles can be added here */
    };


    const containerStylemobile = {
        backgroundImage: `url(${backgroundImageUrlmobile})`,
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        /* Additional background styles can be added here */
    };


    const currency_ref = useRef()
    const token = localStorage.getItem("token");
    const [defaultExchange, setDefaultExchange] = useState("")
    const userdt = JSON.parse(localStorage.getItem("remi-user-dt"))
    const items = [
        {
            heading: "Best on the market 1.",
            paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }, {
            heading: "Best on the market 2.",
            paragraph: 'B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }, {
            heading: "Best on the market 3.",
            paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }, {
            heading: "Best on the market 4.",
            paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }, {
            heading: "Best on the market 5.",
            paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }, {
            heading: "Best on the market 6.",
            paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
        }
    ];

    const [carouselItems, setCarouselItems] = useState(items);
    const [currency, setCurrency] = useState(null)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])

    const amountSchema = Yup.object().shape({
        send_amt: Yup.string("Please enter a valid amount").notOneOf(["."]).test("value-test", (value, validationcontext) => {
            const {
                createError,
            } = validationcontext;
            if (Number(value) < 100 && value !== "") {
                return createError({ message: "Minimum $100 required" })
            } else {
                return true
            }
        }),
        exchange_amt: Yup.string("Please enter a valid amount").notOneOf(["."])
    })

    const initialValues = {
        send_amt: '',
        exchange_amt: '',
        from_type: "AUD",
        to_type: "NGN",
        recieve_meth: "Bank Transfer"
    }

    const [loading, setLoading] = useState(false);
    const [total_rates, setTotal_rates] = useState('');
    const navigate = useNavigate();

    const curr_out = ["USD", "NGN", "GHS", "KES", "PHP", "THB", "VND"]

    const [blur_off, setBlurOff] = useState(true)


    const formik = useFormik({
        initialValues,
        validationSchema: amountSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            let object = {
                send_amt: commaRemover(values.send_amt),
                exchange_amt: commaRemover(values.exchange_amt),
                from_type: values.from_type,
                to_type: values.to_type,
                recieve_meth: values.recieve_meth,
                payout_part: "none",
                exchange_rate: "",
            }
            if (blur_off === false) {
                setLoading(true)

                exchangeRate({ amount: object.send_amt, from: object.from_type, to: object.to_type, paymentMethod: object.recieve_meth, direction: "from" }).then((res) => {
                    setLoading(false)
                    if (localStorage.getItem("transfer_data")) {
                        localStorage.removeItem("transfer_data")
                    }
                    localStorage.setItem("transfer_data", JSON.stringify({
                        amount: {
                            send_amt: commaRemover(object.send_amt),
                            exchange_amt: object.send_amt !== "" ? commaRemover(res?.amount) : "",
                            from_type: object.from_type,
                            to_type: object.to_type,
                            recieve_meth: object.recieve_meth,
                            payout_part: "none",
                            exchange_rate: object.send_amt !== "" ? res?.rate : total_rates,
                            defaultExchange: object.send_amt !== "" ? res?.default_exchange : defaultExchange
                        }
                    }))
                    localStorage.setItem("conversion_data", JSON.stringify({
                        amount: {
                            send_amt: commaRemover(object.send_amt),
                            exchange_amt: object.send_amt !== "" ? commaRemover(res?.amount) : "",
                            from_type: object.from_type,
                            to_type: object.to_type,
                            recieve_meth: object.recieve_meth,
                            payout_part: "none",
                            exchange_rate: object.send_amt !== "" ? res?.rate : total_rates,
                            defaultExchange: object.send_amt !== "" ? res?.default_exchange : defaultExchange
                        }
                    }))
                    if (token) {
                        if (userdt?.digital_id_verified) {

                            navigate(`/user-send-money`)
                        } else {
                            navigate("/send-money")
                        }
                    } else {
                        navigate("/login")
                    }

                }).catch((error) => {
                    if (error.response.data.code == "400") {
                        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                    setLoading(false)
                })
            } else {
                if (localStorage.getItem("transfer_data")) {
                    localStorage.removeItem("transfer_data")
                }
                localStorage.setItem("transfer_data", JSON.stringify({
                    amount: {
                        send_amt: object.send_amt,
                        exchange_amt: object?.exchange_amt,
                        from_type: object.from_type,
                        to_type: object.to_type,
                        recieve_meth: object.recieve_meth,
                        payout_part: "none",
                        exchange_rate: total_rates,
                        defaultExchange: defaultExchange
                    }
                }))
                localStorage.setItem("conversion_data", JSON.stringify({
                    amount: {
                        send_amt: object.send_amt,
                        exchange_amt: object?.exchange_amt,
                        from_type: object.from_type,
                        to_type: object.to_type,
                        recieve_meth: object.recieve_meth,
                        payout_part: "none",
                        exchange_rate: total_rates,
                        defaultExchange: defaultExchange
                    }
                }))
                if (token) {
                    if (userdt?.digital_id_verified) {

                        navigate(`/user-send-money`)
                    } else {
                        navigate("/send-money")
                    }
                } else {
                    navigate("/login")
                }
            }

        }
    })

    useEffect(() => {
        if (localStorage.getItem("conversion_data") && reset === false) {
            const tdata = JSON.parse(localStorage.getItem("conversion_data"))
            formik.setValues({ send_amt: commaSeperator(tdata?.amount?.send_amt), from_type: tdata?.amount?.from_type, to_type: tdata?.amount?.to_type, recieve_meth: tdata?.amount?.recieve_meth, exchange_amt: commaSeperator(tdata?.amount?.exchange_amt) })
            setTotal_rates(tdata?.amount?.exchange_rate)
            setDefaultExchange(tdata?.amount?.defaultExchange)
            let obj = { send_amt: tdata?.amount?.send_amt, from_type: tdata?.amount?.from_type, to_type: tdata?.amount?.to_type, exchange_amt: tdata?.amount?.exchange_amt, exch_rate: tdata?.amount?.exchange_rate, defaultExchange: tdata?.amount?.defaultExchange }
            localStorage.setItem("exchange_curr", JSON.stringify(obj))
        } else {
            let login = localStorage.getItem("token")
            setReset(false)
            if (login) {
                getPreferredCurrency().then(res => {
                    if (res.code === "200") {
                        if (res.data.source_currency !== null && res.data.source_currency !== "null") {
                            let types = res.data
                            exchangeRate({ amount: "100", from: types.source_currency, to: types.destination_currency, direction: "from" }).then(res => {
                                setTotal_rates(res.rate)
                                setDefaultExchange(res?.default_exchange)
                                localStorage.removeItem("exchange_curr")
                                formik.setValues({ send_amt: "", exchange_amt: "", from_type: types.source_currency, to_type: types.destination_currency })
                                let obj = { send_amt: "100", from_type: types.source_currency, to_type: types.destination_currency, exchange_amt: res.amount, exch_rate: res.rate, defaultExchange: res.default_exchange }
                                localStorage.setItem("exchange_curr", JSON.stringify(obj))
                            })
                        } else {
                            exchangeRate({ amount: "100", from: "AUD", to: "NGN", direction: "from" }).then(res => {
                                setTotal_rates(res.rate)
                                setDefaultExchange(res?.default_exchange)
                                localStorage.removeItem("exchange_curr")
                                formik.setValues({ send_amt: "", exchange_amt: "", from_type: "AUD", to_type: "NGN" })
                                let obj = { send_amt: "100", from_type: "AUD", to_type: "NGN", exchange_amt: res.amount, exch_rate: res.rate, defaultExchange: res.default_exchange }
                                localStorage.setItem("exchange_curr", JSON.stringify(obj))
                            })
                        }
                    }
                })
            } else {
                exchangeRate({ amount: "100", from: "AUD", to: "NGN", direction: "from" }).then(res => {
                    setTotal_rates(res.rate)
                    setDefaultExchange(res.default_exchange)
                    localStorage.removeItem("exchange_curr")
                    formik.setValues({ send_amt: "", exchange_amt: "", from_type: "AUD", to_type: "NGN" })
                    let obj = { send_amt: "100", from_type: "AUD", to_type: "NGN", exchange_amt: res.amount, exch_rate: res.rate, defaultExchange: res?.default_exchange }
                    localStorage.setItem("exchange_curr", JSON.stringify(obj))
                })
            }
        }
    }, [reset])

    useEffect(() => {
        if (currency !== null) {
            setLoading(true);
            currency_ref.current.focus()
            exchangeRate({ amount: formik.values.send_amt !== "" ? formik.values.send_amt : "100", from: formik.values.from_type, to: currency, direction: "from" })
                .then((res) => {
                    formik.setValues({ ...formik.values, exchange_amt: formik.values.send_amt !== "" ? res.amount : "", send_amt: formik.values.send_amt !== "" ? formik.values.send_amt : "", to_type: currency })
                    setTotal_rates(res.rate)
                    setDefaultExchange(res?.default_exchange)
                    setLoading(false)
                    setCurrency(null)
                }).catch((error) => {
                    if (error.response.data.code == "400") {
                        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                    setLoading(false)
                })
        }
    }, [currency])

    const myExchangeTotalAmount = (event, direction) => {
        event.preventDefault();
        let value = event.target.value.toString()
        if (value.length > 0) {
            setLoading(true);

            exchangeRate({ amount: commaRemover(value), from: formik.values.from_type, to: formik.values.to_type, paymentMethod: formik.values.recieve_meth, direction: direction })
                .then((res) => {
                    let data = commaSeperator(res?.amount)
                    if (direction === "From") {
                        formik.setFieldValue("exchange_amt", data)
                        setDefaultExchange(res?.default_exchange)
                    } else {
                        formik.setFieldValue("send_amt", data)
                    }
                    setTotal_rates(res.rate)
                    setLoading(false)
                    setBlurOff(true)
                }).catch((error) => {
                    if (error.response.data.code == "400") {
                        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                    setBlurOff(true)
                    setLoading(false)
                })
        } else {
            formik.setValues({ ...formik.values, exchange_amt: "" })
            localStorage.removeItem("conversion_data")
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
                formik.setFieldValue(event.target.name, data)
                formik.setFieldTouched(event.target.name, true)
                setBlurOff(false)
            } else {
                event.preventDefault()
            }
        } else {
            formik.setValues({ ...formik.values, send_amt: "", exchange_amt: "" })
        }
    };

    const myTotalAmountFrom = (e) => {
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoading(true)
        let amt = commaRemover(formik.values.send_amt !== '' ? formik.values.send_amt : "100")
        exchangeRate({ amount: amt, from: e.target.value, to: formik.values.to_type, direction: "from" })
            .then(function (response) {
                setTotal_rates(response.rate)
                setDefaultExchange(response?.default_exchange)
                if (formik.values.send_amt != 0 || "") {
                    let data = commaSeperator(response.amount)
                    formik.setFieldValue("exchange_amt", data)
                    setBlurOff(true)
                }
                setLoading(false)
            })
            .catch(function (error, message) {
                setLoading(false)
                setBlurOff(true)

            })
    }



    const myTotalAmountTo = (e) => {
        formik.setFieldValue("to_type", e.target.value)
        formik.setFieldTouched("to_type", true)
        setLoading(true)
        let amt = commaRemover(formik.values.send_amt !== '' ? formik.values.send_amt : "100")
        exchangeRate({ amount: amt, from: formik.values.from_type, to: e.target.value, direction: "from" })
            .then(function (response) {
                setTotal_rates(response.rate)
                setDefaultExchange(response?.default_exchange)
                if (formik.values.send_amt != "" || 0) {
                    let data = commaSeperator(response?.amount)
                    formik.setFieldValue("exchange_amt", data)
                    setBlurOff(true)

                }
                setLoading(false)
            })
            .catch(function (error, message) {
                setLoading(false)
                setBlurOff(true)

            })
    }

    const amountDown = (e, direction) => {
        if ((e.key === "Enter")) {
            amountBlur(e, direction)
        }
    }

    const amountBlur = (e, direction) => {
        if (e.target.value !== "." && blur_off === false) {
            myExchangeTotalAmount(e, direction)
        }
    }

    const exchangeRateClick = () => {
        const targetSectionId = "pay-box";
        const targetElement = document.getElementById(targetSectionId);
        console.log("trannnnn", targetElement)
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    const handleReset = () => {
        setReset(true)
        // exchangeRate({ amount: "1", from: "AUD" })
        // formik.resetForm({ send_amt: "", exchange_amt: "", from_type: "AUD", to_type: "NGN", recieve_meth: "Bank Transfer" })
    }

    return (
        <>
            <section className="top_sections desktop_only" style={containerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 banner-content">

                            <h1 className="vl-heading">Simple Way <br></br>To <span>Transfer</span> Your <br></br>Money
                            </h1>

                            <div className="vl-content">
                                <p className="vl-paragraph">
                                    We have re-imagined international money transfer to provide reliable, efficient andcost effective services to our customers.
                                </p>
                            </div>
                            <ul className="hero-btn" id="pa">
                                <li>
                                    <Link to={"/send-money"} className="Get-start">
                                        Get <b>Started</b> <img src="assets/img/home/Union.svg" />
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={() => exchangeRateClick()} style={{ cursor: "pointer" }} className="exchangebtn" >
                                        Exchange <b>rate</b> <img src="assets/img/home/Black.png" className="hover-none" />
                                        <img src="assets/img/home/pink.svg" className="hover-img" />
                                    </a>
                                </li>
                            </ul>
                            <div className="playstoreicon-section">
                                <div className="col-md-3">
                                    <ul className="playstoreicon">
                                        <li>
                                            <a href="https://apps.apple.com/us/app/remitassure/id6451420844" target="_blank">
                                                <img src="assets/img/home/apple.svg" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://play.google.com/store/apps/details?id=com.remitAssure&pli=1" target="_blank">
                                                <img src="assets/img/home/google.svg" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-8">
                                    <p><b>Download our App</b></p>
                                    <span>Over <b>26,000+ Clients</b> all over the world</span>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 right_sections">
                            <img src="assets/img/home/phone.webp" alt="background-images" />
                        </div>
                    </div>


                </div>
            </section>
            <div className="extra-padding">
                <section className="top_sections mobile-top mobile-only" style={containerStylemobile}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 banner-content">

                                <h1 className="vl-heading">Simple Way <br></br>To <span>Transfer</span> Your <br></br>Money
                                </h1>

                                <div className="vl-content">
                                    <p className="vl-paragraph">
                                        We have re-imagined international money transfer to provide reliable, efficient andcost effective services to our customers.
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 right_sections">
                                        <img src="assets/img/home/phone.svg" alt="background-images" />
                                    </div>
                                    <div className="col-md-4 libuttons">
                                        <ul class="playstoreicon"><li><a href="https://apps.apple.com/us/app/remitassure/id6451420844"><img src="assets/img/home/apple.svg" /></a></li><li><a href="https://play.google.com/store/apps/details?id=com.remitAssure&pli=1"><img src="assets/img/home/google.svg" /></a></li></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="get-started">
                <li>
                    <Link to={"/send-money"} className="Get-start mobile-btn">
                        Get <b>Started</b> <img src="assets/img/home/Union.svg" />
                    </Link>
                </li>
            </div>

            <div className="" id="pay-box">

            </div>
            <section class="payment-box" id="payment-box">

                <div class="container">
                    <div className="money-exchange-box" id="home-section">
                        <div className="row">

                            <div className="col-md-4">
                                <h6 className="exchange-heading">Exchange <br></br>Rate<span className="calculation">1 {formik.values.from_type} = {commaSeperator(total_rates)} {formik.values.to_type}</span></h6>

                            </div>
                            <div className="col-md-8">
                                <div className="new_card">
                                    <div className="card-body">

                                        <form onSubmit={formik.handleSubmit} noValidate>
                                            <div className="row mb-2 " style={{ alignItems: 'normal' }}>

                                                <div className="col-md-6">
                                                    <p className="send-text">You Send<span style={{ color: 'red' }} >*</span></p>
                                                    <div className="inline select-currency">
                                                        <Form.Control
                                                            name="send_amt"
                                                            type="text"
                                                            autoComplete='off'
                                                            ref={currency_ref}
                                                            value={formik.values.send_amt}
                                                            onChange={(e) => inputvalidation(e)}
                                                            onKeyDown={e => amountDown(e, "From")}
                                                            className={clsx(
                                                                `mb-3 bg-transparent form-control`,
                                                                { 'is-invalid': formik.touched.send_amt && formik.errors.send_amt },
                                                                {
                                                                    'is-valid': formik.touched.send_amt && !formik.errors.send_amt,
                                                                }
                                                            )}
                                                            placeholder={"100"}
                                                            onBlur={(e) => amountBlur(e, "From")}

                                                        />

                                                        <select
                                                            className="form-select mb-3 home-select-method"
                                                            aria-label="Select a reason"
                                                            value={formik.values.from_type}
                                                            onChange={(e) => { myTotalAmountFrom(e) }}
                                                        >
                                                            <option value="AUD">AUD</option>
                                                            <option value="NZD">NZD</option>
                                                        </select>

                                                    </div>
                                                    {formik.touched.send_amt && formik.errors.send_amt === "Minimum $100 required" && (
                                                        <div className='fv-plugins-message-container mt-1 home-error'>
                                                            <div className='fv-help-block'>
                                                                <span role='alert' className="text-danger">{formik.errors.send_amt}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-md-6 desktop_only-767">
                                                    <p className="send-text">Receive Method</p>
                                                    <select
                                                        {...formik.getFieldProps('recieve_meth')}
                                                        className='form-select rate_input form-control mb-3 home-select-method bg-transparent'
                                                        aria-label="Select a reason">
                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                        <option value="Mobile Wallet">Mobile Wallet</option>
                                                    </select>
                                                </div>


                                            </div>
                                            <div className="row mb-2 " style={{ alignItems: 'normal' }}>

                                                <div className="col-md-6 widh-mobile">
                                                    <p className="send-text">They Get<span style={{ color: 'red' }} >*</span></p>
                                                    <div className="inline select-currency">
                                                        <Form.Control
                                                            name="exchange_amt"
                                                            type="text"
                                                            autoComplete='off'
                                                            value={formik.values.exchange_amt}
                                                            onChange={(e) => inputvalidation(e)}
                                                            onKeyDown={e => amountDown(e, "To")}
                                                            className={clsx(
                                                                `mb-3 bg-transparent form-control`,
                                                                { 'is-invalid': formik.touched.exchange_amt && formik.errors.exchange_amt },
                                                                {
                                                                    'is-valid': formik.touched.exchange_amt && !formik.errors.exchange_amt,
                                                                }
                                                            )}
                                                            placeholder={defaultExchange !== "" && undefined ? commaSeperator(defaultExchange) : defaultExchange}
                                                            onBlur={(e) => amountBlur(e, "To")}

                                                        />
                                                        <select
                                                            className="form-select form-control mb-3 home-select-method"
                                                            aria-label="Select a reason"
                                                            value={formik.values.to_type}
                                                            onChange={(e) => { myTotalAmountTo(e) }}
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

                                                <div className="col-md-6 mobile_only-767">
                                                    <p className="send-text">Receive Method</p>
                                                    <select
                                                        {...formik.getFieldProps('recieve_meth')}
                                                        className='form-select rate_input form-control mb-3 home-select-method bg-transparent'
                                                        aria-label="Select a reason">
                                                        <option value="Bank Transfer">Bank Transfer</option>
                                                        <option value="Mobile Wallet">Mobile Wallet</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 flexx">
                                                    <button
                                                        type="submit"
                                                        className="btn btn continue-button mobile-only"
                                                    >
                                                        Continue
                                                        {loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >
                                                                </div>
                                                            </div>
                                                        </> : <></>}
                                                        <img src="assets/img/home/Black1.png" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn reset-button"
                                                        onClick={() => handleReset()}
                                                    >
                                                        Reset
                                                        {loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >
                                                                </div>
                                                            </div>
                                                        </> : <></>}
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn continue-button desktop_only"
                                                    >
                                                        Continue
                                                        {loading ? <>
                                                            <div className="loader-overly">
                                                                <div className="loader" >
                                                                </div>
                                                            </div>
                                                        </> : <></>}
                                                        <img src="assets/img/home/Black1.png" />
                                                    </button>


                                                </div>


                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </section>
            <section>
                <div className="partners-section">
                    <div className="">
                        <h1 className="vl-heading">Our Partners</h1>
                        <p>Our money transfer service collaborates with reputable banks, payment networks, and financial <br></br> institutions to provide safe and easy transactions.</p>

                        <Partners></Partners>
                        {/* 
                   <div className="col-md-2">
                    <img src="assets/img/home/image1.png" alt="partner-images" />
                    </div>
                    <div className="col-md-2">
                    <img src="assets/img/home/image22.png" alt="partner-images" />
                    </div>
                    <div className="col-md-2">
                    <img src="assets/img/home/image2.png" alt="partner-images" />
                    </div>
                    <div className="col-md-2">
                    <img src="assets/img/home/image3.png" alt="partner-images" />
                    </div>
                    <div className="col-md-2">
                    <img src="assets/img/home/image4.png" alt="partner-images" />
                    </div>
                    <div className="col-md-2">
                    <img src="assets/img/home/image5.png" alt="partner-images" />
                    </div>
                   */}
                    </div>

                </div>

            </section>



            <RemitAssure></RemitAssure>

            {/* <section className="why-us section-bgba banner_section05" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="vl03">
                                        <h1 className="chose-heading">A wide choice of ways</h1>
                                        <h1 className="chose-heading01">to send money online</h1>
                                    </div>
                                    <div className="chose-content">
                                        <p className="chose-paragraph02">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Facilisi morbi tempus iaculis urna. Amet tellus cras adipiscing
                                            enim. In arcu cursus euismod quis viverra nibh cras pulvinar mattis.
                                            Volutpat diam ut venenatis tellus in. Rhoncus aenean vel elit scelerisque.
                                            Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Id faucibus nisl
                                            tincidunt eget nullam. Sed viverra tellus in hac habitasse platea dictumst.
                                            Ornare arcu odio ut sem nulla. Lectus mauris ultrices eros in cursus turpis
                                            massa. Sed nisi lacus sed viverra. Integer vitae justo eget magna.
                                            Sed vulputate mi sit amet. Nam aliquam sem et tortor consequat id porta.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="row">
                                        <ul className="bank_transfer custom-list">
                                            < BankTransferArrayOfObjects />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="testimonial-section">
                        <div className="col-lg-12">
                            <h3 className="customers-heading">What customers say about us</h3>
                            <p className="customers-paragraph">We do our best to provide you the best experience ever</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Scrollbar />
                        </div>
                    </div>
                </div>
            </section> */}
            <section>
                <section className="why-us section-bgba banner_section01" >
                    <div className="container">
                        <div className="row">


                            <div className="col-lg-12">

                                <h1 className="money-heading">Our Global Payment Network Enables<br></br> Seamless Fund Transfers</h1>

                                <div className="popular-content">
                                    <h4 className="popular-paragraph01">Our most popular payout corridors

                                    </h4>
                                </div>
                            </div>


                        </div>

                    </div>
                    <Scrollbar handler={(value) => setCurrency(value)} />
                </section >
            </section >

            <section className="why-us section-bgba innre_about hows-work-section ">
                <div id="about">
                    <div className="container">
                        <div className="row1">

                            <h1 className="head-new">How it Works</h1>
                            <div className="vl-content">
                                <p className="vl-paragraph padding-top-0">
                                    We assist you in a simple way, how you can transfer your money internationally with Remit Assure.

                                </p>
                            </div>

                            {/* <div className="vl-content">
                                    <ul className="list-">
                                        < HowRenderingArrayOfObjects />
                                    </ul>
                                </div> */}

                            <div class="row">

                                <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                    <div className="mobile-steps">
                                        Step <b className="">1</b>
                                    </div>
                                    <div className="timeline-step step1bg">
                                        <div className="timeline-contents" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">

                                            <div className="inner-circle1"><label>Step <b>1</b></label><img src="assets/img/home/dot1.png" /></div>
                                            <img className="how-works-icons" src="assets/img/home/howicon1.svg" />
                                            <p className="h6 mt-3 mb-1">Create a RemitAssure<br></br> account</p>
                                            <p className="h6  mb-0 mb-lg-0">Provide some personal information and sign up online or via the RemitAssure app.</p>
                                        </div>
                                    </div>
                                    <div className="mobile-steps">
                                        Step <b className="">2</b>
                                    </div>
                                    <div className="timeline-step">
                                        <div className="timeline-contents" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">

                                            <div className="inner-circle1"><label>Step <b>2</b></label><img src="assets/img/home/dot1.png" /></div>
                                            <img className="how-works-icons" src="assets/img/home/howicon2.svg" />
                                            <p className="h6 mt-3 mb-1">Verify your <br></br>Identity</p>
                                            <p className="h6  mb-0 mb-lg-0">We verify your identity as part of our AML/CTF obligation. Verifying your identity also helps  safeguard your account against potential fraudulent activities.</p>
                                        </div>
                                    </div>
                                    <div className="mobile-steps">
                                        Step <b className="">3</b>
                                    </div>
                                    <div className="timeline-step step3bg">
                                        <div className="timeline-contents" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2005">

                                            <div className="inner-circle1"><label>Step <b>3</b></label><img src="assets/img/home/dot1.png" /></div>
                                            <img className="how-works-icons" src="assets/img/home/howicon3.svg" />
                                            <p className="h6 mt-3 mb-1">Enter your <br></br>transaction details</p>
                                            <p className="h6  mb-0 mb-lg-0">Provide some personal information and sign up online or via the RemitAssure app.</p>
                                        </div>
                                    </div>
                                    <div className="mobile-steps">
                                        Step <b className="">4</b>
                                    </div>
                                    <div className="timeline-step">
                                        <div className="timeline-contents" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2010">

                                            <div className="inner-circle1"><label>Step <b>4</b></label><img src="assets/img/home/dot1.png" /></div>
                                            <img className="how-works-icons" src="assets/img/home/howicon4.svg" />
                                            <p className="h6 mt-3 mb-1">Pay for your<br></br> transaction</p>
                                            <p className="h6 mb-0 mb-lg-0">We offer different payment rails for our customers. You can pay through: PayID , PayTo Agreements.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-8">

                                </div>
                                <div className="col-md-4">

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <!-- ======= AboutUs Our vission and mission-Section  End======= --> */}



            <section className="why-us_section homepage-why-us hows-section Enjoy-Free">
                <div className="container1">


                    <div className="  free-transaction">
                        <div className="col-lg-7  col-sm-7 text-end">
                            <div className="images-1 images-1 col-md-8 marauto">
                                <div className="image1">
                                    <img src="assets/img/home/free1.webp" alt="background-images" />
                                </div>
                                <div className="contant-img">
                                    <div className="icon-img">
                                        <img src="assets/img/home/blueicon.png" />
                                    </div>

                                    <h4 className="content-heading">
                                        Weekend
                                        Gateway
                                    </h4>
                                    <p>For our weekend trip</p>
                                    <p className="number">
                                        + $11.95
                                    </p>
                                </div>

                            </div>
                            <div className="padding-v">
                                <div class="row">
                                    <div class="col-lg-8 col-sm-8 margintop">
                                        <div className="images-1 ">
                                            <div className="image1">
                                                <img src="assets/img/home/img2.webp" alt="background-images" class="dd" />
                                            </div>
                                            <div className="contant-img right-aligned">
                                                <div className="icon-img pink">
                                                    <img src="assets/img/home/pinkicon.png" />
                                                </div>

                                                <h4 className="content-heading">
                                                    Trainers Cashback
                                                </h4>
                                                <p>For our weekend trip</p>
                                                <p className="number">
                                                    + $11.95
                                                </p>
                                            </div>



                                        </div>


                                    </div>

                                    <div class="col-lg-4 col-sm-4 margintop">
                                        <div className="images-1 ">
                                            <div className="image1">
                                                <img src="assets/img/home/women.webp" alt="background-images" class="dd" />
                                            </div>
                                            <div className="bottom-aligend">
                                                <div className="iconandcon">
                                                    <div className="icon-img skyicon">
                                                        <img src="assets/img/home/skyicon.png" />

                                                    </div>
                                                    <h4 className="content-heading">
                                                        Trainers Cashback
                                                    </h4>
                                                </div>

                                                <p>Well Deserved</p>
                                                <p className="number">
                                                    + $11.95
                                                </p>
                                            </div>



                                        </div>


                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-5 padding-right-box">
                            <div className="vl about_v1">
                                <h1 className="vl-heading left-align">Enjoy Free <br></br> Transactions with Us!</h1>
                            </div>
                            <div className="vl-content">
                                <p>Experience the freedom of seamless money transfers with RemitAssure, where every transaction comes with the added benefit of enjoying free transfers, making your financial transactions hassle-free and cost-effective!
                                </p>

                                <div class="bottom-content border-none">
                                    <div className="free-acc">
                                        <FreeTransctions />
                                    </div>

                                </div>



                            </div>
                        </div>


                    </div>

                    <div className="">
                        {/* <div className="col-lg-6 text-start">
                            <img src="assets/img/footer/trans5.png" alt="background-images" />
                        </div>
                        <div className="col-lg-6">
                            <div className="vl about_v1">
                                <h1 className="vl-heading">Pay for your transaction</h1>
                            </div>
                            <div className="vl-content">
                                <p>We offer different payment rails for our customers. You can pay through:</p>
                                <ul>
                                    <li><img src="assets/img/zai/payid_light.svg" alt="background-images" /><p>PayID</p></li>
                                    <li><img src="assets/img/zai/payto_light.svg" alt="background-images" /><p>PayTo</p></li>
                                </ul>
                                <p>All options are real-time so you can rest assured that your funds will be sent once payment is received for your transfer. </p>
                            </div>
                        </div> */}


                    </div>



                </div>
            </section>


            <section className="why-us_section homepage-why-us hows-section Download-P">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-md-6 heading-div">
                            <div className="vl about_v1">
                                <h1 className="vl-heading left-align">Download Our App</h1>
                            </div>
                            <p className="text-bottom">Download our app for quick and convenient transactions allowing you to send money securely, track transfers effortlessly, and enjoy a seamless financial journey on the go.
                            </p>
                            <div class="col-md-12 mobile-only ">
                                <div class="leftt-img">
                                    <img src="assets/img/home/Download-our-App 1.webp" />

                                </div>
                            </div>
                            <div class="row margintop-40">
                                <div class="col-md-6 col-sm-6 sc-div">
                                    <div class="scaner-code">
                                        {/* <img src="assets/img/home/scaner.png" /> */}
                                        <div style={{
                                            height: "auto", margin: "0 auto", width: "40%", padding: '7px',
                                            margin: "10px auto",
                                            background: 'white',
                                        }}>
                                            < QRCode
                                                size={256}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={"https://play.google.com/store/apps/details?id=com.remitAssure&pli=1"}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-sm-6  dwonload-btn">
                                    <div className="buttonsdownload">

                                        <div className="f my-0">
                                            <div className="col-md-12">
                                                <a href="https://play.google.com/store/apps/details?id=com.remitAssure&pli=1" target="_blank"> <img src="assets/img/home/playstore.svg" alt="home_icons" className="" /></a>
                                            </div>
                                            <div className="col-md-12">
                                                <a href="https://apps.apple.com/us/app/remitassure/id6451420844" target="_blank">  <img src="assets/img/home/appstore.svg" alt="home_icons" className="" /></a>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6  desktop_only">
                            <div class="leftt-img">
                                <img src="assets/img/home/Download-our-App 1.webp" />

                            </div>
                        </div>
                    </div>

                    <div className="contact-section">
                        <div className="row1 align-center">
                            <div className="rel-pos row">
                                <div className="col-md-8">
                                    <div className="vl about_v1">
                                        <h1 className="vl-heading left-align">We Are Here To Help!</h1>
                                    </div>
                                    <p>Do you need assistance? Our dedicated support centre is purpose-built to support you.</p>
                                </div>
                                <div className="col-md-4">
                                    <div className="btn-contact"><a href="tel:1300284228" target="_blank" className="skybtn">Contact</a></div>
                                    <div className="btn-contact "><a href="https://api.whatsapp.com/send?phone=1300284228&text=" target="_blank" className="appbtn">WhatsApp</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="why-us_section homepage-why-us hows-section-light">
                <div className="container">

                    <div className="row custom-row-hows">
                        <div className="col-lg-6 text-start">
                            <img src="assets/img/footer/trans4.png" alt="background-images" />
                        </div>
                        <div className="col-lg-6">
                            <div className="vl about_v1">
                                <h1 className="vl-heading">Track the status of your transfer</h1>
                            </div>
                            <div className="vl-content">
                                <p>We notify you at each stage of your transfer through email and SMS. The main stages are:</p>
                                <ul>
                                    <li><img src="assets/img/zai/arrows.png" alt="background-images" /><p>Creation of a Transfer</p></li>
                                    <li><img src="assets/img/zai/transfer.png" alt="background-images" /><p>Receipt of Funds</p></li>
                                    <li><img src="assets/img/zai/transfer1.png" alt="background-images" /><p>Transfer Processed</p></li>
                                    <li><img src="assets/img/zai/account.png" alt="background-images" /><p>Transfer Paid out to Beneficiary</p> </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </section> */}

            {/*testtimonial section */}
            <section className="why-us_section homepage-why-us hows-section1 test-P">
                <div className="container">
                    <h1 class="head-new">Testimonials</h1>
                    <div class="vl-content"><p class="vl-paragraph">
                        We do our best to provide you the best experience ever
                    </p></div>
                    <Scrollbar1 />
                </div>

            </section>

            {/*testtimonial section */}
            <section className="why-us_section homepage-why-us hows-section1 blogs-P">
                <div className="container">
                    <h1 class="head-new">Blogs</h1>
                    <div class="vl-content"><p class="vl-paragraph padding-top-0">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p></div>
                    <Blogs />
                </div>

            </section>



            {/* <section className="why-us section-bgba banner_section01">
                <div className="container">
                   
                    <div className="row">
                        <div className="col-lg-12">
                            <h3 className="cal-heading">We are here to help!</h3>
                            <p className="call-paragraph">Do you need assistance? Our dedicated support centre is purpose-built to
                                support you.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="view-button">
                                <Link to="/help">
                                    <button className="btn btn call_button">Go to our Support Centre</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        */}




            {/* <!-- ======= Home Call-us section End======= --> */}
        </>
    )
}


export default Home; 