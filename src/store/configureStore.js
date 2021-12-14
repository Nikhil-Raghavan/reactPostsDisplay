/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducer';


export default function configureStore(initialState = {}, history) {
    let composeEnhancers = compose;
    const reduxSagaMonitorOptions = {};

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        /* eslint-disable no-underscore-dangle */
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );


    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }
    return store;
}
