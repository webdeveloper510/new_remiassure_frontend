import React, { useState, useContext, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MultiStepProgressBar from "../userRecipients/MultiStepProgressBar";
import { MdOutlineRotateLeft } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import nodata from '../../assets/img/userdashboard/nodata.avif';
import Modal from 'react-bootstrap/Modal';
import playicon from '../../assets/img/home/Group 01.svg';
import playicon2 from '../../assets/img/home/Group 02.svg';
import { API } from "../../config/API";
import axios from "axios";
import Page404 from "../pageNotfound/Page404";


const CompletedTransaction = () => {

  // Start page show hide condtion page s
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
  console.log("LoginDigitalidVerified", LoginDigitalidVerified)

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)

  const RecipientUserName = localStorage.getItem("RecipientUserName");
  console.log("RecipientUserName", RecipientUserName);

  const signup_token = localStorage.getItem("signup_token")
  console.log("signup_token", signup_token);


  const DigitalCode = localStorage.getItem("DigitalCode");
  console.log("DigitalCode", DigitalCode);

  // Start page show hide condtion page

  const Total_amount = localStorage.getItem("Total_amount");
  console.log("Amonut", Total_amount);

  const completedStatusData = localStorage.getItem("completedStatusData");
  console.log("completedStatusData", "completedStatusData")

  const [transactionCompletedData, setTransactionCompletedData] = useState([]);
  const [RecepientsData, setRecepientsData] = useState('');
  const [loading, setLoading] = useState(false);
  /*************************SummeryData State************************ */
  const [summeryData, setSummeryData] = useState([]);


  const getStatusDataSummary = (value) => {
    localStorage.setItem("completedStatusData", value)
    console.log('getSummeryDataID=================>', value)

    handleShow();
  }



  /**************************************************************************
      * ************** Start  transaction-history List *************************
      * ***********************************************************************/

  useEffect(() => {
    CompleteTransationHistory();
    Summarysingledata();
  }, [])

  const CompleteTransationHistory = () => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/completed-transactions/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII payment/completed-transactions", response.data);
        setTransactionCompletedData(response.data);
        localStorage.setItem("RecepientsData", JSON.stringify(response.data.data))
        setLoading(false); // Stop loading


        //   if (response.status)
        // // notify();
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false); // Stop loading in case of error

      })
  }

  // console.log(transactionCompletedData.data?.length,  "transactionCompletedDatatransactionCompletedData")
  console.log(transactionCompletedData.data, " transactionCompletedDatatransactionCompletedData")


  /**************************************************************************
 * ************** Start  Get DataSummery Lists ****************************
 * ***********************************************************************/
  const paymetTransactionId = localStorage.getItem("paymetTransactionId");
  console.log("paymetTransactionId ====================>", paymetTransactionId);

  useEffect(() => {

    Summarysingledata();
  }, [])

  const Summarysingledata = () => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/summary/', {
      transaction_id: paymetTransactionId
    }, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,

      },

    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setSummeryData(response.data.data);
        console.log(summeryData, "summeryData==========>")
        setLoading(false); // Stop loading


        //   if (response.status)
        // // notify();
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoading(false); // Stop loading in case of error

      })
  }


  console.log(summeryData, " summeryData==========>")


  /**************** start-Design **********************/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>

     {
        LoginDigitalidVerified == 'true' || DigitalCode != undefined || '' ? (

        <div className="card">
          <div className="card-header d-block d-sm-flex border-0">
            <div className="me-3">
              {/* <h4 className="fs-20 text-black">InProgress Transaction</h4> */}
            </div>
          </div>
          <div className="card-body">
            <div className="tabs-recipent-new">
              {/* Start------- Loader functionalty */}
                  {loading ? <>
                    <div className="loader-overly">
                      <div className="loader" >

                      </div>

                      </div>
                  </> : <></>}
              {/* End------- Loader functionalty */}

            {transactionCompletedData.data?.length != 0 ? (
                <Table className="table table-responsive-md card-table previous-transaction">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Recipient</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transactionCompletedData.data?.map((res, index) => {
                        //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                        return (
                          <tr>
                            <td>{res.date}</td>
                            <td>{res.amount}<span>{res.recieve_currency}</span>
                            </td>
                            <td>{res.recipient_name}</td>
                            <td><span className="btn btn-outline-success btn-rounded" onClick={() => getStatusDataSummary(res.status)}>{res.status}</span></td>
                          </tr>
                        )
                      })}

                  </tbody>
                </Table>
              ) : (
                <>
                </>
              )
              }



              <Modal show={show} onHide={handleClose}
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
                          <h4 className="text-capitalize">Recipient Name-{summeryData.recipient_name}</h4>
                          <span>SENT- {summeryData.date}</span>
                        </div>
                      </div>

                      <div className="my-auto transac-text">
                        <span className="text-white fs-6 pb-2">TRX -{paymetTransactionId}</span>

                        {/* <span className="text-white fs-5 pb-2">
                          {summeryData.send_amount} <span>{summeryData.send_currency}</span>
                        </span>
                        <span className="text-white">
                          {Total_amount}<span>{summeryData.recieve_currency}</span>
                        </span> */}
                        <span className="fs-6 pt-1 fw-bold statuspopup">Status - <span className="badge bg-success"> {completedStatusData}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {/* <span className="fs-6 pt-1 fw-bold statuspopup">Status</span>
                    <span className="fs-6 pt-1 fw-bold statuspopup">{completedStatusData}</span> */}
                    <hr></hr>
                    <p>Your transaction is complete and we hope to see your again.</p>

                    <MultiStepProgressBar />
                  </div>


                  <div className="col-md-12 m-top">
                    <div className="justify-content-between trackicons">
                      <h6>Track your transfer</h6>
                      {/* <hr></hr>
                      <img src={playicon} alt="app-icon" />
                      <img src={playicon2} alt="app-icon" /> */}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="justify-content-between recipent-detailpopup">
                      <h6>Recipient Detail</h6>
                      <hr></hr>
                      <ul>
                        <li>
                          <label>Recipient Name</label>
                          <p>{summeryData.recipient_name}</p>
                        </li>
                        <li>
                          <label>Recipient Phone</label>
                          <p>{summeryData.recipient_mobile}</p>
                        </li>
                        <li>
                          <label>Reason For Sending</label>
                          <p>{summeryData.reason}</p>
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
                          <p>{summeryData.send_amount} <span>{summeryData.send_currency}</span></p>
                        </li>
                        <li>
                          <label>They Receive</label>
                          <p>{Total_amount}<span>{summeryData.recieve_currency}</span></p>
                        </li>
                        <li>
                          <label>Sent on</label>
                          <p>{summeryData.date}</p>
                        </li>
                        <li>
                          <label>Received Method</label>
                          <p>{summeryData.send_method}</p>
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
                          <p>{summeryData.send_method}</p>
                        </li>
                        <li>
                          <label>Name on your account</label>
                          <p>{summeryData.account_name}</p>
                        </li>
                      </ul>
                    </div>
                  </div>


                </Modal.Body>
                <Modal.Footer>

                  <Button variant="secondary" onClick={handleClose}>ok</Button>
                </Modal.Footer>
              </Modal>


              
              {transactionCompletedData.data?.length == 0 ? (
                <div className="no-data">
                  <img src={nodata} alt="no-data" />

                  <div className="col-md-12">
                    <p><b>No transfers is Completed</b></p>
                  </div>
                </div>

              ) : (
                <>

                </>
              )
              }




            </div>
          </div>
        </div>
        ):(
        <>
        <Page404 />
        </>
        )
      }

    </>
  )
}



export default CompletedTransaction;