import React from 'react'
import routes from '../../routes';
import { useNavigate, useRoutes } from 'react-router';
import Sidebar from '../Userdashboard/Sidebar';
// import DashHeader from '../header/DashHeader';
import Header from '../header/Header';

const Layout = ({ children }) => {

    // const navigate = useNavigate()
    // const
    //     useEffect(() => {
    //         if (authDashHelper('dashCheck') === false) {
    //             navigate("/send-money")
    //         }
    //     }, [])

    return (
        <div>
            <Header />
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