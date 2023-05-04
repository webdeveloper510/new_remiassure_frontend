// import Routerpage from './routes/Routes';
import React, { useContext, useEffect } from 'react';
import UserContext from './component/context/UserContext';
import { Helmet } from "react-helmet";
// import GoToTop from './GoToTop';
import routes from './routes';
import { useRoutes, useNavigate } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
const App =()=>{
  const routing = useRoutes(routes);

  return(
    <>
<Header />
   {routing} 
     {/* < Routerpage autoclose={3000} /> */}
     {/* <GoToTop /> */}
     <Footer />
    </>
  )
}

export default App;
