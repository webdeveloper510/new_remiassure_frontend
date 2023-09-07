import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import authDashHelper from "../../utils/AuthDashHelper";
import Sidebar from './Sidebar';
import nodata from '../../assets/img/userdashboard/nodata.avif';
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { recipientList, transactionHistory, userProfile } from "../../utils/Api";


const Dashboard = () => {

    const navigate = useNavigate();

    /**************************token ************************ */
    const token = localStorage.getItem("token");

    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [recipientData, setRecipientData] = useState([]);
    const [total_amount, setTotalAmount] = useState(0)
    const [total_recipients, setTotalRecipients] = useState(0)


    const transHistory = () => {
        transactionHistory().then((response) => {
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
            setLoading(false)

        })
    }



    const getList = () => {
        recipientList({}).then(function (response) {
            if (response.code == "200") {
                setRecipientData(response.data);
                setTotalRecipients(response.data.length)
                // let arr = []
                // for (let i = 0; i < response?.data?.length; i++) {
                //     if (i === 0) {
                //         arr.push(response.data[i])
                //     } else {
                //         if (response?.data[i]?.email !== response?.data[i - 1]?.email) {
                //             arr.push(response.data[i])
                //         }
                //     }
                // }
                // console.log(arr, "arr")
                setLoading(false)
            }
        })
            .catch(function (error) {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (authDashHelper('dashCheck') === false) {
            navigate("/send-money")
        } else {
            userProfile().then((response) => {
                if (response.code == 200) {
                    setFirstName(response.data.First_name);
                    setLastName(response.data.Last_name)
                }
            }).catch((error) => {
            })
        }
    }, [])

    useEffect(() => {
        transHistory()
        getList()
    }, [])

    const modified_date = (date) => {
        let d = date.split("-")
        return d[2] + "-" + d[1] + "-" + d[0]
    }

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
                                        <div className="col-xl-4 col-lg-4 col-md-6 fullwidth">
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
                                                            <BsFillPersonPlusFill />

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

                                        <div className="col-xl-4 col-lg-4 col-md-6 fullwidth">
                                            <div className="dashbord-user dCard-1 middle-card">
                                                <div className="dashboard-content">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="">
                                                            <div className="top-content">
                                                                <h3>New Transfer</h3>
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
                                                            Send Money
                                                        </NavLink>
                                                        <span className="text-light custom-number">Amount Sent ⇒ {total_amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-6 fullwidth">
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

                            {loading ? <>
                                <div className="loader-overly">
                                    <div className="loader" >
                                    </div>

                                </div>
                            </> : <></>}

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
                                                    <div className="table-responsive">
                                                        <table className="table table-responsive-md card-table previous-transactions">
                                                            <thead>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>Recipient</th>
                                                                    <th>Amount</th>
                                                                    <th >Status</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {
                                                                    transactionData?.map((res, index) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>
                                                                                    <h6 className="fs-16 text-black font-w400 mb-0">{modified_date(res.date)}</h6>
                                                                                </td>
                                                                                <td>
                                                                                    <h6 className="fs-16 font-w600 mb-0"><span className="text-black">{res?.recipient_name ? res?.recipient_name : "N/A"}</span></h6>

                                                                                </td>
                                                                                <td><span className="fs-16 text-black font-w500"><span className="text-capitalize">{res?.send_currency} </span> {res?.amount}</span></td>
                                                                                <td>
                                                                                    {
                                                                                        res?.payment_status === "cancelled" || res?.payment_status === "Cancelled" ? (
                                                                                            <span className="text-danger fs-16 font-w500 d-block"> <span className="btn btn-outline-danger btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.id}`)}>{res?.payment_status}</span></span>

                                                                                        ) : (
                                                                                            <span className="text-success fs-16 font-w500 d-block"> <span className="btn btn-outline-success btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.id}`)}>{res?.payment_status}</span></span>
                                                                                        )
                                                                                    }

                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}

                                                            </tbody>

                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="table-responsive">
                                                        <table className="table table-responsive-md card-table previous-transactions">
                                                            <thead>
                                                            </thead>
                                                            <tbody>
                                                            </tbody>
                                                        </table>
                                                    </div>
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

                                                {recipientData?.length > 0 ? (
                                                    <div className="table-responsive">
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
                                                                                        <h6 class="fs-16 font-w600 mb-0">{res?.first_name}&nbsp;{res?.last_name}</h6>
                                                                                        <span class="fs-12">{res?.date}</span>
                                                                                    </div>
                                                                                </td>

                                                                                <td>

                                                                                    {res?.country}

                                                                                </td>
                                                                            </tr>

                                                                        )
                                                                    })}


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="table-responsive">
                                                        <table className="table table-responsive-md card-table previous-transactions">
                                                            <thead>
                                                            </thead>
                                                            <tbody>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="loader-overly">
                                        <div className="loader" >
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </section>
                    </div >
                </div >
            </div >
        </>
    )
}



export default Dashboard;