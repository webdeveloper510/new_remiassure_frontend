
const authDashHelper = (checkType) => {
    // const user = JSON.parse(localStorage.getItem('token'));
    console.log('checkType+++++++', checkType)

    const user = localStorage.getItem('token-verify')
    console.log('checkUSer+++++++', user)
    if (checkType === 'authCheck') {
      if (!user) {
        return false;
      }
      return true;
    }
    if (!user || checkType !== user.userType) {
      return false;
    }
    return true;
  };
  
  export default authDashHelper;