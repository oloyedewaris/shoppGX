import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import UploadPage from "./pages/UploadPage/UploadPage";
import DetailsPage from "./pages/DetailProductPage/DetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import History from "./components/History/History";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  const isAuth= useSelector(state=> state.user.isAuth);

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/upload" component={UploadPage} />
          <Route exact path="/product/:productId" component={DetailsPage} />
          <Route render={() => 
              isAuth ? (
                <CartPage/>
              ) : (
                <Redirect to="/login" />
              )
            } exact path="/cart-page" />
          <Route exact path="/history" component={History} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;

//TODO : notification, add to cart
