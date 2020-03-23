import * as productsActions from '../actions/products';

const initialState = {
  isLoaded: false,
  list: [],
  error: null,
}

export function products(state = initialState, action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return {
        ...state,
        isLoaded: true,
        list: action.products,
        error: null,
      }
    case productsActions.REQUEST_PRODUCTS:
      return {
        ...state,
        isLoaded: false,
        error: null,
      }
    case productsActions.ADD_PRODUCT:
      return {
        ...state,
        list: [
          ...state.list,
          action.product,
        ]
      }
    case productsActions.EDIT_PRODUCT:
      return {
        ...state,
        list: state.list.map(product => {
          if (product.id === action.product.id) {
            return action.product
          } else {
            return product
          }
        })
      }
    case productsActions.DELETE_PRODUCT:
      return {
        ...state,
        list: state.list.filter(({ id }) => id !== action.id)
      }
    default:
      return state;
  }
}
