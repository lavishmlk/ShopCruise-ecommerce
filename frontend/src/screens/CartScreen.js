// addToCart ek baar to wo hai jab product page me se addtoCart karenge  or niche code me jo onclick pe addtoCart hai wo quantity change karne pe hai matlab doobara fresh action dispatch hoga reducer se hote hue data pass karega..... par removefromCart ka ek hi hai jab wo delete wle button pe click karenenge to uske onClick pe dispatch daal dia niche code dekhlio

// useSelector mainly state me se data lene ke liye hota hai jaise store me dekhega to humare pass productlist cart productdetails 3 state hai inme cart ke andar cartItems array hai jisme cart ka sara data hai wo access karne ke liye useSelector use hoga aur dispatch action trigger karne ke liye hota hai j

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

// location.search location.search url me question mark ke aage ka sab kuch de deta hai like url/cart/60b0db192b0aab1548698434?qty=1 humare case me ?qty=1 ye de dega aur ye split jahan equal sign hai wahan left aur right me split kar dega array me jiske 0 index pe ?qty hoga aur 1 index pe 1 aur use number formal me convert karne ke liye Number() me wrap kardia

//ye location match history already react me hote hai aur agar inko hooks ki form me import karle to yahan parameters ki form me pass nhi karna padta directly use kar lete hai
const CartScreen = ({ match, location, history }) => {
  // const productId = match.params.id;

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  // useSelcector se hum state ke data ko get karenge aur screen me show karenge.....state wla data matlab jis product ko add kiya usi ki details hai state me aur refresh ya wapis jaane par bhi state me stored rahengi kyunki local storage se le rhe hai data

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //use effect
  // useEffect(() => {
  // but id aur quantity hamesha nahin honge jab agar navbar wle button pe click karke cart me ayenge to na id hoga na quantity but agar addToCart wle button pe click karke acartScreen pe ayenge to url se id aur qty dono acccess kar sakte hai isliye hum if(productId) use kar rhe hai ki agar id hai tabhi action ko call karo new data daalne ke liye
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  // isme id niche jab removefromCART CALL HO RHA HAI WAHAN SE AEGI
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // iska matlab agar login nhi hai to kogin page pe bhejdo nhi to shipping page pe redirect kardo
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    {/* //ye wla code humse productscreen me likha tha button wla wahi se copy karke changes kar diye */}
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* toFixed decimal ke aage jitna digits chahiye uske loye */}$
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;

//cart screen notes(evernote me copy kara hai wahan bhi ye same likha haia)
// useSelector mainly state me se data lene ke liye hota hai jaise store me dekhega to humare pass productlist cart productdetails 3 state hai inme cart ke andar cartItems array hai jisme cart ka sara data hai wo access karne ke liye useSelector use hoga aur dispatch action trigger karne ke liye hota hai j

// SABSE PEHLE PRODUCT SCREEN ME JA
// TO YAHAN HUMNE listProductDetails ACTION KO DISPATCH KARDIA  JISSE JO PRODUCT SELECT KIA HAI WO SHOW HOGA PRODUCTSCREEN PE

// USKE BAAD NICHE ADDTOCARTHANDLER BANAYA JISSE ADD TO CART BUTTON PE CLICK KARTE HI WO history.push
// me jo url hai wahan bhej dega uske baad humse addtocart dispatch kara liya

// to ye sab to ho gya product screen me

// par Pehle kya ho rha tha
// ```
//   dispatch(addToCart(match.params.id, qty));
// ```
// ye wla dispatch humne cartscreen me likha tha useeffect ke andar usse ho kya rha tha wo url me se id aur quantity leke iss dispatch me pass kar rha tha initially taki wo particular product load ho sake cartscreen pe
// but isme ek dikkat thi cart empty karne ke baad bhi refresh karne pe hume  1 product cart me zarur dikhta tha kyunki humne useEffect use kiya tha aur useEffect referesh hone pe hamesha render ho jaata hai
// isliye ye tarika galat tha aur cartscreen se useeffect hata diya humse ab cartscreen me bas addToCart khali onclick pe quantity change hone par call karne ke liye likha hua hai
