import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import {Tools} from './tools';
import {Auth}  from './auth';
import {wishlist} from './wishlist';
import {rentedTools} from './rentedTools';
import {account} from './account';
import {InitialAccount} from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tools: Tools,
            auth: Auth,
            wishlist,
            rentedTools,
            account,
            ...createForms({
                accountForm: InitialAccount
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}