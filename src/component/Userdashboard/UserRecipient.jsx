import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Links, NavLink, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import Page404 from "../pageNotfound/Page404";
import authDashHelper from "../../utils/AuthDashHelper";
import { recipientList } from "../../utils/Api";


const UserRecipients = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [delete_id, setDelete_Id] = useState('');
    const handleClose = () => setShow(false);
    const [isActive, setActive] = useState("false");
    const [data, setData] = useState([]);
    const [RecepientsData, setRecepientsData] = useState('');
    const [loading, setLoading] = useState(true);

    const handleShow = (key) => {
        setShow(true);
        setDelete_Id(key)
    }

    const handleToggle = () => {
        setActive(!isActive);
    };

    const LoadEdit = (id) => {
        navigate(`/edit-recipient-user/${id}`);
    }

    const LoadSinglProfile = (id) => {
        navigate(`/profile-single-data/${id}`);
    }

    const getList = () => {
        setLoading(true);
        recipientList().then((res)=>{
            console.log("response=====",res)
            setData(res.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error.response)
            setLoading(false)
        })
        // axios.post(API.BASE_URL + 'payment/recipient-list/', {}, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //     }
        // })
        //     .then(function (response) {
        //         if (response.data.code == "200") {
        //             console.log(response.data.data)
        //             setData(response.data?.data);
        //         }
        //         setLoading(false);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         console.log(error.response);
        //         setLoading(false);
        //     })
    }

    useEffect(() => {
        if (!authDashHelper('dashCheck')) {
            navigate("/send-money")
         }
        getList();
    }, [])

    let id;

    const handleRemoveRecipientBankDetails = (value) => {
        console.log("==============>======456768768", value)
        axios.delete(API.BASE_URL + `payment/recipient-update/${value}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                console.log("=======success", response);
                handleClose()
                getList();
            })
            .catch(function (error, message) {
                console.log(error.response)
            })
    }


    return (
        <>
            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        {/* Start------- Loader functionalty */}
                        {loading ? <>
                            <div class="loader-overly">
                                <div class="loader" >
                                </div>

                            </div>
                        </> : <></>}
                        {/* End------- Loader functionalty */}
                        {
                            !loading ? (
                                <span>
                                    {data?.length != 0 ? (
                                        <section className="user_recipients_section">
                                            <div class="form-head mb-4">
                                                <h2 class="text-black font-w600 mb-0"><b>Recipients Lists</b>
                                                    <NavLink to="/add-new-recipient">
                                                        <button className="form-button addsingle_recepient" >
                                                            <BsFillPersonPlusFill />
                                                            Add New Recepient
                                                        </button>
                                                    </NavLink>
                                                </h2>
                                            </div>


                                            <div className="col-lg-12">
                                                {/* loader start */}

                                                {loading ? <>
                                                    <div class="loader-overly">
                                                        <div class="loader" >

                                                        </div>

                                                    </div>
                                                </> : <></>}
                                                {/* loader End */}

                                                <div className="card">
                                                    <div className="card-body">

                                                        <Table className="table table-responsive-md card-table previous-transaction">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No </th>
                                                                    <th>Name</th>
                                                                    <th>Destination</th>
                                                                    <th>Transfer Now Link</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data?.map((item, index) => {
                                                                        //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                                                        return (

                                                                            <tr key={item.id}>

                                                                                <td>{index + 1}</td>
                                                                                <td>{item.first_name} {item.last_name}</td>
                                                                                <td>{item.country}</td>
                                                                                <td>{item.transfer_now}</td>
                                                                                <td>
                                                                                    <button className="btn btn-danger" onClick={() => handleShow(item.id)}><i class="fa fa-trash"></i></button>
                                                                                    <button className="btn btn-primary" onClick={() => { LoadEdit(item.id) }}><i class="fa fa-pencil color-muted"></i></button>
                                                                                </td>

                                                                            </tr>

                                                                        )
                                                                    })}


                                                            </tbody>
                                                        </Table>


                                                        <Modal show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Delete Recipient</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button className="delete_recipient" variant="danger" onClick={() => { handleRemoveRecipientBankDetails(delete_id) }} >
                                                                    Delete
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>



                                                    </div>
                                                </div>
                                            </div>

                                        </section>
                                    ) : (
                                        <>
                                            <section>
                                                <div class="form-head mb-4">
                                                    <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b></h2>
                                                </div>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="add-rec-new">
                                                            <img src={norecipients} alt="empty" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={isActive ? "add-recipent-section" : "remove-add-recipent-section"}>

                                                    <div className="col-md-12 align-center">
                                                        <NavLink to="/add-new-recipient">
                                                            <button className="form-button addsingle_recepient" >
                                                                <BsFillPersonPlusFill />
                                                                Add New Recepients
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </section>
                                        </>
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
                        {/* {data?.length == 0 ? (
                                <>
                                 <section>
                                        <div class="form-head mb-4">
                                            <h2 class="text-black font-w600 mb-0"><b>Add Recipient</b></h2>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="add-rec-new">
                                                    <img src={norecipients} alt="empty" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={isActive ? "add-recipent-section" : "remove-add-recipent-section"}>

                                            <div className="col-md-12 align-center">
                                                <NavLink to="/addnewrecipient">
                                                    <button className="form-button addsingle_recepient" >
                                                        <BsFillPersonPlusFill />
                                                        Add New Recepients
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                </section>
                                </>
                            ) : (
                                <>
                                </>
                            )
                            } */}
                    </div>
                </div>
            </div>

            {/* <!-- ======= Recept RemitAssure-Section End ======= --> */}

        </>
    )
}

export default UserRecipients;