import React, { Component } from 'react';
import Layout from '../src/components/Layouts/Layout'
import { connect } from 'react-redux';
import asyncComponent from './Hoc/asyncComponent/asyncComponent'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'; 

//lazy loading 
const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import ('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import ('./containers/Auth/Auth')
})
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} /> 
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" /> 
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" /> 

        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
