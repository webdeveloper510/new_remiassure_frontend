
import React,{useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Scrollbar from '../scrollbar/Scrollbar';

import {toast} from "react-toastify";
import {API} from "../../config/API";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

// start -----Why RemitAssure circle function
function WhyRenderingArrayOfObjects(){
  const dataItems = [
    {
      id:1,
      src: "assets/img/home/Vector01.svg",
      circle_heading: "We're Fast",
      circle_content: "95% of our transfers are ready in minutes..",
    },
    {
      id:2,
      src: "assets/img/home/Vector02.svg",
      circle_heading: "We're Safe",
      circle_content: "We use industry-leading technology to protect your money.",
    },
    {
      id:3,
      src: "assets/img/home/Vector03.svg",
      circle_heading: "We're Low-Cost",
      circle_content: " conventional banks and money transfer services.",
    }
  ];

  const circlItems = dataItems.map((value) =>{
    return(
      <li className="" key={value.id}>
        <div className="circle-image">
              <img src={value.src} alt="circle-image" />
            </div>
            <div className="circle-content">
            <p className="fast_text">{value.circle_heading}</p>
            <p className="fast_texto1">{value.circle_content}</p>
        </div>
     </li> 
    )
    
  }) 
  return(
    <div>
      {circlItems}
    </div>
  )
}
// End -----Why RemitAssure circle function

// Start--- home Bank Transfer funstion 
function BankTransferArrayOfObjects() {
  const  bankItems = [
    {
      id: 1,
      home_src: "assets/img/home/home.svg",
      bank_title: "Bank Transfer",
      bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",  
    },
    {
      id: 2,
      home_src: "assets/img/home/home.svg",
      bank_title: "Bank Transfer",
      bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",  
    },
    {
      id: 3,
      home_src: "assets/img/home/home.svg",
      bank_title: "Bank Transfer",
      bank_contents: "Send a secure bank transfer  Send a secure bank transfer major banks worldwide.",  
    },
    {
      id: 4,
      home_src: "assets/img/home/home.svg",
      bank_title: "Bank Transfer",
      bank_contents: "Send a secure bank transfer Send a secure bank transfer major banks worldwide.",  
    },
  ];

  const Tranferdata = bankItems.map((bankdata)=>{
    return(

          <li className="bank_lists" key={bankdata.id}>
            <div className="bank_contents">
                <img src={bankdata.home_src} alt="home_icons" className="bank_icons" />
                <h3 className="bank_transfer">{bankdata.bank_title}</h3>
                  <p className="bank_paragraph">{bankdata.bank_contents}</p>
            </div>
        </li>

    )
  })
  return(
    <div>
      {Tranferdata}
    </div>
  )
}
// End--- home Bank Transfer funstion 


// Start----- Flag home function 
function FlagHomeArrayofoObjects() {
  const flagData = [
    {
      id: 1,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.svg",  
    },
    {
      id: 2,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.svg",  
    },
    {
      id: 3,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.png",  
    },
    {
      id: 4,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.svg",  
    },
    {
      id: 5,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.svg",  
    },
    {
      id: 6,
      flag_src: "assets/img/home/Mask group.svg",
      flag_title: "india",
      flag_arrow_scr: "assets/img/home/arrow01.svg",  
    },
  ];

  const flagdataItems = flagData.map((flagvalue)=>{
    return(

      <li key={flagvalue.id}>
      <div className="col-lg-12">
        <div className="card card-flag01">
          <div className="row">
            <div className="col-4">
                <div className="card-body">
                  <img src={flagvalue.flag_src} alt="flag_icons" className="flag_icons" />
                </div>
            </div>

            <div className="col-4">
              <p className="india-text">{flagvalue.flag_title}</p>
            </div>
            
            <div className="col-4">
              <img src={flagvalue.flag_arrow_scr} alt="arrow_icons" className="arrow_icons" />
            </div>
          </div>
          
        </div>
    </div>
    </li>

    )
  })
  return(
    <div>
      {flagdataItems}
    </div>
  )
}
// End----Flag home function 

// card carousel start
const Card = (props) => {
  // console.log(props,"propspropspropsprops")x
  return (
    <li className="card li_card " key={props.id}>
         <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
      <div className="row">
          <div className="col-lg-4">
              <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
              <p className="boy_icons_text">Worldtraveler</p>
            </div>
            <div className="col-8">
              <span className="material-icons">{props.heading}</span>
              <p className="material-heading">{props.paragraph}</p>
              <img src="assets/img/help/star.png"/>
           </div>
      </div>
      <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
    </li>
  )
}

const Home = () => {

  // Start page show hide condtion page 
   const token = localStorage.getItem("token");
   console.log("TOKEN", token);

   const verification_otp = localStorage.getItem("verification_otp");
   console.log("Verification Message", verification_otp)

// Start page show hide condtion page



  const items = [
    {
        heading:"Best on the market 1.",
        paragraph:'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    },{
        heading:"Best on the market 2.",
        paragraph:'B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    },{
        heading:"Best on the market 3.",
        paragraph:'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    },{
        heading:"Best on the market 4.",
        paragraph:'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    },{
        heading:"Best on the market 5.",
        paragraph:'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    },{
        heading:"Best on the market 6.",
        paragraph:'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
    }
  ];
  //const [movePage, setMovePage] = useState('');
  const [carouselItems, setCarouselItems] = useState(items);
  //console.log(items, "carouselItemscarouselItemscarouselItemscarouselItemscarouselItems")
  
  useEffect(() => {
    document.documentElement.style.setProperty('--num', carouselItems.length);
  }, [carouselItems])
  
  // const handleAnimationEnd = () => {
  //   if(movePage === 'prev'){
  //     shiftNext([...carouselItems]);
  //   }else if(movePage === 'next'){
  //     shiftPrev([...carouselItems]);
  //   }
  //   setMovePage('')
  // }
  
  // const shiftPrev = (paragraph) => {
  //   let lastcard = paragraph.pop();
  //   paragraph.splice(0, 0, lastcard);
  //   setCarouselItems(paragraph);
  // }
  
  // const shiftNext = (paragraph) => {
  //   let firstcard = paragraph.shift();
  //   paragraph.splice(paragraph.length, 0, firstcard);
  //   setCarouselItems(paragraph);
  // }

  // End carousel End



  //*********** */ Start Main EXCHANGE RATE Api call *********************\\
   const [amount, setAmount] = useState('');
  //  alert(amount)
   const [from, setFrom] = useState('USD');
   const [to, setTo] = useState('INR');

   const [loading, setLoading] = useState(false);
   const [total_amounts, setTotal_amounts] =useState('');
   const [total_rates, setTotal_rates] = useState('');
  //  alert(total_amounts)


   const HandleAmount =(e)=>{
    setAmount(e.target.value)
   }
   
   const HandleFrom = (e) =>{
    setFrom(e.target.value)
   }

   const HandleTo =(e) =>{
    setTo(e.target.value)
   }

   const navigate = useNavigate();
  //  const notify = () => toast.success("Amount & Delivery Successfully!!")



  //main Api call
   const handleAmonutDelivery =(event) =>{
    event.preventDefault();
    setLoading(true); // Set loading before sending API request
       axios.post(API.BASE_URL + 'exchange-rate/', {
        amount: amount,
        from: from,
        to: to
       }, {
        headers:{

        },

       })
       .then(function(response){
         console.log(response)
         setLoading(false); // Stop loading
         if(response.status){
          // notify();
          navigate('/login');

         }
       })
       .catch(function(error){
        console.log(error.response);
        setLoading(false); // Stop loading in case of error
        // if(error.response.data.status){
        //   toast.error(error.response.data.message)
        // }

       })

   }

   //End main Api


   // Start--Exchange money Api call 
   const myExchangeTotalAmount =(event) =>{
    event.preventDefault();
    // alert("hii")
    // event.preventDefault();
    setLoading(true); // Set loading before sending API request
    axios.post(API.BASE_URL + 'exchange-rate/', {
      amount: amount,
      from: from,
      to: to
    }, {
       headers: {

       }

    })
    .then(function(response){
      console.log(response);
      setTotal_amounts(response.data.amount);
      setTotal_rates(response.data.rate);
      setLoading(false); // Stop loading
    })
    .catch(function(error){
      console.log(error.response)
      setLoading(false); // Stop loading in case of error
      // if(error.response.data.status){
      //   toast.error(error.response.data.message)
      // }
    })
   }


   // End--Exchange money Api call 


  //  const getInitialState = () => {
  //   const value = "USD";
  //   return value;
  // };

  // const [value, setValue] = useState(getInitialState);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };



  // //second to 
  // const getInitialStatess = () => {
  //   const value = "INR";
  //   return value;
  // };

  // const [valuess, setValuess] = useState(getInitialStatess);

  // const handleChangess= (e) => {
  //   setValuess(e.target.value);
  // };





  //*********** */ End EXCHANGE RATE Api call *********************\\






    return(
        <>


    {/* <!-- ======= Home Better-Way-Section  start======= --> */}
    <section className="top_sections">
    <div class="container">
        <div class="row">
            <div className="col-lg-6 no-padding banner-content">
                <div className="vl">
                    <h1 className="vl-heading">A Better Way</h1>
                    <h1 className="vl-heading01">To Send Money</h1>
                </div>
                <div className="vl-content">
                    <p className="vl-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                        malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
                    </p>
                    <p className="vl-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                        malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
                    </p>
                    <p className="vl-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat cras fermentum <br />
                        malesuada ultrices dictum. Eu id sit malesuada quam et tincidunt eu dolor convallis
                    </p>
                </div>
            </div>
            <div className="col-lg-6 right_sections">
                <img src="assets/img/home/bank.svg" alt="background-images" />
            </div>
        </div>

       
        <div class="row">
            <div className="col-lg-12">
                <div className="card card-flag new_card">
                    <div className="card-body">
                        <h6 className="exchange-heading">EXCHANGE RATE</h6>
                        <p className="calculation">1 {from} = {total_rates} {to}</p>
                        <div className="row">
                            <div className="col-3-1">
                                <p className="send-text">You Send<span style={{color: 'red'}} >*</span></p>
                                <div className="inline select-currency">
                                <InputGroup 
                                className="mb-3"
                                value={amount}
                                // onChange={HandleAmount}
                                placeholder="Please Enter Amount"
                                //  onChange={(e) =>{myExchangeTotalAmount(e.target.value); setAmount(e.target.value)}}
                                onChange={(e)=> {setAmount(e.target.value)}}
                                onBlur={myExchangeTotalAmount}

                                >
                                    <Form.Control aria-label="Text input with dropdown button" />
                                </InputGroup>
                                <select
                                 className="form-select mb-3 home-select-method"
                                  aria-label="Select a reason"
                                  value={from}
                                  // value={value}
                                  // onChange={HandleFrom}
                                  // onClick={myExchangeTotalAmount}
                                  // onChange={(e)=> {myExchangeTotalAmount(e.target.value);setFrom(e.target.value)}}
                                  onChange={(e)=> {setFrom(e.target.value)}}
                                  onBlurCapture={myExchangeTotalAmount}
                                  >         
                                  {/* <option className="option-custom" value="">Select</option> */}
                                  <option className="option-custom" value="USD" selected="selected">USD</option>
                                  <option className="option-custom" value="EUR">EUR</option>
                                  <option className="option-custom" value="BRL">BRL</option>
                                  <option className="option-custom" value="INR">INR</option>
                                  <option className="option-custom" value="BGN">BGN</option>
                                  <option className="option-custom" value="XAF">XAF</option>
                                  <option className="option-custom" value="CAD">CAD</option>
                                  <option className="option-custom" value="EUR">EUR</option>
                                  <option className="option-custom" value="CZK">CZK</option>
                                  <option className="option-custom" value="DKK">DKK</option>
                                  <option className="option-custom" value="GHS">GHS</option>
                                  <option className="option-custom" value="ISK">ISK</option>
                                  <option className="option-custom" value="JOD">JPD</option>
                                  <option className="option-custom" value="KWD">KWD</option>
                                  <option className="option-custom" value="NZD">NZD</option>
                                  <option className="option-custom" value="PHP">PHP</option>
                                  <option className="option-custom" value="ZAR">ZAR</option> 
                                  <option className="option-custom" value="CHF">CHF</option>
                                  <option className="option-custom" value="GBP">GBP</option>
                               </select> 
                               </div>
                            </div>
                            <div className="col-3-1">
                                <p className="get-text">They get<span style={{color: 'red'}} >*</span></p>
                                <div className="inline select-currency">
                                  
                                {/* <InputGroup 
                                className="mb-3"
                                value={total_amounts && amount != 0 || "" ? total_amounts : ""}
                                >
                                    <Form.Control aria-label="Text input with dropdown button" />
                                </InputGroup> */}

                                 <input
                                className="mb-3 new_input"
                                value={total_amounts && amount != 0 || "" ? total_amounts : ""}

                                />
                                    
                               
                                <select 
                                className="form-select form-control mb-3 home-select-method"
                                 aria-label="Select a reason"
                                 value={to}
                                // value={valuess}
                                //  onChange={HandleTo}
                                //  onClick={myExchangeTotalAmount}
                                //  onChange={(e)=> {myExchangeTotalAmount(e.target.value);setTo(e.target.value)}}
                                onChange={(e)=> {setTo(e.target.value)}}
                                onBlurCapture={myExchangeTotalAmount}

                                 >
                                       {/* <option value="">Select</option> */}
                                        <option value="INR" selected="selected">INR</option>
                                        <option value="EUR">EUR</option>
                                        <option value="BRL">BRL</option>
                                        <option value="BGN">BGN</option>
                                        <option value="XAF">XAF</option>
                                        <option value="USD">USD</option>
                                        <option value="CAD">CAD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="CZK">CZK</option>
                                        <option value="DKK">DKK</option>
                                        <option value="GHS">GHS</option>
                                        <option value="ISK">ISK</option>
                                        <option value="JOD">JPD</option>
                                        <option value="KWD">KWD</option>
                                        <option value="NZD">NZD</option>
                                        <option value="PHP">PHP</option>
                                        <option value="ZAR">ZAR</option> 
                                        <option value="CHF">CHF</option>
                                        <option value="GBP">GBP</option>
                                    </select> 
                               </div>
                                {/* <InputGroup className="mb-3">
                                    <Form.Control aria-label="Text input with dropdown button" />
                                    <DropdownButton variant="outline-secondary" title="AUD" id="input-group-dropdown-2" align="end">
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                    </DropdownButton>
                                </InputGroup> */}
                            </div>
                            <div className="col-3-1">
                            <p className="get-text">Receive method</p>
                              <select class="form-select rate_input form-control mb-3 home-select-method" aria-label="Select a reason">
                                      <option selected>Select Method</option>
                                      <option value="1">Bank Transfer</option>
                                      <option value="2">Mobile Wallet</option>
                               </select> 
                                {/* <InputGroup className="mb-3">
                                    <Form.Control aria-label="Text input with dropdown button" />
                                    <DropdownButton variant="outline-secondary" title="AUD" id="input-group-dropdown-2" align="end">
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                    </DropdownButton>
                                </InputGroup> */}
                            </div>
                            <div className="col-3-2">
                                <button 
                                type="submit"
                                className="btn btn continue-button"
                                onClick={handleAmonutDelivery}
                                >
                                  Continue
                                  {loading ? <>
                                                <div class="loader-overly"> 
                                                <div class="loader" > 
                                                
                                                </div>
                                                
                                                </div>
                                              </> : <></>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
     {/* <!-- ======= Home Better-Way-Section End-Section ======= --> */}



    {/* <!-- ======= Home Why RemitAssure-Section start ======= --> */}
    <section className="why-us_section homepage-why-us">
    <div className="container">

        <div className="row">
            <div className="col-lg-6">
                <div className="vl">
                    <h1 className="vl-heading">Why</h1>
                    <h1 className="vl-heading01">RemitAssure ?</h1>
                </div>
                <div className="vl-content">
                    <ul className="list-">
                        < WhyRenderingArrayOfObjects />
                    </ul>
                </div>
            </div>
            <div className="col-lg-6 right_sections">
               <img src="assets/img/home/img02.svg" alt="background-images" />
            </div>
        </div>


       <div className="Money_section">
        <div class="row">
        <div className="col-lg-6 right_sections">
              <img src="assets/img/home/img03.svg" alt="background-images" />
            </div>

             <div className="col-lg-6 better_sections">
                <div className="vl">
                    <h1 className="vl-heading">A Better Way</h1>
                    <h1 className="vl-heading01">To Send Money ?</h1>
                </div>
                <div className="vl-content">
                    <p className="vl-paragraph">
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
        </div>

    </div>
</section>
  
  {/* <!-- ======= Home Why RemitAssure-Section End ======= --> */}


 {/* <!-- ======= Home Wide-Choice-Section  start======= --> */}
 <section className="why-us section-bgba banner_section05" >
      <div className="container">
 
       {/* main row  start*/}
        <div className="row">
          <div className="col-lg-12"> 

               <div className="row">
                  <div className="col-lg-7">

                    <div className="vl03">
                       <h1 className="chose-heading">A wide choice of ways</h1>
                       <h1 className="chose-heading01">to send money online</h1>

                    </div>

                    <div className="chose-content">
                      <p className="chose-paragraph02">Lorem ipsum dolor sit amet, consectetur
                       adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Facilisi morbi tempus iaculis urna. Amet tellus cras adipiscing 
                        enim. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. 
                        Volutpat diam ut venenatis tellus in. Rhoncus aenean vel elit scelerisque. 
                        Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Id faucibus nisl 
                        tincidunt eget nullam. Sed viverra tellus in hac habitasse platea dictumst.
                         Ornare arcu odio ut sem nulla. Lectus mauris ultrices eros in cursus turpis 
                         massa. Sed nisi lacus sed viverra. Integer vitae justo eget magna. 
                         Sed vulputate mi sit amet. Nam aliquam sem et tortor consequat id porta.
                      </p>
                    
                    </div>
                    
                  </div>
                  
                   {/* second section row  start */}
                  <div className="col-lg-5">
                   
                   {/* bank first row start */}
                    <div className="row">
                      <ul class="bank_transfer">
                        < BankTransferArrayOfObjects />
                        </ul>
                    </div>
                    {/* Bank first row  End */}

                  </div>
                  {/* second section row  end */}

               </div>
          </div>
        </div>
          {/* main row  End*/}

          <div className="row" id="testimonial-section">
            <div className="col-lg-12">
              <h3 className="customers-heading">What customers say about us</h3>
              {/* <div className="button_icons">
                <button className="btn btn prev left_icon" onClick={() => setMovePage('prev')}>
                  <i className="bx bx-chevron-left prev_button"></i>
                </button>

                <button className="btn btn next right_icon"  onClick={() => setMovePage('next')}>
                  <i className="bx bx-chevron-right "></i>
                </button>

               

              </div> */}
              
              <p className="customers-paragraph">We do our best to provide you the best experience ever</p>
            </div>
          </div>

          {/* start carousel cards */}

          <div className="row">
            <div className="col-lg-12">
            {/* <div className="carouselwrapper module-wrapper">
  

            
              <ul onAnimationEnd={handleAnimationEnd} className={`${movePage} carousel`}>
                {carouselItems.map((t, index) => 
                  <Card key={t.paragraph + index} heading={t.heading} paragraph={t.paragraph} />
                  
                )}
              </ul>

            </div>   */}
            <Scrollbar />   
            </div>
          </div>

        {/* start carousel cards */}


      </div>
    </section>
    {/* <!-- ======= Home Wide-Choice-Section End ======= --> */}


    {/* <!-- ======= Home Call-us section start======= --> */}
    <section className="why-us section-bgba banner_section01">
      <div className="container">
       
       {/* main row  start*/}
        <div className="row">
          <div className="col-lg-12"> 

               <div className="row">
                  <div className="col-lg-6">

                    <div className="vl02">
                       <h1 className="money-heading">Send money to over 130 countries worldwide and choose 
                       from over 70 currencies</h1>
                    </div>

                    <div className="popular-content">
                      <h4 className="popular-paragraph01">POPULAR COUNTRIES
                      </h4>
                      <p className="popular-paragraph02">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      </p>
                      <p className="popular-paragraph02"> incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna.
                      </p>
                    </div>
                    
                  </div>
                  
                   {/* second section row  start */}
                  <div className="col-lg-6">
                  
                   {/* first row flag */}
                    <div className="row">
                    <ul className="bank_transfer">
                     < FlagHomeArrayofoObjects/>
                     </ul>

                    </div>
                    {/* first row flag */}

                    {  
                    verification_otp || token != undefined || '' ? (

                    <div className="view-button">
                      <NavLink to={"/userdashboard"}>
                      <button className="btn btn view_button">View all</button>
                      </NavLink>
                    </div>

                  ) : (
                    <>
                    
                    <div className="view-button">
                      <NavLink to={"/login"}>
                      <button className="btn btn view_button">View all</button>
                      </NavLink>
                    </div>
                    
                    </>
                  )
                  }


            
                  </div>
                  {/* second section row  end */}

               </div>
               
          </div>
        </div>
          {/* main row  End*/}
          <div className="row">
            <div className="col-lg-12 call_heading">
              <h3 className="cal-heading">Call to us</h3>
              <p className="call-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="view-button">
                   <a href="tel:+66 2399 1145" className="btn btn call_button">Call Now</a>
               </div>
            </div>
          </div>
      </div>
    </section>
     {/* <!-- ======= Home Call-us section End======= --> */}







    </>
    )
}


export default Home; 