import axios from 'axios';
import {
  addFileActionCreator,
  setFileActionCreator,
} from '../reducers/fileReducer';

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(setFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/files`,
        {
          name,
          parent: dirId,
          type: `dir`,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(addFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const response = await axios.post(
        `http://localhost:5000/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length'
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
            }
          },
        }
      );
      dispatch(addFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
