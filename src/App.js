import React, { useEffect } from 'react';
import routes from './routes';
import IdleTimeOutHandler from './component/idle/IdleTimeOutHandler'
import { useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import { exchangeRate } from './utils/Api';

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation()
  const [path, setPath] = useState()
  const [isActive, setIsActive] = useState(true)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const onLogOut = () => {
    setLoader(true)
    localStorage.clear()
    navigate("/login")
  }

  // useEffect(()=>{
  //   if(!localStorage.getItem("token")&& !localStorage.getItem("remi-user-dt")){
  //     navigate("/login")
  //   }

  // },[])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    if (localStorage.getItem("send-step")) { localStorage.removeItem("send-step") }
    if (localStorage.getItem("transfer_data")) { localStorage.removeItem("transfer_data") }
    const p = location.pathname.split("/")
    setPath(p[1])

    exchangeRate({ amount: "1", from: "AUD", to: "USD" }).then(res => {
      const data = { send_amt: "1", exchange_amt: res.amount, from_type: "AUD", to_type: "USD", exch_rate: res.rate }
      localStorage.removeItem("exchange_curr")
      localStorage.setItem("exchange_curr", JSON.stringify(data))
    })

    let expTime = localStorage.getItem("tkn-exp");

    if(expTime){
      var d = new Date();
      if (d == expTime) {
        localStorage.clear()
        navigate("/login")
      }
    }
  
    if (p[1] == "login" || p[1] == "sign-up" || p[1] == "verification" || p[1] == "forgot-password") {
      if (localStorage.getItem("token")) {
        let user = JSON.parse(localStorage.getItem("remi-user-dt"));
        if (user?.digital_id_verified && user.digital_id_verified === "true") {
          navigate("/dashboard")
        } else {
          navigate("/send-money")
        }
      }
    } 

  }, [location.pathname])


  return (
    <>
      <IdleTimeOutHandler
        onActive={() => { setIsActive(true) }}
        onIdle={() => { setIsActive(false) }}
        onLogout={() => { onLogOut() }}
        timeOutInterval={(30 * 60 * 1000)}
      />
      {
        path == "remi-user-email-verification" ? (
          <>
            {routing}
          </>
        ) : (
          <>
            <Header />
            {routing}
            <Footer />
          </>
        )
      }

    </>
  )
}

export default App;
