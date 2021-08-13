/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Badge } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/userActions";

const RightMenu = ({ mode, onClose }) => {
  const savedProducts = useSelector(state => state.user.userData.savedProducts)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  if (user.isAuth) {
    return (
      <Menu mode={mode}>
        <Menu.Item key="upload" onClick={onClose}>
          <Link to="/product/upload">
            <UploadOutlined style={{ fontSize: "21px", marginBottom: 4 }} />
          </Link>
        </Menu.Item>
        <Menu.Item key="saved" onClick={onClose}>
          <Badge count={savedProducts.length}>
            <Link to="/saved" >Saved Products</Link>
          </Badge>
        </Menu.Item>
        <Menu.Item key="history" onClick={onClose}>
          <Link to="/history">Order History</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={onClose}>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={mode}>
        <Menu.Item key="login" onClick={onClose}>
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="register" onClick={onClose}>
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  }
};

export default RightMenu;
