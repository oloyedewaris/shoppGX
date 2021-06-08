import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Row, Spin } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { deleteProduct, addToCart } from "../../redux/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { url } from "../../utils/url";

const DetailsPage = props => {
  const [Product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(false);
  const productId = props.match.params.productId;
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.user.isAuth);
  const userData = useSelector(state => state.user.userData);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${url}/api/products/product_by_id/?productId=${productId}`).then(
      res => {
        setProduct(res.data.product[0]);
        setLoading(false);
      }
    );
  }, []);

  const onAddToCart = productId => {
    if (isAuth) {
      const cartBody = {
        userFirstName: userData.firstname,
        userLastName: userData.lastname,
        userEmail: userData.email,
        userId: userData._id
      };
      dispatch(addToCart(productId, cartBody));
    } else {
      history.push("/login");
    }
  };

  const onDeleteProduct = productId => {
    dispatch(deleteProduct(productId)).then(res => {
      if (res.payload.success) {
        alert("Product Succesfully Deleted");
        history.push("/");
      }
    });
  };

  return (
    <div className="postpage" style={{ width: "100%", padding: "4rem 3rem" }}>
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
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>{Product.title}</h2>
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <ProductImage info={Product} />
            </Col>
            <Col lg={12} xs={24}>
              <ProductInfo
                onAddToCart={onAddToCart}
                onDeleteProduct={onDeleteProduct}
                info={Product}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
