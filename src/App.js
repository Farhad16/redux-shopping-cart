import React, { Component } from 'react';
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
    }
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
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              sidebar
            </div>
          </div>
        </main>
        <footer>
          All right it reserved.
        </footer>
      </div>
    );
  }

}

export default App;
