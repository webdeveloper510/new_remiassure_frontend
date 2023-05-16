import Axios from "axios";
import global from './global';

const token = localStorage.getItem("token")
const token_forgot = localStorage.getItem("token_forgot")
Axios.defaults.baseURL = `${global.serverUrl}`;

export const userRegister = async (data) => {
  const response = await Axios.post("/register/", data).then(res => {
    return res.data
  })
  return response
}

export const userLogin = async (data) => {
  const response = await Axios.post("/login/", data).then(res => {
    return res.data
  })
  return response
}

export const verifyEmail = async (data) => {
  const response = await Axios.post("/verify-email/",data)
    .then(res => {
      return res.data
    })
  return response
}


export const resendOtp = async (data) => {

  const response = await Axios.post("/resend-otp/",data)
    .then(res => {
      return res.data
    })
  return response
}

export const changePassword = async (data) => {
  const response = await Axios.post("/change-password/", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  }).then(res => {
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
  const response = await Axios.post("/reset-password/", data).then(res => {
    return res.data
  })
  return response
}

export const updateProfile = async (data) => {
  const response = await Axios.post("/update-profile/", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const transactionHistory = async (data) => {
  const response = await Axios.post("/payment/transaction-history/", data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const pendingPayment = async (data) => {
  const response = await Axios.post("/payment/pending-transactions/", data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const completedPayment = async (data) => {
  const response = await Axios.post("/payment/completed-transactions/", data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const createRecipient = async (data) => {
  const response = await Axios.post("/payment/recipient-create/", data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const getCardData = async (id) => {
  const response = await Axios.post(`/payment/card/${id}`,{},{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const updateCardUser = async (id, data) => {
  const response = await Axios.patch(`/payment/card/${id}`,data,{
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const getUserRecipient = async (id) => {
  const response = await Axios.get(`/payment/recipient-update/${id}`,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const updateUserRecipient = async (id ,data) => {
  const response = await Axios.post(`/payment/recipient-update/${id}`,data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const cardList = async (data) => {
  const response = await Axios.post("/payment/card-list/",data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const recipientList = async (data) => {
  const response = await Axios.post("/payment/recipient-list/",data,{
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}
