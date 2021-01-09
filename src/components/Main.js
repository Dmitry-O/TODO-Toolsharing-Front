import React from 'react';
import '../App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Tools from './Tools';
import ToolDetails from './ToolDetails';
import Wishlist from './Wishlist';
import {connect} from 'react-redux';
import {fetchTools, loginUser, logoutUser, fetchWishlist, postWishlist, deleteWishlist } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        tools: state.tools,
        wishlist: state.wishlist,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTools: () => {dispatch(fetchTools())},
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchWishlist: () => dispatch(fetchWishlist()),
    postWishlist: (toolId) => dispatch(postWishlist(toolId)),
    deleteWishlist: (toolId) => dispatch(deleteWishlist(toolId))
});

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchTools();
        this.props.fetchWishlist();
    }

    render() {
        const ToolWithId = ({match}) => {
            return (
                <ToolDetails tool={this.props.tools.tools.filter((tool) => tool._id === match.params.toolId)[0]}
                    wishlist={this.props.wishlist.wishlist.tools.some((tool) => tool._id === match.params.toolId)}
                    postWishlist={this.props.postWishlist}/>
            );
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
          );

        return (
            <div className="App">
                <Header auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} />
                <Switch>
                    <Route path="/home" component={() => <Home/>}/>
                    <Route exact path="/tools" component={() => <Tools tools={this.props.tools.tools}/>}/>
                    <Route path="/tools/:toolId" component={ToolWithId}/>
                    <PrivateRoute exact path="/wishlist" component={() => <Wishlist wishlist={this.props.wishlist.wishlist} deleteWishlist={this.props.deleteWishlist} />} />
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));