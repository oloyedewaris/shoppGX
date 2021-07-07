import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

const LeftMenu = ({mode, onClose}) => {
  return (
    <Menu mode={mode}>
      <Menu.Item onClick={onClose}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>More</span>}>
        <Menu.Item onClick={onClose}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item onClick={onClose}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item onClick={onClose}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://waris-portfolio.herokuapp.com"
          >
            Portfolio
          </a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;
