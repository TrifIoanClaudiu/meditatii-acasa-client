export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isPasswordStrong = (password) => {
  // At least 8 characters, at most 20 characters
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (!@#$%^&*)
  var regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
  
  return regex.test(password);
};

export const localities = ["Sibiu", "Cluj"];
export const materii = ["Toate", "Română", "Matematică", "Informatică"];