import React from "react";
import { NavLink } from 'react-router-dom';
import { BsCurrencyExchange } from "react-icons/bs";
import { BsFilePersonFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegCreditCard } from "react-icons/fa";

const sidebar = () => {

  return (
    <>
      <div className="sidebar">
        <nav>
          <ul>
            <li><NavLink to="/dashboard"><RxDashboard />Dashboard</NavLink></li>
            <li><NavLink to="/dashboard/new-transfer"><BsCurrencyExchange />New Transfer</NavLink></li>
            <li><NavLink to="/dashboard/profile"><BsFilePersonFill />Profile Information</NavLink></li>
            <li><NavLink to="/dashboard/transactions"><BiTransfer />Transactions</NavLink></li>
            <li><NavLink to="/dashboard/recipients"><BsFillPersonPlusFill />Recipients</NavLink></li>
            <li><NavLink to="/dashboard/card-list"><FaRegCreditCard />Cards</NavLink></li>
            <li><NavLink to="/dashboard/change-password"><RiLockPasswordLine />Password</NavLink></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default sidebar;