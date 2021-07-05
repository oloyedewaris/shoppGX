import React from "react";
import { Card, Empty } from "antd";
import { useSelector } from "react-redux";
import { DeleteTwoTone, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { url } from "../../../utils/url";

const { Meta } = Card;

function UserCartBlock(props) {
  const userId = useSelector(state => state.user.userId);

  let quantity = 0;

  return (
    <div>
      {props.products && props.products.length > 0 ? (
        <div>
          {props.products.map((product, i) => {
            product.cartUsers.forEach(user => {
              if (user.userId === userId) {
                quantity = user.quantity;
              }
            });
            return (
              <Card
                key={i}
                style={{ width: 350, margin: 15, padding: 5 }}
                hoverable
                actions={[
                  <MinusOutlined
                    key="minus"
                    style={{ color: "red" }}
                    onClick={() => props.changeQuantity("minus", product._id)}
                  />,
                  <h3>{quantity}</h3>,
                  <PlusOutlined
                    key="plus"
                    style={{ color: "green" }}
                    onClick={() => props.changeQuantity("plus", product._id)}
                  />,
                  <DeleteTwoTone
                    onClick={() => props.removeFromCart(product._id)}
                    style={{ color: "red" }}
                    twoToneColor="red"
                  />
                ]}
                cover={
                  <img
                    style={{ maxWidth: 250 }}
                    alt="product"
                    src={`${url}/${product.images[0]}`}
                  />
                }
              >
                <Meta title={product.title} description={`$${product.price}`} />
              </Card>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <br />
          <Empty description={false} />
          <p style={{ textAlign: "center" }}>No Item in the Cart</p>
        </div>
      )}
    </div>
  );
}

export default UserCartBlock;
