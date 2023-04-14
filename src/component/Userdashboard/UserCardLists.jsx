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
import Page404 from "../pageNotfound/Page404";
import nocard from "../../assets/img/userdashboard/nocard.jpg"; 
const UserCardLists =() =>{

    // let { id } = useParams();
    // alert(id)
    //   console.log("========================>",id) ;

    const [show, setShow] = useState(false);

  const handleClose =() => setShow(false);
  const [delete_id,setDelete_Id] = useState('');

    const handleShow = (key) =>{
        console.log("=========>cardDelete",key)
        setShow(true);
        setDelete_Id(key)
 
    } 
    

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

const signup_token = localStorage.getItem("signup_token")
    console.log("signup_token", signup_token);

const DigitalCode = localStorage.getItem("DigitalCode");
console.log("DigitalCode", DigitalCode);



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
    getList();
    
}, [])

const getList =()=>{
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'payment/card-list/',{}, {
        headers: {
            "Authorization" : `Bearer ${signup_token ? signup_token : token}`,
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

}

console.log(carddata," nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  /**************************************************************************
   * ************** Start  Card List Delete ********************************
   * ***********************************************************************/

{/* start- delete function */}
const handleRemovecardDetails =(value) =>{
    console.log("========>Delete", value)
   
    axios.delete(API.BASE_URL + `payment/card/${value}`, {
        headers: {
          "Authorization" : `Bearer ${signup_token ? signup_token : token}`,
        },
      
    })
    .then(function(response) {
        console.log(response);
        handleClose()
        getList();
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
                                    <th>Exp-Month</th>
                                    <th>Exp-Year</th>
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
                                            <button className="btn btn-danger" onClick={() =>{handleShow(res.id)}}><i class="fa fa-trash"></i> Delete</button> 
                                            <button className="btn btn-primary" onClick={() =>{LoadEditCard(res.id)}}><i class="fa fa-pencil color-muted"></i> Edit</button>
                                            <button className="btn btn-secondary" onClick={() =>{LoadSinglCardData(res.id)}} ><i class="fa fa-eye color-muted"></i> View</button>
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
                              <Button className="delete_recipient" variant="danger" onClick={() => {handleRemovecardDetails(delete_id)}} >
                                Delete
                              </Button>
                              </Modal.Footer>
                            </Modal>
                                
                        
                        
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
                    <h2 class="text-black font-w600 mb-0"><b>Cards Lists</b></h2>
                </div>
                <div className="card">
                    <div className="card-body">
                    <h6 style={{"text-align":"center" , "margin-bottom":"20px"}}>No Saved Cards</h6>
                        <div className="add-rec-new">
                        <img src={nocard} alt="credit cards" />

                        </div>
                    </div>
                </div>
                {/* <div className={isActive ? "add-recipent-section" : "remove-add-recipent-section"}>
    
                    <div className="col-md-12 align-center">
                    <NavLink to="/addnewrecipient">
                                <button className="form-button addsingle_recepient" >
                                    <BsFillPersonPlusFill />
                                    Add New Card
                                </button>
                            </NavLink>
                    </div>
                    </div>  */}
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