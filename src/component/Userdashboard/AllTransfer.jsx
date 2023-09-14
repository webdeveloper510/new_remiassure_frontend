import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
import nodata from '../../assets/img/userdashboard/nodata.avif';
// import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import axios from "axios";
import authDashHelper from "../../utils/AuthDashHelper";


const serverUrl = process.env.REACT_APP_API_URL
const AllTranfer = ({ status, data }) => {

  // const token = localStorage.getItem("token");

  // const Total_amount = localStorage.getItem("Total_amount");

  // const TransactionHistoryStatus = localStorage.getItem("TransactionHistoryStatus");

  const [transactionData, setTransactionData] = useState([]);

  // const [summeryData, setSummeryData] = useState([]);

  const navigate = useNavigate();
  // const paymetTransactionId = localStorage.getItem("paymetTransactionId");

  useEffect(() => {
    if (authDashHelper('dashCheck') === false) {
      navigate("/send-money")
    }
    if (data?.length != 0) {
      if (status == "pending") {
        let pending = data.filter((item) => {
          return item.payment_status === "pending payout" || item.payment_status === "pending customer payment" || item.payment_status === "pending AML/Fraud review"
        })
        setTransactionData(pending)

      } else if (status == "completed") {
        let completed = data.filter((item) => {
          return item.payment_status === "completed"
        })
        setTransactionData(completed)
      } else if (status == "cancelled") {
        let completed = data.filter((item) => {
          return item.payment_status === "cancelled" || item.payment_status === "Cancelled"
        })
        setTransactionData(completed)
      } else {
        setTransactionData(data)
      }
    }
    // summrySingleData();
  }, [data])


  // const summrySingleData = () => {
  //   axios.post(serverUrl + '/payment/summary/', {
  //     transaction_id: paymetTransactionId
  //   }, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   })
  //     .then(function (response) {
  //       setSummeryData(response.data.data);
  //     })
  //     .catch(function (error) {
  //     })
  // }

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);

  const modified_date = (date) => {
    let d = date.split("-")
    return d[2] + "-" + d[1] + "-" + d[0]
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="tabs-recipent-new">
            <span>
              {transactionData?.length > 0 ? (
                <div className="table-responsive">
                  <Table className="table table-responsive-md card-table previous-transaction">
                    <thead>
                      <tr>
                        <th>Recipient</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Receipt</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        transactionData?.map((res, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <h6 className="fs-16 font-w600 mb-0">{res?.recipient_name ? res?.recipient_name : "N/A"}</h6>
                              </td>
                              <td className="transaction-icon"><span className="text-uppercase">{res?.send_currency} </span> {res?.amount} </td>
                              <td>{modified_date(res?.date)}</td>
                              <td>{res?.reason}</td>

                              <td>{
                                res?.payment_status === "cancelled" || res?.payment_status === "Cancelled" ? (
                                  <span className="btn btn-outline-danger btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.transaction_id}`)} >{res?.payment_status}</span>

                                ) : (
                                  <span className="btn btn-outline-success btn-rounded custom_status" onClick={() => navigate(`/transaction-detail/${res?.transaction_id}`)} >{res?.payment_status}</span>

                                )
                              }
                              </td>
                              <td>
                                <a href={`${serverUrl}/payment/receipt/${res?.id}`} target="_blank">
                                  <span className="btn btn-outline-success btn-rounded" >Download</span>
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <>
                  <div className="no-data">
                    <img src={nodata} alt="no-data no-data-transaction" height="400px" />
                    <div className="col-md-12">
                    </div>
                    <div className="col-md-12">
                      {
                        status === "completed" || "all" ? (
                          <NavLink to="/user-send-money" className="send_money">Send Money</NavLink>
                        ) : (
                          <></>
                        )
                      }
                    </div>
                  </div>
                </>
              )
              }
            </span>

            {/* <Modal show={show} onHide={handleClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="card-text">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="trsnsfer-process">
                        <h4 className="text-capitalize">Recipient Name-{summeryData?.recipient_name}</h4>
                        <span>SENT- {summeryData?.date}</span>
                      </div>
                    </div>
                    <div className="my-auto transac-text">
                      <span className="text-white fs-6 pb-2">Transaction ID -{paymetTransactionId}</span>
                      <span className="fs-6 pt-1 statuspopup">Status - <span className="badge bg-success"> {TransactionHistoryStatus}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <hr></hr>
                </div>
                <div className="col-md-12">
                  <div className="justify-content-between recipent-detailpopup">
                    <h6>Recipient Detail</h6>
                    <hr></hr>
                    <ul>
                      <li>
                        <label>Recipient Name</label>
                        <p>{summeryData?.recipient_name}</p>
                      </li>
                      <li>
                        <label>Recipient Phone</label>
                        <p>{summeryData?.recipient_mobile}</p>
                      </li>
                      <li>
                        <label>Reason For Sending</label>
                        <p>{summeryData?.reason}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="justify-content-between recipent-detailpopup">
                    <h6>Amount & Delivery</h6>
                    <hr></hr>
                    <ul>
                      <li>
                        <label>Amount</label>
                        <p>{summeryData?.send_amount} <span>{summeryData?.send_currency}</span></p>
                      </li>
                      <li>
                        <label>They Receive</label>
                        <p>{Total_amount}<span>{summeryData?.receive_currency}</span></p>
                      </li>
                      <li>
                        <label>Sent on</label>
                        <p>{summeryData?.date}</p>
                      </li>
                      <li>
                        <label>Received Method</label>
                        <p>{summeryData?.send_method}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="justify-content-between recipent-detailpopup">
                    <h6>Payment Details</h6>
                    <hr></hr>
                    <ul>
                      <li>
                        <label>Payment type</label>
                        <p>{summeryData?.send_method}</p>
                      </li>
                      <li>
                        <label>Name on your account</label>
                        <p>{summeryData?.account_name}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>ok</Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default AllTranfer;


