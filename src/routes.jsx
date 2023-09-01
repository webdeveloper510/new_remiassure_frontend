import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthProtect from './auth/AuthProtect';
import AuthDashProtect from './auth/AuthProtect';
import Home from './component/home/Home';
import Aboutus from './component/aboutus/Aboutus';
import Help from './component/help/Help';
import Signup from './component/signup/Signup';
import Referral from './component/referral/Referral';
import Login from './component/login/Login';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import RecentPassword from './component/resetPassword/ResetPassword';
import LocalStorage from './component/resetPassword/Localstorage';
import Verification from './component/verification/Verification';
import Multiple from './component/profile/Multiple';
import SendMoney from './component/send/SendMoney';
import Transfer from './component/Userdashboard/Transfer';
import AddNewRecipient from './component/Userdashboard/AddNewRecipient';
import UserProfile from './component/Userdashboard/UserProfile';
import ChangePassword from './component/Userdashboard/ChangePassword';
import UserRecipient from './component/Userdashboard/UserRecipient';
import Dashboard from './component/Userdashboard/Dashboard';
import ReferralData from './component/referralData/ReferralData';
import Editrecipientuser from './component/Userdashboard/EditUserRecipient';
import SingleRecipientProfile from './component/Userdashboard/SingleRecipientProfile';
import UserCardLists from './component/Userdashboard/UserCardLists';
import Addnewcard from './component/Userdashboard/AddNewCard';
import EditCardUser from './component/Userdashboard/EditUserCard';
import SingleCardProfile from './component/Userdashboard/SingleCardProfile';
import Page404 from './component/pageNotfound/Page404';
import UserMoney from "./component/Userdashboard/UserMoney/UserMoney"
import EmailVerify from './component/verification/EmailVerify';
import Working from './component/footer/Working';
import News from './component/footer/News';
import Privacy from './component/footer/Privacy';
import T_c from './component/footer/T_c';
import Mobile from './component/footer/Mobile';
import AML from './component/footer/Aml';
import TransactionDetails from './component/Userdashboard/TransactionDetails';

const routes = [
  {
    path: '/',
    children: [
      { path: '/', element: <Home /> },
      { path: 'about-us', element: <Aboutus /> },
      { path: 'working', element: <Working /> },
      { path: 'news', element: <News /> },
      { path: 'privacy-policy', element: <Privacy /> },
      { path: 'terms-and-condition', element: <T_c /> },
      { path: 'apps', element: <Mobile /> },
      { path: 'aml-policy', element: <AML /> },
      { path: 'help', element: <Help /> },
      { path: 'sign-up', element: <Signup /> },
      { path: 'referral', element: <Referral /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <RecentPassword /> },
      { path: 'reset-password/:id', element: <LocalStorage /> },
      { path: '/verification', element: <Verification /> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    guard: AuthProtect,
    children: [
      { path: '/multiple', element: <Multiple /> },
      { path: '/send-money', element: <SendMoney /> },
      { path: '/referral-data', element: <ReferralData /> },
    ]
  },
  {
    path: '/',
    guard: AuthDashProtect,
    children: [
      { path: '/transactions', element: <Transfer /> },
      { path: '/transaction-detail/:id', element: <TransactionDetails /> },
      { path: '/user-send-money', element: <UserMoney /> },
      { path: '/add-new-recipient', element: <AddNewRecipient /> },
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/user-recipients', element: <UserRecipient /> },
      { path: '/change-password', element: <ChangePassword /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/edit-recipient-user', element: <Editrecipientuser /> },
      { path: '/profile-single-data/:id', element: <SingleRecipientProfile /> },
      { path: '/user-card-list', element: <UserCardLists /> },
      { path: '/add-new-card', element: <Addnewcard /> },
      { path: '/edit-card-user/:id', element: <EditCardUser /> },
      { path: '/single-card-data/:id', element: <SingleCardProfile /> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: "/",
    children: [
      { path: "/remi-user-email-verification/:id", element: <EmailVerify /> }
    ]
  }
]

export default routes;