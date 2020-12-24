import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

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
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState(() => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
                ? 1
                : -1
        ),
    }));
  };

  filterProducts = (event) => {
    if (event.target.value === '') {
      this.setState({ size: event.target.value, products: data.products })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  categoryProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === '') {
      this.setState({
        category: event.target.value,
        products: data.products,
      })
    } else {
      const pro = data.products.filter(product => product.category.indexOf(event.target.value) >= 0);
      console.log(pro);
      this.setState({
        category: event.target.value,
        products: pro,
      })
    }
  }

  createOrder = (order) => {
    alert("Order should be save for " + order.name)
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                category={this.state.category}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
                categoryProducts={this.categoryProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
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
    );
  }

}

export default App;
