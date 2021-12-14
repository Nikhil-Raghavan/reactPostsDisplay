import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
// import proteinReducer from '../container/App/Proteins/reducer/index'
// import fatReducer from '../container/App/Fatburners/reducer/index';

// pro: proteinReducer, fat: fatReducer
// const rootReducer = combineReducers({})

// export default rootReducer

export default function createReducer(injectedReducers = {}) {

    // console.log(FaqReducer, "ggfdss")
    const rootReducer = combineReducers({
        // global: globalReducer,
        // language: languageProviderReducer,
        router: connectRouter(history),
        ...injectedReducers
    });

    return rootReducer;
}