import jwt from 'jsonwebtoken';

//SIGN KE ANDAR 1ST ARGUMENT HOTA HAI PAYLOAD JISPE BASE PE USER KO IDENTIFY KARENGE AUR DUSRA JO LIKHA HAI WO HUMNE ENV FILE ME STORE KARA LIA
//JWT_SECRET for this see env file
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
