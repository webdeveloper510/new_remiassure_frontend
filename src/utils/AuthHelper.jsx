const authChecker = (checkType) => {
    // const user = JSON.parse(localStorage.getItem('token'));

    const user = localStorage.getItem('token')
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
  
  export default authChecker;