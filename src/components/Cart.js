import React, { useState } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import { removeFromCart } from '../redux/cart/cartActions';

const Cart = ({ cartItems, removeFromCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // const handleInput = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  // const createOrder = (e) => {
  //   e.preventDefault()
  //   const order = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     address: this.state.address,
  //     cartItems: this.props.cartItems,
  //   }

  //   this.props.createOrder(order)
  // }
  const checkIsWork = () => {
    alert('I am working')
  }
  return (
    <div>
      {
        cartItems.length === 0
          ? (<div className="cart cart-header">Cart is empty</div>)
          : (<div className="cart cart-header">You have {cartItems.length} products in the cart {" "}</div>)
      }
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {
              cartItems.map(item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} * {item.count} {" "}
                      <button className="button" onClick={() => removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total: {" "}
                {formatCurrency(
                  cartItems.reduce((totol, item) => totol + item.count * item.price, 0)
                )}
              </div>
              <button className="button primary" onClick={() => { setShowCheckout(true) }}>Proceed</button>
            </div>
          </div>
          {showCheckout && (
            <Fade right cascade>
              <div>
                <input type="text" />
              </div>
              {/* <div>
                <form onSubmit={createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">Checkout</button>
                    </li>
                  </ul>
                </form>
              </div> */}
            </Fade>
          )}
        </div>
      )}
    </div>
  );
};


const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);