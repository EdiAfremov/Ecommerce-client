import React, { Component } from 'react';
import DashHeader from './dashHeader/dashHeader';
import Details from '../Dashboard/Details/Details';
import Footer from '../../components/Footer/Footer';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Drawer from 'material-ui/Drawer';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';
import Table from './Table/Table'
import Content from 'material-ui/svg-icons/content/content-paste';





import './Dashboard.css'
class Dashboard extends Component {
    state = {
        sideBarOpen: true,
        loading: true,
    }
    componentDidMount() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        if (mediaQuery.matches) {
            this.setState(prevState => {
                return { sideBarOpen: false }

            })
        } else {
            this.setState(prevState => {
                return { sideBarOpen: true }

            })
        }
    }
    openSideBar = (value) => {
        this.setState(prevState => {
            return { sideBarOpen: !prevState.sideBarOpen }

        })
    }
    render() {

        return (
            <div style={ { position: 'relative' } }>
                <DashHeader sideBar={ this.openSideBar } />
                <Drawer containerClassName={ 'navbar' } open={ this.state.sideBarOpen } width={ 180 } className={ this.state.sideBarOpen ? '' : 'closed' } >
                    <List className="list-item">
                        <NavLink style={ { textDecoration: 'none' } } to={ `${this.props.match.url}` } >
                            <ListItem className='list-item' primaryText="dashboard" leftIcon={ <ActionAssignment /> } />
                        </NavLink>
                        <NavLink style={ { textDecoration: 'none' } } to={ `${this.props.match.url}/products-list` } >
                            <ListItem className='list-item' primaryText="Products" leftIcon={ <Content /> } />
                        </NavLink>
                        <ListItem
                            className='list-item'
                            primaryText="Inbox"
                            leftIcon={ <ContentInbox /> }
                            initiallyOpen={ true }
                            primaryTogglesNestedList={ true }
                            nestedItems={ [
                                <ListItem
                                    className='list-item'
                                    key={ 1 }
                                    primaryText="Starred"
                                    leftIcon={ <ActionGrade /> }
                                />,
                                <ListItem
                                    className='list-item'
                                    key={ 2 }
                                    primaryText="Sent"
                                    leftIcon={ <ContentSend /> }
                                    disabled={ true }
                                    nestedItems={ [
                                        <ListItem key={ 1 } primaryText="Drafts" leftIcon={ <ContentDrafts /> } />,
                                    ] }
                                />,
                                <ListItem
                                    className='list-item'
                                    key={ 3 }
                                    primaryText="Inbox"
                                    leftIcon={ <ContentInbox /> }
                                    open={ this.state.open }
                                    onNestedListToggle={ this.handleNestedListToggle }
                                    nestedItems={ [
                                        <ListItem key={ 1 } primaryText="Drafts" leftIcon={ <ContentDrafts /> } />,
                                    ] }
                                />,
                            ] }
                        />
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path={ `${this.props.match.url}` } render={ () => <Details sideBar={ this.state.sideBarOpen } /> } />
                    <Route path={ `${this.props.match.url}/products-list` } render={ () => <Table sideBar={ this.state.sideBarOpen } /> } />
                    <Route render={ () => <Redirect to="/dashboard" /> } />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Dashboard);