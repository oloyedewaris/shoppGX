import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

const LeftMenu = props => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>More</span>}>
        <Menu.Item>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item>
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
