import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Axios from "axios";
import { tokenConfig } from "../../redux/actions/productsActions";
import { url } from "../../utils/url";

const History = () => {
  const userId = useSelector(state => state.user.userId);
  const [History, setHistory] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${url}/api/users/history?userId=${userId}`, tokenConfig)
      .then(res => {
        if (res.data.success) {
          setHistory(res.data.histories);
        }
        setLoading(false);
      })
      .catch(err => alert("Failed to load history"));
  }, []);

  return (
    <div className="cart-page">
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />
      <table className="cart-table">
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Total Price</th>
            <th>No. of Item</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {History.map((item, i) => (
            <tr key={i}>
              <td>{item.paymentId}</td>
              <td>{item.totalPrice}</td>
              <td>{item.productData.length}</td>
              <td>{item.dateOfPurchase}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Loading ? (
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
      ) : null}
      {History.length < 1 ? (
        <div
          style={{
            display: "flex",
            height: "250px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <h4>No History of Payment Yet</h4>
        </div>
      ) : null}
    </div>
  );
};

export default History;
