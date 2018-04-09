import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dashboard from './../Dashboard';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
class dashHeader extends Component {

    onTitleClickHandle = () => {
        this.props.history.push('/dashboard');
    };

    render() {
        const styles = {
            title: {
                cursor: 'pointer'
            },
            background: '#2d2d2d',
            zIndex: 999,

        };
        return (
            <AppBar
                onLeftIconButtonClick={ this.props.sideBar.bind(this) }
                showMenuIconButton={ true }
                style={ styles }
                title="Title"
                title={ <span onClick={ this.onTitleClickHandle } style={ styles.title }>App Dashboard</span> }
                iconElementRight={
                    <div>
                        <Badge
                            badgeContent={ 5 }
                            badgeStyle={ { width: 20, height: 20, top: 0, right: 0, background: '#e53935', color: '#fff', padding: 0 } }
                            style={ { padding: 0 } }
                        >
                            <IconButton tooltip="Notifications" iconStyle={ { color: '#fff' } } >
                                <NotificationsIcon />
                            </IconButton>
                        </Badge>
                        <Link to="/main">
                            <IconButton iconStyle={ { color: '#fff' } } iconClassName="material-icons" tooltip="Store">
                                exit_to_app
                            </IconButton>
                        </Link>

                    </div>
                }
            />
        );
    }
}

export default withRouter(dashHeader);


