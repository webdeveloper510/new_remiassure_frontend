import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthProtect from './auth/AuthProtect';
import AuthDashProtect from './auth/AuthProtect';
import Home from './component/home/Home';
import Aboutus from './component/aboutus/Aboutus';
import Help from './component/help/Help';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import RecentPassword from './component/resetPassword/ResetPassword';
import LocalStorage from './component/resetPassword/Localstorage';
import Verification from './component/verification/Verification';
import SendMoney from './component/send/SendMoney';
import Transfer from './component/Userdashboard/Transfer';
import AddNewRecipient from './component/Userdashboard/AddNewRecipient';
import UserProfile from './component/Userdashboard/UserProfile';
import ChangePassword from './component/Userdashboard/ChangePassword';
import UserRecipient from './component/Userdashboard/UserRecipient';
import Dashboard from './component/Userdashboard/Dashboard';
import Editrecipientuser from './component/Userdashboard/EditUserRecipient';
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
import PayIdDetail from './component/Userdashboard/paymentDetails/PayIdDetail';
import PayToDetail from './component/Userdashboard/paymentDetails/PayToDetail';
import Layout from './component/layout/Layout';
import NonDashLayout from './component/layout/NonDashLayout';
const RouteWithBodyClass = ({ element, bodyClass }) => {
  useEffect(() => {
    document.body.className = bodyClass;

    // Cleanup when the component is unmounted
    return () => {
      document.body.className = '';
    };
  }, [bodyClass]);

  return element;
};
const routes = [
  
  {
    path: '/',
    children: [
      { path: '/', element: <NonDashLayout><Home /></NonDashLayout> },
      { path: 'about-us', element: <NonDashLayout><RouteWithBodyClass element={<Aboutus />} bodyClass="aboutus-page" /></NonDashLayout> },
      { path: 'working', element: <NonDashLayout><Working /> </NonDashLayout> },
      { path: 'news', element: <NonDashLayout><News /> </NonDashLayout> },
      { path: 'privacy-policy', element: <NonDashLayout><RouteWithBodyClass element={<Privacy />} bodyClass="bg-image" /></NonDashLayout> },
      { path: 'terms-and-condition', element: <NonDashLayout> <RouteWithBodyClass element={<T_c />} bodyClass="bg-image" /> </NonDashLayout> },
      { path: 'apps', element: <NonDashLayout><Mobile /> </NonDashLayout> },
      { path: 'aml-policy', element: <NonDashLayout> <RouteWithBodyClass element={<AML />} bodyClass="bg-image" />  </NonDashLayout> },
      { path: 'help', element: <NonDashLayout><RouteWithBodyClass element={<Help />} bodyClass="bg-image" /></NonDashLayout> },
      { path: 'sign-up', element: <NonDashLayout><RouteWithBodyClass element={<Signup />} bodyClass="signup-page" /> </NonDashLayout> },
      { path: 'login', element:  <NonDashLayout><RouteWithBodyClass element={<Login />} bodyClass="signup-page" /> </NonDashLayout>},
      { path: 'forgot-password', element: <NonDashLayout><RouteWithBodyClass element={<ForgotPassword />} bodyClass="signup-page" /></NonDashLayout> },
      { path: 'reset-password', element: <NonDashLayout><RecentPassword /> </NonDashLayout> },
      { path: 'reset-password/:id', element: <NonDashLayout><LocalStorage /> </NonDashLayout> },
      { path: '/verification', element: <NonDashLayout><Verification /></NonDashLayout> },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    guard: AuthProtect,
    children: [
      // { path: '/referral', element: <Referral /> },
      { path: '/send-money', element: <NonDashLayout><RouteWithBodyClass element={<SendMoney />} bodyClass="footer-space" /></NonDashLayout> },
    ]
  },
  {
    path: '/',
    guard: AuthDashProtect,
    children: [
      { path: '/transactions', element: <Layout><Transfer /></Layout> },
      { path: '/transaction-detail/:id', element: <Layout><TransactionDetails /></Layout> },
      { path: '/user-send-money', element: <Layout><UserMoney /></Layout> },
      { path: '/add-new-recipient', element: <Layout><AddNewRecipient /></Layout> },
      { path: '/user-profile', element: <Layout> <RouteWithBodyClass element={<UserProfile />} bodyClass="footer-space" /> </Layout> },
      { path: '/user-recipients', element: <Layout><UserRecipient /></Layout> },
      { path: '/change-password', element: <Layout><ChangePassword /></Layout> },
      { path: '/dashboard', element: <Layout><RouteWithBodyClass element={<Dashboard />} bodyClass="footer-space" /></Layout> },
      { path: '/edit-recipient-user', element: <Layout><Editrecipientuser /></Layout> },
      { path: "/payment-detail/agreement-detail", element: <Layout><PayToDetail /></Layout> },
      { path: "/payment-detail/pay-id-detail", element: <Layout><PayIdDetail /></Layout> },
      // { path: '/profile-single-data/:id', element: <SingleRecipientProfile /></Layout> },
      // { path: '/user-card-list', element: <UserCardLists /> },
      // { path: '/add-new-card', element: <Addnewcard /> },
      // { path: '/edit-card-user/:id', element: <EditCardUser /> },
      // { path: '/single-card-data/:id', element: <SingleCardProfile /> },
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