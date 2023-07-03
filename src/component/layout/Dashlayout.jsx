import React, { useEffect } from 'react'
import Sidebar from '../Userdashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router';

const Dashlayout = () => {

    const navigate = useNavigate()

    useEffect(() => {
        let login = localStorage.getItem('token')
        let user = JSON.parse(localStorage.getItem("remi-user-dt"))
        if (login && user.digital_id_verified !== "true") {
            navigate('/send-money');
        } else if (login === null && user === null) {
            navigate('/login');
        }
    }, [])

    return (
        <div className="margin-set">
            <div className="tabs-page">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashlayout