import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  //ye isliye laaye kyunki humne ye bhi check karwana hai ki user logged out to nhi hai
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //we want the successs value jo humne update user profile me pass ki thi
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    //not userInfo matlab login nhi hai kyunki userInfo login se hi aa rhi hai matlab agar login nhi hai to login wle page pe bhej do
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        //ye reset wle dispatch humne isliye use kiya kyunki pehle update hone ke baad bhi jaise lavish ko mai lavish malik kar rha tha aur update button pe click kar rha tha tab bhi mujhe lavish hi dikh rha tha name wli field me jabki devtools me lavish malik ho chika tha....aisa isliye hua kyunki user ke earlier data se ye data utha raha tha par hume to latest data se chahiye isliye pehle earlier data clear kar dia
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        //coz humne getUserDetails action me `/api/users/${id}` ye likha hai isliye ye /api/users/profile se data lega aur hume logged in user ka data mil jaega
        //reduc devtools me state khol ke check karega to dekhio jaise hi profile pe click kar rhe hai to ye page render hoga aur render hote hi useEffect chalta hai aur ekdam se user me data aa jaega
        //ALSO SEE EVERNOTE ECOMMERCE EXPLAINATION BEFORE NEXT LINE
        dispatch(getUserDetails('profile'));
      } else {
        //iski wajah se profile khulte hi jo previous state me user data hai wo show hoag
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //upar jo message liya hai useState me ye setMessage use fill kar dega
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* //upar jo message hai ye wahi hai
      //ye && wla tarika hota hai ternary operator ke jaise */}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='danger'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='Password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
