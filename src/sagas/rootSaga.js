import firstSaga from './saga';
import { all } from 'redux-saga/effects'

function* secondhelloSaga() {
    console.log('Hello Sagas second time!')
}

export default function* rootSaga() {
    yield all([
        firstSaga(),
        secondhelloSaga(),
    ])
}
