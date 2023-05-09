import React, { useContext, useEffect } from 'react';
import routes from './routes';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation()
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  },[location.pathname])

  return (
    <>
      <Header />
      {routing}
      <Footer />
    </>
  )
}

export default App;
