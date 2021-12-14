import produce from 'immer';
import { SETToken } from './constants';

export const initialState = {
    token: false,

};

const loginReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SETToken:
                draft.token = true;
                console.log("from reducer",draft.token)
                break;
        }
    });

export default loginReducer;