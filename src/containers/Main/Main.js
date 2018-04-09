import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Subheader/Subheader';
import Clothing from './Clothing/Clothing';
import Shoes from './Shoes/Shoes';
import Sale from './Sale/Sale';
import shopAll from './shopAll/shopAll';
import Welcome from './WelcomePage/WelcomePage';
import ProductInfo from './ProductInfo/ProductInfo';
import './Main.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer'

class main extends Component {
  state = {
    loggedIn: true,
    itemsInTheBagIcon: 0
  };

  loggedInCheck = val => {
    this.setState(prevState => {
      return { loggedIn: true };
    }, console.log(this.state, val));
  };
  getBagItems() {
    this.setState(prevState => {
      return { itemsInTheBagIcon: prevState.itemsInTheBagIcon += 1 }
    })
  }

  render() {
    let reLogin;
    if (!this.state.loggedIn || this.state.loggedIn === undefined) {
      reLogin = <Redirect to="/" />;
    }

    return (
      <div className="main">
        <Header icon={ 'shopping_cart' } logout={ true } BagIcon={ this.state.itemsIntheBagIcon } iconAccount="account_box" />
        <SubHeader />
        <div className="main-conatainer">
          { reLogin }
          <Switch>
            <Route
              exact
              path={ this.props.match.url + '/' }
              component={ Welcome }
            />
            <Route
              exact
              path={ this.props.match.url + '/Clothing/:product' }
              render={ () => <ProductInfo product={ this.getBagItems.bind(this) } /> }
            />
            <Route
              path={ `${this.props.match.url}/Clothing` }
              component={ Clothing }
            />
            <Route
              exact
              path={ this.props.match.url + '/Shoes/:shoe' }
              component={ ProductInfo }
            />
            <Route path={ `${this.props.match.url}/Shoes` } component={ Shoes } />

            <Route
              exact
              path={ this.props.match.url + '/Sale/:type' }
              component={ ProductInfo }
            />
            <Route path={ `${this.props.match.url}/Sale` } component={ Sale } />
            <Route
              exact
              path={ this.props.match.url + '/shop All/:type' }
              component={ ProductInfo }
            />
            <Route
              path={ `${this.props.match.url}/shop All` }
              component={ shopAll }
            />
            <Route render={ () => <Redirect to="/main" /> } />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(main);
