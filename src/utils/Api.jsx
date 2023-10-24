import Axios from "axios";
import global from './global';

const token = localStorage.getItem("token")
const token_forgot = localStorage.getItem("token_forgot")
// let url = window.location.hostname
// Axios.defaults.baseURL = `${url}:8000`;
Axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const userRegisterCheck = async (data) => {
  const response = await Axios.post("/register-check/", data).then(res => {
    return res.data
  })
  return response
}

export const userRegisterVerify = async (data) => {
  const response = await Axios.post("/register-verify/", data).then(res => {
    return res.data
  })
  return response
}

export const registerOtpResend = async (data) => {
  const response = await Axios.post("/resend-register-otp/", data).then(res => {
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
  const response = await Axios.post("/verify-email/", data)
    .then(res => {
      return res.data
    })
  return response
}


export const resendOtp = async (data) => {

  const response = await Axios.post("/resend-otp/", data)
    .then(res => {
      return res.data
    })
  return response
}

export const changePassword = async (data) => {
  const response = await Axios.post("/change-password/", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res.data
  })
  return response
}

export const resetEmail = async (data) => {
  const response = await Axios.post("/send-password-reset-email/", data).then(res => {
    return res
  })
  return response
}

export const sendEmail = async () => {
  const response = await Axios.post("/send-signup-emails/", {}, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    return err
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
      "Authorization": `Bearer ${localStorage.getItem("token")}`
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
      "Authorization": `Bearer ${localStorage.getItem("token")}`
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
  const response = await Axios.post("/payment/summary/", { transaction_id: data }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const transactionHistory = async (data) => {
  const response = await Axios.post("/payment/transaction-history/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const pendingPayment = async (data) => {
  const response = await Axios.post("/payment/pending-transactions/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const completedPayment = async (data) => {
  const response = await Axios.post("/payment/completed-transactions/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const createRecipient = async (data) => {
  const response = await Axios.post("/payment/recipient-create/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const getCardData = async (id) => {
  const response = await Axios.post(`/payment/card/${id}`, {}, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const updateCardUser = async (id, data) => {
  const response = await Axios.patch(`/payment/card/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const getUserRecipient = async (id) => {
  const response = await Axios.get(`/payment/recipient-update/${id}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const updateUserRecipient = async (id, data) => {
  const response = await Axios.post(`/payment/recipient-update/${id}`, data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const cardList = async (data) => {
  const response = await Axios.post("/payment/card-list/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}


export const recipientList = async (data) => {
  const response = await Axios.post("/payment/recipient-list/", data, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const activEmail = async (data) => {
  const response = await Axios.post(`/activate-email/`, { customer_id: data }).then(res => {
    return res.data
  }).catch(error => {
    return "failed"
  })

  return response
}

export const userCharge = async (data) => {
  const response = await Axios.post(`/payment/stripe/user-charge/`, data, {
    headers: {
      //'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    return res.data
  })
  return response
}

export const ZaiPayId = async (data) => {
  const response = await Axios.post(`/payment/zai-payid/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    // //console.log(res)
    return res.data
  }).catch(err => {
    // //console.log(err)
    return err
  })
  return response
}

export const ZaiPayTo = async (data) => {
  const response = await Axios.post(`/payment/zai-payto/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const ZaiDashPayTo = async (data) => {
  const response = await Axios.post(`/payment/zai-payto-login/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const ZaiDashPayId = async (data) => {
  const response = await Axios.post(`/payment/zai-payid-login/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const verifyPayId = async (data) => {
  const response = await Axios.post(`/payment/zai-payid-check/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const verifyPayTo = async (data) => {
  const response = await Axios.post(`/payment/zai-payto-check/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const createPayId = async (data) => {
  const response = await Axios.post(`payment/zai-payid-register/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const createAgreement = async (data) => {
  const response = await Axios.post(`payment/zai-create-agreement/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const getAgreementList = async () => {
  const response = await Axios.post(`payment/zai-agreement-list/`, {}, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response

}

export const updateAgreement = async (data) => {
  const response = await Axios.post(`payment/zai-update-agreement/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const getVeriffStatus = async (data) => {
  const response = await Axios.post(`veriff/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}


export const createTransaction = async (data) => {
  const response = await Axios.post(`payment/create-transaction/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const pendingTransactions = async () => {
  const response = await Axios.get(`payment/pending-transactions/`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const getPreferredCurrency = async () => {
  const response = await Axios.get(`destination-currency/`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}

export const setPreferredCurrency = async (data) => {
  const response = await Axios.post(`destination-currency/`, data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(res => {
    //console.log(res)
    return res.data
  }).catch(err => {
    //console.log(err)
    return err
  })
  return response
}