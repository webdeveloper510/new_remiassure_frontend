import React, { useEffect } from 'react';
import routes from './routes';
import IdleTimeOutHandler from './component/idle/IdleTimeOutHandler'
import { useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import { checkExistence, exchangeRate, getPreferredCurrency, getReferralAmount } from './utils/Api';

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

  let login = localStorage.getItem('token')


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    const p = location.pathname.split("/")
    setPath(p[1])
    if (login) {
      checkExistence().then(res => {
        if (res.code === "200") {
          if (res?.data?.is_deleted === true || res?.data?.is_deleted === "true") {
            onLogOut()
          }
        }
      })
      getPreferredCurrency().then(res => {
        if (res.code === "200") {
          if (res.data.source_currency !== null && res.data.source_currency !== "null") {
            let types = res.data
            exchangeRate({ amount: "100", from: types.source_currency, to: types.destination_currency, direction: "from" }).then(res => {
              const data = { send_amt: "100", exchange_amt: res.amount, from_type: types.source_currency, to_type: types.destination_currency, exch_rate: res.rate, defaultExchange: res.default_exchange }
              localStorage.removeItem("exchange_curr")
              localStorage.setItem("exchange_curr", JSON.stringify(data))
            })
          }
        }
      })
    } else {
      exchangeRate({ amount: "100", from: "AUD", to: "NGN", direction: "from" }).then(res => {
        const data = { send_amt: "100", exchange_amt: res.amount, from_type: "AUD", to_type: "NGN", exch_rate: res.rate, defaultExchange: res.default_exchange }
        localStorage.removeItem("exchange_curr")
        localStorage.setItem("exchange_curr", JSON.stringify(data))
      })
    }

    let expTime = localStorage.getItem("tkn-exp");

    if (expTime) {
      var d = new Date();
      if (d == expTime) {
        localStorage.clear()
        navigate("/login")
        window.location.reload()
      }
    }

    if (p[1] == "login" || p[1] == "sign-up" || p[1] == "verification" || p[1] == "forgot-password") {
      if (localStorage.getItem("token")) {
        navigate("/dashboard")
      }
    }

    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({
    //   event: 'pageview',
    //   pagePath: location.pathname
    // });

    // console.log(window.dataLayer)
    // fbq('track', 'PageView');
    getReferralAmount().then(res => {
      localStorage.setItem("ref-x-2-rem", JSON.stringify({ rt: res?.data?.referred_to_amount || 25, rb: res?.data?.referred_by_amount || 50 }))
    })


  }, [location.pathname])

  return (
    <>
      {login ?
        <IdleTimeOutHandler
          onActive={() => { setIsActive(true) }}
          onIdle={() => { setIsActive(false) }}
          onLogout={() => { onLogOut() }}
          timeOutInterval={(30 * 60 * 1000)}
        /> : <></>}
      {
        path == "remi-user-email-verification" ? (
          <>
            {routing}
          </>
        ) : (
          <>
            {routing}
            <Footer />
          </>
        )
      }

    </>
  )
}

export default App;
