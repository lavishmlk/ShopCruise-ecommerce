//imp see lecture 29 me Will naam ke bande ka 1st answer

import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
// import axios from 'axios';
// import products from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import Loader from '../components/Loader';
import Message from '../components/Message';

//pehle hum components se products wla data le rhe the redux ki wajah se change jkar dia
{
  /* niche jo <Product /> likha hai ye Product.js se import kiya hai wo hai aur iske andar jo likha hai product wo prop hai aur {product} uski value aur ye {product} jo map ke andar likha hai wahan se receive ho rha hai */
  // products wo file hai jismne name data id ye sab hai aurProduct.js wo file hai jisme sab kuch jaisa screen pe show karwana hai proper with ke saath card ke andar wo sab hai isliye hum products ko map kar rhe hai aur uska ek ek product <Product> component me pass kar rhe hai
}
// row col amages ko row col ki form me arrange karne ke liye hai
// key={product._id} agar ye nhi likhega to console me warning aegi
//axios hume backend se products wla data lene me help karega its like fetch api of javascript
//async await likhne se hum ye bata rahe hai ki wo promise return karega aur tab tak wait karega jab tak ye chal nhi jaata tab tab aage nhi badhega
//data elements is res ke andar hi hoga hai automatically

// proxy humne package.json wle page pe  baad me add ki thi taaki homescreen pe jo api/products pe jo get request create ki hai wo localhost:3000/api/products ki bajae localhost:5000api/products pe dekhe kyunki backend ka server to localhost:5000 hai na

//aur proxy likhne ke baad dono server start karne pade
//loading aur message ka ek alag component create kiya hai

const HomeScreen = () => {
  //redux ke baad hume ye local ya component level states nhi chahiye global state chahiye
  // const [products, setProducts] = useState([]);
  //jaise pehle axios se product display kar rhe the backend se leke ab redux se karenge

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //const productList iski jagah kuch bhi likh sakte the but store me humme yahi naam rkha isliye aur state jo parameter pass kiya yahan bhi kuch bhi likh sakte the
  //ye jo  state.productList ye store se aya

  //isse productListReducer me jo initial state hai wo mil jaegi

  const productList = useSelector((state) => state.productList);

  //destructuring wo wo le liya jo productList se chahiye tha
  //useSelector se hi hum ye pieces of state le pa rhe hai so mainly useselctor hume state me se data lene ke liye hi help karta hai
  const { loading, error, products } = productList;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' message={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* <Product /> component ko call kiya */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

/*pehle use effect me ye tha jab tak redux use nahi kiya tha
 // axios.get('/api/products').then(res) ye wla bhi use kar sakte the
 const fetchProducts = async () => {
  const { data } = await axios.get('/api/products'); //matlab iss route pe get   request create karni hai
  setProducts(data);
  */
