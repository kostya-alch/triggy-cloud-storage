const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';
const SET_VIEW = 'SET_VIEW';

const initialState = {
  loader: false,
  view: 'list',
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
}

export const showLoaderActionCreator = () => ({
  type: SHOW_LOADER,
});

export const hideLoaderActionCreator = () => ({
  type: HIDE_LOADER,
});
export const setViewActionCreator = (payload) => ({
  type: SET_VIEW,
  payload,
});
