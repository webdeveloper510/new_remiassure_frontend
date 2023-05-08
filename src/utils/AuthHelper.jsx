const authChecker = (checkType) => {

  const token = localStorage.getItem('token')

  if (checkType === 'authCheck') {
    if (!token) {
      return false;
    } else {
      return true;
    }
  } else if (checkType === 'dashCheck') {
    let user = JSON.parse(localStorage.getItem("remi-user-dt"))
    if (token && user.digital_id_verified) {
      return true;
    } else {
      return false;
    }
  }
};

export default authChecker;