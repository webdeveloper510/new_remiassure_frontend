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
      { path: 'about-us', element: <Aboutus /> },
      { path: 'help', element: <Help /> },
      { path: 'sign-up', element: <Signup /> },
      { path: 'referral', element: <Referral /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-passwords', element: <RecentPassword /> },
      { path: 'reset-password/:id', element: <LocalStorage /> },
      { path: '/verification', element: <Verification /> },
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
      // { path: '/user-recipients', element: <Recipients /> },
      { path: '/send-money', element: <SendMoney /> },
      { path: '/referral-data', element: <ReferralData /> },
      // { path: '/user-dashboard', element: <UserDashboard /> },
      // { path: '/user-send-money', element: <UserSendMoney /> },
      // { path: '/add-new-recipient', element: <AddNewRecipient /> },
      // { path: '/user-profile', element: <UserProfile /> },
      // { path: '/user-recipients', element: <UserRecipient /> },
      // { path: '/change-password', element: <ChangePassword /> },
      // { path: '/dashboard', element: <Dashboard /> },
      // { path: '/edit-recipient-user/:id', element: <Editrecipientuser /> },
      // { path: '/profile-single-data/:id', element: <SingleRecipientProfile /> },
      // { path: '/user-card-list', element: <UserCardLists /> },
      // { path: '/add-new-card', element: <Addnewcard /> },
      // { path: '/edit-card-user/:id', element: <EditCardUser /> },
      // { path: '/single-card-data/:id', element: <SingleCardProfile /> },
      // { path: '404', element: <Page404 /> },
      // { path: '*', element: <Navigate to="/404" /> },

    ]
  },

  //Protected Dashboard
  {
    path: '/',
    // element: <HomeLayout />,
    guard: AuthDashProtect,
    children: [
      { path: '/transfer', element: <Transfer /> },
      { path: '/user-send-money', element: <UserSendMoney /> },
      { path: '/add-new-recipient', element: <AddNewRecipient /> },
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/user-recipients', element: <UserRecipient /> },
      { path: '/change-password', element: <ChangePassword /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/edit-recipient-user/:id', element: <Editrecipientuser /> },
      { path: '/profile-single-data/:id', element: <SingleRecipientProfile /> },
      { path: '/user-card-list', element: <UserCardLists /> },
      { path: '/add-new-card', element: <Addnewcard /> },
      { path: '/edit-card-user/:id', element: <EditCardUser /> },
      { path: '/single-card-data/:id', element: <SingleCardProfile /> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },

    ]
  },
]


export default routes;



// import React from 'react';
// import { Navigate } from 'react-router-dom';

// //AuthProtect
// import AuthProtect from './auth/AuthProtect';
// import AuthDashProtect from './auth/AuthProtect';


// //Home
// import Home from './component/home/Home';
// import Aboutus from './component/aboutus/Aboutus';
// import Help from './component/help/Help';
// import Signup from './component/signup/Signup';
// import Referral from './component/referral/Referral';
// import Login from './component/login/Login';
// import ForgotPassword from './component/forgotpassword/ForgotPassword';
// import RecentPassword from './component/resetPassword/ResetPassword';
// import Profile from './component/profile/Profile';
// import Recipients from './component/userRecipients/Recipients';
// import LocalStorage from './component/resetPassword/Localstorage';
// import Verification from './component/verification/Verification';
// import Multiple from './component/profile/Multiple';
// import SendMoney from './component/send/SendMoney';
// import Transfer from './component/Userdashboard/Transfer';
// import UserSendMoney from './component/Userdashboard/UserSendMoney';
// import UserDashboard from './component/Userdashboard/UserDashboard';
// import AddNewRecipient from './component/Userdashboard/AddNewRecipient';
// import UserProfile from './component/Userdashboard/UserProfile';
// import ChangePassword from './component/Userdashboard/ChangePassword';
// import UserRecipient from './component/Userdashboard/UserRecipient';
// import Dashboard from './component/Userdashboard/Dashboard';
// import Sidebar from './component/Userdashboard/Sidebar';
// import ReferralData from './component/referralData/ReferralData';
// import Editrecipientuser from './component/Userdashboard/EditUserRecipient';
// import SingleRecipientProfile from './component/Userdashboard/SingleRecipientProfile';
// import UserCardLists from './component/Userdashboard/UserCardLists';
// import Addnewcard from './component/Userdashboard/AddNewCard';
// import EditCardUser from './component/Userdashboard/EditUserCard';
// import SingleCardProfile from './component/Userdashboard/SingleCardProfile';
// import Page404 from './component/pageNotfound/Page404';
// import GoToTop from './GoToTop';

