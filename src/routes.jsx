import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from './component/home/Home';
import Aboutus from './component/aboutus/Aboutus';
import Help from './component/help/Help';
import Signup from './component/signup/Signup';
import Referral from './component/referral/Referral';
import Login from './component/login/Login';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import RecentPassword from './component/resetPassword/ResetPassword';
import Verification from './component/verification/Verification';
import SendMoney from './component/send/SendMoney';
import Transfer from './component/Userdashboard/Transfer';
import AddNewRecipient from './component/Userdashboard/AddNewRecipient';
import UserProfile from './component/Userdashboard/UserProfile';
import ChangePassword from './component/Userdashboard/ChangePassword';
import UserRecipient from './component/Userdashboard/UserRecipient';
import Dashboard from './component/Userdashboard/Dashboard';
import Editrecipientuser from './component/Userdashboard/EditUserRecipient';
import UserCardLists from './component/Userdashboard/UserCardLists';
import Addnewcard from './component/Userdashboard/AddNewCard';
import EditCardUser from './component/Userdashboard/EditUserCard';
import Page404 from './component/pageNotfound/Page404';
import UserMoney from "./component/Userdashboard/UserMoney/UserMoney"
import EmailVerify from './component/verification/EmailVerify';
import Working from './component/footer/Working';
import News from './component/footer/News';
import Privacy from './component/footer/Privacy';
import T_c from './component/footer/T_c';
import Mobile from './component/footer/Mobile';
import AML from './component/footer/Aml';
import Dashlayout from './component/layout/Dashlayout';

const routes = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
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
      { path: '/verification', element: <Verification /> },
      { path: "/remi-user-email-verification/:id", element: <EmailVerify /> },
      { path: '/send-money', element: <SendMoney /> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: 'dashboard',
    element: <Dashlayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'transactions', element: <Transfer /> },
      { path: 'new-transfer', element: <UserMoney /> },
      { path: 'add-recipient', element: <AddNewRecipient /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'recipients', element: <UserRecipient /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'edit-recipient', element: <Editrecipientuser /> },
      { path: 'card-list', element: <UserCardLists /> },
      { path: 'add-new-card', element: <Addnewcard /> },
      { path: 'edit-card-user/:id', element: <EditCardUser /> },
    ]
  }
]

export default routes;