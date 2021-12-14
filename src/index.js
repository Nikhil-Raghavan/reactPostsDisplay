import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import RootReducer from './store/reducer';
// import createSagaMiddleware from 'redux-saga';
import history from './utils/history';
// import rootSaga from './sagas/rootSaga';

import configureStore from './store/configureStore';
import { loadState, saveState } from './localstorage';
// import { BrowserRouter } from 'react-router-dom';



const initialState = loadState();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

// const sagaMiddleware = createSagaMiddleware();
// const persistedState = loadState();

// const store = createStore(RootReducer, persistedState, applyMiddleware(sagaMiddleware));

store.subscribe(() => {
  saveState(store.getState());
});

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}

      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE,
  // document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA