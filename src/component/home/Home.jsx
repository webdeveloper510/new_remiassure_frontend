import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-multi-carousel/lib/styles.css";
import Scrollbar from '../scrollbar/Scrollbar';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import clsx from "clsx";
import { exchangeRate } from "../../utils/Api";

function WhyRenderingArrayOfObjects() {
    const dataItems = [
        {
            id: 1,
            src: "assets/img/home/Vector01.svg",
            circle_heading: "We're Fast",
            circle_content: "95% of our transfers are ready in minutes..",
        },
        {
            id: 2,
            src: "assets/img/home/Vector02.svg",
            circle_heading: "We're Safe",
            circle_content: "We use industry-leading technology to protect your money.",
        },
        {
            id: 3,
            src: "assets/img/home/Vector03.svg",
            circle_heading: "We're Low-Cost",
            circle_content: " conventional banks and money transfer services.",
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

function FlagHomeArrayofoObjects() {
    const flagData = [
        {
            id: 1,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.svg",
        },
        {
            id: 2,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.svg",
        },
        {
            id: 3,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.png",
        },
        {
            id: 4,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.svg",
        },
        {
            id: 5,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.svg",
        },
        {
            id: 6,
            flag_src: "assets/img/home/Mask group.svg",
            flag_title: "india",
            flag_arrow_scr: "assets/img/home/arrow01.svg",
        },
    ];

    const flagdataItems = flagData.map((flagvalue) => {
        return (

            <li key={flagvalue.id}>
                <div className="col-lg-12">
                    <div className="card card-flag01">
                        <div className="row">
                            <div className="col-4">
                                <div className="card-body">
                                    <img src={flagvalue.flag_src} alt="flag_icons" className="flag_icons" />
                                </div>
                            </div>

                            <div className="col-4">
                                <p className="india-text">{flagvalue.flag_title}</p>
                            </div>

                            <div className="col-4">
                                <img src={flagvalue.flag_arrow_scr} alt="arrow_icons" className="arrow_icons" />
                            </div>
                        </div>

                    </div>
                </div>
            </li>

        )
    })
    return (
        <div>
            {flagdataItems}
        </div>
    )
}


const Home = () => {

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

    const [data, setData] = useState({ send_amt: '',
    exchange_amt: '',
    from_type: "AUD",
    to_type: "NZD",
    recieve_meth: ""})



    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])
    const amountSchema = Yup.object().shape({
        send_amt: Yup.number()
            .required('Amount is required'),
        recieve_meth: Yup.string().oneOf(['1', '2'])
            .required("Payment method is required")
    })
    const initialValues = {
        send_amt: '',
        exchange_amt: '',
        from_type: "AUD",
        to_type: "NZD",
        recieve_meth: ""
    }
    const [loading, setLoading] = useState(false);
    const [total_rates, setTotal_rates] = useState('');
    const navigate = useNavigate();

    const nzd_opt = ["AUD", "USD", "EUR", "CAD"]
    const aud_opt = ["NZD", "USD", "EUR", "CAD"]

    useEffect(()=>{
        exchangeRate({ amount: "1", from: "AUD", to: "NZD" }).then(res=>{
            setTotal_rates(res.rate)
            localStorage.removeItem("exchange_curr")
            let obj = {send_amt:"1",from_type:"AUD", to_type:"NZD", exchange_amt:res.amount, exch_rate:res.rate}
            localStorage.setItem("exchange_curr", JSON.stringify(obj))
        })
    },[])

    const formik = useFormik({
        initialValues,
        validationSchema: amountSchema,
        onSubmit: async (values) => {
            setLoading(true)
            exchangeRate({ amount: values.send_amt, from: values.from_type, to: values.to_type, paymentMethod: values.recieve_meth }).then((res) => {
                console.log(res)
                setLoading(false)
                // localStorage.setItem("amount", data.amt1)
                // localStorage.setItem("exchangeAmount", res.amount)
                if (token) {
                    if (userdt?.digital_id_verified) {
                       
                        navigate("/user-send-money", { state: {...values, exch_rate:total_rates} })
                    } else {
                        
                        navigate("/send-money", { state: {...values, exch_rate:total_rates} })
                    }
                } else {
                    navigate("/login")
                }
            }).catch((error) => {
                // console.log(error.response)
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
            exchangeRate({ amount: event.target.value, from: formik.values.from_type, to: formik.values.to_type, paymentMethod:formik.values.recieve_meth })
                .then((res) => {
                    console.log(res)
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
        if (event.key === 'Backspace'||event.key === 'Enter'||event.key === 'Tab'|| event.key ==='Shift'||event.key==='ArrowLeft'||event.key==="ArrowRight"||event.key==="Escape") {

        }
        else if (!pattern.test(event.key)) {
            event.preventDefault();
            event.stopPropagation()
        } else {
            setData({ ...data, send_amt: event.target.value })
            formik.setFieldValue('send_amt', event.target.value)
            formik.setFieldTouched('send_amt', true)
        }
    }

    const myTotalAmountFrom = (e) => {
        console.log(e.target.value)
        setData({ ...data, from_type: e.target.value })
        formik.setFieldValue("from_type", e.target.value)
        formik.setFieldTouched("from_type", true)
        setLoading(true)
        const amt = formik.values.send_amt != 0 ? formik.values.send_amt : "1"
        if (e.target.value == "AUD" && formik.values.to_type == "AUD") {
            formik.setFieldValue("to_type", "NZD")
            exchangeRate({ amount: amt, from: e.target.value, to: "NZD" })
                .then(function (response) {
                    setTotal_rates(response.rate)
                    if (formik.values.send_amt != 0) {
                        formik.setFieldValue("exchange_amt", response.amount)
                        setData({ ...data, exchange_amt: response.amount })
                    }
                    setLoading(false)
                })
                .catch(function (error, message) {
                    console.log(error.response)
                    setLoading(false)
                })
        } else if (e.target.value == "NZD" && formik.values.to_type == "NZD") {
            formik.setFieldValue("to_type", "AUD")
            exchangeRate({ amount: amt, from: e.target.value, to: "AUD" })
                .then(function (response) {
                    setTotal_rates(response.rate)
                    if (formik.values.send_amt != 0) {
                        formik.setFieldValue("exchange_amt", response.amount)
                        setData({ ...data, exchange_amt: response.amount })
                    }
                    setLoading(false)
                })
                .catch(function (error, message) {
                    console.log(error.response)
                    setLoading(false)
                })
        } else {
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
                    console.log(error.response)
                    setLoading(false)
                })
        }
    }

    

    const myTotalAmountTo = (e) => {
        console.log(e.target.value, formik.values.send_amt)
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
                console.log(error.response)
                setLoading(false)
            })
    }

   
    const handleReset = () => {
        formik.resetForm({
            values: { send_amt: "", recieve_meth: "", exchange_amt: "" }
        })
        setData({ exchange_amt: "" })
    }

    return (
        <>
            <section className="top_sections">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 no-padding banner-content">
                            <div className="vl">
                                <h1 className="vl-heading">A Better Way</h1>
                                <h1 className="vl-heading01">To Send Money</h1>
                            </div>
                            <div className="vl-content">
                                <p className="vl-paragraph">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                                    malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
                                </p>
                                <p className="vl-paragraph">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                                    malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
                                </p>
                                <p className="vl-paragraph">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                                    malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
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
                                                        readOnly
                                                        className={clsx(
                                                            'form-control bg-transparent mb-3 new_input',
                                                            { 'is-invalid': formik.touched.exchange_amt && formik.errors.exchange_amt },
                                                            {
                                                                'is-valid': formik.touched.exchange_amt && !formik.errors.exchange_amt,
                                                            }
                                                        )}
                                                    />
                                                    <select
                                                        className="form-select form-control mb-3 home-select-method"
                                                        aria-label="Select a reason"
                                                        onChange={(e) => { myTotalAmountTo(e) }}
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
                                                {/* <span className="text-danger">{formik.errors.amount ? formik.errors.amount :""}</span> */}
                                            </div>
                                            <div className="col-4">
                                                <p className="get-text">Receive method</p>
                                                <select
                                                    {...formik.getFieldProps('recieve_meth')}
                                                    className={clsx(
                                                        'form-select rate_input form-control mb-3 home-select-method bg-transparent',
                                                        { 'is-invalid': formik.touched.recieve_meth && formik.errors.recieve_meth },
                                                        {
                                                            'is-valid': formik.touched.recieve_meth && !formik.errors.recieve_meth,
                                                        }
                                                    )} aria-label="Select a reason">
                                                    <option value="0">Select Method</option>
                                                    <option value="1">Bank Transfer</option>
                                                    <option value="2">Mobile Wallet</option>
                                                </select>
                                                {formik.touched.recieve_meth && formik.errors.recieve_meth && (
                                                    <div className='fv-plugins-message-container mt-1 home-error'>
                                                        <div className='fv-help-block'>
                                                            <span role='alert' className="text-danger">{formik.errors.recieve_meth}</span>
                                                        </div>
                                                    </div>
                                                )}
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
            <section className="why-us section-bgba banner_section05" >
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
            </section>
            <section className="why-us section-bgba banner_section01">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="vl02">
                                        <h1 className="money-heading">Send money to over 130 countries worldwide and choose
                                            from over 70 currencies</h1>
                                    </div>
                                    <div className="popular-content">
                                        <h4 className="popular-paragraph01">POPULAR COUNTRIES
                                        </h4>
                                        <p className="popular-paragraph02">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        </p>
                                        <p className="popular-paragraph02"> incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <ul className="bank_transfer">
                                            < FlagHomeArrayofoObjects />
                                        </ul>
                                    </div>
                                    {
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* main row End*/}
                    <div className="row">
                        <div className="col-lg-12 call_heading">
                            <h3 className="cal-heading">Call to us</h3>
                            <p className="call-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="view-button">
                                <a href="tel:+66 2399 1145" className="btn btn call_button">Call Now</a>
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