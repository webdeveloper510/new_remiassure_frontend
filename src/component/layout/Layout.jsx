import React from 'react'
import routes from '../../routes';
import { useRoutes } from 'react-router';
import Sidebar from '../Userdashboard/Sidebar';
import DashHeader from '../header/DashHeader';

const Layout = ({ children }) => {
    return (
        <div>
            <DashHeader />
            <div className="margin-set">
                <div className="tabs-page">
                    <Sidebar />
                    <div className="content-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout