const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const initialState = {
  loader: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
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
