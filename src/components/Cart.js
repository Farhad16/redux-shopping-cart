import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createOrder = (e) => {
    e.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    }

    this.props.createOrder(order)
  }
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {
          cartItems.length === 0
            ? (<div className="cart cart-header">Cart is empty</div>)
            : (<div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>)
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
                        <button className="button" onClick={() => this.props.removeFromCart(item)}>
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
                <button className="button primary" onClick={() => { this.setState({ showCheckout: true }) }}>Proceed</button>
              </div>
            </div>
            {this.state.showCheckout && (
              <Fade right cascade>
                <div>
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
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
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Cart;