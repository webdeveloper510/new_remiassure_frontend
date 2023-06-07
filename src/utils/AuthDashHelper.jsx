
const authDashHelper = (checkType) => {

  if (checkType === 'authCheck') {
    let login = localStorage.getItem('token')
    let user = JSON.parse(localStorage.getItem("remi-user-dt"))
    if (login === null || user === null) {
      return true
    } else {
      return false
    }
  } else if (checkType === 'dashCheck') {
    let login = localStorage.getItem('token')
    let user = JSON.parse(localStorage.getItem("remi-user-dt"))
    if (login && user?.digital_id_verified === "true") {
      return true
    } else {
      return false
    }
  }

};

export default authDashHelper;