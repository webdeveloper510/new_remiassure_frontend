const authChecker = (checkType) => {

  const token = localStorage.getItem('token')
  let user = JSON.parse(localStorage.getItem("remi-user-dt"))
  console.log("user",user)

  if (checkType === 'authCheck') {
    if (!token && !user) {
      return false;
    } else {
      return true;
    }
  } else if (checkType === 'dashCheck') {
    if (token && user.digital_id_verified) {
      return true;
    } else {
      return false;
    }
  }
};

export default authChecker;