import { faL, faSlash, faUnsorted } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Links, NavLink, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddNewRecipient from "./AddNewRecipient";
import InprogressTransfer from "./InprogressTransfer";
import AllTransfer from "./AllTransfer";
import CompletedTransaction from "./CompletedTransaction";
import Sidebar from './Sidebar';
import Page404 from "../pageNotfound/Page404";
import authChecker from "../../utils/AuthHelper";
import { transactionHistory } from "../../utils/Api";
import authDashHelper from "../../utils/AuthDashHelper";

const Transaction = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState("")


    useEffect(() => {
        if (!authDashHelper('dashCheck')) {
            navigate("/send-money")
        } else {
            transactionHistory().then((res) => {
                console.log(res)
                if (res.code == 200) {
                    setData(res.data)
                } else {
                    setDataLength("none")
                }
            })
        }
    }, [])
    console.log("data----------------------", data)

    /**************************Feild of state ************************ */


    return (
        <>
            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        <section className="transfer-history-section">
                            <div className="form-head mb-4">
                                <h2 className="text-black font-w600 mb-0"><b>Transaction History</b></h2>
                            </div>
                            <div className="transaction-progress">
                                <Tabs defaultActiveKey="AllTransaction" id="uncontrolled-tab-example" className="mb-3 tarnsfer-tabs">
                                    <Tab eventKey="AllTransaction" title="All Transactions">
                                        <AllTransfer status={"all"} data={data} length={dataLength} />
                                    </Tab>
                                    <Tab eventKey="Pending" title="Pending">
                                        <AllTransfer status={"pending"} data={data} length={dataLength} />
                                    </Tab>
                                    <Tab eventKey="Completed" title="Completed">
                                        <AllTransfer status={"completed"} data={data} length={dataLength} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Transaction;