import {createStore, combineReducers, applyMiddleware} from 'redux';
import tradeReducer from './reducers/tradeReducer';
import {saveState, loadState} from './utilities/localStorageHelper';

const reducer = combineReducers({
  trading: tradeReducer
});

// const persistedState = loadState();

const store = createStore(
  reducer,
  // persistedState
);

store.subscribe(() => {
    // const {trading} = store.getState();
    // determines what is persisted in localstorage
    // saveState({trading});
});

export default store;
