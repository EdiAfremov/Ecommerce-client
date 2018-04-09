import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import './ProductInfo.css';
import { TextField } from 'material-ui/TextField';

class productInfo extends Component {
  state = {
    product: [],
    selectedSize: '',
    showErr: false,
    validOrder: false,
    storedItem: [],
    itemsCounter: 0,
    snackBarOpen: false,
    loading: true,
  };
  componentDidMount() {
    window.scrollTo(0, 0)
    if (this.props.location.state === undefined) {
      return this.props.history.push("/main");
    }
    axios({
      method: 'post',
      url: `https://enigmatic-refuge-63110.herokuapp.com/${this.props.location.state.type}/${this.props.location.state.productID}`,
      data: { type: this.props.location.state.productType }
    }).then(response => {
      this.setState({
        product: [response.data.product],
        loading: false,
      });

    });
  }
  selectSizeHandler = (index, event, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        selectedSize: value
      };
    });
  };
  handleRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    });
  };
  addProductHnadler = () => {
    let newPorduct = this.state.product;
    newPorduct[0].selectedSize = this.state.selectedSize;

    if (this.state.selectedSize.length <= 0) {
      this.setState(prevState => {
        return {
          ...prevState,
          showErr: true
        };
      });
    } else {
      this.setState(
        prevState => {
          return {
            ...prevState,
            validOrder: true,
            showErr: false,
            itemsCounter: prevState.itemsCounter += 1,
            snackBarOpen: true,
          };
        }, () => {
          let newPorductObj = Object.assign({}, ...newPorduct)
          var itemsArr = localStorage.getItem("items");
          let items;
          if (itemsArr) {
            items = JSON.parse(itemsArr);
          } else {
            items = [];
          }
          items.push(newPorductObj);
          localStorage.setItem('items', JSON.stringify(items));
        });
    }
  };
  render() {
    let errMessage;
    if (this.state.showErr) {
      errMessage = 'Please Select Size';
    }

    let productItems = this.state.product;
    const product = productItems.map((item, i) => {

      let discount = (
        <h3>
          <span style={ {
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
        </h3>
      )
      return (
        <div className="container" key={ i }>
          <div className="product-container">
            <div>
              { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } />
                :
                <img src={ item.bigImage } alt={ item.brand } />
              }
            </div>
            <div className="product-name">
              <h1>
                { item.brand +
                  ' ' +
                  item.type.toLowerCase() +
                  ' in ' +
                  item.color.toLowerCase() }
              </h1>
              { item.discount > 0 ? discount : <h3>${ item.price }</h3> }
              <SelectField
                floatingLabelStyle={ {
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 400,
                  top: '36px'
                } }
                errorText={ errMessage }
                floatingLabelText="Size:"
                floatingLabelFixed={ true }
                value={ this.state.selectedSize }
                name="Size"
                onChange={ this.selectSizeHandler.bind(this) }
              >
                { item.size.map((val, i) => (
                  <MenuItem
                    key={ i }
                    value={ val }
                    primaryText={ val.toUpperCase() }
                  />
                )) }
              </SelectField>
              <RaisedButton
                label="ADD TO BAG"
                backgroundColor={ '#448AFF' }
                labelStyle={ { color: 'white' } }
                className="button"
                onClick={ this.addProductHnadler }
              />
            </div>
            <Snackbar
              open={ this.state.snackBarOpen }
              message="Product added to your Bag"
              autoHideDuration={ 4000 }
              onRequestClose={ this.handleRequestClose }
              contentStyle={ { textAlign: 'center' } }
            />
          </div>
        </div>
      );
    });

    return <div className="productInfo-container">{ product }</div>;
  }
}

export default withRouter(productInfo);
