import axios from 'axios';

import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
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