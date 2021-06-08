import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spin } from "antd";
import { RocketOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { addToCart, getProducts } from "../../redux/actions/productsActions";
import ImageSlider from "../../components/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import { Price } from "./Sections/Data";
import SearchBox from "./Sections/SearchBox";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const isAuth = useSelector(state => state.user.isAuth);
  const [Products, setProducts] = useState([]);
  const [productLoading, setproductLoading] = useState(false);
  const [Filters, setFilters] = useState({
    phone: [],
    price: []
  });

  useEffect(() => {
    setproductLoading(true);
    dispatch(getProducts()).then(res => {
      if (res.payload) {
        setProducts(res.payload.products);
        setproductLoading(false);
      }
    });
  }, []);

  const showFilterResult = filters => {
    let newProducts = [];
    if (filters.phone.length > 0) {
      filters.phone.forEach(phone => {
        Products.forEach(product => {
          if (product.phone === phone) {
            newProducts.push(product);
          }
        });
      });
    }

    if (filters.price.length > 0) {
      Products.forEach(product => {
        if (
          product.price < filters.price[0] &&
          product.price > filters.price[1]
        ) {
          newProducts.push(product);
        }
      });
    }
    setProducts(newProducts);
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
    let newProducts = [];

    Products.forEach(product => {
      if (product.title === newSearch) {
        newProducts.push(product);
      }
    });
    setProducts(newProducts);
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

  return (
    <div style={{ display: "block" }}>
      <div className="landing">
        <div>
          <Row>
            <Col lg={12} md={12} sm={12} xs={24} style={{ margin: 10 }}>
              <CheckBox
                handleFilter={filters => handleFilter(filters, "phone")}
              />
            </Col>
            <Col lg={12} sm={12} md={12} xs={24} style={{ margin: 10 }}>
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
            Welcome to My Phone Shop, Explore <RocketOutlined />
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
                {Products.map((product, index) => (
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
                <h4>No Phones Yet</h4>
              </div>
            )}
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
