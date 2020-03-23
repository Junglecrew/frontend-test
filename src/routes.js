import React from 'react'
import { HashRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NotFound from './components/NotFound/NotFound'
import { ProductForm } from './components/ProductForm'
import { Product } from './components/Product'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route 
            exact
            path="/:productId" 
            render={(props) => <Product {...props} detailedView={true} />}
          />, 
          <Route 
            exact
            path="/:productId/edit"
            render={(props) => <ProductForm {...props} edit/>}
          />,
          <Route exact path="/product/add" component={ProductForm}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter >
  )
}

export default getRoutes