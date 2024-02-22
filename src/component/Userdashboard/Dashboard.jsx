import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { recipientList, transactionHistory, userProfile } from "../../utils/Api";
import { commaSeperator } from "../../utils/hook";
import { Alert, Modal } from "react-bootstrap";
import important from "../../assets/img/userdashboard/important.png";
import MultiStepForm from "../kyc/Mainsteps";


const Dashboard = () => {

    const navigate = useNavigate();

    /**************************token ************************ */

    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [is_profile, setIsProfile] = useState(false)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [recipientData, setRecipientData] = useState([]);
    const [total_amount_paid, setTotalAmountPaid] = useState(0)
    const [total_amount_sent, setTotalAmountSent] = useState(0)
    const [total_recipients, setTotalRecipients] = useState(0)
    const [verification, setVerification] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isVerified, setIsVerified] = useState("false")


    const transHistory = () => {
        transactionHistory().then((response) => {
            if (response.code == "200") {
                let list = []
                if (response.data.data.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        list.push(response.data.data[i])
                    }
                } else {
                    list = response.data.data
                }
                setTransactionData(list);
                setTotalAmountPaid(response.data.final_amount)
                setTotalAmountSent(response.data.total_amount)
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
                let list = []
                if (response.data.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        list.push(response.data[i])
                    }
                } else {
                    list = response.data
                }
                setRecipientData(list);
                setTotalRecipients(response.data.length)
                setLoading(false)
            }
        })
            .catch(function (error) {
                setLoading(false)
            })
    }

    useEffect(() => {
        userProfile().then((response) => {
            if (response.code == 200) {
                setFirstName(response.data.First_name);
                setLastName(response.data.Last_name);
                setIsProfile(response?.data?.profile_completed)
                setIsVerified(response.data?.is_digital_Id_verified?.toString()?.toLowerCase())
                sessionStorage.removeItem("remi-user-dt")
                sessionStorage.setItem("remi-user-dt", JSON.stringify(response.data))
            }
        }).catch((error) => {
        })
    }, [])

    useEffect(() => {
        transHistory()
        getList()
    }, [])

    const modified_date = (date) => {
        let d = date.split("-")
        return d[2] + "-" + d[1] + "-" + d[0]
    }

    const start = () => {
        setVerification(true)
    }

    const end = () => {
        setLoader(false)
        setVerification(false)
        userProfile().then((response) => {
            if (response.code == 200) {
                setFirstName(response.data.First_name);
                setLastName(response.data.Last_name);
                setIsProfile(response?.data?.profile_completed)
                setIsVerified(response.data?.is_digital_Id_verified?.toString()?.toLowerCase())
                sessionStorage.removeItem("remi-user-dt")
                sessionStorage.setItem("remi-user-dt", JSON.stringify(response.data))
            }
        }).catch((error) => {
        })
    }

    const cancelProcess = () => {
        setVerification(false)
        userProfile().then((response) => {
            if (response.code == 200) {
                setFirstName(response.data.First_name);
                setLastName(response.data.Last_name);
                setIsProfile(response?.data?.profile_completed)
                setIsVerified(response.data?.is_digital_Id_verified?.toString()?.toLowerCase())
                sessionStorage.removeItem("remi-user-dt")
                sessionStorage.setItem("remi-user-dt", JSON.stringify(response.data))
            }
        }).catch((error) => {
        })
    }

    return (
        <section className="dashboard">
            <div className="row">
                <div className="col-md-12">
                    <div class="form-head mb-4">
                        <h2 class="text-black font-w600 mb-0"><b>Welcome, <span style={{ "color": "#6414e9" }}>{firstName}</span></b></h2>
                    </div>
                    {
                        is_profile === false && (isVerified === "declined" || isVerified === "pending" ||isVerified === "resubmission_requested") && !loading ? (
                            < div >
                                <Alert className="verify-alert" >
                                    <b><img src={important} height={40} width={40} />To transfer Money, Please complete the below steps:</b>
                                    <ol>
                                        <li><span className="fw-bold" onClick={() => start()}>Complete Your Profile</span>.</li>
                                        <li><span className="fw-bold" onClick={() => start()}>Verify your Account</span>.</li>
                                    </ol>
                                </Alert>
                            </div>
                        ) :
                            is_profile === false && !loading ? (
                                < div >
                                    <Alert className="verify-alert" >
                                        <b><img src={important} height={40} width={40} />To transfer Money, Please complete the below steps:</b>
                                        <ol>
                                            <li><span className="fw-bold" onClick={() => start()}>Complete Your Profile</span>.</li>
                                        </ol>
                                    </Alert>
                                </div>
                            )
                                : (isVerified === "declined" || isVerified === "pending"|| isVerified === "resubmission_requested") && !loading ? (
                                    <div>
                                        <Alert className="verify-alert" >
                                            <b><img src={important} height={40} width={40} />To transfer Money, Please complete the below steps:</b>
                                            <ol>
                                                <li><span className="fw-bold" onClick={() => start()}>Verify your Account</span>.</li>
                                            </ol>
                                        </Alert>
                                    </div>
                                ) : (
                                    <></>
                                )
                    }
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
                                        {/* <span className="text-light custom-number">Sent ⇒ {total_amount_sent} <br />
                                            Paid ⇒ {total_amount_paid}
                                        </span> */}
                                        <NavLink to={`/user-send-money`} className="btn btn-outline-dark btn-rounded">
                                            Send Money
                                        </NavLink>
                                        {/* <span className="text-light custom-number"></span> */}
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

            {
                loading ? <>
                    <div className="loader-overly">
                        <div className="loader" >
                        </div>

                    </div>
                </> : <></>
            }

            {
                !loading ? (
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
                                                        <th>Amount Paid</th>
                                                        <th >Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        transactionData?.map((res, index) => {
                                                            return (
                                                                <tr onClick={() => navigate(`/transaction-detail/${res?.transaction_id}`)} style={{ cursor: "pointer" }}>
                                                                    <td>
                                                                        <h6 className="fs-16 text-black font-w400 mb-0">{modified_date(res?.date)}</h6>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="fs-16 font-w600 mb-0"><span className="text-black">{res?.recipient_name ? res?.recipient_name : "N/A"}</span></h6>

                                                                    </td>
                                                                    <td><span className="fs-16 text-black font-w500"><span className="text-capitalize">{res?.send_currency} </span> {commaSeperator(res?.amount)}</span></td>
                                                                    <td>
                                                                        {
                                                                            res?.payment_status === "cancelled" || res?.payment_status === "Cancelled" ? (
                                                                                <span className="text-danger fs-16 font-w500 d-block"> <span className="btn btn-outline-danger btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.transaction_id}`)}>{res?.payment_status}</span></span>
                                                                            ) : (
                                                                                <span className="text-success fs-16 font-w500 d-block"> <span className="btn btn-outline-success btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.transaction_id}`)}>{res?.payment_status}</span></span>
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
            < Modal show={verification} size="xl" backdrop="static" onHide={() => cancelProcess()} centered >
                <Modal.Header closeButton >
                    <b style={{ color: "#190079" }}>Complete Your KYC</b>
                </Modal.Header>
                < Modal.Body className='w-100 m-auto' >
                    <MultiStepForm handleModel={() => end()} is_model={verification} />
                </Modal.Body>
            </Modal>
            {
                loader ? <>
                    <div className="loader-overly" >
                        <div className="loader" >
                        </div>
                    </div>
                </> : ""
            }
        </section >
    )
}

export default Dashboard;