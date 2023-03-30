import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../component/home/Home';
import Header from '../component/header/Header';
import Footer from '../component/footer/Footer';
import Aboutus from '../component/aboutus/Aboutus';
import Help from '../component/help/Help';
import Signup from '../component/signup/Signup';
import Referral from '../component/referral/Referral';
import Login from '../component/login/Login';
import ForgotPassword from '../component/forgotpassword/ForgotPassword';
import RecentPassword from '../component/resetPassword/ResetPassword';
import Profile from '../component/profile/Profile';
import Recipients from '../component/userRecipients/Recipients';
import LocalStorage from '../component/resetPassword/Localstorage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter } from "react-router-dom";
import Verification from '../component/verification/Verification';
import Multiple from '../component/profile/Multiple';
import SendMoney from '../component/send/SendMoney';
import Transfer from '../component/Userdashboard/Transfer';
import UserSendMoney from '../component/Userdashboard/UserSendMoney';
import UserDashboard from '../component/Userdashboard/UserDashboard';
import AddNewRecipient from '../component/Userdashboard/AddNewRecipient';
import UserProfile from '../component/Userdashboard/UserProfile';
import ChangePassword from '../component/Userdashboard/ChangePassword';
import UserRecipient from '../component/Userdashboard/UserRecipient';
import Dashboard from '../component/Userdashboard/Dashboard';
import Sidebar from '../component/Userdashboard/Sidebar';
import ReferralData from '../component/referralData/ReferralData';
import Editrecipientuser from '../component/Userdashboard/EditUserRecipient';
import SingleRecipientProfile from '../component/Userdashboard/SingleRecipientProfile';

import GoToTop from '../GoToTop';
import { AuthProvider } from '../component/context/UserContext';


const Routerpage =()=>{

  /************ Start page show hide condtion page ***************/
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  const verification_otp = localStorage.getItem("verification_otp");
  console.log("Verification Message", verification_otp)


 /******************* Start Api call Amount & Delivery State  *******/
  
  return(
  <>

  

    <Router>  
    <GoToTop />

    <>
  
    <Header/>
    <Routes>
    <Route exact path="/"  element={ <Home/>} /> 
    <Route exact path='/aboutus' element={ < Aboutus />} />
    <Route exact path='/help' element={ < Help />} />
    <Route exact path='/signup' element={ <Signup />} />
    <Route exact path='/referral' element = {< Referral />} />
    <Route exact path='/login' element = {< Login /> }  />
    <Route exact path='/forgotpassword' element= {< ForgotPassword /> } />
    <Route exact path='/resetpasswords' element= { < RecentPassword /> } />
    <Route exact path='/resetpassword/:id' element= {< LocalStorage /> } />
{/* <>
{  
       token != undefined || '' ? (
        <Route exact path='/sendMoney' element= {< SendMoney /> } />

        
       ):(
        <></>

       )
    }
 </> */}
    <Route exact path='/multiple' element= {< Multiple />} />
    <Route exact path='/user_recipients' element={< Recipients /> } />
    <Route exact path='/verification' element= {< Verification /> } />
    <Route exact path='/sendMoney' element= {< SendMoney /> } />
    <Route exact path='/transfer' element={<Transfer /> } />
    <Route exact path='/referraldata' element={<ReferralData /> } />
    <Route exact path='/userdashboard' element={<UserDashboard /> } />
    <Route exact path='/usersendmoney' element={<UserSendMoney /> } />
    <Route exact path='/addnewrecipient' element={<AddNewRecipient /> } />
    <Route exact path='/userprofile' element={<UserProfile /> } />
    <Route exact path='/userrecipients' element={<UserRecipient /> } />
    <Route exact path='/changepassword' element={<ChangePassword /> } />
    <Route exact path='/dashboard' element={<Dashboard /> } />
    <Route exact path='/sidebar' element={<Sidebar /> } />
    <Route exact path='/Editrecipientuser/:id' element={<Editrecipientuser /> } />
    <Route exact path='/profilesingledata/:id' element={<SingleRecipientProfile /> } />
    </Routes>
    <ToastContainer />
     
    <Footer /> 
    </>
    </Router>
      {/* ):(
        <>
        </>

        )
      } */}
     
   </>
    
  )
}

export default Routerpage;