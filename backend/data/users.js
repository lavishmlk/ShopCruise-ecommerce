//we will create an array of three users aur isme wahi fields ho sakti hai jo models ke andar user me hai  otherwise mongoose database me insert nhi karne dega

//in order to hash the password we have to install npm i bcryptjs
// jaise niche 123456 likha hai use hash kar dega
//With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
// The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.
//data folder ke andar jo products.js aur users.js hai ye sample data hai
// matlab users ka data  database me daalne ke liye humne apna hi sample data bana ke daal dia product wla data to pehle se hi tha product.js file me
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'Admin@example.com',
    password: bcrypt.hashSync('123456', 10), //10 is salt rounds
    isAdmin: true,
  },
  {
    name: 'lavish',
    email: 'lavish@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'lavishh',
    email: 'lavishh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
