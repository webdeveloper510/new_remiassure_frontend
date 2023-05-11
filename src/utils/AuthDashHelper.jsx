
const authDashHelper = (checkType) => {

  if (checkType === 'authCheck') {
    let login = localStorage.getItem('token')
    let user = JSON.parse(localStorage.getItem("remi-user-dt"))
    if (login != null && user == null) {
      return false
    } else {
      console.log("++++++++++++++++++++", login , user)
      return true
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