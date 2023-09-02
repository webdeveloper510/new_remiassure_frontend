import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Table, Card, NavLink } from 'react-bootstrap'
import { paymentSummary } from '../../utils/Api'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const TransactionDetails = () => {

    const [detail, setDetails] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        paymentSummary(id).then(res => {
            if (res.code === "200") {
                setDetails(res.data)
            } else if (res.code === "400") {
                setError("We are unable to find the details..")
            }
        })
    }, [])

    const dateCreated = (date) => {
        let d = date.split("-")
        return d[2] + "-" + d[1] + "-" + d[0]
    }

    return (
        <div className="margin-set">
            <div className="tabs-page">
                <Sidebar />
                <div className="content-body">
                    <section className="transfer-history-section">
                        <div className="form-head mb-4">
                            <h2 className="text-black font-w600 mb-0"><b>Transaction Detail</b></h2>
                        </div>
                        <div className="transaction-progress">
                            {/* <div className="row mx-2">
                                <Card>
                                    <Card.Body className='d-grid text-center'>
                                        <div className="col-md-5 col-sm-12 my-2 col-lg-5">
                                            <span >FROM</span>
                                            <span className='my-2 fs-4 fw-semibold text-capitalize'>{detail?.customer_name ? detail?.customer_name : "N/A"}</span>
                                        </div>
                                        <div className="col-md-2 col-sm-12 trans-detail-arrow my-2 col-lg-2">
                                            <div className='px-2 py-1 rounded-circle'>
                                                <span className='text-light fw-semibold display-6'>&rarr;</span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 my-2 col-lg-5">
                                            <span>TO</span>
                                            <span className='my-2 fs-4 fw-semibold text-capitalize'>{detail?.recipient_name ? detail?.recipient_name : "N/A"}</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div> */}
                            <div className="row mx-2">
                                <Card>
                                    <Card.Body>
                                        <div className="row my-4">
                                            <div className='d-grid col-md-3 my-1 border-end'>
                                                <span className='fs-6'>Send Amount</span>
                                                <span className='fw-semibold fs-4'>{detail?.send_amount ? "$" + detail?.send_amount : "N/A"} <span className=' fs-6'>{detail?.send_currency}</span></span>
                                            </div>
                                            <div className='d-grid my-1 col-md-3 border-end'>
                                                <span className='fs-6'>Received Amount</span>
                                                <span className='fw-semibold fs-4'>{detail?.send_amount ? "$" + detail?.receive_amount : "N/A"} <span className=' fs-6'>{detail?.receive_currency}</span></span>
                                            </div>
                                            <div className='d-grid my-1 col-md-3'>
                                                <span className='fs-6'> Exchange Rate</span>
                                                <span className='fw-semibold d-grid'><span className='fs-4'>{detail?.exchange_rate ? detail?.exchange_rate : "N/A"}</span><span className='small'>{detail?.send_currency} &rarr; {detail?.receive_currency}</span></span>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='d-grid fs-6 my-1 col-md-2'>
                                                <span>Status</span>
                                                <span className='fw-semibold small'>{detail?.payment_status ? detail?.payment_status : "N/A"}</span>
                                            </div>
                                            <div className='d-grid fs-6 my-1 col-md-2'>
                                                <span>Date Created</span>
                                                <span className='fw-semibold small'>{detail?.date ? dateCreated(detail?.date) : "N/A"}</span>
                                            </div>
                                            <div className='d-grid fs-6 my-1 col-md-2'>
                                                <span>Transaction Id</span>
                                                <span className='fw-semibold small'>{detail?.transaction_id ? detail?.transaction_id : "N/A"}</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row my-4'>
                                            <div className="col-md-6 col-lg-5 col-sm-12">
                                                <h5>Recipient Details</h5>
                                                <Table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Recipient name:</td>
                                                            <td className='text-capitalize'>{detail?.recipient_name ? detail?.recipient_name : "N/A"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bank name:</td>
                                                            <td className='text-capitalize'>{detail?.bank_name ? detail?.bank_name : "N/A"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Account name:</td>
                                                            <td className='text-capitalize'>{detail?.account_name ? detail?.account_name : "N/A"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Account number:</td>
                                                            <td>{detail?.account_number ? detail?.account_number : "N/A"}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="col-md-6 col-lg-5 col-sm-12">
                                                <h5>More Details</h5>
                                                <Table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Transfer method:</td>
                                                            <td>{detail?.send_method ? detail?.send_method === "zai_payto_agreement" ? "Payto agreement" : detail?.send_method === "zai_payid_per_user" ? "PayID" : detail?.send_method : "N/A"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Customer ID:</td>
                                                            <td>{detail?.customer_id ? detail?.customer_id : "N/A"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Reason:</td>
                                                            <td>{detail?.reason ? detail?.reason : "N/A"}</td>
                                                        </tr>
                                                        {
                                                            detail?.send_method_details !== null ? (
                                                                <>
                                                                    {
                                                                        detail?.send_method_details?.payid ?
                                                                            (
                                                                                <tr>
                                                                                    <td>PayID:</td>
                                                                                    <td>{detail?.send_method_details?.payid ? detail?.send_method_details?.payid : "N/A"}</td>
                                                                                </tr>
                                                                            ) : <></>
                                                                    }
                                                                    {
                                                                        detail?.send_method_details?.bsb_code ?
                                                                            (
                                                                                <tr>
                                                                                    <td>BSB code:</td>
                                                                                    <td>{detail?.send_method_details?.bsb_code ? detail?.send_method_details?.bsb_code : "N/A"}</td>
                                                                                </tr>
                                                                            ) : <></>
                                                                    }
                                                                    {
                                                                        detail?.send_method_details?.account_number ?
                                                                            (
                                                                                <tr>
                                                                                    <td>Account number:</td>
                                                                                    <td>{detail?.send_method_details?.account_number ? detail?.send_method_details?.account_number : "N/A"}</td>
                                                                                </tr>
                                                                            ) : <></>
                                                                    }
                                                                    {
                                                                        detail?.send_method_details?.max_amount ?
                                                                            (
                                                                                <tr>
                                                                                    <td>Max amount per transaction:</td>
                                                                                    <td>{detail?.send_method_details?.max_amount ? detail?.send_method_details?.max_amount : "N/A"}</td>
                                                                                </tr>
                                                                            ) : <></>
                                                                    }
                                                                </>
                                                            ) : <></>
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    )
}

export default TransactionDetails