// to understand timestamp visit this website->https://masteringjs.io/tutorials/mongoose/timestamps
//jaise table aur entries hoti hai sql me waise hi isme collections aur documents hote hai ye jo model bana rhe hai model ko hi collection bolte hai

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// //ye userController.js file me use hoga jo authenticatiuon wli file hai
// //compare bcrypt me hi hota hai
// //promise return karta hai isliye async create kiya
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //based on last video of bacjend authentication
// //middleware for save karne se pehle hi password hash kar dega ye ya new user create hoga tab bhi
// userSchema.pre('save', async function (next) {
//   // it means if there is not modification on password field then do not update hashed password on the db.
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// //User ek model hai aur mongoose ise apne aap plural me kar deta hai mongoose ise apne aap Users me convert kar dega par hume singular hi likhna hai
// const User = mongoose.model('User', userSchema);

// export default User;
