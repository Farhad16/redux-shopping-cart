import React, { useEffect, useState } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { fetchProducts } from '../redux/product/productActions';
import { connect } from 'react-redux'
import { addToCart } from '../redux/cart/cartActions';

const Products = ({ loading, productData, addToCart, fetchProducts }) => {

  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const openModal = (product) => {
    setProduct(product)
  }

  const closeModal = () => {
    setProduct(null)
  }

  return (
    <div>
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {
              loading ? <div className="" role="status">
                Loading...
                <span className="spinner-border"></span>
              </div>
                : (
                  productData.map((product) => (
                    <li key={product._id}>
                      <div className="product">
                        <a href={"#" + product._id} onClick={() => { openModal(product) }}>
                          <img src={product.image} alt={product.title} />
                          <p>{product.title}</p>
                        </a>
                        <div className="product-price">
                          <div>{formatCurrency(product.price)}</div>
                          <button onClick={() => addToCart(product)} className="button primary">Add to cart</button>
                        </div>
                      </div>
                    </li>
                  ))
                )
            }
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={closeModal}>
            <Zoom>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.products.loading,
    productData: state.products.filteredProducts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
