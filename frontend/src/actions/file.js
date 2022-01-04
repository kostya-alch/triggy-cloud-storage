import axios from 'axios';
import { addFileActionCreator, setFileActionCreator } from '../reducers/fileReducer';

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
