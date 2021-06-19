import axios from "axios";
import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CHANGE_ITEM_QUANTITY,
  ON_SUCCESS_BUY,
} from "./types";
import { url } from "../../utils/url";

export const tokenConfig = {
  headers: {
    "Content-type": "application/json",
    g_auth: localStorage.getItem("token"),
  },
};

export const getProducts = () => {
  const request = axios
    .post(`${url}/api/products/getProducts`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Unable to fetch products");
    });

  return {
    type: GET_PRODUCTS,
    payload: request,
  };
};

export const deleteProduct = (productId) => {
  const request = axios
    .delete(
      `${url}/api/products/delete_product?productId=${productId}`,
      tokenConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      alert("unable to delete product");
    });

  return {
    type: DELETE_PRODUCT,
    payload: request,
  };
};

export const addToCart = (productId, body) => {
  const request = axios
    .post(
      `${url}/api/products/addToCart?productId=${productId}`,
      body,
      tokenConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Unable to add product to cart");
    });

  return {
    type: ADD_TO_CART,
    payload: request,
  };
};

export const removeCartItem = (productId, body) => {
  const request = axios
    .post(
      `${url}/api/products/removeCartItem?productId=${productId}`,
      body,
      tokenConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      alert("unable to remove item from cart");
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
};

export const changeItemQuantity = (dataToSubmit) => {
  const request = axios
    .post(
      `${url}/api/products/changeItemQuantity?productId=${dataToSubmit.itemId}`,
      dataToSubmit,
      tokenConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      alert("unable to change item quantity");
    });

  return {
    type: CHANGE_ITEM_QUANTITY,
    payload: request,
  };
};

export const onSuccessBuy = (variables) => {
  const request = axios
    .post(`${url}/api/products/successBuy`, variables, tokenConfig)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      alert("unable to process");
    });
  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
};
