import React from 'react';
import '../App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Tools from './Tools';

class Main extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/home" component={() => <Home/>}/>
                    <Route exact path="/tools" component={() => <Tools/>}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default Main;