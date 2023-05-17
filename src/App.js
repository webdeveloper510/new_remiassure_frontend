import React, { useEffect } from 'react';
import routes from './routes';
import { useRoutes, useLocation } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation()
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
      <Header />
      {routing}
      <Footer />
    </>
  )
}

export default App;
