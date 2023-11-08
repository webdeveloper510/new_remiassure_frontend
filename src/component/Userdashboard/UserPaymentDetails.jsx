import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Button, Table } from 'react-bootstrap'
import { getAgreementList, getPayID } from '../../utils/Api'
import { toast } from 'react-toastify'

const UserPaymentDetails = () => {

    const user_data = JSON.parse(localStorage.getItem("remi-user-dt"));
    const [pay_id_details, setPayIdDetails] = useState({ pay_id: null, email: null });
    const [agreement_details, setAgreementDetails] = useState({});
    const [copied, setCopied] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        getPayID().then(res => {
            if (res?.code === "200") {
                setPayIdDetails({ pay_id: res?.data?.payid, email: res?.data?.zai_email })
            }
        })
        getAgreementList().then(res => {
            setLoader(false)
            if (res?.code === "200") {
                setAgreementDetails(res?.data)
            }
        })
    }, [])

    const dateFormat = (date) => {
        let split = date.split("-");
        return split[2] + "-" + split[1] + "-" + split[0]
    }


    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        setCopied(true)
    }

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 3000)
        }
    }, [copied])

    return (
        <div className="margin-set">
            <div className="tabs-page">
                <Sidebar />
                <div className="content-body">
                    <section>
                        <div className="form-head mb-4">
                            <span className="text-black font-w600 mb-0 h2"><b>Payment Details</b>
                            </span>
                        </div>

                        {!loader ? (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className='form_body h-100'>
                                        <div className='text-center fw-semibold my-4 fs-5'>
                                            Pay ID Details
                                            <hr />
                                        </div>
                                        {
                                            pay_id_details.pay_id !== null ? (
                                                <div>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Pay ID:</td>
                                                                <td>{pay_id_details?.pay_id}
                                                                    <span>
                                                                        <Button type='button' className='mx-2 px-2 py-0 clipboard-button' variant={copied ? 'outline-success' : 'outline-secondary'} onClick={() => copyToClipboard(pay_id_details.pay_id)}>
                                                                            {
                                                                                copied ?
                                                                                    <>
                                                                                        <i class="bi bi-clipboard"></i>
                                                                                        <span className="tooltip-clipboard">Copied!</span>
                                                                                    </> : <>
                                                                                        <i class="bi bi-clipboard"></i>
                                                                                        <span className="tooltip-clipboard">Copy</span>
                                                                                    </>
                                                                            }
                                                                        </Button>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Customer ID:</td>
                                                                <td>{user_data?.customer_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email:</td>
                                                                <td>{pay_id_details?.email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            ) : (<>No Pay ID registered</>)
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='form_body h-100'>
                                        <div className='text-center fw-semibold my-4 fs-5'>
                                            Pay To Agreement Details
                                            <hr />
                                        </div>
                                        {
                                            Object.keys(agreement_details).length > 0 ? (
                                                <div>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Agreement ID:</td>
                                                                <td>{agreement_details?.agreement_uuid}</td>
                                                            </tr>
                                                            {
                                                                agreement_details?.account_id_type === "PAYID" ? (
                                                                    <>
                                                                        <tr>
                                                                            <td>Pay ID:</td>
                                                                            <td>{agreement_details?.payid}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Pay ID Type:</td>
                                                                            <td>{agreement_details?.payid_type}</td>
                                                                        </tr>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <tr>
                                                                            <td>Account Number:</td>
                                                                            <td>{agreement_details?.account_number}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>BSB Code:</td>
                                                                            <td>{agreement_details?.bsb_code}</td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            }
                                                            <tr>
                                                                <td>Amount Limit:</td>
                                                                <td>${agreement_details?.max_amount === "1000" ? "1k" : agreement_details?.max_amount === "5000" ? "5k" : agreement_details?.max_amount === "10000" ? "10k" : "30k"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Start Date:</td>
                                                                <td>{dateFormat(agreement_details?.agreement_start_date)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            ) : (
                                                <> No Agreement created</>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="loader-overly">
                                <div className="loader" >
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div >
        </div >
    )
}

export default UserPaymentDetails