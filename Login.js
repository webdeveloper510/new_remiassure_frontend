import Axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

    const [data, setData] = useState({ email: null, password: null })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8080/login", data).then((res) => {
            console.log("is user loged in", data)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" id="none" value={data?.email} onChange={handleChange} />
                <input type="text" name="password" id="none" value={data?.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login