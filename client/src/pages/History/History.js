import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Card, Modal, Button } from "antd";
import Axios from "axios";
import { tokenConfig } from "../../redux/actions/productsActions";
import { url } from "../../utils/url";

const History = () => {
  const userId = useSelector((state) => state.user.userId);
  const [History, setHistory] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${url}/api/users/history?userId=${userId}`, tokenConfig)
      .then((res) => {
        if (res.data.success) {
          setHistory(res.data.histories);
        }
        setLoading(false);
      })
      .catch((err) => alert("Failed to load history"));
  }, []);

  const onOk = () => {
    setOrder(null)
  }

  const onCancel = () => {
    setOrder(null)
  }

  return (
    <div className="cart-page">
      <div style={{ textAlign: "center" }}>
        <h1>My Orders</h1>
      </div>
      <div>
        {History.map((item, i) => (
          <Card title="Order" style={{ margin: "30px 10px", width: "70%" }} hoverable key={i}>
            <p>
              <strong>Payer Email:</strong> {item.paymentData[0].email}
            </p>
            <p>
              <strong>Total Purchase Price:</strong> {` $${item.totalPrice}`}
            </p>
            <p>
              <strong>No. of Item Bought:</strong> {item.productData.length}
            </p>
            <p>
              <strong>Date Purchased</strong> {item.dateOfPurchase}
            </p>
            <Button onClick={() => setOrder(item)}>Show Info</Button>
          </Card>
        ))}
        {order ? <Modal title="Order Receipt" visible={order} onOk={onOk} onCancel={onCancel}>
          <h2>Payment Info</h2>
          <p>
            <strong>Payment ID:</strong> {order.paymentData[0].paymentID}
          </p>
          <p>
            <strong>Payment Token:</strong> {order.paymentData[0].paymentToken}
          </p>
          <h2>Items Bought</h2>
          {order.productData.map((product, i) => (
            <div style={{ borderBottom: "2px solid gray", borderLeft: "2px solid gray", paddingLeft: "10px", marginBottom: "15px" }} key={i}>
              <p>
                <strong>Product Name:</strong> {product.name}
              </p>
              <p>
                <strong>Product type:</strong> {product.product}
              </p>
              <p>
                <strong>Product Price:</strong> {` $${product.price}`}
              </p>
              <p>
                <strong>Product Quantity:</strong>
                {product.quantity}
              </p>
            </div>
          ))}
        </Modal> : null}
      </div>
      {Loading ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : null}
      {History.length < 1 ? (
        <div
          style={{
            display: "flex",
            height: "250px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h4>No History of Payment Yet</h4>
        </div>
      ) : null}
    </div>
  );
};

export default History;
