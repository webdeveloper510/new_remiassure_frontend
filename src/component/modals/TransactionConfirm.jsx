import React from 'react'
import { Modal, Table } from 'react-bootstrap'

const TransactionConfirm = ({ data, handleCancel, handleContinue }) => {
    console.log(data)
    return (
        <Modal show={data?.toggle} onHide={() => handleCancel()}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Review Your Transfer</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Table className='recipint-details-popup'>
                    <thead>
                        <tr>
                            <th colSpan={2} className="popup-heading">Transfer Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Amount Sending</th>
                            <td>{data?.data?.amount?.from_type}&nbsp;{data?.data?.amount?.send_amt}</td>
                        </tr>
                        <tr>
                            <th>Amount Exchanged</th>
                            <td>{data?.data?.amount?.to_type}&nbsp;{data?.data?.amount?.exchange_amt}</td>
                        </tr>
                        <tr>
                            <th>Total Cost</th>
                            <td>{data?.data?.amount?.from_type}&nbsp;{data?.data?.amount?.send_amt}</td>
                        </tr>
                        <tr>
                            <th>Total To Recipient</th>
                            <td>{data?.data?.amount?.to_type}&nbsp;{data?.data?.amount?.exchange_amt}</td>
                        </tr>
                        <tr>
                            <th>Exchange Rate</th>
                            <td>1 {data?.data?.amount?.from_type} = {data?.data?.amount?.exchange_rate}&nbsp;{data?.data?.amount?.to_type}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan={2} className="popup-heading">Transfer To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Beneficiary Name</th>
                            <td>{data?.data?.recipient?.first_name} {data?.data?.recipient?.middle_name !== "" ? data?.data?.recipient?.middle_name : ""} {data?.data?.recipient?.last_name}</td>
                        </tr>
                        <tr>
                            <th>Bank Name</th>
                            <td>{data?.data?.amount?.part_type === "other" ? data?.data?.amount?.payout_part : data?.data?.amount?.part_type}</td>
                        </tr>
                        {
                            data?.data?.receive_method ? (
                                <tr>
                                    <th>Receive Method</th>
                                    <td>{data?.data?.receive_method === "PayByID" ? "Pay ID" : data?.data?.receive_method}</td>
                                </tr>
                            ) : <></>
                        }
                        {
                            data?.data?.reason ? (
                                <tr>
                                    <th>Reason</th>
                                    <td>{data?.data?.reason}</td>
                                </tr>
                            ) : <></>
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer className='full-col'>
                <button className="start-form-button" variant="secondary" onClick={() => handleCancel()}>
                    Back
                </button>
                <button className="form-button detail_buttoon" type="button" variant="primary" onClick={() => handleContinue()}>Continue</button>
            </Modal.Footer>
        </Modal>
    )
}

export default TransactionConfirm