import reduce from 'lodash/reduce'

import * as categoriesActions from '../actions/categories'

const initialState = {
  isLoaded: false,
  list: [],
  error: null,
}

export function categories(state = initialState, action) {
  switch (action.type) {
    case categoriesActions.REQUEST_CATEGORIES:
      return {
        ...state,
        isLoaded: false,
        error: null,
      }
    case categoriesActions.RECEIVE_CATEGORIES:
      return {
        ...state,
        isLoaded: true,
        error: null,
        list: action.categories,
      }
    default:
      return state;
  }
}

export function getCategoriesById({ categories }) {
  return reduce(categories.list, (acc, category) => {
    return {
      ...acc,
      [category.id]: category
    }
  }, {})
}
