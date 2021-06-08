import axios from "axios";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "./types";
import { url } from "../../utils/url";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${url}/api/users/register`, dataToSubmit)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${url}/api/users/login`, dataToSubmit)
    .then(response => response.data)
    .catch(err => console.log(err));

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${url}/api/users/logout`)
    .then(response => response.data)
    .catch(err => console.log(err));

  return {
    type: LOGOUT_USER,
    payload: request
  };
}