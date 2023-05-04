import Axios from "axios";
import global from './global';

let signupToken = localStorage.getItem("signup_token")
console.log(signupToken)
const token = localStorage.getItem("token")
console.log("token", token)
const token_forgot = localStorage.getItem("token_forgot")
const customerId_forgot = localStorage.getItem("customerId_forgot");
console.log("token_forgot", token_forgot)
Axios.defaults.baseURL = `${global.serverUrl}`;

export const userRegister = async (data) => {
  const response = await Axios.post("/register/", data).then(res => {
    return res.data
  })
  return response
}

export const userLogin = async (data) => {
  console.log("login-data" , data)
  const response = await Axios.post("/login/", data).then(res => {
    return res.data
  })
  return response
}

export const verifyEmail = async (data) => {
  console.log("data++++",data)
  const response = await Axios.post("/verify-email/", {
    email_otp: data
  }, {
       headers: {
             'Content-Type': 'application/json',
             "Authorization" : `Bearer ${signupToken}`,
        },
  })
    .then(res => {
      return res.data
    })
  return response
}

export const changePassword = async (data) => {
  const response = await Axios.post("/change-password", data).then(res => {
    return res.data
  })
  return response
}

export const resetEmail = async (data) => {
  const response = await Axios.post("/send-password-reset-email/", {
    email: data
  },{
    header:{
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token_forgot}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const resetPassword = async (data) => {
  console.log("data+++" , data)
  const response = await Axios.post("/reset-password/",data,{
    header:{
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${signupToken ? signupToken : token}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const updateProfile = async (data) => {
  const response = await Axios.post("/update-profile", data).then(res => {
    return res.data
  })
  return response
}

export const UserProfile = async (data) => {
  const response = await Axios.post("/user-profile", data).then(res => {
    return res.data
  })
  return response
}


