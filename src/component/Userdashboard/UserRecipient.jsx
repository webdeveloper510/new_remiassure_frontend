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


const UserRecipients = () => {

    /********************  Start page show hide condtion page ******** */
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);

    const LoginDigitalidVerified = localStorage.getItem("LoginDigitalidVerified");
    console.log("LoginDigitalidVerified", LoginDigitalidVerified)

    const signup_token = localStorage.getItem("signup_token")
    console.log("signup_token", signup_token);

    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp)

    const RecipientUserName = localStorage.getItem("RecipientUserName");
    console.log("RecipientUserName", RecipientUserName);

    const DigitalCode = localStorage.getItem("DigitalCode");
    console.log("DigitalCode", DigitalCode);


    /********************State ******** */

    const [show, setShow] = useState(false);
    const [delete_id, setDelete_Id] = useState('');
    const handleClose = () => setShow(false);

    const handleShow = (key) => {
        console.log("******==>", key)
        setShow(true);
        setDelete_Id(key)
    }


    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive);
    };



    // const RecepientsData = localStorage.getItem("RecepientsData");
    // console.log("RecipientUserName", RecepientsData);

    // Start page show hide condtion page


    const [data, setData] = useState([]);
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
        getList();
    }, [])

    const getList = () => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'payment/recipient-list/', {}, {
            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,
            }
        })
            .then(function (response) {
                console.log("Recipients APIIIII", response.data);
                setData(response.data);
                console.log(data)
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

    console.log(data, " recipient-listrecipient-listrecipient-listrecipient-list")

    /**************************************************************************
     * ************** Start  Recipient List Delete ****************************
     * ***********************************************************************/

    let id;
    {/* start- delete function */ }
    const handleRemoveRecipientBankDetails = (value) => {
        console.log("==============>======456768768", value)

        // if (window.confirm('Do you wnat to remove?')) {
        // setLoading(true); // Set loading before sending API request
        axios.delete(API.BASE_URL + `payment/recipient-update/${value}`, {

            headers: {
                "Authorization": `Bearer ${signup_token ? signup_token : token}`,
            },

        })
            .then(function (response) {
                console.log("=======success", response);
                handleClose()
                getList();
                // window.location.reload(false);
                // alert('Remove Successfully.')
                // setLoading(false); // Stop loading 
                // navigate('/userrecipients');   


            })
            .catch(function (error, message) {
                console.log(error.response);
                // setLoading(false); // Stop loading in case of error


            })
    }


    return (
        <>
            {/* <!-- ======= Recept RemitAssure-Section start ======= --> */}
          {
            LoginDigitalidVerified == 'true' || DigitalCode != undefined || ''? (

           <section>
                <div className="margin-set">
                    <div className="tabs-page">
                        <Sidebar />
                        <div className="content-body">
                            {data?.length != 0 ? (
                                <section className="user_recipients_section">
                                    <div class="form-head mb-4">
                                        <h2 class="text-black font-w600 mb-0"><b>Recipients Lists</b>
                                            <NavLink to="/addnewrecipient">
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
                                                            data.data?.map((res, index) => {
                                                                //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                                                return (

                                                                    <tr key={res.id}>

                                                                        <td>{index + 1}</td>
                                                                        <td>{res.name}</td>
                                                                        <td>{res.destination}</td>
                                                                        <td>{res.transfer_now}</td>
                                                                        <td>
                                                                            <button className="btn btn-danger" onClick={() => handleShow(res.id)}><i class="fa fa-trash"></i> Delete</button>
                                                                            <button className="btn btn-primary" onClick={() => { LoadEdit(res.id) }}><i class="fa fa-pencil color-muted"></i> Edit</button>
                                                                            <button className="btn btn-secondary" onClick={() => { LoadSinglProfile(res.id) }} ><i class="fa fa-eye color-muted"></i> View</button>
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
                                </>
                            )
                            }



                            { data?.length !=undefined && data?.length == 0 ? (
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
                            }


                        </div>
                    </div>
                </div>
            </section>

            ) : (
                <>
                <Page404 />
                </>
            )
            }

            {/* <!-- ======= Recept RemitAssure-Section End ======= --> */}

        </>
    )
}



export default UserRecipients;