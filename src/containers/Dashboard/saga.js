import { call, put, takeLatest } from 'redux-saga/effects';
import { GETPosts } from './constants';
import { loadPosts } from './actions'


import request from '../../utils/request';




export function* getPosts() {
    const requestURL = `https://jsonplaceholder.typicode.com/posts`
    try {
        const posts = yield call(request, requestURL, {
            method: 'GET',
        });
        console.log(posts)
        yield put(loadPosts(posts));
    } catch (err) {
    }
}

export default function* containerData() {

    // yield takeLatest(CONTACT_US_FORM_DATA, sendContactFormData);
    yield takeLatest(GETPosts, getPosts);
}
