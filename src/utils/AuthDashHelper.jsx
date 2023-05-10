
const authDashHelper = (checkType) => {
  const login = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem("remi-user-dt"))
  if (checkType === 'authCheck') {
    if (!login) {
      return false
    } else {
      return true
    }
  } else if (checkType === 'dashCheck') {
    if (login && user?.digital_id_verified === "true") {
      return true
    } else {
      return false
    }
  }

};

export default authDashHelper;