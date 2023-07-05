import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-multi-carousel/lib/styles.css";
import Scrollbar from '../scrollbar/Scrollbar';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import clsx from "clsx";
import { useRef } from "react";
import { exchangeRate } from "../../utils/Api";

function WhyRenderingArrayOfObjects() {
    const dataItems = [
        {
            id: 1,
            src: "assets/img/home/Vector01.svg",
            circle_heading: "We're Fast",
            circle_content: "95% of our transfers are completed in minutes…",
        },
        {
            id: 2,
            src: "assets/img/home/Vector02.svg",
            circle_heading: "We're Safe",
            circle_content: "We use industry-leading technology to secure your money.",
        },
        {
            id: 3,
            src: "assets/img/home/Vector03.svg",
            circle_heading: "We're Effective",
            circle_content: "Our rates are competitive compared to banks and other remittance services.",
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
function BankTransferArrayOfObjects() {
    const bankItems = [
        {
            id: 1,
            home_src: "assets/img/home/home.svg",
            bank_title: "Bank Transfer",
            bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",
        },
        {
            id: 2,
            home_src: "assets/img/home/home.svg",
            bank_title: "Bank Transfer",
            bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",
        },
        {
            id: 3,
            home_src: "assets/img/home/home.svg",
            bank_title: "Bank Transfer",
            bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",
        },
        {
            id: 4,
            home_src: "assets/img/home/home.svg",
            bank_title: "Bank Transfer",
            bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",
        },
    ];

    const Tranferdata = bankItems.map((bankdata) => {
        return (

            <li className="bank_lists" key={bankdata.id}>
                <div className="bank_contents">
                    <img src={bankdata.home_src} alt="home_icons" className="bank_icons" />
                    <h3 className="bank_transfer">{bankdata.bank_title}</h3>
                    <p className="bank_paragraph">{bankdata.bank_contents}</p>
                </div>
            </li>

        )
    })
    return (
        <div>
            {Tranferdata}
        </div>
    )
}

// function FlagHomeArrayofoObjects() {
//     const flagData = [
//         {
//             id: 1,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.svg",
//         },
//         {
//             id: 2,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.svg",
//         },
//         {
//             id: 3,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.png",
//         },
//         {
//             id: 4,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.svg",
//         },
//         {
//             id: 5,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.svg",
//         },
//         {
//             id: 6,
//             flag_src: "assets/img/home/Mask group.svg",
//             flag_title: "india",
//             flag_arrow_scr: "assets/img/home/arrow01.svg",
//         },
//     ];

//     const flagdataItems = flagData.map((flagvalue) => {
//         return (

//             <li key={flagvalue.id}>
//                 <div className="col-lg-12">
//                     <div className="card card-flag01">
//                         <div className="row">
//                             <div className="col-4">
//                                 <div className="card-body">
//                                     <img src={flagvalue.flag_src} alt="flag_icons" className="flag_icons" />
//                                 </div>
//                             </div>

//                             <div className="col-4">
//                                 <p className="india-text">{flagvalue.flag_title}</p>
//                             </div>

//                             <div className="col-4">
//                                 <img src={flagvalue.flag_arrow_scr} alt="arrow_icons" className="arrow_icons" />
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </li>

//         )
//     })
//     return (
//         <div>
//             {flagdataItems}
//         </div>
//     )
// }


const Home = () => {

    const currency_ref = useRef()
    const token = localStorage.getItem("token");
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

    const [data, setData] = useState({
        send_amt: '',
        exchange_amt: '',
        from_type: "AUD",
        to_type: "USD",
        recieve_meth: "Bank Transfer"
    })

    const [currency, setCurrency] = useState(null)

    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])

    const amountSchema = Yup.object().shape({
        send_amt: Yup.number()
            .required('Amount is required')
    })

    const initialValues = {
        send_amt: '',
        exchange_amt: '',
        from_type: "AUD",
        to_type: "USD",
        recieve_meth: "Bank Transfer"
    }

    const [loading, setLoading] = useState(false);
    const [total_rates, setTotal_rates] = useState('');
    const navigate = useNavigate();

    const curr_out = ["USD", "NGN", "GHC", "KHS", "PHP", "THB", "VND"]




    useEffect(() => {
        exchangeRate({ amount: "1", from: "AUD", to: "USD" }).then(res => {
            setTotal_rates(res.rate)
            localStorage.removeItem("exchange_curr")
            let obj = { send_amt: "1", from_type: "AUD", to_type: "USD", exchange_amt: res.amount, exch_rate: res.rate }
            localStorage.setItem("exchange_curr", JSON.stringify(obj))
        })
    }, [])


    useEffect(() => {
        if (currency !== null) {
            setLoading(true);
            currency_ref.current.focus()
            exchangeRate({ amount: "100", from: formik.values.from_type, to: currency })
                .then((res) => {
                    setData({ ...data, exchange_amt: res.amount, send_amt: "100", to_type: currency })
                    formik.setValues({ ...formik.values, exchange_amt: res.amount, send_amt: "100", to_type: currency })
                    setTotal_rates(res.rate)
                    setLoading(false)

                }).catch((error) => {
                    // console.log(error.response)
                    if (error.response.data.code == "400") {
                        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                    setLoading(false)
                })
        }
    }, [currency])

    const formik = useFormik({
        initialValues,
        validationSchema: amountSchema,
        onSubmit: async (values) => {
            setLoading(true)
            exchangeRate({ amount: values.send_amt, from: values.from_type, to: values.to_type, paymentMethod: values.recieve_meth }).then((res) => {
                setLoading(false)
                // localStorage.setItem("amount", data.amt1)
                // localStorage.setItem("exchangeAmount", res.amount)
                if (token) {
                    if (userdt?.digital_id_verified) {

                        navigate("/user-send-money", { state: { ...values, exch_rate: total_rates } })
                    } else {

                        navigate("/send-money", { state: { ...values, exch_rate: total_rates } })
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
        }
    })


    const myExchangeTotalAmount = (event) => {
        event.preventDefault();

        // console.log({...data, amount:event.target.value})
        let length = event.target.value.toString()
        if (length.length > 0) {
            setLoading(true);
            exchangeRate({ amount: event.target.value, from: formik.values.from_type, to: formik.values.to_type, paymentMethod: formik.values.recieve_meth })
                .then((res) => {
                    setData({ ...data, exchange_amt: res.amount })
                    formik.setFieldValue("exchange_amt", res.amount)
                    setTotal_rates(res.rate)
                    setLoading(false)

                }).catch((error) => {
                    // console.log(error.response)
                    if (error.response.data.code == "400") {
                        toast.error(error.response.data.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true })
                    }
                    setLoading(false)
                })
        }
    }

    const inputvalidation = (event) => {
        // console.log("dfjghfguh---------------", event.key)
        const pattern = /^[0-9.,]+$/;
        if (event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight" || event.key === "Escape") {
            setData({ ...data, send_amt: event.target.value })
            formik.setFieldValue('send_amt', event.target.value)
            formik.setFieldTouched('send_amt', true)
        } else if (event.key === 'Backspace' || event.key === "Delete") {
            formik.setFieldValue("exchange_amt", "")
            formik.setFieldTouched("exchange_amt", false)
            setData({ ...data, exchange_amt: "" })
        } else if (event.key === 'Enter') {
            myExchangeTotalAmount(event)
        } else {
            let value = event.target.value.toString()
            if (value.length < 7) {
                if (!pattern.test(event.key)) {
                    event.preventDefault();
                    event.stopPropagation()
                } else {
                    setData({ ...data, send_amt: event.target.value })
                    formik.setFieldValue('send_amt', event.target.value)
                    formik.setFieldTouched('send_amt', true)
                }
            } else {
                event.preventDefault();
                event.stopPropagation()
            }
        }
    }

    const myTotalAmountFrom = (e) => {
        setData({ ...data, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoading(true)
        const amt = formik.values.send_amt != 0 || formik.values.send_amt != undefined ? formik.values.send_amt : "1"
        exchangeRate({ amount: amt, from: e.target.value, to: formik.values.to_type })
            .then(function (response) {
                setTotal_rates(response.rate)
                if (formik.values.send_amt != 0) {
                    formik.setFieldValue("exchange_amt", response.amount)
                    setData({ ...data, exchange_amt: response.amount })
                }
                setLoading(false)
            })
            .catch(function (error, message) {
                setLoading(false)
            })
    }



    const myTotalAmountTo = (e) => {
        setData({ ...data, to_type: e.target.value })
        formik.setFieldValue("to_type", e.target.value)
        formik.setFieldTouched("to_type", true)
        setLoading(true)
        const amt = formik.values.send_amt != 0 ? formik.values.send_amt : "1"
        exchangeRate({ amount: amt, from: formik.values.from_type, to: e.target.value })
            .then(function (response) {
                setTotal_rates(response.rate)
                if (formik.values.send_amt != 0) {
                    formik.setFieldValue("exchange_amt", response.amount)
                    setData({ ...data, exchange_amt: response.amount })
                }
                setLoading(false)
            })
            .catch(function (error, message) {
                setLoading(false)
            })
    }


    const handleReset = () => {
        const data = JSON.parse(localStorage.getItem("exchange_curr"))

        formik.resetForm({
            values: { send_amt: "", recieve_meth: "Bank Transfer", exchange_amt: "", from_type: "AUD", to_type: "USD" }

        })
        setTotal_rates(data.exch_rate)

    }

    return (
        <>
            <section className="top_sections">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 no-padding banner-content">
                            <div className="vl">
                                <h1 className="vl-heading">Welcome</h1>
                                <h1 className="vl-heading01">To Remittance 2.0</h1>
                            </div>
                            <div className="vl-content">
                                <p className="vl-paragraph">
                                    We have re-imagined international money transfer to provide reliable, efficient and<br />
                                    cost effective services to our customers.
                                </p>
                                <p className="vl-paragraph">
                                    Leveraging cutting edge digital technologies and an ecosystem of proven global <br />
                                    partners, we are ushering in a new world of seamless, secure and speedy global<br />
                                    payments.
                                </p>
                                <p className="vl-paragraph">
                                    We invite you to come onboard and enjoy the unparalleled experience provided by our<br />
                                    platform.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 right_sections">
                            <img src="assets/img/home/bank.svg" alt="background-images" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-flag new_card">
                                <div className="card-body">
                                    <h6 className="exchange-heading">EXCHANGE RATE</h6>
                                    <p className="calculation">1 {formik.values.from_type} = {total_rates} {formik.values.to_type}</p>
                                    <form onSubmit={formik.handleSubmit} noValidate>
                                        <div className="row">

                                            <div className="col-4">
                                                <p className="send-text">You Send<span style={{ color: 'red' }} >*</span></p>
                                                <div className="inline select-currency">
                                                    <Form.Control
                                                        name="amount"
                                                        type="text"
                                                        autoComplete='off'
                                                        onKeyDown={(e) => inputvalidation(e)}
                                                        {...formik.getFieldProps('send_amt')}
                                                        className={clsx(
                                                            'mb-3 bg-transparent form-control',
                                                            { 'is-invalid': formik.touched.send_amt && formik.errors.send_amt },
                                                            {
                                                                'is-valid': formik.touched.send_amt && !formik.errors.send_amt,
                                                            }
                                                        )}
                                                        placeholder="Please Enter Amount"
                                                        onBlur={(e) => myExchangeTotalAmount(e)}

                                                    />

                                                    <select
                                                        className="form-select mb-3 home-select-method"
                                                        aria-label="Select a reason"
                                                        value={formik.values.from_type}
                                                        onChange={(e) => { myTotalAmountFrom(e) }}
                                                    // {...formik.getFieldProps('from_type')}
                                                    >
                                                        <option value="AUD">AUD</option>
                                                        <option value="NZD">NZD</option>
                                                    </select>

                                                </div>
                                                {formik.touched.send_amt && formik.errors.send_amt && (
                                                    <div className='fv-plugins-message-container mt-1 home-error'>
                                                        <div className='fv-help-block'>
                                                            <span role='alert' className="text-danger">{formik.errors.send_amt}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-4">
                                                <p className="get-text">They get<span style={{ color: 'red' }} >*</span></p>
                                                <div className="inline select-currency">
                                                    <input
                                                        autoComplete='off'
                                                        value={formik.values.exchange_amt}
                                                        ref={currency_ref}
                                                        readOnly
                                                        className='form-control bg-transparent mb-3 new_input'

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
                                                {/* <span className="text-danger">{formik.errors.amount ? formik.errors.amount :""}</span> */}
                                            </div>
                                            <div className="col-4">
                                                <p className="get-text">Receive method</p>
                                                <select
                                                    {...formik.getFieldProps('recieve_meth')}
                                                    className='form-select rate_input form-control mb-3 home-select-method bg-transparent'
                                                    aria-label="Select a reason">
                                                    <option value="Bank Transfer">Bank Transfer</option>
                                                    <option value="Mobile Wallet">Mobile Wallet</option>
                                                </select>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn continue-button"
                                                >
                                                    Continue
                                                    {loading ? <>
                                                        <div className="loader-overly">
                                                            <div className="loader" >
                                                            </div>
                                                        </div>
                                                    </> : <></>}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn continue-button"
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

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="why-us_section homepage-why-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="vl">
                                <h1 className="vl-heading">Why</h1>
                                <h1 className="vl-heading01">RemitAssure ?</h1>
                            </div>
                            <div className="vl-content">
                                <ul className="list-">
                                    < WhyRenderingArrayOfObjects />
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 right_sections">
                            <img src="assets/img/home/img02.svg" alt="background-images" />
                        </div>
                    </div>
                    <div className="Money_section">
                        <div className="row">
                            <div className="col-lg-6 right_sections">
                                <img src="assets/img/home/img03.svg" alt="background-images" />
                            </div>
                            <div className="col-lg-6 better_sections">
                                <div className="vl">
                                    <h1 className="vl-heading">A Better Way</h1>
                                    <h1 className="vl-heading01">To Send Money ?</h1>
                                </div>
                                <div className="vl-content">
                                    <p className="vl-paragraph">
                                        Download our app for free to send money online in minutes to over 130 other countries. Track your payments and view your transfer history from anywhere.
                                    </p>
                                </div>
                                <div className="link">
                                    <div className="left_link">
                                        <img src="assets/img/home/Group 01.svg" alt="home_icons" className="home_icons" />
                                    </div>
                                    <div className="rihjt_link">
                                        <img src="assets/img/home/Group 02.svg" alt="home_icons" className="home_icons" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            <section className="why-us section-bgba banner_section01">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="vl02">
                                        <h1 className="money-heading">Our global payment network enables our customers to seamlessly transfer funds to vast
                                            number of countries</h1>
                                    </div>
                                    <div className="popular-content">
                                        <h4 className="popular-paragraph01">Our most popular payout corridors
                                        </h4>
                                        {/* <p className="popular-paragraph02">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        </p>
                                        <p className="popular-paragraph02"> incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna.
                                        </p> */}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        {/* <ul>
                                             < FlagHomeArrayofoObjects />
                                            <li></li>
                                        </ul> */}
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("USD") }}>
                                                <img src="assets/img/home/nigeria.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6 className="mx">Nigera (USD)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("NGN") }}>
                                                <img src="assets/img/home/nigeria.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>Nigera (NGN)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards w-100" onClick={() => { setCurrency("GHC") }}>
                                                <img src="assets/img/home/ghana.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>GHANA (GHC)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("KHS") }}>
                                                <img src="assets/img/home/kenya.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>KENYA (KHS)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("PHP") }}>
                                                <img src="assets/img/home/philippines.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>PHILIPPINES (PHP)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("THB") }}>
                                                <img src="assets/img/home/thailand.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>THAILAND (THB)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <div className="d-flex currency_cards" onClick={() => { setCurrency("VND") }}>
                                                <img src="assets/img/home/vietnam.svg" height={45} width={45} alt="flag" style={{ borderRadius: "50%" }} />
                                                <h6>VIETNAM (VND)</h6>
                                                <img src="assets/img/home/arrow01.svg" alt="arrow01" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* {
                                        userdt && token ? (
                                            <div className="view-button">
                                                <NavLink to={"/userdashboard"}>
                                                    <button className="btn btn view_button">View all</button>
                                                </NavLink>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="view-button">
                                                    <NavLink to={"/login"}>
                                                        <button className="btn btn view_button">View all</button>
                                                    </NavLink>
                                                </div>
                                            </>
                                        )
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* main row End*/}
                    <div className="row">
                        <div className="col-lg-12 call_heading">
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
            {/* <!-- ======= Home Call-us section End======= --> */}
        </>
    )
}


export default Home; 