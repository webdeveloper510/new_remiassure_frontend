import React, { useState, useContext , useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Links, NavLink, useNavigate, useParams} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import Sidebar from './Sidebar';


const UserCardLists =() =>{

    let { id } = useParams();
    // alert(id)
      console.log("========================>",id) ;

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
      setActive(!isActive);
    };

// Start page show hide condtion page s
const token = localStorage.getItem("token");
console.log("TOKEN", token);

const verification_otp = localStorage.getItem("verification_otp");
console.log("Verification Message", verification_otp)

const RecipientUserName = localStorage.getItem("RecipientUserName");
console.log("RecipientUserName", RecipientUserName);


// Start page show hide condtion page
const [carddata, setCarddata] = useState([]);
const [RecepientsData, setRecepientsData] = useState('');
const [loading, setLoading] = useState(false);



// const LoadEditCard = (id) => {
//     navigate(`/EditCardUser/${id}`);
// }

const LoadEditCard = (id) => {
    navigate(`/EditCardUser/${id}`);
}

const LoadSinglCardData = (id) => {
    navigate(`/singleCardData/${id}`);
}

const navigate = useNavigate();

// const notify = () => toast.success("User Data Get Successfully!");




    /**************************************************************************
   * ************** Start  Recipient List ************************************
   * ***********************************************************************/

useEffect(() => {
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/card-list/',{}, {
        headers: {
            "Authorization" : `Bearer ${token}`,
        }
      })
      .then(function(response) {
          console.log("Recipients APIIIII", response.data);
          setCarddata(response.data);
          console.log(carddata)
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

console.log(carddata," nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  /**************************************************************************
   * ************** Start  Recipient List Delete ****************************
   * ***********************************************************************/

{/* start- delete function */}
const handleRemovecardDetails =(id) =>{
    console.log("========>Delete", id)
   
    axios.delete(API.BASE_URL + `payment/card/${id}`, {
        headers: {
          "Authorization" : `Bearer ${token}`,
        },
      
    })
    .then(function(response) {
        console.log(response);
        handleClose()
        window.location.reload(false);
        // alert('Remove Successfully.')
        // setLoading(false); // Stop loading 
       // navigate('/userrecipients');   
       

    })
    .catch(function(error, message) {
        console.log(error.response);
        // setLoading(false); // Stop loading in case of error
       
         
    })
}


    return(
        <>
       {/* <!-- ======= Recept RemitAssure-Section start ======= --> */}
       {/* {  
          verification_otp || token != undefined || '' ? (
            <section className="user_recipients_section">
                <div class="container">
                    <div className="row">
                        <div className="col-lg-12">
                            
                        </div>
                        </div>
                        </div>
                </section>    
            
            ) : (
                <>
                
                </>
            )
            } */}


    {/* {  
        RecipientUserName || token  != undefined || '' ? ( */}
        {/* { data?.length> 0 ? ( */}

            <div  className="margin-set">
            <div  className="tabs-page">
                    <Sidebar/>
              <div className="content-body">
                { carddata?.length != 0 ? (
                    <section className="user_recipients_section">
                        <div class="form-head mb-4">
                        <h2 class="text-black font-w600 mb-0"><b>Card Lists</b>
                        {/* <NavLink to="/addnewrecipient">
                            <button className="form-button addsingle_recepient" >
                                <BsFillPersonPlusFill />
                                Add New Recepients
                           </button>
                        </NavLink> */}
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
                    {/* <h1 className="recipients_lists">Recipients Lists</h1> */}
                    <div className="card">
                    <div className="card-body">
                
                    {/* <div className="col-md-12 align-center">
                        <NavLink to="/addnewrecipient">
                                    <button className="form-button addsingle_recepient" ><BsFillPersonPlusFill /> Add New Recepients</button>
                                    </NavLink>
                                </div> */}
                        <Table  className="table table-responsive-md card-table previous-transaction">
                        <thead>
                                <tr>
                                    <th>Sr.No </th>
                                    <th>Name</th>
                                    <th>Card Number</th>
                                    <th>exp_month</th>
                                    <th>exp_year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                carddata.data?.map((res, index) => {
                                console.log(res, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                    return(

                                        <tr key={res.id}>
                                            <td>{index +1}</td>
                                            <td>{res.name}</td>
                                            <td>{res.number}</td>
                                            <td>{res.exp_month}</td>
                                            <td>{res.exp_year}</td>
                                            <td>
                                            <button className="btn btn-danger" onClick={handleShow}><i class="fa fa-trash"></i> Delete</button> 
                                            <button className="btn btn-primary" onClick={() =>{LoadEditCard(res.id)}}><i class="fa fa-pencil color-muted"></i> Edit</button>
                                            <button className="btn btn-secondary" onClick={() =>{LoadSinglCardData(res.id)}} ><i class="fa fa-eye color-muted"></i> View</button>
                                            </td>
                                            
                                            <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Delete Recipient</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                                                    <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button className="delete_recipient" variant="danger" onClick={() => {handleRemovecardDetails(res.id)}} >
                                                        Delete
                                                    </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                    </tr>

                                    
                                    
                                            
                                    )    
                                })}
                                
                            
                            </tbody>
                            </Table> 
                                
                        
                        
                            </div>
                            </div>
                    </div>

                    </section>
                    ):(
                        <>
                        </>
                    )
                    }

            
               
            { carddata?.length == 0 ? (
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
                ):(
            <>
               
            </>
             )
            }
               
     
               </div>
               </div>
               </div>
            
         {/* )
} */}

 
   
     
       
   

  
  {/* <!-- ======= Recept RemitAssure-Section End ======= --> */}

        </>
    )
}



export default UserCardLists;