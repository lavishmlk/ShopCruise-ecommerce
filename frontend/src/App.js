// React Router Tutorial in Hindi | React Router Dom in Hindi in 2020 #56 thapa technical

import React from 'react';
// BrowserRouter ki wajah se hi hum niche routes likh paa rhe hai react ki jo functionality hai ki bina page reload kare hi refresh ho jaa hai jise client side rendering bhi kehte hai wo isse hi ati hai
// route ka kaam ye hota hai ki jab user jo url likh rha hai agar wo humne jo route me path define kiya hai usse match kar jaaye to wo component render karwa deta hai
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
// JUST REMEMBER JAB BHI KISI ELEMENT KA LIKE AIRPODS KA CODE DEKHNA HO TO CONSOLE ME JAA KE USS ELEMENT PE CLICK KAR DIA AUR COMPONENTS ME JAA KE REACT PROPS BHI DIKH JAENGE
// :id jo likha hai wo isliye hai taaki productscreen wle page me match.params.id se acess kar sake id ki jagah kuch bhi likh sakte hai technical thapa video 57 use params

const App = () => {
  return (
    // iss browser router me un sabhi components jo add karde jo rende karwane hai
    <Router>
      <Header />

      {/* to know about py-3 search react spacing */}
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          {/* id ke baad question mark ka matlab id is optional */}
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );

  // function App() {
  //   return (
  //     <>
  //       <h1>welcome to ShopCruise</h1>
  //     </>
  //   );
};

export default App;
