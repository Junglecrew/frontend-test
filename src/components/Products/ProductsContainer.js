import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ProductsList from './ProductsList';
import { fetchCategories } from '../../actions/categories';
import { fetchProducts } from '../../actions/products';
import { getCategoriesById } from '../../reducers/categories';

class ProductsContainer extends Component {
  componentDidMount() {
    const { dispatch, products } = this.props;
    dispatch(fetchCategories())

    if (!products.length) {
      dispatch(fetchProducts());
    }
  }

  render() {
    const { products, isLoaded } = this.props;

    return (
      <Fragment>
        <Header name="Products"/>
        <ProductsList products={products} isLoaded={isLoaded}/>
      </Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.list.map(product => {
    const categories = product.categories.map(id => categoriesById[id])

    return {
      ...product,
      categories
    };
  });

  return {
    products,
    isLoaded: state.products.isLoaded
  }
};

export default connect(mapStateToProps)(ProductsContainer);
