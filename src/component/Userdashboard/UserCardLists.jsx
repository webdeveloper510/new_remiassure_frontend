import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useNavigate } from 'react-router-dom';
import global from "../../utils/global"
import axios from "axios";
import Sidebar from './Sidebar';
import nocard from "../../assets/img/userdashboard/nocard.jpg";
import { cardList } from "../../utils/Api";


const UserCardLists = () => {

    const token = localStorage.getItem("token");

    const [carddata, setCarddata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [delete_id, setDelete_Id] = useState('');

    const handleShow = (key) => {
        setShow(true);
        setDelete_Id(key)
    }


    const LoadEditCard = (id) => {
        navigate(`/edit-card-user/${id}`);
    }

    const navigate = useNavigate();

    useEffect(() => {
        getList();

    }, [])

    const getList = () => {
        setLoading(true);
        cardList().then((res)=>{
            setCarddata(res)
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
        })
        
    }

    const handleRemovecardDetails = (value) => {

        axios.delete(global.serverUrl + `/payment/card/${value}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                handleClose()
                getList();
            })
            .catch(function (error, message) {
            })
    }

    return (
        <>
            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        {loading ? <>
                            <div className="loader-overly">
                                <div className="loader" >
                                </div>
                            </div>
                        </> : <></>}
                        <section className="user_recipients_section">
                            <div class="form-head mb-4">
                                <h2 class="text-black font-w600 mb-0"><b>Card Lists</b>
                                </h2>

                            </div>
                            {!loading ? (
                                <span>
                                    {carddata?.length > 0 ? (
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <Table className="table table-responsive-md card-table previous-transaction">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.No </th>
                                                                <th>Name</th>
                                                                <th>Card Number</th>
                                                                <th>Exp Month</th>
                                                                <th>Exp Year</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {carddata.data?.map((res, index) => {
                                                                return (
                                                                    <tr key={res.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{res.name}</td>
                                                                        <td>{res.card_number}</td>
                                                                        <td>{res.expiry_month}</td>
                                                                        <td>{res.expiry_year}</td>
                                                                        <td>
                                                                            <button className="btn btn-danger" onClick={() => { handleShow(res.id) }}><i class="fa fa-trash"></i></button>
                                                                            <button className="btn btn-primary" onClick={() => { LoadEditCard(res.id) }}><i class="fa fa-pencil color-muted"></i></button>
                                                                            {/* <button className="btn btn-secondary" onClick={() => { LoadSinglCardData(res.id) }} ><i class="fa fa-eye color-muted"></i> View</button> */}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>


                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete Card</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button className="delete_recipient" variant="danger" onClick={() => { handleRemovecardDetails(delete_id) }} >
                                                                Delete
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 style={{ "text-align": "center", "margin-bottom": "20px" }}>No Saved Cards</h6>
                                                <div className="add-rec-new">
                                                    <img src={nocard} alt="empty" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    }
                                </span>
                            ) : (
                                <>
                                    <div className="loader-overly">
                                        <div className="loader" >
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </section>
                    </div>
                </div>
            </div>

           
        </>
    )
}



export default UserCardLists;