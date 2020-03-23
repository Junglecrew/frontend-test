import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Container, Row, Col, Button } from 'reactstrap'

import chunk from 'lodash/chunk'
import map from 'lodash/map'

import { Product } from '../Product';
import { Loader }  from '../Loader'

const ProductList = ({ products, isLoaded }) => {
  const productsGroups = chunk(products, 3)
  console.log(productsGroups);
  
  return (
    <Container>
      {isLoaded 
        ? map(productsGroups, (productsGroup, index) => (
          <Row key={index} className="mb-5">
            {map(productsGroup, product => (
              <Col sm="4" key={product.id} >
                <Product productId={product.id} />
              </Col>
            ))}
          </Row>
        ))
        : <Loader />
      }
      <NavLink exact={true} to={'/product/add'}>
        <Button color="primary">Add product</Button>
      </NavLink>
    </Container>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
}

export default ProductList;
