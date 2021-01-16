import React from 'react';
import '../App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Tools from './Tools';
import ToolDetails from './ToolDetails';
import Wishlist from './Wishlist';
import Account from './Account';
import RentedTools from './RentedTools';
import Contacts from './Contacts';
import About from './About';
import {connect} from 'react-redux';
import {fetchTools, loginUser, logoutUser, fetchWishlist, postWishlist, deleteWishlist, fetchRentedTools, postRentedTools, fetchAccount, putAccount, returnAccount } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        tools: state.tools,
        wishlist: state.wishlist,
        auth: state.auth,
        rentedTools: state.rentedTools,
        account: state.account,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTools: () => {dispatch(fetchTools())},
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchWishlist: () => dispatch(fetchWishlist()),
    postWishlist: (toolId) => dispatch(postWishlist(toolId)),
    deleteWishlist: (toolId) => dispatch(deleteWishlist(toolId)),
    fetchRentedTools: () => dispatch(fetchRentedTools()),
    postRentedTools: (rentedTool) => dispatch(postRentedTools(rentedTool)),
    fetchAccount: () => dispatch(fetchAccount()),
    putAccount: (info) => dispatch(putAccount(info)),
    returnAccount: () => dispatch(returnAccount())
});

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchTools();
        this.props.fetchWishlist();
        this.props.fetchRentedTools();
        this.props.fetchAccount();
    }

    render() {
        const ToolWithId = ({match}) => {
            //this.props.fetchTools();
            //this.props.fetchWishlist();
            return (
                <ToolDetails tool={this.props.tools.tools.filter((tool) => tool._id === match.params.toolId)[0]}
                    wishlist={this.props.wishlist.wishlist.tools.some((tool) => tool._id === match.params.toolId)}
                    postWishlist={this.props.postWishlist}
                    postRentedTools={this.props.postRentedTools}
                    account={this.props.wishlist.wishlist.user}/>
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
        
        //console.log(this.props.wishlist.wishlist);       

        return (
            <div className="App">
                <Header auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} />
                <Switch>
                    <Route path="/home" component={() => <Home/>}/>
                    <Route exact path="/tools" component={() => <Tools tools={this.props.tools.tools}/>}/>
                    <Route path="/tools/:toolId" component={ToolWithId}/>
                    <Route exact path="/contacts" component={() => <Contacts/>}/>
                    <Route exact path="/about" component={() => <About/>}/>
                    <PrivateRoute exact path="/wishlist" component={() => <Wishlist wishlist={this.props.wishlist.wishlist} deleteWishlist={this.props.deleteWishlist} />} />
                    <PrivateRoute exact path="/rentedTools" component={() => <RentedTools rentedTools={this.props.rentedTools.rentedTools}/>} />
                    <PrivateRoute exact path="/account" component={() => <Account account={this.props.wishlist.wishlist.user} putAccount={this.props.putAccount}/>}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));