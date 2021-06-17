//REDUX
//thung meaning
//in redux you can only send a plain order as action like this:
// { type: 'ACTION_NAME', payload: data }
// but sometimes data is not ready and needs to be feated from the backend.
// for this scenario, thunk comes into the picture. it makes it possible to not only return a plain object but return a function as an action.
// when you dispatch an action to redux store it should be a plain text not a function. but in a real scenario, we need to dispatch a function to do some logics. here redux-thunk comes into the picture and converts our function to a plain text object for redux. so it is a middleware that needs to be introduced to store on createStore function.
// ... it is a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function. That’s all it does.
// Source: https://daveceddia.com/what-is-a-thunk/
// So if you do not intend to pass any functions as actions, then you do not need thunk.

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers.js';
import { orderCreateReducer } from './reducers/orderReducers.js';

const reducer = combineReducers({
  // ye hi humari states hoti hai
  //redux devtools me state check karega to yahi dikhengi
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

//initial state humari local storage se aa rhi hai jo humne actions me daal rakhi hai
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  //load hote hi ye initial state dikhegi jo bhi local storage me already stored hoga
  // redux state me data saved hi rahega aur react devtools khol ke dekhega to state me wo data hamesha dikhega kyunki local storage se le rahe hai local storage brower me hoti browser save karke rakhta hai chahe browser close bhi kardo tab bhi
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
