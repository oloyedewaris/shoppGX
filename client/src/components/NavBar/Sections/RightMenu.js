/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/userActions";

const RightMenu = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  if (user.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item>Welcome, {`${user.userData.firstname}`}</Menu.Item>
        {user.isAdmin && (
          <Menu.Item key="upload">
            <Link to="/product/upload">
              <UploadOutlined style={{ fontSize: "21px", marginBottom: 4 }} />
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="history">
          <Link to="/history">Order History</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  }
};

export default RightMenu;
