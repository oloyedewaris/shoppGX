import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Badge } from "antd";
import { MenuFoldOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Sections/Navbar.css";
import "../../index.compact.css";

const NavBar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const products = useSelector(state => state.product.products);
  const userId = useSelector(state => state.user.userId);

  const [cartLength, setcartLength] = useState(0);
  const [visible, setVisible] = useState(false);

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
        <a href="/">ShopGX</a>
        {isAuth ? (
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
        ) : null}
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
          title="shopGX"
          placement="right"
          className="menu_drawer"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
