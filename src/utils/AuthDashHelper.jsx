
const authDashHelper = (checkType) => {

  if (checkType === 'authCheck') {
    let login = sessionStorage.getItem("token")
    let user = JSON.parse(sessionStorage.getItem("remi-user-dt"))
    if (login === null || user === null) {
      return true
    } else {
      return false
    }
  } else if (checkType === 'dashCheck') {
    let login = sessionStorage.getItem("token")
    let user = JSON.parse(sessionStorage.getItem("remi-user-dt"))
    if (login && user?.digital_id_verified === "true") {
      return true
    } else {
      return false
    }
  }

};

export default authDashHelper;