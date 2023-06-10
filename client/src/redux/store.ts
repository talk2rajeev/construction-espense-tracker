
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './reducers/initialState';
import rootReducer from './reducers';


const env = ['dev', 'test', 'staging', 'prod'];
let middleareWithLoggeer = applyMiddleware(thunk, createLogger());

export function configureStore() {
    return createStore(rootReducer, initialState, composeWithDevTools(middleareWithLoggeer));
}

const store = configureStore();

export default store;