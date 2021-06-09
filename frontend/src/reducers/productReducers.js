import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants.js';

//ye initially products humse ek empty array create kar lia state me
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //iska matlab hai jab ye case trigger hoga to loading show karni hai tabhi loading:true set kiya aur ye case wo wla hai jab shuru me render karwana hai actions wla component dekh
    //imp see lecture 29 me Will naam ke bande ka 1st answer
    //jaise hi homescreen load hoga matlab har baar api se data fetch karna hai
    //case PRODUCT_LIST_REQUEST: is case ka matlab hai jab loading chal rhi hogi tab empty array return karna hai kkuch show nhi karna
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    //is case me hume loading false karni hai aur products me data lana hai action wle page me jo axios backend se data le rha hai wahan se...isi case ki wjah se data display ho raha hai
    case PRODUCT_LIST_SUCCESS:
      // action.payload  isse products array me data aa jaega jo action se aa rha hai
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ye wla single product page ke liye
//pehle ye code likhwaya tha brad ne par isse images lag kar rhi thi 1 sec ke liye purani image show ho rhi thi kyunki hum previous state show kar rhe the jabki hume loading ke time pe kuch show nhi karna
// case PRODUCT_DETAILS_REQUEST:
//   return { loading: true, ..state  }
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: { reviews: [] } };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
