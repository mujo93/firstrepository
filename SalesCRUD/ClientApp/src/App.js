import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchCustomers } from './components/FetchCustomers';
import { FetchProducts } from './components/FetchProducts';
import { FetchStores } from './components/FetchStores';
import { FetchSales } from './components/FetchSales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={FetchCustomers} />
            <Route path='/fetchproducts' component={FetchProducts} />
            <Route path='/fetchcustomers' component={FetchCustomers}/>
            <Route path='/fetchstores' component={FetchStores}/>  
            <Route path='/fetchsales' component={FetchSales}/>
      </Layout>
    );
  }
}
