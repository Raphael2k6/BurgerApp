import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order /CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
        } else {
            ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />    
                <Route path={this.props.match.path + '/contact-data'} 
                //component={ContactData } 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        )
    }
}

export default Checkout;
//another way to return to the home page after successful order is to push('/') however
//(<ContactData ingredients={this.state.ingredients} cannot grab the push property
//to get the properties, you can use the spread operator to get all the properties in the history method {...props}


// or wrap the ContactData component with the withRouter method imported from react-router-dom
