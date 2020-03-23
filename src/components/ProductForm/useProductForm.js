import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import moment from 'moment'

import categories from '../../mocks/categories'

import { addProduct } from '../../actions/products'
import { editProduct } from '../../actions/products'

const initialForm = {
  name: '',
  rating: 1,
  categories: [],
  itemsInStock: 0,
  receiptDate: '',
  brand: '',
  expirationDate: null,
  createdAt: null,
}

export const useProductForm = ({
  edit,
  match,
}) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const products = state.products.list
  const productId = match ? match.params.productId : null
  const product = productId && products.find(({ id }) => id === Number(productId))

  const [form, formHandler] = useState(
    !product
      ? initialForm 
      : {
          ...product, 
          categories: categories.filter(({ id }) => product.categories.includes(id))
        }
    )
  const [timeError, setError] = useState(false)
  const [isValidName, setNameIsValid] = useState(true)
  const [isValidCategories, setIsValidCategories] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const preparedForm = {
      ...form,
      id: form.id || products.length + 1,
      createdAt: form.createdAt || moment(),
      categories: form.categories.map(({ id }) => id)
    }

    if (preparedForm.name === '') {
        setNameIsValid(false)
      }

    if (!preparedForm.categories.length) {
      setIsValidCategories(false)
    }
    
    if (preparedForm.name === '' || !preparedForm.categories.length) {
      return false
    }

    history.push("")

    return edit
      ? dispatch(editProduct(preparedForm)) 
      : dispatch(addProduct(preparedForm))
  }

  const hangleChangeReceiptDate = (value) => {
    formHandler({
      ...form,
      receiptDate: value,
    })
  }

  const handleMultiSelect = (categories) => {
    if (!categories) {
      setIsValidCategories(false)
      return formHandler({
        ...form,
        categories: []
      })
    }
    if (categories.length < 6) {
      setIsValidCategories(true)
      return formHandler({
        ...form,
        categories: [...categories]
      })
    } else {
      return false
    }
  }

  const hangleChangeName = (e) => {
    formHandler({
      ...form,
      name: e.target.value
    })
  }

  const hangleChangeRating= (e) => {
    const featured = Number(e.target.value) > 8

    formHandler({
      ...form,
      featured,
      rating: e.target.value
    })
  }

  const changeExpirationDate = (value) => {
    if (moment(value).diff(moment(), 'days') < 30) {
      setError(true)
    } else {
      setError(false)
      formHandler({
        ...form,
        expirationDate: moment(value).format('YYYY-MM-DD')
      })
    }
  }

  const hangleChangeItems= (e) => {
    formHandler({
      ...form,
      itemsInStock: e.target.value
    })
  }

  const hangleChangeBrand = (e) => {
    formHandler({
      ...form,
      brand: e.target.value
    })
  }
  
  return {
    handleMultiSelect,
    hangleChangeName,
    hangleChangeRating,
    changeExpirationDate,
    hangleChangeItems,
    hangleChangeBrand,
    isValidName,
    isValidCategories,
    setNameIsValid,
    hangleChangeReceiptDate,
    timeError,
    handleSubmit,
    form,
  }
}