import axios from 'axios';

import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_PRICE
} from "./productTypes"

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  }
}

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  }
}


export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  }
}
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest())
    axios
      .get('http://localhost:5000/products')
      .then(response => {
        const users = response.data
        dispatch(fetchProductsSuccess(users))
      })
      .catch(error => {
        dispatch(fetchProductsFailure(error.message))
      })
  }
}

export const filterProductsBySize = (products, size) => {
  return {
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      product: size === 'ALL' ? products
        : products.filter(x => x.availableSizes.indexOf(size) >= 0)
    }
  }
}

export const filterProductsByCategory = (products, category) => {
  console.log(products, category);
  return {
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      category: category,
      product: category === 'ALL' ? products
        : products.filter(x => x.category.indexOf(category) >= 0)
    }
  }
}

export const sortProducts = (filteredProducts, sort) => {
  const sortedProducts = filteredProducts.slice()
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
          ? -1
          : 1
    );
  }
  return {
    type: FILTER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      product: sortedProducts
    }
  }
}