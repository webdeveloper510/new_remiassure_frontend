import React, { useEffect } from 'react';
import routes from './routes';
import IdleTimeOutHandler from './component/idle/IdleTimeOutHandler'
import { useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation()
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
  }, [location.pathname])

  return (
    <>
      <IdleTimeOutHandler
        onActive={() => { setIsActive(true) }}
        onIdle={() => { setIsActive(false) }}
        onLogout={() => { onLogOut() }}
        timeOutInterval={(30*60*1000)}
      />
      <Header />
      {routing}
      <Footer />
    </>
  )
}

export default App;
