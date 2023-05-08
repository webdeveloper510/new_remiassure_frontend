import Axios from "axios";
import global from './global';

let signupToken = localStorage.getItem("signup_token")
console.log(signupToken)
const token = localStorage.getItem("token")
console.log("token", token)
const token_forgot = localStorage.getItem("token_forgot")
const customerId_forgot = localStorage.getItem("customerId_forgot");
// console.log("token_forgot", token_forgot)
Axios.defaults.baseURL = `${global.serverUrl}`;

export const userRegister = async (data) => {
  // console.log(data)
  const response = await Axios.post("/register/", data).then(res => {
    return res.data
  })
  return response
}

export const userLogin = async (data) => {
  // console.log("login-data" , data)
  const response = await Axios.post("/login/", data).then(res => {
    return res.data
  })
  return response
}

export const verifyEmail = async (data) => {
  // console.log("data++++",data)
  const response = await Axios.post("/verify-email/",data)
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
  }, {
    header: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token_forgot}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const resetPassword = async (data) => {
  // console.log("data+++" , data)
  const response = await Axios.post("/reset-password/", data).then(res => {
    return res.data
  })
  return response
}

export const updateProfile = async (data) => {
  console.log("signup",signupToken ,token)
  const response = await Axios.post("/update-profile/", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${signupToken ? signupToken : token}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const userProfile = async (data) => {
  const response = await Axios.post("/user-profile/", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${signupToken ? signupToken : token}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const exchangeRate = async (data) => {
  const response = await Axios.post("/exchange-rate/", data).then(res => {
    return res.data.data
  })
  return response
}


export const paymentSummary = async (data) => {
  const response = await Axios.post("/payment/summary/", {transaction_id:data},{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

// http://3.101.154.87:8000/payment/transaction-history/
export const transactionHistory = async (data) => {
  const response = await Axios.post("/payment/transaction-history/", data,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const pendingPayment = async (data) => {
  const response = await Axios.post("/payment/pending-transactions/", data,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

// payment/completed-transactions/
export const completedPayment = async (data) => {
  const response = await Axios.post("/payment/completed-transactions/", data,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

// payment/recipient-create/
export const createRecipient = async (data) => {
  const response = await Axios.post("/payment/recipient-create/", data,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

// payment/card-list/

// payment/card/
export const cardPayment = async (id) => {
  const response = await Axios.post(`/payment/card/${id}`,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

// payment/recipient-update/
export const updatePayment = async (data) => {
  const response = await Axios.post("/payment/recipient-update/",data,{
    headers: {
      "Authorization": `Bearer ${signupToken ? signupToken : token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

