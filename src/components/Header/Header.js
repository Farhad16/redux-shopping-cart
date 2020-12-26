import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

const Header = ({ cartItems }) => {
  return (
    <header>
      <a href="/">Shopping Cart</a>
      <div className="cartIcon">
        <FontAwesomeIcon icon={faCartPlus} className="icon" /><sup>{cartItems.length}</sup>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(
  mapStateToProps,
)(Header);
