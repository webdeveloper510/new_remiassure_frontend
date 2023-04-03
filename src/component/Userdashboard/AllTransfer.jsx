import React, { useState, useContext, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MultiStepProgressBar from "../userRecipients/MultiStepProgressBar";
import nodata from '../../assets/img/userdashboard/nodata.avif';
import Modal from 'react-bootstrap/Modal';
import playicon from '../../assets/img/home/Group 01.svg';
import playicon2 from '../../assets/img/home/Group 02.svg';

import {Links, NavLink, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";

const AllTranfer = () => {

// Start page show hide condtion page s
const token = localStorage.getItem("token");
console.log("TOKEN", token);

const verification_otp = localStorage.getItem("verification_otp");
console.log("Verification Message", verification_otp)

const RecipientUserName = localStorage.getItem("RecipientUserName");
console.log("RecipientUserName", RecipientUserName);

// Start page show hide condtion page


const [transactionData, setTransactionData] = useState([]);
const [RecepientsData, setRecepientsData] = useState('');
const [loading, setLoading] = useState(false);

//let { id } = useParams();
// console.log(id, "idvalue")

const LoadEdit = (id) => {
    navigate(`/Editrecipientuser/${id}`);
}

const LoadSinglProfile = (id) => {
    navigate(`/profilesingledata/${id}`);
}


const navigate = useNavigate();



// function handleDataStore(){

//   var courses =JSON.parse(localStorage.getItem('courses') || "[]")
//   var course ={
//     // bank_name:bank_name,
//     // account_name:account_name
//   }
//   courses.push(course)

//   localStorage.setItem('courses', JSON.stringify(courses))
// }


// const notify = () => toast.success("User Data Get Successfully!");




    /**************************************************************************
   * ************** Start  Recipient List ************************************
   * ***********************************************************************/

    useEffect(() => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'payment/transaction-history/',{}, {
            headers: {
                "Authorization" : `Bearer ${token}`,
            }
          })
          .then(function(response) {
              console.log("Recipients APIIIII", response.data);
              setTransactionData(response.data);
              localStorage.setItem("RecepientsData", JSON.stringify(response.data.data))
              setLoading(false); // Stop loading
        
        
            //   if (response.status)
            // // notify();
          })
          .catch(function(error) {
              console.log(error);
              console.log(error.response);
              setLoading(false); // Stop loading in case of error
            
          })
    }, [])

console.log(transactionData," nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")






  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        <div className="card">
        <div className="card-header d-block d-sm-flex border-0">
            <div className="me-3">
               <h4 className="fs-20 text-black">All Transaction</h4>
                <p className="mb-0 fs-13">Lorem ipsum dolor sit amet, consectetur</p>
            </div>
         </div>
           <div className="card-body">
        <div className="tabs-recipent-new">

          <Table className="table table-responsive-md card-table previous-transactions">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>customer_id</th>
                <th>reason</th>
                {/* <th>send_currency</th>
                <th>recieve_currency</th> */}
                {/* <th>send_method</th> */}
                <th>transaction_id</th>
                <th>Recipient</th>
                <th>Status</th>
                
              </tr>
            </thead>

            <tbody>
            {
               transactionData.data?.map((res, index) => {
                 //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
             return(
              <tr>
                <td>{res.date}</td>
                <td>{res.amount} <span>AUD</span></td>
                <td>{res.customer_id}</td>
                <td>{res.reason}</td>
                {/* <td>{res.send_currency}</td>
                <td>{res.recieve_currency}</td> */}
                {/* <td>{res.send_method}</td> */}
                <td>{res.transaction_id}</td>
                <td>{res.recipient_name}</td>

                <td><span className="btn btn-outline-success btn-rounded" onClick={handleShow}>{res.status}</span></td>
              </tr>
                          
              )    
            })}
            </tbody>



          </Table>

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
                                                                        <h4 className="text-capitalize">Jhon Danals</h4>
                                                                        <span>SENT MAY 20 2022</span>
                                                                        
                                                                      
                                                                    </div>
                                                                </div>
                                                                

                                                                <div className="my-auto transac-text">
                                                                    <span className="text-white fs-6 pb-2">TRX -
                                                                        12123213</span>
                                                                  
                                                                    <span className="text-white fs-5 pb-2">100.00 USD</span>
                                                                
                                                                    <span className="text-white">1400 AUD</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                        <span className="fs-6 pt-1 fw-bold statuspopup">Delivered</span>
                                                        <hr></hr>
                                                        <p>Your transaction is complete and we hope to see your again.</p>

                                                        <MultiStepProgressBar/>
                                                        </div>
          
                                
                                        <div className="col-md-12 m-top">
                                            <div className="justify-content-between trackicons">
                                              <h6>Track your transfer</h6>
                                              <hr></hr>
                                              <img src={playicon} alt="app-icon" />
                                              <img src={playicon2} alt="app-icon" />
                                            </div>
                                          </div>

                                          <div className="col-md-12">
                                            <div className="justify-content-between recipent-detailpopup">
                                              <h6>Recipient Detail</h6>
                                              <hr></hr>
                                              <ul>
                                              <li>
                                                <label>Recipient Name</label>
                                                <p>Thomas Flumm</p>
                                              </li>
                                              <li>
                                                <label>Recipient Phone</label>
                                                <p>+234 234 233 9994</p>
                                              </li>
                                              <li>
                                                <label>Reason For Sending</label>
                                                <p>Tax payment</p>
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
                                                <p>500 AUD</p>
                                              </li>
                                              <li>
                                                <label>They Receive</label>
                                                <p>340 USD</p>
                                              </li>
                                              <li>
                                                <label>Sent on</label>
                                                <p>Feb 02 2013</p>
                                              </li>
                                              <li>
                                                <label>Received Method</label>
                                                <p>Bank Transfer</p>
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
                                                <p>OSLO</p>
                                              </li>
                                              <li>
                                                <label>Name on your account</label>
                                                <p>John</p>
                                              </li>
                                              </ul>
                                            </div>
                                          </div>
                                  
                        
                  </Modal.Body>
                <Modal.Footer>
                  
                <Button variant="secondary" onClick={handleClose}>ok</Button>
                </Modal.Footer>
              </Modal>
      
        { transactionData?.length == 0 ? (
        <div className="no-data">
            <img src={nodata} alt="no-data"/>
              <div className="col-md-12">
                  <p><b>No transfers yet</b><br></br>Once you send money, we'll show you a detailed list of your transfers here.</p>  
                  </div>  
                  <div className="col-md-12">
                    <a href="#/userdashboard" className="send_money">Send Money</a>
                </div> 
          </div>
              
          ):(
        <>
                
        </>
      )
      }
      </div>
      
</div>
</div>
</>
)
}



export default AllTranfer;