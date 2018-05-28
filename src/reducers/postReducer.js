import constants from '../actions/constants';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}