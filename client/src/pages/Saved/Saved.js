import React from 'react'
import { Row, Col, Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import ImageSlider from "../../components/ImageSlider";
import { saveProduct } from '../../redux/actions/userActions';

const { Meta } = Card

function Saved() {
  const products = useSelector(state => state.user.userData.savedProducts)
  const userData = useSelector(state => state.user.userData);
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch()
  const history = useHistory()

  const onSaveProduct = (productId, action) => {
    if (isAuth) {
      const cartBody = {
        userId: userData._id,
        productId,
        action
      };
      dispatch(saveProduct(cartBody));
    } else {
      history.push("/login");
    }
  }

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Products you've saved
        </h2>
      </div>
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col key={index} lg={12} md={12} sm={24} xs={24}>
            <Card
              hoverable={true}
              cover={
                <Link to={`/product/${product._id}`}>
                  <ImageSlider images={product.images} />
                </Link>
              }
            >
              <Link to={`/product/${product._id}`}>
                <Meta
                  title={product.title}
                  description={`$${product.price}`}
                />
              </Link>
              <Button
                style={{ background: "yellow", marginTop: "10px" }}
                onClick={() => onSaveProduct(product._id, "unsave")}
              >
                Remove from saved
              </Button>
            </Card>
          </Col>
        ))
        }
      </Row>
      {products.length === 0 ?
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h4>No Saved Product Yet</h4>
        </div> : null}
    </div>
  )
}

export default Saved
