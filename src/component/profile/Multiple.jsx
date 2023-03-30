import React, { useState, useEffect, useRef } from "react";
import VerificationInput from "react-verification-input";
const axios = require("axios");





const Multiple = () => {

    const from_select = useRef(),
    to_select = useRef(),
    from_input = useRef(),
    to_input = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("https://api.exchangeratesapi.io/latest");
        //setRatesList(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const convertRate = () => {
    const from_cur = from_select.current.value;
    const to_cur = to_select.current.value;
    const from_amount = from_input.current.value;
    console.log(from_cur);
    axios
      .get("https://api.exchangeratesapi.io/latest?base=" + from_cur)
      .then((result) => {
        const rate = result.data.rates[to_cur];
        const converted_amount = rate * from_amount;
        to_input.current.value = converted_amount;
      });
  };
  
  

    
    return(
        <>
          {/* <!-- ======= help Remitassure Support-Section  start======= --> */}
          <section className="why-us section-bgba profile_banner">
    <div className="container">
        <div className="row">
            <div className="col-lg-6">
                <div className="support_image">
                    <img src="assets/img/help/help_img02.png" alt="support_images" />
                </div>
            </div>

            <div className="col-lg-12">
              
            {/* <h1>Text Input</h1>
  
      {name&&<h1>Hello, {name}!</h1>} */}

<div className="App">
      <div className="globalCurrencyConverter">
        <h2>Currency Converter</h2>
        <div className="container box">
          <label>
            <input
              ref={from_input}
              name="sourceCurrency"
              type="text"
              placeholder="fromCurrency"
            />
            <select
              ref={from_select}
              className="fromCurrency"
              defaultValue={"USD"}
            >
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="NZD">NZD</option>
            </select>
          </label>
          {" -> "}
          <label>
            <input
              ref={to_input}
              name="targetCurrency"
              type="text"
              placeholder="toCurrency"
            />

            <select ref={to_select} className="toCurrency" defaultValue="AUD">
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="NZD">NZD</option>
              <option value="RUB">RUB</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <div className="recordBtn">
            <button name="convert" onClick={convertRate}>
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>

    <VerificationInput />

       
            
            </div>
        </div>
    </div>
</section>

        {/* <!-- ======= Help Better-Way-Section End-Section ======= --> */}
          
        </>
    )
}



export default Multiple;