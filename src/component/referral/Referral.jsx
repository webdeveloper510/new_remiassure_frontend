import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReferralScrollbar from '../referralscrollbar/ReferralScrollbar';





// card carousel start
const Card = (props) => {
    return (
      <li className="card li_card ">
         <img src="assets/img/referral/Group.svg" alt="quote-up" className="Group_icons" />
        <div className="row">      
          <div className="col-md-12">
            <div class="testimonial-text">
           <p className="material_heading_card">{props.paragraph}</p>
           <img src={props.crad_icons} alt="group_card" className="group_card_icon"/>
          </div>
          </div>
       </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 testimonial-client">
            <div class="testimonial-inner">
                <img src="assets/img/referral/girl.svg" alt="boy_icons" className="testimonial-icons"/>
                <h3 className="kevin_content">Kevin Rich</h3>
                <p className="testimonial_icons_text">Lorem Ipsum is simply</p>
            </div>
          </div> 
        </div>   
        {/* <img src="assets/img/home/quote-down.png" alt="quote-up" className="quotdown_icons" />    */}
      </li>
    )
  }


const Referral = () => {

const token = localStorage.getItem("token");
console.log("TOKEN", token);

const verification_otp = localStorage.getItem("verification_otp");
console.log("Verification Message", verification_otp)




     // Social Function start
     function SocialArrayObjects(){
        const socialdata = [
            {
              id:1,
              links:"https://mail.google.com/",
              src: "assets/img/referral/email.png"
            },
            {
                id:2,
                links:"https://www.facebook.com/",
                src: "assets/img/referral/facebook.svg"
              },
              {
                id:3,
                links:"https://www.instagram.com/",
                src: "assets/img/referral/instagram.svg"
              },{
                id:4,
                links:"https://twitter.com/",
                src: "assets/img/referral/twitter.svg"
              },

        ];

        const socialItems = socialdata.map((social) => {
            return(
                <li>
                    <div className="social-image">
                    <a  href={social.links} >
                        <img src={social.src} alt="can't show image" />  
                    </a>  
                    </div>                        
              </li> 
            )
        });
        return(
            <div>
                {socialItems}
            </div>
        )
     }
    // Social Function End

    //    Why Function Start 
    function WhyIconsRenderingArrayOfObjects(){
        const whydata=[
            {
                id: "1",
                icon_src: "assets/img/referral/Vector01.svg",
                icon_title:"We’re Secure",
                icon_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            },
            {
                id: "2",
                icon_src: "assets/img/referral/Vector02.svg",
                icon_title:"We're Fast",
                icon_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            },
            {
                id: "3",
                icon_src: "assets/img/referral/Vector04.svg",
                icon_title:"We’re Cost-effective",
                icon_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            }, 
            {
                id: "4",
                icon_src: "assets/img/referral/Vector03.svg",
                icon_title:"We’re Innovative",
                icon_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            },
        ];
        const ArrayIconsIttems = whydata.map((icon)=>{
            return(
                
                    <li>
                    <div className="circle-icons">
                        <img src={icon.icon_src} alt="circle-image" />
                        </div>
                        <div className="circle-content">
                        <p className="why_text">{icon.icon_title}</p>
                        <p className="why_texto1">{icon.icon_content}</p>
                    </div>

                    </li>
               
            )
        })
        return(
            <div>
                {ArrayIconsIttems}
            </div>
        )
    }

    
    //    Why Function Start 

    const items = [

        {
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        },{
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        },{
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        },{
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        },{
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        },{
            crad_icons:"assets/img/referral/Group_star.png",
            paragraph:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the'
        }
      ];
      const [moveClass, setMoveClass] = useState('');
      const [carouselItems, setCarouselItems] = useState(items);
      //console.log(items, "carouselItemscarouselItemscarouselItemscarouselItemscarouselItems")
      
      useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
      }, [carouselItems])
      
      const handleAnimationEnd = () => {
        if(moveClass === 'prev'){
          shiftNext([...carouselItems]);
        }else if(moveClass === 'next'){
          shiftPrev([...carouselItems]);
        }
        setMoveClass('')
      }
      
      const shiftPrev = (paragraph) => {
        let lastcard = paragraph.pop();
        paragraph.splice(0, 0, lastcard);
        setCarouselItems(paragraph);
      }
      
      const shiftNext = (paragraph) => {
        let firstcard = paragraph.shift();
        paragraph.splice(paragraph.length, 0, firstcard);
        setCarouselItems(paragraph);
      }
    
      // End carousel End

    return(
        <>
         {/* <!-- ======= GBP for friends Remitassur -Section  start======= --> */}
         <section className="why-us section-bgba help_banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                      <div className="content_referral">
                        <h3 className="gbp_friends">25 GBP for you and 10 <br /> GBP for friends</h3>  
                        <p className="gbp_paragraph">Once they’ve sent 75 GBP or more, you’ll be emailed a 25 <br/> GBP WorldRemit voucher code.</p> 
                        </div>
                    
                    </div>

                    <div className="col-lg-6">
                        <div className="support_image">
                            <img src="assets/img/referral/img01.svg" alt="support_images" />
                        </div>                       
                    </div>

                </div>
            </div>
        </section>
         {/* <!-- ======= GBP for friends Remitassur -Section  End======= --> */}


          {/* <!-- ======= How do I refer a friend? Remitassur -Section  start======= --> */}
          <section className="why-us section-bgba referal-section">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="vl04">
                           <h1 className="vl-heading">How do I refer a friend?</h1>
                        </div>
                        <p className="refer_content">Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod</p>              
                    </div>
                </div>


                <div className="timeline"> 
                
                    <div className="timeline-content col-lg-3">
                <p className="timeline-text odd">Sign up</p>
                
                        <div className="popup_content odd-text">
                          <p className="signup_content">1</p>
                          
                        </div>  
                    </div>
                    <div className="timeline-content col-lg-3">
                        <div className="popup_content even-text">
                          <p className="signup_content">2</p>    
                        </div>  
                        <p class="timeline-text even">Transfer Funds</p>
                    </div>
                    <div className="timeline-content col-lg-3">
                    <p class="timeline-text odd"> Share your referral code with family and friends</p>
                        <div className="popup_content odd-text">
                          <p className="signup_content">3</p>
                        </div>  
                    </div>
                    <div className="timeline-content col-lg-3">
             
                        <div className="popup_content even-text">
                          <p className="signup_content">4</p>
                        </div>  
                        <p class="timeline-text even"> When they sign up and send funds through their account, you both receive a voucher</p>
                    </div>

                </div>

                {
                 verification_otp || token != undefined || '' ? (
                    <div className="referal_code">
                        <div className="row">
                            <div className="col-lg-12">
                                <p className="share_referal_code">Share your unique referral code:</p>
    
                                <InputGroup className="mb-3">
                                    <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" value="275878274565826758367" id="myInput" className="copy_input" />
    
                                    <button variant="outline-secondary" id="button-addon2" className="button_copy">
                                        Copy
                                    </button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>

                ) : (
                    <>
                    <div className="social_links_change"></div>
                    
                    </>
                )
                }

                  {/* <div className="referal_code">
                      <div className="row">
                          <div className="col-lg-12">
                              <p className="share_referal_code">Share your unique referral code:</p>
  
                              <InputGroup className="mb-3">
                                  <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" value="275878274565826758367" id="myInput" className="copy_input" />
  
                                  <button variant="outline-secondary" id="button-addon2" className="button_copy">
                                      Copy
                                  </button>
                              </InputGroup>
                          </div>
                      </div>
                  </div>
                             */}

                             
                {
                 verification_otp || token != undefined || '' ? (
                    <div className="row" >
                    <div className="col-lg-12">
                        <p className="share_content">Way to share</p>

                       <div className="social_icons">
                       <ul className="social-media-icons">
                        < SocialArrayObjects />
                      </ul>
                        </div>

                        <div className="view-button">
                            <NavLink to="/aboutus">
                            <button className="btn btn find_button">Find out more </button>
                            </NavLink>
                        </div>
                        <div className="terms_content">
                          <p>*T&Cs apply. <span style={{ color: 'rgba(100, 20, 233, 1)' }}> See terms and conditions</span> for details*</p>
                        </div>
                    </div>
                </div>


                    ) : (
                        <>
                         <div className="row social_links_change" >
                    <div className="col-lg-12">
                        <p className="share_content">Way to share</p>

                       <div className="social_icons">
                       <ul className="social-media-icons">
                        < SocialArrayObjects />
                      </ul>
                        </div>

                        <div className="view-button">
                            <button className="btn btn find_button">Find out more</button>
                        </div>
                        <div className="terms_content">
                          <p>*T&Cs apply. <span style={{ color: 'rgba(100, 20, 233, 1)' }}> See terms and conditions</span> for details*</p>
                        </div>
                    </div>
                </div>

                        
                        </>
                    )
                    }


              
            </div>
        </section>
    {/* <!-- ======= How do I refer a friend? Remitassur -Section  End======= --> */}

    {/* <!-- ======= Why RemitAssure Remitassur -Section  start======= --> */}
    <section className="why-us section-bgba why_banner">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">

                        <div className="vl05">
                           <h1 className="why-heading">Why RemitAssure ?</h1>
                        </div>
                        <p className="why_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>              
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-lg-12">
                    <ul className="why-ramit-assure">
                     < WhyIconsRenderingArrayOfObjects />
                     </ul>
                    </div>                  
                </div>            
            </div>
        </section>
         {/* <!-- ======= Why RemitAssure Remitassur -Section  End======= --> */}


 {/* <!-- ======= Testimonial-Section  start======= --> */}
        <section className="why-us section-bgba testimonials">
            <div className="container">
        
            {/* main row  start*/}
             <div className="row">
                
                    <div className="testimonial_vl">
                        <h1 className="chose-heading">Testimonial</h1>                
                    
                    {/* <div className="button_icons_referral">
                        <button className="btn btn prev left_icon" onClick={() => setMoveClass('prev')}>
                        <i className="bx bx-chevron-left prev_button"></i>
                        </button>

                        <button className="btn btn next right_icon"   onClick={() => setMoveClass('next')}>
                        <i className="bx bx-chevron-right "></i>
                        </button>
                     

                    </div> */}
                    </div>
                
             </div>

                <div className="row">
                    <div className="col-lg-3">
                        <p className="review_content">Reviews 66,081 · Great
                        <span className="line_drow"></span>
                        </p>
                    </div>
                    <div className="col-lg-9">
                        <img src="assets/img/referral/Group_star.png" alt="group_image" className="group_image" />
                        <p className="button_rating" >4.1</p>
                    </div>
                </div>
                {/* carousel start  */}
                <div className="row">
                    <div className="col-col-lg-12">
                    {/* <div className="carouselwrapper module-wrapper">
              
                       
                        <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
                            {carouselItems.map((t, index) => 
                            <Card key={t.paragraph + index} crad_icons={t.crad_icons} paragraph={t.paragraph} />
                            
                            
                            )}
                        </ul>
                        </div>      */}

              <ReferralScrollbar />  
                       </div>
                    
                </div>
                    {/* carousel End  */}


            {/* main row  End*/}

            </div>
            </section>
    {/* <!-- ======= Home Testimonial-Section End ======= --> */}     


     {/* <!-- ======= Fast-security RemitAssure-Section start ======= --> */}
     <section className="why-us section-bg banner_secure">
       <div className="container">        
                    {/* -----======= first row End ====--- */} {/* -----======= second row start ====--- */}
                    <div className="row">
                        <div className="col-lg-6 right_sections01">
                                <img src="assets/img/home/img03.svg" alt="background-images" />
                            </div>

                            <div className="col-lg-6 better_sections01">
                                <div className="vl">
                                    <h1 className="vl-heading">A fast and secure way to</h1>
                                    <h1 className="vl-heading01">send money on the go</h1>
                                </div>
                                <div className="vl-content">
                                    <p className="vl-paragraph01">
                                    Download our app for free to send money online in minutes to over 130 other countries. Track your payments and view your transfer history from anywhere.
                                    </p>
                                </div>
                                <div className="link">
                                    <div className="left_link">
                                        <img src="assets/img/home/Group 01.svg" alt="home_icons" className="home_icons" />
                                    </div>
                                    <div className="rihjt_link">
                                        <img src="assets/img/home/Group 02.svg" alt="home_icons" className="home_icons" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    {/* -----======= second row End ====--- */}
                </div>
          
        </section>
  {/* <!-- ======= Fast -security RemitAssure-Section End ======= --> */}





        </>

    )
}



export default Referral;