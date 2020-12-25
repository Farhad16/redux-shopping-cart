import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_CATEGORY,
  FILTER_PRODUCTS_BY_PRICE
} from "./productTypes"


const initialState = {
  loading: false,
  products: [],
  error: '',
  filteredProducts: [],
  size: 'ALL',
  category: 'ALL',
  sort: 'latest',
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filteredProducts: action.payload.product
      }
    case FILTER_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
        filteredProducts: action.payload.product
      }
    case FILTER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredProducts: action.payload.product
      }
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: '',
        filteredProducts: action.payload
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        filteredProducts: [],
        error: action.payload
      }
    default: return state
  }
}

export default productReducer