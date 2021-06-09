// redirect is used when you click 'Proceed to checkout' in CartScreen, because it links to login page (route /login?redirect=shopping) and then once you're logged in you go directly to the checkout screen.
// Else if you go to the LoginScreen directly from the login link, you go to the route /login (without redirect) and once you're logged in you're redirected to the home page.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

// const LoginScreen = (location, history) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();

//   //userLogin is coming from store
//   const userLogin = useSelector((state) => state.userLogin);
//   const { loading, error, userInfo } = userLogin;

//   const redirect = location.search ? location.search.split('=')[1] : '/';

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     //ye form wle page ko refresh nhi hone dega
//     e.preventDefault();
//     dispatch(login(email, password));
//   };

//   return (
//     <FormContainer>
//       {error && <Message variant='danger'>{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId='email'>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='password'>
//           <Form.Label>Password </Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Sign In
//         </Button>
//       </Form>
//       <Row className='py-3'>
//         <Col>
//           New Customer?{' '}
//           <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default LoginScreen;
