import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuth: false,
  isAdmin: false,
  userId: null,
  userData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      if (action.payload && action.payload.registerSuccess) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("tokenExp", action.payload.tokenExp);
        return {
          ...state,
          registerSuccess: action.payload.registerSuccess,
          userData: action.payload.userData,
          isAuth: action.payload.userData.isAuth,
          isAdmin: action.payload.userData.isAdmin,
          userId: action.payload.userId
        };
      }
    case LOGIN_USER:
      if (action.payload && action.payload.loginSuccess) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("tokenExp", action.payload.tokenExp);
        return {
          ...state,
          loginSucces: action.payload.loginSucces,
          userData: action.payload.userData,
          isAuth: action.payload.userData.isAuth,
          isAdmin: action.payload.userData.isAdmin,
          userId: action.payload.userId
        };
      }
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      return {
        ...state,
        logoutSuccess: action.payload.success,
        userId: null,
        isAuth: false,
        isAdmin: false,
        userData: {}
      };
    default:
      return state;
  }
}