import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import './Clothing.css';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import update from 'immutability-helper';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import Sort from '../../../components/sortingItems/sortingItems'
import _ from 'lodash';



let ARR = []
class clothing extends Component {

  state = {
    products: [],
    numberOfItems: '',
    likeCliked: false,
    productsLiked: [],
    productCliked: false,
    loading: true,
  };
  componentWillReceiveProps(props) {
    if (props.location.state) {
      if (props.location.state.allClothes) {
        this.getAllClothes()
      }
    }
  }
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.welcomePage) {
        this.getClothesByType(this.props.location.state.type)
      } else {
        this.getAllClothes()
      }
    }
  }

  getClothesByType = (type) => {
    axios({
      method: 'get',
      url: `https://enigmatic-refuge-63110.herokuapp.com/main/${type}`
    }).then(response => {
      let brands = _.uniqBy(response.data.clothes, 'brand');
      let types = _.uniqBy(response.data.clothes, 'type');
      this.setState(prevState => {
        let counter = response.data.clothes;
        return {
          products: response.data.clothes,
          filters: {
            sortValue: '',
            brandValue: '',
            brandsNames: brands,
            types: types,
          },
          numberOfItems: counter.length,
          loading: false,
        }
      });
    });
  }
  getAllClothes = () => {
    axios({
      method: 'get',
      url: 'https://enigmatic-refuge-63110.herokuapp.com/clothing'
    }).then(response => {
      let brands = _.uniqBy(response.data.clothes, 'brand');
      let types = _.uniqBy(response.data.clothes, 'type');
      this.setState(prevState => {
        return {
          products: response.data.clothes,
          filters: {
            sortValue: '',
            brandValue: '',
            brandsNames: brands,
            types: types,
          },
          numberOfItems: response.data.count,
          loading: false,
        }
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
        this.getAllClothes()
      } else {
        axios({
          method: 'get',
          url: `https://enigmatic-refuge-63110.herokuapp.com/clothing/${value}`
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
      let currentState = [...this.state.products]
      let sortByType = _.filter(currentState, { 'type': value });
      if (sortByType.length === 0) {
        return;
      }
      this.setState(prevState => {
        return {
          products: prevState.products = sortByType,
          numberOfItems: sortByType.length,
        }
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
      console.log(id._id)
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
              state: { productID: productsList[product]._id, type: 'clothing' }
            } }
          >
            <img
              src={ productsList[product].image }
              alt={ productsList[product].brand }
            />
            <p className="brand">{ productsList[product].brand }</p>
            <p className="price">{ productsList[product].price }$</p>
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
        <div className={ this.state.products.length < 4 ? 'clothing-container center' : 'clothing-container' }>
          { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /> : products }
        </div>

      </div>)
  }
}

export default withRouter(clothing);

