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
const InprogressTransfer = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        
        <div className="card">
        <div className="card-header d-block d-sm-flex border-0">
                            <div className="me-3">
                                <h4 className="fs-20 text-black">InProgress Transaction</h4>
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
        <th>Recipient</th>
         <th>Status</th>
      </tr>
    </thead>
    <tbody>
       <tr>
        <td>June 4, 2020</td>
        <td>200 AUD</td>
        <td>neha</td>
        <td><span className="btn btn-outline-warning btn-rounded" onClick={handleShow}>InProgress</span></td>
      </tr>
      <tr>
      <td>June 4, 2020</td>
        <td>200 AUD</td>
        <td>neha</td>
        <td><span className="btn btn-outline-warning btn-rounded" onClick={handleShow}>InProgress</span></td>
      </tr>
      <tr>
      <td>June 4, 2020</td>
        <td>200 AUD</td>
        <td>neha</td>
        <td><span className="btn btn-outline-warning btn-rounded" onClick={handleShow}>InProgress</span></td>
      </tr>
      <tr>
      <td>June 4, 2020</td>
        <td>200 AUD</td>
        <td>neha</td>
        <td><span className="btn btn-outline-warning btn-rounded" onClick={handleShow}>InProgress</span></td>
      </tr>
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
                                                <span className="fs-6 pt-1 fw-bold statuspopup">Inprogress</span>
                                                <hr></hr>
                                                <p>Your transaction is Inprogress and we hope to see your again.</p>

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
                                     
                                      </ul>
                                    </div>
                                  </div>
                          
                
          </Modal.Body>
        <Modal.Footer>
          
        <Button variant="secondary" onClick={handleClose}>ok</Button>
        </Modal.Footer>
      </Modal>

  <div className="no-data">
<img src={nodata} alt="no-data"/>

<div className="col-md-12">
      <p><b>No transfers in progress</b></p>  
      </div>  
  </div>

  </div>
  </div>
</div>

</>
)
}



export default InprogressTransfer;