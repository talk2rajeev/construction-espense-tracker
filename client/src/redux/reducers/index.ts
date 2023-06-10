import { combineReducers } from 'redux';
import vendors from './vendor';
import labors from './labor';
import expenses from './expense';
import pageLoader from './pageLoader';


const rootReducer = combineReducers({
    vendors,
    labors,
    expenses,
    pageLoader,
});
export default rootReducer;