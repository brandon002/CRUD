
import { GET_POST, GET_POST_START } from './../action/ActionTypes';

const initialState = {
  items: null,
  loading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_POST_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
