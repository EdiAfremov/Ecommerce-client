import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../Clothing/Clothing.css';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import update from 'immutability-helper';
import CircularProgress from 'material-ui/CircularProgress';
import Sort from '../../../components/sortingItems/sortingItems'
import _ from 'lodash';

class Sale extends Component {
  state = {
    products: [],
    numberOfItems: '',
    likeCliked: false,
    productsLiked: [],
    productCliked: false,
    loading: true
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://enigmatic-refuge-63110.herokuapp.com/Sale'
    }).then(response => {
      let counter = response.data.arr
      this.setState({
        products: response.data.arr,
        numberOfItems: counter.length,
        loading: false,
      });
    });
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
        axios({
          method: 'get',
          url: 'https://enigmatic-refuge-63110.herokuapp.com/Sale'
        }).then(response => {
          let counter = response.data.arr
          this.setState({
            products: response.data.arr,
            numberOfItems: counter.length,
            loading: false,
          });
        });
      } else {
        axios({
          method: 'get',
          url: `https://enigmatic-refuge-63110.herokuapp.com/Sale/${value}`
        }).then(response => {
          let counter = response.data
          if (counter.length === 0) {
            return;
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
  componentWillUnmount() {
    localStorage.setItem(
      'productsLiked',
      JSON.stringify(this.state.productsLiked)
    );
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
      this.setState(
        prevState => {
          return {
            likeChecked: !prevState.likeChecked,
            productsLiked: [...prevState.productsLiked, id]
          };
        },
        () => this.likedProductsHandler()
      );
    } else {
      let removeProduct = [...this.state.productsLiked];
      for (let i = 0; i < removeProduct.length; i++) {
        const product = removeProduct[i].id;
        if (product === id.id) {
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
    const likeStyle = {
      fill: 'black',
      borderRadius: '50%',
      padding: '4px'
    }

    // // let likedProducts = 'favorite_border';
    // if (this.state.productsLiked.length > 0) {
    //   for (let i = 0; i < this.state.productsLiked.length; i++) { }
    //   // likedProducts = 'favorite';
    // }

    let productsList = this.state.products;

    const products = Object.keys(productsList).map((product, id) => {
      return (
        <div key={ id } className="product">
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

            <p className="brand">{ productsList[product].brand } { productsList[product].type } in  { productsList[product].color }</p>
            <p className="price" >
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
            </p>
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
        { this.state.loading ? '' : <div className='counter'> { this.state.numberOfItems } styles found </div> }

        <div className={ this.state.products.length < 4 ? 'clothing-container center' : 'sale-container' }>
          { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /> : products }
        </div>
      </div>)
  }
}

export default withRouter(Sale);
