

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.Dashboard || initialState;

const makeSelectPosts = () =>
    createSelector(
        selectDashboard,
        Dashboard => Dashboard.posts,
    );



export { selectDashboard, makeSelectPosts };