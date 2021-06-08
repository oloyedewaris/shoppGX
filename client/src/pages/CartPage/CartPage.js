import React, { useEffect, useState } from "react";
import { Result, Row, Col, Card, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeItemQuantity,
  removeCartItem,
  getProducts,
  onSuccessBuy
} from "../../redux/actions/productsActions";
import UserCartBlock from "./Sections/UserCartBlock";
import PayPal from "../../utils/PayPal";

const CartPage = props => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user.userData);
  const products = useSelector(state => state.product.products);
  const userId = useSelector(state => state.user.userId);

  const firstName = userData.firstname;
  const lastName = userData.lastname;
  const Email = userData.email;

  const [cart, setcart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [productLoading, setproductLoading] = useState(false);

  useEffect(() => {
    setproductLoading(true);
    dispatch(getProducts()).then(res => setproductLoading(false));
  }, []);

  useEffect(() => {
    let cart = [];
    products.forEach(product => {
      product.cartUsers.forEach(user => {
        if (user.userId === userId) {
          cart.push(product);
        }
      });
    });
    setcart(cart);
  }, [products]);

  useEffect(() => {
    calculateTotal();
    if (cart.length > 0) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  }, [cart]);

  const removeFromCart = productId => {
    const body = {
      userId
    };
    dispatch(removeCartItem(productId, body));
  };

  const changeQuantity = (data, id) => {
    let dataToSubmit;
    if (data === "minus") {
      dataToSubmit = {
        userId,
        change: "decrease",
        itemId: id
      };
    } else if (data === "plus") {
      dataToSubmit = {
        userId,
        change: "increase",
        itemId: id
      };
    }
    dispatch(changeItemQuantity(dataToSubmit));
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(product => {
      product.cartUsers.forEach(cartUser => {
        if (cartUser.userId === userId) {
          total += cartUser.quantity * product.price;
        }
      });
    });
    setTotal(total);
  };

  const handleTransaction = () => {
    const data = {
      paymentID: "123tbn49i18662uv",
      location: "Lagos",
      device: "Windows"
    };
    transactionSuccess(data);
  };

  const transactionSuccess = data => {
    let variables = {
      totalPrice: Total,
      userData,
      boughtProducts: cart,
      paymentData: data
    };
    dispatch(onSuccessBuy(variables)).then(res => {
      if (res.payload.success) {
        setShowSuccess(true);
        dispatch(getProducts());
      } else {
        alert("cannot proceed");
      }
    });
  };

  const transactionError = () => {
    console.log("Payment Error");
  };

  const transactionCancel = () => {
    console.log("Payment Cancelled");
  };

  return (
    <div className="cart-page">
      <h1>My Cart</h1>
      <div>
        {productLoading ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            <Col lg={16} sm={24} md={14} xs={24}>
              <UserCartBlock
                removeFromCart={removeFromCart}
                changeQuantity={changeQuantity}
                products={cart}
              />
            </Col>
            <Col lg={8} sm={24} md={10} xs={24}>
              {cart.length > 0 && (
                <div>
                  <Card title="Order Summary">
                    <h3>
                      Name: {firstName}, {lastName}
                    </h3>
                    <h3>E-mail: {Email}</h3>
                  </Card>
                  <Button onClick={handleTransaction}>Transaction</Button>
                </div>
              )}
              <div>
                {ShowTotal && (
                  <div>
                    <div style={{ marginTop: "auto 3rem" }}>
                      <h2>Total Amount: ${Total} </h2>
                    </div>
                    <PayPal
                      toPay={Total}
                      transactionSuccess={transactionSuccess}
                      transactionError={transactionError}
                      transactionCancel={transactionCancel}
                    />
                  </div>
                )}
                {ShowSuccess && (
                  <div>
                    <Result
                      status="success"
                      title="Successfully Purchased Items"
                    />
                    <p style={{ textAlign: "center" }}>
                      You can check <Link to="/history">history</Link> for
                      information about your payment
                    </p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CartPage;
