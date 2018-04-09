import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';


import { Route, Link, withRouter, Redirect } from 'react-router-dom';

class header extends Component {
  state = {
    clicked: false,
    notifications: 0,
  };



  onTitleClickHandle = () => {
    this.props.history.push('/main');
  };


  render() {
    const styles = {
      title: {
        cursor: 'pointer'
      },
      background: '#2d2d2d'
    };

    let logout;
    if (this.props.logout) {
      logout = (
        <IconButton iconStyle={ { color: '#fff' } } iconClassName="material-icons" tooltip="Logout">
          exit_to_app
        </IconButton>
      );
    }

    return (
      <AppBar
        style={ styles }
        title={ <span onClick={ this.onTitleClickHandle } style={ styles.title }>MyShop</span> }
        showMenuIconButton={ false }
        iconElementRight={
          <div>
            <Link to="/dashboard">
              <IconButton iconClassName="material-icons" iconStyle={ { color: '#81D4FA' } } tooltip="Dashboard">
                trending_up
          </IconButton>
            </Link>
            <Link to="/MyAccount">
              <IconButton iconClassName="material-icons" iconStyle={ { color: '#fff' } } tooltip="My Account">
                { this.props.iconAccount }
              </IconButton>
            </Link>
            <Link to="/cart">
              { this.state.notifications > 0 ?
                <Badge
                  badgeContent={ this.state.notifications }
                  secondary={ true }
                  badgeStyle={ { top: 0, right: 2 } }
                  style={ { padding: 0 } }
                >
                  <IconButton iconClassName="material-icons" iconStyle={ { color: '#fff' } } tooltip="My Bag">
                    { this.props.icon }
                  </IconButton>
                </Badge>
                :
                <IconButton iconClassName="material-icons" iconStyle={ { color: '#fff' } } tooltip="My Bag">
                  { this.props.icon }
                </IconButton>
              }
            </Link>
            { logout }
          </div>
        }
      />
    );
  }
}

export default withRouter(header);
