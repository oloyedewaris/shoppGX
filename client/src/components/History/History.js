import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Card } from "antd";
import Axios from "axios";
import { tokenConfig } from "../../redux/actions/productsActions";
import { url } from "../../utils/url";

const History = () => {
  const userId = useSelector((state) => state.user.userId);
  const [History, setHistory] = useState([]);
  const [Loading, setLoading] = useState(false);

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

  return (
    <div className="cart-page">
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <div>
        {History.map((item, i) => (
          <Card style={{ margin: "30px 10px", width: "70%" }} hoverable key={i}>
            <h2>General Info</h2>
            <p>
              <strong>Payment ID:</strong> {item.paymentId}
            </p>
            <p>
              <strong>Total Purchase Price:</strong> {` $${item.totalPrice}`}
            </p>
            <p>
              <strong>No. of Item Bought:</strong> {item.productData.length}
            </p>
            <p>
              <strong>Date of Purchase</strong> {item.dateOfPurchase}
            </p>
            <h2>Payment Info</h2>
            <p>
              <strong>Payment ID:</strong> {item.paymentData[0].paymentID}
            </p>
            <p>
              <strong>Payer Email:</strong> {item.paymentData[0].email}
            </p>
            <p>
              <strong>Payment Token:</strong> {item.paymentData[0].paymentToken}
            </p>
            <p>
              <strong>Payer ID:</strong> {item.paymentData[0].payerID}
            </p>
            <h2>Product Info</h2>
            {item.productData.map((product, i) => (
              <div key={i}>
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
          </Card>
        ))}
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
