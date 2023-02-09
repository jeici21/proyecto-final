function Cart({ items }) {
    return (
      <div>
        <h1>Cart</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }


  export default Cart;