// console.log("---------------ROuting-------------------")
// const protect = (value) => {
//   console.log("--------------value")
//   if (value == "auth") {
//     let login = localStorage.getItem("token")
//     if (login) {
//       return true
//     } else {
//       return false
//     }
//   } else if (value == "dash") {
//     let login = localStorage.getItem("token")
//     let userdt = JSON.parse(localStorage.getItem("remi-user-dt"))
//     if (login && userdt.digital_id_verified) {
//       return true
//     } else {
//       return false
//     }
//   }
// }
// const routes = [
//   {
//     path: '/',
//     children: [
//       { path: '/', element: <Home /> },
//       { path: 'about-us', element: <Aboutus /> },
//       { path: 'help', element: <Help /> },
//       { path: 'sign-up', element: <Signup /> },
//       { path: 'referral', element: <Referral /> },
//       { path: 'login', element: <Login /> },
//       { path: 'forgot-password', element: <ForgotPassword /> },
//       { path: 'reset-passwords', element: <RecentPassword /> },
//       { path: 'reset-password/:id', element: <LocalStorage /> },
//       { path: '/verification', element: <Verification /> },
//       { path: '/referral-data', element: <ReferralData /> },
//       { path: '/multiple', element: <Multiple /> },
//       { path: '/send-money', element: protect("auth") == true ? <SendMoney /> : <Navigate to="/login" /> },
//       { path: '/transfer', element: protect("auth") == true ? <Transfer /> : <Navigate to="/login" /> },
//       { path: '/user-send-money', element: protect("dash") == true ? <UserSendMoney /> : <Navigate to="/send-money" /> },
//       { path: '/add-new-recipient', element: protect("dash") == true ? <AddNewRecipient /> : <Navigate to="/send-money" /> },
//       { path: '/user-profile', element: protect("dash") == true ? <UserProfile /> : <Navigate to="/send-money" /> },
//       { path: '/user-recipients', element: protect("dash") == true ? <UserRecipient /> : <Navigate to="/send-money" /> },
//       { path: '/change-password', element: protect("dash") == true ? <ChangePassword /> : <Navigate to="/send-money" /> },
//       { path: '/dashboard', element: protect("dash") == true ? <Dashboard /> : <Navigate to="/send-money" /> },
//       { path: '/edit-recipient-user/:id', element: protect("dash") == true ? <Editrecipientuser /> : <Navigate to="/send-money" /> },
//       { path: '/profile-single-data/:id', element: protect("dash") == true ? <SingleRecipientProfile /> : <Navigate to="/send-money" /> },
//       { path: '/user-card-list', element: protect("dash") == true ? <UserCardLists /> : <Navigate to="/send-money" /> },
//       { path: '/add-new-card', element: protect("dash") == true ? <Addnewcard /> : <Navigate to="/send-money" /> },
//       { path: '/edit-card-user/:id', element: protect("dash") == true ? <EditCardUser /> : <Navigate to="/send-money" /> },
//       { path: '/single-card-data/:id', element: protect("dash") == true ? <SingleCardProfile /> : <Navigate to="/send-money" /> },
//       { path: '404', element: <Page404 /> },
//       { path: '*', element: <Navigate to="/404" /> },

//     ]
//   },

//   // {
//   //   path: '/',
//   //   // element: <HomeLayout />,
//   //   // guard: AuthProtect,
//   //   children: [

//   //     // { path: '/user-recipients', element: <Recipients /> },

//   //     // { path: '/user-dashboard', element: <UserDashboard /> },
//   //     // { path: '/usersendmoney', element: <UserSendMoney /> },
//   //     // { path: '/addnewrecipient', element: <AddNewRecipient /> },
//   //     // { path: '/userprofile', element: <UserProfile /> },
//   //     // { path: '/userrecipients', element: <UserRecipient /> },
//   //     // { path: '/changepassword', element: <ChangePassword /> },
//   //     // { path: '/dashboard', element: <Dashboard /> },
//   //     // { path: '/editrecipientuser/:id', element: <Editrecipientuser /> },
//   //     // { path: '/profilesingledata/:id', element: <SingleRecipientProfile /> },
//   //     // { path: '/usercardlists', element: <UserCardLists /> },
//   //     // { path: '/addnewcard', element: <Addnewcard /> },
//   //     // { path: '/editcarduser/:id', element: <EditCardUser /> },
//   //     // { path: '/singlecarddata/:id', element: <SingleCardProfile /> },
//   //     // { path: '404', element: <Page404 /> },
//   //     // { path: '*', element: <Navigate to="/404" /> },
//   //   ]
//   // },

//   // //Protected Dashboard
//   // {
//   //   path: '/',
//   //   // element: <HomeLayout />,
//   //   guard: AuthDashProtect,
//   //   children: [

//   //     // { path: '404', element: <Page404 /> },
//   //     // { path: '*', element: <Navigate to="/404" /> },
//   //   ]
//   // },
// ]


// export default routes;