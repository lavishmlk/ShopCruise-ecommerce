import React from 'react';
//learn from thapa technical video 57
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

// yahan pe props bhi likh sakte hai par uske liye niche bhi props.product.image likhna padega isliye destructuring ki help se product likh dia aur ye products hum homescreen wla page hai jo uspe pass kar rhe hai
//card wla func images ko card ke andar daalne ke liye hai
// link to ki jagah href mat use kariyo kyunki usse refesh ho jaata hai
// link to jo link likha hai wahan bhej dega hume click karte hi aur app.js wle page pe jo route hai wo humne uss path pe kaunsa component display karana hai wo humne likh rakha hai
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* dollar sign ye wo jquery wla hai document.getelement by id wla  shortcut*/}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* `` these backticks are known as string literals search google inme string ke liye jo + use karte hai jo wo use karne ki zarurat nhi padti aur javascript expression likhna ho to dollar sign ke andar likhdo*/}
        <Card.Text as='div'>
          <Rating
            value={product.rating} //aise bhi likh sakte hai {`${product.rating}`}
            text={`${product.numReviews}reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
