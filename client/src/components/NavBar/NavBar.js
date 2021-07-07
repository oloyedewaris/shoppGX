import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Badge, Switch } from "antd";
import { MenuFoldOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import "./Sections/Navbar.css";
import "../../index.compact.css";

const NavBar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const products = useSelector(state => state.product.products);
  const userId = useSelector(state => state.user.userId);

  const [cartLength, setcartLength] = useState(0);
  const [visible, setVisible] = useState(false);

  const [isDarkMode, setIsDarkMode] = React.useState();
  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };


  useEffect(() => {
    let cart = [];
    if (products) {
      products.forEach(product => {
        product.cartUsers.forEach(user => {
          if (user.userId === userId) {
            cart.push(product);
          }
        });
      });
    }
    setcartLength(cart.length);
  }, [products]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo" style={{ marginRight: "7px" }}>
        <Switch
          size="small"
          className="switch"
          checked={isDarkMode}
          onChange={toggleTheme}
          unCheckedChildren={"🌞"}
          checkedChildren={"🌙"}
        />
        <a href="/">ShopGX</a>
        <Badge
          className="menu__badge"
          style={{ marginTop: 15, marginLeft: 25 }}
          count={cartLength}
        >
          <Link to="/cart-page">
            <ShoppingCartOutlined
              style={{ fontSize: "25px", marginBottom: 4 }}
            />
          </Link>
        </Badge>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuFoldOutlined type="align-right" />
        </Button>
        <Drawer
          width="50%"
          title="shopGX"
          placement="right"
          className="menu_drawer"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" onClose={onClose} />
          <RightMenu mode="inline" onClose={onClose} />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
