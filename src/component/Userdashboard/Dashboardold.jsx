import React, { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import {Links, NavLink, useNavigate} from 'react-router-dom';

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { FcProcess } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { BiDollarCircle } from "react-icons/bi";
import Sidebar from './Sidebar';


const Dashboard = () => {
    
  /**************************token ************************ */
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)
    

/**************************Feild of state ************************ */
 
    return(
        <>

          {/* <!-- ======= help Remitassure Change password -Section  start======= --> */}

          {  
          verification_otp || token != undefined || '' ? (
            <>
 <div  className="margin-set">
    <div  className="tabs-page">
        <Sidebar/>
            <div className="content-body">
                    <section className="dashboard">
                    <div className="row">
                    <div className="col-md-12">     
            <div class="form-head mb-4">
                <h2 class="text-black font-w600 mb-0"><b>Welcome, <span style={{"color" :"#6414e9"}}>Rohit</span></b></h2>
            </div>
    <div className="row g-3">
        <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="dashbord-user dCard-1">
            <div className="dashboard-content">
                <div className="d-flex justify-content-between">
                    <div className="">
                        <div className="top-content">
                            <h3>Completed Transactions</h3>
                        </div>
                        <div className="user-count">
                            <span className="text-uppercase"> $5.900</span>
                        </div>
                    </div>
                    <div className="icon">
                    <FcCheckmark />
                    </div>
                </div>
                <div className="mt-3">
                    <a href="dashboard-transaction.html" className="icon-bottom">
                    <a href="javascript:void(0)" class="btn btn-outline-dark btn-rounded">View</a>
                    </a>
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
                            <h3>Inprogress Transaction</h3>
                        </div>
                        <div className="user-count">
                            <span className="text-uppercase"> $8.900</span>
                        </div>
                    </div>
                    <div className="icon">
                    <FcProcess/>
                    </div>
                </div>
                <div className="mt-3">
                    <a href="dashboard-transaction.html" className="icon-bottom">
                    <a href="javascript:void(0)" class="btn btn-outline-dark btn-rounded">View</a>
                    </a>
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
                        <h3>Canceled Transaction</h3>
                    </div>
                    <div className="user-count">
                        <span className="text-uppercase">$4.500</span>
                    </div>
                </div>
                <div className="icon">
                    <FcCancel/>
                </div>
            </div>
            <div className="mt-3">
                <a href="dashboard-transaction.html" className="icon-bottom">
                <a href="javascript:void(0)" class="btn btn-outline-dark btn-rounded">View</a>
                </a>
            </div>
        </div>
    </div>
    </div>

</div>
 </div>
</div>

    <div className="row">
        <div class="col-xl-8">
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0">
                    <div className="me-3">
                        <h4 className="fs-20 text-black">Previous Transactions</h4>
                        <p className="mb-0 fs-13">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                </div>
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
                        <tr>
                            <td>
                                <h6 className="fs-16 text-black font-w400 mb-0">June 4, 2020</h6>
                            </td>
                            <td>
                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">XYZ Store ID</a></h6>
                                <span className="fs-14">Transfer</span>
                            </td>
                            <td><span className="fs-16 text-black font-w500">+$5,553</span></td>
                            <td>
                                <span className="text-success fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-success btn-rounded">Completed</a></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6 className="fs-16 text-black font-w400 mb-0">June 5, 2020</h6>
                            </td>
                            <td>
                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">Chef Renata</a></h6>
                                <span className="fs-14">Transfer</span>
                            </td>

                            <td><span className="fs-16 text-black font-w500">-$167</span></td>
                            <td>
                                <span className="text-warning fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-warning btn-rounded">Pending</a></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6 className="fs-16 text-black font-w400 mb-0">June 5, 2020</h6>
                            </td>
                            <td>
                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">Cindy Alexandro</a></h6>
                                <span className="fs-14">Transfer</span>
                            </td>

                            <td><span className="fs-16 text-black font-w500">+$5,553</span></td>
                            <td>
                                <span className="text-dark fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-danger btn-rounded">Canceled</a></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6 className="fs-16 text-black font-w400 mb-0">June 5, 2020</h6>
                            </td>
                            <td>
                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">Paipal</a></h6>
                                <span className="fs-14">Transfer</span>
                            </td>

                            <td><span className="fs-16 text-black font-w500">+$5,553</span></td>
                            <td>
                                <span className="text-success fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-success btn-rounded">Completed</a></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6 className="fs-16 text-black font-w400 mb-0">June 4, 2020</h6>
                            </td>
                            <td>
                                <h6 className="fs-16 font-w600 mb-0"><a href="/transactions-details/" className="text-black">Hawkins Jr.</a></h6>
                                <span className="fs-14">Transfer</span>
                            </td>

                            <td><span className="fs-16 text-black font-w500">-$167</span></td>
                            <td>
                                <span className="text-dark fs-16 font-w500 text-end d-block"> <a href="javascript:void(0)" className="btn btn-outline-danger btn-rounded">Canceled</a></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-xl-4">
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0">
                    <div className="me-3">
                        <h4 className="fs-20 text-black">Frequent Recipients</h4>
                        <p className="mb-0 fs-13">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                </div>
                <table className="table table-responsive-md card-table previous-transactions">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="me-auto">
                                    <h6 class="fs-16 font-w600 mb-0">FSoziety</h6>
                                    <span class="fs-12">June 4, 2020</span>
                                </div>
                            </td>

                            <td>
                                <span class="fs-16 text-black font-w600"><BiDollarCircle /> $45</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="me-auto">
                                    <h6 class="fs-16 font-w600 mb-0">FSoziety</h6>
                                    <span class="fs-12">June 4, 2020</span>
                                </div>
                            </td>

                            <td>
                                <span class="fs-16 text-black font-w600"><BiDollarCircle /> $45</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="me-auto">
                                    <h6 class="fs-16 font-w600 mb-0">FSoziety</h6>
                                    <span class="fs-12">June 4, 2020</span>
                                </div>
                            </td>

                            <td>
                                <span class="fs-16 text-black font-w600"><BiDollarCircle /> $45</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="me-auto">
                                    <h6 class="fs-16 font-w600 mb-0">FSoziety</h6>
                                    <span class="fs-12">June 4, 2020</span>
                                </div>
                            </td>

                            <td>
                                <span class="fs-16 text-black font-w600"><BiDollarCircle /> $45</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="me-auto">
                                    <h6 class="fs-16 font-w600 mb-0">FSoziety</h6>
                                    <span class="fs-12">June 4, 2020</span>
                                </div>
                            </td>

                            <td>
                                <span class="fs-16 text-black font-w600"><BiDollarCircle /> $45</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            
            </>
        )
        }


        {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}
          
        </>
    )
}



export default Dashboard;