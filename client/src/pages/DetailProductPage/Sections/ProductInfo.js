import React, { useEffect, useState } from "react";
import { Descriptions, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductInfo = (props, context) => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.info);
  }, [props.info]);

  const onAddToCart = () => {
    if (user.userData && user.userData.isAuth) {
      props.onAddToCart(Product._id);
    } else {
      history.push("/login");
    }
  };

  const deleteProduct = () => {
    if (user.userData && user.userData.isAdmin) {
      props.onDeleteProduct(Product._id);
    }
  };

  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Price($)">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Views">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onAddToCart} size="large" shape="round" type="primary">
          Add To Cart
        </Button>
        {user.userData && user.userData.isAdmin && (
          <Button
            onClick={deleteProduct}
            size="large"
            shape="round"
            type="danger"
          >
            Delete Product
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
