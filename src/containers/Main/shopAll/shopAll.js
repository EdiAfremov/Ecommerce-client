import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import update from 'immutability-helper';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import Sort from '../../../components/sortingItems/sortingItems'
import _ from 'lodash';

let ARR = []
class shopAll extends Component {
  state = {
    products: [],
    numberOfItemsReload: 0,
    numberOfItems: '',
    loadMoreBtn: true,
    likeCliked: false,
    productsLiked: [],
    productCliked: false,
    loading: true,
  };

  componentDidMount() {
    this.getAllItems(0)
    axios({
      method: 'get',
      url: `https://enigmatic-refuge-63110.herokuapp.com/allProducts`
    }).then(response => {
      let count = Object.keys(response.data).length;
      if (count < 12) {
        this.setState(prevState => {
          return {
            loadMoreBtn: false,
          }
        });
      }
      this.setState(prevState => {
        return {
          numberOfItems: count,
        }
      });
    });
  }

  getAllItems = (num) => {
    axios({
      method: 'get',
      url: `https://enigmatic-refuge-63110.herokuapp.com/allProducts/lazy/${num}`
    }).then(response => {
      this.setState(prevState => {
        return {
          products: update(prevState.products, {
            $push: response.data
          }),
          loadMoreBtn: true,
          loading: false,
        }
      });
    });
  }

  loadMoreHandler = () => {

    if (this.state.numberOfItems == Object.keys(this.state.products).length) {
      this.setState(prevState => {
        return {
          loadMoreBtn: false,
        }
      });
      return;
    }
    this.setState(prevState => {
      return {
        numberOfItemsReload: prevState.numberOfItemsReload += 1,

      }
    }, () => this.getAllItems(this.state.numberOfItemsReload));

  }
  sortHandle = (value, sortBy) => {
    let sortState = [...this.state.products];
    let sorted;
    if (sortBy === 'price') {
      switch (value) {
        case 'Price low to high':
          sorted = sortState.sort((a, b) => {
            return a.price - b.price
          })
          break;
        case 'Price high to low':
          sorted = sortState.sort((a, b) => {
            return a.price - b.price
          }).reverse()
          break;
        default:
          break;
      }
      this.setState(prevState => {
        return {
          products: prevState.products = sorted,
        }
      })
    }
    if (sortBy === 'brand') {
      if (value === 'All') {
        this.getAllItems(0)
      } else {
        axios({
          method: 'get',
          url: `https://enigmatic-refuge-63110.herokuapp.com/allProducts/${value}`
        }).then(response => {
          let counter = response.data
          if (counter.length === 0) {
            return;
          } else if (counter.length < 12) {
            this.setState({
              loadMoreBtn: false,
            });
          }
          this.setState({
            products: response.data,
            numberOfItems: counter.length,
            loading: false,
          });
        });
      }
    }
    if (sortBy === 'type') {
      let sortByType = _.filter([...this.state.products], { 'type': value });
      if (sortByType.length === 0) {
        return;
      }
      this.setState({
        products: sortByType,
        numberOfItems: sortByType.length,
      });
    }
  }

  likedProductsHandler = id => {
    let arr = [...new Set(this.state.productsLiked)];
    this.setState(
      prevState => {
        return {
          ...prevState.products,
          ...prevState.likeCliked,
          productsLiked: (prevState.productsLiked = arr)
        };
      },

    );
  };

  likeHandler = (id, event) => {
    if (event.target.checked) {
      ARR.push(id._id)
      localStorage.setItem('liked', JSON.stringify(ARR));
      axios({
        method: 'post',
        url: 'https://enigmatic-refuge-63110.herokuapp.com/likedItems',
        data: { id: id._id }
      }).then(response => {
        console.log(response.data)
      });
    } else {
      let removeProduct = [...this.state.productsLiked];
      for (let i = 0; i < removeProduct.length; i++) {
        const product = removeProduct[i].id;
        if (product == id.id) {
          let index = removeProduct.indexOf(removeProduct[i]);
          this.setState(prevState => {
            return {
              productsLiked: update(prevState.productsLiked, {
                $splice: [[index, 1]]
              })
            };
          });
        }
      }
    }
  };

  render() {

    let likedProducts = 'favorite_border';
    if (this.state.productsLiked.length > 0) {
      for (let i = 0; i < this.state.productsLiked.length; i++) { }
      likedProducts = 'favorite';
    }
    const likeStyle = {
      fill: 'black',
      borderRadius: '50%',
      padding: '4px'
    }
    let productsList = this.state.products;
    const products = Object.keys(productsList).map((product, id) => {
      return (
        <div key={ id } className="product" >
          <Link
            className="link"
            key={ id }
            to={ {
              pathname: `${this.props.match.url}/${
                productsList[product].brand
                }${id}`,
              state: { productID: productsList[product]._id, type: 'sale', productType: productsList[product].type }
            } }
          >
            <img
              src={ productsList[product].image }
              alt={ productsList[product].brand }
            />
            <p className="brand">{ productsList[product].brand }</p>
            { productsList[product].discount > 0 ? <p className="price" >
              <span style={ {

                fontWeight: 700,
                letterSpacing: '2px',
                color: '#d01345'
              } }>
                { productsList[product].price - productsList[product].discount }$
             </span>
              <span style={ {
                letterSpacing: '.5px',
                textDecoration: 'line-through',
                margin: '0 11px',
                fontWeight: 400,
                fontSize: '14px',
              } }>
                { productsList[product].price }$
          </span>
            </p> : <p className="price">{ productsList[product].price }$</p>

            }

          </Link>
          <div className="like-btn">
            <Checkbox
              onClick={ this.likeHandler.bind(this, productsList[product]) }
              iconStyle={ likeStyle }
              inputStyle={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } }
              style={ { color: 'black' } }
              checkedIcon={ <FontIcon id={ id } style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons" >  favorite </FontIcon> }
              uncheckedIcon={ <FontIcon id={ id } style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons"> favorite_border </FontIcon> }
            />
          </div>
        </div>
      );
    });

    return (
      <div>
        { this.state.loading ? '' : <Sort sortVal={ this.sortHandle.bind(this) } sortvalues={ this.state.products } /> }
        { this.state.loading ? '' : <div className='counter'> { Object.keys(this.state.products).length + ' styles from ' + this.state.numberOfItems } products  </div> }
        <div className={ this.state.products.length < 4 ? 'clothing-container center' : 'clothing-container' }>
          { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /> : products }
        </div>
        { this.state.loadMoreBtn ?
          <div style={ { width: '100%', display: 'flex', justifyContent: 'center' } }>
            <RaisedButton onClick={ this.loadMoreHandler.bind(this) } className="LOAD MORE" label="LOAD MORE" />
          </div>
          : <div style={ { width: '100%', display: 'flex', justifyContent: 'center' } }>
            <RaisedButton disabled={ true } onClick={ this.loadMoreHandler.bind(this) } className="LOAD MORE" label="LOAD MORE" />
          </div> }
        <div className='counter'>You've viewed { Object.keys(this.state.products).length + ' of ' + this.state.numberOfItems } products  </div>
      </div>)
  }
}


export default shopAll;
