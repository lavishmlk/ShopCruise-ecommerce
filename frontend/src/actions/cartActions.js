import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// import axios from 'axios';
// import {
//   CART_ADD_ITEM,
//   CART_REMOVE_ITEM,
//   CART_SAVE_SHIPPING_ADDRESS,
//   CART_SAVE_PAYMENT_METHOD,
// } from '../constants/cartConstants';

// // //GETSTATE ALLOWS US TO GET OUR ENTIRE STATE TREE, STORE ME PRODUCTLIST PRODUCTDETAILS YA CART me se kuch bhi chaiye getState.productlist karne se mil jaega
// // //ye id aur qty humne cart screen page me pass kiye hai aur yahan receive kiye
// //isme jo id aur quantity hai wo hum jab ise cartScreen me fireoff karenge wahan pass karenge kyunki cartScreen to props ke through id aur qty ko url se access kar hi sakta hai kyunki productscreen me humne ye url dala tha
// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`);

//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       // ye sab data database se aa rha hai
//       product: data._id,
//       name: data.name,
//       image: data.image,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty,
//     },
//   });

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
// };

// export const removeFromCart = (id) => async (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   });

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//   //   getstate() give the state after added item state.
// };

// //ye data jab shippingScreen me is action ko call karenge tab pass kar rhe hai

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_SHIPPING_ADDRESS,
//     payload: data,
//   });

//   localStorage.setItem('shippingAddress', JSON.stringify(data));
// };

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_PAYMENT_METHOD,
//     payload: data,
//   });

//   localStorage.setItem('paymentMethod', JSON.stringify(data));
// };
