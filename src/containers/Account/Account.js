import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import axios from 'axios';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import './Account.css'
class Account extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://enigmatic-refuge-63110.herokuapp.com/orders'
        }).then(response => {
            this.setState({
                orders: response.data,
                loading: false,
            })
        });

    }

    render() {
        let orders;
        if (this.state.orders) {
            orders = [...this.state.orders].map((order, i) => {
                let arr = []
                let items = order.items.length;
                let images = [];

                let body = order.items.map((product, index) => {
                    let finalPrice = product.price - product.discount
                    arr.push(finalPrice)
                    images.push({ image: product.image, alt: product.brand })
                    if (index < 4) {
                        return (
                            <img
                                key={ index }
                                src={ product.image }
                                alt={ product.brand }
                            />
                        )
                    }

                })
                let totalPrice = arr.reduce((a, b) => a + b, 0);
                return (
                    <Paper key={ i } className="order">
                        <div className="order-header">
                            <p> <span style={ { fontWeight: '700' } }> ORDER NUMBER:</span> { order.orderNumber }</p>
                            <p > { order.date } </p>
                        </div>
                        <p><span style={ { fontWeight: '700' } }> ITEMS:</span> { items } </p>
                        <p><span style={ { fontWeight: '700' } }> TOTAL:</span> ${ totalPrice } </p>
                        <div className="images">
                            { body }
                            { items > 4 ? <span className="plus-items">{ items - 4 } </span> : '' }
                        </div>
                    </Paper>
                )
            })
        }
        return (
            <div>
                <Header icon={ 'shopping_cart' } logout={ true } iconAccount="account_box" />
                { this.state.loading ? <div className="account-container"> <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /></div> : <div className="account-container">
                    <Paper className="my-account" zDepth={ 1 }>
                        <h2> MY ORDERS</h2>
                        { orders.length == 0 ? <p style={ { textAlign: 'center' } }> There is no orders yet</p> : orders }
                    </Paper>
                </div> }
            </div>
        );
    }
}

export default Account;