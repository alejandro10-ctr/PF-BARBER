import axios from "axios";

export const changePassword = async (email, password) => {
  return await axios.put(`/api/user/changepassword`, {
    email: email,
    password: password,
  });
};
