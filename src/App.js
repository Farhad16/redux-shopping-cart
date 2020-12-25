import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { store } from './redux/store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      category: '',
      cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count += 1;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: cartItems });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }


  createOrder = (order) => {
    alert("Order should be save for " + order.name)
  }

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Shopping Cart</a>
            <div className="cartIcon">
              <FontAwesomeIcon icon={faCartPlus} className="icon" /><sup>{this.state.cartItems.length}</sup>
            </div>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <div className="productSection">
                  <Products
                    addToCart={this.addToCart}
                  />
                </div>

              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>
            All right it reserved
        </footer>
        </div>
      </Provider>
    );
  }

}

export default App;
