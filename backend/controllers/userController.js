import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
//controller aur routes wle pages linked hai pehle to route me hi likh dia tha humne sab
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  //sicne hum post req create kar rhe hai kyunki user email aur password ek form me enter karega isliye req.body se dono ko access kar sakte hai
  // res.body.email bhi use kar sakte the but destructuring use karli
  const { email, password } = req.body;
  //   res.send({ email, password });

  //it will find the user that matches the above email
  const user = await User.findOne({ email });

  // agar username aur pass mATCH KAR JATA HAI TO YE SAARA DATA SEND KARDO route ko
  // inhi se routes jo hai userRoutes me jo likhe hue hai unke pass data aa rha hai
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //we are finding by email
  // email: email yu bhi likh sakte hai pehle ki tarah
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //coz we want to authorize user right after registration
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  //q/a me dekha ye step unnecessary hai kyu req.user me hum pehle hi user ka data le chuke hai to baar baar fetch karne ki kya zarurat hai database se isliye user ki jagah req.user bhi use kar sakte the
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //purane user ke name email password me new name email password set kardenge aur agar name pass ya email nhi hai to aisa ka aise hi rehne denge isliye || use kiya
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };

//same hi hai upar wle tarah
// //controller aur routes wle pages linked hai pehle to route me hi likh dia tha humne sab

// import User from '../models/userModel.js';
// import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js';

// const authUser = asyncHandler(async (req, res) => {
//   //sicne hum post req create kar rhe hai kyunki user email aur password ek form me enter karega isliye req.body se dono ko access kar sakte hai
//   // res.body.email bhi use kar sakte the but destructuring use karli
//   const { email, password } = req.body;
//   //   res.send({ email, password });

//   //it will find the user that matches the above email
//   const user = await User.findOne({ email });

//   // agar username aur pass mATCH KAR JATA HAI TO YE SAARA DATA SEND KARDO
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('invalid email or password');
//   }
// });

// const getUserProfile = asyncHandler(async (req, res) => {
//   //q/a me dekha ye step unnecessary hai kyu req.user me hum pehle hi user ka data le chuke hai to baar baar fetch karne ki kya zarurat hai database se isliye user ki jagah req.user bhi use kar sakte the
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('user not found');
//   }
// });

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   //we are finding by email
//   // email: email yu bhi likh sakte hai pehle ki tarah
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('user alreadcy exists');
//   }
//   const user = await User.create({
//     name,
//     email,
//     password,
//   });
//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       //coz we want to authorize user right after registration
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('invalid user data');
//   }
// });

// export { authUser, registerUser, getUserProfile };
