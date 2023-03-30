import React, { Component } from "react";
import {links, NavLink, useNavigate} from 'react-router-dom';


const Footer = () => {

// Navigator Footer Content Start 
    function NavigationFooterArrayObjects() {
        const navigationData = [
        // {
        //     id: 1,
        //     content: "Home",
          
        // },
        // {
        //     id: 2,
        //     content: "About Us",
          
        // },
        {
            id: 3,
            content: "What We Do",
        },
        {
            id: 4,
            content: "To The Power of 10",
        },
        {
            id: 5,
            content: "Donate",
        },

        ];

        const NavigationItems = navigationData.map((value) => {
            console.log(navigationData, "ooook")
            return(
                <li key={value.id}>
                 <NavLink to="#">{value.content}</NavLink>
                </li>
            )
        })

        return(
            <div>
                {NavigationItems}
            </div>
        )
    }
// Navigator Footer Content End 

//What We Do Footer content Start
function WeDoArrayObjects(){
    const data = [
        {
          id:'1',
          title: "Encouraging Testing",
        },
        {
          id:'2',
          title: "Strengthening Advocacy",
        },
        {
          id:'3',
          title: "Sharing Information",
        },
        {
          id:'4',
          title: "Building Leadership",
        },
        {
          id:'5',
          title: "Engaging With Global Fund",
        },
         {
          id:'6',
          title: "Shining a Light",
        },
    ];

    const wedoItems = data.map((element)=>{
        return(
             <li key={element.id}>
                 <a href="#">{element.title}</a>
             </li>
        )
    })
    return(
        <div>
            {wedoItems}
        </div>
    )
}
//What We Do Footer content End

//Legal Footer content Start
function LegalArrayObjects(){
    const legalData = [
        {
            id:1,
            content: "General Info",
        },
         {
            id:2,
            content: "Privacy Policy",
        },
        {
            id:3,
            content: "Terms of Service",
        },
    ];

    const lagalItems = legalData.map((legal)=>{
        return(
            <li key={legal.id}>
            <a href="#">{legal.content}</a>
        </li>
            
        )
    })
    return(
        <div>
            {lagalItems}
        </div>
    )
}
//Legal Footer content End

    return(
        <>
         {/* <!-- ======= Footer ======= --> */}
        <footer id="footer">
            <div className="footer-top">
            <div className="container">
                <div className="row">

                <div className="col-lg-1 col-md-6 footer-links">
                   <img src="assets/img/home/footer-logo.svg"  alt="imge_footer_icons" className="footer_icon" />
                </div>


                <div className="col-lg-2 col-md-6 footer-links">
                    <h4>Navigation</h4>
                  
                    <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                   <li> <NavLink to="/aboutus">About Us</NavLink></li>
                   <li><a href="#">What We Do</a></li>
                   <li><a href="#">To The Power of 10</a></li>
                   <li><a href="#">Donate</a></li>
                     {/* <NavigationFooterArrayObjects  /> */}
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>What We Do</h4>
                    <ul>
                      < WeDoArrayObjects/>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Legal</h4>
                     <ul>
                       < LegalArrayObjects />
                     </ul>

                </div>

                <div className="col-lg-3 col-md-6 footer-info">
                   
                    <h4>Contact Us</h4>
                    <li className="suppot_footer">
                        <img src="assets/img/footer/email.svg" alt="emai_icons" className="email_icons" />                  
                        <p> support@ercom.com </p>
                        </li>
                           
                           <li className="suppot_footer">
                        <img src="assets/img/footer/phone.svg" alt="phone_icons" className="phone_icons" />                  
                        <p> +66 2399 1145</p>
                        </li>
                    <div className="social-links mt-3">
                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>

                </div>
            </div>
            </div>

            <div className="container">
            <div className="row">
                <div className="col-lg-2">
                    <div className="Smartitude_content">
                    Smartitude
                    </div>
                </div>

                <div className="col-lg-10  reserved_content">
                   
                    <div className="copyright">
                        &copy; Copyright <strong><span>Remit-Assure</span></strong>. All Rights Reserved
                    </div>
                </div>
            </div>
           

            <div className="credits">
            
            </div>
            </div>
        </footer>
        {/* <!-- ======= End-footer ======= --> */}
        </>
    )
}


export default Footer;