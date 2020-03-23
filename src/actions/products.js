import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  id,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});


export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProducts()
  setTimeout(() => {
    dispatch(receiveProducts(json))
  }, 2000);
};
