const SHOW_UPLOADER = 'SHOW_UPLOADER';
const HIDE_UPLOADER = 'HIDE_UPLOADER';
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE';
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';

const initialState = {
  isVisible: false,
  files: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_UPLOADER:
      return { ...state, isVisible: true };
    case HIDE_UPLOADER:
      return { ...state, isVisible: false, files: [] };
    case ADD_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, { ...action.payload }],
      };
    case REMOVE_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      };
    case CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file.id === action.payload.id
              ? { ...file, progress: action.payload.progress }
              : { ...file }
          ),
        ],
      };
    default:
      return state;
  }
}

export const showUploadActionCreator = () => ({
  type: SHOW_UPLOADER,
});
export const hideUploadActionCreator = () => ({
  type: HIDE_UPLOADER,
});
export const addUploadActionCreator = (file) => ({
  type: ADD_UPLOAD_FILE,
  payload: file,
});
export const removeUploadActionCreator = (fileId) => ({
  type: REMOVE_UPLOAD_FILE,
  payload: fileId,
});
export const changeUploadActionCreator = (payload) => ({
  type: CHANGE_UPLOAD_FILE,
  payload,
});
