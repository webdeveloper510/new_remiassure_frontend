import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Links, NavLink, useNavigate, useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import nocard from "../../assets/img/userdashboard/nocard.jpg";
import Page404 from "../pageNotfound/Page404";
import { cardList } from "../../utils/Api";


const UserCardLists = () => {

    /***************************Start page show hide condtion pages ************************/
    const token = localStorage.getItem("token");

    // Start page show hide condtion page
    const [carddata, setCarddata] = useState([]);
    const [RecepientsData, setRecepientsData] = useState('');
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [delete_id, setDelete_Id] = useState('');

    const handleShow = (key) => {
        console.log("=========>cardDelete", key)
        setShow(true);
        setDelete_Id(key)
    }

    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive);
    };

    const LoadEditCard = (id) => {
        navigate(`/edit-card-user/${id}`);
    }

    const LoadSinglCardData = (id) => {
        navigate(`/single-card-data/${id}`);
    }

    const navigate = useNavigate();

    useEffect(() => {
        getList();

    }, [])

    const getList = () => {
        setLoading(true); // Set loading before sending API request
        cardList().then((res)=>{
            console.log("response=====",res)
            setCarddata(res)
            setLoading(false)
        }).catch((error)=>{
            console.log(error.response)
            setLoading(false)
        })
        // axios.post(API.BASE_URL + 'payment/card-list/', {}, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //     }
        // })
        //     .then(function (response) {
        //         console.log("Recipients APIIIII", response.data);
        //         setCarddata(response.data);
        //         console.log(carddata)
        //         localStorage.setItem("RecepientsData", JSON.stringify(response.data.data))
        //         setLoading(false); // Stop loading
        //         //   if (response.status)
        //         // // notify();
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         console.log(error.response);
        //         setLoading(false); // Stop loading in case of error
        //     })
    }
    console.log("setCarddata",carddata)


    {/* start- delete function */ }
    const handleRemovecardDetails = (value) => {
        console.log("========>Delete", value)

        axios.delete(API.BASE_URL + `payment/card/${value}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                console.log(response);
                handleClose()
                getList();
            })
            .catch(function (error, message) {
                console.log(error.response);
            })
    }

    return (
        <>
            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        {loading ? <>
                            <div class="loader-overly">
                                <div class="loader" >
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
                                    <div class="loader-overly">
                                        <div class="loader" >
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