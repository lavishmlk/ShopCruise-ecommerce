//redux
//ye jab refresh karte hai to videos ke beech me jaise buffering wla spinner nhi ata wo lane ke liye hai
import { Spinner } from 'react-bootstrap';
import React from 'react';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
// According to bootstrap's documentation, the class sr-only is used to hide information intended only for screen readers from the layout of the rendered page.
