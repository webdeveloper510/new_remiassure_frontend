import Routerpage from './routes/Routes';
import React, { useContext, useEffect } from 'react';
import UserContext from './component/context/UserContext';
import { Helmet } from "react-helmet";
import GoToTop from './GoToTop';


const App =()=>{
 
  return(
    <>
  
     < Routerpage autoclose={3000} />
     {/* <GoToTop /> */}
   
    </>
  )
}

export default App;
