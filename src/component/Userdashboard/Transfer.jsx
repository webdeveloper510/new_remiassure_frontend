
import React, { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllTransfer from "./AllTransfer";
import { transactionHistory } from "../../utils/Api";

const Transaction = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        transactionHistory().then((res) => {
            if (res.code == "200") {
                setData(res.data)
                setLoading(false)
            } else {
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <div className="content-body">
                <section className="transfer-history-section">
                    <div className="form-head mb-4">
                        <h2 className="text-black font-w600 mb-0"><b>Transaction History</b></h2>
                    </div>
                    <div className="transaction-progress">
                        {!loading ? (
                            <>
                                <Tabs defaultActiveKey="AllTransaction" id="uncontrolled-tab-example" className="mb-3 tarnsfer-tabs">
                                    <Tab eventKey="AllTransaction" title="All Transactions">
                                        <AllTransfer status={"all"} data={data} />
                                    </Tab>
                                    <Tab eventKey="Pending" title="Pending">
                                        <AllTransfer status={"pending"} data={data} />
                                    </Tab>
                                    <Tab eventKey="Completed" title="Completed">
                                        <AllTransfer status={"completed"} data={data} />
                                    </Tab>
                                </Tabs>
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
                    </div>
                </section>
            </div>
        </>
    )
}



export default Transaction;