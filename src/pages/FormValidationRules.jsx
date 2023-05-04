export default function validate(value) {
  let errors = {};

  // Comapany Error
  if(value.company_name == ''){
    errors.company_name = 'Company name is required';
  }

   // Serial Error
  if(value.device_serial_id == ''){
    errors.device_serial_id = 'Serial Code is required';
  }

  // Last Name Error
  if(value.lname == ''){
    errors.lname = 'Last Name is required';
  }

  //FirstName error
  if(value.contact_name == ''){
    errors.contact_name = 'First Name is required';
  }

  //Phone Error
  if(value.cell == ''){
    errors.cell = 'Phone Number is required';
  }
  // Useremail Error
if(value.email && !/\S+@\S+\.\S+/.test(value.email)){
    errors.email = 'Email address is invalid';
  }
  if(value.email == ''){
    errors.email = 'Email is required';
  }
  //Password
  if(value.login_password == ''){
    errors.login_password = 'Password is required';
  }

  var regexpass=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;

  if(value.password && !regexpass.test(value.password)){
    errors.password = 'Passwords must be at least 8 chars with at least 1 uppercase, 1 lowercase, 1 number and 1 special character.';
  }

  if(value.password == ''){
    errors.password = 'Password is required';
  }
  //Security Code 
  if(value.security_code == ''){
    errors.security_code = 'Security code is required';
  }

  if(value.confirm_pass && !regexpass.test(value.confirm_pass)){
    errors.confirm_pass = 'Passwords must be at least 8 chars with at least 1 uppercase, 1 lowercase, 1 number and 1 special character.';
  }

  if(value.confirm_pass == ''){
    errors.confirm_pass = 'Confirm password is required';
  }
  if(value.confirm_pass !== value.password){
    errors.confirm_pass = 'Password did not match';
  }

  if(value.project_name == ''){
    errors.project_name = 'Project Name is required';
  }
  if(value.project_date == ''){
    errors.project_date = 'Date is required';
  }
  if(value.item_speed == ''){
    errors.item_speed = 'Item Speed is required';
  }

  if(value.location == ''){
    errors.location = 'Location is required';
  }
  if(value.mobile == ''){
    errors.mobile = 'Mobile is required';
  }

  if(value.referral_code && value.referral_code.length< 6 && typeof(value.referral_code) == "number"){
    errors.referral_code = 'Referred Code is required';
  }

  if(value.reset_password_otp == ''){
    errors.reset_password_otp = 'Reset password otp is required';
  }

  

  



  // if (value.regusername && value.regusername.length <= 3 ) {
  //   errors.regusername = 'User Name must be 3 characters';
  // }if (value.regusername && value.regusername.length == 0 ) {
  //   errors.regusername = 'User Name must be 3 characters';
  // }
  // // Userpassword Error
  // if(value.regpassword && value.regpassword.length <= 5){
  //   errors.regpassword = 'Password should be more than 5 important';
  // }if(value.regpassword && value.regpassword.length == 0){
  //   errors.regpassword = 'Please enter your password';
  // }if(value.regpassword == ''){
  //   errors.regpassword = 'Please enter your password';
  // }
  // // Useremail Error
  // if(value.regemail && value.regemail.length == 0){
  //   errors.regemail = 'Please enter your email';
  // }else if(value.regemail && !/\S+@\S+\.\S+/.test(value.regemail)){
  //   errors.regemail = 'Email address is invalid';
  // }
  // if(value.regemail == ''){
  //   errors.regemail = 'Please enter your email';
  // }
  return errors;
};