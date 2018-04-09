import React, { Component } from 'react';
import './Cart.css';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import update from 'immutability-helper';
import swal from 'sweetalert';

const paymentImage = require('../../assets/payment-cards.png');

class cart extends Component {
  state = {
    products: [],
    notifications: '',

  };

  componentWillMount() {

    let retrievedObject = JSON.parse(localStorage.getItem('items'));

    if (retrievedObject) {
      let filterDuplicateData = retrievedObject.filter((set => f => !set.has(f._id) && set.add(f._id))(new Set));
      this.setState({
        products: filterDuplicateData,
        totalPrice: '',
      });
    }
  }

  removeItemHandler = (item, event) => {
    let itemsArr = [...this.state.products];
    for (let i = 0; i < itemsArr.length; i++) {
      const arr = itemsArr[i];
      if (arr._id === item._id) {
        let index = itemsArr.indexOf(itemsArr[i]);
        this.setState(
          prevState => {
            return {
              products: update(prevState.products, {
                $splice: [[index, 1]]
              })
            };
          },
          () => {
            localStorage.setItem('items', JSON.stringify(this.state.products));
          }
        );
      }
    }
  };

  placeOrderHandler = () => {
    if (this.state.products.length == 0) {
      return false;
    }
    var today = new Date(),
      date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    axios({
      method: 'post',
      url: 'http://localhost:3001/orders',
      data: {
        order: this.state.products,
        date: date,
      }
    }).then(response => {
    }, swal("Thanks!", "Your order was placed!", "success"))

    this.setState({
      products: [],
    })
    localStorage.clear();
  }
  render() {
    let products = this.state.products;
    let productsInTheBag;
    let totalPrice;

    if (products !== undefined) {
      productsInTheBag = products.map((item, i) => {
        let discount = (
          <p style={ { fontWeight: '700' } }>
            <span style={ {
              letterSpacing: '.5px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#d01345'
            } }>
              { item.price - item.discount }$
           </span>
            <span style={ {
              letterSpacing: '.5px',
              textDecoration: 'line-through',
              margin: '0 11px',
              fontWeight: 400,
              fontSize: '14px',
            } }>
              { item.price }$
        </span>
          </p>
        )
        return (
          <div key={ i } className="chcek-out-product">
            <img src={ item.image } alt={ item.brand } />
            <div className="item-descriptions">
              { item.discount > 0 ? discount : <p style={ { fontWeight: '700' } }>${ item.price }</p> }
              <p>{ item.brand } </p>
              <p>{ item.type } </p>
              <p>Size: { item.selectedSize.toUpperCase() } </p>

            </div>
            <IconButton
              id={ i }
              iconClassName="material-icons"
              tooltip="Remove"
              style={ { marginLeft: 'auto', top: '-12px' } }
              onClick={ this.removeItemHandler.bind(this, item) }
            >
              clear
              </IconButton>
          </div>
        );

      });
      let totalPriceArr = [];

      products.map((item, i) => {
        totalPriceArr.push(item.price - item.discount);

      });
      totalPrice = totalPriceArr.reduce((a, b) => a + b, 0);

    }

    return (
      <div>
        <Header
          icon={ 'shopping_cart' }
          logout={ true }
          notifications={ this.state.notifications }
          iconAccount="account_box"
        />
        <div className="container-cart">
          <Paper className="my-bag" zDepth={ 1 }>
            <h2> MY BAG</h2>
            { products.length > 0 ? productsInTheBag : 'Your Bag Is Empty' }
          </Paper>
          <Paper className="total" zDepth={ 1 }>
            <h2> TOTAL</h2>
            { products.length > 0 ? <p> ${ totalPrice }</p> : '' }

            <RaisedButton
              label="CHECK OUT"
              backgroundColor={ '#448AFF' }
              labelStyle={ { color: 'white' } }
              className="check-out-button"
              onClick={ this.placeOrderHandler }
            />
            <div className="payment-cards">
              <p style={ { fontSize: '15px' } }>WE ACCEPT: </p>
              <img src={ paymentImage } alt={ 'cards' } />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default cart;
