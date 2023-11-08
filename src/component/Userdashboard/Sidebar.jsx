import React, { useState, useEffect, useRef } from "react";
import { NavLink, generatePath } from 'react-router-dom';
import { BsCurrencyExchange, BsFillWalletFill, BsFillPersonPlusFill, BsFilePersonFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { generateRandomKey } from "../../utils/hook";


const Sidebar = () => {


  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (

    <>
      <div className={`Sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <button className="btn view_mobile_sidebar toggle-button" onClick={handleSidebarToggle}><RxDashboard /> View Dashboard</button>

        <div className="sidebar">
          {isOpen && (
            <label className="close-sidebar btn-close" onClick={handleCloseSidebar}>

            </label>
          )}
          <nav>
            <ul>
              <li><NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink></li>
              <li><NavLink to={`/user-send-money`}><BsCurrencyExchange />New Transfer</NavLink></li>
              <li><NavLink to="/user-profile"><BsFilePersonFill />Profile Information</NavLink></li>
              <li><NavLink to="/payment-detail"><BsFillWalletFill />Payment Details</NavLink></li>
              <li><NavLink to="/transactions"><BiTransfer />Transactions</NavLink></li>
              <li><NavLink to="/user-recipients"><BsFillPersonPlusFill />Recipients</NavLink></li>
              <li><NavLink to="/change-password"><RiLockPasswordLine />Password</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={handleCloseSidebar} />}
    </>
  )
}



export default Sidebar;