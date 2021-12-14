import produce from 'immer';
import {LOADPosts } from './constants';

export const initialState = {
    posts: [],

};

const dashboardReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case LOADPosts:
                draft.posts = action.posts;
                console.log("from reducer",draft.posts)
                break;

                
        }
    });

export default dashboardReducer;