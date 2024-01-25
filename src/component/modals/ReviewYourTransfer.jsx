import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { commaSeperator } from '../../utils/hook'

const ReviewYourTransfer = ({ data, discount, handleCancel, handleContinue }) => {


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])

    const [user_data, setUserData] = useState(JSON.parse(sessionStorage.getItem("remi-user-dt")))

    return (
        <div className='col-md-12 d-grid m-0 p-0' style={{ placeItems: "center" }}>
            <div className="form-head mb-4">
                <h2 class="text-black font-w600 mb-0"><b>{!data?.data?.reason ? "Review Your Transfer" : "Confirm Your Transfer"}</b>
                </h2>
            </div>
            <div className='card w-100'>
                <div className='card-body'>
                    <div className='w-100 review_transfer_head'>
                        <b className="text-start fs-5">Transfer Details</b>
                    </div>
                    <div className="row my-4">
                        <div className="col-md-6">
                            <div className="review_transfer_field my-3">
                                <span>Amount Sending</span>
                                <th className='float-end'>{data?.data?.amount?.from_type}&nbsp;{data?.data?.amount?.send_amt !== "" && data?.data?.amount?.send_amt !== undefined && data?.data?.amount?.send_amt !== null ? commaSeperator(data?.data?.amount?.send_amt) : data?.data?.amount?.send_amt}</th>
                            </div>
                            <div className="review_transfer_field my-3">
                                <span>Amount Exchanged</span>
                                <th className='float-end'>{data?.data?.amount?.to_type}&nbsp;{data?.data?.amount?.exchange_amt !== "" && data?.data?.amount?.exchange_amt !== undefined && data?.data?.amount?.exchange_amt !== null ? commaSeperator(data?.data?.amount?.exchange_amt) : data?.data?.amount?.exchange_amt}</th>
                            </div>
                            <div className="review_transfer_field my-3 text-success">
                                <span>Discount Applied</span>
                                <th className='float-end'> <span>{data?.data?.amount?.from_type}</span>&nbsp;{discount?.discount_amount}&nbsp;{discount?.type?.toLowerCase() === "invite" ? "(Refferal discount)" : `(${discount?.type} discount)`}</th>
                            </div>
                            <input
                                className='form-control'
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="review_transfer_field my-3">
                                <span>Total Cost</span>
                                <th className='float-end'>{data?.data?.amount?.from_type}&nbsp;{discount?.final_amount}</th>
                            </div>
                            <div className="review_transfer_field my-3">
                                <span>Total To Recipient</span>
                                <th className='float-end'>{data?.data?.amount?.to_type}&nbsp;{data?.data?.amount?.exchange_amt !== "" && data?.data?.amount?.exchange_amt !== undefined && data?.data?.amount?.exchange_amt !== null ? commaSeperator(data?.data?.amount?.exchange_amt) : data?.data?.amount?.exchange_amt}</th>
                            </div>
                            <div className="review_transfer_field my-3">
                                <span>Exchnage Rate</span>
                                <th className='float-end'>1 {data?.data?.amount?.from_type} = {data?.data?.amount?.exchange_rate !== "" && data?.data?.amount?.exchange_rate !== undefined && data?.data?.amount?.exchange_rate !== null ? commaSeperator(data?.data?.amount?.exchange_rate) : data?.data?.amount?.exchange_rate}&nbsp;{data?.data?.amount?.to_type}</th>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='w-100 review_transfer_head'>
                                <b className="text-start fs-5">Transfer From </b><small>(Sender Details)</small>
                            </div>
                            <div className="review_transfer_field mt-4">
                                <span>Sender Name</span>
                                <th className='float-end'>{user_data?.First_name}&nbsp;{user_data?.Last_name}</th>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='w-100 review_transfer_head mb-4'>
                                <b className="text-start fs-5">Transfer To </b><small>(Recipient Details)</small>
                            </div>
                            <div className="review_transfer_field mt-4">
                                <span>Beneficiary Name</span>
                                <th className='float-end'>{data?.data?.recipient?.first_name} {data?.data?.recipient?.last_name}</th>
                            </div>
                            <div className="review_transfer_field my-3">
                                <span>Bank Name</span>
                                <th className='float-end'>{data?.data?.amount?.part_type === "other" ? data?.data?.amount?.payout_part : data?.data?.amount?.part_type}</th>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <button className="start-form-button" variant="secondary" onClick={() => handleCancel()}>
                                Back
                            </button>
                        </div>
                        <div className="col-md-8 full-col">
                            <button className="form-button detail_buttoon" type="button" variant="primary" onClick={() => handleContinue()}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewYourTransfer