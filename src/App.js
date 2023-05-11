import React, { useContext, useEffect } from 'react';
import routes from './routes';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import { exchangeRate } from './utils/Api';
const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    if (location.pathname != "/send-money" || location.pathname != "user-send-money") {
      if (localStorage.getItem("send-step")) { localStorage.removeItem("send-step") }
      if (localStorage.getItem("transfer_data")) { localStorage.removeItem("transfer_data") }
    }
  }, [location.pathname])

  useEffect(()=>{
    exchangeRate({ amount: "1", from: "AUD", to: "NZD" }).then(res=>{
      localStorage.removeItem("exchange_curr")
      let obj = {send_amt:"1",from_type:"AUD", to_type:"NZD", exchange_amt:res.amount, exch_rate:res.rate}
      localStorage.setItem("exchange_curr", JSON.stringify(obj))
  })
  },[])

  return (
    <>
      <Header />
      {routing}
      <Footer />
    </>
  )
}

export default App;
