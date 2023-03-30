import React, { useState, useEffect } from "react";
import {Links, NavLink, useNavigate, useParams} from 'react-router-dom';


const LocalStorage = () => {

    const [token,setToken] = useState(0);
    const {id} = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('token_forgot',id)
       // history.push('/resetpasswordsss')
        navigate('/resetpasswords');     
    
      }, [token]);

    
    
    return(
        <>

        </>

    )
}



export default LocalStorage;