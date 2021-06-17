import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      //email aur password jo humne enter karwaya hai ye res.body ke through access ho sakta hai user controller me aise hi kiya
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    //register karwate hi login bhi karwa denge
    //ise userInfo me data aa jaega aur same hi data hai login aur register dono me kyunki humne un routes pe same hi data get kiya tha pehle
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//we can get userInfo from getState which has token in it

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // hum getState ke through userLogin me padi userInfo ko access kar sakte hai through getState.userLogin.userInfo but we will use destructuring
    //NOW WE HAVE ACCESS TO INFO OF LOGGES IN USER
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //its for accessing token jo loggen user ka hai isi token ke through hi logged in user ka pata chalega
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      //hum jab user profile visit karenge to id me profile pass karenge waise 2 alag actions bhi create kar sakte the but both are too similar isliye ek me hi kardia
      `/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    //after updation userLogin will fire off and then we will pass into local storage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

// //we will use getState coz we do need to send a token
// export const updateUserProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_UPDATE_PROFILE_REQUEST,
//     });

//     // hum getState ke through userLogin me padi userInfo ko access kar sakte hai through getState.userLogin.userInfo but we will use destructuring
//     //NOW WE HAVE ACCESS TO INFO OF LOGGES IN USER
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         //its for accessing token jo loggen user ka hai isi token ke through hi logged in user ka pata chalega
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(
//       //hum jab user profile visit karenge to id me profile pass karenge waise 2 alag actions bhi create kar sakte the but both are too similar isliye ek me hi kardia
//       `/api/users/profile`,
//       //ye user isliye likha kyunki hum /api/users/profile iss route pe updated user ka data pass karna chahte hai aur ye user hum profilescreen me jahan (updateUserProfile({ id: user._id, name, email, password })); ye line likha hai wahan se le rhe hai
//       user,
//       config
//     );

//     dispatch({
//       type: USER_UPDATE_PROFILE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_UPDATE_PROFILE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
