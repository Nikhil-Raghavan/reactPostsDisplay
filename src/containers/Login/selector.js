

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.Login || initialState;

const makeSelectToken = () =>
    createSelector(
        selectLogin,
        Login => Login.token,
    );



export { selectLogin, makeSelectToken };