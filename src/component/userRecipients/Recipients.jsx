import React, { useState, useContext , useEffect} from "react";
import Table from 'react-bootstrap/Table';
import {Links, NavLink, useNavigate} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";
import { API } from "../../config/API";
import axios from "axios";
import MultiStepProgressBar from "./MultiStepProgressBar";

const Recipients =() =>{

// Start page show hide condtion page 
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);

    const verification_otp = localStorage.getItem("verification_otp");
    console.log("Verification Message", verification_otp)

// Start page show hide condtion page
    

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // const notify = () => toast.success("User Data Get Successfully!");


    // const token = localStorage.getItem("token");
    // console.log("TOKEN", token);
    


    useEffect(() => {
        setLoading(true); // Set loading before sending API request
        axios.post(API.BASE_URL + 'recipient-list/',{}, {
            headers: {
                "Authorization" : `Bearer ${token}`,
            }
          })
          .then(function(response) {
              console.log("Recipients APIIIII", response.data);
              setData(response.data);
              setLoading(false); // Stop loading
         
         
            //   if (response.status)
            // // notify();
          })
          .catch(function(error) {
              console.log(error);
              console.log(error.response);
              setLoading(false); // Stop loading in case of error
              if(error.response.status){
                  toast.error(error.response.data.detail);
              } 
          })
    }, [])

    console.log(data," nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")


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


    {  
        verification_otp || token != undefined || '' ? (

    <section>
        <div class="container">
            <div className="row">
            <section className="user_recipients_section">
            <h1 className="recipients_lists">Recipients Lists</h1>
              

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

                <Table striped bordered hover className="table_user_recipients">
                    <thead>
                        <tr>
                            <th>Sr.No </th>
                            {/* <th>User</th> */}
                            <th>Name</th>
                            <th>Destination</th>
                            <th>Detail Link</th>
                            <th>Transfer Now Link</th>
                            <th>Transfer Progress</th>
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
                                    <td>{res.destination}</td>
                                    <td>{res.detail_link}</td>
                                    <td>{res.transfer_now_link}</td>
                                    <td>
                                    <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Completed</Accordion.Header>
                                        <Accordion.Body>
                                        
                                        <MultiStepProgressBar />
                                                       
                                                    
                                        </Accordion.Body>
                                    </Accordion.Item> 
                                    </Accordion>

                                    </td>
                              </tr>
                              
                                    
                            )    
                        })}
                      
                    </tbody>
                    </Table> 
               </div>
               </section>
            </div>
        </div>
   </section>

    ) : (
        <>
        
        </>
    )
    }


  
  {/* <!-- ======= Recept RemitAssure-Section End ======= --> */}

        </>
    )
}



export default Recipients;