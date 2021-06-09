// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import axios from 'axios';
// import products from '../products'; no need coz we r fetching feom backend
//image apne container se bahar jaane lag gyi thi isliye fluid likhna pada
//flush borders hatane ke liye use hota hai
//use para url name me dynamically data add kareane ke liye hota hai for eg-hum jaise pehle se hi set kar dete hai localhost:3000/user pe hume kya data milega but hume user se dynamicaly localhost:3000/user/ ke aage kuch enter karwana ho jaise localhost:3000/user/id to is id ko hum apne data me kaise access kar sakte hai uske lie useParams
//agar useParams wla react hook import karwa lete to match.params nhi likhna padta khali id likhne se bhi kaam ho jaata hai
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions.js';

import { addToCart, removeFromCart } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  //history.push thapa techincal video 61
  //maine history pichle  route pe jaane me help karta hai jahan hum pehle the
  //history.push naye route pe redirect kar deta hai
  //history.goBack() se pichle route pe jaa sakte hai
  //ye route uske liye hai jab add to cart button pe click karenge
  //jo navbar me cart likha hai uske liye app.js me route defined hai
  //iss addtocart button pe click karte hi cart page pe bhej dega
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, qty));
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' message={error} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}reviews`}
                />
              </ListGroup.Item>
              {/* ye wle dollar ka koi significance nhi hai bas price show karne ke liye likha hai */}
              <ListGroup.Item>price :${product.price}</ListGroup.Item>
              <ListGroup.Item>description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col> price:</Col>

                    <Col>
                      <strong> ${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col> stock:</Col>

                    <Col>
                      <strong>
                        {product.countInStock ? 'in stock' : 'out of stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* explained in evernote after this line */}

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

/*pehle productscreen wle func me ye tha jab axios se get request create kar rhe the baad me database me daal dia tha

//match.params.id me wo id hai jo app.js ke route me specified hai
 // const product = products.find((p) => p._id === match.params.id);no need now coz fetching from backend
 const [product, setProduct] = useState([]);
 //iss baar useeffect single product ke liye hai isliye aage id lagani padegi unline homescreen
 useEffect(() => {
   // axios.get('/api/products').then(res) ye wla bhi use kar sakte the
   const fetchProduct = async () => {
     const { data } = await axios.get(`/api/products/${match.params.id}`);
     setProduct(data);
   };
   fetchProduct();
 }, [match]); //pehle empty tha match likhne ke baad warning ana band ho gyi
*/
