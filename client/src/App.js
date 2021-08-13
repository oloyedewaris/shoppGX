import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
import UploadPage from "./pages/UploadPage/UploadPage";
import DetailsPage from "./pages/DetailProductPage/DetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import History from "./pages/History/History";
import Saved from "./pages/Saved/Saved";
import auth from "./hoc/auth";

const App = () => {

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={auth(LandingPage)} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/upload" component={auth(UploadPage)} />
          <Route exact path="/product/:productId" component={DetailsPage} />
          <Route exact path="/cart-page" component={auth(CartPage)} />
          <Route exact path="/history" component={auth(History)} />
          <Route exact path="/saved" component={auth(Saved)} />
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
