import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import {createForms} from 'react-redux-form';
import {Tools} from './tools';
import {Auth}  from './auth';
import {wishlist} from './wishlist';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tools: Tools,
            auth: Auth,
            wishlist
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}