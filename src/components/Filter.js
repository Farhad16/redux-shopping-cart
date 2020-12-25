import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  filterProductsBySize,
  filterProductsByCategory,
  sortProducts
} from "../redux/product/productActions";

const Filter = (
  {
    fetchProducts,
    filterProductsBySize,
    filterProductsByCategory,
    sortProducts,
    size,
    sort,
    productData,
    filteredProducts,
    category
  }) => {

  useEffect(() => {
    fetchProducts()
    // filterProductsBySize()
    // filterProductsByCategory()
    // sortProducts()
  }, [])

  return !filteredProducts ? (
    <div>Loading...</div>
  ) : (
      <div className="filter">
        <div className="filter-result">
          {filteredProducts.length} Products
        </div>
        <div className="filter-category">
          Category{" "}
          <select
            value={category}
            onChange={(e) =>
              filterProductsByCategory(
                productData.products,
                e.target.value
              )
            }
          >
            <option value={category}>ALL</option>
            <option value="female">Female</option>
            <option value="gent">Male</option>
          </select>
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={sort}
            onChange={(e) =>
              sortProducts(
                productData.products,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={size}
            onChange={(e) =>
              filterProductsBySize(productData.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
}


const mapStateToProps = state => {
  return {
    productData: state.products,
    size: state.products.size,
    sort: state.products.sort,
    filteredProducts: state.products.filteredProducts,
    category: state.products.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    filterProductsByCategory: (products, category) => dispatch(filterProductsByCategory(products, category)),
    filterProductsBySize: (products, size) => dispatch(filterProductsBySize(products, size)),
    sortProducts: (products, sort) => dispatch(sortProducts(products, sort)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)