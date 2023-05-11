import React, { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { Links, NavLink, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { FcProcess } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { BiDollarCircle } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import authDashHelper from "../../utils/AuthDashHelper";

import Sidebar from './Sidebar';
import Page404 from "../pageNotfound/Page404";
import nodata from '../../assets/img/userdashboard/nodata.avif';
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { completedPayment, transactionHistory, userProfile } from "../../utils/Api";


const Dashboard = () => {

    const navigate = useNavigate();

    /**************************token ************************ */
    const token = localStorage.getItem("token");

    /**************************transaction of state ************************ */

    const [transactionData, setTransactionData] = useState([]);
    const [RecepientsData, setRecepientsData] = useState('');
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    /**************************Recipient of state ************************ */
    const [data, setData] = useState([]);
    const [recipientData, setRecipientData] = useState([]);
    const [dataLength, setDataLength] = useState("")
    const [total_amount, setTotalAmount] = useState(0)
    const [total_recipients, setTotalRecipients] = useState(0)

    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive);
    };

    console.log("transation----------------", transactionData)


    const transHistory = () => {
        transactionHistory().then((response) => {
            // console.log("payment-transaction-history----------====", response)
            if (response.code == "200") {
                setTransactionData(response.data);
                let d = response.data
                let amount = 0
                for (let i = 0; i < d.length; i++) {
                    amount = Number(amount) + Number(d[i].amount)
                }
                setTotalAmount(amount)
                setLoading(false)
            }
            else if (response.code == "400") {
                setLoading(false)
            }
        }).catch((error) => {
            // console.log(error.response)
            setLoading(false)

        })
    }



    const getList = () => {
        axios.post(API.BASE_URL + 'payment/recipient-list/', {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(function (response) {
                if (response.data.code == "200") {
                    setRecipientData(response.data.data);
                    setTotalRecipients(response.data.data.length)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (!authDashHelper('dashCheck')) {
            navigate("/send-money")
        } else {
            userProfile().then((response) => {
                console.log("user-profile----------====", response)
                if (response.code == 200) {
                    setFirstName(response.data.First_name);
                    setLastName(response.data.Last_name)
                }
            }).catch((error) => {
                console.log(error.response)
            })
        }
    }, [])

    useEffect(() => {
        transHistory()
        getList()
    }, [])

    return (
        <>

            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        <section className="dashboard">
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="form-head mb-4">
                                        <h2 class="text-black font-w600 mb-0"><b>Welcome, <span style={{ "color": "#6414e9" }}>{firstName}</span></b></h2>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-xl-4 col-lg-4 col-md-6">
                                            <div className="dashbord-user dCard-1">
                                                <div className="dashboard-content">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="">
                                                            <div className="top-content">
                                                                <h3>Recipeints</h3>
                                                            </div>
                                                            <div class="user-count">
                                                                <span class="text-uppercase-edit"> View the list of Recipients</span>
                                                            </div>
                                                        </div>

                                                        <div className="icon">
                                                            {/* <NavLink to={"/add-new-recipient"} > */}
                                                            <BsFillPersonPlusFill />
                                                            {/* </NavLink> */}

                                                        </div>

                                                    </div>
                                                    <div className="mt-3">
                                                        <NavLink to="/user-recipients" className="btn btn-outline-dark btn-rounded">
                                                            View
                                                        </NavLink>
                                                        <span className="text-light custom-number">Recipients ⇒ {total_recipients}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-6">
                                            <div className="dashbord-user dCard-1 middle-card">
                                                <div className="dashboard-content">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="">
                                                            <div className="top-content">
                                                                <h3>Send Money</h3>
                                                            </div>
                                                            <div class="user-count">
                                                                <span class="text-uppercase-edit"> Easy way to send money</span>
                                                            </div>
                                                        </div>
                                                        <div className="icon">
                                                            <BiTransfer />
                                                            <br />

                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <NavLink to="/user-send-money" className="btn btn-outline-dark btn-rounded">
                                                            View
                                                        </NavLink>
                                                        <span className="text-light custom-number">Amount Sent ⇒ {total_amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-6">
                                            <div className="dashbord-user dCard-1">
                                                <div className="dashboard-content">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="">
                                                            <div className="top-content">
                                                                <h3>Profile</h3>
                                                            </div>
                                                            <div class="user-count">
                                                                <span class="text-uppercase-edit">Check your profile</span>
                                                            </div>
                                                        </div>
                                                        <div className="icon">
                                                            <MdRemoveRedEye />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <NavLink to="/user-profile" className="btn btn-outline-dark btn-rounded">
                                                            View
                                                        </NavLink>
                                                        <span className="text-light custom-number">{firstName} {lastName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* loader start */}

                            {loading ? <>
                                <div class="loader-overly">
                                    <div class="loader" >
                                    </div>

                                </div>
                            </> : <></>}
                            {/* loader End */}

                            {!loading ? (
                                <>
                                    <div className="row">

                                        <div class="col-xl-8">
                                            <div className="card">
                                                <div className="card-header d-block d-sm-flex border-0">
                                                    <div className="me-3">
                                                        <h4 className="fs-20 text-black">Latest Transactions</h4>
                                                    </div>
                                                </div>
                                                {transactionData?.length != 0 ? (
                                                    <table className="table table-responsive-md card-table previous-transactions">
                                                        <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Recipient</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                transactionData?.map((res, index) => {
                                                                    //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <h6 className="fs-16 text-black font-w400 mb-0">{res.date}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">{res.recipient_name}</a></h6>

                                                                            </td>
                                                                            <td><span className="fs-16 text-black font-w500"><span className="text-capitalize">{res.send_currency} </span> {res.amount}</span></td>
                                                                            <td>
                                                                                <span className="text-success fs-16 font-w500 d-block"> <a href="javascript:void(0)" className="btn btn-outline-success btn-rounded">{res.status}</a></span>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}

                                                        </tbody>

                                                    </table>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                                }

                                                {transactionData?.length == 0 ? (
                                                    <div className="no-data">
                                                        <img src={nodata} alt="no-data" />
                                                        <div className="col-md-12">
                                                            <p><b>No transfers yet</b><br></br>Once you send money, we'll show you a detailed list of your transfers here.</p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <NavLink to="/user-send-money" className="send_money">Send Money</NavLink>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>

                                                    </>
                                                )
                                                }
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div className="card">
                                                <div className="card-header d-block d-sm-flex border-0">
                                                    <div className="me-3">
                                                        <h4 className="fs-20 text-black">Recent Recipients</h4>
                                                    </div>
                                                </div>

                                                {recipientData?.length != 0 ? (
                                                    <table className="table table-responsive-md card-table previous-transactions">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Destination</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                recipientData?.map((res, index) => {
                                                                    return (

                                                                        <tr key={res.id}>
                                                                            <td>
                                                                                <div class="me-auto">
                                                                                    <h6 class="fs-16 font-w600 mb-0">{res.first_name} {res.last_name}</h6>
                                                                                    <span class="fs-12">{res.date}</span>
                                                                                </div>
                                                                            </td>

                                                                            <td>

                                                                                {res.country}

                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })}


                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                                }
                                                {
                                                    recipientData?.length == 0 ? (
                                                        <>
                                                            <section>
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="add-rec-new">
                                                                            <img src={norecipients} alt="empty" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* <Page404 /> */}
                                    <div className="loader-overly">
                                        <div className="loader" >
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Dashboard;