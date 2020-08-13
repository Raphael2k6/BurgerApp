import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order /CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }
    
checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
}

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />    
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
//another way to return to the home page after successful order is to push('/') however
//(<ContactData ingredients={this.state.ingredients} cannot grab the push property
//to get the properties, you can use the spread operator to get all the properties in the history method {...props}


// or wrap the ContactData component with the withRouter method imported from react-router-dom
