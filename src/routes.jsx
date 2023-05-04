import React from 'react';
import { Navigate } from 'react-router-dom';

//AuthProtect
import AuthProtect from './auth/AuthProtect';
import AuthDashProtect from './auth/AuthProtect';


//Home
import Home from './component/home/Home';
import Aboutus from './component/aboutus/Aboutus';
import Help from './component/help/Help';
import Signup from './component/signup/Signup';
import Referral from './component/referral/Referral';
import Login from './component/login/Login';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import RecentPassword from './component/resetPassword/ResetPassword';
import Profile from './component/profile/Profile';
import Recipients from './component/userRecipients/Recipients';
import LocalStorage from './component/resetPassword/Localstorage';
import Verification from './component/verification/Verification';
import Multiple from './component/profile/Multiple';
import SendMoney from './component/send/SendMoney';
import Transfer from './component/Userdashboard/Transfer';
import UserSendMoney from './component/Userdashboard/UserSendMoney';
import UserDashboard from './component/Userdashboard/UserDashboard';
import AddNewRecipient from './component/Userdashboard/AddNewRecipient';
import UserProfile from './component/Userdashboard/UserProfile';
import ChangePassword from './component/Userdashboard/ChangePassword';
import UserRecipient from './component/Userdashboard/UserRecipient';
import Dashboard from './component/Userdashboard/Dashboard';
import Sidebar from './component/Userdashboard/Sidebar';
import ReferralData from './component/referralData/ReferralData';
import Editrecipientuser from './component/Userdashboard/EditUserRecipient';
import SingleRecipientProfile from './component/Userdashboard/SingleRecipientProfile';
import UserCardLists from './component/Userdashboard/UserCardLists';
import Addnewcard from './component/Userdashboard/AddNewCard';
import EditCardUser from './component/Userdashboard/EditUserCard';
import SingleCardProfile from './component/Userdashboard/SingleCardProfile';
import Page404 from './component/pageNotfound/Page404';
import GoToTop from './GoToTop';


const routes = [


  {
    path: '/',
    children: [
      { path: '/', element: <Home /> },
      { path: 'aboutus', element: <Aboutus /> },
      { path: 'help', element: <Help /> },
      { path: 'signup', element: <Signup /> },
      { path: 'referral', element: <Referral /> },
      { path: 'login', element: <Login /> },
      { path: 'forgotpassword', element: <ForgotPassword /> },
      { path: 'resetpasswords', element: <RecentPassword /> },
      { path: 'resetpassword/:id', element: <LocalStorage /> },

      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },


    ]
  },

  {
    path: '/',
    // element: <HomeLayout />,
    guard: AuthProtect,
    children: [
        
        { path: '/multiple', element: <Multiple /> },
        { path: '/user-recipients', element: <Recipients /> },
        { path: '/verification', element: <Verification /> },
        { path: '/send-money', element: <SendMoney /> },
        { path: '/transfer', element: <Transfer /> },
        { path: '/referral-data', element: <ReferralData /> },
        // { path: '/user-dashboard', element: <UserDashboard /> },
        { path: '/user-sendmoney', element: <UserSendMoney /> },
        { path: '/addnewrecipient', element: <AddNewRecipient /> },
        { path: '/userprofile', element: <UserProfile /> },
        { path: '/userrecipients', element: <UserRecipient /> },
        { path: '/changepassword', element: <ChangePassword /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/editrecipientuser/:id', element: <Editrecipientuser /> },
        { path: '/profilesingledata/:id', element: <SingleRecipientProfile /> },
        { path: '/usercardlists', element: <UserCardLists /> },
        { path: '/addnewcard', element: <Addnewcard /> },
        { path: '/editcarduser/:id', element: <EditCardUser /> },
        { path: '/singlecarddata/:id', element: <SingleCardProfile /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },

    ]
  },

//Protected Dashboard
{
  path: '/',
  // element: <HomeLayout />,
  guard: AuthDashProtect,
  children: [
      
      { path: '/user-sendmoney', element: <UserSendMoney /> },
      { path: '/addnewrecipient', element: <AddNewRecipient /> },
      { path: '/userprofile', element: <UserProfile /> },
      { path: '/userrecipients', element: <UserRecipient /> },
      { path: '/changepassword', element: <ChangePassword /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/editrecipientuser/:id', element: <Editrecipientuser /> },
      { path: '/profilesingledata/:id', element: <SingleRecipientProfile /> },
      { path: '/usercardlists', element: <UserCardLists /> },
      { path: '/addnewcard', element: <Addnewcard /> },
      { path: '/editcarduser/:id', element: <EditCardUser /> },
      { path: '/singlecarddata/:id', element: <SingleCardProfile /> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },

  ]
},
]


export default routes;