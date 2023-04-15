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
import Sidebar from './Sidebar';
import Page404 from "../pageNotfound/Page404";
import nodata from '../../assets/img/userdashboard/nodata.avif';
import norecipients from '../../assets/img/userdashboard/hidden.avif';



const Dashboard = () => {

    /**************************token ************************ */
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);

    const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
    console.log("LoginDigitalidVerified", LoginDigitalidVerified)

    const signup_token = localStorage.getItem("signup_token")
    console.log("signup_token", signup_token);

    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp);

    const DigitalCode = localStorage.getItem("DigitalCode");
    console.log("DigitalCode", DigitalCode);



    const AmountValue = localStorage.getItem("AmountValue");
    console.log("AmountValue", AmountValue)

    const Total_amount = localStorage.getItem("Total_amount");
    console.log("Amonut", Total_amount);

    const recipientName = localStorage.getItem("recipientName")
    console.log(recipientName, "recipientName");


    /**************************transaction of state ************************ */

    const [transactionData, setTransactionData] = useState([]);
    const [RecepientsData, setRecepientsData] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    /**************************Recipient of state ************************ */
    const [data, setData] = useState([]);



    const navigate = useNavigate();
    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive);
    };


    /**************************************************************************
   * ************** Start  Start Transaction-History List ********************
   * ***********************************************************************/

    useEffect(() => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'payment/transaction-history/', {}, {
            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,
            }
        })
            .then(function (response) {
                console.log("Recipients APIIIII", response.data);
                setTransactionData(response.data);
                localStorage.setItem("RecepientsData", JSON.stringify(response.data.data))
                setLoading(false); // Stop loading
            })
            .catch(function (error) {
                console.log(error);
                console.log(error.response);
                setLoading(false); // Stop loading in case of error

            })
    }, [])

    console.log(transactionData, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")



    /**************************************************************************
   * ************** Start  Recipient complete List ************************************
   * ***********************************************************************/

     useEffect(() => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'payment/completed-transactions/', {}, {
            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,
            }
        })
            .then(function (response) {
                console.log("Recipients APIIIII", response.data);
                setData(response.data);
                console.log(data)
                setLoading(false); // Stop loading
  
            })
            .catch(function (error) {
                console.log(error);
                console.log(error.response);
                setLoading(false); // Stop loading in case of error
            })

        }, [])

    console.log(data, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

     /**************************************************************************
    * ************** Start-- get data Profile ****************************
    * ***********************************************************************/

        useEffect(() => {

            axios.post(API.BASE_URL + 'user-profile/', {}, {
            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,

            }
            })
            .then(function (response) {
                console.log("Recipients APIIIII", response.data);
                setFirstName(response.data.data.First_name);
                
            })
            .catch(function (error) {
                console.log(error);
                console.log(error.response);
            })
        }, [])



    return (
        <>

            {/* <!-- ======= help Remitassure Change password -Section  start======= --> */}

            {
                LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (
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
                                                                        <NavLink to={"/addnewrecipient"} >
                                                                            <BsFillPersonPlusFill />
                                                                        </NavLink>
                                                                    </div>

                                                                </div>
                                                                <div className="mt-3">
                                                                    <NavLink to="/userrecipients" className="btn btn-outline-dark btn-rounded">
                                                                        View
                                                                    </NavLink>

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
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <NavLink to="/usersendmoney" className="btn btn-outline-dark btn-rounded">
                                                                        View
                                                                    </NavLink>
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
                                                                    <NavLink to="/userprofile" className="btn btn-outline-dark btn-rounded">
                                                                        View
                                                                    </NavLink>
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
                                                                transactionData.data?.map((res, index) => {
                                                                    //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <h6 className="fs-16 text-black font-w400 mb-0">{res.date}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">{res.recipient_name}</a></h6>
                                                                                <span className="fs-14">Transfer</span>
                                                                            </td>
                                                                            <td><span className="fs-16 text-black font-w500">${res.amount}</span></td>
                                                                            <td>
                                                                                <span className="text-success fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-success btn-rounded">{res.status}</a></span>
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
                                                                <a href="#/userdashboard" className="send_money">Send Money</a>
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

                                                    {data?.length != 0 ? (
                                                    <table className="table table-responsive-md card-table previous-transactions">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                data.data?.map((res, index) => {
                                                                    return (

                                                                        <tr>
                                                                            <td>
                                                                                <div class="me-auto">
                                                                                    <h6 class="fs-16 font-w600 mb-0">{res.recipient_name}</h6>
                                                                                    <span class="fs-12">{res.date}</span>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <span class="fs-16 text-black font-w600"><BiDollarCircle />
                                                                                    $
                                                                                    {Total_amount}
                                                                                </span>
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
                        

                                                    
                                                    {data?.length == 0 ? (
                                                        <>
                                                            <section>
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="add-rec-new">
                                                                            <img src={norecipients} alt="empty" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                 <div className={isActive ? "add-recipent-section" : "remove-add-recipent-section"}>

                                                                    <div className="col-md-12 align-center">
                                                                        <NavLink to="/addnewrecipient">
                                                                            <button className="form-button addsingle_recepient" >
                                                                                <BsFillPersonPlusFill />
                                                                                Add New Recepients
                                                                            </button>
                                                                        </NavLink>
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


                                    </section>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Page404 />
                    </>
                )
            }


            {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}

        </>
    )
}



export default Dashboard;