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




const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);

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
