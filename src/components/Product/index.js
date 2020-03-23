import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { 
  Button,
  Card, 
  CardText, 
  CardBody, 
  CardTitle, 
  ListGroup, 
  ListGroupItem 
} from 'reactstrap'
import moment from 'moment'

import { 
  emptyValue,
  longDateFormat,
  shortDateFormat
} from '../../config'

import { getCategoriesById } from '../../reducers/categories'
import { deleteProduct, fetchProducts } from '../../actions/products'
import { fetchCategories } from '../../actions/categories'

import { Loader } from '../Loader'

export const Product = ({ 
  detailedView,
  match,
  productId,
}) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const id = match ? match.params.productId : productId
  const categoriesById = getCategoriesById(state)
  const currentProduct = id
    && state.products.list.find((product) => product.id === Number(id))
  const isLoadedAll = state.products.isLoaded && state.categories.isLoaded
  const product = {
    ...currentProduct, 
    categories: (
      currentProduct
      && currentProduct.categories 
      && currentProduct.categories.map(id => categoriesById[id])
    ) 
      || []
  }

  useEffect(() => {
    if (state.products.list.length === 0 || state.categories.list.length === 0) {
      dispatch(fetchCategories())
      dispatch(fetchProducts())
    }
    //eslint-disable-next-line
  }, [])

  const receiptDate =  product.receiptDate 
    ? moment(product.receiptDate).format(shortDateFormat)
    : emptyValue;
  const expirationDate =  product.expirationDate 
    ? moment(product.expirationDate).format(shortDateFormat)
    : emptyValue;
  const createdAt = product.createdAt 
    ? moment(product.createdAt).format(longDateFormat)
    : emptyValue;

  return (
    <Card>
      {isLoadedAll
      ? <CardBody>
          <div className='product-header'>
            <NavLink exact={true} to={`/${product.id}`}>
              <CardTitle>{product.name}</CardTitle>
            </NavLink>
            {!detailedView
              && <Button 
                color="danger" 
                size='sm'
                onClick={() => dispatch(deleteProduct(product.id))}
              >
                delete
              </Button>
            }
            {
              detailedView && 
              <NavLink exact={true} to={`/${product.id}/edit`}>
                <Button size='sm'>
                  edit product
                </Button>
              </NavLink>
            }
          </div>
          <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
        </CardBody>
      : <Loader />
    }
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  detailedView: PropTypes.bool,
  match: PropTypes.object,
}