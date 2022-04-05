import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostReducer from '../reducer/PostReducer.js';
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    PostReducer
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
