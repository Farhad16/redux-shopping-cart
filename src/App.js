import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';

const App = () => {


  return (
    <div>
      <Provider store={store}>
        <div className="grid-container">
          <Header></Header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <div className="productSection">
                  <Products />
                </div>

              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer>
            All right it reserved
        </footer>
        </div>
      </Provider>
    </div>
  );
};

export default App

