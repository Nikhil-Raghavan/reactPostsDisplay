import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
// import request from '../utils/request';


function* helloSaga() {
    console.log('Hello Sagas!')
}


const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { data: data, status: response.status }
    }
    catch (e) {
        console.log(e)
    }
}



// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* firstSaga() {

    // yield all([helloSaga()]),
    yield all([
        helloSaga(),
    ])
    // yield takeLatest(constants.GET_PROTEIN_DATA, get_protein_data)
    // yield takeLatest(fatconstants.GET_FATBURN_DATA, get_fatburn_data)
}
