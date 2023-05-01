import React, { useState, useContext, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MultiStepProgressBar from "../userRecipients/MultiStepProgressBar";
import nodata from '../../assets/img/userdashboard/nodata.avif';
import Modal from 'react-bootstrap/Modal';
import playicon from '../../assets/img/home/Group 01.svg';
import playicon2 from '../../assets/img/home/Group 02.svg';
import { BiDollarCircle } from "react-icons/bi";
import { Links, NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import Page404 from "../pageNotfound/Page404";

const AllTranfer = () => {

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

  const TransactionHistoryStatus = localStorage.getItem("TransactionHistoryStatus");
  console.log("TransactionHistoryStatus", TransactionHistoryStatus);



  /*************************transactionData State************************ */
  const [transactionData, setTransactionData] = useState([]);
  const [RecepientsData, setRecepientsData] = useState('');
  const [loading, setLoading] = useState(false);

  /*************************SummeryData State************************ */
  const [summeryData, setSummeryData] = useState([]);

  //let { id } = useParams();
  // console.log(id, "idvalue")

  const LoadEdit = (id) => {
    navigate(`/Editrecipientuser/${id}`);
  }

  const LoadSinglProfile = (id) => {
    navigate(`/profilesingledata/${id}`);
  }

  const getStatusDataSummary = (value) => {
    localStorage.setItem("TransactionHistoryStatus", value)
    console.log('getSummeryDataID=================>', value)

    handleShow();
  }


  const navigate = useNavigate();


  /**************************************************************************
  * ************** Start  transaction-history List *************************
  * ***********************************************************************/

  useEffect(() => {
    PaymentTransactionHostpory();
    SummrySingleData();
  }, [])

  const PaymentTransactionHostpory = () => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/transaction-history/', {}, {
      headers: {
        "Authorization": `Bearer ${signup_token ? signup_token : token}`,
      }
    })
      .then(function (response) {
        console.log("Recipients APIIIII", response.data);
        setTransactionData(response.data);
        // localStorage.setItem("paymetTransactionHistoryId",response.data);
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

  console.log(transactionData, " nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")



  /**************************************************************************
   * ************** Start  Get DataSummery Lists ****************************
   * ***********************************************************************/
  const paymetTransactionId = localStorage.getItem("paymetTransactionId");
  console.log("paymetTransactionId ====================>", paymetTransactionId);

  const UserDashboardTransactionId = localStorage.getItem("UserDashboardTransactionId")
  console.log("UserDashboardTransactionId", UserDashboardTransactionId)

  useEffect(() => {
    SummrySingleData();
  }, [])

  const SummrySingleData = () => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/summary/', {
      transaction_id: paymetTransactionId ? paymetTransactionId: UserDashboardTransactionId,
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

  /*********************** Start- Design *********************/

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
              {/* <h4 className="fs-20 text-black">All Transaction</h4> */}
            </div>
          </div>
          <div className="card-body">
            <div className="tabs-recipent-new">

                {/* Start------- Loader functionalty */}
                {loading ? <>
                           <div class="loader-overly">
                            <div class="loader" >

                            </div>

                            </div>
                        </> : <></>}
                     {/* End------- Loader functionalty */}
              
            {transactionData?.length != 0 ? (
              <Table className="table table-responsive-md card-table previous-transaction">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    {/* <th>Date</th> */}
                    <th>Amount</th>
                    {/* <th>CustomerId</th> */}
                    <th>Reason</th>
                    {/* <th>send_currency</th>
                  <th>recieve_currency</th> */}
                    {/* <th>send_method</th> */}
                    <th>TransactionId</th>

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

                            <h6 className="fs-16 font-w600 mb-0">{res.recipient_name}</h6>
                            <span className="fs-14">{res.date}</span> </td>
                          <td className="transaction-icon">{res.amount} <span>{res.send_currency}</span></td>
                          <td>{res.reason}</td>
                          <td>{res.transaction_id}</td>


                          <td><span className="btn btn-outline-success btn-rounded" onClick={() => { getStatusDataSummary(res.status) }}>{res.status}</span></td>
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
                       {/* <h4>Send Money */}
                       <span className="text-white fs-6 pb-2">Transaction ID -{paymetTransactionId}</span>
                        {/* </h4>  */}

                        {/* <span className="text-white fs-5 pb-2">
                          {summeryData.send_amount} <span>{summeryData.send_currency}</span>
                        </span>
                        <span className="text-white">
                          {Total_amount}<span>{summeryData.recieve_currency}</span>
                        </span> */}
                        <span className="fs-6 pt-1 statuspopup">Status - <span class="badge bg-success"> {TransactionHistoryStatus}</span>
                        </span>

                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    
                    <hr></hr>
                    {/* <p>Your transaction is complete and we hope to see your again.</p>

                    <MultiStepProgressBar /> */}
                  </div>


                  {/* <div className="col-md-12 m-top">
                    <div className="justify-content-between trackicons">
                      <h6>Track your transfer</h6>
                     
                    </div>
                  </div> */}

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

              {transactionData?.length == 0 ? (
                <div className="no-data">
                  <img src={nodata} alt="no-data" />
                  <div className="col-md-12">
                    <p><b>No transfers yet</b><br></br>Once you send money, we'll show you a detailed list of your transfers here.</p>
                  </div>
                  <div className="col-md-12">
                    <a href="#/usersendmoney" className="send_money">Send Money</a>
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



export default AllTranfer;