import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from './reducers';

const store = createStore(tableReducer, applyMiddleware(thunk));

export default store;