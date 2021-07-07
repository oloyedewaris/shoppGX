import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spin } from "antd";
import { RocketOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { addToCart, getProducts } from "../../redux/actions/productsActions";
import ImageSlider from "../../components/ImageSlider";
import CheckBox from "./Sections/Product";
import Radiobox from "./Sections/Price";
import { Price } from "./Sections/Data";
import SearchBox from "./Sections/SearchBox";
import Axios from "axios";
import { url } from "../../utils/url";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const isAuth = useSelector(state => state.user.isAuth);
  const [Products, setProducts] = useState([]);
  const [productLoading, setproductLoading] = useState(false);
  const [Filters, setFilters] = useState({
    product: [],
    price: []
  });
  const [productSize, setProductSize] = useState(0)
  const [limit, setLimit] = useState(8)

  useEffect(() => {
    setproductLoading(true);
    dispatch(getProducts()).then(res => {
      if (res.payload) {
        setProductSize(res.payload.products.length)
        setProducts(res.payload.products);
        setproductLoading(false);
      }
    });
  }, []);

  const getFilterProducts = filters => {
    const body = { find: filters };
    setproductLoading(true)
    Axios.post(`${url}/api/products/getProducts`, body).then(res => {
      if (res.data.success) {
        setProducts(res.data.products);
        setproductLoading(false)
      }
    });
  };

  const showFilterResult = filters => {
    getFilterProducts(filters);
  };

  const handlePrice = value => {
    const data = Price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilter = (filters, category) => {
    const newFilter = { ...Filters };

    newFilter[category] = filters;

    if (category === "price") {
      let priceValue = handlePrice(filters);
      newFilter[category] = priceValue;
    }

    showFilterResult(newFilter);
    setFilters(newFilter);
  };

  const updateSearch = newSearch => {
    showFilterResult(newSearch);
  };

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

  const displayProduct = Products.filter((product, i) => (i < limit))

  return (
    <div style={{ display: "block" }}>
      <div className="landing">
        <div>
          <Row>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CheckBox
                handleFilter={filters => handleFilter(filters, "product")}
              />
            </Col>
            <Col lg={12} sm={12} md={12} xs={24}>
              <Radiobox
                handleFilter={filters => handleFilter(filters, "price")}
              />
            </Col>
          </Row>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <SearchBox updateSearch={search => updateSearch(search)} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>
            Welcome to My Laptop Shop, Let's go... <RocketOutlined />
          </h2>
        </div>
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
          <div>
            {Products && Products.length > 0 ? (
              <Row gutter={[16, 16]}>
                {displayProduct.map((product, index) => (
                  <Col key={index} lg={6} md={6} sm={8} xs={12}>
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
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <Button
                          onClick={() => onAddToCart(product._id)}
                          style={{ color: "green" }}
                          size="large"
                          shape="round"
                          type="dashed"
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "300px",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h4>No Product Yet</h4>
              </div>
            )}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}><Button onClick={() => {
          if (productSize > limit) {
            setLimit(limit + 8)
          } else {
            setLimit(8)
          }
        }}>{productSize > limit ? "Load More" : "Show Less"}</Button></div>
      </div>
    </div>
  );
};

export default LandingPage;
