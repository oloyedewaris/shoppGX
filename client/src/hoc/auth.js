import React, { useEffect } from "react";
import { Spin } from "antd"
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import LandingPage from "../pages/LandingPage/LandingPage";


function Auth(Component) {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);
    const email = localStorage.getItem("sh-email");
    const password = localStorage.getItem("sh-password");
    useEffect(() => {
      if (!isAuth && email && password) {
        dispatch(loginUser({ email, password }));
      }
    }, []);

    if (isAuth) {
      return <Component />;
    } else {
      if (email && password) {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <div style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30
            }}>
              <Spin size="large" />
              <h2>Loading previous user</h2>
            </div>
          );
        }
      } else {
        return <LandingPage />;
      }
    }
  };
  return AuthenticationCheck;
}

export default Auth;
