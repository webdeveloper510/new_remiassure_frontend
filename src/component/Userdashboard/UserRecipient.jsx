import React, { useState, useContext , useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Links, NavLink, useNavigate} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import norecipients from '../../assets/img/userdashboard/hidden.avif';
import { BsFillPersonPlusFill } from "react-icons/bs";
import Sidebar from './Sidebar';


const UserRecipients =() =>{

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
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/recipient-list/',{}, {
        headers: {
            "Authorization" : `Bearer ${token}`,
        }
      })
      .then(function(response) {
          console.log("Recipients APIIIII", response.data);
          setData(response.data);
          console.log(data)
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

console.log(data," nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  /**************************************************************************
   * ************** Start  Recipient List Delete ****************************
   * ***********************************************************************/

let id;
{/* start- delete function */}
const handleRemoveRecipientBankDetails =(value) =>{
   
    // if (window.confirm('Do you wnat to remove?')) {
    // setLoading(true); // Set loading before sending API request
    axios.delete(API.BASE_URL + `payment/recipient-update/${value}`, {
      
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
                { data?.length != 0 ? (
                    <section className="user_recipients_section">
                        <div class="form-head mb-4">
                        <h2 class="text-black font-w600 mb-0"><b>Recipients Lists</b>
                        <NavLink to="/addnewrecipient">
                                            <button className="form-button addsingle_recepient" >
                                                <BsFillPersonPlusFill />
                                                Add New Recepients
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
                                    {/* <th>User</th> */}
                                    <th>Name</th>
                                    {/* <th>bank_name</th>
                                    <th>account_name</th>
                                    <th>account_number</th> */}
                                    <th>Destination</th>
                                    <th>Transfer Now Link</th>
                                    {/* <th>Update Detail Link</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                data.data?.map((res, index) => {
                                    //console.log(items, "itemnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
                                    return(

                                        <tr key={res.id}>
                                        
                                            <td>{index +1}</td>
                                            {/* <td>{res.user}</td> */}
                                            <td>{res.name}</td>
                                            {/* <td>{res.bank_name}</td>
                                            <td>{res.account_name}</td>
                                            <td>{res.account_number}</td> */}
                                            <td>{res.destination}</td>
                                            {/* <td>{res.update_profile}</td> */}
                                            <td>{res.transfer_now}</td>
                                            <td>
                                            <button className="btn btn-danger" onClick={handleShow}><i class="fa fa-trash"></i> Delete</button> 
                                            <button className="btn btn-primary" onClick={() =>{LoadEdit(res.id)}}><i class="fa fa-pencil color-muted"></i> Edit</button>
                                            <button className="btn btn-secondary" onClick={() =>{LoadSinglProfile(res.id)}} ><i class="fa fa-eye color-muted"></i> View</button>
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
                                                    <Button className="delete_recipient" variant="danger" onClick={() => {handleRemoveRecipientBankDetails(res.id)}} >
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

            
               
            { data?.length == 0 ? (
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



export default UserRecipients;