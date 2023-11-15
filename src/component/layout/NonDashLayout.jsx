import React, { Children } from 'react'
import Header from '../header/Header'

const NonDashLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default NonDashLayout